"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { communicationStandards } from "@/lib/commitment-data";

export default function CommitmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const grid = section.querySelector("[data-commitment-grid]");
    const cards = section.querySelectorAll("[data-commitment-card]");
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
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          once: true,
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (ScrollTrigger.isInViewport(grid, 0.12)) {
          tween.progress(1);
        }
      });
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
      id="commitment"
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <SectionHeader
        title="Our Commitment"
        description="Clear expectations for responsive, professional service—so you always know what to expect when working with Haria Investments."
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-commitment-grid
          className="grid gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {communicationStandards.map((item) => (
            <article
              key={item.id}
              data-commitment-card
              className="surface-panel group/commitment rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:border-charcoal/20 hover:shadow-[0_16px_48px_-20px_color-mix(in_srgb,var(--charcoal)_14%,transparent)]"
            >
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
