import type { Metadata } from "next";
import CommodityHighlightsSection from "@/components/commodity-highlights-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";
import { commodityTraining } from "@/lib/commodities-data";

export const metadata: Metadata = {
  title: "Commodity Training | Haria Investments",
  description:
    "Learn commodity market fundamentals, futures, options, and risk management with structured training from Haria Investments.",
};

export default function CommodityTrainingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow={commodityTraining.eyebrow}
          title={commodityTraining.title}
          description={commodityTraining.description}
        />
        <CommodityHighlightsSection content={commodityTraining} />
        <JourneyCtaSection />
      </main>
    </>
  );
}
