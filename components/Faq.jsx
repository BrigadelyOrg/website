"use client";

import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const faqItems = [
  {
    question: "What is Brigadely?",
    answer:
      "Brigadely is a people management platform built for African businesses. It handles PAYE, PENCOM, NHF, NSITF, and ITF compliance automatically, so you can run payroll, manage your workforce, and grow your team without the administrative overhead.",
  },
  {
    question: "How does Brigadely handle multi-country compliance?",
    answer:
      "Brigadely is built around local compliance. It automatically calculates PAYE across all state tax jurisdictions, handles PENCOM pension contributions (8% employee, 10% employer), NHF deductions, NSITF premiums, and ITF levies. When the law changes, we update the platform so you never have to.",
  },
  {
    question: "Can I pay contractors and employees in different currencies?",
    answer:
      "Yes. Brigadely supports NGN and USD payments. You can pay your employees in Naira and international contractors in dollars, all from one dashboard on a single payroll run.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams are fully set up within 30 days. Day 1 you connect your existing employee data. By Day 7, payroll and approvals are live. By Day 30, you have full visibility into workforce spend, compliance status, and benefits in one place.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Brigadely is SOC2, GDPR, and ISO 27001 compliant. All data is encrypted in transit and at rest. We undergo regular third-party security audits and maintain a 99.9% uptime SLA.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="container mx-auto py-20 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase text-4xl tracking-widest text-[#007a3d] font-semibold mb-3">
            FAQ
          </p>
          <h2 className="text-2xl md:text-4xl">
            Have questions?{" "}
            <em className="text-[#007a3d]">We have answers.</em>
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-gray-200">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full text-left py-5 flex justify-between items-center text-base font-semibold text-gray-900 focus:outline-none hover:text-[#007a3d] transition-colors duration-200"
              >
                {item.question}
                <span className="ml-4 flex-shrink-0 text-gray-400">
                  {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-60 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
