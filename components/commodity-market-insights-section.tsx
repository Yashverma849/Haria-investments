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
  commodityMarketInsights,
  commodityMarketInsightsSection,
} from "@/lib/commodity-trading-data";
import { scheduleConsultation } from "@/lib/nav-links";

export default function CommodityMarketInsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-market-insight-card]");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(cards, {
        trigger: section.querySelector("[data-market-insights-grid]"),
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
      className="border-t border-charcoal/10 bg-surface pt-20 text-charcoal md:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          {commodityMarketInsightsSection.eyebrow}
        </p>
      </div>

      <SectionHeader
        onSurface
        title={commodityMarketInsightsSection.title}
        description={commodityMarketInsightsSection.description}
        className="pt-4"
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
        <div
          data-market-insights-grid
          className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {commodityMarketInsights.map((item) => (
            <article
              key={item.id}
              data-market-insight-card
              tabIndex={0}
              className="surface-panel group/card relative flex min-h-[12rem] flex-col justify-end overflow-hidden rounded-2xl p-6 opacity-0 outline-none sm:min-h-[14rem] sm:p-7"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100 motion-reduce:opacity-100"
                aria-hidden
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal/55" />
              </div>

              <div className="relative z-10 flex flex-col">
                <h3 className="font-serif text-xl font-semibold text-charcoal transition-colors duration-500 group-hover/card:text-white group-focus-within/card:text-white motion-reduce:text-white sm:text-fluid-service-title">
                  {item.title}
                </h3>
                <Link
                  href={scheduleConsultation.href}
                  className="mt-4 inline-flex w-fit items-center justify-center rounded-full border border-charcoal/20 px-5 py-2 text-sm font-semibold text-charcoal transition-[color,border-color,background-color] duration-500 group-hover/card:border-white/35 group-hover/card:bg-white/10 group-hover/card:text-white group-focus-within/card:border-white/35 group-focus-within/card:bg-white/10 group-focus-within/card:text-white motion-reduce:border-white/35 motion-reduce:bg-white/10 motion-reduce:text-white"
                >
                  Explore Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
