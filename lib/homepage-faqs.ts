/**
 * The home page FAQ: the single source for the visible accordion
 * (components/Faq.jsx) and the FAQPage structured data (app/(frontend)/page.jsx),
 * so the two can never disagree, which Google's FAQ guidelines require.
 */
export type HomepageFaq = {
  question: string;
  /** Shown on the page. */
  answer: string;
  /**
   * Plain-text version for the structured data. Only needed if `answer` ever
   * gains links or formatting; otherwise `answer` is used as is.
   */
  schemaAnswer?: string;
};

export const HOMEPAGE_FAQS: readonly HomepageFaq[] = [
  {
    question: "Where does Brigadely operate?",
    answer:
      "Brigadely is live in Nigeria today, where we serve businesses across all 36 states and the FCT. Kenya, Ghana, and South Africa are in our pipeline. The ledger is built to handle multi-currency, multi-jurisdiction compliance, and cross-border payments - so as your business expands across Africa, Brigadely expands with it.",
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
      "Everything. You get full access to the ledger - payroll, compliance, vendor payments, expense management, and stablecoin payouts - for 60 days at no cost. No credit card required. You can run live payroll during the trial period.",
  },
  {
    question: "Who is Brigadely built for?",
    answer:
      "Brigadely is built for operators running African businesses - founders managing their first payroll, CFOs overseeing multi-entity groups, finance teams closing month-end, and accountants managing compliance across a client portfolio. If your business has employees or contractors and statutory obligations, the ledger is for you.",
  },
  {
    question: "How does Brigadely differ from accounting software?",
    answer:
      "Accounting software records what has already happened. Brigadely executes it. When payroll runs, deductions are calculated, filed, and remitted - not just posted to a journal entry. When a vendor is paid, the ledger updates in the same action. Brigadely is an operating layer, not a record-keeping layer.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All financial and employee data is encrypted in transit and at rest. Access is role-controlled - each team member sees only what their role permits. Brigadely maintains a full audit log of every action taken on the ledger.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams complete setup in under a day and run their first payroll within a week. There are no implementation consultants required. You import your employee records, connect your payment accounts, and Brigadely handles the rest.",
  },
];

/** FAQPage structured data, built from the same items the page shows (plain-text answers only). */
export function homepageFaqSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.schemaAnswer ?? faq.answer },
    })),
  };
}
