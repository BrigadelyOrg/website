/**
 * Timeframes offered by the blog analytics dashboard. Shared by the API
 * endpoint (server) and the /admin dashboard (browser).
 *
 * Each range covers N full days ending yesterday, the same as GA4's own
 * "Last N days" presets, so the numbers match what you see in Google Analytics.
 */
export const ANALYTICS_RANGES = {
  "7d": { days: 7, label: "Last 7 days" },
  "30d": { days: 30, label: "Last 30 days" },
  "90d": { days: 90, label: "Last 90 days" },
} as const;

export type AnalyticsRange = keyof typeof ANALYTICS_RANGES;

export const ANALYTICS_RANGE_KEYS = Object.keys(ANALYTICS_RANGES) as AnalyticsRange[];

export const DEFAULT_ANALYTICS_RANGE: AnalyticsRange = "30d";

export function isAnalyticsRange(value: unknown): value is AnalyticsRange {
  return typeof value === "string" && Object.hasOwn(ANALYTICS_RANGES, value);
}
