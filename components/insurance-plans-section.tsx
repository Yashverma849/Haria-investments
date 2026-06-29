"use client";

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
import GeneralInsurancePlansAccordion from "@/components/general-insurance-plans-accordion";
import SectionHeader from "@/components/section-header";
import { allInsurancePlans } from "@/lib/general-insurance-data";

export default function InsurancePlansSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-plan-card]");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(cards, {
        trigger: section.querySelector("[data-plans-grid]"),
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.06,
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
      id="coverage-plans"
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface pt-20 text-charcoal md:pt-28"
    >
      <div className="section-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          Coverage Plans
        </p>
      </div>

      <SectionHeader
        onSurface
        title="Explore by Category"
        description="Motor, fire, property, and travel — every plan for each category in one view."
        className="pt-4"
      />

      <div className="section-shell pb-20 md:pb-28">
        <GeneralInsurancePlansAccordion plans={allInsurancePlans} />
      </div>
    </section>
  );
}
