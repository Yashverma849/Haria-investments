"use client";

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
  derivativesApproachSection,
  derivativesApproachSteps,
} from "@/lib/derivatives-approach-data";
import { scheduleConsultation } from "@/lib/nav-links";

export default function DerivativesApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const steps = section.querySelectorAll("[data-approach-step]");
    if (steps.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(steps, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(steps, {
        trigger: section.querySelector("[data-approach-list]"),
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.12,
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
      <div className="section-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          {derivativesApproachSection.eyebrow}
        </p>
      </div>

      <SectionHeader
        onSurface
        title={derivativesApproachSection.title}
        description={derivativesApproachSection.description}
        className="pt-4"
      />

      <div className="section-shell pb-20 md:pb-28">
        <ol
          data-approach-list
          className="divide-y divide-charcoal/10"
        >
          {derivativesApproachSteps.map((step) => (
            <li
              key={step.id}
              data-approach-step
              className="relative -mx-3 overflow-hidden rounded-xl px-3 opacity-0 sm:-mx-4 sm:px-4"
            >
              <div
                className="approach-cloud-hover pointer-events-none absolute inset-0"
                aria-hidden
              >
                <span className="approach-cloud-blob approach-cloud-blob--1" />
                <span className="approach-cloud-blob approach-cloud-blob--2" />
                <span className="approach-cloud-blob approach-cloud-blob--3" />
              </div>

              <div className="relative z-10 flex items-start gap-5 py-7 sm:gap-8 sm:py-8">
                <span
                  aria-hidden
                  className="shrink-0 font-serif text-3xl font-semibold tabular-nums text-charcoal/25 sm:text-4xl"
                >
                  {step.number}
                </span>
                <p className="pt-1 text-base leading-relaxed text-charcoal/80 sm:text-fluid-process-body">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            {derivativesApproachSection.ctaLabel}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-charcoal/45">
            {derivativesApproachSection.categoryLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
