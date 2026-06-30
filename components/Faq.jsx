"use client";

import React, { useState } from "react";

const GREEN = "#007a3d";
const BONE = "#F4EFE4";

const faqItems = [
  {
    question: "Where does Brigadely operate?",
    answer:
      "Brigadely is live in Nigeria today, where we serve businesses across all 36 states and the FCT. Kenya, Ghana, and South Africa are in our pipeline. The ledger is built to handle multi-currency, multi-jurisdiction compliance, and cross-border payments — so as your business expands across Africa, Brigadely expands with it.",
  },
  {
    question: "Can I use Brigadely if my business operates outside Nigeria?",
    answer:
      "Today, our compliance modules are configured for Nigerian regulation, so businesses operating fully outside Nigeria aren't yet a fit. If you're a multi-country African business with Nigerian operations, the ledger already supports that. If you'd like to be first in line when we launch in your market, join the waitlist.",
  },
  {
    question: "Do you support payments in currencies other than the naira?",
    answer:
      "Yes. The ledger is currency-agnostic. Naira is supported today for local payments and statutory remittance; stablecoin (USDC) is supported for cross-border payouts, contractor payments, and diaspora hires. Additional African currencies will follow as we expand.",
  },
  {
    question: "What does the 60-day free trial include?",
    answer:
      "Everything. You get full access to the ledger — payroll, compliance, vendor payments, expense management, and stablecoin payouts — for 60 days at no cost. No credit card required. You can run live payroll during the trial period.",
  },
  {
    question: "Who is Brigadely built for?",
    answer:
      "Brigadely is built for operators running African businesses — founders managing their first payroll, CFOs overseeing multi-entity groups, finance teams closing month-end, and accountants managing compliance across a client portfolio. If your business has employees or contractors and statutory obligations, the ledger is for you.",
  },
  {
    question: "How does Brigadely differ from accounting software?",
    answer:
      "Accounting software records what has already happened. Brigadely executes it. When payroll runs, deductions are calculated, filed, and remitted — not just posted to a journal entry. When a vendor is paid, the ledger updates in the same action. Brigadely is an operating layer, not a record-keeping layer.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All financial and employee data is encrypted in transit and at rest. Access is role-controlled — each team member sees only what their role permits. Brigadely maintains a full audit log of every action taken on the ledger.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams complete setup in under a day and run their first payroll within a week. There are no implementation consultants required. You import your employee records, connect your payment accounts, and Brigadely handles the rest.",
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
