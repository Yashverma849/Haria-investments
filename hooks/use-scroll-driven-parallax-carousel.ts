"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getCarouselScrollDistance,
  updateCarouselParallax,
} from "@/components/horizontal-parallax-carousel";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

function getViewportHeight() {
  return Math.round(window.innerHeight);
}

export function useScrollDrivenParallaxCarousel(
  sectionRef: RefObject<HTMLElement | null>,
) {
  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const container = section.querySelector<HTMLElement>(
      "[data-parallax-container]",
    );
    const track = section.querySelector<HTMLElement>("[data-parallax-track]");

    if (!container || !track) return;

    const mm = gsap.matchMedia();
    let carouselTrigger: ScrollTrigger | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const applyTrackX = (x: number) => {
      gsap.set(track, { x, force3D: true });
    };

    const setup = () => {
      carouselTrigger?.kill();
      gsap.set(track, { x: 0 });

      const distance = getCarouselScrollDistance(container, track);
      if (distance <= 0) return false;

      section.style.height = `${getViewportHeight() + distance}px`;

      carouselTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          applyTrackX(-distance * self.progress);
        },
      });

      applyTrackX(0);
      return true;
    };

    const scheduleSetup = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    };

    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: reduce)", () => {
        carouselTrigger?.kill();
        carouselTrigger = null;
        section.style.removeProperty("height");
        gsap.set(track, { clearProps: "x" });
        updateCarouselParallax(container, { prefersReducedMotion: true });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!setup()) {
          requestAnimationFrame(() => {
            if (!setup()) {
              section.querySelectorAll("img").forEach((img) => {
                if (img.complete) return;
                img.addEventListener("load", scheduleSetup, { once: true });
              });
            }
          });
        }
      });
    }, section);

    window.addEventListener("resize", scheduleSetup);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleSetup);
      carouselTrigger?.kill();
      section.style.removeProperty("height");
      ctx.revert();
      mm.revert();
    };
  }, []);
}
