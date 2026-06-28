"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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

function BullionOfferingCard({ offering }: { offering: BullionOffering }) {
  return (
    <article
      data-bullion-card
      tabIndex={0}
      className="bullion-offering-card mf-fund-category-card group/bullion relative flex w-full flex-col self-start overflow-hidden rounded-2xl border border-charcoal/12 opacity-0 outline-none"
    >
      <div className="interactive-card-media" aria-hidden>
        <Image
          src={offering.image}
          alt=""
          fill
          className="object-cover opacity-70 motion-reduce:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="interactive-card-media__shade bg-charcoal/35 motion-reduce:opacity-100" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/88 via-charcoal/50 to-charcoal/15 motion-reduce:from-charcoal/92 motion-reduce:via-charcoal/62"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col p-5 sm:p-6 md:p-7">
        <div className="flex min-h-[11rem] flex-col justify-end sm:min-h-[12.5rem]">
          <span
            className={`inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeStyles[offering.badge]}`}
          >
            {offering.badge}
          </span>
          <h3 className="mt-3 font-serif text-fluid-process-title font-semibold text-white">
            {offering.title}
          </h3>
        </div>

        <div className="mf-fund-category-card__expand grid min-h-0 grid-rows-[0fr]">
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-5 pt-4 sm:space-y-6 sm:pt-5">
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                {offering.description}
              </p>

              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Tenure
                  </dt>
                  <dd className="mt-1 font-medium text-white">
                    {offering.tenure}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Min Amount
                  </dt>
                  <dd className="mt-1 font-medium text-white">
                    {offering.minAmount}
                  </dd>
                </div>
              </dl>

              <ul className="flex flex-wrap gap-2">
                {offering.benefits.map((benefit) => (
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
                >
                  Invest Now
                </Link>
                <Link
                  href={scheduleConsultation.href}
                  className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white transition-[transform,border-color,background-color] duration-300 hover:scale-[1.02] hover:border-white/50 hover:bg-white/20 sm:px-5 sm:py-2.5 sm:text-sm"
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

export default function BullionOfferingsSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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

      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
        <div
          data-bullion-grid
          className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {bullionOfferings.map((offering) => (
            <BullionOfferingCard key={offering.id} offering={offering} />
          ))}
        </div>
      </div>
    </section>
  );
}
