import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import ArticleTableOfContents from "@/components/blog/ArticleTableOfContents";
import MobileTableOfContents from "@/components/blog/MobileTableOfContents";
import RichText from "@/components/blog/RichText";
import GlossaryCTA from "@/components/glossary/GlossaryCTA";
import GlossaryFeatureCallout from "@/components/glossary/GlossaryFeatureCallout";
import QuickSearch from "@/components/glossary/QuickSearch";
import { formatPostDate } from "@/lib/blog/format";
import { getContentSettings } from "@/lib/blog/settings";
import { glossaryCategoryLabel } from "@/lib/glossary/categories";
import { outlineOf, type OutlineEntry } from "@/lib/outline";
import { getGlossaryTerm } from "@/lib/glossary/queries";
import { GLOSSARY_SET_NAME } from "@/lib/glossary/schema";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

// Rendered per request from cached queries, so `next build` never needs the
// database. Publishing in /admin expires the cache straight away.
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const GLOSSARY_URL = `${SITE_URL}/glossary`;

/** Ids this page uses outside the content; content headings get other ones. */
const PAGE_IDS = [
  "top",
  "faqs",
  "faqs-heading",
  "related-terms-heading",
  "related-posts-heading",
  "glossary-cta-heading",
  "glossary-feature-callout-heading",
  "toc-heading",
  "glossary-quick-search",
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

// Quote blocks in a definition read as callouts: a tinted panel, not a pull quote.
const CALLOUTS = [
  "prose-blockquote:not-italic prose-blockquote:rounded-r-2xl prose-blockquote:border-l-4 prose-blockquote:border-primary",
  "prose-blockquote:bg-brand-mint/60 prose-blockquote:px-6 prose-blockquote:py-4",
  "prose-blockquote:text-base prose-blockquote:font-medium prose-blockquote:leading-relaxed prose-blockquote:text-[#111111]",
].join(" ");

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = await getGlossaryTerm(slug);
  if (!term) {
    return { title: "Term not found", robots: { index: false, follow: true } };
  }

  const url = `${GLOSSARY_URL}/${term.slug}`;
  const description = term.meta.description ?? term.shortDefinition;
  // An SEO title set in the CMS is used exactly as written; otherwise
  // "What is {term}?" gets the layout's "| Brigadely" suffix.
  const fallbackTitle = `What is ${term.term}?`;
  const socialTitle = term.meta.title ?? `${fallbackTitle} | Brigadely`;
  // This page sets its own openGraph, which replaces the root layout's: an SEO image from
  // the CMS (made absolute) or, explicitly, the site's default share image.
  const image = term.meta.image;
  const images = image
    ? [{ url: new URL(image.url, SITE_URL).toString(), alt: image.alt, ...(image.width && image.height ? { width: image.width, height: image.height } : {}) }]
    : [DEFAULT_OG_IMAGE];

  return {
    title: term.meta.title ? { absolute: term.meta.title } : fallbackTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Brigadely",
      locale: "en_NG",
      title: socialTitle,
      description,
      publishedTime: term.createdAt,
      modifiedTime: term.updatedAt,
      section: "Glossary",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.map((entry) => entry.url),
    },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const [term, settings] = await Promise.all([getGlossaryTerm(slug), getContentSettings()]);
  if (!term) notFound();

  const url = `${GLOSSARY_URL}/${term.slug}`;
  const category = glossaryCategoryLabel(term.category);
  const { entries, headingIds } = outlineOf(term.content, PAGE_IDS);
  const toc: OutlineEntry[] = term.faqs.length > 0 ? [...entries, { id: "faqs", title: "FAQs" }] : entries;
  const hasRelated = term.relatedTerms.length > 0 || term.relatedPosts.length > 0;

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url,
    name: term.term,
    description: term.shortDefinition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": GLOSSARY_URL,
      name: GLOSSARY_SET_NAME,
      url: GLOSSARY_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Glossary", item: GLOSSARY_URL },
      { "@type": "ListItem", position: 3, name: term.term, item: url },
    ],
  };

  const faqSchema =
    term.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: term.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <main>
      <JsonLd data={definedTermSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="bg-white px-6 pb-24 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm">
                <li>
                  <Link
                    href="/glossary"
                    className={`rounded-sm font-medium text-gray-500 transition-colors hover:text-primary ${FOCUS_RING}`}
                  >
                    Glossary
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-300">
                  /
                </li>
                <li aria-current="page" className="font-medium text-[#111111]">
                  {term.term}
                </li>
              </ol>
            </nav>
            <QuickSearch />
          </div>

          <div className="mt-10 flex gap-12 lg:mt-14 xl:gap-16">
            {/* The same card as blog articles: sections, the one being read highlighted, and the CMS button. */}
            {toc.length > 0 && (
              <aside className="sticky top-28 hidden w-64 shrink-0 self-start lg:block xl:w-72">
                <ArticleTableOfContents entries={toc} button={settings.tocButton} />
              </aside>
            )}

            <article className="min-w-0 max-w-3xl flex-1">
              <header>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-sm text-gray-500">
                  {category && (
                    <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold text-primary">
                      {category}
                    </span>
                  )}
                  <span>
                    Updated <time dateTime={term.updatedAt}>{formatPostDate(term.updatedAt)}</time>
                  </span>
                </div>
                <h1 className="mt-5 text-balance font-sans text-4xl font-black leading-[1.04] tracking-[-0.03em] text-[#111111] md:text-5xl">
                  What is {term.term}?
                </h1>
                <p className="mt-6 font-sans text-lg font-semibold leading-relaxed text-[#111111] md:text-xl md:leading-relaxed">
                  {term.shortDefinition}
                </p>
              </header>

              {toc.length > 0 && <MobileTableOfContents entries={toc} className="mt-8" />}

              <RichText data={term.content} headingIds={headingIds} className={`mt-10 ${CALLOUTS}`} />

              {/* The matching product page, if this term has one (content/glossaryFeatureMap.ts). */}
              <GlossaryFeatureCallout slug={term.slug} className="mt-12" />

              {term.faqs.length > 0 && (
                <section
                  id="faqs"
                  aria-labelledby="faqs-heading"
                  className="mt-16 scroll-mt-28 border-t border-gray-200 pt-12"
                >
                  <h2
                    id="faqs-heading"
                    className="font-sans text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-[#111111]"
                  >
                    FAQs
                  </h2>
                  <div className="mt-6 divide-y divide-gray-200">
                    {term.faqs.map((faq) => (
                      <div key={faq.question} className="py-6">
                        <h3 className="font-sans text-lg font-bold leading-snug text-[#111111]">{faq.question}</h3>
                        <p className="mt-3 whitespace-pre-line font-sans text-[17px] leading-[1.8] text-gray-700">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {hasRelated && (
                <div className="mt-14 space-y-10 border-t border-gray-200 pt-12">
                  {term.relatedTerms.length > 0 && (
                    <section aria-labelledby="related-terms-heading">
                      <h2
                        id="related-terms-heading"
                        className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-gray-500"
                      >
                        Related terms
                      </h2>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {term.relatedTerms.map((related) => (
                          <li key={related.slug}>
                            <Link
                              href={`/glossary/${related.slug}`}
                              className={`inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 font-sans text-sm font-medium text-[#111111] transition-colors hover:border-primary hover:text-primary ${FOCUS_RING}`}
                            >
                              {related.term}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {term.relatedPosts.length > 0 && (
                    <section aria-labelledby="related-posts-heading">
                      <h2
                        id="related-posts-heading"
                        className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-gray-500"
                      >
                        Related guides
                      </h2>
                      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                        {term.relatedPosts.map((post) => (
                          <li key={post.slug}>
                            <Link
                              href={`/blog/${post.slug}`}
                              className={`group flex h-full flex-col rounded-2xl border border-gray-200 p-5 transition hover:border-primary/40 hover:shadow-[0_8px_24px_-16px_rgba(17,17,17,0.25)] ${FOCUS_RING}`}
                            >
                              {post.categoryTitle && (
                                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                                  {post.categoryTitle}
                                </span>
                              )}
                              <span className="mt-2 font-sans text-base font-bold leading-snug text-[#111111] transition-colors group-hover:text-primary">
                                {post.title}
                              </span>
                              <span className="mt-auto flex items-center justify-between pt-4 font-sans text-xs text-gray-500">
                                <time dateTime={post.publishedDate}>{formatPostDate(post.publishedDate)}</time>
                                <ArrowRight
                                  aria-hidden="true"
                                  className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                                />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}

              <div className="mt-16">
                <GlossaryCTA term={term.term} />
              </div>

              <div className="mt-10 flex justify-center">
                {/* "#top" scrolls to the top of the page (HTML spec), smoothly via globals.css. */}
                <a
                  href="#top"
                  className={`rounded-full px-4 py-2 font-sans text-sm font-medium text-gray-500 transition-colors hover:text-[#111111] ${FOCUS_RING}`}
                >
                  <span aria-hidden="true">↑</span> Back to top
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
