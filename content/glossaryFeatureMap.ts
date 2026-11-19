/**
 * Which product page each glossary term points to, with the callout copy shown
 * under its definition (components/glossary/GlossaryFeatureCallout.tsx).
 *
 * A slug that isn't listed (e.g. a term added in the CMS later) gets no
 * callout. `consolidated-relief-allowance` is deliberately left out: the CRA
 * was abolished from 1 January 2026, so it shouldn't point to a product.
 */

export type GlossaryCallout = {
  href: string;
  heading: string;
  /** Rendered with a trailing "→". */
  linkText: string;
};

const GROUPS: { callout: GlossaryCallout; slugs: string[] }[] = [
  {
    callout: {
      href: "/payroll",
      heading: "Run this in your payroll with Brigadely",
      linkText: "Explore Payroll",
    },
    slugs: [
      "13th-month-salary",
      "gross-pay-vs-net-pay",
      "prorated-salary",
      "off-cycle-payroll",
      "basic-housing-transport-allowances",
      "severance-pay",
      "group-life-insurance",
    ],
  },
  {
    callout: {
      href: "/statutory-compliance",
      heading: "Track statutory deductions on every payroll run",
      linkText: "Explore Statutory Compliance",
    },
    slugs: [
      "paye",
      "lirs",
      "fct-irs",
      "firs-vs-sirs",
      "annual-paye-returns-form-h1",
      "contributory-pension",
      "pfa-rsa-pin",
      "nhf",
      "nsitf",
      "itf",
      "tax-clearance-certificate",
    ],
  },
  {
    callout: {
      href: "/contractor-payments",
      heading: "Pay contractors in Naira or USDC with Brigadely",
      linkText: "Explore Contractor Payments",
    },
    slugs: [
      "independent-contractor-vs-employee",
      "contractor-invoice-sow",
      "usdc-settlement",
      "domiciliary-account",
      "fx-spread",
    ],
  },
  {
    callout: {
      href: "/expense-management",
      heading: "Manage expenses and reimbursements with Brigadely",
      linkText: "Explore Expense Management",
    },
    slugs: ["expense-reimbursement"],
  },
  {
    callout: {
      href: "/vendor-payments",
      heading: "Pay suppliers with WHT handled correctly",
      linkText: "Explore Vendor Payments",
    },
    slugs: ["withholding-tax", "three-way-matching"],
  },
  {
    callout: {
      href: "/asset-management",
      heading: "Track assets and depreciation with Brigadely",
      linkText: "Explore Asset Management",
    },
    slugs: ["fixed-asset-depreciation"],
  },
  {
    callout: {
      href: "/#how-it-works",
      heading: "See how every payment lands on one ledger",
      linkText: "See how Brigadely works",
    },
    slugs: ["audit-trail", "operating-ledger-vs-accounting-software"],
  },
];

const BY_SLUG = new Map<string, GlossaryCallout>(
  GROUPS.flatMap(({ callout, slugs }) => slugs.map((slug) => [slug, callout] as const)),
);

/** The callout for a glossary term, or null when it has none. */
export function glossaryFeatureCallout(slug: string): GlossaryCallout | null {
  return BY_SLUG.get(slug) ?? null;
}
