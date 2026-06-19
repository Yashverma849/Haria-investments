"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { values } from "@/lib/values-data";

const VALUE_TITLES = values.map((value) => value.title.toUpperCase());
const HOLD_SECONDS = 2;
const FADE_SECONDS = 0.65;
const VALUES_BG_IMAGE = "/Gemini_Generated_Image_uemtnquemtnquemt.png";

export default function ValuesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLParagraphElement>(null);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const prevTitle =
    VALUE_TITLES[(index - 1 + VALUE_TITLES.length) % VALUE_TITLES.length];
  const nextTitle = VALUE_TITLES[(index + 1) % VALUE_TITLES.length];

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const active = activeRef.current;
    if (!container || !active) return;

    const mm = gsap.matchMedia();
    let timeline: gsap.core.Timeline | null = null;
    let trigger: ScrollTrigger | null = null;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(active, { opacity: 1, y: 0 });
      setStarted(true);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          setStarted(true);

          timeline = gsap.timeline({ repeat: -1 });

          VALUE_TITLES.forEach((title, valueIndex) => {
            timeline!
              .call(() => {
                setIndex(valueIndex);
                active.textContent = title;
              })
              .fromTo(
                active,
                { opacity: 0, y: 36 },
                {
                  opacity: 1,
                  y: 0,
                  duration: FADE_SECONDS,
                  ease: "power3.out",
                },
              )
              .to({}, { duration: HOLD_SECONDS })
              .to(active, {
                opacity: 0,
                y: -36,
                duration: FADE_SECONDS,
                ease: "power3.in",
              });
          });
        },
      });
    });

    return () => {
      trigger?.kill();
      timeline?.kill();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden px-6 py-16 md:py-24 lg:px-8"
    >
      <Image
        src={VALUES_BG_IMAGE}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-charcoal/50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/35 to-charcoal/70"
        aria-hidden
      />

      <div
        className="relative z-10 mx-auto flex min-h-[280px] max-w-6xl items-center justify-center sm:min-h-[320px] md:min-h-[380px]"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="pointer-events-none w-full select-none text-center leading-[0.92]">
          <p
            aria-hidden
            className="font-sans text-[clamp(1.75rem,9vw,5.5rem)] font-extrabold uppercase tracking-[-0.03em] text-cream/[0.14] transition-opacity duration-500"
            style={{ opacity: started ? 1 : 0.4 }}
          >
            {prevTitle}
          </p>

          <p
            ref={activeRef}
            className="font-sans text-[clamp(2.25rem,11vw,7rem)] font-extrabold uppercase tracking-[-0.03em] text-cream opacity-0 drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)]"
          >
            {VALUE_TITLES[0]}
          </p>

          <p
            aria-hidden
            className="font-sans text-[clamp(1.75rem,9vw,5.5rem)] font-extrabold uppercase tracking-[-0.03em] text-cream/[0.14] transition-opacity duration-500"
            style={{ opacity: started ? 1 : 0.4 }}
          >
            {nextTitle}
          </p>
        </div>
      </div>

      <p className="sr-only">
        {started
          ? `Current value: ${values[index]?.title}`
          : "Values animation will begin when scrolled into view"}
      </p>
    </div>
  );
}
