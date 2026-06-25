import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "CAGR Calculator | Haria Investments",
  description:
    "Measure compound annual growth rate between two investment values with Haria Investments' CAGR calculator.",
};

export default function CagrCalculatorPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.calculatorCagr} />}
        legacy={
          <>
            <InvestmentCalculator type="cagr" />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
