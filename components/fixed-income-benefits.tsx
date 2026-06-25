"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
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
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-fi-benefits-grid]"),
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
          className="mx-auto grid max-w-5xl gap-5 lg:gap-6"
        >
          {ladderBenefits.map((benefit) => (
            <article
              key={benefit.number}
              data-fi-benefit-card
              className="surface-panel flex gap-5 rounded-2xl p-6 backdrop-blur-sm md:gap-8 md:p-8"
            >
              <span
                className="font-serif text-3xl font-semibold text-charcoal/25 md:text-4xl"
                aria-hidden
              >
                {benefit.number}
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-charcoal md:text-2xl">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75 md:text-base">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl text-center">
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
