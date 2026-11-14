/**
 * Cross-border and FX terms: contractors, international payouts and currency.
 * Withholding tax rates follow the Deduction of Tax at Source (Withholding)
 * Regulations 2024. Exchange rates in examples are illustrative.
 */
import { bullets, callout, doc, heading, paragraph, steps, table, type SeedTerm } from "../lexical";

export const CROSS_BORDER_FX_TERMS: SeedTerm[] = [
  {
    term: "Independent Contractor vs. Full-Time Employee",
    slug: "independent-contractor-vs-employee",
    category: "cross-border-fx",
    shortDefinition:
      "Independent contractors and full-time employees are taxed differently in Nigeria. Employees are paid through payroll, with PAYE, pension, NHF and other statutory deductions. Contractors invoice for their services and handle their own tax, with the client deducting withholding tax: 5% for resident individuals and companies on most professional fees.",
    content: doc(
      heading("How Nigerian law tells them apart"),
      paragraph(
        "No single statutory test decides the question. Nigerian courts, including the National Industrial Court, look at the substance of the relationship rather than the label in the contract:",
      ),
      bullets(
        [{ bold: "Control: " }, "does the business decide how, when and where the work is done?"],
        [
          { bold: "Integration: " },
          "is the person part of the organisation, with a line manager, a job title and company equipment?",
        ],
        [
          { bold: "Economic reality: " },
          "does the person carry business risk, work for other clients, set their own rates and invoice for results?",
        ],
        [
          { bold: "Duration and exclusivity: " },
          "a long-running, full-time, exclusive arrangement looks like employment, whatever it's called.",
        ],
        [
          { bold: "Tools and costs: " },
          "contractors usually supply their own equipment and bear their own business expenses.",
        ],
      ),
      heading("How each is taxed and paid"),
      table([
        ["", "Full-time employee", "Independent contractor"],
        ["How they're paid", "Monthly payroll", "Against invoices"],
        ["Tax deducted", "PAYE, at 0% to 25%", "Withholding tax: 5% if resident, 10% if non-resident"],
        ["Who files", "The employer remits monthly", "The contractor files their own return"],
        ["Pension, NHF, NSITF, ITF", "Yes", "No"],
        ["Leave and notice", "Yes", "Only as agreed in the contract"],
      ]),
      paragraph(
        "Withholding tax on a contractor's fees goes to their state tax authority if they're an individual, or the Nigeria Revenue Service if they're a company. The rate doubles if the contractor has no Tax ID.",
      ),
      heading("A worked example"),
      paragraph(
        "A designer living in Lagos invoices ₦800,000 for a month's work as a contractor. The client deducts 5% withholding tax (₦40,000), pays ₦760,000 and remits the ₦40,000 to LIRS; the designer claims it as a credit against their own income tax for the year. If the same person were an employee on ₦800,000 a month, the business would run PAYE, deduct pension and NHF, and pay its own 10% pension contribution, NSITF and ITF on top.",
      ),
      callout(
        "Misclassification is costly: if the relationship is really employment, the business can be liable for the PAYE and statutory contributions it should have deducted, with penalties. Review contractors who have worked full-time for you for more than a few months.",
      ),
    ),
    faqs: [
      {
        question: "What withholding tax rate applies to contractors in Nigeria?",
        answer:
          "Under the Deduction of Tax at Source (Withholding) Regulations 2024, consultancy, professional, technical and management fees attract 5% for resident individuals and companies, and 10% for non-residents, for whom it's a final tax. The rate doubles if the contractor has no Tax ID.",
      },
      {
        question: "Can a contractor become an employee without a new contract?",
        answer:
          "In law, yes. If the business controls the work, integrates the person into the team and pays them like staff, a court or tax authority can treat them as an employee whatever the contract says, and the business becomes liable for PAYE and statutory contributions.",
      },
    ],
    related: ["withholding-tax", "paye", "contractor-invoice-sow", "usdc-settlement"],
  },
  {
    term: "USDC (USD Coin) Settlement",
    slug: "usdc-settlement",
    category: "cross-border-fx",
    shortDefinition:
      "USDC settlement means paying contractors, vendors or staff in USD Coin, a dollar-pegged stablecoin issued by Circle and redeemable one-for-one for US dollars. Payments settle on a blockchain in minutes, any day of the week, without the correspondent banks that slow down international wire transfers to African recipients.",
    content: doc(
      heading("How USDC settlement works"),
      paragraph(
        "Each USDC token is backed by reserves of cash and short-dated US government securities, which Circle reports on publicly every month. Paying in USDC works like this:",
      ),
      steps(
        [
          { bold: "Fund: " },
          "the payer converts dollars or naira into USDC through a regulated exchange or payment provider.",
        ],
        [
          { bold: "Send: " },
          "the USDC moves to the recipient's wallet address on a supported blockchain network, such as Solana, Stellar, Base or Ethereum.",
        ],
        [
          { bold: "Settle: " },
          "the recipient holds it as digital dollars, or converts it to naira or another currency through a licensed exchange.",
        ],
      ),
      heading("A worked example"),
      paragraph("A Lagos startup pays a contractor in Accra $2,000 for a month's work."),
      bullets(
        [
          { bold: "By international wire: " },
          "the transfer passes through one or more correspondent banks, each of which can deduct a fee, so the contractor rarely receives exactly $2,000, typically one to five business days later.",
        ],
        [
          { bold: "In USDC: " },
          "the contractor receives 2,000 USDC within minutes, for a network fee of a few cents on networks such as Solana, Stellar or Base, and chooses when to convert it.",
        ],
      ),
      heading("Compliance and risks"),
      bullets(
        [
          { bold: "Regulation: " },
          "Nigeria's Investments and Securities Act 2025 treats digital assets as securities and requires virtual asset service providers to register with the SEC. Use licensed providers to buy, hold and convert USDC.",
        ],
        [
          { bold: "Tax and records: " },
          "USDC payments are still income. Keep invoices, wallet addresses, transaction references and the naira value on the payment date.",
        ],
        [
          { bold: "Irreversible transfers: " },
          "a payment to the wrong address or network can't be recalled, so verify wallet details before the first payout, ideally with a small test transfer.",
        ],
        [
          { bold: "Conversion costs: " },
          "selling USDC for naira involves an exchange rate and a spread, so compare providers.",
        ],
      ),
      callout(
        "USDC isn't legal tender in Nigeria and isn't a bank deposit. Treat it as a settlement rail: agree in the contract that you'll pay in USDC, on which network and at what valuation.",
      ),
    ),
    faqs: [
      {
        question: "Is it legal to pay Nigerian contractors in USDC?",
        answer:
          "No law bans agreeing to pay a contractor in stablecoins, but businesses that buy, sell or hold digital assets for customers must be registered with the SEC under the Investments and Securities Act 2025. Use licensed providers, put the payment terms in the contract and keep full records.",
      },
      {
        question: "How do contractors convert USDC to naira?",
        answer:
          "Through a licensed exchange or payment provider that buys the USDC and pays naira into their bank account at the provider's rate. Comparing that rate with the official market rate shows the spread they're paying.",
      },
    ],
    related: ["domiciliary-account", "fx-spread", "independent-contractor-vs-employee", "contractor-invoice-sow"],
  },
  {
    term: "Domiciliary Account",
    slug: "domiciliary-account",
    category: "cross-border-fx",
    shortDefinition:
      "A domiciliary account is a Nigerian bank account held in a foreign currency, usually US dollars, British pounds or euros. Businesses and individuals use it to receive international payments and hold foreign currency, but transfers rely on correspondent banking, so they can be slower and more expensive than newer payout rails.",
    content: doc(
      heading("How a domiciliary account works"),
      paragraph(
        "Nigerian banks offer domiciliary (“dom”) accounts to individuals and businesses that need to receive or keep foreign currency. The money stays in that currency until the holder chooses to convert it.",
      ),
      bullets(
        [
          { bold: "Receiving: " },
          "money arrives by SWIFT transfer from abroad, or from another domiciliary account in Nigeria.",
        ],
        [
          { bold: "Spending: " },
          "the holder can transfer funds abroad, pay foreign suppliers or sell the currency for naira at the bank's rate.",
        ],
        [
          { bold: "Documentation: " },
          "banks apply Central Bank of Nigeria rules and their own checks, so large or unusual transfers may need invoices, contracts or other evidence of purpose.",
        ],
        [
          { bold: "Opening one: " },
          "individuals need the usual identity checks, including a BVN; businesses also provide their CAC registration documents.",
        ],
        [
          { bold: "Interest: " },
          "balances usually earn little or no interest, so the account is for holding and moving currency rather than saving.",
        ],
      ),
      heading("Using a domiciliary account for cross-border payments"),
      paragraph(
        "For a Nigerian business paying staff or contractors abroad, or receiving dollars from foreign clients, a domiciliary account is the traditional route. The trade-offs:",
      ),
      bullets(
        [
          { bold: "Speed: " },
          "SWIFT transfers pass through correspondent banks and typically take one to five business days.",
        ],
        [
          { bold: "Cost: " },
          "the sending bank charges a transfer fee, and intermediary banks may deduct their own, so the recipient can receive less than was sent.",
        ],
        [
          { bold: "Conversion: " },
          "buying currency to fund the account, or selling it for naira, happens at the bank's rate, which includes a spread over the official market rate.",
        ],
        [{ bold: "Timing: " }, "transfers are processed on banking days only."],
      ),
      heading("Compared with newer payout rails"),
      table([
        ["", "Domiciliary account (SWIFT)", "Stablecoin (USDC) payout"],
        ["Settlement time", "1–5 business days", "Minutes, any day"],
        ["Fees", "Transfer and intermediary bank fees", "Network fee, often a few cents"],
        ["Recipient needs", "A bank account that accepts SWIFT", "A wallet or an account with a licensed exchange"],
      ]),
      paragraph(
        "Many businesses use both: a domiciliary account to receive client payments and pay suppliers that require bank transfers, and faster rails for contractors who prefer digital dollars.",
      ),
    ),
    faqs: [
      {
        question: "Can I receive salary from a foreign employer into a domiciliary account?",
        answer:
          "Yes. A domiciliary account can receive transfers from abroad in its currency. The income is still taxable in Nigeria if you're tax resident here, so keep a record of each payment and its naira value.",
      },
      {
        question: "Is a domiciliary account the same as a virtual USD account?",
        answer:
          "No. A domiciliary account is a full bank account with a Nigerian bank, reached through SWIFT. A virtual USD account, offered by fintechs through partner banks, gives you details for receiving dollars, often by local transfer in the sender's country, which can be faster and cheaper.",
      },
    ],
    related: ["usdc-settlement", "fx-spread", "contractor-invoice-sow"],
  },
  {
    term: "FX Spread & Interbank Exchange Rate",
    slug: "fx-spread",
    category: "cross-border-fx",
    shortDefinition:
      "The FX spread is the difference between the exchange rate a bank or payment provider gives you and the interbank (mid-market) rate. In Nigeria, the reference is the official rate on the Nigerian Foreign Exchange Market (NFEM), published by the CBN. The spread is a hidden cost on top of any visible transfer fees.",
    content: doc(
      heading("Interbank rate vs the rate you're quoted"),
      paragraph(
        "Banks trade currencies with each other at wholesale rates. In Nigeria that market is the Nigerian Foreign Exchange Market (NFEM), where trades run through the CBN's Electronic Foreign Exchange Matching System, and the CBN publishes the resulting official rate every business day. Businesses and individuals rarely get that rate:",
      ),
      bullets(
        [{ bold: "Buying dollars: " }, "you pay more naira per dollar than the official rate."],
        [{ bold: "Selling dollars: " }, "you receive fewer naira per dollar than the official rate."],
        [
          { bold: "The gap: " },
          "the spread, which the bank or provider keeps as revenue, usually built into the rate rather than shown as a fee.",
        ],
      ),
      heading("Calculating the hidden cost"),
      paragraph(
        "When selling dollars, spread (%) = (official rate − rate received) ÷ official rate × 100. Say a contractor converts a $2,000 payment when the official rate is ₦1,450 per dollar, and the provider offers ₦1,400:",
      ),
      table([
        ["", "Rate (₦ per $1)", "Naira for $2,000"],
        ["Official NFEM rate", "₦1,450", "₦2,900,000"],
        ["Provider's rate", "₦1,400", "₦2,800,000"],
        ["Spread", "₦50 (3.4%)", "₦100,000"],
      ]),
      paragraph(
        "The ₦100,000 never appears as a fee, yet it costs more than many transfer charges. These rates are for illustration; check the CBN's published rate on the day of payment.",
      ),
      heading("How to keep spreads under control"),
      bullets(
        [
          { bold: "Compare the all-in cost: " },
          "add fees and the spread together. A “zero-fee” transfer with a wide spread can cost more than a paid one.",
        ],
        [
          { bold: "Agree the reference rate: " },
          "in contracts priced in dollars but paid in naira (or the reverse), name the rate source and date, such as the CBN's official rate on the invoice date.",
        ],
        [
          { bold: "Record the rate used: " },
          "book each payment at the rate actually applied, alongside the official rate, so FX costs, gains and losses show up in the accounts.",
        ],
      ),
      callout(
        "Ask every provider for its rate and the official rate at the same moment. If they can't show both, you can't measure the spread you're paying.",
      ),
    ),
    faqs: [
      {
        question: "What is the difference between the official rate and the bank rate?",
        answer:
          "The official rate is the CBN's published NFEM rate, based on interbank trading. A bank's rate to customers includes its spread, so you pay more naira per dollar when buying and receive fewer when selling.",
      },
      {
        question: "How do I calculate the FX spread on a payment?",
        answer:
          "Compare the rate you got with the official rate at the same time. Converting $2,000 at ₦1,400 when the official rate is ₦1,450 costs ₦100,000, a spread of about 3.4%.",
      },
    ],
    related: ["domiciliary-account", "usdc-settlement", "contractor-invoice-sow"],
  },
  {
    term: "Contractor Invoice & Statement of Work (SOW)",
    slug: "contractor-invoice-sow",
    category: "cross-border-fx",
    shortDefinition:
      "A Statement of Work (SOW) defines what a contractor will deliver, by when and for how much. A contractor invoice requests payment for work done under it. Together they let a business approve contractor payouts against agreed deliverables, apply the right withholding tax and keep an audit-ready record of every payment.",
    content: doc(
      heading("What a statement of work covers"),
      bullets(
        [{ bold: "Scope and deliverables: " }, "what will be delivered, and what's out of scope."],
        [{ bold: "Acceptance criteria: " }, "how the business decides a deliverable is complete."],
        [{ bold: "Timeline and milestones: " }, "dates for each deliverable or payment stage."],
        [
          { bold: "Fees and currency: " },
          "fixed, milestone or rate-based fees, the payment currency and, for cross-border work, the exchange rate source.",
        ],
        [{ bold: "Tax terms: " }, "that fees are subject to withholding tax, and whether VAT applies."],
        [{ bold: "Intellectual property: " }, "who owns the work, and how confidential information is protected."],
        [{ bold: "Termination: " }, "how either side can end the engagement, and what's paid for work in progress."],
      ),
      heading("What a valid contractor invoice includes"),
      bullets(
        [{ bold: "Identity: " }, "the contractor's name, address and Tax ID, and the client's details."],
        [{ bold: "Reference: " }, "invoice number, date and the SOW or milestone it bills for."],
        [
          { bold: "Amounts: " },
          "the fee, VAT at 7.5% if the contractor is VAT-registered and the service is taxable, and the total.",
        ],
        [{ bold: "Payment details: " }, "bank account or wallet details, and the payment terms."],
        [
          { bold: "Currency: " },
          "the currency agreed in the SOW and, if it's paid in another, the exchange rate source.",
        ],
      ),
      paragraph("A missing Tax ID matters: under Nigeria's withholding tax rules, the rate doubles when the recipient has none."),
      heading("From invoice to payout"),
      steps(
        [{ bold: "Match: " }, "check the invoice against the SOW, the milestone and evidence the work was accepted."],
        [{ bold: "Approve: " }, "a budget owner other than the person who raised the request approves the payment."],
        [
          { bold: "Deduct withholding tax: " },
          "5% for resident contractors on most professional and consultancy fees, calculated before VAT.",
        ],
        [
          { bold: "Pay and remit: " },
          "pay the net amount, remit the tax by the 21st of the following month and give the contractor evidence of the deduction.",
        ],
      ),
      paragraph(
        "For example, a developer's SOW sets three milestones of ₦1,000,000 each. When milestone two is accepted, the ₦1,000,000 invoice is approved, ₦50,000 of withholding tax is deducted, ₦950,000 is paid and the ₦50,000 is remitted to the developer's tax authority.",
      ),
      callout(
        "No SOW, no payout: an invoice that can't be traced to agreed work is the first thing an auditor will question.",
      ),
    ),
    faqs: [
      {
        question: "Is a statement of work legally required for contractors in Nigeria?",
        answer:
          "No law requires a document called an SOW, but you need a written agreement that sets out the work, fees and terms. It's your evidence that the person is a contractor, and your basis for approving invoices and resolving disputes.",
      },
      {
        question: "Is withholding tax calculated on the invoice total including VAT?",
        answer:
          "No. Withholding tax is calculated on the fee before VAT. On a ₦1,000,000 fee plus ₦75,000 VAT, a 5% deduction is ₦50,000, and the VAT is dealt with separately under the VAT rules.",
      },
    ],
    related: ["withholding-tax", "independent-contractor-vs-employee", "three-way-matching", "audit-trail"],
  },
];
