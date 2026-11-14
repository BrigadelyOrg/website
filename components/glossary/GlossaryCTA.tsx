import Link from "next/link";

import { shortTermName } from "@/lib/glossary/categories";
import { SIGNUP_URL } from "@/lib/site";

/**
 * What the headline offers to automate: the term itself ("Automate PAYE…"), or
 * payroll and tax for comparison terms, since "Automate Gross Pay vs. Net Pay"
 * doesn't read as a sentence.
 */
function automationSubject(term: string): string {
  const name = shortTermName(term);
  return /\bvs\.?(\s|$)/i.test(name) ? "payroll, tax" : name;
}

/** Conversion card at the end of every glossary term, in the style of the blog's closing CTA. */
export default function GlossaryCTA({ term }: { term: string }) {
  return (
    <aside
      aria-labelledby="glossary-cta-heading"
      className="rounded-3xl bg-[#F4EFE4] px-7 py-10 md:px-12 md:py-12"
    >
      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
        Brigadely
      </p>
      <h2
        id="glossary-cta-heading"
        className="mt-4 max-w-xl text-balance font-sans text-3xl font-black leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-4xl"
      >
        Automate {automationSubject(term)} and every statutory obligation on one{" "}
        <span className="text-primary">ledger.</span>
      </h2>
      <p className="mt-4 max-w-lg font-sans text-[15px] leading-relaxed text-gray-600">
        Brigadely calculates, deducts and remits PAYE, pension, NHF, NSITF and ITF on every payroll
        run, so every obligation is tracked and met.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href={SIGNUP_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-semibold text-white transition duration-200 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Start free - 60 days
        </Link>
        <span className="font-sans text-xs text-gray-500">No commitment required.</span>
      </div>
    </aside>
  );
}
