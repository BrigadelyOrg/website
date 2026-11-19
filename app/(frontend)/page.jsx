import Hero from "@/components/Hero";
import ProductTour from "@/components/ProductTour";
import WhoItsFor from "@/components/WhoItsFor";
import ComplianceTable from "@/components/ComplianceTable";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/Faq";
import ClosingCTA from "@/components/ClosingCTA";
import { JsonLd } from "@/components/JsonLd";
import { homepageFaqSchema } from "@/lib/homepage-faqs";
import { DEFAULT_OG_IMAGE, LOGO_URL, SITE_DESCRIPTION, SITE_URL, SOCIAL_PROFILES } from "@/lib/site";

const TITLE = "Brigadely - The financial operating system for African businesses";

// No street address exists for Brigadely in the codebase, so `address` is left out.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brigadely",
  legalName: "Brigadely Technologies Limited",
  url: SITE_URL,
  logo: LOGO_URL,
  email: "info@brigadely.com",
  sameAs: SOCIAL_PROFILES.map((profile) => profile.url),
};

// No `offers`: a price of 0 would present the 60-day trial as permanently free.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Brigadely",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
};

export const metadata = {
  title: TITLE,
  // The description comes from the root layout (SITE_DESCRIPTION).
  alternates: {
    canonical: SITE_URL,
  },
  // Setting `openGraph` replaces the root layout's, so it repeats everything a share preview needs.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Brigadely",
    locale: "en_NG",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={homepageFaqSchema()} />
      <Hero />
      <ProductTour />
      <WhoItsFor />
      {/* <ComplianceTable /> */}
      <HowItWorks />
      <FAQ />
      <ClosingCTA />
    </main>
  );
}
