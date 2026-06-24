import type { Metadata } from "next";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";

export const metadata: Metadata = {
  title: "CAGR Calculator | Haria Investments",
  description:
    "Measure compound annual growth rate between two investment values with Haria Investments' CAGR calculator.",
};

export default function CagrCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow="Calculator"
          title="CAGR Calculator"
          description="Calculate the annualized growth rate between an initial and final investment value."
        />
        <InvestmentCalculator type="cagr" />
        <JourneyCtaSection />
      </main>
    </>
  );
}
