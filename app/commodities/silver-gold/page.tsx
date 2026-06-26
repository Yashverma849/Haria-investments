import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import BullionOfferingsSection from "@/components/bullion-offerings-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Silver & Gold | Haria Investments",
  description:
    "Strategic bullion solutions — futures, ETFs, and systematic gold and silver mutual fund investments with expert guidance.",
};

export default function SilverGoldPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.commoditySilverGold} />}
        legacy={
          <>
            <BullionOfferingsSection />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
