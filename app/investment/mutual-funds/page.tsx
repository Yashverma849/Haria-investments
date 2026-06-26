import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import JourneyCtaSection from "@/components/journey-cta-section";
import MutualFundsCategories from "@/components/mutual-funds-categories";
import MutualFundsNavTable from "@/components/mutual-funds-nav-table";
import MutualFundsPartners from "@/components/mutual-funds-partners";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Mutual Funds | Haria Investments",
  description:
    "Explore equity, debt, hybrid, and international mutual funds from trusted AMCs. Choose the right fund type based on your goals and risk appetite.",
};

export default function MutualFundsPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.mutualFunds} />}
        legacy={
          <>
            <MutualFundsCategories />
            <MutualFundsPartners />
            <MutualFundsNavTable />
            <JourneyCtaSection tone="light" />
          </>
        }
      />
    </main>
  );
}
