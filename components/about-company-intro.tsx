"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { aboutCompanyParagraphs } from "@/lib/team-data";

const ABOUT_INTRO_BG_IMAGE = "/Gemini_Generated_Image_9c0mdr9c0mdr9c0m.png";

export default function AboutCompanyIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("[data-about-title]");
    const paragraphs = section.querySelectorAll("[data-about-paragraph]");

    const mm = gsap.matchMedia();
    let timeline: gsap.core.Timeline | null = null;
    let hasPlayed = false;

    const playTimeline = () => {
      if (hasPlayed || !timeline) return;
      hasPlayed = true;
      timeline.play();
    };

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([title, ...paragraphs].filter(Boolean), { opacity: 1, x: 0, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (title) {
        timeline.fromTo(
          title,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85 },
        );
      }

      paragraphs.forEach((paragraph, index) => {
        const isOdd = (index + 1) % 2 === 1;

        timeline!.fromTo(
          paragraph,
          { opacity: 0, x: isOdd ? -80 : 80 },
          { opacity: 1, x: 0, duration: 0.95 },
          index === 0 ? "+=0.12" : "-=0.6",
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        once: true,
        onEnter: playTimeline,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        const { top, bottom } = section.getBoundingClientRect();
        const inView = top < window.innerHeight * 0.85 && bottom > 0;

        if (inView) {
          playTimeline();
        }
      });
    });

    return () => {
      timeline?.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <Image
        src={ABOUT_INTRO_BG_IMAGE}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-charcoal/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/50 to-charcoal/80"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h1
          data-about-title
          className="text-fluid-page text-balance font-serif font-semibold tracking-tight text-white opacity-0"
        >
          About Haria Investments
        </h1>

        <div className="mx-auto mt-8 max-w-3xl space-y-6 md:mt-10">
          {aboutCompanyParagraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              data-about-paragraph
              className="text-base leading-relaxed text-white/80 opacity-0 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
