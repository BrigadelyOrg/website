import Link from "next/link";
import React from "react";
import CalendlyButton from "@/components/CalendlyButton";

export const metadata = {
  title: "Pricing | Brigadely",
  description:
    "Simple, transparent pricing for payroll, statutory compliance and payments built for African businesses. Every plan includes full statutory compliance.",
};

const GREEN      = "#007a3d";
const GREEN_DARK = "#0B5E34";
const BONE       = "#F4EFE4";
const NEAR_BLACK = "#0e0e0e";

const CheckIcon = () => (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true" style={{ display: "inline" }}>
    <path d="M1.5 6L5.5 10L13.5 1.5" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" style={{ display: "inline" }}>
    <path d="M2 2L11 11M11 2L2 11" stroke="#d1d5db" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const ContactSales = () => (
  <CalendlyButton
    className="text-sm font-semibold bg-transparent border-none p-0 cursor-pointer"
    style={{ color: GREEN }}
  >
    Contact sales
  </CalendlyButton>
);

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <div className="pt-36 pb-14 px-6" style={{ backgroundColor: BONE }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-5 font-sans"
            style={{ color: GREEN }}
          >
            Pricing
          </p>
          <h1
            className="text-5xl lg:text-6xl text-gray-900 mb-6"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Pricing &amp; <span style={{ color: GREEN }}>Plans</span>
          </h1>
          <p className="font-sans text-base text-gray-700 leading-relaxed mb-3 max-w-2xl">
            Simple, transparent pricing for payroll, statutory compliance and
            payments - built for smart businesses.{" "}
            <strong>
              Every plan includes full statutory compliance no hidden
              compliance upsells.
            </strong>
          </p>
          <p className="font-sans text-sm text-gray-400 italic">
            All prices are in Nigerian Naira (₦) and exclusive of 7.5% VAT.
          </p>
        </div>
      </div>

      {/* Pricing table */}
      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto">

          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-6 font-sans"
            style={{ color: GREEN }}
          >
            Plans
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ border: "1px solid #e5e7eb" }}>
              <thead>
                <tr>
                  {/* Label cell */}
                  <th
                    className="p-4 text-left font-sans w-[28%]"
                    style={{ border: "1px solid #e5e7eb", backgroundColor: GREEN_DARK }}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-green-200">
                      Plan
                    </span>
                  </th>
                  {[
                    { name: "Basic",      range: "5 – 20 staff" },
                    { name: "Starter",    range: "21 – 50 staff" },
                    { name: "Growth",     range: "51 – 150 staff" },
                    { name: "Enterprise", range: "150+ staff" },
                  ].map((p) => (
                    <th
                      key={p.name}
                      className="p-4 text-center"
                      style={{ border: "1px solid #1a6e3a", backgroundColor: GREEN_DARK }}
                    >
                      <p className="font-bold text-white font-sans text-base">{p.name}</p>
                      <p className="text-xs font-sans mt-0.5 text-green-200">{p.range}</p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Best for */}
                <tr>
                  <td className="p-4 text-sm font-semibold text-gray-700 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    Best for
                  </td>
                  {["Micro-businesses", "Growing SMEs", "Established mid-market", "Large employers"].map((v) => (
                    <td key={v} className="p-4 text-sm text-center text-gray-600 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                      {v}
                    </td>
                  ))}
                </tr>

                {/* Platform fee */}
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <td className="p-4 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="text-sm font-semibold text-gray-700">Platform fee</p>
                    <p className="text-xs text-gray-400">per business / month</p>
                  </td>
                  {["₦15,000", "₦20,000", "₦30,000"].map((v) => (
                    <td key={v} className="p-4 text-center font-sans" style={{ border: "1px solid #e5e7eb" }}>
                      <span className="text-base font-bold text-gray-900">{v}</span>
                    </td>
                  ))}
                  <td className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                    <ContactSales />
                  </td>
                </tr>

                {/* Per active employee */}
                <tr>
                  <td className="p-4 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="text-sm font-semibold text-gray-700">Per active employee / contractor</p>
                    <p className="text-xs text-gray-400">per person / month</p>
                  </td>
                  {[
                    { val: "₦2,000", green: true },
                    { val: "₦1,500", green: true },
                    { val: "₦1,000", green: true },
                  ].map(({ val, green }) => (
                    <td key={val} className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                      <span className="text-base font-bold" style={{ color: green ? GREEN : undefined }}>{val}</span>
                    </td>
                  ))}
                  <td className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                    <ContactSales />
                  </td>
                </tr>

                {/* Admin & manager seats */}
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <td className="p-4 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="text-sm font-semibold text-gray-700">Admin &amp; manager seats</p>
                    <p className="text-xs text-gray-400">per seat / month</p>
                  </td>
                  {["₦1,000", "₦900", "₦700"].map((v) => (
                    <td key={v} className="p-4 text-center font-sans" style={{ border: "1px solid #e5e7eb" }}>
                      <span className="text-base font-bold text-gray-900">{v}</span>
                    </td>
                  ))}
                  <td className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                    <ContactSales />
                  </td>
                </tr>

                {/* Full statutory compliance */}
                <tr>
                  <td className="p-4 text-sm font-semibold text-gray-700 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    Full statutory compliance
                  </td>
                  {[0, 1, 2, 3].map((i) => (
                    <td key={i} className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                      <span className="text-sm font-semibold font-sans" style={{ color: GREEN }}>
                        Included
                      </span>
                    </td>
                  ))}
                </tr>

                {/* ── Support header ── */}
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-xs font-bold font-sans"
                    style={{ backgroundColor: "#dcefe0", color: GREEN }}
                  >
                    Support
                  </td>
                </tr>

                {/* Support level */}
                <tr>
                  <td className="p-4 text-sm font-semibold text-gray-700 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    Support level
                  </td>
                  {["Basic", "Standard", "Priority and dedicated manager", "Priority and dedicated manager"].map((v, i) => (
                    <td key={i} className="p-4 text-sm text-center text-gray-600 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                      {v}
                    </td>
                  ))}
                </tr>

                {/* Help centre */}
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <td className="p-4 text-sm text-gray-700 font-sans" style={{ border: "1px solid #e5e7eb" }}>Help centre</td>
                  {[true, true, true, true].map((v, i) => (
                    <td key={i} className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                      <CheckIcon />
                    </td>
                  ))}
                </tr>

                {/* Email */}
                <tr>
                  <td className="p-4 text-sm text-gray-700 font-sans" style={{ border: "1px solid #e5e7eb" }}>Email</td>
                  {[true, true, true, true].map((v, i) => (
                    <td key={i} className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                      <CheckIcon />
                    </td>
                  ))}
                </tr>

                {/* Slack / WhatsApp */}
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <td className="p-4 text-sm text-gray-700 font-sans" style={{ border: "1px solid #e5e7eb" }}>Slack / WhatsApp</td>
                  <td className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}><CrossIcon /></td>
                  {[true, true, true].map((v, i) => (
                    <td key={i} className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                      <CheckIcon />
                    </td>
                  ))}
                </tr>

                {/* ── Transaction fees header ── */}
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-white font-sans"
                    style={{ backgroundColor: "#dcefe0", color: GREEN }}
                  >
                    Transaction Fees
                  </td>
                </tr>

                {/* Salary disbursement */}
                <tr>
                  <td className="p-4 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="text-sm font-semibold text-gray-700">Salary disbursement</p>
                    <p className="text-xs text-gray-400">single credit &lt; ₦10M</p>
                  </td>
                  {["₦75", "₦50", "₦25"].map((v) => (
                    <td key={v} className="p-4 text-center font-sans" style={{ border: "1px solid #e5e7eb" }}>
                      <span className="text-sm font-bold text-gray-900">{v}</span>
                    </td>
                  ))}
                  <td className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                    <ContactSales />
                  </td>
                </tr>

                {/* Pay-in / wallet funding */}
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <td className="p-4 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="text-sm font-semibold text-gray-700">Pay-in / wallet funding</p>
                    <p className="text-xs text-gray-400">on amount funded</p>
                  </td>
                  {[
                    { pct: "1.0%", cap: "cap ₦550" },
                    { pct: "1.0%", cap: "cap ₦550" },
                    { pct: "0.7%", cap: "cap ₦450" },
                  ].map(({ pct, cap }, i) => (
                    <td key={i} className="p-4 text-center font-sans" style={{ border: "1px solid #e5e7eb" }}>
                      <p className="text-sm font-bold text-gray-900">{pct}</p>
                      <p className="text-xs text-gray-400">{cap}</p>
                    </td>
                  ))}
                  <td className="p-4 text-center" style={{ border: "1px solid #e5e7eb" }}>
                    <ContactSales />
                  </td>
                </tr>

                {/* Large payout — spans all plan columns */}
                <tr>
                  <td className="p-4 font-sans" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="text-sm font-semibold text-gray-700">Large payout</p>
                    <p className="text-xs text-gray-400">single transfer ≥ ₦10M</p>
                  </td>
                  <td
                    colSpan={4}
                    className="p-4 text-center font-sans"
                    style={{ border: "1px solid #e5e7eb" }}
                  >
                    <p className="text-sm font-bold text-gray-900">0.5% of the transfer</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      minimum ₦50,000 · maximum ₦150,000
                    </p>
                    <p className="text-xs font-semibold italic mt-0.5" style={{ color: GREEN }}>
                      PAYE &amp; pension remittances exempt
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Choosing a plan */}
          <p className="font-sans text-sm text-gray-600 leading-relaxed mt-8">
            <strong>Choosing a plan:</strong> plans are guided by your headcount, but you can
            start on any tier. As you grow, the{" "}
            <strong>per-employee rate falls at each level</strong> larger teams pay less
            per head.
          </p>

          {/* Worked example callout */}
          <div
            className="mt-6 rounded-lg p-5"
            style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3 font-sans"
              style={{ color: "#d97706" }}
            >
              Worked Example
            </p>
            <p className="font-sans text-sm text-gray-700 mb-2">
              A <strong>Starter</strong> business with <strong>40 employees</strong> and{" "}
              <strong>2 admin users</strong>:
            </p>
            <p className="font-sans text-sm text-gray-700">
              ₦20,000 platform + 40 × ₦1,500 people + 2 × ₦900 seats ={" "}
              <strong>₦81,800 / month</strong>{" "}
              <span className="text-gray-400">(ex-VAT)</span>
            </p>
          </div>
        </div>
      </div>

      {/* What every plan includes */}
      <div className="px-6 py-16" style={{ backgroundColor: BONE }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-8 font-sans"
            style={{ color: GREEN }}
          >
            What Every Plan Includes
          </p>
          <p className="font-sans text-base font-semibold text-gray-900 mb-6">
            Full statutory compliance — on every tier, at no extra cost:
          </p>
          <ul className="space-y-4">
            {[
              {
                label: "PAYE",
                text: "calculation, payslips and remittance across all 36 states and the FCT",
              },
              {
                label: "Pension",
                text: "contributions computed and routed to PFAs via a licensed pension payment service provider",
              },
              {
                label: "NHF, NSITF & ITF",
                text: "deductions and statutory schedules",
              },
              {
                label: "Statutory reports",
                text: "and remittance schedules generated automatically for each pay run",
              },
            ].map(({ label, text }) => (
              <li key={label} className="flex items-start gap-3 font-sans text-sm text-gray-700">
                <span
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: GREEN }}
                />
                <span>
                  <strong>{label}</strong> {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 px-6 text-center" style={{ backgroundColor: NEAR_BLACK }}>
        <div className="max-w-xl mx-auto">
          <h2
            className="text-4xl text-white mb-4"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
          >
            Not sure which plan is right for you?
          </h2>
          <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8">
            Start your 60 day free trial today, or talk to us and we will walk you through
            the right fit for your team size, compliance needs, and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="https://app.brigadely.com/signup" target="_blank">
              <button
                className="px-8 py-3.5 rounded-full font-semibold font-sans text-white text-sm transition duration-200 hover:opacity-90"
                style={{ backgroundColor: GREEN }}
              >
                Start free - 60 days
              </button>
            </Link>
            <CalendlyButton className="border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold font-sans text-sm hover:border-white/50 transition duration-200 bg-transparent cursor-pointer" />
          </div>
        </div>
      </div>

    </div>
  );
}
