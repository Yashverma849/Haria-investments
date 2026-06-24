import type { Metadata } from "next";
import CommodityHighlightsSection from "@/components/commodity-highlights-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";
import { commoditySilverGold } from "@/lib/commodities-data";

export const metadata: Metadata = {
  title: "Silver & Gold | Haria Investments",
  description:
    "Invest in gold and silver through physical bullion, ETFs, sovereign bonds, and MCX instruments with expert guidance.",
};

export default function SilverGoldPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <ServicePageHero
          eyebrow={commoditySilverGold.eyebrow}
          title={commoditySilverGold.title}
          description={commoditySilverGold.description}
        />
        <CommodityHighlightsSection content={commoditySilverGold} />
        <JourneyCtaSection />
      </main>
    </>
  );
}
