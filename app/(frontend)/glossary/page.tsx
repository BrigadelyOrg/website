import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import GlossaryDirectory from "@/components/glossary/GlossaryDirectory";
import { getGlossaryIndex } from "@/lib/glossary/queries";
import { SITE_URL } from "@/lib/site";

// Rendered per request from cached queries, so `next build` never needs the
// database. Publishing in /admin expires the cache straight away.
export const dynamic = "force-dynamic";

const TITLE = "African Payroll, Tax & Finance Glossary";
const DESCRIPTION =
  "Plain-English definitions of the payroll, tax and compliance terms African businesses deal with, from PAYE and pension to NHF, NSITF, ITF and withholding tax.";
const GLOSSARY_URL = `${SITE_URL}/glossary`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: GLOSSARY_URL,
  },
  openGraph: {
    type: "website",
    url: GLOSSARY_URL,
    siteName: "Brigadely",
    locale: "en_NG",
    title: `${TITLE} | Brigadely`,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brigadely" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Brigadely`,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GlossaryPage({ searchParams }: PageProps) {
  const [terms, params] = await Promise.all([getGlossaryIndex(), searchParams]);
  // ?q= comes from the quick search on term pages.
  const query = typeof params.q === "string" ? params.q.slice(0, 100) : "";

  const termSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": GLOSSARY_URL,
    name: TITLE,
    description: DESCRIPTION,
    url: GLOSSARY_URL,
    hasDefinedTerm: terms.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      url: `${GLOSSARY_URL}/${entry.slug}`,
    })),
  };

  return (
    <main>
      <JsonLd schema={termSetSchema} />

      <GlossaryDirectory terms={terms} initialQuery={query}>
        <span className="inline-flex items-center rounded-full bg-brand-mint px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Glossary
        </span>
        <h1 className="mt-6 max-w-4xl font-sans text-5xl font-black leading-[0.95] tracking-[-0.03em] text-[#111111] md:text-6xl lg:text-7xl">
          African Payroll, Tax &amp; Finance <span className="text-primary">Glossary.</span>
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-gray-600">{DESCRIPTION}</p>
      </GlossaryDirectory>
    </main>
  );
}
