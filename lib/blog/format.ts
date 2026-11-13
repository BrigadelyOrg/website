// Payload stores date-only values at 12:00 UTC, so formatting in UTC shows the
// date the writer picked and renders identically on the server and the client.
const postDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-28T12:00:00.000Z" → "Sep 28, 2026" */
export function formatPostDate(isoDate: string): string {
  return postDateFormatter.format(new Date(isoDate));
}
