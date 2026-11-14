/**
 * Finance and accounting terms: spend controls, records and reporting.
 * Record-keeping periods follow the Nigeria Tax Administration Act 2025; tax
 * depreciation rules follow the Nigeria Tax Act 2025.
 */
import { bullets, callout, doc, heading, paragraph, steps, table, type SeedTerm } from "../lexical";

export const FINANCE_ACCOUNTING_TERMS: SeedTerm[] = [
  {
    term: "Operating Ledger vs. Accounting Software",
    slug: "operating-ledger-vs-accounting-software",
    category: "finance-accounting",
    shortDefinition:
      "An operating ledger is a live system of record that controls money before it moves: it holds requests, approvals, payments and statutory obligations in one place and executes the payouts. Accounting software records transactions after they happen, to produce the books, financial statements and tax returns. Most growing businesses need both.",
    content: doc(
      heading("Two different jobs"),
      table([
        ["", "Operating ledger", "Accounting software"],
        ["Main job", "Approve and execute payments", "Record and report transactions"],
        ["Timing", "Before and as money moves", "After money has moved"],
        ["Main users", "Requesters, approvers, finance and HR", "Accountants and auditors"],
        ["Typical records", "Payroll runs, payout requests, approvals, remittances", "Journals, general ledger, financial statements"],
        ["Controls", "Approval rules, spending limits, separation of duties", "Reconciling accounts, closing periods, adjustments"],
      ]),
      paragraph(
        "The two are complementary. Accounting software tells you what happened; an operating ledger decides what's allowed to happen, then records it as it happens.",
      ),
      heading("Why the gap matters"),
      paragraph(
        "When approvals live in emails and chats and payments are made straight from banking apps, the accounts only catch up at month end. That gap is where problems hide:",
      ),
      bullets(
        [{ bold: "Duplicate or unapproved payments: " }, "nothing stops the same invoice being paid twice."],
        [
          { bold: "Missed obligations: " },
          "PAYE, pension or withholding tax deducted but not remitted on time.",
        ],
        [
          { bold: "Slow month-end close: " },
          "finance teams rebuild who approved what from screenshots and bank statements.",
        ],
        [{ bold: "Weak audit trail: " }, "decisions that were never recorded can't be evidenced later."],
        [
          { bold: "Scattered commitments: " },
          "payroll sits in one spreadsheet, vendor payments in another and approvals in chat, so no one sees the full picture.",
        ],
      ),
      heading("How they work together"),
      paragraph(
        "In a typical setup, the operating ledger runs the money: payroll, contractor and vendor payouts, statutory remittances and the approvals behind them. Each completed payment, with its approval history, is passed to the accounting software and coded to the right accounts. The accountant reconciles and reports; the operating ledger keeps control.",
      ),
      paragraph(
        "Signs a business needs one: more than one person approving payments, statutory remittances every month, contractors in several countries, or a month-end close that takes days of reconstruction.",
      ),
      paragraph(
        "Brigadely is an operating ledger for African businesses: payroll, statutory remittances and vendor and contractor payments are requested, approved and paid in one place, with a full record of who did what.",
      ),
    ),
    faqs: [
      {
        question: "Do I still need accounting software if I use an operating ledger?",
        answer:
          "Usually, yes. The operating ledger controls and records payments; accounting software produces the general ledger, financial statements and tax computations. Passing completed payments from one to the other avoids entering them twice.",
      },
      {
        question: "What is the difference between a ledger and accounting software?",
        answer:
          "In accounting, the general ledger is the record of a business's transactions by account, kept inside accounting software. An operating ledger is a different tool: it sits before the books, controlling and executing payments as they happen.",
      },
    ],
    related: ["audit-trail", "three-way-matching", "expense-reimbursement"],
  },
  {
    term: "Expense Reimbursement",
    slug: "expense-reimbursement",
    category: "finance-accounting",
    shortDefinition:
      "Expense reimbursement is how a business repays employees for business costs they paid personally, such as travel, client meals or software. Claims backed by receipts and an approved policy are repayments, not pay, so they aren't taxed as income; flat allowances paid without receipts usually are.",
    content: doc(
      heading("How a reimbursement process works"),
      steps(
        [{ bold: "Spend: " }, "the employee pays for an approved business expense."],
        [
          { bold: "Claim: " },
          "they submit a claim with the receipt, date, amount and business purpose, within the policy deadline (for example, 30 days).",
        ],
        [
          { bold: "Approve: " },
          "their manager confirms the expense was for business, and finance checks it against the policy.",
        ],
        [
          { bold: "Repay: " },
          "the business reimburses the exact amount, by transfer or as a non-taxable line on the next payslip.",
        ],
      ),
      heading("What a good policy defines"),
      bullets(
        [
          { bold: "Eligible expenses: " },
          "travel, accommodation, client entertainment, work tools and similar business costs.",
        ],
        [{ bold: "Limits: " }, "nightly hotel caps, daily meal allowances and approval thresholds."],
        [{ bold: "Evidence: " }, "original or digital receipts, and what to do when a receipt is lost."],
        [{ bold: "Deadlines: " }, "how soon claims must be submitted and paid."],
        [{ bold: "Approvers: " }, "who can approve claims, and up to what amount."],
        [{ bold: "Exclusions: " }, "personal costs, fines and upgrades the business won't cover."],
        [
          { bold: "Company cards: " },
          "for frequent spenders, a card with its own limit avoids personal spending altogether, though receipts are still needed.",
        ],
      ),
      heading("Tax treatment in Nigeria"),
      paragraph(
        "Repaying a genuine business cost, backed by evidence, puts the employee back where they started, so it isn't part of their taxable pay. The business records it as its own expense, and payslips should show it as a separate, non-taxable line rather than mixing it into salary.",
      ),
      bullets(
        [{ bold: "Receipted reimbursements: " }, "not taxable for the employee."],
        [
          { bold: "Flat allowances: " },
          "a fixed amount paid regardless of what's spent is part of pay, so PAYE applies.",
        ],
        [{ bold: "Personal expenses: " }, "paying an employee's personal costs is a taxable benefit."],
      ),
      paragraph(
        "For example, an employee spends ₦85,000 on a client trip to Abuja: ₦60,000 on accommodation and ₦25,000 on transport. With receipts and approval, the business repays ₦85,000 and no PAYE applies. A flat ₦85,000 monthly “travel allowance” with no receipts would be taxed as pay.",
      ),
      callout(
        "Repay approved claims quickly. Employees shouldn't be funding the business, and slow repayment pushes teams towards cash advances that are harder to control.",
      ),
    ),
    faqs: [
      {
        question: "Are expense reimbursements taxable in Nigeria?",
        answer:
          "Not when they repay genuine business costs backed by receipts and an approved policy: the employee is being repaid, not paid. Flat allowances paid without evidence are treated as part of pay and taxed through PAYE.",
      },
      {
        question: "What happens if an employee loses a receipt?",
        answer:
          "Many policies accept a signed missing-receipt declaration for small amounts, approved by a manager, with a limit on how often it can be used. Without any evidence, the claim should be rejected or treated as taxable pay.",
      },
    ],
    related: ["audit-trail", "operating-ledger-vs-accounting-software", "three-way-matching"],
  },
  {
    term: "Three-Way Matching",
    slug: "three-way-matching",
    category: "finance-accounting",
    shortDefinition:
      "Three-way matching is a spend control that checks three documents agree before a supplier is paid: the purchase order (what was ordered), the goods or service receipt (what was delivered) and the supplier's invoice (what was billed). Payment is released only when quantities, prices and totals match.",
    content: doc(
      heading("The three documents"),
      bullets(
        [
          { bold: "Purchase order (PO): " },
          "issued before buying, with the items, quantities, prices and terms an approver signed off.",
        ],
        [
          { bold: "Goods or service receipt: " },
          "a goods received note (GRN) or service acceptance confirming what actually arrived or was performed.",
        ],
        [{ bold: "Supplier invoice: " }, "the supplier's bill for the order."],
      ),
      paragraph(
        "Each document comes from a different source: purchasing raises the order, the receiving team confirms delivery and the supplier sends the invoice. That independence is what makes the check meaningful. Two-way matching compares only the PO and the invoice; adding the receipt confirms the business got what it's paying for.",
      ),
      heading("A worked example"),
      paragraph(
        "A company orders 10 laptops at ₦1,200,000 each, a ₦12,000,000 purchase order. The warehouse receives 9; one is back-ordered. The supplier invoices for all 10.",
      ),
      table([
        ["Document", "Quantity", "Amount"],
        ["Purchase order", "10", "₦12,000,000"],
        ["Goods received note", "9", "₦10,800,000"],
        ["Supplier invoice", "10", "₦12,000,000"],
      ]),
      paragraph(
        "The invoice doesn't match the receipt, so payment is held. Finance asks the supplier for a corrected invoice of ₦10,800,000 for the 9 laptops delivered, and pays for the last one when it arrives. Without the receipt check, the full ₦12,000,000 would have gone out, ₦1,200,000 of it for a laptop that hadn't arrived.",
      ),
      heading("Making it work"),
      bullets(
        [
          { bold: "Tolerances: " },
          "let small, pre-agreed differences, such as rounding, pass automatically, and route the rest for review.",
        ],
        [
          { bold: "Separation of duties: " },
          "the person who raises the PO shouldn't be the one who confirms receipt or releases payment.",
        ],
        [
          { bold: "Services: " },
          "for contractors, the statement of work stands in for the PO, and a signed-off milestone serves as the receipt.",
        ],
        [
          { bold: "Exceptions: " },
          "track mismatches by supplier; repeated ones point to a supplier or process problem.",
        ],
        [
          { bold: "Where it fits: " },
          "use it for goods and large purchases; low-value recurring spend, such as subscriptions, can use lighter checks.",
        ],
      ),
      callout(
        "Three-way matching catches costly errors before money leaves: goods never delivered, prices above the agreed rate and invoices billed twice.",
      ),
    ),
    faqs: [
      {
        question: "What is the difference between two-way and three-way matching?",
        answer:
          "Two-way matching checks the invoice against the purchase order. Three-way matching adds the goods or service receipt, so the business also confirms that what it's paying for was actually delivered.",
      },
      {
        question: "Does three-way matching apply to services?",
        answer:
          "Yes, with a service acceptance in place of a goods received note. For contractors, the statement of work acts as the order, and a signed-off milestone or timesheet confirms the service was delivered.",
      },
    ],
    related: ["contractor-invoice-sow", "audit-trail", "operating-ledger-vs-accounting-software", "expense-reimbursement"],
  },
  {
    term: "Fixed Asset Depreciation",
    slug: "fixed-asset-depreciation",
    category: "finance-accounting",
    shortDefinition:
      "Fixed asset depreciation spreads the cost of long-lived business assets, such as laptops, phones, vehicles and equipment, over their useful lives in the accounts. Tax works differently in Nigeria: book depreciation isn't deductible, and the Nigeria Tax Act 2025 grants capital allowances instead, on a straight-line basis at rates set in the Act.",
    content: doc(
      heading("How depreciation works"),
      paragraph(
        "Under IFRS, the accounting framework adopted in Nigeria, a fixed asset is recorded at cost and depreciated over its useful life, so each year's accounts carry a fair share of what it cost.",
      ),
      bullets(
        [{ bold: "Cost: " }, "the purchase price plus the costs of getting the asset working, such as delivery and set-up."],
        [{ bold: "Useful life: " }, "how long the business expects to use it, such as three years for a laptop."],
        [{ bold: "Residual value: " }, "what it's expected to be worth at the end."],
        [{ bold: "Method: " }, "most businesses use straight-line: (cost − residual value) ÷ useful life."],
        [
          { bold: "Capitalisation threshold: " },
          "items below a set amount, such as chairs or accessories, are expensed straight away instead.",
        ],
      ),
      paragraph(
        "For example, a company buys a laptop for ₦1,800,000 in January, expects to use it for three years and assumes no residual value:",
      ),
      table([
        ["Year", "Depreciation", "Book value at year end"],
        ["1", "₦600,000", "₦1,200,000"],
        ["2", "₦600,000", "₦600,000"],
        ["3", "₦600,000", "₦0"],
      ]),
      paragraph(
        "That's ₦50,000 a month in the accounts. If the laptop is sold or written off early, its remaining book value is removed and any gain or loss recorded.",
      ),
      heading("Depreciation vs capital allowances"),
      paragraph(
        "For company income tax, depreciation is added back to profit and capital allowances are deducted instead. The Nigeria Tax Act 2025 replaced the old initial and annual allowances with straight-line allowances over an asset's useful life, at rates set in the Act. Only assets used in the business qualify, so the asset register should show what each one is for. Because the two calculations differ, book profit and taxable profit rarely match, and the register has to support both.",
      ),
      heading("Audit-ready asset tracking"),
      bullets(
        [
          { bold: "Asset register: " },
          "record each asset's tag or serial number, cost, purchase date, location and custodian.",
        ],
        [
          { bold: "Assignment: " },
          "link laptops and phones to the employees who hold them, and recover them when people leave.",
        ],
        [{ bold: "Physical checks: " }, "check the register against the actual assets at least once a year."],
        [{ bold: "Disposals: " }, "record sales, losses and write-offs, with approval."],
      ),
    ),
    faqs: [
      {
        question: "Is depreciation tax-deductible in Nigeria?",
        answer:
          "No. Depreciation in the accounts is added back when calculating taxable profit, and the business claims capital allowances instead, at the straight-line rates set in the Nigeria Tax Act 2025.",
      },
      {
        question: "What is the useful life of a laptop for depreciation?",
        answer:
          "It's a judgement for each business, based on how long it actually keeps its laptops; three years is common. Whatever you choose, apply it consistently and review it if your replacement cycle changes.",
      },
    ],
    related: ["audit-trail", "operating-ledger-vs-accounting-software", "three-way-matching"],
  },
  {
    term: "Audit Trail",
    slug: "audit-trail",
    category: "finance-accounting",
    shortDefinition:
      "An audit trail is a complete, chronological record of every financial action in a business: who requested a payment, who approved it, when it was disbursed, to whom and why. It lets auditors, tax authorities and managers trace every naira or dollar that leaves the business back to an authorised decision.",
    content: doc(
      heading("What a complete audit trail records"),
      bullets(
        [
          { bold: "Request: " },
          "who asked for the payment, when, for how much and why, with supporting documents.",
        ],
        [{ bold: "Approval: " }, "who approved or rejected it, when, and under which approval rule."],
        [
          { bold: "Changes: " },
          "every edit to amounts, payees or bank details, with the values before and after.",
        ],
        [
          { bold: "Disbursement: " },
          "when the money left, the account it went to and the bank or network reference.",
        ],
        [
          { bold: "Remittances: " },
          "statutory payments such as PAYE, pension and withholding tax, with their receipts.",
        ],
        [{ bold: "Access: " }, "who viewed or exported sensitive records, such as payroll data."],
      ),
      paragraph(
        "Entries are timestamped and can't be edited or deleted. Mistakes are corrected with new entries, so the history stays intact.",
      ),
      heading("Why it matters"),
      bullets(
        [
          { bold: "Tax audits: " },
          "the Nigeria Tax Administration Act 2025 requires books and records to be kept for at least six years after the year of assessment they relate to.",
        ],
        [
          { bold: "Statutory audits: " },
          "external auditors test payments against approvals and supporting documents.",
        ],
        [
          { bold: "Fraud prevention: " },
          "when every change is recorded and attributed, diverting a payment unnoticed is much harder, and investigating one is much easier.",
        ],
        [
          { bold: "Disputes: " },
          "disagreements with employees, contractors and suppliers are settled with evidence, not memory.",
        ],
        [{ bold: "Internal reviews: " }, "managers can answer “who approved this?” in seconds, not days."],
      ),
      heading("A worked example"),
      paragraph("An auditor picks a ₦2,400,000 payment to a supplier in March. A complete trail shows:"),
      steps(
        ["The operations lead requested it on 3 March, attaching the invoice and purchase order."],
        ["The finance manager approved it on 4 March, within their ₦5,000,000 approval limit."],
        [
          "It was paid on 5 March to the account on the supplier's record, with withholding tax deducted and remitted by 21 April.",
        ],
      ),
      paragraph(
        "Without the trail, the same check means piecing together emails, bank statements and spreadsheets, and every gap becomes an audit finding.",
      ),
      callout(
        "Changes to a payee's bank details are a common route for payment fraud. Make sure your audit trail shows who changed an account, who approved the change and when.",
      ),
    ),
    faqs: [
      {
        question: "How long should businesses keep financial records in Nigeria?",
        answer:
          "At least six years after the year of assessment the records relate to, under the Nigeria Tax Administration Act 2025. Keep payroll records, invoices, receipts and approval records for the same period.",
      },
      {
        question: "Is a bank statement an audit trail?",
        answer:
          "Only part of one. A bank statement shows that money left and where it went, but not who requested or approved the payment, or why. A complete audit trail links each payment to its request, approval and supporting documents.",
      },
    ],
    related: ["operating-ledger-vs-accounting-software", "three-way-matching", "expense-reimbursement", "fixed-asset-depreciation"],
  },
];
