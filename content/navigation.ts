/**
 * Site navigation copy: the six product feature pages and the Resources links.
 * The header mega-menu, the mobile menu, the footer, the home page Platform
 * cards and the feature pages all read the names from here, so a module is
 * called the same thing everywhere.
 *
 * Feature page copy (headlines, cards, FAQs) lives in content/featurePages.ts.
 */
import {
  Banknote,
  BookA,
  Globe,
  Newspaper,
  Package,
  Receipt,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const FEATURE_SLUGS = [
  "payroll",
  "statutory-compliance",
  "contractor-payments",
  "expense-management",
  "vendor-payments",
  "asset-management",
] as const;

export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

export type NavItem = {
  name: string;
  href: string;
  /** One line under the name in the menus. */
  subtitle: string;
  icon: LucideIcon;
};

export const FEATURE_NAV: Record<FeatureSlug, NavItem> = {
  payroll: {
    name: "Payroll",
    href: "/payroll",
    subtitle: "Gross-to-net runs, payslips & payouts",
    icon: Banknote,
  },
  "statutory-compliance": {
    name: "Statutory Compliance",
    href: "/statutory-compliance",
    subtitle: "PAYE, pension, NHF, NSITF & ITF",
    icon: ShieldCheck,
  },
  "contractor-payments": {
    name: "Contractor Payments",
    href: "/contractor-payments",
    subtitle: "Naira & cross-border USDC payouts",
    icon: Globe,
  },
  "expense-management": {
    name: "Expense Management",
    href: "/expense-management",
    subtitle: "Approvals, spend policies & reimbursements",
    icon: Receipt,
  },
  "vendor-payments": {
    name: "Vendor Payments",
    href: "/vendor-payments",
    subtitle: "Invoice checks & WHT compliance",
    icon: Truck,
  },
  "asset-management": {
    name: "Asset Management",
    href: "/asset-management",
    subtitle: "Asset register, depreciation & disposals",
    icon: Package,
  },
};

/** The six feature pages in menu order. */
export const FEATURE_NAV_ITEMS: readonly NavItem[] = FEATURE_SLUGS.map((slug) => FEATURE_NAV[slug]);

/** The left panel of "The Platform" mega-menu. */
export const PLATFORM_MENU = {
  heading: "The Platform",
  subtext:
    "Every payment out of your business - staff, contractors, vendors and statutory obligations on one ledger.",
  // Reuses the home page hero's dashboard image (public/img/multi-image.png).
  preview: {
    src: "/img/multi-image.png",
    alt: "Brigadely payments and payroll screens on laptop and tablet",
    width: 2938,
    height: 2463,
  },
  link: { label: "See how it works", href: "/#how-it-works" },
} as const;

export const RESOURCE_NAV: readonly NavItem[] = [
  { name: "Blog", href: "/blog", subtitle: "Guides & compliance updates", icon: Newspaper },
  { name: "Glossary", href: "/glossary", subtitle: "Payroll, tax & finance definitions", icon: BookA },
];

/**
 * Home page sections linked from the header. The leading "/" makes them work
 * from any page, not only the home page.
 */
export const SECTION_NAV = [
  { name: "Who it's for", href: "/#who" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "FAQ", href: "/#faqs" },
] as const;
