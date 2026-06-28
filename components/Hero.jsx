import React from "react";
import Image from "next/image";
import Link from "next/link";

const BONE = "#F4EFE4";
const GREEN = "#007a3d";

const statutoryItems = ["PAYE", "PENSION", "NHF", "NSITF", "TAX"];


// real logo <Image> files at 80–120px wide, 32px tall, with className="opacity-40 brightness-0"]
const trustedCompanies = [
  { name: "Tender Cash" },
  { name: "FBIS Tech" },
  { name: "Juno Inc" },
  { name: "CustomierHQ" },
  { name: "Qomat School" },
  { name: "Berry Valley" },
];

const Hero = () => {
  return (
    <section style={{ backgroundColor: BONE }} className="w-full overflow-hidden">
      <div className="container -mb-[90px] mx-auto px-6 md:px-12 lg:px-16 pt-32 lg:pt-36">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-8">

          {/* Left: text */}
          <div className="lg:w-[50%] pb-20 lg:pb-32">
            <p
              className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-7"
              style={{ color: GREEN }}
            >
              The financial OS for African businesses
            </p>

            <h1
              className="text-[3rem] sm:text-[4rem] lg:text-[3.25rem] text-[#111111] mb-8"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                lineHeight: 0.93,
                letterSpacing: "-0.03em",
              }}
            >
              Every payment out of your
              business, on one{" "}
              <span style={{ color: GREEN }}>ledger.</span>
            </h1>

            <p className="font-sans text-lg leading-relaxed text-gray-600 mb-10 max-w-md">
              Staff, contractors, vendors, and every statutory obligation
              PAYE, Pension, NHF, NSITF, and TAX on a single ledger that
              calculates, remits, and files itself on every pay cycle.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link href="https://app.brigadely.com/signup" target="_blank">
                <button
                  className="px-8 py-4 rounded-full font-sans font-semibold text-sm text-white transition duration-200 hover:opacity-90"
                  style={{ backgroundColor: GREEN }}
                >
                  Start free trial
                </button>
              </Link>
              <Link href="https://app.brigadely.com/signup" target="_blank">
                <button className="border border-[#111111]/20 text-[#111111] px-8 py-4 rounded-full font-sans font-semibold text-sm hover:border-[#111111]/50 transition duration-200 bg-transparent">
                  Get a demo
                </button>
              </Link>
            </div>
            <p className="font-sans text-xs text-gray-400">60 days free. No commitment required.</p>
          </div>

          {/* Right: dashboard screenshot */}
          <div className="lg:w-[50%] flex items-start justify-center lg:justify-end pt-4 lg:pt-12 pb-8">
            <div
              className="w-full max-w-xl"
              style={{
                transform: "perspective(1400px) rotateY(-9deg) rotateX(4deg)",
                transformOrigin: "top center",
              }}
            >
              <Image
                src="/img/multi-image.png"
                alt="Brigadely payroll dashboard"
                width={900}
                height={600}
                className="rounded-xl w-full h-auto"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* Trusted by — 6 companies */}
      <div className="border-t border-gray-100 pt-6 pb-10 px-6">
        <p className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-center text-black-300 mb-7">
          Trusted by businesses across Nigeria
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {trustedCompanies.map((company) => (
            <span
              key={company.name}
              className="text-xl md:text-2xl select-none"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                color: "#080909",
                letterSpacing: "-0.02em",
              }}
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
