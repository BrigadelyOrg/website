/**
 * Pure functions that turn GA4 Data API report responses into the dashboard's
 * typed shapes. No network or SDK imports here, so they're easy to test.
 */
import { addDays, formatDuration } from "./format";
import { describeSource } from "./sources";
import type { BlogAnalyticsOverview, DailyTraffic, TopArticleStats, TrafficSources } from "./types";

/** The parts of a GA4 RunReportResponse these functions read. */
export interface ReportRow {
  dimensionValues?: ReadonlyArray<{ value?: string | null }> | null;
  metricValues?: ReadonlyArray<{ value?: string | null }> | null;
}

export interface ReportLike {
  rows?: ReadonlyArray<ReportRow> | null;
  totals?: ReadonlyArray<ReportRow> | null;
  metadata?: { timeZone?: string | null } | null;
}

const dimension = (row: ReportRow, index: number): string => row.dimensionValues?.[index]?.value ?? "";

// GA4 returns every metric as a string ("1284", "95.5").
const metric = (row: ReportRow | undefined, index: number): number => {
  const value = Number(row?.metricValues?.[index]?.value ?? 0);
  return Number.isFinite(value) ? value : 0;
};

const perReader = (engagementSeconds: number, readers: number): number =>
  readers > 0 ? engagementSeconds / readers : 0;

/**
 * The first and last day covered by "N days ago" to "yesterday", in the GA4
 * property's time zone, so missing (zero-traffic) days can be filled in.
 */
export function reportWindow(days: number, timeZone: string, now: Date = new Date()) {
  const endDate = addDays(calendarDay(now, timeZone), -1);
  return { startDate: addDays(endDate, -(days - 1)), endDate };
}

function calendarDay(now: Date, timeZone: string): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
    return `${part("year")}-${part("month")}-${part("day")}`;
  } catch {
    return now.toISOString().slice(0, 10); // unknown time zone: use UTC
  }
}

/** Report with no dimensions and metrics [screenPageViews, activeUsers, userEngagementDuration]. */
export function toOverview(report: ReportLike | null | undefined): BlogAnalyticsOverview {
  const row = report?.rows?.[0];
  const readers = metric(row, 1);
  const avgEngagementSeconds = perReader(metric(row, 2), readers);
  return {
    views: metric(row, 0),
    readers,
    avgEngagementSeconds,
    avgEngagementTime: formatDuration(avgEngagementSeconds),
  };
}

/**
 * Report with dimension [date] and metrics [screenPageViews, activeUsers].
 * GA4 omits days without traffic; they come back here as zeros.
 */
export function toDailyTraffic(
  report: ReportLike | null | undefined,
  startDate: string,
  days: number,
): DailyTraffic[] {
  const byDay = new Map<string, { views: number; readers: number }>();
  for (const row of report?.rows ?? []) {
    const raw = dimension(row, 0); // YYYYMMDD
    if (!/^\d{8}$/.test(raw)) continue;
    const date = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6)}`;
    byDay.set(date, { views: metric(row, 0), readers: metric(row, 1) });
  }

  return Array.from({ length: days }, (_, offset) => {
    const date = addDays(startDate, offset);
    return { date, ...(byDay.get(date) ?? { views: 0, readers: 0 }) };
  });
}

/** Report with dimension [pagePath] and metrics [screenPageViews, activeUsers, userEngagementDuration]. */
export function toTopArticles(report: ReportLike | null | undefined): TopArticleStats[] {
  return (report?.rows ?? []).map((row) => {
    const readers = metric(row, 1);
    const avgEngagementSeconds = perReader(metric(row, 2), readers);
    return {
      path: dimension(row, 0),
      views: metric(row, 0),
      readers,
      avgEngagementSeconds,
      avgEngagementTime: formatDuration(avgEngagementSeconds),
    };
  });
}

/**
 * Report with dimensions [sessionSource, sessionMedium, sessionDefaultChannelGroup],
 * metric [sessions] and a TOTAL aggregation. Returns the top `limit` sources by
 * sessions; everything else is folded into one "Other sources" row.
 */
export function toTrafficSources(report: ReportLike | null | undefined, limit = 6): TrafficSources {
  const bySource = new Map<string, { sessions: number; channels: Map<string, number> }>();
  let listedSessions = 0;

  for (const row of report?.rows ?? []) {
    const sessions = metric(row, 0);
    if (sessions <= 0) continue;
    listedSessions += sessions;

    const label = describeSource(dimension(row, 0), dimension(row, 1));
    const entry = bySource.get(label) ?? { sessions: 0, channels: new Map<string, number>() };
    const channel = dimension(row, 2);
    entry.sessions += sessions;
    entry.channels.set(channel, (entry.channels.get(channel) ?? 0) + sessions);
    bySource.set(label, entry);
  }

  // The TOTAL row counts every session, including sources beyond the rows returned.
  const totalSessions = Math.max(metric(report?.totals?.[0], 0), listedSessions);
  const share = (sessions: number) => (totalSessions > 0 ? sessions / totalSessions : 0);

  const ranked = [...bySource]
    .map(([label, { sessions, channels }]) => ({
      label,
      // A merged source (e.g. linkedin.com + lnkd.in) takes its biggest channel group.
      channel: [...channels].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "",
      sessions,
    }))
    .sort((a, b) => b.sessions - a.sessions || a.label.localeCompare(b.label));

  const top = ranked.slice(0, limit);
  const rows = top.map((row) => ({ ...row, share: share(row.sessions), isOther: false }));

  const otherSessions = totalSessions - top.reduce((sum, row) => sum + row.sessions, 0);
  if (otherSessions > 0) {
    rows.push({
      label: "Other sources",
      channel: "",
      sessions: otherSessions,
      share: share(otherSessions),
      isOther: true,
    });
  }

  return { totalSessions, rows };
}
