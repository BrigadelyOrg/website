/**
 * Pure functions that turn GA4 Data API report responses into the dashboard's
 * typed shapes. No network or SDK imports here, so they're easy to test.
 * Each function documents the report shape it expects (see ga4.ts).
 */
import { addDays } from "./format";
import { describeSource } from "./sources";
import type {
  BlogDay,
  BlogOverview,
  DeviceKind,
  DeviceShare,
  PageStat,
  PeriodValue,
  PlaceStat,
  SiteDay,
  SiteOverview,
  TopArticle,
  TrafficSources,
} from "./types";

/** The parts of a GA4 RunReportResponse these functions read. */
export interface ReportRow {
  dimensionValues?: ReadonlyArray<{ value?: string | null }> | null;
  metricValues?: ReadonlyArray<{ value?: string | null }> | null;
}

export interface ReportLike {
  dimensionHeaders?: ReadonlyArray<{ name?: string | null }> | null;
  rows?: ReadonlyArray<ReportRow> | null;
  totals?: ReadonlyArray<ReportRow> | null;
  metadata?: { timeZone?: string | null } | null;
}

type Report = ReportLike | null | undefined;

/** Names given to the two date ranges of period-over-period requests (see ga4.ts). */
export const CURRENT_PERIOD = "current";
export const PREVIOUS_PERIOD = "previous";

const dimension = (row: ReportRow, index: number): string => row.dimensionValues?.[index]?.value ?? "";

// GA4 returns every metric as a string ("1284", "95.5").
const metric = (row: ReportRow | undefined, index: number): number => {
  const value = Number(row?.metricValues?.[index]?.value ?? 0);
  return Number.isFinite(value) ? value : 0;
};

const sum = (rows: ReadonlyArray<ReportRow>, index: number) => rows.reduce((total, row) => total + metric(row, index), 0);

const share = (part: number, whole: number) => (whole > 0 ? part / whole : 0);

const perReader = (engagementSeconds: number, readers: number): number =>
  readers > 0 ? engagementSeconds / readers : 0;

/** Position of a dimension in the report's columns, by name. */
const columnOf = (report: Report, name: string, fallback: number) => {
  const index = report?.dimensionHeaders?.findIndex((header) => header.name === name) ?? -1;
  return index >= 0 ? index : fallback;
};

/**
 * Rows of a report requested with two named date ranges, split by period.
 * GA4 adds a "dateRange" column to such reports.
 */
export function rowsByPeriod(report: Report): { current: ReportRow[]; previous: ReportRow[] } {
  const column = columnOf(report, "dateRange", -1);
  const result = { current: [] as ReportRow[], previous: [] as ReportRow[] };
  for (const row of report?.rows ?? []) {
    const isPrevious = column >= 0 && dimension(row, column) === PREVIOUS_PERIOD;
    (isPrevious ? result.previous : result.current).push(row);
  }
  return result;
}

/** "20261107" -> "2026-11-07". */
const isoDay = (raw: string): string | null =>
  /^\d{8}$/.test(raw) ? `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6)}` : null;

/** One entry per day of the window, with `empty` for days GA4 omitted (no traffic). */
function fillDays<T>(startDate: string, days: number, byDay: Map<string, T>, empty: T): Array<T & { date: string }> {
  return Array.from({ length: days }, (_, offset) => {
    const date = addDays(startDate, offset);
    return { ...(byDay.get(date) ?? empty), date };
  });
}

/**
 * The first and last day covered by "N days ago" to "yesterday" in a time zone
 * (the GA4 property's, or Pacific Time for Search Console).
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

// --- Site-wide ------------------------------------------------------------------------

/**
 * kpis: no dimensions, two periods, metrics [activeUsers, screenPageViews, engagementRate].
 * cta: dimension [date], two periods, metric [eventCount], filtered to cta_click.
 * visitors: dimension [newVsReturning], metric [activeUsers].
 */
export function toSiteOverview(kpis: Report, cta: Report, visitors: Report): SiteOverview {
  const { current, previous } = rowsByPeriod(kpis);
  const clicks = rowsByPeriod(cta);
  const pair = (index: number): PeriodValue => ({ current: metric(current[0], index), previous: metric(previous[0], index) });

  let newUsers = 0;
  let returningUsers = 0;
  for (const row of visitors?.rows ?? []) {
    const kind = dimension(row, 0);
    if (kind === "new") newUsers += metric(row, 0);
    else if (kind === "returning") returningUsers += metric(row, 0);
  }

  return {
    activeUsers: pair(0),
    pageViews: pair(1),
    engagementRate: pair(2),
    ctaClicks: { current: sum(clicks.current, 0), previous: sum(clicks.previous, 0) },
    newUsers,
    returningUsers,
  };
}

/**
 * daily: dimension [date], metrics [activeUsers, screenPageViews, engagementRate].
 * cta: the same CTA report as toSiteOverview (only its current period is used).
 */
export function toSiteDaily(daily: Report, cta: Report, startDate: string, days: number): SiteDay[] {
  const clicksByDay = new Map<string, number>();
  const dateColumn = columnOf(cta, "date", 0);
  for (const row of rowsByPeriod(cta).current) {
    const date = isoDay(dimension(row, dateColumn));
    if (date) clicksByDay.set(date, (clicksByDay.get(date) ?? 0) + metric(row, 0));
  }

  const byDay = new Map<string, Omit<SiteDay, "date">>();
  for (const row of daily?.rows ?? []) {
    const date = isoDay(dimension(row, 0));
    if (!date) continue;
    byDay.set(date, {
      activeUsers: metric(row, 0),
      pageViews: metric(row, 1),
      engagementRate: metric(row, 2),
      ctaClicks: clicksByDay.get(date) ?? 0,
    });
  }
  // Days with CTA clicks but missing from the traffic report still count.
  for (const [date, ctaClicks] of clicksByDay) {
    if (!byDay.has(date)) byDay.set(date, { activeUsers: 0, pageViews: 0, engagementRate: 0, ctaClicks });
  }

  return fillDays(startDate, days, byDay, { activeUsers: 0, pageViews: 0, engagementRate: 0, ctaClicks: 0 });
}

/** dimension [country] or [city, country], metric [activeUsers], TOTAL aggregation. */
export function toPlaces(report: Report): PlaceStat[] {
  const rows = report?.rows ?? [];
  const total = Math.max(metric(report?.totals?.[0], 0), sum(rows, 0));
  return rows.map((row) => ({
    name: dimension(row, 0),
    detail: dimension(row, 1),
    users: metric(row, 0),
    share: share(metric(row, 0), total),
  }));
}

/** dimension [pagePath], metrics [screenPageViews, activeUsers, userEngagementDuration]. */
export function toPageStats(report: Report): PageStat[] {
  return (report?.rows ?? []).map((row) => ({
    path: dimension(row, 0),
    views: metric(row, 0),
    users: metric(row, 1),
    avgEngagementSeconds: perReader(metric(row, 2), metric(row, 1)),
  }));
}

/** dimension [pagePath], metric [eventCount], TOTAL aggregation, filtered to cta_click. */
export function toConvertingPages(report: Report): Array<{ path: string; clicks: number; share: number }> {
  const rows = report?.rows ?? [];
  const total = Math.max(metric(report?.totals?.[0], 0), sum(rows, 0));
  return rows.map((row) => ({ path: dimension(row, 0), clicks: metric(row, 0), share: share(metric(row, 0), total) }));
}

const DEVICE_ORDER: readonly DeviceKind[] = ["desktop", "mobile", "tablet", "other"];

/**
 * dimension [deviceCategory], metric [activeUsers]. Shares are of the summed
 * users (someone on two devices counts on both), so they add up to 100%.
 */
export function toDeviceSplit(report: Report): DeviceShare[] {
  const users = new Map<DeviceKind, number>();
  for (const row of report?.rows ?? []) {
    const raw = dimension(row, 0).toLowerCase();
    const device: DeviceKind = raw === "desktop" || raw === "mobile" || raw === "tablet" ? raw : "other";
    users.set(device, (users.get(device) ?? 0) + metric(row, 0));
  }
  const total = [...users.values()].reduce((a, b) => a + b, 0);
  return DEVICE_ORDER.map((device) => ({ device, users: users.get(device) ?? 0, share: share(users.get(device) ?? 0, total) }));
}

// --- Blog ----------------------------------------------------------------------------------

/** No dimensions, two periods, metrics [screenPageViews, activeUsers, userEngagementDuration]. */
export function toBlogOverview(report: Report): BlogOverview {
  const { current, previous } = rowsByPeriod(report);
  const read = (row: ReportRow | undefined) => {
    const readers = metric(row, 1);
    return { views: metric(row, 0), readers, avg: perReader(metric(row, 2), readers) };
  };
  const now = read(current[0]);
  const before = read(previous[0]);
  return {
    views: { current: now.views, previous: before.views },
    readers: { current: now.readers, previous: before.readers },
    avgEngagementSeconds: { current: now.avg, previous: before.avg },
  };
}

/** dimension [date], metrics [screenPageViews, activeUsers, userEngagementDuration]. */
export function toBlogDaily(report: Report, startDate: string, days: number): BlogDay[] {
  const byDay = new Map<string, Omit<BlogDay, "date">>();
  for (const row of report?.rows ?? []) {
    const date = isoDay(dimension(row, 0));
    if (!date) continue;
    const readers = metric(row, 1);
    byDay.set(date, { views: metric(row, 0), readers, avgEngagementSeconds: perReader(metric(row, 2), readers) });
  }
  return fillDays(startDate, days, byDay, { views: 0, readers: 0, avgEngagementSeconds: 0 });
}

/** dimension [pagePath], metrics [screenPageViews, activeUsers, userEngagementDuration]. */
export function toTopArticles(report: Report): Array<Omit<TopArticle, "title" | "postId">> {
  return (report?.rows ?? []).map((row) => {
    const readers = metric(row, 1);
    return {
      path: dimension(row, 0),
      views: metric(row, 0),
      readers,
      avgEngagementSeconds: perReader(metric(row, 2), readers),
    };
  });
}

/**
 * dimensions [sessionSource, sessionMedium, sessionDefaultChannelGroup], metric
 * [sessions], TOTAL aggregation. Returns the top `limit` sources by sessions;
 * everything else is folded into one "Other sources" row.
 */
export function toTrafficSources(report: Report, limit = 6): TrafficSources {
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

  const ranked = [...bySource]
    .map(([label, { sessions, channels }]) => ({
      label,
      // A merged source (e.g. linkedin.com + lnkd.in) takes its biggest channel group.
      channel: [...channels].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "",
      sessions,
    }))
    .sort((a, b) => b.sessions - a.sessions || a.label.localeCompare(b.label));

  const top = ranked.slice(0, limit);
  const rows = top.map((row) => ({ ...row, share: share(row.sessions, totalSessions), isOther: false }));

  const otherSessions = totalSessions - top.reduce((total, row) => total + row.sessions, 0);
  if (otherSessions > 0) {
    rows.push({
      label: "Other sources",
      channel: "",
      sessions: otherSessions,
      share: share(otherSessions, totalSessions),
      isOther: true,
    });
  }

  return { totalSessions, rows };
}
