/**
 * Pure functions that turn Google Search Console searchAnalytics rows into the
 * dashboard's typed shapes. No network or SDK imports here, so they're easy to test.
 */
import { addDays } from "./format";
import type { SearchDay, SearchPageStat, SearchQueryStat, SearchTotals } from "./types";

/** The parts of a searchAnalytics.query row these functions read. */
export interface SearchRow {
  keys?: ReadonlyArray<string> | null;
  clicks?: number | null;
  impressions?: number | null;
  ctr?: number | null;
  position?: number | null;
}

type Rows = ReadonlyArray<SearchRow> | null | undefined;

const number = (value: number | null | undefined) => (typeof value === "number" && Number.isFinite(value) ? value : 0);

const totalsOf = (row: SearchRow | undefined): SearchTotals => ({
  clicks: number(row?.clicks),
  impressions: number(row?.impressions),
  ctr: number(row?.ctr),
  position: number(row?.position),
});

const ZERO: SearchTotals = { clicks: 0, impressions: 0, ctr: 0, position: 0 };

/** A query without dimensions returns one row with the period's totals (none if there was no data). */
export function toSearchTotals(rows: Rows): SearchTotals {
  return totalsOf(rows?.[0]);
}

/** dimension ["date"] (YYYY-MM-DD, Pacific Time). Days without data become zeros. */
export function toSearchDaily(rows: Rows, startDate: string, days: number): SearchDay[] {
  const byDay = new Map((rows ?? []).map((row) => [row.keys?.[0] ?? "", totalsOf(row)]));
  return Array.from({ length: days }, (_, offset) => {
    const date = addDays(startDate, offset);
    return { date, ...(byDay.get(date) ?? ZERO) };
  });
}

/** dimension ["query"], already sorted by clicks. */
export function toSearchQueries(rows: Rows): SearchQueryStat[] {
  return (rows ?? []).map((row) => ({ query: row.keys?.[0] ?? "", ...totalsOf(row) }));
}

/** "https://brigadely.com/blog/x?ref=1" -> "/blog/x?ref=1". */
function pathOf(url: string): string {
  try {
    const { pathname, search } = new URL(url);
    return `${pathname}${search}` || "/";
  } catch {
    return url;
  }
}

/** dimension ["page"] (full URLs), already sorted by clicks. */
export function toSearchPages(rows: Rows): Array<Omit<SearchPageStat, "title" | "postId">> {
  return (rows ?? []).map((row) => {
    const url = row.keys?.[0] ?? "";
    return { url, path: pathOf(url), ...totalsOf(row) };
  });
}
