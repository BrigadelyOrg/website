/**
 * All copy for the six product feature pages (/payroll, /statutory-compliance,
 * /contractor-payments, /expense-management, /vendor-payments,
 * /asset-management). The page template (components/features/FeaturePage.tsx)
 * renders only what is here, so every claim can be reviewed in this one file.
 *
 * Review notes:
 * - Meta titles, meta descriptions and H1s are as briefed and must stay exact.
 * - Every capability card, FAQ answer, value proposition and ledger section is
 *   marked `// TODO: confirm live`: confirm the feature exists, then delete the
 *   comment (or the item).
 * - Nigerian terminology follows the Nigeria Tax Act 2025 (in force from
 *   1 January 2026): the federal authority is the Nigeria Revenue Service
 *   (NRS), and the old consolidated relief has been replaced by rent relief.
 * - Images are fixed slots under /public/images/features/<slug>/ (hero.jpg,
 *   ledger.jpg), plus a share image per page at /public/images/og/<slug>.jpg
 *   (1200×630). To replace one, overwrite the file at the same path, keeping
 *   the shape given by SPLIT_HERO_SIZE, WIDE_SIZE or OG_SIZE below, and update
 *   its alt text here. If a file is missing, the page shows a placeholder with the
 *   expected path and size (components/features/FeatureImage.tsx).
 * - The current images (except the payroll hero) are stock photos from Pexels
 *   with illustrative cards added; the names and amounts on the cards are
 *   examples, not customer data.
 */
import {
  Archive,
  ArrowLeftRight,
  Banknote,
  Boxes,
  CalendarClock,
  Calculator,
  ClipboardCheck,
  Coins,
  FileCheck2,
  FileSignature,
  FileText,
  HandCoins,
  History,
  House,
  Landmark,
  Laptop,
  ListChecks,
  MapPin,
  Percent,
  PiggyBank,
  ScanLine,
  ScrollText,
  ShieldCheck,
  Tags,
  TrendingDown,
  Truck,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { FeatureSlug } from "./navigation";

export type ImageSlot = {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** A headline with one word or phrase (`emphasis`, a substring of `text`) in brand green. */
export type Emphasised = { text: string; emphasis: string };

export type Capability = { icon: LucideIcon; title: string; body: string };

export type LedgerLink = { icon: LucideIcon; label: string; body: string };

/** Plain text only: answers are also the FAQPage structured data. */
export type FeatureFaq = { question: string; answer: string };

/** Glossary entries the feature pages link to, with the link text used for each. */
export const GLOSSARY_GUIDES = {
  "13th-month-salary": "13th month salary",
  "gross-pay-vs-net-pay": "Gross pay vs. net pay",
  "prorated-salary": "Prorated salary",
  "off-cycle-payroll": "Off-cycle payroll",
  "basic-housing-transport-allowances": "Basic, housing & transport allowances",
  "severance-pay": "Severance pay & terminal benefits",
  paye: "PAYE (Pay-As-You-Earn)",
  lirs: "LIRS (Lagos State Internal Revenue Service)",
  "fct-irs": "FCT-IRS (FCT Internal Revenue Service)",
  "firs-vs-sirs": "Federal vs. state tax authorities",
  "annual-paye-returns-form-h1": "Annual PAYE returns (Form H1)",
  "contributory-pension": "Contributory pension",
  "pfa-rsa-pin": "PFA & RSA PIN",
  nhf: "NHF (National Housing Fund)",
  nsitf: "NSITF (Nigeria Social Insurance Trust Fund)",
  itf: "ITF (Industrial Training Fund)",
  "tax-clearance-certificate": "Tax clearance certificate (TCC)",
  "independent-contractor-vs-employee": "Independent contractor vs. employee",
  "contractor-invoice-sow": "Contractor invoice & statement of work",
  "usdc-settlement": "USDC settlement",
  "domiciliary-account": "Domiciliary account",
  "fx-spread": "FX spread & interbank rate",
  "expense-reimbursement": "Expense reimbursement",
  "audit-trail": "Audit trail",
  "operating-ledger-vs-accounting-software": "Operating ledger vs. accounting software",
  "withholding-tax": "Withholding tax (WHT)",
  "three-way-matching": "Three-way matching",
  "fixed-asset-depreciation": "Fixed asset depreciation",
} as const;

export type GlossaryGuideSlug = keyof typeof GLOSSARY_GUIDES;

/**
 * Hero arrangement: copy beside the screenshot ("split"), the screenshot on the
 * left ("split-reversed"), the split on near-black ("dark"), or the copy
 * centred above the screenshot ("centered").
 */
export type HeroLayout = "split" | "split-reversed" | "dark" | "centered";

/** One row of the statutory deductions table: who pays and where it goes. */
export type AuthorityRow = { deduction: string; payer: string; paidTo: string };

/** Two payout options side by side; each row gives one value per column. */
export type Comparison = {
  columns: [{ label: string; icon: LucideIcon }, { label: string; icon: LucideIcon }];
  rows: { label: string; values: [string, string] }[];
};

type CapabilitiesBase = { heading: Emphasised; cards: Capability[] };

/**
 * How the capability cards are laid out, chosen to fit each module:
 * "steps" (a sequence across the page), "checklist" (a numbered vertical
 * list), "lifecycle" (a timeline), "bento" (one large card and smaller ones),
 * "authorities" (a deductions table above the cards) and "comparison" (two
 * options side by side above the cards).
 */
export type CapabilitiesSection =
  | (CapabilitiesBase & { layout: "steps" | "checklist" | "lifecycle" | "bento" })
  | (CapabilitiesBase & { layout: "authorities"; authorities: AuthorityRow[] })
  | (CapabilitiesBase & { layout: "comparison"; comparison: Comparison });

export type FeaturePageContent = {
  slug: FeatureSlug;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: Emphasised;
  heroLayout: HeroLayout;
  valueProp: string;
  heroImage: ImageSlot;
  capabilities: CapabilitiesSection;
  /** "How it connects to the Brigadely ledger". */
  ledger: { intro: string; links: LedgerLink[]; image: ImageSlot };
  glossary: GlossaryGuideSlug[];
  faqs: FeatureFaq[];
  /** Share image, used only once the file exists; otherwise the site default. */
  ogImage: ImageSlot;
};

/**
 * Recommended image sizes. Every image fills its frame edge to edge, so a
 * replacement of another shape still works (it is cropped evenly from the
 * sides or the top and bottom), but these shapes crop the least:
 * - SPLIT_HERO_SIZE (4:5) for a hero image beside the copy ("split",
 *   "split-reversed", "dark"). The panel's shape changes with the screen, so
 *   keep people and text within the middle 70% of the width and 80% of the height.
 * - WIDE_SIZE (16:10) for a centred hero and the ledger images, shown uncropped.
 */
const SPLIT_HERO_SIZE = { width: 1200, height: 1500 };
const WIDE_SIZE = { width: 1600, height: 1000 };
const OG_SIZE = { width: 1200, height: 630 };

export const FEATURE_PAGES: Record<FeatureSlug, FeaturePageContent> = {
  // ─── /payroll ────────────────────────────────────────────────────────────
  payroll: {
    slug: "payroll",
    metaTitle: "Payroll Software for Nigerian & African Businesses | Brigadely",
    metaDescription:
      "Run gross-to-net payroll for staff and contractors, generate payslips, handle off-cycle runs and post every payment to one ledger with Brigadely.",
    eyebrow: "Payroll",
    h1: { text: "Payroll built into your financial operating system.", emphasis: "system." },
    heroLayout: "centered",
    // TODO: confirm live
    valueProp:
      "Brigadely works out gross-to-net pay for every employee, produces payslips and pays net salaries to staff bank accounts. Each approved run is recorded on the same ledger as your statutory remittances, contractor payouts and supplier payments.",
    heroImage: {
      src: "/images/features/payroll/hero.jpg",
      alt: "A smiling professional at his desk, beside Brigadely cards for a completed ₦48,500,000 payroll, Naira payouts, vendor payments and employees",
      // The supplied photo's own size (16:10, like WIDE_SIZE).
      width: 1312,
      height: 816,
    },
    capabilities: {
      layout: "steps",
      heading: { text: "From pay structure to payout.", emphasis: "payout." },
      cards: [
        // TODO: confirm live
        {
          icon: Calculator,
          title: "Gross-to-net from your pay structure",
          body: "Set each employee's pay as basic salary, housing and transport allowances plus any other earnings. Brigadely applies pension, NHF and PAYE deductions to that structure and shows how every net figure was reached before you approve the run.",
        },
        // TODO: confirm live
        {
          icon: CalendarClock,
          title: "Off-cycle and 13th-month runs",
          body: "Pay a bonus, a correction or a final settlement between regular pay dates without reopening the month. Off-cycle and 13th-month runs use the same deduction rules and are recorded as runs of their own.",
        },
        // TODO: confirm live
        {
          icon: FileText,
          title: "Payslips for every employee",
          body: "Every approved run generates a payslip per employee itemising earnings, statutory deductions and net pay for the period, so each person has a clear record and you keep a copy for every month.",
        },
        // TODO: confirm live
        {
          icon: Landmark,
          title: "Payouts to Nigerian bank accounts",
          body: "Approved net pay is sent to each employee's bank account, and every transfer is linked to the payslip and run it belongs to, so a failed or returned payment is easy to trace.",
        },
      ],
    },
    // TODO: confirm live
    ledger: {
      intro:
        "A payroll run in Brigadely is not a file you export to another system. Once approved, it posts to the ledger that holds the rest of your outgoing payments.",
      links: [
        {
          icon: ShieldCheck,
          label: "Statutory compliance",
          body: "The deductions calculated in each run become the PAYE, pension and NHF amounts you owe, tied to the employees and period that produced them.",
        },
        {
          icon: ArrowLeftRight,
          label: "Payments",
          body: "Salary transfers are recorded against the run, so the cash that left your account reconciles to payroll without a spreadsheet in between.",
        },
        {
          icon: History,
          label: "Audit trail",
          body: "Who prepared, edited and approved each run is logged with it, which helps when an auditor or tax officer asks how a figure was reached.",
        },
      ],
      image: {
        src: "/images/features/payroll/ledger.jpg",
        alt: "A professional reviewing payroll on a laptop, beside a Brigadely ledger card for October's payroll run: net pay, PAYE, pension and NHF from ₦48,500,000 gross pay",
        ...WIDE_SIZE,
      },
    },
    glossary: [
      "13th-month-salary",
      "gross-pay-vs-net-pay",
      "prorated-salary",
      "off-cycle-payroll",
      "basic-housing-transport-allowances",
      "severance-pay",
    ],
    faqs: [
      {
        question: "How does Brigadely calculate net pay?",
        // TODO: confirm live
        answer:
          "Gross pay is the total of basic salary, housing, transport and any other earnings for the period. Brigadely deducts the employee's pension contribution, NHF where it applies and PAYE worked out under the Nigeria Tax Act 2025, which took effect in January 2026. What remains is net pay.",
      },
      {
        question: "Can I pay someone who joins or leaves mid-month?",
        // TODO: confirm live
        answer:
          "Yes. Salary for a partial month can be prorated by the days worked, so a new joiner or leaver is paid only for the time they were employed. The prorated amount goes through the same deductions as a full month's pay.",
      },
      {
        question: "Do you support 13th-month pay and bonuses?",
        // TODO: confirm live
        answer:
          "You can add a 13th-month payment or a one-off bonus to a regular run or pay it separately in an off-cycle run. Either way it counts as taxable income, so PAYE is calculated on it like any other earnings.",
      },
      {
        question: "Should contractors be paid through payroll?",
        // TODO: confirm live
        answer:
          "Usually not. Independent contractors are paid against invoices, and withholding tax may apply instead of PAYE. Brigadely keeps them on the same ledger but pays them through Contractor Payments, which keeps the two groups and their tax treatment separate.",
      },
    ],
    ogImage: {
      src: "/images/og/payroll.jpg",
      alt: "Brigadely Payroll: Payroll built into your financial operating system, beside a ₦48,500,000 payroll complete card",
      ...OG_SIZE,
    },
  },

  // ─── /statutory-compliance ───────────────────────────────────────────────
  "statutory-compliance": {
    slug: "statutory-compliance",
    metaTitle: "PAYE, Pension & Statutory Remittance for Nigerian Employers | Brigadely",
    metaDescription:
      "Calculate PAYE, pension, NHF, NSITF and ITF on every payroll run, track remittances and keep an audit trail for your annual returns with Brigadely.",
    eyebrow: "Statutory compliance",
    h1: { text: "Statutory deductions calculated and tracked on every payroll run.", emphasis: "tracked" },
    heroLayout: "dark",
    // TODO: confirm live
    valueProp:
      "Brigadely works out PAYE, pension, NHF, NSITF and ITF from the payroll you approve, records what is due to each authority and what has been remitted, and keeps the history your annual returns and tax clearance applications depend on.",
    heroImage: {
      src: "/images/features/statutory-compliance/hero.jpg",
      alt: "An accountant working through payroll figures with a calculator, beside Brigadely cards for October's statutory deductions and the PAYE, pension and NHF amounts by authority",
      ...SPLIT_HERO_SIZE,
    },
    capabilities: {
      layout: "authorities",
      heading: { text: "Every deduction, matched to its authority.", emphasis: "authority." },
      // TODO: confirm live (rates and recipients: check with your tax adviser)
      authorities: [
        {
          deduction: "PAYE",
          payer: "Employee, deducted from pay",
          paidTo: "State Internal Revenue Service where the employee lives",
        },
        {
          deduction: "Pension",
          payer: "Employee (at least 8%) and employer (at least 10%)",
          paidTo: "The employee's Pension Fund Administrator (PFA)",
        },
        {
          deduction: "NHF",
          payer: "Employee, 2.5% of basic salary",
          paidTo: "Federal Mortgage Bank of Nigeria (FMBN)",
        },
        {
          deduction: "NSITF",
          payer: "Employer, 1% of total monthly payroll in most cases",
          paidTo: "Nigeria Social Insurance Trust Fund",
        },
        {
          deduction: "ITF",
          payer: "Employer with five or more staff or ₦50 million+ turnover, 1% of annual payroll",
          paidTo: "Industrial Training Fund",
        },
      ],
      cards: [
        // TODO: confirm live
        {
          icon: MapPin,
          title: "PAYE by State Internal Revenue Service",
          body: "PAYE is owed to the State Internal Revenue Service where each employee lives, such as LIRS in Lagos or FCT-IRS in Abuja. Brigadely records each employee's state of residence and groups PAYE by authority on every run.",
        },
        // TODO: confirm live
        {
          icon: PiggyBank,
          title: "Pension contributions by PFA",
          body: "Employee and employer pension contributions are calculated on each run and grouped by Pension Fund Administrator using each employee's RSA PIN, giving you a schedule for every PFA your staff use.",
        },
        // TODO: confirm live
        {
          icon: House,
          title: "NHF, NSITF and ITF",
          body: "NHF is deducted from employees' basic salary, while NSITF and ITF are contributions the employer pays on top of payroll. Brigadely calculates each one that applies to your business and shows the amount due for the period.",
        },
        // TODO: confirm live
        {
          icon: ClipboardCheck,
          title: "Remittance records for year end",
          body: "Each remittance is recorded against the run it came from. By year end, PAYE per employee is already in one place for your annual return (Form H1), and remittance records support tax clearance certificate applications.",
        },
      ],
    },
    // TODO: confirm live
    ledger: {
      intro:
        "Statutory deductions are not a separate spreadsheet rebuilt every month. They come from approved payroll runs and stay connected to them on the Brigadely ledger.",
      links: [
        {
          icon: Banknote,
          label: "Payroll",
          body: "Each deduction traces back to the employee, pay period and run that produced it, so a correction to payroll is reflected in what you owe.",
        },
        {
          icon: ArrowLeftRight,
          label: "Payments",
          body: "When you pay an authority, the payment is recorded against the obligations it settles, which keeps outstanding amounts visible until they are cleared.",
        },
        {
          icon: History,
          label: "Audit trail",
          body: "Calculations, approvals and remittance records stay on file by period: the evidence a tax audit or a TCC application typically asks for.",
        },
      ],
      image: {
        src: "/images/features/statutory-compliance/ledger.jpg",
        alt: "Hands on a calculator beside a Brigadely card listing October's PAYE, pension and NHF remittances, each marked settled or outstanding",
        ...WIDE_SIZE,
      },
    },
    glossary: [
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
    faqs: [
      {
        question: "Which authority receives PAYE?",
        // TODO: confirm live
        answer:
          "PAYE goes to the State Internal Revenue Service of the state where the employee lives, which is not always where the company is registered. A Lagos company with staff living in Ogun State remits their PAYE to the Ogun State Internal Revenue Service. The Nigeria Revenue Service (NRS) collects federal taxes such as companies income tax.",
      },
      {
        question: "Does Brigadely submit my annual PAYE return?",
        // TODO: confirm live
        answer:
          "Brigadely keeps the PAYE deducted and remitted for every employee through the year, which is the information the annual return (Form H1) asks for. Filing processes differ between states, so confirm the current requirements with your State Internal Revenue Service.",
      },
      {
        question: "What are the minimum pension contribution rates?",
        // TODO: confirm live
        answer:
          "Under the Pension Reform Act 2014, the minimum is 8% from the employee and 10% from the employer, based on monthly basic salary, housing and transport allowances. Employers can agree to contribute more, and Brigadely uses the rates you set.",
      },
      {
        question: "Do NSITF and ITF apply to every employer?",
        // TODO: confirm live
        answer:
          "NSITF's Employee Compensation Scheme covers employers generally, with a contribution of 1% of total monthly payroll in most cases. ITF applies to employers with five or more staff, or an annual turnover of ₦50 million or more, at 1% of annual payroll. Check which apply to your business.",
      },
    ],
    ogImage: {
      src: "/images/og/statutory-compliance.jpg",
      alt: "Brigadely Statutory Compliance: Statutory deductions calculated and tracked on every payroll run, beside a card for October's deductions",
      ...OG_SIZE,
    },
  },

  // ─── /contractor-payments ────────────────────────────────────────────────
  "contractor-payments": {
    slug: "contractor-payments",
    metaTitle: "Pay Contractors & Remote Teams in Naira or USDC | Brigadely",
    metaDescription:
      "Manage contractor invoices, apply withholding tax and pay local or cross-border contractors in Naira or USDC, all recorded on one ledger with Brigadely.",
    eyebrow: "Contractor payments",
    h1: { text: "Pay local and cross-border contractors in Naira or USDC.", emphasis: "USDC." },
    heroLayout: "split-reversed",
    // TODO: confirm live
    valueProp:
      "Keep contractors, their statements of work and their invoices next to your payroll. Approve work against what was agreed, deduct withholding tax where it applies, then pay in Naira to a Nigerian bank account or in USDC to contractors outside Nigeria.",
    heroImage: {
      src: "/images/features/contractor-payments/hero.jpg",
      alt: "A contractor working on a laptop at home, beside Brigadely cards for an approved ₦1,850,000 payout, Naira and USDC payout options and a statement of work",
      ...SPLIT_HERO_SIZE,
    },
    capabilities: {
      layout: "comparison",
      heading: { text: "From signed SOW to settled invoice.", emphasis: "invoice." },
      // TODO: confirm live (drawn from the value proposition and the USDC card below)
      comparison: {
        columns: [
          { label: "Naira", icon: Landmark },
          { label: "USDC", icon: Coins },
        ],
        rows: [
          { label: "Paid to", values: ["A Nigerian bank account", "A wallet the contractor controls"] },
          { label: "Best for", values: ["Contractors based in Nigeria", "Contractors abroad, including diaspora professionals"] },
          {
            label: "On the ledger",
            values: ["Linked to the approved invoice and its SOW", "Transfer reference stored with the invoice it pays"],
          },
        ],
      },
      cards: [
        // TODO: confirm live
        {
          icon: UserCheck,
          title: "Contractor profiles, separate from staff",
          body: "Contractors have their own profiles instead of sitting on PAYE payroll, which keeps the employee and contractor distinction clear. Each profile holds the agreed rate, payout currency and the documents the engagement rests on.",
        },
        // TODO: confirm live
        {
          icon: FileSignature,
          title: "Invoice approval against the SOW",
          body: "Contractors are paid on invoices tied to a statement of work or milestone. Each invoice is checked against the agreed amount and approved before payment, and both documents stay attached to the payout.",
        },
        // TODO: confirm live
        {
          icon: Percent,
          title: "Withholding tax on contractor invoices",
          body: "Where withholding tax applies, it is calculated on the invoice and the contractor receives the net amount. The withheld sum is recorded so it can be remitted to the correct tax authority.",
        },
        // TODO: confirm live
        {
          icon: Coins,
          title: "USDC payouts for remote contractors",
          body: "Contractors abroad, including diaspora professionals, can be paid in USDC, a stablecoin pegged to the US dollar, to a wallet they control. Each transfer reference is stored with the invoice it pays.",
        },
      ],
    },
    // TODO: confirm live
    ledger: {
      intro:
        "Contractor payouts run on the same ledger as payroll, which matters if the line between a contractor and an employee is ever questioned.",
      links: [
        {
          icon: Banknote,
          label: "Payroll",
          body: "Contractors and employees are paid from one system under separate rules, so total people costs can be reported together without mixing PAYE and withholding tax.",
        },
        {
          icon: ShieldCheck,
          label: "Statutory compliance",
          body: "Withholding tax taken from contractor invoices sits with your other remittances, each amount linked to the invoice it was deducted from.",
        },
        {
          icon: History,
          label: "Audit trail",
          body: "Every payout connects to its invoice, approval and statement of work, and USDC transfers keep their on-chain reference, so a cross-border payment can be traced end to end.",
        },
      ],
      image: {
        src: "/images/features/contractor-payments/ledger.jpg",
        alt: "A remote contractor at a laptop, beside a Brigadely ledger card listing Naira and USDC contractor payouts, withholding tax and payroll for October",
        ...WIDE_SIZE,
      },
    },
    glossary: [
      "independent-contractor-vs-employee",
      "contractor-invoice-sow",
      "usdc-settlement",
      "domiciliary-account",
      "fx-spread",
    ],
    faqs: [
      {
        question: "When is someone a contractor rather than an employee?",
        // TODO: confirm live
        answer:
          "It depends on the working relationship, not the job title. Someone who decides how and when they work, uses their own equipment and serves other clients is more likely a contractor. A person on fixed hours under your direction is usually an employee, with PAYE and pension obligations.",
      },
      {
        question: "Is withholding tax deducted from contractor payments?",
        // TODO: confirm live
        answer:
          "Withholding tax can apply to payments for services, depending on the service and whether the contractor is an individual or a company. Amounts withheld from individuals go to the State Internal Revenue Service, and from companies to the Nigeria Revenue Service (NRS). Confirm specific cases with your tax adviser.",
      },
      {
        question: "How do USDC payouts work?",
        // TODO: confirm live
        answer:
          "You set USDC as the contractor's payout currency and add their wallet address. When an approved invoice is paid, the USDC transfer and its reference are recorded against that invoice. The contractor decides whether to hold USDC or convert it.",
      },
      {
        question: "What currencies can contractors be paid in?",
        // TODO: confirm live
        answer:
          "Naira to a Nigerian bank account, or USDC. If a contractor invoices in US dollars and you pay from Naira, agree in advance which exchange rate applies, because the spread between rates changes the amount they receive.",
      },
    ],
    ogImage: {
      src: "/images/og/contractor-payments.jpg",
      alt: "Brigadely Contractor Payments: Pay local and cross-border contractors in Naira or USDC, beside a ₦1,850,000 contractor payout card",
      ...OG_SIZE,
    },
  },

  // ─── /expense-management ─────────────────────────────────────────────────
  "expense-management": {
    slug: "expense-management",
    metaTitle: "Business Expense Management & Reimbursement Software | Brigadely",
    metaDescription:
      "Capture team expenses, route approvals, enforce spend policies and reimburse staff with a full audit trail on Brigadely's financial operating system.",
    eyebrow: "Expense management",
    h1: { text: "Control company spend and reimburse teams without leaving the ledger.", emphasis: "ledger." },
    heroLayout: "split",
    // TODO: confirm live
    valueProp:
      "Staff submit expenses with receipts, the right people approve them against your spend policy, and approved claims are reimbursed and coded on the ledger, so out-of-pocket spending is recorded like every other payment the business makes.",
    heroImage: {
      src: "/images/features/expense-management/hero.jpg",
      alt: "A team member holding a company card, beside Brigadely cards for an approved ₦86,500 expense claim with its receipt attached and within policy",
      ...SPLIT_HERO_SIZE,
    },
    capabilities: {
      layout: "bento",
      heading: { text: "From receipt to reimbursement.", emphasis: "reimbursement." },
      cards: [
        // TODO: confirm live
        {
          icon: ScanLine,
          title: "Expense capture with receipts",
          body: "Team members submit a claim with the amount, category and a photo or file of the receipt. Each claim carries its evidence from the start, so finance is not chasing paperwork at month end.",
        },
        // TODO: confirm live
        {
          icon: Workflow,
          title: "Approval routing",
          body: "Claims go to the approver you choose, such as a line manager or department head, with a second approval above an amount you set. Each decision is stored with the approver's name and the date.",
        },
        // TODO: confirm live
        {
          icon: ListChecks,
          title: "Spend policies",
          body: "Set limits by category or by team, for example a ceiling on travel or per-diem claims. A claim outside policy is highlighted for the approver, who can approve it with a note or send it back.",
        },
        // TODO: confirm live
        {
          icon: HandCoins,
          title: "Reimbursement and ledger coding",
          body: "Approved claims are reimbursed to the employee's bank account and coded to an expense category and cost centre, so spend reports come from the ledger rather than a separate tracker.",
        },
      ],
    },
    // TODO: confirm live
    ledger: {
      intro:
        "Expenses are often tracked in one tool and reconciled in another weeks later. In Brigadely, a claim becomes a ledger entry when it is approved.",
      links: [
        {
          icon: Banknote,
          label: "Payroll",
          body: "Reimbursements use the employee records payroll already holds, so bank details are kept and updated in one place.",
        },
        {
          icon: ShieldCheck,
          label: "Statutory compliance",
          body: "Paying back a genuine business cost is different from paying an allowance. A receipt on every claim helps show that reimbursements are not taxable pay.",
        },
        {
          icon: History,
          label: "Audit trail",
          body: "Each claim keeps its receipt, approvals and payment reference together, so a question about a single expense can be answered from one record.",
        },
      ],
      image: {
        src: "/images/features/expense-management/ledger.jpg",
        alt: "A professional on a phone call with a coffee, beside a Brigadely card listing October's expense claims by cost centre and whether each has been reimbursed",
        ...WIDE_SIZE,
      },
    },
    glossary: ["expense-reimbursement", "audit-trail", "operating-ledger-vs-accounting-software"],
    faqs: [
      {
        question: "Who can submit and approve expenses?",
        // TODO: confirm live
        answer:
          "Any team member you invite can submit claims. You decide who approves them by person, team or amount, and finance can see every claim and where it is in the process.",
      },
      {
        question: "Can we set spending limits?",
        // TODO: confirm live
        answer:
          "Yes. Limits can be set by expense category and by team. Claims that go over a limit are flagged to the approver before anything is paid, and the approver's decision is recorded.",
      },
      {
        question: "Are expense reimbursements taxable?",
        // TODO: confirm live
        answer:
          "Reimbursing an employee for a genuine business cost they paid is generally not treated as taxable income, whereas a fixed allowance is part of pay and goes through PAYE. Keeping receipts with claims helps show the difference. Ask your tax adviser about specific cases.",
      },
      {
        question: "How are approved expenses paid back?",
        // TODO: confirm live
        answer:
          "Approved claims are paid to the bank account on the employee's record, and each payment is linked to its claim and receipt. Finance can see what is approved, pending and paid at any time.",
      },
    ],
    ogImage: {
      src: "/images/og/expense-management.jpg",
      alt: "Brigadely Expense Management: Control company spend and reimburse teams without leaving the ledger, beside a ₦86,500 expense claim card",
      ...OG_SIZE,
    },
  },

  // ─── /vendor-payments ────────────────────────────────────────────────────
  "vendor-payments": {
    slug: "vendor-payments",
    metaTitle: "Vendor & Supplier Payments with WHT Compliance | Brigadely",
    metaDescription:
      "Pay suppliers from your ledger, match invoices before payment, tag costs and apply Withholding Tax (WHT) correctly with Brigadely.",
    eyebrow: "Vendor payments",
    h1: { text: "Pay suppliers with invoice checks and WHT built in.", emphasis: "WHT" },
    heroLayout: "split",
    // TODO: confirm live
    valueProp:
      "Brigadely checks each supplier invoice against what was ordered and received before money moves, deducts withholding tax where it is due and tags every payment to a cost centre, so supplier spend is accurate and accounted for.",
    heroImage: {
      src: "/images/features/vendor-payments/hero.jpg",
      alt: "A smiling supplier in a stockroom holding a clipboard, beside Brigadely cards for a ₦3,240,000 invoice matched to its purchase order, the WHT withheld and the net payment",
      ...SPLIT_HERO_SIZE,
    },
    capabilities: {
      layout: "checklist",
      heading: { text: "Every supplier invoice, checked before it is paid.", emphasis: "checked" },
      cards: [
        // TODO: confirm live
        {
          icon: FileCheck2,
          title: "Invoice matching before payment",
          body: "Compare each invoice with its purchase order and delivery record before approval. Differences in quantity or price are shown to the approver, so overbilling and duplicate invoices are visible before payment rather than after.",
        },
        // TODO: confirm live
        {
          icon: Percent,
          title: "Withholding tax on supplier payments",
          body: "Classify each supplier and transaction type, and the applicable withholding tax is deducted when the invoice is paid. The supplier receives the net amount and the withheld tax is recorded for remittance.",
        },
        // TODO: confirm live
        {
          icon: Tags,
          title: "Cost-centre tagging",
          body: "Tag each invoice to a cost centre, project or department when it is approved. Spend by supplier, team or project then comes from the payments themselves instead of a month-end spreadsheet.",
        },
        // TODO: confirm live
        {
          icon: History,
          title: "Payment audit logs",
          body: "Every supplier payment records who created, approved and released it, with timestamps and the invoice attached. Changes to supplier bank details are logged as well, which helps guard against payment fraud.",
        },
      ],
    },
    // TODO: confirm live
    ledger: {
      intro:
        "Supplier payments sit on the same ledger as payroll and statutory remittances, so cash leaving the business is recorded in one place.",
      links: [
        {
          icon: Banknote,
          label: "Payroll",
          body: "Supplier and payroll costs are reported from one ledger, so operating spend by department includes both people and suppliers.",
        },
        {
          icon: ShieldCheck,
          label: "Statutory compliance",
          body: "Withholding tax held back from suppliers is due to the Nigeria Revenue Service (NRS) for companies or the State Internal Revenue Service for individuals, and stays on your list until it is remitted.",
        },
        {
          icon: History,
          label: "Audit trail",
          body: "From purchase order to payment reference, each step is linked, so a supplier dispute or an audit sample can be answered from a single record.",
        },
      ],
      image: {
        src: "/images/features/vendor-payments/ledger.jpg",
        alt: "A business owner checking paperwork in a stockroom, beside a Brigadely card for a supplier payment: invoice, WHT withheld, cost centre and the amount paid",
        ...WIDE_SIZE,
      },
    },
    glossary: ["withholding-tax", "three-way-matching", "audit-trail"],
    faqs: [
      {
        question: "What is three-way matching?",
        // TODO: confirm live
        answer:
          "Three-way matching compares the purchase order, the goods-received record and the supplier's invoice. If quantities and prices agree, the invoice can be approved for payment. If they do not, the difference is resolved with the supplier first.",
      },
      {
        question: "Which supplier payments attract withholding tax?",
        // TODO: confirm live
        answer:
          "Withholding tax applies to specified payments such as contracts, consultancy, rent and professional fees, at rates set by regulation, with exemptions for some small suppliers. The rate depends on the type of transaction and on whether the supplier is a company or an individual.",
      },
      {
        question: "Why tag supplier payments to a cost centre?",
        // TODO: confirm live
        answer:
          "A cost centre shows which team, project or location a cost belongs to. Tagging it at approval rather than at month end keeps budget reports current and means finance does not have to guess where spend belongs.",
      },
      {
        question: "What happens if a supplier changes their bank details?",
        // TODO: confirm live
        answer:
          "The change is recorded in the audit log with who made it and when. It is good practice to confirm any change with the supplier through a known phone number before the next payment, as altered bank details are a common route for invoice fraud.",
      },
    ],
    ogImage: {
      src: "/images/og/vendor-payments.jpg",
      alt: "Brigadely Vendor Payments: Pay suppliers with invoice checks and WHT built in, beside a ₦3,240,000 supplier invoice card",
      ...OG_SIZE,
    },
  },

  // ─── /asset-management ───────────────────────────────────────────────────
  "asset-management": {
    slug: "asset-management",
    metaTitle: "Fixed Asset Tracking & Depreciation for Businesses | Brigadely",
    metaDescription:
      "Keep a register of company assets, assign equipment to staff, track depreciation and record disposals, all tied to your ledger with Brigadely.",
    eyebrow: "Asset management",
    h1: { text: "Track every company asset from purchase to disposal.", emphasis: "disposal." },
    heroLayout: "split-reversed",
    // TODO: confirm live
    valueProp:
      "Keep one register of the laptops, vehicles, furniture and equipment your business owns, see who holds each item, record depreciation by period and close out assets when they are sold or written off, linked to the payments that bought them.",
    heroImage: {
      src: "/images/features/asset-management/hero.jpg",
      alt: "A smiling employee working on a company laptop, beside Brigadely cards for the laptop's asset tag and assignment, the asset register and its net book value",
      ...SPLIT_HERO_SIZE,
    },
    capabilities: {
      layout: "lifecycle",
      heading: { text: "One register for everything you own.", emphasis: "own." },
      cards: [
        // TODO: confirm live
        {
          icon: Boxes,
          title: "A single asset register",
          body: "Record each asset with its purchase date, cost, supplier, serial number and location. One register replaces scattered spreadsheets and shows what the business owns at any point in time.",
        },
        // TODO: confirm live
        {
          icon: Laptop,
          title: "Equipment assigned to staff",
          body: "Assign a laptop, phone or vehicle to an employee and it appears on their record. When someone leaves, you can see everything they hold and record each item's return.",
        },
        // TODO: confirm live
        {
          icon: TrendingDown,
          title: "Depreciation by period",
          body: "Set a useful life for each asset class and record depreciation every period, with cost, accumulated depreciation and net book value shown for each item.",
        },
        // TODO: confirm live
        {
          icon: Archive,
          title: "Disposal records",
          body: "When an asset is sold, scrapped or lost, record the date, reason and any proceeds. It leaves the active register, but its full history stays on file.",
        },
      ],
    },
    // TODO: confirm live
    ledger: {
      intro:
        "Most assets are bought with money that already moves through Brigadely, so a register entry can start from the payment instead of being typed in again.",
      links: [
        {
          icon: Truck,
          label: "Vendor payments",
          body: "An asset bought from a supplier links to the vendor payment and invoice, so its cost on the register matches what was actually paid.",
        },
        {
          icon: Users,
          label: "Payroll records",
          body: "Assignments sit on the same employee records payroll uses, so it is clear who holds what when someone joins, changes team or leaves.",
        },
        {
          icon: ScrollText,
          label: "Audit trail and tax",
          body: "Purchase, assignment, depreciation and disposal entries form one history per asset, which supports your financial statements and the capital allowance schedule your accountant prepares.",
        },
      ],
      image: {
        src: "/images/features/asset-management/ledger.jpg",
        alt: "An employee at a desk with office equipment, beside a Brigadely asset register card listing a laptop, a phone and a generator with their net book values",
        ...WIDE_SIZE,
      },
    },
    glossary: ["fixed-asset-depreciation", "audit-trail", "operating-ledger-vs-accounting-software"],
    faqs: [
      {
        question: "What counts as a fixed asset?",
        // TODO: confirm live
        answer:
          "A fixed asset is something the business owns and expects to use for more than a year, such as computers, vehicles, furniture or machinery. Low-value items are often expensed straight away; your accounting policy sets the threshold.",
      },
      {
        question: "How is depreciation calculated?",
        // TODO: confirm live
        answer:
          "Depreciation spreads an asset's cost over its useful life. Under the straight-line method, a ₦1,200,000 laptop with a three-year life depreciates by ₦400,000 a year. Brigadely records the charge for each period and the remaining net book value.",
      },
      {
        question: "Does depreciation reduce my tax bill?",
        // TODO: confirm live
        answer:
          "Not directly. Nigerian tax rules use capital allowances rather than accounting depreciation, so the two figures usually differ. A complete asset register makes both easier for your accountant to prepare.",
      },
      {
        question: "What if an employee leaves with company equipment?",
        // TODO: confirm live
        answer:
          "Their record lists every asset assigned to them, so returns can be arranged before their last day. If an item is not returned, you can mark it as lost and note the outcome on the asset's history.",
      },
    ],
    ogImage: {
      src: "/images/og/asset-management.jpg",
      alt: "Brigadely Asset Management: Track every company asset from purchase to disposal, beside a net book value card",
      ...OG_SIZE,
    },
  },
};
