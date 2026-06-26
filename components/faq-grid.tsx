"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import FaqFlipCard from "@/components/faq-flip-card";
import type { FaqItem } from "@/lib/faq-data";

type FaqGridProps = {
  items: FaqItem[];
};

export default function FaqGrid({ items }: FaqGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(
      "[data-faq-card]:not([data-faq-animated])",
    );

    if (cards.length === 0) return;

    const hasAnimatedCards = grid.querySelector("[data-faq-animated]") !== null;

    const animation = {
      opacity: 1,
      rotateY: 0,
      x: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      onComplete: () => {
        cards.forEach((card) => {
          card.setAttribute("data-faq-animated", "");
        });
      },
    };

    if (hasAnimatedCards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          rotateY: -28,
          x: -40,
          transformPerspective: 1000,
        },
        animation,
      );
      return;
    }

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        rotateY: -28,
        x: -40,
        transformPerspective: 1000,
      },
      {
        ...animation,
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === grid) trigger.kill();
      });
    };
  }, [items.length]);

  return (
    <div
      ref={gridRef}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8"
    >
      {items.map((item) => (
        <div key={item.id} data-faq-card className="opacity-0">
          <FaqFlipCard item={item} />
        </div>
      ))}
    </div>
  );
}
