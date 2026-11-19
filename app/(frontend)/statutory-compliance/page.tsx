import FeaturePage, { featureMetadata } from "@/components/features/FeaturePage";

// Copy: content/featurePages.ts. Statically rendered.
export const metadata = featureMetadata("statutory-compliance");

export default function StatutoryCompliancePage() {
  return <FeaturePage slug="statutory-compliance" />;
}
