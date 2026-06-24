"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import type { CommodityPageContent } from "@/lib/commodities-data";
import { scheduleConsultation } from "@/lib/nav-links";

type CommodityHighlightsSectionProps = {
  content: CommodityPageContent;
};

export default function CommodityHighlightsSection({
  content,
}: CommodityHighlightsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const grid = section.querySelector("[data-commodity-grid]");
    const cards = section.querySelectorAll("[data-commodity-card]");
    if (!grid || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cards, { opacity: 0, y: 24 });

      const tween = gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          once: true,
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (ScrollTrigger.isInViewport(grid, 0.12)) {
          tween.progress(1);
        }
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <SectionHeader
        title={content.sectionTitle}
        description={content.sectionDescription}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-commodity-grid
          className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {content.highlights.map((item) => (
            <article
              key={item.id}
              data-commodity-card
              className="surface-panel group rounded-2xl p-6 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:border-charcoal/20 hover:shadow-[0_16px_48px_-20px_color-mix(in_srgb,var(--charcoal)_14%,transparent)] sm:p-7"
            >
              <span className="font-serif text-3xl font-semibold text-charcoal/25 transition-colors duration-300 group-hover:text-charcoal/40">
                {item.number}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl justify-center">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold"
          >
            {scheduleConsultation.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
