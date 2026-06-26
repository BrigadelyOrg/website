import Hero from "@/components/Hero";
import ProductTour from "@/components/ProductTour";
import WhoItsFor from "@/components/WhoItsFor";
import ComplianceTable from "@/components/ComplianceTable";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/Faq";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductTour />
      <WhoItsFor />
      <ComplianceTable />
      <HowItWorks />
      <FAQ />
      <ClosingCTA />
    </div>
  );
}
