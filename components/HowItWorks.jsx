import React from "react";
import Link from "next/link";

const GREEN = "#007a3d";
const BONE = "#F4EFE4";

const steps = [
  {
    number: "01",
    title: "Connect your team.",
    body: "Import your employee roster, configure your org structure, and link your bank and statutory accounts. Most teams complete setup in under a day, with no migration consultant required.",
    detail: ["Import employee records", "Configure departments and roles", "Link bank accounts", "Set up approval chains"],
  },
  {
    number: "02",
    title: "Run your first payroll.",
    body: "Select your pay period, review the automated PAYE, Pension, NHF, NSITF, and ITF calculations, and approve. Payslips go to employees automatically. Filing schedules are generated for each deduction.",
    detail: ["Automated statutory calculations", "Payslip generation and delivery", "Remittance schedule created"],
  },
  {
    number: "03",
    title: "Expand what you run on Brigadely.",
    body: "Every subsequent pay cycle, Brigadely files your remittances and updates your audit trail. As your business grows, bring vendor payments, contractor payroll, expense approvals, and cross-border transfers into the same ledger — with the same statutory precision on every transaction.",
    detail: ["Automatic remittance filing", "Full audit trail by pay period", "Vendor and contractor payments", "Compliance change alerts"],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-24 px-4">
      <div className="container mx-auto">

        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
          style={{ color: GREEN }}
        >
          How it works
        </p>

        {/* Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <h2
            className="text-4xl md:text-6xl text-[#111111] max-w-xl"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 900,
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
            }}
          >
            From sign-up to first payroll in three{" "}
            <span style={{ color: GREEN }}>steps.</span>
          </h2>
          <p className="font-sans text-base text-gray-500 leading-relaxed max-w-xs">
            Most teams run their first compliant payroll within a week of
            signing up, without disrupting existing workflows.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 flex flex-col gap-6 border border-gray-100">
              <span
                className="font-sans text-5xl font-black text-gray-100 leading-none select-none"
                style={{ letterSpacing: "-0.04em" }}
              >
                {step.number}
              </span>

              <div>
                <h3
                  className="text-xl text-[#111111] mb-3"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 700, lineHeight: 1.1 }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  {step.body}
                </p>
              </div>

              <ul className="space-y-2 mt-auto">
                {step.detail.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm font-sans text-gray-600">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: GREEN }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href="https://app.brigadely.com/signup" target="_blank">
            <button
              className="px-8 py-4 rounded-full font-sans font-semibold text-sm text-white transition duration-200 hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Start free trial
            </button>
          </Link>
          <p className="font-sans text-sm text-gray-400">90 days free. No commitment required.</p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
