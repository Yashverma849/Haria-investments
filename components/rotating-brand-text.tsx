"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

const HOLD_DURATION = 2.8;
const FADE_DURATION = 0.7;

type RotatingBrandTextProps = {
  className?: string;
  wordClassName?: string;
  firstWord?: string;
  secondWord?: string;
};

export default function RotatingBrandText({
  className = "",
  wordClassName = "",
  firstWord = "Haria",
  secondWord = "Investments",
}: RotatingBrandTextProps) {
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);

  useGsapAfterLoader(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second) return;

    const mm = gsap.matchMedia();
    let tl: gsap.core.Timeline | null = null;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(first, { opacity: 1 });
      gsap.set(second, { opacity: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(first, { opacity: 1 });
      gsap.set(second, { opacity: 0 });

      tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

      tl.to(first, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power2.inOut",
        delay: HOLD_DURATION,
      })
        .to(
          second,
          { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" },
          `-=${FADE_DURATION * 0.4}`,
        )
        .to(second, {
          opacity: 0,
          duration: FADE_DURATION,
          ease: "power2.inOut",
          delay: HOLD_DURATION,
        })
        .to(
          first,
          { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" },
          `-=${FADE_DURATION * 0.4}`,
        );
    });

    return () => {
      tl?.kill();
      mm.revert();
    };
  }, [firstWord, secondWord]);

  return (
    <div className={`relative ${className}`}>
      <span
        ref={firstRef}
        className={`absolute inset-0 opacity-100 ${wordClassName}`}
      >
        {firstWord}
      </span>
      <span
        ref={secondRef}
        className={`absolute inset-0 opacity-0 ${wordClassName}`}
      >
        {secondWord}
      </span>
      <span className="sr-only">
        {firstWord} {secondWord}
      </span>
    </div>
  );
}
