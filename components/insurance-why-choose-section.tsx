"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  isInScrollFadeViewport,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_START,
  scheduleScrollFadeReveal,
} from "@/lib/gsap-scroll-fade";
import SectionHeader from "@/components/section-header";
import { whyChooseInsurance } from "@/lib/general-insurance-data";
import { scheduleConsultation } from "@/lib/nav-links";

export default function InsuranceWhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const grid = section.querySelector("[data-why-choose-grid]");
    const cards = section.querySelectorAll("[data-why-choose-card]");
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
        duration: SCROLL_FADE_DURATION,
        stagger: 0.08,
        ease: "power2.out",
        paused: true,
      });

      const revealCards = () => {
        tween.play();
      };

      ScrollTrigger.create({
        trigger: grid,
        start: SCROLL_FADE_START,
        once: true,
        onEnter: revealCards,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (isInScrollFadeViewport(grid)) {
          tween.progress(1);
        }
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
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <SectionHeader
        title={whyChooseInsurance.title}
        description={whyChooseInsurance.description}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-why-choose-grid
          className="mx-auto grid max-w-6xl items-start gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {whyChooseInsurance.items.map((item) => (
            <article
              key={item.id}
              data-why-choose-card
              tabIndex={0}
              className="insurance-why-choose-card surface-panel group/card relative flex h-fit flex-col overflow-hidden rounded-2xl opacity-0 outline-none"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100 motion-reduce:opacity-100"
                aria-hidden
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/92 via-charcoal/60 to-charcoal/40" />
              </div>

              <div className="relative z-10 flex min-h-0 flex-col">
                <div className="shrink-0 px-6 pt-6 pb-4 transition-colors duration-300 sm:px-7 group-hover/card:text-white group-focus-within/card:text-white motion-reduce:text-white">
                  <span className="font-serif text-3xl font-semibold text-charcoal/25 transition-colors duration-300 group-hover/card:text-white/45 group-focus-within/card:text-white/45 motion-reduce:text-white/45">
                    {item.number}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-charcoal transition-colors duration-300 sm:text-fluid-process-title group-hover/card:text-white group-focus-within/card:text-white motion-reduce:text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="insurance-why-choose-card__expand grid min-h-0 grid-rows-[0fr]">
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-6 pb-6 pt-1 sm:px-7">
                      <p className="text-sm leading-relaxed text-charcoal/75 sm:text-base group-hover/card:text-white/85 group-focus-within/card:text-white/85 motion-reduce:text-white/85">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl justify-center">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
