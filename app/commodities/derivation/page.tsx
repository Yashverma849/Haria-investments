import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import CommodityHighlightsSection from "@/components/commodity-highlights-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { commodityDerivation } from "@/lib/commodities-data";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Commodity Derivatives | Haria Investments",
  description:
    "Expert guidance in commodity futures, options, spreads, and corporate hedging strategies from Haria Investments.",
};

export default function CommodityDerivationPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.commodityDerivation} />}
        legacy={
          <>
            <CommodityHighlightsSection content={commodityDerivation} />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
