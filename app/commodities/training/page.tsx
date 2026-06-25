import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import CommodityHighlightsSection from "@/components/commodity-highlights-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import ServiceStackIntro from "@/components/service-stack-intro";
import { commodityTraining } from "@/lib/commodities-data";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Commodity Training | Haria Investments",
  description:
    "Learn commodity market fundamentals, futures, options, and risk management with structured training from Haria Investments.",
};

export default function CommodityTrainingPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.commodityTraining} />}
        legacy={
          <>
            <CommodityHighlightsSection content={commodityTraining} />
            <JourneyCtaSection />
          </>
        }
      />
    </main>
  );
}
