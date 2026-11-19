"use client";

import React, { useState } from "react";

import { HOMEPAGE_FAQS } from "@/lib/homepage-faqs";

const GREEN = "#007a3d";
const BONE = "#F4EFE4";

// Questions and answers live in lib/homepage-faqs.ts, which also feeds the FAQPage structured data.

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
          {HOMEPAGE_FAQS.map((item, index) => (
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
