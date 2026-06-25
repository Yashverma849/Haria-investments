"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmcLogoMarquee from "@/components/amc-logo-marquee";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
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
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (header) {
        gsap.fromTo(
          header.querySelectorAll("[data-fade-item]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      if (marquee) {
        gsap.fromTo(
          marquee,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: marquee,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
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
      className="flex flex-col border-t border-charcoal/10 bg-surface pt-14 text-charcoal md:pt-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-4 lg:px-8 md:pb-5">
        <div
          data-mf-partners-header
          className="mx-auto max-w-2xl text-center"
        >
          <p
            data-fade-item
            className="text-fluid-stat font-serif font-semibold text-charcoal opacity-0"
          >
            {partnersSection.stat}
          </p>
          <p
            data-fade-item
            className="mt-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
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
      </div>

      <AmcLogoMarquee partners={amcPartners} onSurface />
    </section>
  );
}
