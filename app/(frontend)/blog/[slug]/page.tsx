import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import AuthorByline from "@/components/blog/AuthorByline";
import BlogCTA from "@/components/blog/BlogCTA";
import PostCard from "@/components/blog/PostCard";
import RichText from "@/components/blog/RichText";
import { formatPostDate } from "@/lib/blog/format";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog/queries";
import type { BlogImage } from "@/lib/blog/types";
import { SITE_URL } from "@/lib/site";

// Rendered per request from cached queries, so `next build` never needs the
// database. Publishing in /admin expires the cache straight away.
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function socialImages(image: BlogImage | null) {
  if (!image) return undefined;
  return [
    {
      url: image.url,
      alt: image.alt,
      ...(image.width && image.height ? { width: image.width, height: image.height } : {}),
    },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: true } };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const description = post.meta.description ?? post.excerpt;
  const images = socialImages(post.meta.image ?? post.coverImage);
  // An SEO title set in the CMS is used exactly as written (it is what the SEO
  // tab previews); otherwise the layout's "%s | Brigadely" template applies.
  const socialTitle = post.meta.title ?? `${post.title} | Brigadely`;

  return {
    title: post.meta.title ? { absolute: post.meta.title } : post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Brigadely",
      locale: "en_NG",
      title: socialTitle,
      description,
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author.name] : undefined,
      section: post.category?.title,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images: images?.map((image) => image.url),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = post.category ? await getRelatedPosts(post.id, post.category.id) : [];
  const shareImage = post.meta.image ?? post.coverImage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta.description ?? post.excerpt,
    image: shareImage ? [absoluteUrl(shareImage.url)] : undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    author: post.author
      ? { "@type": "Person", name: post.author.name, jobTitle: post.author.roleTitle ?? undefined }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Brigadely",
      logo: { "@type": "ImageObject", url: absoluteUrl("/img/logo1.png") },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category?.title,
  };

  return (
    <main>
      <JsonLd schema={articleSchema} />

      <article>
        <header
          className={`bg-[#F4EFE4] px-6 pt-32 lg:pt-36 ${post.coverImage ? "pb-32 md:pb-48" : "pb-16 md:pb-20"}`}
        >
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-sm font-sans text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a3d] focus-visible:ring-offset-2"
            >
              <span aria-hidden="true">←</span> Back to blog
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-sm text-gray-500">
              {post.category && (
                <span className="rounded-full bg-[#e0f3ec] px-3 py-1 text-xs font-semibold text-[#007a3d]">
                  {post.category.title}
                </span>
              )}
              <time dateTime={post.publishedDate}>{formatPostDate(post.publishedDate)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} min read</span>
            </div>

            <h1 className="mt-6 text-balance font-sans text-4xl font-black leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-5xl lg:text-[3.5rem]">
              {post.title}
            </h1>

            <p className="mt-6 font-sans text-lg leading-relaxed text-gray-600 md:text-xl">
              {post.excerpt}
            </p>

            {post.author && (
              <div className="mt-10">
                <AuthorByline author={post.author} />
              </div>
            )}
          </div>
        </header>

        {post.coverImage && (
          <div className="-mt-20 px-6 md:-mt-36">
            <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-3xl bg-[#e9e3d6] shadow-[0_24px_60px_-28px_rgba(17,17,17,0.35)]">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                preload
                sizes="(min-width: 1072px) 1024px, calc(100vw - 48px)"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="px-6 pt-14 md:pt-20">
          <RichText data={post.content} className="mx-auto max-w-3xl" />
        </div>
      </article>

      <BlogCTA className="pb-20 pt-20 md:pt-24" />

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-white px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <h2
              id="related-heading"
              className="mb-10 font-sans text-3xl font-black leading-[0.95] tracking-[-0.03em] text-[#111111] md:text-4xl"
            >
              Related <span className="text-[#007a3d]">articles.</span>
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
