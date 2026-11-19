import FeaturePage, { featureMetadata } from "@/components/features/FeaturePage";

// Copy: content/featurePages.ts. Statically rendered.
export const metadata = featureMetadata("asset-management");

export default function AssetManagementPage() {
  return <FeaturePage slug="asset-management" />;
}
