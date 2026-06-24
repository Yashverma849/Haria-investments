import type { Metadata } from "next";
import CommodityHighlightsSection from "@/components/commodity-highlights-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";
import { commodityDerivation } from "@/lib/commodities-data";

export const metadata: Metadata = {
  title: "Commodity Derivatives | Haria Investments",
  description:
    "Expert guidance in commodity futures, options, spreads, and corporate hedging strategies from Haria Investments.",
};

export default function CommodityDerivationPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow={commodityDerivation.eyebrow}
          title={commodityDerivation.title}
          description={commodityDerivation.description}
        />
        <CommodityHighlightsSection content={commodityDerivation} />
        <JourneyCtaSection />
      </main>
    </>
  );
}
