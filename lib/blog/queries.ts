import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload, type Where } from "payload";
import { cache } from "react";

import type { Category, Media, Post, User } from "@/payload-types";

import { BLOG_CACHE_TAG, BLOG_CACHE_TTL_SECONDS } from "./cache";
import type {
  BlogAuthor,
  BlogCategory,
  BlogImage,
  BlogPost,
  BlogPostCard,
  BlogSitemapEntry,
} from "./types";

// Results are cached in the Next.js data cache and expired by Payload hooks on
// every CMS save (see lib/blog/cache.ts), so readers rarely wait on Neon.
const CACHE_OPTIONS = { tags: [BLOG_CACHE_TAG], revalidate: BLOG_CACHE_TTL_SECONDS };

const PUBLISHED: Where = { status: { equals: "published" } };

/** Columns a card needs; skips `content`, the heavy rich-text JSON. */
const CARD_FIELDS = {
  title: true,
  slug: true,
  publishedDate: true,
  coverImage: true,
  author: true,
  category: true,
} as const;

type BaseSource = Pick<Post, "id" | "title" | "slug" | "publishedDate" | "coverImage" | "category">;
type CardSource = BaseSource & Pick<Post, "author">;

// --- Mapping: Payload documents → view models ---------------------------------

/** An uploaded image, if it was populated (depth ≥ 1) and has a URL. Also used by the glossary. */
export function toImage(value: number | Media | null | undefined): BlogImage | null {
  if (typeof value !== "object" || value === null || !value.url) return null;
  return {
    url: value.url,
    alt: value.alt,
    width: value.width ?? null,
    height: value.height ?? null,
  };
}

function toCategory(value: number | Category | null | undefined): BlogCategory | null {
  if (typeof value !== "object" || value === null) return null;
  return { id: value.id, title: value.title, slug: value.slug };
}

function toAuthor(value: number | User | null | undefined): BlogAuthor | null {
  if (typeof value !== "object" || value === null) return null;
  return { name: value.name, roleTitle: value.roleTitle ?? null, avatar: toImage(value.avatar) };
}

/** Fields shared by cards and full posts. */
function toPostBase(doc: BaseSource) {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    publishedDate: doc.publishedDate,
    coverImage: toImage(doc.coverImage),
    category: toCategory(doc.category),
  };
}

function toPostCard(doc: CardSource): BlogPostCard {
  return {
    ...toPostBase(doc),
    authorName: toAuthor(doc.author)?.name ?? "Brigadely",
  };
}

function toPost(doc: Post): BlogPost {
  return {
    ...toPostBase(doc),
    excerpt: doc.excerpt,
    readTime: doc.readTime,
    content: doc.content,
    author: toAuthor(doc.author),
    updatedAt: doc.updatedAt,
    meta: {
      // Blank SEO fields fall back to the post's own title, excerpt and cover.
      title: doc.meta?.title || null,
      description: doc.meta?.description || null,
      image: toImage(doc.meta?.image),
    },
  };
}

// --- Queries ---------------------------------------------------------------------

async function fetchPublishedPosts(): Promise<BlogPostCard[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: PUBLISHED,
    sort: "-publishedDate",
    depth: 1,
    pagination: false,
    select: CARD_FIELDS,
  });
  return docs.map(toPostCard);
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    // 2 levels: post → author → avatar, and images/links inside the content.
    depth: 2,
    limit: 1,
  });
  return docs[0] ? toPost(docs[0]) : null;
}

async function fetchRelatedPosts(postId: number, categoryId: number): Promise<BlogPostCard[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: {
      and: [PUBLISHED, { category: { equals: categoryId } }, { id: { not_equals: postId } }],
    },
    sort: "-publishedDate",
    depth: 1,
    limit: 3,
    select: CARD_FIELDS,
  });
  return docs.map(toPostCard);
}

async function fetchSitemapEntries(): Promise<BlogSitemapEntry[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: PUBLISHED,
    depth: 0,
    pagination: false,
    select: { slug: true, updatedAt: true },
  });
  return docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
}

// React's `cache` dedupes calls within one request (generateMetadata + page);
// `unstable_cache` persists results across requests until the blog tag expires.

/** All published posts, newest first. */
export const getPublishedPosts = cache(
  unstable_cache(fetchPublishedPosts, ["blog", "published-posts"], CACHE_OPTIONS),
);

/** A published post by slug, or null (drafts are never returned). */
export const getPostBySlug = cache(
  unstable_cache(fetchPostBySlug, ["blog", "post-by-slug"], CACHE_OPTIONS),
);

/** Up to 3 other published posts in the same category, newest first. */
export const getRelatedPosts = cache(
  unstable_cache(fetchRelatedPosts, ["blog", "related-posts"], CACHE_OPTIONS),
);

/** Slug and last-modified date of every published post. */
export const getSitemapEntries = unstable_cache(
  fetchSitemapEntries,
  ["blog", "sitemap-entries"],
  CACHE_OPTIONS,
);

/** Categories that have at least one published post, A–Z. */
export function categoriesWithPosts(posts: BlogPostCard[]): BlogCategory[] {
  const byId = new Map<number, BlogCategory>();
  for (const post of posts) {
    if (post.category) byId.set(post.category.id, post.category);
  }
  return [...byId.values()].sort((a, b) => a.title.localeCompare(b.title));
}
