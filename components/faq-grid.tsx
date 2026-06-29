"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import FaqFlipCard from "@/components/faq-flip-card";
import type { FaqItem } from "@/lib/faq-data";
import { fadeInOnScroll, SCROLL_FADE_DURATION, SCROLL_FADE_START } from "@/lib/gsap-scroll-fade";

type FaqGridProps = {
  previewItems: FaqItem[];
  extraItems: FaqItem[];
  isExpanded: boolean;
};

export default function FaqGrid({ previewItems, extraItems, isExpanded }: FaqGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-faq-card]");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(cards, {
        trigger: grid,
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.08,
        y: 20,
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === grid) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={gridRef} className="max-w-4xl mx-auto w-full space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-6">
        {previewItems.map((item) => (
          <div key={item.id} data-faq-card className="opacity-0">
            <FaqFlipCard item={item} />
          </div>
        ))}
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-4 sm:gap-6 pt-4 sm:pt-6">
            {extraItems.map((item, idx) => (
              <div
                key={item.id}
                className={`transition-all duration-500 ease-out ${
                  isExpanded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                style={{
                  transitionDelay: isExpanded ? `${idx * 75}ms` : "0ms",
                }}
              >
                <FaqFlipCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
