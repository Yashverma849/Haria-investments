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
import { ladderBenefits } from "@/lib/fixed-income-data";
import { scheduleConsultation } from "@/lib/nav-links";

export default function FixedIncomeBenefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-fi-benefit-card]");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(cards, {
        trigger: section.querySelector("[data-fi-benefits-grid]"),
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.08,
        y: 20,
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
      className="border-t border-white/10 bg-background py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light">
          Benefits of Laddering
        </p>
      </div>
      <SectionHeader
        title="Strategic Advantages"
        description="Strategic advantages of a well-planned laddering approach"
        className="!pb-12 md:!pb-16"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-fi-benefits-grid
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5"
        >
          {ladderBenefits.map((benefit) => (
            <article
              key={benefit.number}
              data-fi-benefit-card
              tabIndex={0}
              className="fi-ladder-benefit-card surface-panel group/card relative flex aspect-square flex-col overflow-hidden rounded-2xl outline-none"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100 motion-reduce:opacity-100"
                aria-hidden
              >
                <Image
                  src={benefit.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/92 via-charcoal/60 to-charcoal/40" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                <span
                  className="font-serif text-3xl font-semibold text-charcoal/25 transition-colors duration-300 group-hover/card:text-white/45 group-focus-within/card:text-white/45 motion-reduce:text-white/45 sm:text-4xl"
                  aria-hidden
                >
                  {benefit.number}
                </span>
                <div>
                  <h3 className="font-serif text-fluid-service-title font-semibold text-charcoal transition-colors duration-300 group-hover/card:text-white group-focus-within/card:text-white motion-reduce:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/75 transition-colors duration-300 group-hover/card:text-white/85 group-focus-within/card:text-white/85 motion-reduce:text-white/85 sm:text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-6xl text-center">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            Plan Your Ladder Strategy
          </Link>
        </div>
      </div>
    </section>
  );
}
