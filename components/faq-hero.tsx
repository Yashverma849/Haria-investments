"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FaqHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll("[data-faq-hero]");

    gsap.fromTo(
      items,
      { x: -56, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.14,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/10 bg-surface/40 pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--blue)_18%,transparent),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <p
          data-faq-hero
          className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
        >
          Questions & Answers
        </p>
        <h1
          data-faq-hero
          className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-white opacity-0 sm:text-5xl lg:text-6xl"
        >
          Frequently Asked Questions
        </h1>
        <p
          data-faq-hero
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 opacity-0 sm:text-lg"
        >
          Clear answers on our services, process, and how we help you protect
          and grow your wealth.
        </p>
      </div>
    </section>
  );
}
