import { ChevronDown, FileText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import AboutTheAuthor from "@/components/blog/AboutTheAuthor";
import ArticleFaqs from "@/components/blog/ArticleFaqs";
import ArticleTableOfContents from "@/components/blog/ArticleTableOfContents";
import AuthorAvatar from "@/components/blog/AuthorAvatar";
import BlogCTA from "@/components/blog/BlogCTA";
import KeyTakeaways from "@/components/blog/KeyTakeaways";
import PostCard from "@/components/blog/PostCard";
import RichText from "@/components/blog/RichText";
import ShareButtons from "@/components/blog/ShareButtons";
import { formatPostDate } from "@/lib/blog/format";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog/queries";
import { getContentSettings } from "@/lib/blog/settings";
import type { BlogImage } from "@/lib/blog/types";
import { outlineOf, type OutlineEntry } from "@/lib/outline";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// Rendered per request from cached queries, so `next build` never needs the
// database. Publishing in /admin expires the cache straight away.
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Ids this page uses outside the article text; headings in the text get other ones. */
const PAGE_IDS = [
  "article-body",
  "faqs",
  "faqs-heading",
  "key-takeaways-heading",
  "about-the-author-heading",
  "toc-heading",
  "related-heading",
  "blog-cta-heading",
];

/** Below this many sections, a table of contents isn't worth the space. */
const MIN_TOC_ENTRIES = 2;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

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
  const [post, settings] = await Promise.all([getPostBySlug(slug), getContentSettings()]);
  if (!post) notFound();

  const related = post.category ? await getRelatedPosts(post.id, post.category.id) : [];
  const url = `${SITE_URL}/blog/${post.slug}`;
  const shareImage = post.meta.image ?? post.coverImage;

  const { entries, headingIds } = outlineOf(post.content, PAGE_IDS);
  const toc: OutlineEntry[] = post.faqs.length > 0 ? [...entries, { id: "faqs", title: "FAQs" }] : entries;
  const hasToc = toc.length >= MIN_TOC_ENTRIES;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta.description ?? post.excerpt,
    image: shareImage ? [absoluteUrl(shareImage.url)] : undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.roleTitle ?? undefined,
          description: post.author.bio ?? undefined,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Brigadely",
      logo: { "@type": "ImageObject", url: absoluteUrl("/img/logo1.png") },
    },
    mainEntityOfPage: url,
    articleSection: post.category?.title,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <main>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <article>
        <header className="bg-[#F4EFE4] px-6 pb-14 pt-28 md:pb-20 lg:pt-32">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm">
                <li>
                  <Link href="/" className={`rounded-sm text-gray-500 transition-colors hover:text-primary ${FOCUS_RING}`}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-400">
                  ›
                </li>
                <li>
                  <Link href="/blog" className={`rounded-sm text-gray-500 transition-colors hover:text-primary ${FOCUS_RING}`}>
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-400">
                  ›
                </li>
                <li aria-current="page" className="min-w-0 max-w-full truncate text-[#111111] sm:max-w-md">
                  {post.title}
                </li>
              </ol>
            </nav>

            <div
              className={cn(
                "mt-8 grid items-center gap-10 md:mt-10",
                post.coverImage && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20",
              )}
            >
              <div>
                <p className="flex items-center gap-2.5 font-sans text-sm text-[#111111]">
                  <FileText aria-hidden="true" className="h-4 w-4" />
                  <span className="font-semibold">Article</span>
                  <span aria-hidden="true" className="h-4 w-px bg-[#111111]/20" />
                  <span className="text-gray-600">{post.readTime} min read</span>
                </p>

                <h1 className="mt-5 text-balance font-sans text-4xl font-black leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-5xl xl:text-[3.5rem]">
                  {post.title}
                </h1>

                {post.category && (
                  <p className="mt-6">
                    <span className="inline-flex rounded-md border border-[#111111]/10 bg-white px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111111]">
                      {post.category.title}
                    </span>
                  </p>
                )}

                <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-gray-600">{post.excerpt}</p>

                <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-[#111111]/10 pt-6">
                  {post.author && (
                    <div className="flex items-center gap-3">
                      <AuthorAvatar author={post.author} size={52} />
                      <div className="font-sans">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">Author</p>
                        <p className="mt-1 text-base font-medium text-[#111111]">{post.author.name}</p>
                      </div>
                    </div>
                  )}
                  <div className="font-sans sm:text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">Last updated</p>
                    <time dateTime={post.updatedAt} className="mt-1 block text-base font-medium text-[#111111]">
                      {formatPostDate(post.updatedAt)}
                    </time>
                  </div>
                </div>
              </div>

              {post.coverImage && (
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#e9e3d6] shadow-[0_24px_60px_-28px_rgba(17,17,17,0.35)]">
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.alt}
                    fill
                    preload
                    sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, calc(100vw - 48px)"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="px-6 py-12 md:py-16 lg:py-20">
          <div className={cn("mx-auto flex max-w-7xl gap-10 xl:gap-14", !hasToc && "justify-center")}>
            {hasToc && (
              <aside className="sticky top-28 hidden w-64 shrink-0 self-start lg:block xl:w-72">
                <ArticleTableOfContents entries={toc} button={settings.tocButton} />
              </aside>
            )}

            <div id="article-body" className="min-w-0 max-w-3xl flex-1">
              {/* Phones and tablets: the table of contents folds into the top of the article. */}
              {hasToc && (
                <details className="group mb-10 rounded-2xl border border-gray-200 px-5 py-4 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-semibold text-[#111111] [&::-webkit-details-marker]:hidden">
                    Table of Contents
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <ol className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                    {toc.map((entry) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          className="font-sans text-sm text-gray-600 transition-colors hover:text-primary"
                        >
                          {entry.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {post.keyTakeaways.length > 0 && (
                <div className="mb-12">
                  <KeyTakeaways items={post.keyTakeaways} />
                </div>
              )}

              <RichText data={post.content} headingIds={headingIds} />

              {post.faqs.length > 0 && <ArticleFaqs faqs={post.faqs} />}

              {post.author && <AboutTheAuthor author={post.author} />}

              <ShareButtons variant="inline" url={url} title={post.title} className="mt-12 xl:hidden" />
            </div>

            <aside aria-label="Share and navigation" className="sticky top-28 hidden w-12 shrink-0 self-start xl:block">
              <ShareButtons variant="rail" url={url} title={post.title} progressTargetId="article-body" />
            </aside>
          </div>
        </div>
      </article>

      <BlogCTA className="pb-20 pt-6 md:pt-10" />

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
