"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
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

const riskStyles: Record<RiskLevel, string> = {
  "High Risk": "border-white/25 bg-white/10 text-white",
  "Low Risk": "border-white/20 bg-white/8 text-white/90",
  "Moderate Risk": "border-white/22 bg-white/9 text-white/95",
};

function FundCard({
  fund,
  isExpanded,
  onActivate,
  onDeactivate,
}: {
  fund: FundCategory;
  isExpanded: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <article
      data-mf-fund-card
      data-expanded={isExpanded ? "true" : "false"}
      tabIndex={0}
      className={`mf-fund-category-card group/fund relative flex w-full flex-col self-start overflow-hidden rounded-2xl border border-white/10 opacity-0 outline-none ${
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
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={fund.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover/fund:scale-105 group-focus-within/fund:scale-105 [.is-expanded_&]:scale-105 motion-reduce:transition-none"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/25 transition-opacity duration-500 group-hover/fund:from-charcoal/98 group-hover/fund:via-charcoal/88 group-focus-within/fund:from-charcoal/98 group-focus-within/fund:via-charcoal/88 [.is-expanded_&]:from-charcoal/98 [.is-expanded_&]:via-charcoal/88 motion-reduce:from-charcoal/98 motion-reduce:via-charcoal/88" />
      </div>

      <div className="relative z-10 flex flex-col p-5 sm:p-6 md:p-7">
        <div className="flex min-h-[11rem] flex-col justify-end sm:min-h-[12.5rem]">
          <span
            className={`inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${riskStyles[fund.risk]}`}
          >
            {fund.risk}
          </span>
          <h3 className="mt-3 font-serif text-fluid-process-title font-semibold text-white">
            {fund.title}
          </h3>
        </div>

        <div className="mf-fund-category-card__expand grid min-h-0 grid-rows-[0fr]">
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-5 pt-4 sm:space-y-6 sm:pt-5">
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                {fund.description}
              </p>

              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Tenure
                  </dt>
                  <dd className="mt-1 font-medium text-white">{fund.tenure}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Min Amount
                  </dt>
                  <dd className="mt-1 font-medium text-white">
                    {fund.minAmount}
                  </dd>
                </div>
              </dl>

              <div className="space-y-4">
                {fund.classifications.map((group) => (
                  <div key={group.title}>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                      {group.title}
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    {group.note ? (
                      <p className="mt-2 text-xs leading-relaxed text-white/55">
                        {group.note}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <ul className="flex flex-wrap gap-2">
                {fund.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Link
                  href={scheduleConsultation.href}
                  className="btn-primary inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold sm:px-6"
                  onClick={(event) => event.stopPropagation()}
                >
                  Invest Now
                </Link>
                <Link
                  href={scheduleConsultation.href}
                  className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 sm:px-5 sm:py-2.5 sm:text-sm"
                  onClick={(event) => event.stopPropagation()}
                >
                  {scheduleConsultation.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MutualFundsCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

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

    const cards = section.querySelectorAll("[data-mf-fund-card]");

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
    <section ref={sectionRef} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-mf-fund-grid
          className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
        >
          {fundCategories.map((fund) => (
            <FundCard
              key={fund.id}
              fund={fund}
              isExpanded={activeId === fund.id}
              onActivate={() => handleActivate(fund.id)}
              onDeactivate={handleDeactivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
