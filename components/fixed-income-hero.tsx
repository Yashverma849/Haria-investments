"use client";

import { useRef } from "react";
import gsap from "gsap";
import PageHeroBackground from "@/components/page-hero-background";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { heroBackgrounds } from "@/lib/hero-backgrounds";

export default function FixedIncomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll("[data-fi-hero]");

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
      className="relative overflow-hidden border-b border-white/10 bg-background pt-28 pb-16 md:pt-36 md:pb-20"
    >
      <PageHeroBackground src={heroBackgrounds.fixedIncome} />
      <div className="relative section-shell">
        <p
          data-fi-hero
          className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
        >
          Our Products
        </p>
        <h1
          data-fi-hero
          className="mt-4 max-w-3xl text-fluid-page text-balance font-serif font-semibold tracking-tight text-white opacity-0"
        >
          Fixed Income Products
        </h1>
        <p
          data-fi-hero
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 opacity-0 sm:text-lg"
        >
          Choose from a wide range of fixed income instruments
        </p>
      </div>
    </section>
  );
}
