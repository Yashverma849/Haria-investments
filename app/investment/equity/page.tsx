import type { Metadata } from "next";
import EquityInvestmentHero from "@/components/equity-investment-hero";
import InvestmentOptionsSection from "@/components/investment-options-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Equity Investments | Haria Investments",
  description:
    "Explore Indian equities, ETFs, REITs, PMS, AIF, model portfolios, global investments, and unlisted shares tailored to your financial goals.",
};

export default function EquityInvestmentPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <EquityInvestmentHero />
        <InvestmentOptionsSection />
        <JourneyCtaSection />
      </main>
    </>
  );
}
