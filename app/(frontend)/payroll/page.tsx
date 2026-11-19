import FeaturePage, { featureMetadata } from "@/components/features/FeaturePage";

// Copy: content/featurePages.ts. Statically rendered.
export const metadata = featureMetadata("payroll");

export default function PayrollPage() {
  return <FeaturePage slug="payroll" />;
}
