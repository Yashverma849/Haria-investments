"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AboutSectionHeadingProps = {
  title: string;
  description: string;
  className?: string;
};

export default function AboutSectionHeading({
  title,
  description,
  className = "mx-auto max-w-2xl text-center",
}: AboutSectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = ref.current;
    if (!element) return;

    const items = element.querySelectorAll("[data-fade-item]");

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) trigger.kill();
      });
    };
  }, [title, description]);

  return (
    <div ref={ref} className={className}>
      <h2
        data-fade-item
        className="font-serif text-3xl font-semibold tracking-tight text-white opacity-0 sm:text-4xl"
      >
        {title}
      </h2>
      <p
        data-fade-item
        className="mt-4 text-base leading-relaxed text-white/70 opacity-0"
      >
        {description}
      </p>
    </div>
  );
}
