"use client";

import SectionHeader from "@/components/section-header";
import ValuesShowcase from "@/components/values-showcase";

export default function ValuesSection() {
  return (
    <section
      id="values"
      className="border-t border-white/10 bg-background"
    >
      <SectionHeader
        title="Our Values"
        description="At Haria Investments, our values guide every interaction with clients, prospects, and the community. They are the foundation of the trust we've built over generations."
        className="py-20 md:py-28 lg:pb-16"
      />

      <ValuesShowcase />
    </section>
  );
}
