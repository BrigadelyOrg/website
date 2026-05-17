import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

export const metadata = {
  title: "Pricing | Brigadely",
  description:
    "Simple, transparent pricing that scales with your team. No hidden fees, no surprises.",
};

const tiers = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Essential tools for small teams and startups",
    price: "₦10,000",
    unit: "per employee / month",
    popular: false,
    trial: "90-day free trial",
    cta: "Start Free Trial",
    ctaStyle: "outline",
    features: [
      "NGN payroll processing",
      "PAYE, PENCOM & NHF deductions (coming soon)",
      "NSITF & ITF contributions (coming soon)",
      "Payslip generation & delivery",
      "Employee self-service portal",
      "Basic HR records management",
      "Email support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Essential tools for scaling businesses",
    price: "₦20,000",
    unit: "per employee / month",
    popular: true,
    trial: "90-day free trial",
    cta: "Start Free Trial",
    ctaStyle: "solid",
    features: [
      "Everything in Basic",
      "NGN & USD contractor payments",
      "Benefits administration",
      "Expense tracking & reimbursement",
      "Custom approval workflows",
      "Compliance reports & audit trails",
      "Priority email & chat support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Essential tools for established enterprises",
    price: "₦30,000",
    unit: "per employee / month",
    popular: false,
    trial: "90-day free trial",
    cta: "Start Free Trial",
    ctaStyle: "outline",
    features: [
      "Everything in Starter",
      "Multi-location payroll management",
      "Workforce analytics & dashboards",
      "API access",
      "Dedicated account manager",
      "Quarterly compliance reviews",
      "SLA-backed uptime guarantee",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For organisations that need full control and customisation",
    price: "Custom",
    unit: "enterprise contract",
    popular: false,
    trial: null,
    cta: "Contact sales",
    ctaStyle: "ghost",
    features: [
      "Everything in Growth",
      "Unlimited locations",
      "Custom integrations & webhooks",
      "White-label reporting",
      "24/7 dedicated support",
      "On-site onboarding & training",
      "Custom SLA & data agreements",
    ],
  },
];

const Check = ({ color = "#007a3d" }) => (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
    <path d="M1.5 6L5.5 10L13.5 1.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cross = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 2L11 11M11 2L2 11" stroke="#d1d5db" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const comparisonCategories = [
  {
    name: "Payroll Disbursement",
    rows: [
      {
        label: "Pay-in fees",
        values: ["0.5% capped ₦500", "0.25% capped ₦400", "0.15% capped ₦200", "Negotiable"],
      },
      {
        label: "Payout fees*",
        values: ["₦150", "₦100", "₦75", "Negotiable"],
      },
    ],
  },
  {
    name: "Payroll & Compliance",
    rows: [
      { label: "PAYE calculation", values: ["Soon", "Soon", "Soon", "Soon"] },
      { label: "PENCOM contributions", values: ["Soon", "Soon", "Soon", "Soon"] },
      { label: "NHF deductions", values: ["Soon", "Soon", "Soon", "Soon"] },
      { label: "NSITF & ITF contributions", values: ["Soon", "Soon", "Soon", "Soon"] },
      { label: "Payslip generation & delivery", values: [true, true, true, true] },
      { label: "NGN & USD payroll", values: [false, true, true, true] },
      { label: "Contractor payments", values: [false, true, true, true] },
      { label: "Custom payment schedules", values: [false, false, true, true] },
    ],
  },
  {
    name: "HR Operations",
    rows: [
      { label: "Employee records", values: [true, true, true, true] },
      { label: "Onboarding workflows", values: [true, true, true, true] },
      { label: "Leave management", values: [true, true, true, true] },
      { label: "Expense tracking", values: [false, true, true, true] },
      { label: "Benefits administration", values: [false, true, true, true] },
      { label: "Approval levels", values: ["2", "5", "10", "Unlimited"] },
      { label: "Multi-location management", values: [false, false, true, true] },
    ],
  },
  {
    name: "Reporting & Analytics",
    rows: [
      { label: "Payroll reports", values: [true, true, true, true] },
      { label: "Compliance audit trail", values: [true, true, true, true] },
      { label: "Workforce analytics", values: [false, true, true, true] },
      { label: "Custom reports", values: [false, false, true, true] },
      { label: "API access", values: [false, false, true, true] },
    ],
  },
  {
    name: "Support",
    rows: [
      { label: "Email support", values: [true, true, true, true] },
      { label: "Chat support", values: [false, true, true, true] },
      { label: "Dedicated account manager", values: [false, false, true, true] },
      { label: "Quarterly compliance reviews", values: [false, false, true, true] },
      { label: "24/7 priority support", values: [false, false, false, true] },
      { label: "Custom SLA", values: [false, false, false, true] },
    ],
  },
];

function CellValue({ value, isPopular }) {
  if (value === true) return <Check color={isPopular ? "#007a3d" : "#007a3d"} />;
  if (value === false) return <Cross />;
  if (value === "Soon") return (
    <span className="text-xs font-semibold font-sans text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">Soon</span>
  );
  return (
    <span className="text-xs font-semibold font-sans text-gray-700">{value}</span>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero — light bg like Bujeti */}
      <div className="pt-36 pb-16 px-6 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#007a3d] font-semibold font-sans mb-5">
            Pricing
          </p>
          <h1 className="text-4xl lg:text-6xl text-gray-900 leading-tight mb-5">
            Find the right plan <br />
            <em className="text-[#007a3d]">for your business</em>
          </h1>
          <p className="text-gray-500 font-sans text-base leading-relaxed max-w-md mx-auto">
            We believe Brigadely should be accessible to every African business,
            no matter the size.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#f0faf4] border border-[#c3e8d4] text-[#007a3d] text-sm font-semibold font-sans px-5 py-2.5 rounded-full mt-6">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm8.75-3.25a.75.75 0 00-1.5 0v3.5l2.25 2.25a.75.75 0 001.06-1.06L8.75 7.69V4.75z" fill="#007a3d"/></svg>
            90-day free trial on all plans — no credit card required
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 rounded-2xl overflow-hidden">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className={`relative flex flex-col ${
                  i < tiers.length - 1 ? "lg:border-r border-gray-200" : ""
                } ${tier.popular ? "shadow-xl shadow-gray-200/80 z-10" : ""}`}
              >
                {/* Popular banner */}
                {tier.popular ? (
                  <div className="bg-[#0e0e0e] px-6 py-3 text-center">
                    <span className="text-white text-xs font-semibold font-sans uppercase tracking-widest">
                      Most popular
                    </span>
                  </div>
                ) : (
                  <div className="h-[40px] bg-white border-b border-gray-100" />
                )}

                <div className="p-7 flex flex-col flex-1 gap-5 bg-white">

                  {/* Name & tagline */}
                  <div>
                    <h3 className="text-lg font-semibold font-sans text-gray-900 mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-sm font-sans text-gray-400 leading-relaxed">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-sans text-gray-900 leading-none">
                        {tier.price}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-gray-400 mt-1.5">
                      {tier.unit}
                    </p>
                    {tier.trial && (
                      <p className="text-xs font-semibold font-sans mt-2 text-[#007a3d]">
                        {tier.trial} included
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href="https://app.brigadely.com/signup"
                    target="_blank"
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold font-sans transition duration-200 ${
                      tier.ctaStyle === "solid"
                        ? "bg-[#007a3d] text-white hover:bg-[#005a2d]"
                        : tier.ctaStyle === "ghost"
                        ? "border border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
                        : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    {tier.cta}
                  </Link>

                  {/* Divider */}
                  <div className="h-px bg-gray-100" />

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-sans text-gray-600">
                        <span className="mt-0.5 text-[#007a3d] flex-shrink-0">
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction fee note */}
      <div className="px-6 pt-6 pb-2">
        <div className="max-w-6xl mx-auto bg-[#f0faf4] border border-[#c3e8d4] rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#007a3d] font-sans mb-0.5">
              Transaction fees apply on every payroll disbursement
            </p>
            <p className="text-xs text-gray-500 font-sans">
              Covers payment processing and bank transfer costs. Rates reduce at higher tiers. E.g. ₦10M payroll on Basic = ₦50,000 fee.
            </p>
          </div>
          <Link href="https://app.brigadely.com/signup" target="_blank"
            className="text-xs font-semibold font-sans text-[#007a3d] hover:underline whitespace-nowrap flex-shrink-0">
            Questions? Talk to us →
          </Link>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-gray-900 text-center mb-12">
            Compare <em className="text-[#007a3d]">all features</em>
          </h2>

          {/* Sticky header row */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 pr-6 w-[35%]" />
                  {tiers.map((tier) => (
                    <th key={tier.id} className="text-center py-4 px-3 w-[16.25%]">
                      <p className={`text-sm font-semibold font-sans mb-2 ${
                        tier.popular ? "text-[#007a3d]" : "text-gray-900"
                      }`}>
                        {tier.name}
                      </p>
                      <Link
                        href="https://app.brigadely.com/signup"
                        target="_blank"
                        className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition duration-200 ${
                          tier.popular
                            ? "bg-[#007a3d] text-white hover:bg-[#005a2d]"
                            : "border border-gray-300 text-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {tier.cta}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonCategories.map((cat) => (
                  <React.Fragment key={cat.name}>
                    {/* Category heading row */}
                    <tr>
                      <td colSpan={5} className="pt-8 pb-2">
                        <span className="text-xs font-semibold font-sans text-[#007a3d] uppercase tracking-wider">
                          {cat.name}
                        </span>
                      </td>
                    </tr>

                    {/* Feature rows */}
                    {cat.rows.map((row, ri) => (
                      <tr
                        key={row.label}
                        className={`border-b border-gray-100 ${
                          ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="py-3.5 pr-6 text-sm text-gray-600 font-sans">
                          {row.label}
                        </td>
                        {row.values.map((val, vi) => (
                          <td key={vi} className="py-3.5 px-3 text-center">
                            <div className="flex justify-center">
                              <CellValue value={val} isPopular={tiers[vi].popular} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-gray-900 text-center mb-10">
            Pricing <em className="text-[#007a3d]">questions answered</em>
          </h2>
          <div className="divide-y divide-gray-200">
            {[
              {
                q: "Is there a free trial?",
                a: "Yes — every plan includes a 90-day free trial with no credit card required. You get full access to all features on your chosen plan so you can run payroll and manage your team before paying anything.",
              },
              {
                q: "Can I change plans as my team grows?",
                a: "Yes. Plans are based on your active employee count and adjust automatically. You will be notified before any tier change takes effect.",
              },
              {
                q: "What counts as an active employee?",
                a: "Any employee or contractor who receives a payment through Brigadely in a given month counts toward your headcount for that month.",
              },
              {
                q: "Are there any setup or onboarding fees?",
                a: "No. There are no setup fees on any plan. Onboarding support is included at all tiers.",
              },
              {
                q: "How does the transaction fee work for USD payments?",
                a: "The 0.5% fee applies to the NGN-equivalent value of all disbursements, including USD contractor payments converted at the prevailing exchange rate.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="py-5">
                <p className="font-semibold text-gray-900 font-sans text-sm mb-1.5">{q}</p>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#0e0e0e] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl text-white mb-4">
            Not sure which plan is right for you?
          </h2>
          <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8">
            Start your 90-day free trial today, or talk to us and we will walk you through the right fit for your team size,
            compliance needs, and budget.
          </p>
          <Link href="https://app.brigadely.com/signup" target="_blank">
            <button className="inline-flex items-center gap-2 bg-[#007a3d] text-white px-8 py-3.5 rounded-full font-semibold font-sans hover:bg-[#005a2d] transition duration-200 text-sm">
              Start Free Trial <GoArrowUpRight size={15} />
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
