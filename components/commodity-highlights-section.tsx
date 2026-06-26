"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import type {
  CommodityHighlight,
  CommodityPageContent,
} from "@/lib/commodities-data";
import { scheduleConsultation } from "@/lib/nav-links";

type CommodityHighlightsSectionProps = {
  content: CommodityPageContent;
};

function CommodityGridCard({ item }: { item: CommodityHighlight }) {
  return (
    <article
      data-commodity-card
      className="surface-panel group relative overflow-hidden rounded-2xl p-6 opacity-0 backdrop-blur-sm transition-all duration-500 ease-out hover:z-10 hover:scale-[1.03] hover:border-charcoal/20 hover:shadow-[0_16px_48px_-20px_color-mix(in_srgb,var(--charcoal)_14%,transparent)] sm:p-7"
    >
      {item.image ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        >
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-background/55" />
        </div>
      ) : null}

      <div className="relative z-10">
        <span className="font-serif text-3xl font-semibold text-charcoal/25 transition-colors duration-500 group-hover:text-white/40">
          {item.number}
        </span>
        <h3 className="mt-3 font-serif text-xl font-semibold text-charcoal transition-colors duration-500 group-hover:text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75 transition-colors duration-500 group-hover:text-white/80">
          {item.description}
        </p>
      </div>
    </article>
  );
}

function CommodityExpandableCard({
  item,
  isExpanded,
  onActivate,
  onDeactivate,
}: {
  item: CommodityHighlight;
  isExpanded: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <article
      data-commodity-card
      data-expanded={isExpanded ? "true" : "false"}
      tabIndex={0}
      className={`commodity-highlight-card group/avenue relative flex w-full flex-col self-stretch overflow-hidden rounded-2xl border border-charcoal/12 opacity-0 outline-none ${
        isExpanded ? "is-expanded" : ""
      }`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget as Node | null)
        ) {
          onDeactivate();
        }
      }}
    >
      {item.image ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/avenue:scale-105 group-focus-within/avenue:scale-105 [.is-expanded_&]:scale-105 motion-reduce:transition-none"
            sizes="(max-width: 768px) 100vw, 42rem"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/20 transition-opacity duration-500 group-hover/avenue:from-charcoal/98 group-hover/avenue:via-charcoal/88 group-focus-within/avenue:from-charcoal/98 group-focus-within/avenue:via-charcoal/88 [.is-expanded_&]:from-charcoal/98 [.is-expanded_&]:via-charcoal/88 motion-reduce:from-charcoal/98 motion-reduce:via-charcoal/88" />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col p-5 sm:p-6 md:p-7">
        <div className="flex min-h-[9.5rem] flex-col justify-end sm:min-h-[10.5rem]">
          <span className="font-serif text-3xl font-semibold text-white/35 transition-colors duration-300 group-hover/avenue:text-white/50 [.is-expanded_&]:text-white/50">
            {item.number}
          </span>
          <h3 className="mt-2 font-serif text-fluid-process-title font-semibold text-white">
            {item.title}
          </h3>
        </div>

        <div className="commodity-highlight-card__expand grid min-h-0 grid-rows-[0fr]">
          <div className="min-h-0 overflow-hidden">
            <p className="pt-4 text-sm leading-relaxed text-white/80 sm:pt-5 sm:text-base">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CommodityHighlightsSection({
  content,
}: CommodityHighlightsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const isExpandable = content.cardLayout === "expandable";

  const handleActivate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveId(null);
  }, []);

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
      className="border-t border-charcoal/10 bg-surface py-20 text-charcoal md:py-28"
    >
      <SectionHeader
        onSurface
        title={content.sectionTitle}
        description={content.sectionDescription}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-commodity-grid
          className={
            isExpandable
              ? "mx-auto flex max-w-2xl flex-col gap-4 lg:max-w-3xl lg:gap-5"
              : "mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:gap-5"
          }
        >
          {content.highlights.map((item) =>
            isExpandable ? (
              <CommodityExpandableCard
                key={item.id}
                item={item}
                isExpanded={activeId === item.id}
                onActivate={() => handleActivate(item.id)}
                onDeactivate={handleDeactivate}
              />
            ) : (
              <CommodityGridCard key={item.id} item={item} />
            ),
          )}
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
