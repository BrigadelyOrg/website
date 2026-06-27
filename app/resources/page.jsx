import Link from "next/link";

export const metadata = {
  title: "Resources — Nigerian Payroll & Compliance Guides",
  description:
    "Practical guides on PAYE filing, pension remittance, NHF, NSITF, ITF, and multi-state payroll in Nigeria. Written for finance teams, founders, and accountants.",
  alternates: {
    canonical: "https://brigadely.com/resources",
  },
  openGraph: {
    url: "https://brigadely.com/resources",
    title: "Resources — Nigerian Payroll & Compliance Guides | Brigadely",
    description:
      "Practical guides on PAYE filing, pension remittance, NHF, NSITF, ITF, and multi-state payroll in Nigeria.",
    type: "website",
  },
};

const GREEN = "#007a3d";
const BONE  = "#F4EFE4";

/*
 * Topic briefs — prioritised by search volume and Brigadely's ICP.
 * Each article maps to a high-intent compliance keyword cluster.
 * Status: "coming-soon" until the article is published; update to "published"
 * and add a real slug before linking.
 */
const articles = [
  {
    slug:     "paye-filing-guide-nigeria",
    tag:      "PAYE",
    title:    "The Complete Guide to PAYE Filing in Nigeria (2025)",
    excerpt:
      "Everything Nigerian employers need to know about Pay As You Earn: how it is calculated, which State IRS receives each remittance, filing deadlines, and penalties for late payment.",
    keywords: ["PAYE filing Nigeria", "PAYE remittance", "multi-state PAYE"],
    status:   "coming-soon",
  },
  {
    slug:     "pension-remittance-nigeria-pencom",
    tag:      "Pension",
    title:    "Pension Remittance in Nigeria: PenCom Rules for Employers",
    excerpt:
      "A practical breakdown of employer and employee pension contribution rates, PFAs, remittance deadlines, and what non-compliance costs — with current PenCom guidance.",
    keywords: ["pension remittance Nigeria", "PenCom employer guide", "pension contribution Nigeria"],
    status:   "coming-soon",
  },
  {
    slug:     "nhf-nsitf-itf-employer-guide",
    tag:      "NHF · NSITF · ITF",
    title:    "NHF, NSITF, and ITF: The Employer's Quick-Reference Guide",
    excerpt:
      "Rates, deadlines, and filing requirements for the three statutory deductions that most Nigerian employers miss: National Housing Fund, NSITF, and the Industrial Training Fund.",
    keywords: ["NHF Nigeria employer", "NSITF remittance", "ITF levy Nigeria"],
    status:   "coming-soon",
  },
  {
    slug:     "multi-state-payroll-nigeria",
    tag:      "Multi-state payroll",
    title:    "Multi-State Payroll in Nigeria: How to Route PAYE Correctly Across 36 States",
    excerpt:
      "When your workforce spans multiple states, each employee's PAYE must go to their tax-resident State IRS. This guide explains the routing rules, common mistakes, and how to audit your current setup.",
    keywords: ["multi-state payroll Nigeria", "PAYE routing Nigeria", "state IRS payroll"],
    status:   "coming-soon",
  },
  {
    slug:     "payroll-for-smes-nigeria",
    tag:      "SME payroll",
    title:    "Running Payroll as an SME in Nigeria: What the Law Requires",
    excerpt:
      "From hiring your first employee to scaling past 50 staff, here is every statutory obligation — PAYE, Pension, NHF, NSITF, ITF — and what happens when you miss them.",
    keywords: ["payroll for small business Nigeria", "SME payroll Nigeria", "Nigerian payroll requirements"],
    status:   "coming-soon",
  },
  {
    slug:     "payroll-for-accountants-nigeria",
    tag:      "For accountants",
    title:    "Managing Payroll for Multiple Clients in Nigeria: A Guide for Accountants",
    excerpt:
      "How accounting and advisory firms can standardise payroll and compliance workflows across their client portfolio — covering multi-client PAYE filing, audit trail requirements, and remittance records.",
    keywords: ["payroll for accountants Nigeria", "multi-client payroll Nigeria", "accounting firm payroll"],
    status:   "coming-soon",
  },
  {
    slug:     "nigeria-tax-bands-2025",
    tag:      "Tax bands",
    title:    "Nigeria Personal Income Tax Bands and Rates for 2025",
    excerpt:
      "The current PITA tax bands and reliefs used to calculate PAYE for employees in 2025, including the consolidated relief allowance and relevant NTA updates. [VERIFY: confirm with FIRS for latest guidance]",
    keywords: ["Nigeria income tax bands 2025", "PITA rates Nigeria", "NTA tax update 2025"],
    status:   "coming-soon",
  },
  {
    slug:     "payroll-audit-checklist-nigeria",
    tag:      "Compliance",
    title:    "Payroll Compliance Audit Checklist for Nigerian Businesses",
    excerpt:
      "A practical checklist finance teams can use to verify that payroll is compliant before a tax audit: PAYE reconciliation, pension schedules, NHF deductions, and remittance receipts.",
    keywords: ["payroll audit Nigeria", "payroll compliance checklist Nigeria", "PAYE audit Nigeria"],
    status:   "coming-soon",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <section style={{ backgroundColor: BONE }} className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">

          <p
            className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
            style={{ color: GREEN }}
          >
            Resources
          </p>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#111111] mb-6"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 900,
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
            }}
          >
            Nigerian payroll &{" "}
            <span style={{ color: GREEN }}>compliance guides.</span>
          </h1>

          <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-xl">
            Practical reference for finance teams, founders, and accountants navigating
            PAYE, pension, NHF, NSITF, ITF, and multi-state payroll in Nigeria.
          </p>

        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          <div className="grid gap-8 md:grid-cols-2">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="border border-gray-100 rounded-2xl p-7 hover:shadow-md transition-shadow duration-200"
              >
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: "#e0f3ec", color: GREEN }}
                >
                  {article.tag}
                </span>

                <h2 className="font-sans text-base font-bold text-[#111111] leading-snug mb-3">
                  {article.status === "published" ? (
                    <Link
                      href={`/resources/${article.slug}`}
                      className="hover:underline"
                      style={{ color: GREEN }}
                    >
                      {article.title}
                    </Link>
                  ) : (
                    article.title
                  )}
                </h2>

                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {article.status === "published" ? (
                  <Link
                    href={`/resources/${article.slug}`}
                    className="font-sans text-sm font-semibold"
                    style={{ color: GREEN }}
                  >
                    Read guide →
                  </Link>
                ) : (
                  <span className="font-sans text-xs text-gray-400">Coming soon</span>
                )}
              </article>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl text-center" style={{ backgroundColor: BONE }}>
            <h2
              className="text-2xl md:text-3xl text-[#111111] mb-4"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to automate compliance?
            </h2>
            <p className="font-sans text-base text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
              Brigadely handles PAYE, Pension, NHF, NSITF, and ITF on every payroll run —
              so your team stops worrying about deadlines.
            </p>
            <Link
              href="https://app.brigadely.com/signup"
              target="_blank"
              className="inline-block px-8 py-4 rounded-full font-sans font-semibold text-sm text-white transition duration-200 hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Start free trial
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
