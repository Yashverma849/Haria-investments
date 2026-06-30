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
import SectionHeader from "@/components/section-header";
import {
  bullionOfferings,
  bullionOfferingsSection,
  type BullionBadge,
  type BullionOffering,
} from "@/lib/bullion-offerings-data";
import { scheduleConsultation } from "@/lib/nav-links";

const badgeStyles: Record<BullionBadge, string> = {
  "Risk Managed": "border-white/25 bg-white/10 text-white",
  Liquid: "border-white/22 bg-white/9 text-white/95",
  Disciplined: "border-white/20 bg-white/8 text-white/90",
};

function BullionCardPanel({ offering }: { offering: BullionOffering }) {
  return (
    <div className="mf-fund-category-card__panel-inner">
      <div className="mf-fund-category-card__panel-header">
        <p className="text-fluid-process-body text-white/80">
          {offering.description}
        </p>

        <dl className="mf-fund-category-card__panel-meta">
          <div>
            <dt className="text-fluid-stat-label font-semibold uppercase tracking-[0.2em] text-white/45">
              Tenure
            </dt>
            <dd className="mt-0.5 text-fluid-stat-label font-medium text-white sm:text-fluid-process-body">
              {offering.tenure}
            </dd>
          </div>
          <div>
            <dt className="text-fluid-stat-label font-semibold uppercase tracking-[0.2em] text-white/45">
              Min Amount
            </dt>
            <dd className="mt-0.5 text-fluid-stat-label font-medium text-white sm:text-fluid-process-body">
              {offering.minAmount}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mf-fund-category-card__panel-footer flex flex-col items-stretch gap-3">
        <ul className="flex min-w-0 flex-wrap gap-1.5">
          {offering.benefits.map((benefit) => (
            <li
              key={benefit}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-fluid-stat-label font-medium text-white/70"
            >
              {benefit}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2 w-full">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary inline-flex flex-1 min-w-[120px] items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-fluid-stat-label font-semibold sm:px-5 sm:py-2.5 sm:text-sm"
            onClick={(event) => event.stopPropagation()}
          >
            Invest Now
          </Link>
          <Link
            href={scheduleConsultation.href}
            className="inline-flex flex-1 min-w-[150px] items-center justify-center whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-fluid-stat-label font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 sm:px-4 sm:py-2 sm:text-xs"
            onClick={(event) => event.stopPropagation()}
          >
            {scheduleConsultation.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

function BullionOfferingCard({
  offering,
  isExpanded,
  onActivate,
  onDeactivate,
}: {
  offering: BullionOffering;
  isExpanded: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <div
      data-bullion-card
      data-expanded={isExpanded ? "true" : "false"}
      tabIndex={0}
      aria-expanded={isExpanded}
      className={`mf-fund-category-card-wrap group/bullion relative opacity-0 outline-none ${
        isExpanded ? "is-expanded" : ""
      }`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onDeactivate();
        }
      }}
    >
      <article className="mf-fund-category-card relative flex h-[var(--mf-card-height,260px)] min-h-[220px] sm:min-h-[240px] w-full flex-col overflow-hidden rounded-2xl border border-charcoal/12">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={offering.image}
            alt=""
            fill
            className="object-cover opacity-75 transition-transform duration-700 ease-out group-hover/bullion:scale-105 group-focus-within/bullion:scale-105 [.is-expanded_&]:scale-105 motion-reduce:transition-none"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/25 transition-opacity duration-500 group-hover/bullion:from-charcoal/98 group-hover/bullion:via-charcoal/88 group-focus-within/bullion:from-charcoal/98 group-focus-within/bullion:via-charcoal/88 [.is-expanded_&]:from-charcoal/98 motion-reduce:from-charcoal/98 motion-reduce:via-charcoal/88" />
        </div>

        <div className="relative z-10 mt-auto flex flex-col p-4 sm:p-5">
          <span
            className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-fluid-stat-label font-semibold uppercase tracking-[0.18em] ${badgeStyles[offering.badge]}`}
          >
            {offering.badge}
          </span>
          <h3 className="mt-2 font-serif text-fluid-process-title font-semibold leading-tight text-white">
            {offering.title}
          </h3>
        </div>
      </article>

      <div
        className="mf-fund-category-card__panel absolute left-0 right-0 top-full z-30 mt-1.5 rounded-2xl border border-white/15 bg-charcoal/97 p-3 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md sm:mt-2 sm:p-4"
        aria-hidden={!isExpanded}
      >
        <BullionCardPanel offering={offering} />
      </div>
    </div>
  );
}

export default function BullionOfferingsSection() {
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

    const cards = section.querySelectorAll("[data-bullion-card]");
    const grid = section.querySelector("[data-bullion-grid]");
    if (!grid || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(cards, {
        trigger: grid,
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.08,
        y: 24,
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
    <section
      ref={sectionRef}
      className="border-t border-charcoal/10 bg-surface pt-20 text-charcoal md:pt-28"
    >
      <div className="section-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          {bullionOfferingsSection.eyebrow}
        </p>
      </div>

      <SectionHeader
        onSurface
        title={bullionOfferingsSection.title}
        description={bullionOfferingsSection.description}
        className="pt-4"
      />

      <div className="section-shell pb-20 md:pb-28">
        <div
          data-bullion-grid
          className="grid grid-cols-1 items-start gap-4 overflow-visible sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {bullionOfferings.map((offering) => (
            <BullionOfferingCard
              key={offering.id}
              offering={offering}
              isExpanded={activeId === offering.id}
              onActivate={() => handleActivate(offering.id)}
              onDeactivate={handleDeactivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
