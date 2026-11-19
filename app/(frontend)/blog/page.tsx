import type { Metadata } from "next";
import Link from "next/link";

import BlogCTA from "@/components/blog/BlogCTA";
import BlogIndex from "@/components/blog/BlogIndex";
import { categoriesWithPosts, getPublishedPosts } from "@/lib/blog/queries";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

// Rendered per request from cached queries, so `next build` never needs the
// database. Publishing in /admin expires the cache straight away.
export const dynamic = "force-dynamic";

const TITLE = "Blog: Resources and insights";
const DESCRIPTION =
  "Guides, compliance updates, and financial operations insights for African businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "Brigadely",
    locale: "en_NG",
    title: `${TITLE} | Brigadely`,
    description: DESCRIPTION,
    // This `openGraph` replaces the root layout's, so it needs its own image.
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Brigadely`,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const categories = categoriesWithPosts(posts);

  return (
    <main>
      <section className="bg-[#F4EFE4] px-6 pb-16 pt-32 md:pb-20 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center rounded-full bg-[#e0f3ec] px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#007a3d]">
            Our Blog
          </span>
          <h1 className="mt-6 max-w-3xl font-sans text-5xl font-black leading-[0.93] tracking-[-0.03em] text-[#111111] md:text-6xl lg:text-7xl">
            Resources and <span className="text-[#007a3d]">insights.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-gray-600">
            {DESCRIPTION}
          </p>
          <p className="mt-5 font-sans text-sm text-gray-500">
            New to a term?{" "}
            <Link
              href="/glossary"
              className="rounded-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Browse the glossary <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section aria-label="Articles" className="bg-white px-6 pb-4 pt-14 md:pt-20">
        <div className="mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <BlogIndex posts={posts} categories={categories} />
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-20 text-center">
              <p className="font-sans text-lg font-semibold text-[#111111]">No articles yet.</p>
              <p className="mt-2 font-sans text-sm text-gray-500">
                Guides on payroll, compliance, and financial operations are on the way.
              </p>
            </div>
          )}
        </div>
      </section>

      <BlogCTA className="pb-24 pt-20 md:pt-28" />
    </main>
  );
}
