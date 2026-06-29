"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { scheduleConsultation } from "@/lib/nav-links";

const INSURANCE_ITEMS = [
  "1. 99% CLAIMS SETTLED",
  "2. 24/7 SUPPORT",
  "3. BEST PRICES",
  "4. EXPERT GUIDANCE",
];

const HOLD_SECONDS = 2;
const FADE_SECONDS = 0.65;
const BG_IMAGE = "/images/insurance_umbrella_shield_bg.png";

export default function InsuranceWhyChooseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);
  const sliderBoxRef = useRef<HTMLDivElement>(null);
  const activeTextRef = useRef<HTMLParagraphElement>(null);

  const [index, setIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  const prevTitle =
    INSURANCE_ITEMS[(index - 1 + INSURANCE_ITEMS.length) % INSURANCE_ITEMS.length];
  const nextTitle = INSURANCE_ITEMS[(index + 1) % INSURANCE_ITEMS.length];

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const titleBox = titleBoxRef.current;
    const sliderBox = sliderBoxRef.current;
    const activeText = activeTextRef.current;

    if (!container || !titleBox || !sliderBox || !activeText) return;

    const mm = gsap.matchMedia();
    let mainTl: gsap.core.Timeline | null = null;
    let loopTl: gsap.core.Timeline | null = null;
    let trigger: ScrollTrigger | null = null;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(titleBox, { display: "none" });
      gsap.set(sliderBox, { opacity: 1, scale: 1 });
      gsap.set(activeText, { opacity: 1, y: 0 });
      setShowSlider(true);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        once: true,
        onEnter: () => {
          mainTl = gsap.timeline();

          // Phase 1: Intro Title appears centered -> holds -> zooms out & fades out
          mainTl
            .fromTo(
              titleBox,
              { opacity: 0, scale: 0.9, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
            )
            .to({}, { duration: 1.5 }) // hold title in center
            .to(titleBox, {
              opacity: 0,
              scale: 0.8,
              duration: 0.7,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(titleBox, { display: "none" });
              },
            })
            // Phase 2: Fade in & zoom in rotating slider
            .fromTo(
              sliderBox,
              { opacity: 0, scale: 1.05 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                onStart: () => {
                  setShowSlider(true);
                  // Start rotating loop animation
                  loopTl = gsap.timeline({ repeat: -1 });
                  INSURANCE_ITEMS.forEach((itemText, itemIndex) => {
                    loopTl!
                      .call(() => {
                        setIndex(itemIndex);
                        if (activeTextRef.current) {
                          activeTextRef.current.textContent = itemText;
                        }
                      })
                      .fromTo(
                        activeTextRef.current,
                        { opacity: 0, y: 36 },
                        {
                          opacity: 1,
                          y: 0,
                          duration: FADE_SECONDS,
                          ease: "power3.out",
                        },
                      )
                      .to({}, { duration: HOLD_SECONDS })
                      .to(activeTextRef.current, {
                        opacity: 0,
                        y: -36,
                        duration: FADE_SECONDS,
                        ease: "power3.in",
                      });
                  });
                },
              },
            );
        },
      });
    });

    return () => {
      trigger?.kill();
      mainTl?.kill();
      loopTl?.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-t border-white/10 px-6 py-24 md:py-32 lg:px-8 bg-charcoal min-h-[520px] md:min-h-[600px] flex flex-col justify-between items-center"
    >
      {/* Contextual Insurance Background Image with Vibrant Contrast */}
      <Image
        src={BG_IMAGE}
        alt=""
        fill
        className="object-cover object-center opacity-85"
        sizes="100vw"
        priority={false}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-charcoal/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/70 via-transparent to-charcoal/70"
        aria-hidden
      />

      {/* Top spacer to ensure perfect vertical centering */}
      <div className="w-full h-4" />

      {/* CENTER STAGE CONTAINER */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center my-auto py-8">
        {/* PHASE 1: INTRO TITLE (DEAD-CENTER IN SECTION) */}
        <div
          ref={titleBoxRef}
          className="text-center select-none max-w-4xl mx-auto"
        >
          <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-cream/70">
            Why Choose
          </p>
          <h2 className="mt-4 font-serif text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)] leading-tight">
            Our Insurance Services
          </h2>
        </div>

        {/* PHASE 2: UP-TO-DOWN ROTATIONAL WINDOW SLIDER (DEAD-CENTER IN SECTION) */}
        <div
          ref={sliderBoxRef}
          className="w-full opacity-0 pointer-events-none"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="pointer-events-none w-full select-none text-center leading-[0.95]">
            {/* TOP LINE (Previous) */}
            <p
              aria-hidden
              className="font-sans text-[clamp(1.5rem,7vw,4.25rem)] font-extrabold uppercase tracking-[-0.02em] text-cream/[0.18] transition-opacity duration-500"
              style={{ opacity: showSlider ? 1 : 0 }}
            >
              {prevTitle}
            </p>

            {/* CENTER LINE (Active) */}
            <p
              ref={activeTextRef}
              className="font-sans text-[clamp(2rem,9vw,5.75rem)] font-extrabold uppercase tracking-[-0.02em] text-white opacity-0 drop-shadow-[0_2px_28px_rgba(255,255,255,0.25)] my-2"
            >
              {INSURANCE_ITEMS[0]}
            </p>

            {/* BOTTOM LINE (Next) */}
            <p
              aria-hidden
              className="font-sans text-[clamp(1.5rem,7vw,4.25rem)] font-extrabold uppercase tracking-[-0.02em] text-cream/[0.18] transition-opacity duration-500"
              style={{ opacity: showSlider ? 1 : 0 }}
            >
              {nextTitle}
            </p>
          </div>
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="relative z-10 mb-2 flex justify-center">
        <Link
          href={scheduleConsultation.href}
          className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold shadow-xl transition-transform duration-300 hover:scale-105"
        >
          Get Started
        </Link>
      </div>

      <p className="sr-only">Why choose our insurance services: 99% Claims Settled, 24/7 Support, Best Prices, Expert Guidance</p>
    </section>
  );
}
