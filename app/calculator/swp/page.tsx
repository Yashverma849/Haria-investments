import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "SWP Calculator | Haria Investments",
  description:
    "Plan systematic withdrawal payouts from your mutual fund corpus with Haria Investments' SWP calculator.",
};

export default function SwpCalculatorPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.calculatorSwp} />}
        legacy={
          <>
            <InvestmentCalculator type="swp" />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
