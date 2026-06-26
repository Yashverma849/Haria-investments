"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmcLogoMarquee from "@/components/amc-logo-marquee";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  fadeInOnScroll,
  scheduleScrollFadeReveal,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_START,
} from "@/lib/gsap-scroll-fade";
import { amcPartners, partnersSection } from "@/lib/mutual-funds-data";

export default function MutualFundsPartners() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector("[data-mf-partners-header]");
    const marquee = section.querySelector("[data-mf-partners-marquee]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([header, marquee], { opacity: 1, y: 0 });
      if (header) {
        gsap.set(header.querySelectorAll("[data-fade-item]"), {
          opacity: 1,
          y: 0,
        });
      }
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (header) {
        fadeInOnScroll(header.querySelectorAll("[data-fade-item]"), {
          trigger: header,
          start: SCROLL_FADE_START,
          duration: SCROLL_FADE_DURATION,
          stagger: 0.08,
          y: 20,
        });
      }

      if (marquee) {
        fadeInOnScroll(marquee, {
          trigger: marquee,
          start: SCROLL_FADE_START,
          duration: SCROLL_FADE_DURATION,
          y: 16,
        });
      }

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
      className="border-t border-charcoal/10 bg-transparent py-20 text-charcoal md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div data-mf-partners-header className="max-w-xl text-left">
            <p
              data-fade-item
              className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/55 opacity-0"
            >
              {partnersSection.eyebrow}
            </p>
            <h2
              data-fade-item
              className="text-fluid-process-title mt-3 text-balance font-serif font-semibold tracking-tight text-charcoal opacity-0"
            >
              {partnersSection.title}
            </h2>
            <p
              data-fade-item
              className="mt-3 text-sm leading-relaxed text-charcoal/70 opacity-0 sm:text-base"
            >
              {partnersSection.description}
            </p>
          </div>

          <AmcLogoMarquee
            partners={amcPartners}
            direction="vertical"
            backgroundImage="/images/heroes/hero-mutual-funds.jpg"
          />
        </div>
      </div>
    </section>
  );
}
