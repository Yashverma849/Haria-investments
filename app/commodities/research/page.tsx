import type { Metadata } from "next";
import { Suspense } from "react";
import ResearchContent from "./research-content";

export const metadata: Metadata = {
  title: "Research & Market Insights | Haria Investments",
  description:
    "Access institutional-grade technical analysis, comprehensive market reports, and short-term trading signals from the Haria Investments research team.",
};

export default function ResearchPage() {
  return (
    <main className="bg-background min-h-screen text-white pt-24 pb-20 md:pb-28">
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        }
      >
        <ResearchContent />
      </Suspense>
    </main>
  );
}
