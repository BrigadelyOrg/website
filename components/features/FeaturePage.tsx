import { ArrowRight, BookA } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CalendlyButton from "@/components/CalendlyButton";
import { JsonLd } from "@/components/JsonLd";
import BlogCTA from "@/components/blog/BlogCTA";
import { TRUSTED_COMPANIES } from "@/content/customers";
import { FEATURE_PAGES, GLOSSARY_GUIDES } from "@/content/featurePages";
import { FEATURE_NAV, FEATURE_NAV_ITEMS, type FeatureSlug } from "@/content/navigation";
import { publicFileExists } from "@/lib/public-files";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import FeatureCapabilities from "./FeatureCapabilities";
import FeatureFaqs from "./FeatureFaqs";
import FeatureHero from "./FeatureHero";
import FeatureImage from "./FeatureImage";
import { DEEP_GREEN_BG, EYEBROW, FOCUS_RING, H2, ON_DARK_ACCENT, PANEL_WIDTH, SCREENSHOT_SIZES } from "./shared";

/**
 * Metadata for a feature page. The page sets its own `openGraph`, which
 * replaces the root layout's (Next.js merges shallowly), so it always lists an
 * image: the page's own share image once that file exists, else the default.
 */
export function featureMetadata(slug: FeatureSlug): Metadata {
  const page = FEATURE_PAGES[slug];
  const url = `${SITE_URL}/${slug}`;
  const { ogImage } = page;
  const image = publicFileExists(ogImage.src)
    ? { url: `${SITE_URL}${ogImage.src}`, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }
    : DEFAULT_OG_IMAGE;

  return {
    // The briefed titles already end in "| Brigadely", so skip the layout's template.
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Brigadely",
      locale: "en_NG",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [image],
    },
    // Without this, the root layout's Twitter title and description would apply.
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [image.url],
    },
  };
}

/**
 * The shared template for the six product feature pages. All page copy comes
 * from content/featurePages.ts. Statically rendered: nothing here reads the
 * request or the CMS.
 *
 * Every page has the same sections in the same order (hero, module switcher and
 * customer logos, capabilities, ledger band, glossary guides, FAQs, closing
 * banner). The hero and the capabilities take the arrangement each page's
 * content sets (`heroLayout`, `capabilities.layout`), so the pages share one
 * system without looking identical.
 */
export default function FeaturePage({ slug }: { slug: FeatureSlug }) {
  const page = FEATURE_PAGES[slug];
  const navItem = FEATURE_NAV[slug];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main>
      <JsonLd data={faqSchema} />

      {/* 1. Hero */}
      <FeatureHero page={page} navItem={navItem} />

      {/* 2. Module switcher (links between the six pages) and customer logos */}
      <div className="px-6 pt-14 md:pt-16">
        <nav aria-label="Brigadely platform" className="mx-auto max-w-6xl">
          <p className="text-center font-sans text-sm font-semibold text-gray-500">Explore the platform</p>
          <ul className="-mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
            {FEATURE_NAV_ITEMS.map((item) => {
              const current = item.href === navItem.href;
              const Icon = item.icon;
              return (
                // Below lg the row scrolls sideways, so the current page's pill goes first to stay in view.
                <li key={item.href} className={cn("shrink-0", current && "max-lg:order-first")}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 font-sans text-sm font-semibold transition-colors",
                      current
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-gray-200 bg-white text-[#111111] hover:border-primary hover:text-primary",
                      FOCUS_RING,
                    )}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mx-auto mt-14 max-w-6xl border-y border-gray-100 py-10">
          <p className="text-center font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
            Trusted by operators across Africa
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {TRUSTED_COMPANIES.map((company) => (
              <li key={company.name}>
                <Image
                  src={company.src}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  sizes="160px"
                  className="h-8 w-auto object-contain opacity-60 grayscale"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Capabilities */}
      <FeatureCapabilities section={page.capabilities} />

      {/* 4. How it connects to the ledger: a dark band, the image beside the three connections */}
      <section aria-labelledby="ledger-heading" className="px-3 lg:px-4">
        <div className={`${PANEL_WIDTH} rounded-[28px] ${DEEP_GREEN_BG} px-6 py-20 sm:px-10 md:py-24 lg:px-14`}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <FeatureImage
                {...page.ledger.image}
                tone="dark"
                sizes={SCREENSHOT_SIZES}
                className="rounded-2xl"
                imageClassName="shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)]"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className={`${EYEBROW} ${ON_DARK_ACCENT}`}>The ledger</p>
              <h2 id="ledger-heading" className={`${H2} mt-5 text-white`}>
                How it connects to the Brigadely <span className={ON_DARK_ACCENT}>ledger.</span>
              </h2>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white/70">{page.ledger.intro}</p>
              <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {page.ledger.links.map((link) => (
                  <li key={link.label} className="flex gap-5 py-6">
                    <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10", ON_DARK_ACCENT)}>
                      <link.icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-bold text-white">{link.label}</h3>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-white/65">{link.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Related glossary guides */}
      <section aria-labelledby="glossary-heading" className="mt-24 bg-[#F4EFE4] px-6 py-24 md:mt-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className={`${EYEBROW} text-primary`}>Learn the terms</p>
            <h2 id="glossary-heading" className={`${H2} mt-5 text-[#111111]`}>
              Related glossary <span className="text-primary">guides.</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-gray-600">
              Plain-English explanations of the terms on this page, from the Brigadely glossary.
            </p>
            <Link
              href="/glossary"
              className={`mt-6 inline-flex items-center gap-1.5 rounded-sm font-sans text-sm font-semibold text-primary transition-colors hover:text-primary-dark ${FOCUS_RING}`}
            >
              Browse the full glossary <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {page.glossary.map((guide) => (
              <li key={guide}>
                <Link
                  href={`/glossary/${guide}`}
                  className={`group flex h-full items-center gap-4 rounded-2xl bg-white p-4 pr-5 transition hover:shadow-[0_12px_32px_-20px_rgba(17,17,17,0.35)] ${FOCUS_RING}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-mint text-primary">
                    <BookA aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.25} />
                  </span>
                  <span className="flex-1 font-sans text-sm font-semibold leading-snug text-[#111111] transition-colors group-hover:text-primary">
                    {GLOSSARY_GUIDES[guide]}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. FAQs (also the FAQPage structured data above) */}
      <section aria-labelledby="faq-heading" className="px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={`${EYEBROW} text-primary`}>FAQ</p>
            <h2 id="faq-heading" className={`${H2} mt-5 text-[#111111]`}>
              Frequently asked <span className="text-primary">questions.</span>
            </h2>
            <p className="mt-6 max-w-sm font-sans text-base leading-relaxed text-gray-600">
              Can&apos;t find the answer you need? Our team can walk you through it.
            </p>
            <CalendlyButton
              className={`mt-6 cursor-pointer rounded-full border border-[#111111]/20 bg-transparent px-6 py-3 font-sans text-sm font-semibold text-[#111111] transition duration-200 hover:border-[#111111]/50 ${FOCUS_RING}`}
            />
          </div>
          <FeatureFaqs faqs={page.faqs} />
        </div>
      </section>

      {/* 7. Closing banner, shared with the blog (mirrors the home page's closing CTA) */}
      <BlogCTA className="pb-24 pt-0 md:pt-0" />
    </main>
  );
}
