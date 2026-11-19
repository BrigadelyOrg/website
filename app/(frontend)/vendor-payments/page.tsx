import FeaturePage, { featureMetadata } from "@/components/features/FeaturePage";

// Copy: content/featurePages.ts. Statically rendered.
export const metadata = featureMetadata("vendor-payments");

export default function VendorPaymentsPage() {
  return <FeaturePage slug="vendor-payments" />;
}
