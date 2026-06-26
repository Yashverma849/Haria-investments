"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useState } from "react";
import type { CommodityHighlight } from "@/lib/commodities-data";
import { scheduleConsultation } from "@/lib/nav-links";

type CommodityAvenuesAccordionProps = {
  highlights: CommodityHighlight[];
};

export default function CommodityAvenuesAccordion({
  highlights,
}: CommodityAvenuesAccordionProps) {
  const groupId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleActivate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  return (
    <div
      data-commodity-grid
      className="protection-plans-accordion flex h-[min(32rem,72svh)] flex-row gap-3 overflow-x-auto overscroll-x-contain lg:overflow-x-visible"
      onMouseLeave={handleDeactivate}
    >
      {highlights.map((item) => {
        const isExpanded = activeId === item.id;
        const panelId = `${groupId}-${item.id}-panel`;

        return (
          <article
            key={item.id}
            data-commodity-card
            data-expanded={isExpanded ? "true" : "false"}
            className={`protection-plans-accordion-card group/avenue relative overflow-hidden rounded-2xl border border-charcoal/12 bg-charcoal text-white opacity-0 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.45)] ${
              isExpanded ? "is-expanded" : ""
            }`}
            onMouseEnter={() => handleActivate(item.id)}
            onFocus={() => handleActivate(item.id)}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget as Node | null)
              ) {
                handleDeactivate();
              }
            }}
            onClick={() => handleToggle(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleToggle(item.id);
              }
            }}
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={panelId}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover/avenue:scale-105 motion-reduce:transition-none"
                sizes="(max-width: 1024px) 100vw, 20vw"
              />
            ) : null}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15"
              aria-hidden
            />

            <div
              className={`protection-plans-accordion-collapsed absolute inset-y-0 right-0 flex items-center justify-end px-2 pr-2 transition-opacity duration-300 ${
                isExpanded ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              aria-hidden={isExpanded}
            >
              <span className="inline-flex min-h-[10rem] max-h-none items-center justify-center px-3 py-5 font-serif text-fluid-process-title font-semibold tracking-wide text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
                <span className="[writing-mode:vertical-rl] rotate-180">
                  {item.title}
                </span>
              </span>
            </div>

            <div
              id={panelId}
              className={`protection-plans-accordion-expanded absolute inset-0 flex flex-col justify-end overflow-y-auto p-5 transition-opacity duration-300 sm:p-6 ${
                isExpanded ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!isExpanded}
            >
              <span className="absolute right-4 top-4 font-serif text-2xl font-semibold text-white/35">
                {item.number}
              </span>

              <div className="mt-auto">
                <h3 className="font-serif text-fluid-process-title font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {item.description}
                </p>

                <Link
                  href={scheduleConsultation.href}
                  className="btn-primary mt-5 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02]"
                  onClick={(event) => event.stopPropagation()}
                >
                  {scheduleConsultation.label}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
