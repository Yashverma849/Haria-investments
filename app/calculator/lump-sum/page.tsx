import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Lump Sum Calculator | Haria Investments",
  description:
    "Project one-time investment growth with Haria Investments' lump sum calculator.",
};

export default function LumpSumCalculatorPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.calculatorLumpSum} />}
        legacy={
          <>
            <InvestmentCalculator type="lump-sum" />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
