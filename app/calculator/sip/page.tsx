import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import InvestmentCalculator from "@/components/investment-calculator";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "SIP Calculator | Haria Investments",
  description:
    "Estimate systematic investment plan returns with Haria Investments' SIP calculator.",
};

export default function SipCalculatorPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.calculatorSip} />}
        legacy={
          <>
            <InvestmentCalculator type="sip" />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
