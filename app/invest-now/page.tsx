import type { Metadata } from "next";
import { Suspense } from "react";
import InvestNowPageContent from "@/components/invest-now-page-content";

export const metadata: Metadata = {
  title: "Invest Now | Haria Investments",
  description:
    "Start your investment journey with Haria Investments. Customize your tenure and investment amount to apply.",
};

export default function InvestNowPage() {
  return (
    <main className="bg-surface min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-surface">
            <div className="text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-charcoal border-t-transparent mx-auto mb-4"></div>
              <p className="text-charcoal/60 text-sm">Loading details...</p>
            </div>
          </div>
        }
      >
        <InvestNowPageContent />
      </Suspense>
    </main>
  );
}
