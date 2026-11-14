/**
 * Server only: Google Search Console performance for the /admin dashboard
 * (clicks, impressions, CTR, position, top queries and landing pages).
 *
 * Optional: everything here is skipped until GSC_SITE_URL is set. It uses the
 * same service account as GA4; add that account's email as a user of the
 * Search Console property.
 */
import type { searchconsole_v1 } from "@googleapis/searchconsole";

import { cachedReport } from "./cache";
import { addDays } from "./format";
import {
  describeCommonGoogleError,
  httpStatusOf,
  messageOf,
  readServiceAccount,
  serviceAccountClient,
  type GoogleProblem,
  type ServiceAccount,
  type ServiceAccountKey,
} from "./google";
import { ANALYTICS_RANGES, type AnalyticsRange } from "./ranges";
import { reportWindow } from "./report";
import { toSearchDaily, toSearchPages, toSearchQueries, toSearchTotals } from "./search-report";
import type { SearchStats } from "./types";

export type GscEnvKey = "GSC_SITE_URL" | ServiceAccountKey;

export type GscSettings =
  | { configured: true; siteUrl: string; account: ServiceAccount }
  | { configured: false; missing: GscEnvKey[] };

/**
 * Search Console identifies a property exactly: "sc-domain:brigadely.com" for a
 * Domain property, or the URL with its trailing slash for a URL-prefix property.
 * A bare domain is treated as a Domain property.
 */
export function normalizeSiteUrl(raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (value.startsWith("sc-domain:")) return value;
  if (/^https?:\/\//i.test(value)) return value.endsWith("/") ? value : `${value}/`;
  return `sc-domain:${value.replace(/\/+$/, "")}`;
}

export function readGscSettings(env: NodeJS.ProcessEnv = process.env): GscSettings {
  const siteUrl = normalizeSiteUrl(env.GSC_SITE_URL ?? "");
  const { clientEmail, privateKey, missing: accountMissing } = readServiceAccount(env);
  const missing: GscEnvKey[] = siteUrl ? accountMissing : ["GSC_SITE_URL", ...accountMissing];
  return missing.length > 0
    ? { configured: false, missing }
    : { configured: true, siteUrl, account: { clientEmail, privateKey } };
}

/** Search Console numbers for a range, cached for 15 minutes (see cache.ts). */
export function getSearchReport(
  settings: Extract<GscSettings, { configured: true }>,
  range: AnalyticsRange,
  refresh = false,
): Promise<SearchStats> {
  return cachedReport({
    key: ["gsc", settings.siteUrl, range],
    fetcher: () => fetchSearchReport(settings, range),
    refresh,
  });
}

const SEARCH_CONSOLE_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
/** Search Console reports calendar days in Pacific Time. */
const SEARCH_CONSOLE_TIME_ZONE = "America/Los_Angeles";

async function fetchSearchReport(
  { siteUrl, account }: Extract<GscSettings, { configured: true }>,
  range: AnalyticsRange,
): Promise<SearchStats> {
  const { days } = ANALYTICS_RANGES[range];
  const { startDate, endDate } = reportWindow(days, SEARCH_CONSOLE_TIME_ZONE);
  const previous = { startDate: addDays(startDate, -days), endDate: addDays(startDate, -1) };

  const [{ searchconsole }, auth] = await Promise.all([
    import("@googleapis/searchconsole"),
    serviceAccountClient(account, SEARCH_CONSOLE_SCOPE),
  ]);
  const client = searchconsole({ version: "v1", auth });
  const query = async (requestBody: searchconsole_v1.Schema$SearchAnalyticsQueryRequest) => {
    // "all" includes the most recent days, which Search Console marks as preliminary.
    const { data } = await client.searchanalytics.query(
      { siteUrl, requestBody: { dataState: "all", ...requestBody } },
      { timeout: 10_000 },
    );
    return data.rows ?? [];
  };

  const [current, before, daily, queries, pages] = await Promise.all([
    query({ startDate, endDate }),
    query(previous),
    query({ startDate, endDate, dimensions: ["date"], rowLimit: days }),
    query({ startDate, endDate, dimensions: ["query"], rowLimit: 10 }),
    query({ startDate, endDate, dimensions: ["page"], rowLimit: 10 }),
  ]);

  return {
    siteUrl,
    startDate,
    endDate,
    fetchedAt: new Date().toISOString(),
    totals: { current: toSearchTotals(current), previous: toSearchTotals(before) },
    daily: toSearchDaily(daily, startDate, days),
    topQueries: toSearchQueries(queries),
    topPages: toSearchPages(pages),
  };
}

/** Turns Search Console SDK and API errors into a message and a concrete next step. */
export function describeSearchConsoleError(error: unknown): GoogleProblem {
  const common = describeCommonGoogleError(error, "Google Search Console API");
  if (common) return common;

  const status = httpStatusOf(error);
  const message = messageOf(error);
  if (status === 403 || /permission/i.test(message)) {
    return {
      error: "The service account can't read this Search Console property.",
      hint: "Search Console → Settings → Users and permissions → Add user: GA4_CLIENT_EMAIL with Restricted access. GSC_SITE_URL must match the property exactly, e.g. sc-domain:brigadely.com or https://brigadely.com/.",
    };
  }
  if (status === 400 || status === 404) {
    return {
      error: "Search Console rejected the request.",
      hint: "Check GSC_SITE_URL: sc-domain:brigadely.com for a Domain property, or the exact URL with its trailing slash (https://brigadely.com/) for a URL-prefix property.",
    };
  }
  if (status === 429) {
    return { error: "The Search Console API quota is used up.", hint: "Try again in a few minutes." };
  }
  return { error: "Couldn't load data from Search Console.", hint: message.slice(0, 300) };
}
