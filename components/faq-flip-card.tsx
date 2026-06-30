"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq-data";

type FaqCardProps = {
  item: FaqItem;
};

export default function FaqFlipCard({ item }: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-faq-card-item
      className="group overflow-hidden rounded-xl border border-charcoal/15 bg-white text-charcoal shadow-md transition-all duration-300 hover:border-charcoal/35 hover:shadow-xl"
    >
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`${item.question}. ${isOpen ? "Collapse answer" : "Expand answer"}`}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6 cursor-pointer"
      >
        <span className="font-serif text-base font-semibold leading-snug text-charcoal sm:text-lg">
          {item.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-charcoal/20 bg-charcoal/5 text-charcoal transition-all duration-300 group-hover:border-charcoal/40 group-hover:bg-charcoal/10 ${
            isOpen ? "rotate-180 bg-charcoal/15 border-charcoal/40" : ""
          }`}
          aria-hidden
        >
          <svg
            className="h-4 w-4 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-charcoal/10 p-5 pt-4 text-sm leading-relaxed text-charcoal/80 sm:p-6 sm:pt-4 sm:text-base">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
