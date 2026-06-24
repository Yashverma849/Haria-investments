import type { Metadata } from "next";
import GeneralInsuranceHero from "@/components/general-insurance-hero";
import InsurancePlansSection from "@/components/insurance-plans-section";
import InsuranceWhyChooseSection from "@/components/insurance-why-choose-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "General Insurance | Haria Investments",
  description:
    "Motor, fire, property, and travel insurance with comprehensive coverage, competitive premiums, and expert guidance from Haria Investments.",
};

export default function GeneralInsurancePage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <GeneralInsuranceHero />
        <InsurancePlansSection />
        <InsuranceWhyChooseSection />
        <JourneyCtaSection />
      </main>
    </>
  );
}
