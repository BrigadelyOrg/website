import FeaturePage, { featureMetadata } from "@/components/features/FeaturePage";

// Copy: content/featurePages.ts. Statically rendered.
export const metadata = featureMetadata("expense-management");

export default function ExpenseManagementPage() {
  return <FeaturePage slug="expense-management" />;
}
