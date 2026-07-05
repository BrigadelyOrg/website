import React from "react";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

const GREEN = "#007a3d";
const BONE = "#F4EFE4";

const ClosingCTA = () => {
  return (
    <section className="bg-white py-28 px-4">
      <div className="container mx-auto flex flex-col items-center text-center">

        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-7"
          style={{ color: GREEN }}
        >
          Get started
        </p>

        {/* Headline */}
        <h2
          className="text-5xl md:text-5xl lg:text-6xl text-[#111111] mb-8 max-w-3xl"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 900,
            lineHeight: 0.91,
            letterSpacing: "-0.03em",
          }}
        >
          One ledger. Every payment<br />
          out of your{" "}
          <span style={{ color: GREEN }}>business.</span>
        </h2>

        {/* Subhead */}
        <p className="font-sans text-base text-gray-600 mb-10 max-w-md leading-relaxed">
          Start with payroll and compliance. Add vendor payments, expenses,
          and cross-border payouts as your operation grows. Every payment
          tracked, every obligation met.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-5">
          <Link href="https://app.brigadely.com/signup" target="_blank">
            <button
              className="px-8 py-4 rounded-full font-sans font-semibold text-sm text-white transition duration-200 hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Start free — 60 days
            </button>
          </Link>
          <CalendlyButton className="border border-[#111111]/20 text-[#111111] px-8 py-4 rounded-full font-sans font-semibold text-sm hover:border-[#111111]/50 transition duration-200 bg-transparent cursor-pointer" />
        </div>
        <p className="font-sans text-xs text-gray-400">No commitment required.</p>

      </div>
    </section>
  );
};

export default ClosingCTA;
