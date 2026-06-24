"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { lifeInsuranceTestimonials } from "@/lib/life-insurance-data";

type TestimonialCardProps = {
  name: string;
  role: string;
  initials: string;
  excerpt: string;
  fullQuote: string;
};

function TestimonialCard({
  name,
  role,
  initials,
  excerpt,
  fullQuote,
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="surface-panel flex h-full flex-col rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/20 text-sm font-semibold text-brand-light">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-charcoal">{name}</p>
            <p className="text-sm text-charcoal/60">{role}</p>
          </div>
        </div>
        <svg
          className="h-5 w-5 shrink-0 text-charcoal/20"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.45l.813 1.28C6.667 7.651 5.5 9.965 5.5 12.5c0 1.58.462 2.85 1.433 3.893L4.583 17.32zm12.834 0c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.45l.814 1.28c-2.676 1.81-3.843 4.124-3.843 6.659 0 1.58.463 2.85 1.434 3.893l-1.852 1.928z" />
        </svg>
      </div>

      <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-charcoal/80 md:text-base">
        <p>{expanded ? fullQuote : excerpt}</p>
      </blockquote>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-4 self-start text-sm font-semibold text-brand-light transition-colors hover:text-brand"
        aria-expanded={expanded}
      >
        {expanded ? "Show Less" : "Read More"}
      </button>
    </article>
  );
}

export default function LifeInsuranceTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-li-testimonial]");
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
            trigger: section.querySelector("[data-li-testimonials-grid]"),
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
      className="border-t border-white/10 bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-li-testimonials-grid
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8"
        >
          {lifeInsuranceTestimonials.map((item) => (
            <div key={item.id} data-li-testimonial>
              <TestimonialCard
                name={item.name}
                role={item.role}
                initials={item.initials}
                excerpt={item.excerpt}
                fullQuote={item.fullQuote}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
