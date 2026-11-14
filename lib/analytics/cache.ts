/**
 * Server only: the 15-minute cache in front of Google's APIs (Next.js data
 * cache, shared by every server instance), with a manual refresh.
 */
import { revalidateTag, unstable_cache } from "next/cache";

/** Google is asked at most once per 15 minutes per data source and range. */
export const ANALYTICS_CACHE_SECONDS = 15 * 60;

/** A manual refresh within a minute of the last fetch reuses it (protects the API quota). */
const MIN_REFRESH_AGE_MS = 60 * 1000;

/**
 * The cached report for `key`, or a fresh one when it's older than 15 minutes
 * or a manual refresh asks for it.
 */
export async function cachedReport<T extends { fetchedAt: string }>({
  key,
  fetcher,
  refresh = false,
}: {
  key: string[];
  fetcher: () => Promise<T>;
  refresh?: boolean;
}): Promise<T> {
  const tag = `analytics:${key.join(":")}`;
  const cached = await unstable_cache(fetcher, ["analytics", ...key], {
    revalidate: ANALYTICS_CACHE_SECONDS,
    tags: [tag],
  })();

  // Past its 15 minutes the cache still hands back the old entry once while it
  // refreshes in the background. After a quiet night that could be yesterday's
  // numbers, so fetch now instead; same for a manual refresh.
  const age = Date.now() - Date.parse(cached.fetchedAt);
  if (age < (refresh ? MIN_REFRESH_AGE_MS : ANALYTICS_CACHE_SECONDS * 1000)) return cached;

  try {
    const fresh = await fetcher();
    // Drop the old entry so the next visitor sees these numbers too.
    revalidateTag(tag, { expire: 0 });
    return fresh;
  } catch {
    return cached; // Google unavailable: older numbers (with their timestamp) beat an error
  }
}
