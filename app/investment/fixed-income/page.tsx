import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import FixedIncomeBenefits from "@/components/fixed-income-benefits";
import FixedIncomeCalculator from "@/components/fixed-income-calculator";
import FixedIncomeLadder from "@/components/fixed-income-ladder";
import FixedIncomeProducts from "@/components/fixed-income-products";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Fixed Income | Haria Investments",
  description:
    "Explore corporate deposits, bonds, government securities, NCDs, and capital gain bonds. Calculate returns and plan a laddering strategy with Haria Investments.",
};

export default function FixedIncomePage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.fixedIncome} />}
        legacy={
          <>
            <FixedIncomeProducts />
            <FixedIncomeCalculator />
            <FixedIncomeLadder />
            <FixedIncomeBenefits />
            <JourneyCtaSection tone="light" />
          </>
        }
      />
    </main>
  );
}
