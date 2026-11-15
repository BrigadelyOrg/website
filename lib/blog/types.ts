import type { Post } from "@/payload-types";

// View models for the public blog: only what the pages render, so the client
// bundle never receives rich-text JSON, author emails or other CMS internals.

export type BlogImage = {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export type BlogCategory = {
  id: number;
  title: string;
  slug: string;
};

export type BlogAuthor = {
  name: string;
  roleTitle: string | null;
  /** For "About the author"; written in the third person. */
  bio: string | null;
  avatar: BlogImage | null;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

/** A post as shown on cards (/blog grid and "Related articles"). */
export type BlogPostCard = {
  id: number;
  slug: string;
  title: string;
  publishedDate: string;
  coverImage: BlogImage | null;
  authorName: string;
  category: BlogCategory | null;
};

/** A full post for /blog/[slug]. */
export type BlogPost = Omit<BlogPostCard, "authorName"> & {
  excerpt: string;
  readTime: number;
  keyTakeaways: string[];
  content: Post["content"];
  faqs: BlogFaq[];
  author: BlogAuthor | null;
  updatedAt: string;
  meta: {
    title: string | null;
    description: string | null;
    image: BlogImage | null;
  };
};

export type BlogSitemapEntry = {
  slug: string;
  updatedAt: string;
};
