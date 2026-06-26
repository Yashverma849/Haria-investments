"use client";

import { useState } from "react";
import FaqGrid from "@/components/faq-grid";
import SectionHeader from "@/components/section-header";
import { faqItems } from "@/lib/faq-data";

const FAQ_PREVIEW_COUNT = 4;

export default function FaqSection() {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded
    ? faqItems
    : faqItems.slice(0, FAQ_PREVIEW_COUNT);
  const hasMore = faqItems.length > FAQ_PREVIEW_COUNT;

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface py-20 md:py-28"
    >
      <SectionHeader
        onSurface
        title="FAQ"
        description="Clear answers on our services, process, and how we help you protect and grow your wealth."
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FaqGrid items={visibleItems} />

        {hasMore ? (
          <div className="mt-10 flex justify-center md:mt-12">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="group inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-charcoal/5 px-7 py-3 text-sm font-semibold text-charcoal backdrop-blur-sm transition-all hover:border-charcoal/35 hover:bg-charcoal/10"
            >
              {expanded ? "Show less" : "Read more"}
              <span
                className={`transition-transform duration-300 group-hover:translate-x-1 ${expanded ? "rotate-90" : ""}`}
                aria-hidden
              >
                {expanded ? "↑" : "→"}
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
