import type { Metadata } from "next";
import FinancialHealthForm from "@/components/financial-health-form";
import Navbar from "@/components/navbar";
import ServicePageHero from "@/components/service-page-hero";
import { financialHealthHero } from "@/lib/financial-health-data";

export const metadata: Metadata = {
  title: "Financial Health Form | Haria Investments",
  description:
    "Assess your financial wellness and share your goals with Haria Investments for a personalized review.",
};

export default function FinancialHealthPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background pb-20 md:pb-28">
        <ServicePageHero
          eyebrow={financialHealthHero.eyebrow}
          title={financialHealthHero.title}
          description={financialHealthHero.description}
        />
        <FinancialHealthForm />
      </main>
    </>
  );
}
