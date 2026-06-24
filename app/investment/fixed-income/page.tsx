import type { Metadata } from "next";
import FixedIncomeBenefits from "@/components/fixed-income-benefits";
import FixedIncomeCalculator from "@/components/fixed-income-calculator";
import FixedIncomeHero from "@/components/fixed-income-hero";
import FixedIncomeLadder from "@/components/fixed-income-ladder";
import FixedIncomeProducts from "@/components/fixed-income-products";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Fixed Income | Haria Investments",
  description:
    "Explore corporate deposits, bonds, government securities, NCDs, and capital gain bonds. Calculate returns and plan a laddering strategy with Haria Investments.",
};

export default function FixedIncomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <FixedIncomeHero />
        <FixedIncomeProducts />
        <FixedIncomeCalculator />
        <FixedIncomeLadder />
        <FixedIncomeBenefits />
        <JourneyCtaSection />
      </main>
    </>
  );
}
