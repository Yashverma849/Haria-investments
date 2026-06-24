import type { Metadata } from "next";
import JourneyCtaSection from "@/components/journey-cta-section";
import LifeInsuranceHero from "@/components/life-insurance-hero";
import LifeInsuranceProcess from "@/components/life-insurance-process";
import LifeInsuranceTestimonials from "@/components/life-insurance-testimonials";
import Navbar from "@/components/navbar";
import ProtectionPlansSection from "@/components/protection-plans-section";

export const metadata: Metadata = {
  title: "Life Insurance | Haria Investments",
  description:
    "Choose from term, whole life, endowment, ULIP, money-back, and pension plans — tailored protection for every life stage and financial goal.",
};

export default function LifeInsurancePage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <LifeInsuranceHero />
        <ProtectionPlansSection />
        <LifeInsuranceTestimonials />
        <LifeInsuranceProcess />
        <JourneyCtaSection />
      </main>
    </>
  );
}
