"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq-data";

type FaqFlipCardProps = {
  item: FaqItem;
};

export default function FaqFlipCard({ item }: FaqFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      aria-expanded={flipped}
      aria-label={`${item.question}. ${flipped ? "Hide answer" : "Show answer"}`}
      className="flip-card group h-full w-full text-left"
    >
      <div className={`flip-card-inner min-h-[240px] ${flipped ? "is-flipped" : ""}`}>
        <div className="flip-card-face flip-card-front flex min-h-[240px] flex-col rounded-2xl border border-charcoal/10 bg-surface p-6 transition-colors group-hover:border-charcoal/20 sm:p-7">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/55">
            Question
          </span>
          <h2 className="mt-3 font-serif text-xl font-semibold leading-snug text-charcoal">
            {item.question}
          </h2>
        </div>

        <div className="flip-card-face flip-card-back flex min-h-[240px] flex-col rounded-2xl border border-charcoal/15 bg-surface p-6 sm:p-7">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/55">
            Answer
          </span>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/80 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </button>
  );
}
