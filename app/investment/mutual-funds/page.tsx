import type { Metadata } from "next";
import JourneyCtaSection from "@/components/journey-cta-section";
import MutualFundsCategories from "@/components/mutual-funds-categories";
import MutualFundsHero from "@/components/mutual-funds-hero";
import MutualFundsNavTable from "@/components/mutual-funds-nav-table";
import MutualFundsPartners from "@/components/mutual-funds-partners";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Mutual Funds | Haria Investments",
  description:
    "Explore equity, debt, hybrid, and international mutual funds from 45+ trusted AMCs. Choose the right fund type based on your goals and risk appetite.",
};

export default function MutualFundsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <MutualFundsHero />
        <MutualFundsCategories />
        <MutualFundsPartners />
        <MutualFundsNavTable />
        <JourneyCtaSection />
      </main>
    </>
  );
}
