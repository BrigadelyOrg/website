import Link from "next/link";

import CalendlyButton from "@/components/CalendlyButton";
import { SIGNUP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogCTAProps = {
  /** Outer section spacing, adjusted by each page to sit well with its neighbours. */
  className?: string;
};

/** Conversion card used on /blog and every article, mirroring the home page's closing CTA. */
export default function BlogCTA({ className }: BlogCTAProps) {
  return (
    <section aria-labelledby="blog-cta-heading" className={cn("bg-white px-6 py-20", className)}>
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#F4EFE4] px-6 py-16 text-center md:px-16 md:py-20">
        <p className="mb-6 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#007a3d]">
          Get started
        </p>

        <h2
          id="blog-cta-heading"
          className="mx-auto max-w-3xl font-sans text-4xl font-black leading-[0.95] tracking-[-0.03em] text-[#111111] md:text-5xl"
        >
          Every payment out of your business, on one{" "}
          <span className="text-[#007a3d]">ledger.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-gray-600">
          Start with payroll and compliance. Add vendor payments, expenses, and cross-border
          payouts as your operation grows. Every payment tracked, every obligation met.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-[#007a3d] px-8 py-4 font-sans text-sm font-semibold text-white transition duration-200 hover:bg-[#005a2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a3d] focus-visible:ring-offset-2"
          >
            Start free - 60 days
          </Link>
          <CalendlyButton className="cursor-pointer rounded-full border border-[#111111]/20 bg-transparent px-8 py-4 font-sans text-sm font-semibold text-[#111111] transition duration-200 hover:border-[#111111]/50" />
        </div>

        <p className="mt-5 font-sans text-xs text-gray-500">No commitment required.</p>
      </div>
    </section>
  );
}
