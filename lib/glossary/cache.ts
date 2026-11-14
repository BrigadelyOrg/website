import { revalidateTag } from "next/cache";

import { BLOG_CACHE_TAG, BLOG_CACHE_TTL_SECONDS } from "../blog/cache";

/** Every cached glossary query carries this tag (see lib/glossary/queries.ts). */
export const GLOSSARY_CACHE_TAG = "glossary";

/**
 * Glossary pages also show related blog posts, so their queries carry the blog
 * tag too: editing a post, its category or its cover refreshes them as well.
 */
export const GLOSSARY_CACHE_OPTIONS = {
  tags: [GLOSSARY_CACHE_TAG, BLOG_CACHE_TAG],
  // Safety net only, as for the blog: Payload hooks expire the cache on every save.
  revalidate: BLOG_CACHE_TTL_SECONDS,
};

/**
 * Expires all cached glossary data: /glossary, every term page and the
 * sitemap. Called from the glossary collection's Payload hooks.
 */
export function revalidateGlossaryCache(): void {
  try {
    // `expire: 0` makes the next visitor get fresh data rather than a stale copy.
    revalidateTag(GLOSSARY_CACHE_TAG, { expire: 0 });
    // Articles can link to terms inline, and those links are built from the term's slug.
    revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  } catch {
    // Outside a Next.js request (Payload CLI, migrations, seed scripts) there is
    // no request-scoped cache to expire, so there is nothing to do.
  }
}
