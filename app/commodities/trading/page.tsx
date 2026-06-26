import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import CommodityMarketInsightsSection from "@/components/commodity-market-insights-section";
import CommodityTradingProductsSection from "@/components/commodity-trading-products-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Commodity Trading | Haria Investments",
  description:
    "Trade commodity futures, options, and spot markets with structured guidance on risk management from Haria Investments.",
};

export default function CommodityTradingPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.commodityTrading} />}
        legacy={
          <>
            <CommodityTradingProductsSection />
            <CommodityMarketInsightsSection />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
