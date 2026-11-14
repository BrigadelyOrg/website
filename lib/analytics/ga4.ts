/**
 * Server only: reads blog traffic from the GA4 Data API for the /admin dashboard.
 *
 * payload.config.ts imports this file (through cms/endpoints/blogAnalytics.ts),
 * so it must stay cheap to load: the Google SDK is imported on first use only.
 */
import type { BetaAnalyticsDataClient, protos } from "@google-analytics/data";
import { unstable_cache } from "next/cache";

import { SITE_URL } from "../site";
import { ANALYTICS_RANGES, type AnalyticsRange } from "./ranges";
import { reportWindow, toDailyTraffic, toOverview, toTopArticles, toTrafficSources } from "./report";
import type { BlogAnalyticsError, BlogAnalyticsStats, Ga4EnvKey } from "./types";

/** Google is asked at most once per 15 minutes per range; every admin shares the answer. */
export const GA4_CACHE_SECONDS = 15 * 60;
export const GA4_CACHE_TAG = "ga4";

export interface Ga4Credentials {
  /** Numeric GA4 property ID, e.g. "412345678". */
  propertyId: string;
  clientEmail: string;
  privateKey: string;
}

export type Ga4Settings = ({ configured: true } & Ga4Credentials) | { configured: false; missing: Ga4EnvKey[] };

export function readGa4Settings(env: NodeJS.ProcessEnv = process.env): Ga4Settings {
  const propertyId = (env.GA4_PROPERTY_ID ?? "").trim().replace(/^properties\//, "");
  const clientEmail = (env.GA4_CLIENT_EMAIL ?? "").trim();
  const privateKey = normalizePrivateKey(env.GA4_PRIVATE_KEY ?? "");

  const missing = (
    [
      ["GA4_PROPERTY_ID", propertyId],
      ["GA4_CLIENT_EMAIL", clientEmail],
      ["GA4_PRIVATE_KEY", privateKey],
    ] as const
  )
    .filter(([, value]) => value === "")
    .map(([key]) => key);

  return missing.length > 0
    ? { configured: false, missing }
    : { configured: true, propertyId, clientEmail, privateKey };
}

/**
 * Accepts the key the way people paste it: with real line breaks, or with the
 * literal "\n" escapes from the JSON key file, with or without wrapping quotes.
 */
function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  const quote = key[0];
  if (key.length > 1 && (quote === '"' || quote === "'") && key.endsWith(quote)) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
}

/**
 * Blog analytics for a range, cached for 15 minutes (Next.js data cache, shared
 * by all server instances), which keeps the dashboard fast and the API usage far
 * below Google's free quota.
 */
export async function getBlogAnalytics(
  credentials: Ga4Credentials,
  range: AnalyticsRange,
): Promise<BlogAnalyticsStats> {
  const cached = await unstable_cache(
    () => fetchBlogAnalytics(credentials, range),
    ["ga4-blog-analytics", credentials.propertyId, range],
    { revalidate: GA4_CACHE_SECONDS, tags: [GA4_CACHE_TAG] },
  )();

  // Once an entry is older than 15 minutes the cache still returns it one more
  // time while it refreshes in the background. After a quiet night that could
  // be yesterday's numbers, so fetch fresh ones instead of showing them.
  if (Date.now() - Date.parse(cached.fetchedAt) < GA4_CACHE_SECONDS * 1000) return cached;
  try {
    return await fetchBlogAnalytics(credentials, range);
  } catch {
    return cached; // Google unavailable: older numbers (with their timestamp) beat an error
  }
}

async function fetchBlogAnalytics(
  { propertyId, clientEmail, privateKey }: Ga4Credentials,
  range: AnalyticsRange,
): Promise<BlogAnalyticsStats> {
  if (!/^\d+$/.test(propertyId)) {
    throw new Ga4ConfigError(
      `GA4_PROPERTY_ID "${propertyId}" isn't a GA4 property ID.`,
      "Use the numeric Property ID from GA4 → Admin → Property details (for example 412345678), not the G-… measurement ID.",
    );
  }

  const { days } = ANALYTICS_RANGES[range];
  const [sdk, authLibrary] = await Promise.all([import("@google-analytics/data"), import("google-auth-library")]);
  const client = dataClient(sdk, authLibrary, clientEmail, privateKey);
  // One round trip for all four reports.
  const [response] = await client.batchRunReports(
    {
      property: `properties/${propertyId}`,
      requests: blogReportRequests(days, sdk.protos.google.analytics.data.v1beta.MetricAggregation.TOTAL),
    },
    { timeout: 8_000 },
  );
  const [overview, daily, articles, sources] = response.reports ?? [];

  const timeZone = daily?.metadata?.timeZone || overview?.metadata?.timeZone || "UTC";
  const { startDate, endDate } = reportWindow(days, timeZone);

  return {
    range,
    startDate,
    endDate,
    timeZone,
    fetchedAt: new Date().toISOString(),
    overview: toOverview(overview),
    daily: toDailyTraffic(daily, startDate, days),
    topArticles: toTopArticles(articles),
    sources: toTrafficSources(sources),
  };
}

type Sdk = typeof import("@google-analytics/data");
type AuthLibrary = typeof import("google-auth-library");
type FilterExpression = protos.google.analytics.data.v1beta.IFilterExpression;
type ReportRequest = protos.google.analytics.data.v1beta.IRunReportRequest;
type MetricAggregation = protos.google.analytics.data.v1beta.MetricAggregation;

const stringFilter = (
  fieldName: string,
  matchType: "FULL_REGEXP" | "BEGINS_WITH",
  value: string,
): FilterExpression => ({ filter: { fieldName, stringFilter: { matchType, value } } });

// Production traffic only. The GTM tag also fires on localhost and on Netlify
// deploy previews; those visits must not count. Matches brigadely.com and www.
const siteDomain = new URL(SITE_URL).hostname.replace(/^www\./, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const onSite = (pages: FilterExpression): FilterExpression => ({
  andGroup: { expressions: [stringFilter("hostName", "FULL_REGEXP", `(www\\.)?${siteDomain}`), pages] },
});

/** /blog itself and every page under it (full-match RE2 expressions). */
const BLOG_PAGES = onSite(stringFilter("pagePath", "FULL_REGEXP", "/blog(/.*)?"));
/** Individual articles only: /blog/[slug]. */
const ARTICLE_PAGES = onSite(stringFilter("pagePath", "BEGINS_WITH", "/blog/"));

/** Each range is N full days ending yesterday, like GA4's "Last N days". */
function blogReportRequests(days: number, total: MetricAggregation): ReportRequest[] {
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "yesterday" }];
  return [
    // 1. Overview: total views, unique readers, engagement time.
    {
      dateRanges,
      dimensionFilter: BLOG_PAGES,
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }, { name: "userEngagementDuration" }],
    },
    // 2. Daily trend.
    {
      dateRanges,
      dimensionFilter: BLOG_PAGES,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      limit: 100,
    },
    // 3. Top 10 articles by views.
    {
      dateRanges,
      dimensionFilter: ARTICLE_PAGES,
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }, { name: "userEngagementDuration" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    },
    // 4. Where blog sessions came from. TOTAL counts sources beyond the 50 rows.
    {
      dateRanges,
      dimensionFilter: BLOG_PAGES,
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }, { name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      metricAggregations: [total],
      limit: 50,
    },
  ];
}

const ANALYTICS_READONLY_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

// One client per server instance; it caches its own access tokens.
let cachedClient: { clientEmail: string; client: BetaAnalyticsDataClient } | undefined;

function dataClient(
  sdk: Sdk,
  authLibrary: AuthLibrary,
  clientEmail: string,
  privateKey: string,
): BetaAnalyticsDataClient {
  if (cachedClient?.clientEmail !== clientEmail) {
    // A service-account client built from the key. (The SDK's `credentials`
    // option is deprecated and logs a warning on every cold start.)
    const authClient = new authLibrary.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: [ANALYTICS_READONLY_SCOPE],
    });
    const client = new sdk.BetaAnalyticsDataClient({
      authClient,
      // JSON over HTTPS rather than a long-lived gRPC connection, which can go
      // stale while a serverless function (Netlify) is frozen between requests.
      fallback: "rest",
    });
    cachedClient = { clientEmail, client };
  }
  return cachedClient.client;
}

/** A setting that is present but unusable. */
export class Ga4ConfigError extends Error {
  readonly hint: string;

  constructor(message: string, hint: string) {
    super(message);
    this.name = "Ga4ConfigError";
    this.hint = hint;
  }
}

// gRPC status codes, which the SDK reports for REST calls too.
const INVALID_ARGUMENT = 3;
const DEADLINE_EXCEEDED = 4;
const NOT_FOUND = 5;
const PERMISSION_DENIED = 7;
const RESOURCE_EXHAUSTED = 8;
const UNAUTHENTICATED = 16;

/** Turns SDK and Google API errors into a message and a concrete next step. */
export function describeGa4Error(error: unknown): BlogAnalyticsError {
  if (error instanceof Ga4ConfigError) return { error: error.message, hint: error.hint };

  const message = error instanceof Error ? error.message : String(error);
  const code = typeof error === "object" && error !== null && "code" in error ? error.code : undefined;

  if (/DECODER routines|PEM|private key|no start line|asn1/i.test(message)) {
    return {
      error: "GA4_PRIVATE_KEY couldn't be read.",
      hint: "Copy the private_key value from the service account's JSON key exactly, including the BEGIN and END lines.",
    };
  }
  if (/has not been used|is disabled|SERVICE_DISABLED/i.test(message)) {
    return {
      error: "The Google Analytics Data API isn't enabled for the service account's Google Cloud project.",
      hint: "Google Cloud console → APIs & Services → enable “Google Analytics Data API”, then try again in a few minutes.",
    };
  }
  if (code === UNAUTHENTICATED || /invalid_grant|invalid jwt|account not found/i.test(message)) {
    return {
      error: "Google rejected the service account credentials.",
      hint: "Check that GA4_CLIENT_EMAIL and GA4_PRIVATE_KEY come from the same JSON key and that the key hasn't been deleted.",
    };
  }
  if (code === PERMISSION_DENIED) {
    return {
      error: "The service account can't read this GA4 property.",
      hint: "GA4 → Admin → Property access management: add GA4_CLIENT_EMAIL as a Viewer. Also check GA4_PROPERTY_ID.",
    };
  }
  if (code === INVALID_ARGUMENT || code === NOT_FOUND) {
    return {
      error: "Google Analytics rejected the request.",
      hint: "Check GA4_PROPERTY_ID: the numeric Property ID from GA4 → Admin → Property details.",
    };
  }
  if (code === RESOURCE_EXHAUSTED) {
    return {
      error: "The Google Analytics API quota for this property is used up.",
      hint: "It resets within the hour (daily quota at midnight Pacific time).",
    };
  }
  if (code === DEADLINE_EXCEEDED || /timed? ?out|deadline/i.test(message)) {
    return { error: "Google Analytics took too long to respond.", hint: "Try again in a moment." };
  }
  return { error: "Couldn't load data from Google Analytics.", hint: message.slice(0, 300) };
}
