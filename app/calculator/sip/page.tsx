import type { Metadata } from "next";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";

export const metadata: Metadata = {
  title: "SIP Calculator | Haria Investments",
  description:
    "Estimate systematic investment plan returns with Haria Investments' SIP calculator.",
};

export default function SipCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow="Calculator"
          title="SIP Calculator"
          description="Plan your monthly investments and see how disciplined SIPs can grow your wealth over time."
        />
        <InvestmentCalculator type="sip" />
        <JourneyCtaSection />
      </main>
    </>
  );
}
