import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import JourneyCtaSection from "@/components/journey-cta-section";
import LifeInsuranceProcess from "@/components/life-insurance-process";
import ProtectionPlansSection from "@/components/protection-plans-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Life Insurance | Haria Investments",
  description:
    "Choose from term, whole life, endowment, ULIP, money-back, and pension plans — tailored protection for every life stage and financial goal.",
};

export default function LifeInsurancePage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.lifeInsurance} />}
        legacy={
          <>
            <ProtectionPlansSection />
            <LifeInsuranceProcess />
            <JourneyCtaSection tone="light" />
          </>
        }
      />
    </main>
  );
}
