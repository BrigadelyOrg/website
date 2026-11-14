/**
 * Server only: site-wide growth, conversions and blog performance from the GA4
 * Data API, for the /admin dashboard.
 *
 * payload.config.ts imports this (through the analytics endpoint), so it must
 * stay cheap to load: the Google SDK is imported on first use only.
 */
import type { BetaAnalyticsDataClient, protos } from "@google-analytics/data";
import type { JWT } from "google-auth-library";

import { SITE_URL } from "../site";
import { cachedReport } from "./cache";
import { CTA_EVENT } from "./cta";
import {
  describeCommonGoogleError,
  GoogleConfigError,
  grpcCodeOf,
  messageOf,
  readServiceAccount,
  serviceAccountClient,
  type GoogleProblem,
  type ServiceAccount,
  type ServiceAccountKey,
} from "./google";
import { ANALYTICS_RANGES, type AnalyticsRange } from "./ranges";
import {
  CURRENT_PERIOD,
  PREVIOUS_PERIOD,
  reportWindow,
  toBlogDaily,
  toBlogOverview,
  toConvertingPages,
  toDeviceSplit,
  toLiveVisitors,
  toPageStats,
  toPlaces,
  toSiteDaily,
  toSiteOverview,
  toTopArticles,
  toTrafficSources,
} from "./report";
import type { Ga4Stats, LiveVisitors } from "./types";

export type Ga4EnvKey = "GA4_PROPERTY_ID" | ServiceAccountKey;

export type Ga4Settings =
  | { configured: true; propertyId: string; account: ServiceAccount }
  | { configured: false; missing: Ga4EnvKey[] };

export function readGa4Settings(env: NodeJS.ProcessEnv = process.env): Ga4Settings {
  const propertyId = (env.GA4_PROPERTY_ID ?? "").trim().replace(/^properties\//, "");
  const { clientEmail, privateKey, missing: accountMissing } = readServiceAccount(env);
  const missing: Ga4EnvKey[] = propertyId ? accountMissing : ["GA4_PROPERTY_ID", ...accountMissing];
  return missing.length > 0
    ? { configured: false, missing }
    : { configured: true, propertyId, account: { clientEmail, privateKey } };
}

/** GA4 numbers for a range, cached for 15 minutes (see cache.ts). */
export function getGa4Report(
  settings: Extract<Ga4Settings, { configured: true }>,
  range: AnalyticsRange,
  refresh = false,
): Promise<Ga4Stats> {
  return cachedReport({
    key: ["ga4", settings.propertyId, range],
    fetcher: () => fetchGa4Report(settings, range),
    refresh,
  });
}

/** Visitors in the last 30 minutes (GA4 Realtime), cached for a minute. */
export function getGa4Live(settings: Extract<Ga4Settings, { configured: true }>, refresh = false): Promise<LiveVisitors> {
  return cachedReport({
    key: ["ga4-live", settings.propertyId],
    fetcher: () => fetchGa4Live(settings),
    refresh,
    maxAgeSeconds: 60,
  });
}

const ANALYTICS_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

function assertPropertyId(propertyId: string): void {
  if (!/^\d+$/.test(propertyId)) {
    throw new GoogleConfigError(
      `GA4_PROPERTY_ID "${propertyId}" isn't a GA4 property ID.`,
      "Use the numeric Property ID from GA4 → Admin → Property details (for example 412345678), not the G-… measurement ID.",
    );
  }
}

async function fetchGa4Live({ propertyId, account }: Extract<Ga4Settings, { configured: true }>): Promise<LiveVisitors> {
  assertPropertyId(propertyId);
  const [sdk, authClient] = await Promise.all([
    import("@google-analytics/data"),
    serviceAccountClient(account, ANALYTICS_SCOPE),
  ]);
  // No minuteRanges: the default, the last 30 minutes, is as far back as a
  // standard property may look (Google rejects startMinutesAgo above 29).
  const [response] = await dataClient(sdk, account.clientEmail, authClient).runRealtimeReport(
    { property: `properties/${propertyId}`, metrics: names("activeUsers", "screenPageViews") },
    { timeout: 10_000 },
  );
  return { ...toLiveVisitors(response), fetchedAt: new Date().toISOString() };
}

async function fetchGa4Report(
  { propertyId, account }: Extract<Ga4Settings, { configured: true }>,
  range: AnalyticsRange,
): Promise<Ga4Stats> {
  assertPropertyId(propertyId);

  const { days } = ANALYTICS_RANGES[range];
  const [sdk, authClient] = await Promise.all([
    import("@google-analytics/data"),
    serviceAccountClient(account, ANALYTICS_SCOPE),
  ]);
  const client = dataClient(sdk, account.clientEmail, authClient);
  const requests = reportRequests(days, sdk.protos.google.analytics.data.v1beta.MetricAggregation.TOTAL);
  const run = async (batch: ReportRequest[]) => {
    const [response] = await client.batchRunReports(
      { property: `properties/${propertyId}`, requests: batch },
      { timeout: 10_000 },
    );
    return response.reports ?? [];
  };

  // Three batches (GA4 allows five reports per batch), in parallel.
  const [[kpis, siteDaily, cta, visitors, devices], [countries, cities, topPages, converting], blog] =
    await Promise.all([run(requests.site), run(requests.siteDetail), run(requests.blog)]);
  const [blogOverview, blogDaily, articles, sources] = blog;

  const timeZone = siteDaily?.metadata?.timeZone || blogDaily?.metadata?.timeZone || "UTC";
  const { startDate, endDate } = reportWindow(days, timeZone);

  return {
    range,
    startDate,
    endDate,
    timeZone,
    fetchedAt: new Date().toISOString(),
    site: {
      overview: toSiteOverview(kpis, cta, visitors),
      daily: toSiteDaily(siteDaily, cta, startDate, days),
      countries: toPlaces(countries),
      cities: toPlaces(cities),
      topPages: toPageStats(topPages),
      convertingPages: toConvertingPages(converting),
      devices: toDeviceSplit(devices),
    },
    blog: {
      overview: toBlogOverview(blogOverview),
      daily: toBlogDaily(blogDaily, startDate, days),
      topArticles: toTopArticles(articles),
      sources: toTrafficSources(sources),
    },
  };
}

type Sdk = typeof import("@google-analytics/data");
type FilterExpression = protos.google.analytics.data.v1beta.IFilterExpression;
type ReportRequest = protos.google.analytics.data.v1beta.IRunReportRequest;
type MetricAggregation = protos.google.analytics.data.v1beta.MetricAggregation;

const stringFilter = (
  fieldName: string,
  matchType: "EXACT" | "BEGINS_WITH" | "FULL_REGEXP",
  value: string,
): FilterExpression => ({ filter: { fieldName, stringFilter: { matchType, value } } });
const allOf = (...expressions: FilterExpression[]): FilterExpression => ({ andGroup: { expressions } });
const not = (expression: FilterExpression): FilterExpression => ({ notExpression: expression });

// Production traffic only. The GTM tag also fires on localhost and on Netlify
// deploy previews; those visits must not count. Matches brigadely.com and www.
const siteDomain = new URL(SITE_URL).hostname.replace(/^www\./, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ON_SITE = stringFilter("hostName", "FULL_REGEXP", `(www\\.)?${siteDomain}`);
/** /blog itself and every page under it (full-match RE2 expression). */
const BLOG_PATH = stringFilter("pagePath", "FULL_REGEXP", "/blog(/.*)?");

const BLOG_PAGES = allOf(ON_SITE, BLOG_PATH);
const ARTICLE_PAGES = allOf(ON_SITE, stringFilter("pagePath", "BEGINS_WITH", "/blog/"));
const NON_BLOG_PAGES = allOf(ON_SITE, not(BLOG_PATH));
const CTA_CLICKS = allOf(ON_SITE, stringFilter("eventName", "EXACT", CTA_EVENT));
const KNOWN_COUNTRY = allOf(ON_SITE, not(stringFilter("country", "EXACT", "(not set)")));
const KNOWN_CITY = allOf(ON_SITE, not(stringFilter("city", "EXACT", "(not set)")));

const names = (...list: string[]) => list.map((name) => ({ name }));
const byMetric = (metricName: string) => [{ metric: { metricName }, desc: true }];

/** Each range is N full days ending yesterday (like GA4's "Last N days"), against the N days before. */
function reportRequests(days: number, total: MetricAggregation) {
  const current = { name: CURRENT_PERIOD, startDate: `${days}daysAgo`, endDate: "yesterday" };
  const previous = { name: PREVIOUS_PERIOD, startDate: `${days * 2}daysAgo`, endDate: `${days + 1}daysAgo` };
  const both = [current, previous];
  const now = [current];
  const engagement = names("screenPageViews", "activeUsers", "userEngagementDuration");

  const site: ReportRequest[] = [
    // KPIs, this period and the one before.
    { dateRanges: both, dimensionFilter: ON_SITE, metrics: names("activeUsers", "screenPageViews", "engagementRate") },
    // Daily trend.
    {
      dateRanges: now,
      dimensionFilter: ON_SITE,
      dimensions: names("date"),
      metrics: names("activeUsers", "screenPageViews", "engagementRate"),
      limit: 100,
    },
    // CTA clicks per day, both periods.
    { dateRanges: both, dimensionFilter: CTA_CLICKS, dimensions: names("date"), metrics: names("eventCount"), limit: 250 },
    // New vs returning visitors.
    { dateRanges: now, dimensionFilter: ON_SITE, dimensions: names("newVsReturning"), metrics: names("activeUsers") },
    // Device split.
    { dateRanges: now, dimensionFilter: ON_SITE, dimensions: names("deviceCategory"), metrics: names("activeUsers") },
  ];

  const siteDetail: ReportRequest[] = [
    {
      dateRanges: now,
      dimensionFilter: KNOWN_COUNTRY,
      dimensions: names("country"),
      metrics: names("activeUsers"),
      orderBys: byMetric("activeUsers"),
      metricAggregations: [total],
      limit: 5,
    },
    {
      dateRanges: now,
      dimensionFilter: KNOWN_CITY,
      dimensions: names("city", "country"),
      metrics: names("activeUsers"),
      orderBys: byMetric("activeUsers"),
      metricAggregations: [total],
      limit: 5,
    },
    // Top pages outside the blog.
    {
      dateRanges: now,
      dimensionFilter: NON_BLOG_PAGES,
      dimensions: names("pagePath"),
      metrics: engagement,
      orderBys: byMetric("screenPageViews"),
      limit: 5,
    },
    // Pages where CTA clicks happened.
    {
      dateRanges: now,
      dimensionFilter: CTA_CLICKS,
      dimensions: names("pagePath"),
      metrics: names("eventCount"),
      orderBys: byMetric("eventCount"),
      metricAggregations: [total],
      limit: 5,
    },
  ];

  const blog: ReportRequest[] = [
    { dateRanges: both, dimensionFilter: BLOG_PAGES, metrics: engagement },
    { dateRanges: now, dimensionFilter: BLOG_PAGES, dimensions: names("date"), metrics: engagement, limit: 100 },
    {
      dateRanges: now,
      dimensionFilter: ARTICLE_PAGES,
      dimensions: names("pagePath"),
      metrics: engagement,
      orderBys: byMetric("screenPageViews"),
      limit: 10,
    },
    // Where blog sessions came from. TOTAL counts sources beyond the 50 rows.
    {
      dateRanges: now,
      dimensionFilter: BLOG_PAGES,
      dimensions: names("sessionSource", "sessionMedium", "sessionDefaultChannelGroup"),
      metrics: names("sessions"),
      orderBys: byMetric("sessions"),
      metricAggregations: [total],
      limit: 50,
    },
  ];

  return { site, siteDetail, blog };
}

// One SDK client per server instance.
let cachedClient: { clientEmail: string; client: BetaAnalyticsDataClient } | undefined;

function dataClient(sdk: Sdk, clientEmail: string, authClient: JWT): BetaAnalyticsDataClient {
  if (cachedClient?.clientEmail !== clientEmail) {
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

/** Turns GA4 SDK and API errors into a message and a concrete next step. */
export function describeGa4Error(error: unknown): GoogleProblem {
  const common = describeCommonGoogleError(error, "Google Analytics Data API");
  if (common) return common;

  const code = grpcCodeOf(error);
  if (code === 7) {
    return {
      error: "The service account can't read this GA4 property.",
      hint: "GA4 → Admin → Property access management: add GA4_CLIENT_EMAIL as a Viewer. Also check GA4_PROPERTY_ID.",
    };
  }
  if (code === 3 || code === 5) {
    return {
      error: "Google Analytics rejected the request.",
      hint: "Check GA4_PROPERTY_ID: the numeric Property ID from GA4 → Admin → Property details.",
    };
  }
  if (code === 8) {
    return {
      error: "The Google Analytics API quota for this property is used up.",
      hint: "It resets within the hour (daily quota at midnight Pacific time).",
    };
  }
  return { error: "Couldn't load data from Google Analytics.", hint: messageOf(error).slice(0, 300) };
}
