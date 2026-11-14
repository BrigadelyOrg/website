import { CORE_TERMS } from "./core";
import { CROSS_BORDER_FX_TERMS } from "./cross-border-fx";
import { FINANCE_ACCOUNTING_TERMS } from "./finance-accounting";
import { PAYROLL_TAX_TERMS } from "./payroll-tax";
import { STATUTORY_COMPLIANCE_TERMS } from "./statutory-compliance";

/** Every term the seed script creates: the six launch terms, then 24 more by category. */
export const SEED_TERMS = [
  ...CORE_TERMS,
  ...STATUTORY_COMPLIANCE_TERMS,
  ...PAYROLL_TAX_TERMS,
  ...CROSS_BORDER_FX_TERMS,
  ...FINANCE_ACCOUNTING_TERMS,
];
