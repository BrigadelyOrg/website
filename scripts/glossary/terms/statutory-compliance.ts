/**
 * Statutory compliance terms: tax authorities, filings and employer obligations.
 * Rules reflect the law as of November 2026: the Nigeria Tax Act 2025 and the
 * Nigeria Tax Administration Act 2025 (both in force from 1 January 2026) and
 * the Pension Reform Act 2014.
 */
import { bullets, callout, doc, heading, paragraph, steps, table, type SeedTerm } from "../lexical";

export const STATUTORY_COMPLIANCE_TERMS: SeedTerm[] = [
  {
    term: "Tax Clearance Certificate (TCC)",
    slug: "tax-clearance-certificate",
    category: "statutory-compliance",
    shortDefinition:
      "A Tax Clearance Certificate (TCC) is an official document from a Nigerian tax authority confirming that a person or business has paid all tax due for the last three years. Government agencies and banks must demand one before contract awards, import and export licences, building approvals and other key transactions.",
    content: doc(
      heading("What a TCC shows"),
      paragraph(
        "A TCC is the tax authority's confirmation that the tax assessed on your income or profits has been paid in full, or that none was due. Under section 72 of the Nigeria Tax Administration Act 2025, it covers the three years of assessment before the current year and shows, for each year:",
      ),
      bullets(
        [{ bold: "Income: " }, "total profits or chargeable income."],
        [{ bold: "Tax payable and tax paid: " }, "what was assessed and what was settled."],
        [{ bold: "Tax outstanding: " }, "any balance still owed, or a statement that no tax is due."],
      ),
      paragraph(
        "Companies get their TCC from the Nigeria Revenue Service (formerly FIRS). Individuals, including employees and sole traders, get theirs from the internal revenue service of the state where they live, or the FCT-IRS in Abuja. The authority must issue it within two weeks of the request, or give reasons for refusing.",
      ),
      heading("When you need one"),
      paragraph(
        "Government ministries and agencies, and commercial banks, must ask for a three-year TCC before dealing with you on any of these transactions:",
      ),
      bullets(
        [{ bold: "Government contracts: " }, "applications for contracts awarded by government or its agencies."],
        [{ bold: "Licences: " }, "import and export, trade and firearms licences."],
        [{ bold: "Land and buildings: " }, "certificates of occupancy and approval of building plans."],
      ),
      paragraph(
        "Many lenders and large corporate customers also ask for a TCC during credit checks and supplier onboarding, so it pays to keep a current one on file.",
      ),
      heading("How monthly PAYE compliance unlocks it"),
      paragraph(
        "An employer's payroll record feeds directly into its staff's certificates. Employees' tax is deducted at source, and the Act says a person who can show that tax was deducted from their income can't be refused a TCC for that year, provided any balance has been paid. That evidence only exists if the employer remits PAYE by the 10th of the following month and files its annual return by 31 January.",
      ),
      callout(
        "Keep every PAYE remittance receipt and your annual return acknowledgement in one place. They are the evidence the tax authority checks when you or your employees apply for a TCC.",
      ),
    ),
    faqs: [
      {
        question: "How long does it take to get a Tax Clearance Certificate in Nigeria?",
        answer:
          "Under the Nigeria Tax Administration Act 2025, the tax authority must issue a TCC within two weeks of your request, or give reasons for refusing it. Applying with complete returns and payment receipts for the last three years avoids most delays.",
      },
      {
        question: "Can an employee get a TCC if their employer didn't remit their PAYE?",
        answer:
          "An employee who can show that tax was deducted from their pay can't be refused a TCC for that year, as long as any balance has been paid. In practice, missing remittances make that evidence hard to produce, which is why employers should remit PAYE every month.",
      },
    ],
    related: ["paye", "annual-paye-returns-form-h1", "lirs", "firs-vs-sirs"],
  },
  {
    term: "LIRS (Lagos State Internal Revenue Service)",
    slug: "lirs",
    category: "statutory-compliance",
    shortDefinition:
      "LIRS (Lagos State Internal Revenue Service) is the tax authority for individuals who live in Lagos State. It collects PAYE that employers deduct from Lagos-resident staff, income tax from the self-employed and withholding tax on payments to individuals, with returns and payments managed through its eTax portal.",
    content: doc(
      heading("What LIRS collects"),
      paragraph(
        "LIRS administers personal income tax for Lagos State. Whether someone's tax goes to Lagos depends on where they live, not where their employer is registered: PAYE is paid to the state where the employee had their principal place of residence on 1 January of the tax year, or on the day they started the job.",
      ),
      bullets(
        [{ bold: "PAYE: " }, "income tax that employers deduct from the pay of staff who live in Lagos."],
        [
          { bold: "Direct assessment: " },
          "income tax on self-employed people, sole traders and partners living in Lagos, who file their own returns.",
        ],
        [
          { bold: "Withholding tax on individuals: " },
          "tax withheld from payments such as fees and rent made to Lagos-resident individuals.",
        ],
      ),
      heading("Filing and paying on the LIRS eTax portal"),
      paragraph(
        "Employers register on the LIRS eTax portal with their Tax ID and use it to file returns, generate bills and track payments. The core employer deadlines are:",
      ),
      bullets(
        [
          { bold: "Monthly PAYE: " },
          "remit the tax deducted from each month's salaries, with a schedule of every employee's pay and tax, by the 10th day of the following month.",
        ],
        [
          { bold: "Withholding tax: " },
          "remit tax withheld from payments to individuals by the 21st day of the following month.",
        ],
        [
          { bold: "Annual employer return: " },
          "file Form H1, summarising every employee's pay and tax for the previous year, by 31 January.",
        ],
      ),
      paragraph(
        "Employees also file their own annual return of income from all sources. LIRS set 31 March 2026 as the deadline for 2025 returns.",
      ),
      heading("Common LIRS compliance mistakes"),
      bullets(
        [
          { bold: "Remitting to the wrong state: " },
          "paying all PAYE to Lagos because the office is there, even for staff who live in Ogun or Oyo State.",
        ],
        [{ bold: "Late remittance: " }, "penalties and interest build up on tax paid after the 10th."],
        [
          { bold: "Incomplete schedules: " },
          "payments without employee names, Tax IDs and pay details are hard to match, which can delay employees' tax clearance certificates.",
        ],
      ),
      callout(
        "Check every employee's home address at onboarding and again each January: it decides which state receives their PAYE for the year.",
      ),
    ),
    faqs: [
      {
        question: "Do I pay PAYE to LIRS if my company is in Lagos but my staff live in Ogun State?",
        answer:
          "No. PAYE goes to the state where each employee lives, so staff living in Ogun State are taxed by the Ogun State Internal Revenue Service, even if they work in your Lagos office. Only staff resident in Lagos are remitted to LIRS.",
      },
      {
        question: "When is PAYE due to LIRS?",
        answer:
          "By the 10th day of the month after the salaries were paid, together with a schedule of each employee's pay and tax. The annual employer return, Form H1, is due by 31 January for the previous year.",
      },
    ],
    related: ["paye", "annual-paye-returns-form-h1", "firs-vs-sirs", "fct-irs", "tax-clearance-certificate"],
  },
  {
    term: "FIRS vs. SIRS (Federal vs. State Tax Authorities)",
    slug: "firs-vs-sirs",
    category: "statutory-compliance",
    shortDefinition:
      "FIRS vs. SIRS describes how Nigeria splits tax collection between federal and state authorities. The Nigeria Revenue Service (formerly FIRS) administers company income tax, VAT and withholding tax on payments to companies, while each State Internal Revenue Service collects personal income tax, including PAYE, from the individuals who live in that state.",
    content: doc(
      heading("Who collects what"),
      paragraph(
        "Nigeria's tax laws give federal and state tax authorities separate jurisdictions. The federal authority is now the Nigeria Revenue Service (NRS), which replaced the Federal Inland Revenue Service (FIRS) under the Nigeria Revenue Service (Establishment) Act 2025, but businesses still talk about “FIRS vs. SIRS”.",
      ),
      table([
        ["Nigeria Revenue Service (NRS)", "State Internal Revenue Service (SIRS)"],
        ["Company income tax", "Personal income tax of individuals who live in the state"],
        [
          "PAYE for the armed forces, police, foreign service officers and non-residents",
          "PAYE for all other employees, by state of residence",
        ],
        ["Withholding tax on payments to companies", "Withholding tax on payments to individuals"],
        ["VAT, collected nationwide", "A share of the VAT collected"],
      ]),
      paragraph(
        "The FCT has no state government, so the FCT Internal Revenue Service (FCT-IRS) plays the state's role for people who live in Abuja and the rest of the territory.",
      ),
      heading("Why the split matters for employers"),
      paragraph(
        "A company deals with both. It files company income tax and VAT returns with the NRS, while its payroll obligations sit with the states where its employees live. A business headquartered in Lagos with staff living in Lagos, Ogun and Abuja remits PAYE separately to LIRS, the Ogun State Internal Revenue Service and the FCT-IRS, and files an annual employer return with each by 31 January.",
      ),
      bullets(
        [
          { bold: "Vendors: " },
          "withholding tax on an invoice from a company goes to the NRS; on an invoice from an individual consultant, it goes to the consultant's state.",
        ],
        [
          { bold: "Credit notes: " },
          "the authority that receives the tax issues the credit the recipient claims, so remitting to the wrong one leaves the recipient without a usable credit.",
        ],
        [
          { bold: "Clearance certificates: " },
          "companies get their tax clearance certificate from the NRS; employees and sole traders get theirs from their state.",
        ],
      ),
      callout(
        "Map every employee to a state of residence, and every vendor to the NRS or a state, before the first payment. Tax paid to the wrong authority isn't tax paid to the right one: it can still demand the tax, and recovering the misdirected payment takes time.",
      ),
    ),
    faqs: [
      {
        question: "Does FIRS still exist?",
        answer:
          "No. The Nigeria Revenue Service (Establishment) Act 2025 replaced the Federal Inland Revenue Service with the Nigeria Revenue Service (NRS), which took over its role as the federal tax authority. Taxes once paid to FIRS, such as company income tax and VAT, now go to the NRS.",
      },
      {
        question: "Does PAYE go to FIRS or the state?",
        answer:
          "To the state. PAYE is personal income tax, so it goes to the internal revenue service of the state where each employee lives, or the FCT-IRS for FCT residents. Only a few groups, such as the armed forces, the police, foreign service officers and non-residents, are taxed by the NRS.",
      },
    ],
    related: ["lirs", "fct-irs", "paye", "withholding-tax", "tax-clearance-certificate"],
  },
  {
    term: "FCT-IRS (Federal Capital Territory Internal Revenue Service)",
    slug: "fct-irs",
    category: "statutory-compliance",
    shortDefinition:
      "The FCT-IRS (Federal Capital Territory Internal Revenue Service) is the tax authority for individuals who live in Abuja and the rest of the FCT. Employers remit PAYE deducted from FCT-resident staff to it by the 10th of the following month and file an annual return of their pay with it by 31 January.",
    content: doc(
      heading("What the FCT-IRS does"),
      paragraph(
        "The FCT has no state government, so the FCT Internal Revenue Service does the job a State Internal Revenue Service does elsewhere. Under the Nigeria Tax Administration Act 2025, it administers income tax for individuals resident in the FCT: Abuja Municipal and the five other area councils, Bwari, Gwagwalada, Kuje, Kwali and Abaji.",
      ),
      bullets(
        [{ bold: "PAYE: " }, "tax that employers deduct from the pay of staff who live in the FCT."],
        [
          { bold: "Direct assessment: " },
          "income tax on self-employed people and business owners resident in the FCT.",
        ],
        [
          { bold: "Withholding tax on individuals: " },
          "tax withheld from payments such as fees and rent to FCT-resident individuals.",
        ],
      ),
      paragraph(
        "Before the 2025 reforms, federal law named the federal tax service as the authority for FCT residents. The new Act puts the FCT's own revenue service on the same footing as the states.",
      ),
      heading("PAYE rules for employers with Abuja staff"),
      paragraph(
        "PAYE follows the employee's residence, not the office address. Employees are taxed by the territory where they had their principal place of residence on 1 January, or on the day they started the job if they joined during the year.",
      ),
      bullets(
        [{ bold: "Abuja office, FCT residents: " }, "remit their PAYE to the FCT-IRS."],
        [
          { bold: "Abuja office, staff living in Nasarawa or Niger State: " },
          "remit to the Nasarawa or Niger State Internal Revenue Service, even though they commute into Abuja.",
        ],
        [
          { bold: "Staff who move to Abuja mid-year: " },
          "stay with their previous state for the rest of the year and move to the FCT-IRS from the next 1 January.",
        ],
      ),
      heading("Deadlines and filings"),
      bullets(
        [
          { bold: "Monthly: " },
          "remit PAYE by the 10th day of the following month, with a schedule of each employee's pay and tax.",
        ],
        [{ bold: "Annually: " }, "file the employer's return of all employees' pay and tax by 31 January."],
        [
          { bold: "Individuals: " },
          "residents, including salaried employees, also file their own annual returns; the FCT-IRS set 31 March 2026 for 2025 returns.",
        ],
      ),
      callout(
        "Record each employee's home address at onboarding and confirm it every January: one move can change which authority receives their PAYE for the whole year.",
      ),
    ),
    faqs: [
      {
        question: "Do companies pay tax to the FCT-IRS?",
        answer:
          "Mostly as employers. Company income tax and VAT go to the Nigeria Revenue Service. Companies deal with the FCT-IRS when they remit PAYE for staff who live in the FCT, remit withholding tax on payments to FCT-resident individuals and file annual employer returns.",
      },
      {
        question: "My employee works in Abuja but lives in Mararaba. Where does their PAYE go?",
        answer:
          "Mararaba is in Nasarawa State, so their PAYE goes to the Nasarawa State Internal Revenue Service, not the FCT-IRS. PAYE always follows where the employee lives, judged on 1 January of the tax year.",
      },
    ],
    related: ["firs-vs-sirs", "lirs", "paye", "annual-paye-returns-form-h1"],
  },
  {
    term: "Pension Fund Administrator (PFA) & RSA PIN",
    slug: "pfa-rsa-pin",
    category: "statutory-compliance",
    shortDefinition:
      "A Pension Fund Administrator (PFA) is a PenCom-licensed company that manages and invests an employee's Retirement Savings Account (RSA). The RSA PIN is the unique number that identifies that account; employers need it, with the PFA's name, before they can remit an employee's monthly pension contributions.",
    content: doc(
      heading("How PFAs and RSAs fit together"),
      paragraph(
        "Under the Pension Reform Act 2014, each employee's pension savings sit in their own Retirement Savings Account. The employee chooses a Pension Fund Administrator to manage it, a separate Pension Fund Custodian holds the assets, and the National Pension Commission (PenCom) licenses and supervises both.",
      ),
      bullets(
        [{ bold: "PFA: " }, "invests the contributions, keeps the employee's records and pays benefits at retirement."],
        [{ bold: "RSA: " }, "the employee's personal account, which stays with them for life, across every job."],
        [{ bold: "RSA PIN: " }, "the account's unique identifier, which begins with “PEN”. It's the same at every employer."],
      ),
      paragraph(
        "Employees can move their RSA to a different PFA once a year, and the PIN doesn't change when they do.",
      ),
      heading("What employers collect at onboarding"),
      steps(
        [
          { bold: "The existing RSA PIN and PFA: " },
          "most employees who have worked before already have an RSA. Ask for the PIN and the PFA's name, with a recent statement or welcome letter as proof.",
        ],
        [
          { bold: "A new account for first-time employees: " },
          "the employee opens an RSA with a PFA of their choice, using their Bank Verification Number (BVN), and gives the employer the PFA's welcome letter.",
        ],
        [
          { bold: "A temporary account as a fallback: " },
          "if an employee still has no RSA six months after starting work, PenCom's rules have the employer ask a PFA to open a temporary RSA, so contributions can be remitted.",
        ],
      ),
      callout(
        "Never open a second RSA for an employee who already has one. Duplicate accounts split their savings and are slow to merge.",
      ),
      heading("Remitting contributions"),
      paragraph(
        "Each month, the employer deducts at least 8% of the employee's monthly emoluments (basic salary plus housing and transport allowances), adds its own contribution of at least 10% and remits both within seven working days of paying salaries, with a schedule listing each employee's RSA PIN and PFA. Contributions that can't be matched to a valid PIN sit unallocated until the records are corrected.",
      ),
    ),
    faqs: [
      {
        question: "How do I find my RSA PIN?",
        answer:
          "It's on your PFA welcome letter and your RSA statements, and your PFA can confirm it through its customer service channels. The PIN begins with “PEN” and stays the same when you change employers or PFAs.",
      },
      {
        question: "Can an employee change their PFA?",
        answer:
          "Yes. PenCom lets RSA holders transfer their account to another PFA once a year. The RSA PIN stays the same, so the employer only needs to update the PFA details for future remittances.",
      },
    ],
    related: ["contributory-pension", "group-life-insurance", "basic-housing-transport-allowances"],
  },
  {
    term: "Group Life Insurance (Statutory Employee Cover)",
    slug: "group-life-insurance",
    category: "statutory-compliance",
    shortDefinition:
      "Group life insurance is the life cover that employers must keep for every employee under section 4(5) of Nigeria's Pension Reform Act 2014. The policy must pay at least three times the employee's annual total emolument to their beneficiaries if they die while employed, and the employer bears the full premium.",
    content: doc(
      heading("What the law requires"),
      paragraph(
        "The Pension Reform Act 2014 makes group life cover part of employing staff, alongside pension contributions. Under section 4(5), every employer must maintain a life insurance policy in favour of each employee, worth at least three times that employee's annual total emolument.",
      ),
      bullets(
        [
          { bold: "Cover amount: " },
          "at least three times annual total emolument. PenCom's guidance treats this as the employee's annual gross emolument, not just basic salary.",
        ],
        [{ bold: "Who pays: " }, "the employer. The premium is a business cost, not a deduction from salaries."],
        [
          { bold: "Timing: " },
          "the premium must be paid no later than the date the cover starts, and the policy renewed every year.",
        ],
        [{ bold: "Insurer: " }, "a life insurer licensed by the National Insurance Commission (NAICOM)."],
      ),
      paragraph(
        "Group life cover is separate from the Employees' Compensation Scheme run by NSITF. NSITF compensates work-related injuries, diseases and deaths; group life pays out when an employee dies from any cause while employed.",
      ),
      heading("A worked example"),
      paragraph("An employee's gross emoluments are ₦7,200,000 a year (₦600,000 a month)."),
      bullets(
        [{ bold: "Minimum cover: " }, "₦7,200,000 × 3 = ₦21,600,000."],
        [
          { bold: "If they die in service: " },
          "the insurer pays at least ₦21,600,000 to the beneficiaries the employee named.",
        ],
        [
          { bold: "Premium: " },
          "priced by the insurer for the whole group, based on headcount, ages and total cover, and paid by the employer.",
        ],
      ),
      callout(
        "If the policy lapses and an employee dies, the employer can be made to pay the beneficiaries what the policy would have paid: at least three years' emoluments, from the company's own funds.",
      ),
      heading("Keeping it compliant"),
      bullets(
        [
          { bold: "Update the schedule: " },
          "add new hires from their start date and update salaries after reviews, so everyone is covered at the right amount.",
        ],
        [
          { bold: "Keep the evidence: " },
          "PenCom checks group life cover during inspections and for its compliance certificate, so keep the policy and premium receipts on file.",
        ],
        [{ bold: "Collect beneficiary details: " }, "ask employees to name their beneficiaries at onboarding."],
        [
          { bold: "Remove leavers at renewal: " },
          "cover generally ends with employment, so keep the schedule in step with your payroll.",
        ],
      ),
    ),
    faqs: [
      {
        question: "Is group life insurance compulsory in Nigeria?",
        answer:
          "Yes. Section 4(5) of the Pension Reform Act 2014 requires employers to keep a life insurance policy for every employee, worth at least three times the employee's annual total emolument. The employer pays the premium, and the cover must be in place before it is needed.",
      },
      {
        question: "Can the group life premium be deducted from employees' salaries?",
        answer:
          "No. The Act puts the obligation on the employer, so the premium is a business cost, not a payroll deduction.",
      },
    ],
    related: ["contributory-pension", "pfa-rsa-pin", "nsitf"],
  },
  {
    term: "Annual PAYE Tax Returns (Form H1)",
    slug: "annual-paye-returns-form-h1",
    category: "statutory-compliance",
    shortDefinition:
      "Annual PAYE tax returns, filed on Form H1 in Lagos and on equivalent forms in other states, are the employer's yearly report of every employee's pay and the PAYE deducted from it. Under the Nigeria Tax Administration Act 2025, they are due by 31 January for the previous year.",
    content: doc(
      heading("What the annual return covers"),
      paragraph(
        "Section 14 of the Nigeria Tax Administration Act 2025 requires every employer to file a return of all emoluments paid to its employees with the relevant tax authority by 31 January, covering everyone it employed in the previous year. For each employee, the return shows:",
      ),
      bullets(
        [{ bold: "Gross emoluments: " }, "salary plus all allowances and benefits in kind."],
        [{ bold: "Total deductions: " }, "pension, NHF and other deductions."],
        [{ bold: "Net emoluments: " }, "pay after deductions."],
        [{ bold: "Tax deducted: " }, "the PAYE withheld across the year."],
      ),
      paragraph(
        "Employers with staff in several states file a separate return with each state's tax authority, covering the staff resident there. The authority uses the return to check that the PAYE remitted during the year matches what each employee owed, and draws on it when employees file their own returns or apply for tax clearance certificates.",
      ),
      heading("How to prepare Form H1"),
      steps(
        [
          { bold: "Reconcile the year's payroll: " },
          "check that the twelve monthly PAYE schedules add up to each employee's annual pay and tax, including bonuses, joiners and leavers.",
        ],
        [
          { bold: "Match remittances: " },
          "tie every month's PAYE payment to its receipt, and settle any shortfall before filing.",
        ],
        [
          { bold: "Complete the return: " },
          "list each employee with their Tax ID, gross emoluments, deductions and tax, and file it online (for Lagos staff, on the LIRS eTax portal).",
        ],
        [
          { bold: "Keep the evidence: " },
          "keep the acknowledgement, schedules and receipts for at least six years, as the Act requires for tax records.",
        ],
      ),
      heading("A worked example"),
      paragraph(
        "A Lagos company employed 12 people in 2026: 10 for the whole year and 2 who joined in July. Its return, due by 31 January 2027, lists all 12. The two new hires show only their July to December pay and tax, and the totals must match the PAYE remitted across the year's twelve monthly payments. If the payments come to less than the return shows, settle the shortfall before filing, rather than waiting for the tax authority to find it.",
      ),
      callout(
        "Leavers count too: anyone employed at any point in the year belongs on the return, with their pay and tax up to their last day.",
      ),
    ),
    faqs: [
      {
        question: "What is the deadline for filing Form H1?",
        answer:
          "31 January each year, for the previous year: the return for 2026 is due by 31 January 2027. Late filing attracts penalties under the Nigeria Tax Administration Act 2025.",
      },
      {
        question: "Do employees still need to file their own tax returns?",
        answer:
          "Yes. Section 14(3) of the Nigeria Tax Administration Act 2025 requires employees to file their own annual return of income from all sources, including their salary, separately from the employer's return. Lagos and the FCT set 31 March 2026 as the deadline for 2025 returns.",
      },
    ],
    related: ["paye", "lirs", "fct-irs", "tax-clearance-certificate"],
  },
];
