"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { ladderYears } from "@/lib/fixed-income-data";

export default function FixedIncomeLadder() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-fi-ladder-card]");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-fi-ladder-grid]"),
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
      id="laddering"
      className="scroll-mt-24 border-t border-white/10 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light">
          Investment Strategy
        </p>
      </div>
      <SectionHeader
        title="Laddering Strategy"
        description="Optimize your returns with systematic investment laddering"
        className="!pb-12 md:!pb-16"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-fi-ladder-grid
          className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
        >
          {ladderYears.map((item) => (
            <article
              key={item.year}
              data-fi-ladder-card
              className="surface-panel rounded-2xl p-5 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                Year {item.year}
              </p>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-charcoal/55">
                    Amount
                  </dt>
                  <dd className="mt-1 text-fluid-stat font-semibold text-charcoal">
                    {item.amount}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-charcoal/55">
                    Rate
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-charcoal">
                    {item.rate}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-charcoal/55">
                    Maturity
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-charcoal">
                    {item.maturity}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
