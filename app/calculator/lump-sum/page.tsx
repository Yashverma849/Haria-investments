import type { Metadata } from "next";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";

export const metadata: Metadata = {
  title: "Lump Sum Calculator | Haria Investments",
  description:
    "Project one-time investment growth with Haria Investments' lump sum calculator.",
};

export default function LumpSumCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow="Calculator"
          title="Lump Sum Calculator"
          description="See how a single investment can compound over your chosen time horizon and expected return."
        />
        <InvestmentCalculator type="lump-sum" />
        <JourneyCtaSection />
      </main>
    </>
  );
}
