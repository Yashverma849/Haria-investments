"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  isInScrollFadeViewport,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_START,
  scheduleScrollFadeReveal,
} from "@/lib/gsap-scroll-fade";

type SectionHeaderProps = {
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  scrollReplay?: boolean;
  /** Use on off-white surface sections for readable dark type */
  onSurface?: boolean;
};

export default function SectionHeader({
  title,
  description,
  className = "",
  descriptionClassName = "",
  scrollReplay = false,
  onSurface = false,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    if (!header) return;

    const titleEl = header.querySelector("[data-section-title]");
    const descriptionEl = header.querySelector("[data-section-description]");

    const mm = gsap.matchMedia();
    let scrollTrigger: ScrollTrigger | null = null;

    const animateIn = () => {
      if (titleEl) {
        gsap.to(titleEl, {
          opacity: 1,
          x: 0,
          duration: SCROLL_FADE_DURATION,
          ease: "power2.out",
          overwrite: true,
        });
      }

      if (descriptionEl) {
        gsap.to(descriptionEl, {
          opacity: 1,
          x: 0,
          duration: SCROLL_FADE_DURATION,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    const animateOut = () => {
      if (titleEl) {
        gsap.to(titleEl, {
          opacity: 0,
          x: -72,
          duration: 0.6,
          ease: "power4.in",
          overwrite: true,
        });
      }

      if (descriptionEl) {
        gsap.to(descriptionEl, {
          opacity: 0,
          x: 72,
          duration: 0.6,
          ease: "power4.in",
          overwrite: true,
        });
      }
    };

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([titleEl, descriptionEl], { opacity: 1, x: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (scrollReplay) {
        gsap.set(titleEl, { opacity: 0, x: -72 });
        gsap.set(descriptionEl, { opacity: 0, x: 72 });

        scrollTrigger = ScrollTrigger.create({
          trigger: header,
          start: SCROLL_FADE_START,
          end: "bottom 12%",
          onEnter: animateIn,
          onLeave: animateOut,
          onEnterBack: animateIn,
          onLeaveBack: animateOut,
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();

          if (isInScrollFadeViewport(header)) {
            animateIn();
          }
        });

        return;
      }

      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, x: -72 },
          {
            opacity: 1,
            x: 0,
            duration: SCROLL_FADE_DURATION,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: SCROLL_FADE_START,
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
            duration: SCROLL_FADE_DURATION,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: SCROLL_FADE_START,
              once: true,
            },
          },
        );
      }

      scheduleScrollFadeReveal(header);
    });

    return () => {
      scrollTrigger?.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === header) trigger.kill();
      });
    };
  }, [title, description, scrollReplay]);

  return (
    <div
      ref={headerRef}
      className={`mx-auto max-w-7xl px-6 pb-16 md:pb-24 lg:pb-28 lg:px-8 ${className}`}
    >
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-16">
        <h2
          data-section-title
          className={`text-fluid-section text-balance font-serif font-semibold tracking-tight opacity-0 ${
            onSurface ? "text-charcoal" : "text-cream"
          }`}
        >
          {title}
        </h2>
        <p
          data-section-description
          className={`max-w-md text-fluid-body-hero opacity-0 xl:ml-auto xl:justify-self-end xl:pt-2 xl:text-right ${
            onSurface ? "text-charcoal/70" : "text-cream/70"
          } ${descriptionClassName}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
