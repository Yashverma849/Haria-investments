import type { Metadata } from "next";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";

export const metadata: Metadata = {
  title: "SWP Calculator | Haria Investments",
  description:
    "Plan systematic withdrawal payouts from your mutual fund corpus with Haria Investments' SWP calculator.",
};

export default function SwpCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow="Calculator"
          title="SWP Calculator"
          description="Model regular withdrawals from your corpus while tracking remaining balance and returns."
        />
        <InvestmentCalculator type="swp" />
        <JourneyCtaSection />
      </main>
    </>
  );
}
