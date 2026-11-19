import { BookA } from "lucide-react";
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import GlossaryDirectory from "@/components/glossary/GlossaryDirectory";
import { getGlossaryIndex } from "@/lib/glossary/queries";
import { GLOSSARY_SET_NAME } from "@/lib/glossary/schema";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

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
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Brigadely`,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
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
    name: GLOSSARY_SET_NAME,
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
      <JsonLd data={termSetSchema} />

      <GlossaryDirectory terms={terms} initialQuery={query}>
        <span
          aria-hidden="true"
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-white shadow-[0_10px_28px_-10px_rgba(0,122,61,0.6)] md:h-20 md:w-20"
        >
          <BookA className="h-7 w-7 md:h-9 md:w-9" strokeWidth={2.25} />
        </span>
        <h1 className="mx-auto mt-7 max-w-4xl text-balance font-sans text-4xl font-black leading-[1.02] tracking-[-0.03em] text-[#111111] sm:text-5xl md:text-6xl">
          African Payroll, Tax &amp; Finance <span className="text-primary">Glossary.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl font-sans text-base leading-relaxed text-gray-600 md:text-lg">
          {DESCRIPTION}
        </p>
      </GlossaryDirectory>
    </main>
  );
}
