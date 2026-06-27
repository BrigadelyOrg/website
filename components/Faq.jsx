"use client";

import React, { useState } from "react";

const GREEN = "#007a3d";
const BONE = "#F4EFE4";

const faqItems = [
  {
    question: "What is Brigadely?",
    answer:
      "Brigadely is the financial operating system for African businesses. It runs payroll, calculates and files PAYE, Pension, NHF, NSITF, and ITF, processes vendor and contractor payments, and keeps a full audit trail all from one ledger, built for how Nigerian businesses actually move money.",
  },
  {
    question: "Which countries and states do you support?",
    answer:
      "Brigadely is Nigeria-first. We support payroll and statutory filings across all 36 Nigerian states and the FCT, with state-level PAYE routing to the correct State IRS or FIRS.",
  },
  {
    question: "Can I pay employees in multiple currencies?",
    answer:
      "No. this feature is not yet available. Brigadely currently supports payroll in NGN only.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams complete initial setup in under a day and run their first payroll within a week. There are no migration consultants required. You import your employee records, link your bank account, and Brigadely handles the rest.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All payroll and employee data is encrypted in transit and at rest using AES-256 and TLS. Access is controlled by role, so each team member sees only what they need.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Brigadely offers a 60-days free trial with no setup fees and no commitment required. You can run real payroll during the trial period.",
  },
  {
    question: "Do you support contractors and employees on the same payroll?",
    answer:
      "Yes. You can run full-time employees and contractors on the same payroll run. Brigadely applies the correct withholding tax to contractors and the standard statutory deductions to employees automatically.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faqs" style={{ backgroundColor: BONE }} className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">

        {/* Eyebrow */}
        <p
          className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
          style={{ color: GREEN }}
        >
          FAQ
        </p>

        <h2
          className="text-4xl md:text-5xl text-[#111111] mb-14"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 900,
            lineHeight: 0.93,
            letterSpacing: "-0.025em",
          }}
        >
          Common <span style={{ color: GREEN }}>questions.</span>
        </h2>

        <div className="divide-y divide-gray-100">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left py-6 flex justify-between items-start gap-6 focus:outline-none group"
                aria-expanded={activeIndex === index}
              >
                <span
                  className="font-sans text-base font-semibold text-[#111111] group-hover:text-[#007a3d] transition-colors duration-200 leading-snug"
                >
                  {item.question}
                </span>
                <span className="flex-shrink-0 mt-0.5">
                  <span
                    className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 text-sm transition-transform duration-200"
                    style={{
                      display: "inline-flex",
                      transform: activeIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-60 pb-6" : "max-h-0"
                }`}
              >
                <p className="font-sans text-sm text-gray-500 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
