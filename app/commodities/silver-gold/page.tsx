import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import CommodityHighlightsSection from "@/components/commodity-highlights-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { commoditySilverGold } from "@/lib/commodities-data";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Silver & Gold | Haria Investments",
  description:
    "Invest in gold and silver through physical bullion, ETFs, sovereign bonds, and MCX instruments with expert guidance.",
};

export default function SilverGoldPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.commoditySilverGold} />}
        legacy={
          <>
            <CommodityHighlightsSection content={commoditySilverGold} />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
