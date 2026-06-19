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
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <h2
          data-section-title
          className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream opacity-0 sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {title}
        </h2>
        <p
          data-section-description
          className={`max-w-md text-base leading-relaxed text-cream/70 opacity-0 lg:ml-auto lg:justify-self-end lg:pt-2 lg:text-right lg:text-lg ${descriptionClassName}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
