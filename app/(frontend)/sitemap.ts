import type { MetadataRoute } from "next";

import { getSitemapEntries } from "@/lib/blog/queries";
import { getGlossarySitemapEntries } from "@/lib/glossary/queries";
import { SITE_URL } from "@/lib/site";

// Generated per request (from cached data) so new articles and glossary terms
// appear without a rebuild.
export const dynamic = "force-dynamic";

/** If the database is unreachable, still serve the marketing pages rather than an error. */
async function orEmpty<T>(label: string, load: () => Promise<T[]>): Promise<T[]> {
  try {
    return await load();
  } catch (error) {
    console.error(`sitemap: could not load ${label}`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [posts, terms] = await Promise.all([
    orEmpty("blog posts", getSitemapEntries),
    orEmpty("glossary terms", getGlossarySitemapEntries),
  ]);

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
