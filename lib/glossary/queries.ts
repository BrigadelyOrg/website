import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload, type Where } from "payload";
import { cache } from "react";

import { toImage } from "@/lib/blog/queries";
import type { GlossaryTerm, Post } from "@/payload-types";

import { GLOSSARY_CACHE_OPTIONS } from "./cache";
import type {
  GlossaryRelatedPost,
  GlossarySitemapEntry,
  GlossaryTermLink,
  GlossaryTermPage,
} from "./types";

// Results are cached in the Next.js data cache and expired by Payload hooks on
// every CMS save (see lib/glossary/cache.ts), like the blog's.

const PUBLISHED: Where = { status: { equals: "published" } };

// --- Mapping: Payload documents → view models ---------------------------------

/** Related terms and posts that are populated and published; drafts never leak onto the site. */
function publishedTerms(values: GlossaryTerm["relatedTerms"]): GlossaryTermLink[] {
  return (values ?? []).flatMap((value) =>
    typeof value === "object" && value.status === "published" ? [{ slug: value.slug, term: value.term }] : [],
  );
}

function publishedPosts(values: GlossaryTerm["relatedPosts"]): GlossaryRelatedPost[] {
  return (values ?? []).flatMap((value: number | Post) =>
    typeof value === "object" && value.status === "published"
      ? [
          {
            slug: value.slug,
            title: value.title,
            publishedDate: value.publishedDate,
            categoryTitle: typeof value.category === "object" ? value.category.title : null,
          },
        ]
      : [],
  );
}

function toTermPage(doc: GlossaryTerm): GlossaryTermPage {
  return {
    id: doc.id,
    slug: doc.slug,
    term: doc.term,
    shortDefinition: doc.shortDefinition,
    category: doc.category,
    content: doc.content,
    faqs: (doc.faqs ?? []).map(({ question, answer }) => ({ question, answer })),
    relatedTerms: publishedTerms(doc.relatedTerms),
    relatedPosts: publishedPosts(doc.relatedPosts),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    meta: {
      // Blank SEO fields fall back to "What is {term}?" and the short definition.
      title: doc.meta?.title || null,
      description: doc.meta?.description || null,
      image: toImage(doc.meta?.image),
    },
  };
}

// --- Queries ---------------------------------------------------------------------

async function fetchGlossaryIndex(): Promise<GlossaryTermLink[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "glossary",
    where: PUBLISHED,
    sort: "term",
    depth: 0,
    pagination: false,
    select: { term: true, slug: true },
  });
  return docs.map(({ slug, term }) => ({ slug, term }));
}

async function fetchGlossaryTerm(slug: string): Promise<GlossaryTermPage | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "glossary",
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    // 2 levels: term → related posts → their category, and the documents that
    // internal links in the content point at. `populate` keeps those small.
    depth: 2,
    limit: 1,
    populate: {
      glossary: { term: true, slug: true, status: true },
      posts: { title: true, slug: true, status: true, publishedDate: true, category: true },
      categories: { title: true },
    },
  });
  return docs[0] ? toTermPage(docs[0]) : null;
}

async function fetchGlossarySitemapEntries(): Promise<GlossarySitemapEntry[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "glossary",
    where: PUBLISHED,
    depth: 0,
    pagination: false,
    select: { slug: true, updatedAt: true },
  });
  return docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
}

// React's `cache` dedupes calls within one request (generateMetadata + page);
// `unstable_cache` persists results across requests until a CMS save expires them.

/** Every published term (slug and name), for the /glossary directory. */
export const getGlossaryIndex = cache(
  unstable_cache(fetchGlossaryIndex, ["glossary", "index"], GLOSSARY_CACHE_OPTIONS),
);

/** A published term by slug, or null (drafts are never returned). */
export const getGlossaryTerm = cache(
  unstable_cache(fetchGlossaryTerm, ["glossary", "term-by-slug"], GLOSSARY_CACHE_OPTIONS),
);

/** Slug and last-modified date of every published term. */
export const getGlossarySitemapEntries = unstable_cache(
  fetchGlossarySitemapEntries,
  ["glossary", "sitemap-entries"],
  GLOSSARY_CACHE_OPTIONS,
);
