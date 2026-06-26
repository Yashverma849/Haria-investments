"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { scheduleScrollFadeReveal } from "@/lib/gsap-scroll-fade";

type AboutStackScrollProps = {
  intro: ReactNode;
  legacy: ReactNode;
};

function getSwipeDistance() {
  return Math.round(Math.min(window.innerHeight * 0.92, 760));
}

function releaseStackTransforms(
  base: HTMLElement,
  coverPanel: HTMLElement,
) {
  gsap.set(coverPanel, { clearProps: "transform" });
  gsap.set(base, { clearProps: "transform,filter" });
}

function revealStackedSection(root: HTMLElement) {
  scheduleScrollFadeReveal(root);
}

export default function AboutStackScroll({ intro, legacy }: AboutStackScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const coverPanelRef = useRef<HTMLDivElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const base = baseRef.current;
    const coverPanel = coverPanelRef.current;

    if (!root || !base || !coverPanel) return;

    const mm = gsap.matchMedia();
    let ctx: gsap.Context | null = null;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([base, coverPanel], { clearProps: "transform,filter" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ctx = gsap.context(() => {
        const swipeDistance = getSwipeDistance();

        gsap.set(coverPanel, { y: () => getSwipeDistance() });
        gsap.set(base, { transformOrigin: "center top" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: base,
            start: "top top",
            end: () => `+=${swipeDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: [0, 1],
              duration: { min: 0.2, max: 0.55 },
              delay: 0.04,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              if (self.progress >= 0.97) {
                releaseStackTransforms(base, coverPanel);
                revealStackedSection(root);
              }
            },
            onLeave: () => {
              releaseStackTransforms(base, coverPanel);
              revealStackedSection(root);
            },
          },
        });

        timeline.fromTo(
          coverPanel,
          { y: () => getSwipeDistance() },
          { y: 0, ease: "none" },
          0,
        );

        timeline.fromTo(
          base,
          { scale: 1, filter: "brightness(1)" },
          { scale: 0.94, filter: "brightness(0.7)", ease: "none" },
          0,
        );
      }, root);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      ctx?.revert();
      mm.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="about-stack-scroll">
      <div
        ref={baseRef}
        className="about-stack-scroll__base min-h-[calc(100dvh-5rem)]"
      >
        {intro}
      </div>

      <div className="about-stack-scroll__cover">
        <div
          ref={coverPanelRef}
          className="about-stack-scroll__cover-panel rounded-t-[1.75rem] border-t border-charcoal/10 bg-surface shadow-[0_-28px_90px_rgba(0,0,0,0.12)] md:rounded-t-[2.25rem]"
        >
          {legacy}
        </div>
      </div>
    </div>
  );
}
