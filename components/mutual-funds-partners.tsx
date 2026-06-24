"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { amcPartners, partnersSection } from "@/lib/mutual-funds-data";

export default function MutualFundsPartners() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector("[data-mf-partners-header]");
    const logos = section.querySelectorAll("[data-mf-partner-logo]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([header, ...logos], { opacity: 1, y: 0 });
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

      gsap.fromTo(
        logos,
        { opacity: 0, y: 20, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-mf-partners-grid]"),
            start: "top 88%",
            once: true,
          },
        },
      );
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
      className="border-t border-white/10 bg-background pt-20 md:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-mf-partners-header
          className="mx-auto max-w-3xl text-center"
        >
          <p
            data-fade-item
            className="text-fluid-stat-large font-serif font-semibold text-white opacity-0"
          >
            {partnersSection.stat}
          </p>
          <p
            data-fade-item
            className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
          >
            {partnersSection.eyebrow}
          </p>
          <h2
            data-fade-item
            className="text-fluid-page mt-4 text-balance font-serif font-semibold tracking-tight text-white opacity-0"
          >
            {partnersSection.title}
          </h2>
          <p
            data-fade-item
            className="mt-4 text-base leading-relaxed text-white/70 opacity-0"
          >
            {partnersSection.description}
          </p>
        </div>

        <div
          data-mf-partners-grid
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:mt-16 lg:grid-cols-4"
        >
          {amcPartners.map((partner) => (
            <div
              key={partner.id}
              data-mf-partner-logo
              className="surface-panel flex min-h-[5.5rem] items-center justify-center rounded-2xl px-4 py-6 opacity-0"
              title={partner.name}
            >
              <span className="text-center font-serif text-lg font-semibold tracking-wide text-charcoal sm:text-xl">
                {partner.shortName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
