import FeaturePage, { featureMetadata } from "@/components/features/FeaturePage";

// Copy: content/featurePages.ts. Statically rendered.
export const metadata = featureMetadata("contractor-payments");

export default function ContractorPaymentsPage() {
  return <FeaturePage slug="contractor-payments" />;
}
