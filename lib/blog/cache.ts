import { revalidateTag } from "next/cache";

/**
 * Every cached blog query carries this tag, so a single call refreshes the
 * whole blog: posts, categories, authors and images all feed the same pages.
 */
export const BLOG_CACHE_TAG = "blog";

/**
 * Safety net only. Payload hooks expire the cache on every save, so this
 * matters solely for changes made outside the CMS (e.g. direct SQL edits).
 */
export const BLOG_CACHE_TTL_SECONDS = 3600;

/**
 * Expires all cached blog data. Called from Payload `afterChange` /
 * `afterDelete` hooks. Next.js applies the expiry when the current request
 * finishes, i.e. after Payload has committed its database transaction.
 */
export function revalidateBlogCache(): void {
  try {
    // `expire: 0` makes the next visitor get fresh data rather than a stale copy.
    revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  } catch {
    // Outside a Next.js request (Payload CLI, migrations, scripts) there is no
    // request-scoped cache to expire, so there is nothing to do.
  }
}
