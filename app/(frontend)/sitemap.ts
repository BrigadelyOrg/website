import type { MetadataRoute } from "next";

import { getSitemapEntries } from "@/lib/blog/queries";
import { getGlossarySitemapEntries } from "@/lib/glossary/queries";
import { FEATURE_SLUGS } from "@/content/navigation";
import { SITE_URL } from "@/lib/site";

// Generated per request (from cached data) so new articles and glossary terms
// appear without a rebuild. Posts and glossary terms have no Payload drafts
// (`versions.drafts` is off); both queries filter on their own `status` field,
// so only published entries are listed.
export const dynamic = "force-dynamic";

// Fixed dates for hand-written pages: a lastmod that changes on every request
// tells search engines nothing.
const HOME_UPDATED = "2026-11-19T00:00:00.000Z"; // Update this date whenever homepage content changes
const LEGAL_UPDATED = "2026-11-16T00:00:00.000Z";
// The six product feature pages (copy in content/featurePages.ts).
const FEATURES_UPDATED = "2026-11-19T00:00:00.000Z";
/** For /blog and /glossary when nothing is published (or the CMS is unreachable). */
const LISTING_FALLBACK = "2026-11-16T00:00:00.000Z";

/** If the database is unreachable, still serve the marketing pages rather than an error. */
async function orEmpty<T>(label: string, load: () => Promise<T[]>): Promise<T[]> {
  try {
    return await load();
  } catch (error) {
    console.error(`sitemap: could not load ${label}`, error);
    return [];
  }
}

/**
 * A listing page changes when its newest entry does: the latest `updatedAt`
 * among the published entries (the same as querying them by -updatedAt, limit 1).
 */
function newestUpdate(entries: readonly { updatedAt: string }[]): string {
  return entries.reduce(
    (newest, entry) => (entry.updatedAt > newest ? entry.updatedAt : newest),
    LISTING_FALLBACK,
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, terms] = await Promise.all([
    orEmpty("blog posts", getSitemapEntries),
    orEmpty("glossary terms", getGlossarySitemapEntries),
  ]);

  // /pricing is deliberately left out (the page is noindex).
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: HOME_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    ...FEATURE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: FEATURES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/blog`, lastModified: newestUpdate(posts), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/glossary`, lastModified: newestUpdate(terms), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...terms.map((term) => ({
      url: `${SITE_URL}/glossary/${term.slug}`,
      lastModified: term.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
