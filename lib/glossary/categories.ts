/**
 * Glossary categories: the options of the CMS `category` field and the labels
 * shown on the site. Values are stored in the database, so change labels
 * freely but add a migration before renaming or removing a value.
 */
export const GLOSSARY_CATEGORIES = [
  { value: "payroll-tax", label: "Payroll & Tax" },
  { value: "statutory-compliance", label: "Statutory Compliance" },
  { value: "cross-border-fx", label: "Cross-Border & FX" },
  { value: "finance-accounting", label: "Finance & Accounting" },
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number]["value"];

export function glossaryCategoryLabel(value: string | null | undefined): string | null {
  return GLOSSARY_CATEGORIES.find((category) => category.value === value)?.label ?? null;
}

/**
 * The short name of a term: "PAYE (Pay-As-You-Earn)" → "PAYE",
 * "Withholding Tax (WHT)" → "Withholding Tax". Used for slugs and call-to-action copy.
 */
export function shortTermName(term: string): string {
  return term.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim() || term.trim();
}
