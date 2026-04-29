import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProductsGrid from "@/components/ProductsGrid";
import About from "@/components/About";
import Features from "@/components/Features";
import OnboardingTimeline from "@/components/OnboardingTimeline";
import ROISection from "@/components/ROISection";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/Faq";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustBar />
      <ProductsGrid />
      <About />
      <Features />
      <OnboardingTimeline />
      <ROISection />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <CTABanner />
    </div>
  );
}
