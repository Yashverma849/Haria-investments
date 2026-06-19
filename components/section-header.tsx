"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

type SectionHeaderProps = {
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
};

export default function SectionHeader({
  title,
  description,
  className = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    if (!header) return;

    const titleEl = header.querySelector("[data-section-title]");
    const descriptionEl = header.querySelector("[data-section-description]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([titleEl, descriptionEl], { opacity: 1, x: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, x: -72 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      if (descriptionEl) {
        gsap.fromTo(
          descriptionEl,
          { opacity: 0, x: 72 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === header) trigger.kill();
      });
    };
  }, [title, description]);

  return (
    <div
      ref={headerRef}
      className={`mx-auto max-w-7xl px-6 pb-16 md:pb-24 lg:pb-28 lg:px-8 ${className}`}
    >
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-16">
        <h2
          data-section-title
          className="text-fluid-section text-balance font-serif font-semibold tracking-tight text-cream opacity-0"
        >
          {title}
        </h2>
        <p
          data-section-description
          className={`max-w-md text-fluid-body-hero text-cream/70 opacity-0 xl:ml-auto xl:justify-self-end xl:pt-2 xl:text-right ${descriptionClassName}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
