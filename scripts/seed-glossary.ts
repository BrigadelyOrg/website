/**
 * Seeds the glossary with six foundational Nigerian payroll and compliance terms.
 *
 *   npm run seed:glossary               # creates them as drafts, to review and publish in /admin
 *   npm run seed:glossary -- publish    # creates them published
 *
 * It writes to the database in DATABASE_URI (from .env). Terms whose slug
 * already exists are left untouched, so it is safe to run more than once.
 *
 * Rates and rules reflect the law as of November 2026 (including the Nigeria
 * Tax Act 2025, in force from 1 January 2026). Have them checked before publishing.
 */
import { getPayload } from "payload";

import { GLOSSARY_CATEGORIES } from "../lib/glossary/categories";
import config from "../payload.config";
import type { GlossaryTerm } from "../payload-types";

// --- Lexical content builders --------------------------------------------------
// The same JSON the CMS editor saves. A string is plain text; { bold } is bold
// text, used for the lead-in of list items.

type Inline = string | { bold: string };

const BOLD = 1;
const BLOCK = { direction: "ltr", format: "", indent: 0, version: 1 } as const;

const text = (value: string, format = 0) => ({
  type: "text",
  text: value,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const inline = (parts: readonly Inline[]) =>
  parts.map((part) => (typeof part === "string" ? text(part) : text(part.bold, BOLD)));

const paragraph = (...parts: Inline[]) => ({
  type: "paragraph",
  children: inline(parts),
  ...BLOCK,
  textFormat: 0,
  textStyle: "",
});

const heading = (title: string) => ({ type: "heading", tag: "h2", children: [text(title)], ...BLOCK });

const list = (listType: "bullet" | "number", items: readonly Inline[][]) => ({
  type: "list",
  listType,
  tag: listType === "number" ? "ol" : "ul",
  start: 1,
  children: items.map((parts, index) => ({
    type: "listitem",
    value: index + 1,
    children: inline(parts),
    ...BLOCK,
  })),
  ...BLOCK,
});

const bullets = (...items: Inline[][]) => list("bullet", items);
const steps = (...items: Inline[][]) => list("number", items);

/** A highlighted note: a quote block, which term pages render as a callout panel. */
const callout = (...parts: Inline[]) => ({ type: "quote", children: inline(parts), ...BLOCK });

/** The first row is the header row. */
const table = (rows: readonly string[][]) => ({
  type: "table",
  children: rows.map((cells, rowIndex) => ({
    type: "tablerow",
    children: cells.map((cell) => ({
      type: "tablecell",
      headerState: rowIndex === 0 ? 1 : 0,
      colSpan: 1,
      rowSpan: 1,
      backgroundColor: null,
      children: [paragraph(cell)],
      ...BLOCK,
    })),
    ...BLOCK,
  })),
  ...BLOCK,
});

type Block =
  | ReturnType<typeof paragraph>
  | ReturnType<typeof heading>
  | ReturnType<typeof list>
  | ReturnType<typeof callout>
  | ReturnType<typeof table>;

const doc = (...children: Block[]): GlossaryTerm["content"] => ({
  root: { type: "root", children, ...BLOCK },
});

// --- The terms ------------------------------------------------------------------

type SeedTerm = Pick<GlossaryTerm, "term" | "slug" | "shortDefinition" | "category" | "content"> & {
  faqs: { question: string; answer: string }[];
  /** Slugs of the other seeded terms to list under "Related terms". */
  related: string[];
};

const TERMS: SeedTerm[] = [
  {
    term: "PAYE (Pay-As-You-Earn)",
    slug: "paye",
    category: "payroll-tax",
    shortDefinition:
      "PAYE (Pay-As-You-Earn) is the system Nigerian employers use to deduct personal income tax from employees' pay every month and remit it to the tax authority of the state where each employee lives.",
    content: doc(
      heading("How PAYE works"),
      paragraph(
        "Under PAYE, the employer acts as the tax collector. Each payroll run, it works out the income tax due on every employee's pay, deducts it before paying salaries and sends it to the relevant tax authority. Employees receive their pay net of tax, so most never file a separate return for their salary.",
      ),
      steps(
        [
          { bold: "Work out taxable income: " },
          "gross annual pay (salary, allowances and most benefits in kind), less allowable deductions such as pension and NHF contributions and rent relief.",
        ],
        [
          { bold: "Apply the tax bands: " },
          "the graduated rates below give the year's tax, which is spread across the year's payroll runs.",
        ],
        [
          { bold: "Deduct and remit: " },
          "the month's tax is deducted from pay and remitted to each employee's state tax authority, with a schedule of every employee's pay and tax.",
        ],
      ),
      heading("PAYE tax bands under the Nigeria Tax Act 2025"),
      paragraph(
        "From 1 January 2026, the Nigeria Tax Act 2025 replaced the Personal Income Tax Act's rates with these annual bands:",
      ),
      table([
        ["Annual taxable income", "Rate"],
        ["First ₦800,000", "0%"],
        ["Next ₦2,200,000", "15%"],
        ["Next ₦9,000,000", "18%"],
        ["Next ₦13,000,000", "21%"],
        ["Next ₦25,000,000", "23%"],
        ["Above ₦50,000,000", "25%"],
      ]),
      paragraph(
        "Because the first ₦800,000 of taxable income is taxed at 0%, the lowest earners pay no PAYE at all.",
      ),
      heading("Deductions that reduce taxable income"),
      bullets(
        [{ bold: "Pension: " }, "the employee's contribution under the Contributory Pension Scheme (at least 8% of monthly emoluments)."],
        [{ bold: "National Housing Fund: " }, "the employee's NHF contribution of 2.5% of basic salary."],
        [{ bold: "Health insurance: " }, "contributions to the national health insurance scheme."],
        [{ bold: "Life insurance and annuities: " }, "premiums on the employee's own life insurance or deferred annuity."],
        [{ bold: "Rent relief: " }, "20% of the annual rent the employee pays, up to ₦500,000."],
      ),
      callout(
        "Rent relief replaced the Consolidated Relief Allowance (CRA). Payroll still set up with CRA calculates PAYE on the wrong basis from January 2026.",
      ),
      heading("Where and when PAYE is remitted"),
      paragraph(
        "PAYE is paid to the tax authority of the state where the employee lives, which is not necessarily where the employer is based. A Lagos company whose staff live in Ogun State remits their PAYE to the Ogun State Internal Revenue Service. A few groups, such as members of the armed forces and the police, staff of the foreign service and non-residents, are taxed by the Nigeria Revenue Service (formerly FIRS).",
      ),
      paragraph(
        "Each month's deductions are due by the 10th day of the following month. Employers also file an annual return of every employee's pay and tax with each state tax authority by 31 January of the next year.",
      ),
      heading("PAYE vs withholding tax"),
      bullets(
        [{ bold: "PAYE " }, "is deducted from employees' salaries and benefits, under an employment relationship."],
        [{ bold: "Withholding tax " }, "is deducted from payments to vendors, contractors, landlords and investors, such as fees, rent and dividends."],
      ),
      paragraph(
        "Paying a contractor through payroll, or an employee as a vendor, applies the wrong tax at the wrong rate, so classify every payee before paying them.",
      ),
    ),
    faqs: [
      {
        question: "Which tax authority collects PAYE?",
        answer:
          "The State Internal Revenue Service of the state where the employee lives. Employers with staff in several states remit PAYE to each of those states separately. A few groups, such as the armed forces, the police, the foreign service and non-residents, pay to the Nigeria Revenue Service.",
      },
      {
        question: "When is PAYE due?",
        answer:
          "Each month's PAYE must be remitted by the 10th day of the following month. Employers also file an annual return of every employee's pay and tax by 31 January of the next year.",
      },
    ],
    related: ["withholding-tax", "contributory-pension", "nhf"],
  },
  {
    term: "Contributory Pension (PENCOM)",
    slug: "contributory-pension",
    category: "statutory-compliance",
    shortDefinition:
      "The Contributory Pension Scheme is Nigeria's mandatory retirement savings scheme, regulated by the National Pension Commission (PenCom): employers and employees pay at least 10% and 8% of monthly emoluments into the employee's Retirement Savings Account.",
    content: doc(
      heading("How the Contributory Pension Scheme works"),
      paragraph(
        "The scheme is governed by the Pension Reform Act 2014. Every employee opens a Retirement Savings Account (RSA) with a Pension Fund Administrator of their choice and receives a unique RSA PIN. Each month, the employer deducts the employee's contribution, adds its own and remits both to the Pension Fund Custodian that holds the administrator's assets.",
      ),
      bullets(
        [{ bold: "Pension Fund Administrator (PFA): " }, "invests the contributions and manages the employee's RSA."],
        [{ bold: "Pension Fund Custodian (PFC): " }, "receives remittances and holds the pension assets on the PFA's behalf."],
        [{ bold: "PenCom: " }, "licenses PFAs and PFCs and enforces employers' obligations."],
      ),
      heading("Who must contribute"),
      paragraph(
        "The scheme applies to public sector employees and to private sector organisations with three or more employees. Smaller employers and self-employed people can join voluntarily.",
      ),
      heading("Contribution rates"),
      bullets(
        [{ bold: "Employer: " }, "at least 10% of the employee's monthly emoluments."],
        [{ bold: "Employee: " }, "at least 8%, deducted from pay."],
        [{ bold: "Monthly emoluments: " }, "basic salary plus housing and transport allowances."],
      ),
      paragraph(
        "An employer can choose to bear the whole contribution, in which case it must pay at least 20% of monthly emoluments. Employees can also make additional voluntary contributions.",
      ),
      heading("Remittance deadline and penalties"),
      paragraph(
        "Contributions must reach the Pension Fund Custodian within seven working days of the day salaries are paid. Late or unpaid remittances attract a penalty of at least 2% of the outstanding contribution for each month the default continues, on top of the contribution itself.",
      ),
      callout(
        "Employers must also keep a group life insurance policy for every employee, worth at least three times the employee's annual total emoluments.",
      ),
    ),
    faqs: [
      {
        question: "What is the minimum pension contribution in Nigeria?",
        answer:
          "18% of monthly emoluments (basic salary plus housing and transport allowances): at least 10% from the employer and 8% from the employee. An employer that pays the whole contribution must pay at least 20%.",
      },
      {
        question: "What happens if an employer remits pension late?",
        answer:
          "PenCom can charge a penalty of not less than 2% of the unremitted contribution for each month the default continues, and the employer still owes the contributions. Remittances are due within seven working days of paying salaries.",
      },
    ],
    related: ["paye", "nhf", "nsitf"],
  },
  {
    term: "NHF (National Housing Fund)",
    slug: "nhf",
    category: "statutory-compliance",
    shortDefinition:
      "The National Housing Fund (NHF) is a federal scheme that collects 2.5% of eligible employees' monthly basic salary to fund low-interest mortgage loans for contributors, managed by the Federal Mortgage Bank of Nigeria (FMBN).",
    content: doc(
      heading("Who contributes to the NHF"),
      paragraph(
        "Under the National Housing Fund Act, Nigerian employees in the public and private sectors who earn above the Act's minimum income contribute to the Fund. Employers register with the Federal Mortgage Bank of Nigeria, deduct the contribution from each eligible employee's pay and remit it on their behalf. Self-employed people can contribute too.",
      ),
      heading("How much is deducted"),
      bullets(
        [{ bold: "Rate: " }, "2.5% of the employee's monthly basic salary."],
        [{ bold: "Who pays: " }, "the employee. The employer deducts and remits the contribution but adds nothing of its own."],
        [{ bold: "Remittance: " }, "to the Federal Mortgage Bank of Nigeria, within one month of the deduction."],
      ),
      paragraph("NHF contributions are deducted when working out the employee's taxable income for PAYE."),
      heading("What contributors get"),
      bullets(
        [{ bold: "Mortgage loans: " }, "contributors can apply, through Primary Mortgage Banks, for NHF mortgage loans at a single-digit interest rate."],
        [{ bold: "A refund: " }, "contributions are refundable, with interest, when the contributor retires."],
      ),
      callout(
        "Keep each employee's NHF number and contribution history with your payroll records: the FMBN uses them to confirm eligibility for loans and refunds.",
      ),
      heading("NHF in your payroll"),
      paragraph(
        "Because the NHF is calculated on basic salary rather than gross pay, the split between basic salary and allowances in each pay structure changes the amount deducted. Check it after every salary review.",
      ),
    ),
    faqs: [
      {
        question: "Is NHF calculated on gross or basic salary?",
        answer: "On basic salary: 2.5% of the employee's monthly basic pay. Allowances are not included.",
      },
      {
        question: "Can employees get their NHF contributions back?",
        answer:
          "Yes. Contributions are refundable with interest when the contributor retires, and contributors can apply for an NHF mortgage loan through a Primary Mortgage Bank in the meantime.",
      },
    ],
    related: ["contributory-pension", "paye"],
  },
  {
    term: "NSITF (Nigeria Social Insurance Trust Fund)",
    slug: "nsitf",
    category: "statutory-compliance",
    shortDefinition:
      "NSITF (Nigeria Social Insurance Trust Fund) runs Nigeria's Employees' Compensation Scheme, which employers fund with 1% of their total monthly payroll to compensate workers for work-related injuries, diseases and death.",
    content: doc(
      heading("What the Employees' Compensation Scheme covers"),
      paragraph(
        "The Employees' Compensation Act 2010 set up the scheme in place of the old Workmen's Compensation Act. It compensates employees, or their dependants, without the employee having to prove that the employer was at fault.",
      ),
      bullets(
        [{ bold: "Work-related injuries: " }, "injuries arising out of or in the course of employment."],
        [{ bold: "Occupational diseases: " }, "illnesses caused by the work or the workplace."],
        [{ bold: "Disability and death: " }, "compensation for permanent disability, and payments to dependants when an employee dies from a work-related cause."],
        [{ bold: "Medical care and rehabilitation: " }, "treatment costs and support to return to work."],
      ),
      heading("How much employers pay"),
      bullets(
        [{ bold: "Rate: " }, "1% of the total monthly payroll."],
        [{ bold: "Who pays: " }, "the employer alone. Nothing is deducted from employees' pay."],
        [{ bold: "Who must pay: " }, "employers in both the public and private sectors, whatever their size."],
      ),
      callout(
        "NSITF is an employer cost, not a deduction: budget for 1% of payroll on top of salaries when planning headcount.",
      ),
      heading("Reporting accidents and compliance certificates"),
      paragraph(
        "Employers must report workplace accidents, occupational diseases and deaths to the NSITF promptly so that claims can be assessed. Employers that are up to date with contributions can obtain an NSITF compliance certificate, which is commonly required when bidding for government contracts.",
      ),
    ),
    faqs: [
      {
        question: "Who pays NSITF, the employer or the employee?",
        answer:
          "The employer. NSITF contributions are 1% of the employer's total monthly payroll, and nothing is deducted from employees' salaries.",
      },
      {
        question: "What does NSITF cover?",
        answer:
          "Compensation for work-related injuries, occupational diseases, disability and death, including medical care, rehabilitation and payments to dependants, under the Employees' Compensation Act 2010.",
      },
    ],
    related: ["itf", "contributory-pension"],
  },
  {
    term: "ITF (Industrial Training Fund)",
    slug: "itf",
    category: "statutory-compliance",
    shortDefinition:
      "The Industrial Training Fund (ITF) levy is an annual contribution of 1% of total payroll that qualifying Nigerian employers pay to fund skills training, part of which they can claim back by training their own staff.",
    content: doc(
      heading("Who must contribute"),
      paragraph("Under the Industrial Training Fund Act, as amended in 2011, the levy is due from:"),
      bullets(
        [{ bold: "Employers with five or more employees" }],
        [{ bold: "Employers with fewer than five employees" }, " whose annual turnover is ₦50 million or more."],
      ),
      paragraph(
        "Government ministries and agencies, and religious or charitable organisations that don't run a business, are exempt.",
      ),
      heading("How the levy is calculated"),
      bullets(
        [{ bold: "Rate: " }, "1% of the total annual payroll (all emoluments paid to employees in the year)."],
        [{ bold: "Deadline: " }, "1 April each year, for the previous year's payroll."],
      ),
      paragraph("The levy is a cost to the employer, not a deduction from employees' pay."),
      heading("Getting up to 50% back"),
      paragraph(
        "Under its Training Reimbursement Scheme, the ITF refunds part of the levy to employers that train their staff. An employer that has paid its contribution in full and meets the ITF's training requirements can claim back up to 50% of the amount paid.",
      ),
      callout(
        "Keep records of the training you deliver during the year, such as programmes, attendance and costs: they support the reimbursement claim.",
      ),
      heading("ITF compliance certificate"),
      paragraph(
        "Employers that are up to date can obtain an ITF compliance certificate, which government agencies commonly ask for in contract bids. Late payment attracts penalties under the Act.",
      ),
    ),
    faqs: [
      {
        question: "Which employers must pay the ITF levy?",
        answer:
          "Employers with five or more employees, and employers with fewer than five employees whose annual turnover is ₦50 million or more. The levy is 1% of total annual payroll, due by 1 April.",
      },
      {
        question: "Can employers get the ITF levy back?",
        answer:
          "Partly. Employers that pay in full and train their staff can claim back up to 50% of their contribution under the ITF's Training Reimbursement Scheme.",
      },
    ],
    related: ["nsitf", "nhf"],
  },
  {
    term: "Withholding Tax (WHT)",
    slug: "withholding-tax",
    category: "payroll-tax",
    shortDefinition:
      "Withholding Tax (WHT) is an advance payment of income tax that a business deducts from certain payments, such as contract fees, rent, dividends and interest, and remits to the tax authority on the recipient's behalf.",
    content: doc(
      heading("How withholding tax works"),
      paragraph(
        "When a business pays for a service, rent or an investment return, it keeps back a percentage of the payment and remits it to the tax authority. The recipient receives the rest, plus a credit note for the tax withheld, which it uses to reduce its own income tax for the year.",
      ),
      steps(
        [{ bold: "Deduct: " }, "the payer withholds the applicable rate from the gross amount."],
        [{ bold: "Remit: " }, "the payer sends the tax to the right authority, with details of the recipient."],
        [{ bold: "Credit: " }, "the recipient claims the withheld tax against its final income tax liability."],
      ),
      heading("Payments that attract withholding tax"),
      bullets(
        [{ bold: "Contracts and services: " }, "consultancy, professional, technical and management fees, commissions and construction work."],
        [{ bold: "Rent: " }, "for land, buildings and equipment."],
        [{ bold: "Investment income: " }, "dividends, interest and royalties."],
        [{ bold: "Directors' fees: " }, "paid to non-executive directors."],
      ),
      paragraph(
        "Rates depend on the type of payment and on whether the recipient is a company or an individual. They are set by regulation, most recently the Deduction of Tax at Source (Withholding) Regulations 2024, so check the current schedule when you set up vendor payments.",
      ),
      heading("Who receives the tax"),
      bullets(
        [{ bold: "Payments to companies: " }, "withholding tax goes to the Nigeria Revenue Service (formerly FIRS)."],
        [{ bold: "Payments to individuals: " }, "it goes to the tax authority of the state where the individual lives."],
      ),
      paragraph(
        "Withheld tax is generally due by the 21st day of the month after the payment. Remitting on time, and passing credit notes on to recipients, lets both sides reconcile the tax at year end.",
      ),
      heading("Withholding tax vs PAYE"),
      bullets(
        [{ bold: "PAYE " }, "applies to employees' salaries and benefits, under an employment relationship."],
        [{ bold: "Withholding tax " }, "applies to payments to vendors, contractors, landlords and investors."],
      ),
      callout(
        "A consultant paid every month is still a vendor: their invoices attract withholding tax, not PAYE. Classifying them wrongly means deducting the wrong tax at the wrong rate.",
      ),
    ),
    faqs: [
      {
        question: "Is withholding tax the same as PAYE?",
        answer:
          "No. PAYE is deducted from employees' pay. Withholding tax is deducted from payments to vendors, contractors, landlords and investors, as an advance payment of the recipient's own income tax.",
      },
      {
        question: "How does the recipient use the tax withheld?",
        answer:
          "The tax authority issues a credit note in the recipient's name. The recipient sets it off against its income tax for the year, so the same income isn't taxed twice.",
      },
    ],
    related: ["paye"],
  },
];

// --- Run -------------------------------------------------------------------------

// `payload run` passes on positional arguments only (not --flags).
const publish = process.argv.slice(2).includes("publish");
const status = publish ? "published" : "draft";

const knownCategories = new Set<string>(GLOSSARY_CATEGORIES.map((category) => category.value));
for (const seed of TERMS) {
  if (!knownCategories.has(seed.category)) throw new Error(`Unknown category "${seed.category}" for ${seed.slug}`);
}

const payload = await getPayload({ config });

const idBySlug = new Map<string, number>();
const created: SeedTerm[] = [];

for (const seed of TERMS) {
  const { docs } = await payload.find({
    collection: "glossary",
    where: { slug: { equals: seed.slug } },
    limit: 1,
    depth: 0,
    select: { slug: true },
  });
  const existing = docs[0];
  if (existing) {
    idBySlug.set(seed.slug, existing.id);
    console.log(`  skipped  /glossary/${seed.slug} (already exists)`);
    continue;
  }

  const doc = await payload.create({
    collection: "glossary",
    data: {
      term: seed.term,
      slug: seed.slug,
      shortDefinition: seed.shortDefinition,
      category: seed.category,
      status,
      content: seed.content,
      faqs: seed.faqs,
    },
  });
  idBySlug.set(seed.slug, doc.id);
  created.push(seed);
  console.log(`  created  /glossary/${seed.slug} (${status})`);
}

// Related terms point at each other, so they are linked once every term exists.
for (const seed of created) {
  const id = idBySlug.get(seed.slug);
  const relatedTerms = seed.related.flatMap((slug) => {
    const relatedId = idBySlug.get(slug);
    return relatedId === undefined ? [] : [relatedId];
  });
  if (id === undefined || relatedTerms.length === 0) continue;
  await payload.update({ collection: "glossary", id, data: { relatedTerms } });
}

console.log(
  created.length === 0
    ? "\nNothing to do: every seed term already exists."
    : publish
      ? `\nCreated ${created.length} published terms. They appear on /glossary straight away, unless the site cached an empty glossary in the last hour (restart it, or save any term in /admin).`
      : `\nCreated ${created.length} draft terms. Review them in /admin → Glossary and publish each one (or run again with "publish" on an empty glossary).`,
);
