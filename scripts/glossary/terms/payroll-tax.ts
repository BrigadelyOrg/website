/**
 * Payroll and tax terms. Worked examples use the PAYE bands of the Nigeria Tax
 * Act 2025 (in force from 1 January 2026): 0% on the first ₦800,000, 15% on
 * the next ₦2,200,000, 18% on the next ₦9,000,000, then 21%, 23% and 25%.
 */
import { bullets, callout, doc, heading, paragraph, steps, table, type SeedTerm } from "../lexical";

export const PAYROLL_TAX_TERMS: SeedTerm[] = [
  {
    term: "Consolidated Relief Allowance (CRA)",
    slug: "consolidated-relief-allowance",
    category: "payroll-tax",
    shortDefinition:
      "The Consolidated Relief Allowance (CRA) was the main personal income tax relief for Nigerian employees until the end of 2025: the higher of ₦200,000 or 1% of gross income, plus 20% of gross income, deducted before the tax bands were applied. The Nigeria Tax Act 2025 abolished it from 1 January 2026 and introduced rent relief instead.",
    content: doc(
      heading("How CRA was calculated"),
      paragraph(
        "Under the Personal Income Tax Act, CRA was deducted from an employee's income, along with tax-exempt items such as pension and NHF contributions, to arrive at taxable income:",
      ),
      callout({ bold: "CRA = the higher of ₦200,000 or 1% of gross income, plus 20% of gross income" }),
      paragraph(
        "Since the Finance Act 2020, “gross income” for this purpose excluded tax-exempt deductions such as pension contributions. For anyone with ₦20 million or more of gross income, CRA came to 21% of it; for lower earners, the ₦200,000 floor made it a larger share.",
      ),
      heading("A worked example: 2025 vs 2026"),
      paragraph(
        "An employee earns ₦6,000,000 a year and contributes ₦360,000 to their pension. In 2025, CRA is the higher of ₦200,000 or 1% of ₦5,640,000 (₦56,400), so ₦200,000, plus 20% of ₦5,640,000 (₦1,128,000): ₦1,328,000. In 2026, the same employee pays ₦1,500,000 a year in rent, so rent relief is ₦300,000.",
      ),
      table([
        ["", "2025 (with CRA)", "2026 (rent relief)"],
        ["Gross income", "₦6,000,000", "₦6,000,000"],
        ["Pension", "−₦360,000", "−₦360,000"],
        ["CRA or rent relief", "−₦1,328,000", "−₦300,000"],
        ["Taxable income", "₦4,312,000", "₦5,340,000"],
        ["Annual tax", "₦826,880", "₦751,200"],
      ]),
      paragraph(
        "Taxable income rises without CRA, but the new bands, starting with 0% on the first ₦800,000, mean this employee still pays less tax in 2026.",
      ),
      heading("What replaced CRA in 2026"),
      bullets(
        [{ bold: "A 0% band: " }, "the first ₦800,000 of taxable income is tax-free."],
        [
          { bold: "Rent relief: " },
          "20% of the annual rent an employee pays, up to ₦500,000, if they declare the rent to the tax authority.",
        ],
        [
          { bold: "Other deductions: " },
          "pension, NHF and national health insurance contributions, life insurance premiums and interest on a mortgage for an owner-occupied home still reduce taxable income.",
        ],
        [
          { bold: "Rent declarations: " },
          "to apply rent relief through PAYE, employers need each employee's declared rent, so collect it when setting up payroll for the year.",
        ],
      ),
      callout(
        "Payroll still deducting CRA in 2026 calculates PAYE on the wrong basis. Recalculate from January 2026 and correct any under- or over-deductions.",
      ),
    ),
    faqs: [
      {
        question: "Does CRA still apply in 2026?",
        answer:
          "No. The Nigeria Tax Act 2025 abolished the Consolidated Relief Allowance from 1 January 2026. Employees now pay 0% on the first ₦800,000 of taxable income and can claim rent relief of 20% of their annual rent, up to ₦500,000.",
      },
      {
        question: "Why do I still see CRA in tax calculations?",
        answer:
          "Calculations for 2025 and earlier years, such as back pay, tax audits and the employer returns for 2025 filed in January 2026, still use CRA because the old law applied to that income. Payroll from January 2026 onwards should not.",
      },
    ],
    related: ["paye", "gross-pay-vs-net-pay", "basic-housing-transport-allowances"],
  },
  {
    term: "Gross Pay vs. Net Pay",
    slug: "gross-pay-vs-net-pay",
    category: "payroll-tax",
    shortDefinition:
      "Gross pay is an employee's total agreed earnings before any deductions: basic salary plus allowances. Net pay, or take-home pay, is what lands in their bank account after the employer deducts PAYE income tax, the employee's 8% pension contribution, the 2.5% National Housing Fund contribution and any other authorised deductions.",
    content: doc(
      heading("What comes out of gross pay"),
      bullets(
        [
          { bold: "Pension: " },
          "at least 8% of monthly emoluments (basic salary plus housing and transport allowances), paid into the employee's Retirement Savings Account.",
        ],
        [{ bold: "NHF: " }, "2.5% of basic salary, for the National Housing Fund."],
        [
          { bold: "PAYE: " },
          "income tax on what's left after these deductions and reliefs, at the Nigeria Tax Act 2025 rates.",
        ],
        [
          { bold: "Other deductions: " },
          "health insurance, loan repayments, union dues or salary advances the employee has agreed to.",
        ],
      ),
      paragraph(
        "The employer's own costs, such as its 10% pension contribution, NSITF and ITF, are paid on top of gross pay. They raise the cost of employment, not the employee's deductions.",
      ),
      heading("A worked example"),
      paragraph(
        "An employee earns ₦600,000 a month (₦7,200,000 a year): basic salary ₦300,000, housing ₦150,000, transport ₦90,000 and other allowances ₦60,000. They pay ₦1,200,000 a year in rent.",
      ),
      steps(
        [{ bold: "Pension: " }, "8% of ₦540,000 (basic, housing and transport) = ₦43,200 a month, ₦518,400 a year."],
        [{ bold: "NHF: " }, "2.5% of ₦300,000 = ₦7,500 a month, ₦90,000 a year."],
        [
          { bold: "Taxable income: " },
          "₦7,200,000 − ₦518,400 − ₦90,000 − ₦240,000 rent relief (20% of rent) = ₦6,351,600.",
        ],
        [
          { bold: "PAYE: " },
          "0% on ₦800,000, 15% on ₦2,200,000 (₦330,000) and 18% on ₦3,351,600 (₦603,288) = ₦933,288 a year, or ₦77,774 a month.",
        ],
      ),
      table([
        ["Monthly", "Amount"],
        ["Gross pay", "₦600,000"],
        ["Pension (8%)", "−₦43,200"],
        ["NHF (2.5%)", "−₦7,500"],
        ["PAYE", "−₦77,774"],
        ["Net pay", "₦471,526"],
      ]),
      paragraph("So ₦128,474 of the ₦600,000, about 21%, goes to pension, NHF and tax."),
      heading("Why the difference matters"),
      bullets(
        [
          { bold: "Offers: " },
          "quote gross pay in offer letters and show the estimated net, so new hires aren't surprised by their first payslip.",
        ],
        [
          { bold: "Budgets: " },
          "plan headcount on the full cost of employment: gross pay plus the employer's pension (₦54,000 a month here), NSITF and ITF.",
        ],
        [
          { bold: "Payslips: " },
          "show every deduction line by line; employees use them as proof of income and tax paid.",
        ],
        [
          { bold: "Loans: " },
          "lenders assess affordability on net pay, so employees need accurate payslips to borrow.",
        ],
      ),
      callout(
        "Agree and record salaries as gross amounts. Promising a fixed net salary leaves the employer paying for any future rise in tax or deductions.",
      ),
    ),
    faqs: [
      {
        question: "How do I calculate net pay from gross pay in Nigeria?",
        answer:
          "Deduct the employee's pension (8% of basic, housing and transport), NHF (2.5% of basic) and PAYE. PAYE is worked out on annual pay minus pension, NHF and reliefs such as rent relief, using the Nigeria Tax Act 2025 bands, then divided across the year's payroll runs.",
      },
      {
        question: "Is the employer's 10% pension contribution part of gross pay?",
        answer:
          "No. The employer's contribution is paid on top of gross pay, straight into the employee's Retirement Savings Account. It's a cost of employment for the business, not a deduction from the employee's salary.",
      },
    ],
    related: ["paye", "basic-housing-transport-allowances", "consolidated-relief-allowance", "contributory-pension", "nhf"],
  },
  {
    term: "Basic, Housing & Transport Allowances (BHT)",
    slug: "basic-housing-transport-allowances",
    category: "payroll-tax",
    shortDefinition:
      "Basic, Housing and Transport (BHT) are the three core components most Nigerian salaries are split into. They matter because pension contributions (8% from the employee, 10% from the employer) are calculated on their total, and the 2.5% National Housing Fund contribution is calculated on basic salary alone.",
    content: doc(
      heading("Why salaries are split into BHT"),
      paragraph(
        "Nigerian pay structures usually divide gross pay into basic salary, a housing allowance, a transport allowance and sometimes other allowances, such as utilities, meals or leave. The split doesn't change the total, but each statutory deduction uses a different part of it:",
      ),
      bullets(
        [
          { bold: "Pension: " },
          "calculated on monthly emoluments, which the Pension Reform Act 2014 says can't be less than basic salary plus housing and transport allowances.",
        ],
        [{ bold: "NHF: " }, "2.5% of basic salary only."],
        [{ bold: "PAYE: " }, "calculated on gross pay, including every allowance, after deductions and reliefs."],
      ),
      paragraph(
        "The split shapes other costs too: the employer's 10% pension contribution uses the same base, and benefits such as leave allowance are often set as a percentage of basic salary.",
      ),
      heading("A worked example"),
      paragraph("A ₦600,000 monthly salary split 50% basic, 25% housing, 15% transport and 10% other allowances:"),
      table([
        ["Component", "Monthly", "Counts towards"],
        ["Basic salary", "₦300,000", "Pension and NHF"],
        ["Housing allowance", "₦150,000", "Pension"],
        ["Transport allowance", "₦90,000", "Pension"],
        ["Other allowances", "₦60,000", "Neither"],
        ["Total", "₦600,000", "Pension base ₦540,000; NHF base ₦300,000"],
      ]),
      bullets(
        [{ bold: "Employee pension: " }, "8% × ₦540,000 = ₦43,200, deducted from pay."],
        [{ bold: "Employer pension: " }, "10% × ₦540,000 = ₦54,000, paid on top."],
        [{ bold: "NHF: " }, "2.5% × ₦300,000 = ₦7,500, deducted from pay."],
      ),
      paragraph(
        "Moving ₦50,000 a month from housing to other allowances would cut the two pension contributions by ₦9,000 a month between them, and the employee's retirement savings with them.",
      ),
      heading("Getting the structure right"),
      bullets(
        [
          { bold: "Keep basic salary realistic: " },
          "an unusually low basic shrinks pension and NHF contributions, and with them the employee's retirement and housing savings.",
        ],
        [
          { bold: "Apply it consistently: " },
          "use the same split for everyone in a grade, and recheck it after every salary review.",
        ],
        [
          { bold: "Check the contract: " },
          "bonuses, leave allowance and 13th month pay sit outside the pension base unless the employment contract counts them as emoluments.",
        ],
      ),
      callout(
        "A common split is 40–50% basic, 20–30% housing and 10–20% transport, but no law fixes the percentages. What matters is that the structure is documented and applied consistently.",
      ),
    ),
    faqs: [
      {
        question: "Is pension calculated on gross salary or basic salary in Nigeria?",
        answer:
          "On monthly emoluments, which the Pension Reform Act 2014 says can't be less than basic salary plus housing and transport allowances. Other allowances count only if the employment contract includes them in emoluments.",
      },
      {
        question: "Can an employer reduce pension costs by lowering basic salary?",
        answer:
          "Moving pay out of basic, housing and transport into other allowances lowers contributions, but it also cuts employees' retirement and NHF savings, and the contract's definition of emoluments still applies. Structures designed only to avoid contributions are a compliance risk.",
      },
    ],
    related: ["contributory-pension", "nhf", "gross-pay-vs-net-pay", "pfa-rsa-pin"],
  },
  {
    term: "13th Month Salary",
    slug: "13th-month-salary",
    category: "payroll-tax",
    shortDefinition:
      "A 13th month salary is an extra month's pay that many Nigerian employers pay at year end, usually in December. It isn't required by the Labour Act, so entitlement depends on the employment contract or company policy, and it's taxed as employment income through PAYE in the month it's paid.",
    content: doc(
      heading("How 13th month pay works"),
      paragraph(
        "A 13th month salary is a contractual or discretionary bonus, not a statutory one. Employers that offer it usually pay it in November or December, and the terms should be written down:",
      ),
      bullets(
        [{ bold: "Amount: " }, "one month's basic salary or one month's gross pay."],
        [{ bold: "Eligibility: " }, "for example, staff confirmed in their roles, or employed on a set date."],
        [
          { bold: "Pro-rating: " },
          "whether people who joined during the year get a share, such as 6/12 of a month's pay after six months.",
        ],
        [{ bold: "Leavers: " }, "whether staff who leave before the payment date receive anything."],
      ),
      paragraph(
        "Once it's written into contracts, or paid every year as standard, withdrawing it can amount to changing employees' terms.",
      ),
      heading("How PAYE applies"),
      paragraph(
        "The bonus is taxable employment income in the year it's paid. The Nigeria Tax Administration Act 2025 requires the PAYE deducted across a year to equal the tax due on the year's total pay, so the extra month raises that month's deduction.",
      ),
      paragraph(
        "Take an employee on ₦500,000 a month whose taxable income for 2026 is ₦5,000,000 before the bonus. A 13th month salary of ₦500,000 lifts it to ₦5,500,000. Their income is in the 18% band, so the bonus adds ₦90,000 of tax, all deducted in December:",
      ),
      table([
        ["", "Without bonus", "With bonus"],
        ["Annual taxable income", "₦5,000,000", "₦5,500,000"],
        ["Annual PAYE", "₦690,000", "₦780,000"],
        ["December PAYE", "₦57,500", "₦147,500"],
      ]),
      paragraph(
        "The employee takes home ₦410,000 of the ₦500,000 bonus. Had the bonus pushed their income across a band threshold, the part above it would be taxed at the next rate up.",
      ),
      heading("Planning the payout"),
      bullets(
        [
          { bold: "Budget for it monthly: " },
          "set aside a twelfth of the expected cost each month, so December's cash outflow isn't a surprise.",
        ],
        [
          { bold: "Pension and NHF: " },
          "they usually don't apply, unless the contract counts the bonus as part of emoluments.",
        ],
        [
          { bold: "Separate run, same tax year: " },
          "paying it in an off-cycle run keeps it visible, but PAYE is still calculated on the year's total pay.",
        ],
      ),
    ),
    faqs: [
      {
        question: "Is 13th month salary compulsory in Nigeria?",
        answer:
          "No. The Labour Act doesn't require it. An employee is entitled to it only if their contract, a collective agreement or an established company policy provides for it.",
      },
      {
        question: "Why is the tax on my 13th month salary so high?",
        answer:
          "Because it's added to your income for the year and taxed at your highest rate, and all of that extra tax is deducted in the month it's paid. The rest of your year's PAYE is unchanged.",
      },
    ],
    related: ["paye", "off-cycle-payroll", "gross-pay-vs-net-pay", "prorated-salary"],
  },
  {
    term: "Prorated Salary",
    slug: "prorated-salary",
    category: "payroll-tax",
    shortDefinition:
      "A prorated salary is the part of a monthly salary an employee earns for working only part of a pay period, such as when they join mid-month, leave before month end or take unpaid leave. It's usually calculated as the monthly salary divided by the days in the period, multiplied by the days worked.",
    content: doc(
      heading("Calendar days or working days"),
      paragraph("There are three common methods. Pick one, write it into your payroll policy and apply it to everyone."),
      bullets(
        [
          { bold: "Calendar days: " },
          "monthly salary ÷ days in the month × calendar days employed. Simple and widely used, but the daily rate changes with the length of the month.",
        ],
        [
          { bold: "Working days: " },
          "monthly salary ÷ working days in the month × working days employed. Fairer when start dates fall near weekends, but you need each month's working-day count, net of public holidays.",
        ],
        [
          { bold: "Fixed 30-day month: " },
          "monthly salary ÷ 30 × days employed, whatever the month's length. The daily rate never changes, which makes it easy to explain.",
        ],
      ),
      heading("A worked example"),
      paragraph(
        "An employee on ₦450,000 a month joins on Monday 16 November 2026. November has 30 days, so they're employed for 15 of them, and 21 working days, of which they work 11.",
      ),
      table([
        ["Method", "Calculation", "November pay"],
        ["Calendar days", "₦450,000 ÷ 30 × 15", "₦225,000"],
        ["Working days", "₦450,000 ÷ 21 × 11", "₦235,714.29"],
        ["Fixed 30-day month", "₦450,000 ÷ 30 × 15", "₦225,000 (November has 30 days)"],
      ]),
      paragraph(
        "The ₦10,714.29 difference shows why the method has to be fixed in advance: each is defensible, but switching between them isn't.",
      ),
      heading("Deductions on a prorated month"),
      bullets(
        [
          { bold: "Pension and NHF: " },
          "calculated on the prorated basic, housing and transport amounts actually paid.",
        ],
        [
          { bold: "PAYE: " },
          "calculated on the employee's actual pay for the tax year. On the calendar-day method, this employee earns ₦675,000 in 2026; if that's their only income, it falls within the ₦800,000 band taxed at 0%, so no PAYE is due.",
        ],
        [
          { bold: "Leavers: " },
          "prorate the final month the same way, and add any unused leave the contract says must be paid.",
        ],
        [
          { bold: "Unpaid leave: " },
          "deduct the same daily rate for each unpaid day, so joiners, leavers and absences are all treated consistently.",
        ],
      ),
      callout(
        "State your prorating method in offer letters and the employee handbook. Disputes over a first or last payslip usually come down to which days were counted.",
      ),
    ),
    faqs: [
      {
        question: "How do I calculate salary for an employee who joins mid-month?",
        answer:
          "Divide the monthly salary by the number of days in the month (or working days, if that's your policy) and multiply by the days they were employed. For ₦450,000 and a start on 16 November, that's ₦450,000 ÷ 30 × 15 = ₦225,000 on the calendar-day method.",
      },
      {
        question: "Are pension and PAYE deducted from a prorated salary?",
        answer:
          "Yes. Pension and NHF are calculated on the prorated amounts actually paid, and PAYE on the employee's actual pay for the year, so someone who joins late in the year often pays less tax than a full-year employee on the same salary.",
      },
    ],
    related: ["gross-pay-vs-net-pay", "severance-pay", "off-cycle-payroll", "13th-month-salary"],
  },
  {
    term: "Severance Pay & Terminal Benefits",
    slug: "severance-pay",
    category: "payroll-tax",
    shortDefinition:
      "Severance pay and terminal benefits are the payments an employee receives when their employment ends: final salary, pay in lieu of notice, unused leave, any contractual severance or redundancy package and gratuity. In Nigeria, compensation for loss of employment is tax-free up to ₦50 million under the Nigeria Tax Act 2025.",
    content: doc(
      heading("Notice periods under the Labour Act"),
      paragraph(
        "Section 11 of the Labour Act sets the minimum notice either side must give to end a contract, based on length of service. Contracts can give more notice, but not less:",
      ),
      table([
        ["Length of service", "Minimum notice"],
        ["3 months or less", "1 day"],
        ["More than 3 months, less than 2 years", "1 week"],
        ["2 years, less than 5 years", "2 weeks"],
        ["5 years or more", "1 month"],
      ]),
      paragraph(
        "Either party can pay or accept salary in lieu of notice instead. These minimums protect “workers” as the Act defines them; managers and professionals rely on the notice in their contracts, commonly one to three months.",
      ),
      heading("What goes into the final payroll"),
      bullets(
        [{ bold: "Salary to the last day: " }, "prorated for the final month."],
        [{ bold: "Pay in lieu of notice: " }, "if the notice period isn't worked."],
        [{ bold: "Unused leave: " }, "where the contract or leave policy provides for paying it out."],
        [
          { bold: "Severance or redundancy pay: " },
          "the Labour Act requires employers to negotiate redundancy payments but sets no formula, so the amount comes from the contract, a collective agreement or the negotiation.",
        ],
        [{ bold: "Gratuity: " }, "if a scheme or the contract provides one."],
        [
          { bold: "Pension: " },
          "the usual employee and employer contributions on the final month's basic, housing and transport pay.",
        ],
      ),
      heading("How terminal benefits are taxed"),
      bullets(
        [
          { bold: "Compensation for loss of employment: " },
          "exempt up to ₦50 million under the Nigeria Tax Act 2025; only the excess is taxed.",
        ],
        [{ bold: "Final salary and leave pay: " }, "taxed as normal employment income through PAYE."],
        [
          { bold: "Retirement benefits: " },
          "paid by the employee's Pension Fund Administrator from their Retirement Savings Account, not through payroll.",
        ],
      ),
      paragraph(
        "For example, a manager made redundant after six years who receives a negotiated ₦4,000,000 severance package pays no tax on it, because it's within the ₦50 million exemption; their final month's salary goes through PAYE as usual.",
      ),
      callout(
        "Give the employee an exit statement listing each payment, every deduction and the net amount. It prevents disputes, and confirm the tax treatment of any large package before paying it.",
      ),
    ),
    faqs: [
      {
        question: "Is severance pay mandatory in Nigeria?",
        answer:
          "There's no fixed statutory amount. The Labour Act requires minimum notice (or pay in lieu) and, for redundancies, that the employer negotiates redundancy payments, but the amount comes from the contract, a collective agreement or the negotiation itself.",
      },
      {
        question: "Is severance pay taxable in Nigeria?",
        answer:
          "Compensation for loss of employment is exempt up to ₦50 million under the Nigeria Tax Act 2025; only the excess is taxed. Final salary and leave pay are taxed through PAYE like any other pay.",
      },
    ],
    related: ["prorated-salary", "off-cycle-payroll", "paye", "contributory-pension"],
  },
  {
    term: "Off-Cycle Payroll",
    slug: "off-cycle-payroll",
    category: "payroll-tax",
    shortDefinition:
      "An off-cycle payroll is a payroll run made outside the regular monthly schedule, to pay bonuses, commissions, corrections, final settlements or urgent adjustments. Statutory deductions still apply: PAYE, and pension where the payment is pensionable, must be calculated and remitted with the period's other payments.",
    content: doc(
      heading("When to run an off-cycle payroll"),
      bullets(
        [
          { bold: "Bonuses and commissions: " },
          "performance bonuses, sales commissions or a 13th month salary paid separately from salaries.",
        ],
        [{ bold: "Corrections: " }, "an employee was underpaid, missed from the run or had the wrong allowance."],
        [{ bold: "Final settlements: " }, "leavers whose exit falls between pay dates."],
        [{ bold: "Late joiners: " }, "staff who started after the monthly cut-off."],
        [{ bold: "Salary advances: " }, "approved advances, recovered from later pay."],
      ),
      paragraph(
        "Keep off-cycle runs for genuine exceptions. Anything predictable, such as monthly commissions, is simpler and cheaper to process in the regular run.",
      ),
      heading("How deductions work off-cycle"),
      paragraph(
        "An off-cycle run isn't a separate tax year. The Nigeria Tax Administration Act 2025 requires the PAYE deducted across a year to equal the tax due on the year's total pay, so an off-cycle payment is taxed on top of what the employee has already earned.",
      ),
      bullets(
        [{ bold: "PAYE: " }, "recalculate the year-to-date tax including the extra payment, and deduct the difference."],
        [
          { bold: "Pension and NHF: " },
          "apply only to basic, housing and transport pay (basic salary alone, for NHF), so corrections to those items attract contributions while most bonuses don't.",
        ],
        [
          { bold: "Remittance: " },
          "PAYE from off-cycle payments joins that month's remittance, due by the 10th of the following month.",
        ],
        [
          { bold: "Records: " },
          "issue a payslip for the run and include it in the employee's year-to-date totals for the annual return.",
        ],
      ),
      heading("A worked example"),
      paragraph(
        "A sales executive whose taxable income for 2026 would otherwise be ₦6,000,000 earns a ₦400,000 commission, paid in an off-cycle run on 20 June. Their income is already in the 18% band, so the run deducts ₦72,000 of PAYE (18% × ₦400,000) and pays ₦328,000. The ₦72,000 is remitted with June's PAYE by 10 July. Had the commission taken their taxable income past ₦12,000,000, the part above it would have been taxed at 21%.",
      ),
      callout(
        "Approve off-cycle runs as strictly as regular ones, with an approver who checks the amount and the reason, and a record of both. Ad-hoc payments are a common route for errors and fraud.",
      ),
    ),
    faqs: [
      {
        question: "Is PAYE deducted from bonuses paid in an off-cycle run?",
        answer:
          "Yes. Bonuses and commissions are employment income, so PAYE is calculated on the employee's year-to-date pay including the bonus, and remitted with that month's PAYE by the 10th of the following month.",
      },
      {
        question: "Do off-cycle payments need a separate payslip?",
        answer:
          "It's good practice to issue a payslip for every run, showing the gross amount, deductions and net pay. It keeps the employee informed and the year-end return accurate.",
      },
    ],
    related: ["13th-month-salary", "paye", "severance-pay", "prorated-salary"],
  },
];
