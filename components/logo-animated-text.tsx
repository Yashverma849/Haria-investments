"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

const HOLD_DURATION = 2.8;
const FADE_DURATION = 0.7;

export default function LogoAnimatedText() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);

  useGsapAfterLoader(() => {
    const name = nameRef.current;
    const tagline = taglineRef.current;
    if (!name || !tagline) return;

    gsap.set(name, { opacity: 1 });
    gsap.set(tagline, { opacity: 0 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    tl.to(name, {
      opacity: 0,
      duration: FADE_DURATION,
      ease: "power2.inOut",
      delay: HOLD_DURATION,
    })
      .to(
        tagline,
        { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" },
        `-=${FADE_DURATION * 0.4}`,
      )
      .to(tagline, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power2.inOut",
        delay: HOLD_DURATION,
      })
      .to(
        name,
        { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" },
        `-=${FADE_DURATION * 0.4}`,
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative h-7 w-[11.5rem] overflow-hidden sm:w-[12.5rem]">
      <span
        ref={nameRef}
        className="absolute inset-0 font-serif text-lg font-semibold leading-7 tracking-wide text-white"
      >
        Haria Investments
      </span>
      <span
        ref={taglineRef}
        className="absolute inset-0 text-sm font-medium uppercase leading-7 tracking-[0.2em] text-accent"
      >
        Since 1957
      </span>
      <span className="sr-only">Haria Investments, Since 1957</span>
    </div>
  );
}
