import type { MetadataRoute } from "next";

import { getSitemapEntries } from "@/lib/blog/queries";
import type { BlogSitemapEntry } from "@/lib/blog/types";
import { SITE_URL } from "@/lib/site";

// Generated per request (from cached data) so new articles appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // If the database is unreachable, still serve the marketing pages rather than an error.
  let posts: BlogSitemapEntry[] = [];
  try {
    posts = await getSitemapEntries();
  } catch (error) {
    console.error("sitemap: could not load blog posts", error);
  }

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
