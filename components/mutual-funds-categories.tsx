"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, startTransition, useCallback, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  fadeInOnScroll,
  scheduleScrollFadeReveal,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_START,
} from "@/lib/gsap-scroll-fade";
import {
  fundCategories,
  type FundCategory,
  type RiskLevel,
} from "@/lib/mutual-funds-data";
import { scheduleConsultation } from "@/lib/nav-links";

const riskBadgeStyles: Record<RiskLevel, string> = {
  "High Risk": "border-red-400/30 bg-red-500/20 text-red-200",
  "Low Risk": "border-emerald-400/30 bg-emerald-500/20 text-emerald-200",
  "Moderate Risk": "border-amber-400/30 bg-amber-500/20 text-amber-200",
};

type FundAccordionCardProps = {
  fund: FundCategory;
  isExpanded: boolean;
  panelId: string;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
  onToggle: (id: string) => void;
};

const FundAccordionCard = memo(function FundAccordionCard({
  fund,
  isExpanded,
  panelId,
  onActivate,
  onDeactivate,
  onToggle,
}: FundAccordionCardProps) {
  return (
    <article
      data-plan-card
      data-expanded={isExpanded ? "true" : "false"}
      className={`protection-plans-accordion-card group/plan relative overflow-hidden rounded-2xl border border-charcoal/12 bg-charcoal text-white shadow-[0_18px_48px_-24px_rgba(0,0,0,0.45)] ${
        isExpanded ? "is-expanded" : ""
      }`}
      onMouseEnter={() => onActivate(fund.id)}
      onFocus={() => onActivate(fund.id)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onDeactivate();
        }
      }}
      onClick={() => onToggle(fund.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle(fund.id);
        }
      }}
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
    >
      <div className="interactive-card-media" aria-hidden>
        <Image
          src={fund.image}
          alt=""
          fill
          className="object-cover motion-reduce:scale-105"
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"
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
            {fund.title}
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
        <span
          className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
            riskBadgeStyles[fund.risk]
          }`}
        >
          {fund.risk}
        </span>

        <div className="mt-auto">
          <h3 className="font-serif text-fluid-process-title font-semibold text-white">
            {fund.title}
          </h3>

          <p className="mt-1.5 text-xs text-white/80 sm:text-sm">
            {fund.description}
          </p>

          <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-white/75">
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-white/90">Tenure:</dt>
              <dd>{fund.tenure}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-white/90">Min Amount:</dt>
              <dd>{fund.minAmount}</dd>
            </div>
          </dl>

          <div className="mt-3 space-y-2 max-h-44 overflow-y-auto pr-1">
            {fund.classifications.map((group) => (
              <div key={group.title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-brand-light">
                  {group.title}
                </h4>
                <div className="mt-1 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {group.note ? (
                  <p className="mt-1 text-[10px] italic leading-tight text-white/60">
                    {group.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {fund.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/80"
              >
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href={`/invest-now?title=${encodeURIComponent(fund.title)}&tenure=${encodeURIComponent(fund.tenure)}&minAmount=${encodeURIComponent(fund.minAmount)}&service=investment`}
              className="btn-primary inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold transition-transform duration-300 hover:scale-[1.02] sm:px-6 sm:py-2.5 sm:text-sm"
              onClick={(event) => event.stopPropagation()}
            >
              Invest Now
            </Link>
            <Link
              href={scheduleConsultation.href}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/50 hover:bg-white/15 sm:px-5 sm:py-2.5 sm:text-sm"
              onClick={(event) => event.stopPropagation()}
            >
              {scheduleConsultation.label}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
});

export default function MutualFundsCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);

  const handleActivate = useCallback((id: string) => {
    if (activeIdRef.current === id) return;
    activeIdRef.current = id;
    startTransition(() => setActiveId(id));
  }, []);

  const handleDeactivate = useCallback(() => {
    if (activeIdRef.current === null) return;
    activeIdRef.current = null;
    startTransition(() => setActiveId(null));
  }, []);

  const handleToggle = useCallback((id: string) => {
    startTransition(() => {
      setActiveId((current) => {
        const next = current === id ? null : id;
        activeIdRef.current = next;
        return next;
      });
    });
  }, []);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-plan-card]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(cards, {
        trigger: section.querySelector("[data-mf-fund-grid]"),
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.08,
        y: 28,
      });

      scheduleScrollFadeReveal(section);
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
    <section ref={sectionRef} className="bg-background py-16 md:py-24">
      <div className="section-shell">
        <div
          data-mf-fund-grid
          className="protection-plans-accordion flex h-[min(34rem,75svh)] flex-row gap-3 overflow-x-auto overscroll-x-contain lg:overflow-x-visible"
          onMouseLeave={handleDeactivate}
        >
          {fundCategories.map((fund) => {
            const isExpanded = activeId === fund.id;
            const panelId = `${groupId}-${fund.id}-panel`;

            return (
              <FundAccordionCard
                key={fund.id}
                fund={fund}
                isExpanded={isExpanded}
                panelId={panelId}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
                onToggle={handleToggle}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
