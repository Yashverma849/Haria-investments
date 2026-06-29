import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import InsurancePlansSection from "@/components/insurance-plans-section";
import InsuranceWhyChooseSection from "@/components/insurance-why-choose-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "General Insurance | Haria Investments",
  description:
    "Motor, fire, property, and travel insurance with comprehensive coverage, competitive premiums, and expert guidance from Haria Investments.",
};

export default function GeneralInsurancePage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.generalInsurance} />}
        legacy={
          <>
            <InsurancePlansSection />
            <InsuranceWhyChooseSection />
          </>
        }
      />
    </main>
  );
}
