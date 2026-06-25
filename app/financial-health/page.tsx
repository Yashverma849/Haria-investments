import type { Metadata } from "next";
import AboutStackScroll from "@/components/about-stack-scroll";
import FinancialHealthForm from "@/components/financial-health-form";
import ServiceStackIntro from "@/components/service-stack-intro";
import { serviceIntros } from "@/lib/service-intro-data";

export const metadata: Metadata = {
  title: "Financial Health Assessment | Haria Investments",
  description:
    "Complete our comprehensive financial health questionnaire and receive personalized recommendations from Haria Investments experts.",
};

export default function FinancialHealthPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<ServiceStackIntro content={serviceIntros.financialHealth} />}
        legacy={<FinancialHealthForm />}
      />
    </main>
  );
}
