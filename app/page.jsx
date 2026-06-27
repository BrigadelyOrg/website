import Hero from "@/components/Hero";
import ProductTour from "@/components/ProductTour";
import WhoItsFor from "@/components/WhoItsFor";
import ComplianceTable from "@/components/ComplianceTable";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/Faq";
import ClosingCTA from "@/components/ClosingCTA";
import JsonLd from "@/components/JsonLd";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Brigadely",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "The financial operating system for African businesses — payroll, statutory compliance, vendor payments, and more, built for All.",
  url: "https://brigadely.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
    description: "60-day free trial — no credit card required",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Brigadely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brigadely is the financial operating system for African businesses. It runs payroll, calculates and files PAYE, Pension, NHF, NSITF, and ITF, processes vendor and contractor payments, and keeps a full audit trail — all from one ledger, built for how Nigerian businesses actually move money.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries and states do you support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brigadely is Nigeria-first. We support payroll and statutory filings across all 36 Nigerian states and the FCT, with state-level PAYE routing to the correct State IRS or FIRS.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pay employees in multiple currencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brigadely currently supports payroll in NGN only. Multi-currency payroll is not yet available.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams complete initial setup in under a day and run their first payroll within a week. There are no migration consultants required. You import your employee records, link your bank account, and Brigadely handles the rest.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All payroll and employee data is encrypted in transit and at rest using AES-256 and TLS. Access is controlled by role, so each team member sees only what they need.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Brigadely offers a 60-day free trial with no setup fees and no commitment required. You can run real payroll during the trial period.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support contractors and employees on the same payroll?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can run full-time employees and contractors on the same payroll run. Brigadely applies the correct withholding tax to contractors and the standard statutory deductions to employees automatically.",
      },
    },
  ],
};

export const metadata = {
  title: "Brigadely — The financial operating system for African businesses",
  description:
    "Brigadely automates PAYE, Pension, NHF, NSITF, and ITF on every payroll run. Compliant Nigerian payroll for growing businesses — from one dashboard.",
  alternates: {
    canonical: "https://brigadely.com",
  },
  openGraph: {
    url: "https://brigadely.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <JsonLd schema={softwareSchema} />
      <JsonLd schema={faqSchema} />
      <Hero />
      <ProductTour />
      <WhoItsFor />
      <ComplianceTable />
      <HowItWorks />
      <FAQ />
      <ClosingCTA />
    </main>
  );
}
