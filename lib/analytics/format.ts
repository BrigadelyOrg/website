/** Number, duration and date formatting shared by the analytics API and dashboard. */

const integerFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const compactFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Every digit, for tables, tooltips and axes: 12,904. */
export function formatInteger(value: number): string {
  return integerFormat.format(Math.round(value));
}

/** Headline figures: in full below 10,000 (1,284), compact above (12.9K, 1.2M). */
export function formatCount(value: number): string {
  return Math.abs(value) < 10_000 ? formatInteger(value) : compactFormat.format(value);
}

/** Durations the way GA4 shows them: 95 seconds -> "1m 35s", 42 -> "0m 42s". */
export function formatDuration(totalSeconds: number): string {
  const seconds = Number.isFinite(totalSeconds) ? Math.max(0, Math.round(totalSeconds)) : 0;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
}

/** 0.4231 -> "42%". Shares that would round to 0% but aren't zero read "<1%". */
export function formatShare(share: number): string {
  if (share > 0 && share < 0.005) return "<1%";
  return `${Math.round(share * 100)}%`;
}

// GA4 reports calendar days (YYYY-MM-DD) in the property's time zone. Format
// them as plain dates (UTC midnight) so the viewer's time zone can't shift them.
const toDate = (isoDay: string) => new Date(`${isoDay}T00:00:00Z`);
const shortDay = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const weekdayDay = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const fullDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-11-07" -> "Nov 7". */
export const formatDay = (isoDay: string): string => shortDay.format(toDate(isoDay));

/** "2026-11-07" -> "Sat, Nov 7". */
export const formatDayWithWeekday = (isoDay: string): string => weekdayDay.format(toDate(isoDay));

/** "Oct 15 – Nov 13, 2026" (both years shown when the range spans New Year). */
export const formatDayRange = (startDay: string, endDay: string): string =>
  fullDay.formatRange(toDate(startDay), toDate(endDay));

/** Adds (or with a negative number, subtracts) whole days: ("2026-03-01", -1) -> "2026-02-28". */
export function addDays(isoDay: string, days: number): string {
  const date = toDate(isoDay);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
