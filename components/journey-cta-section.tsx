"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { scheduleConsultation } from "@/lib/nav-links";
import { sectionShell, type SectionTone } from "@/lib/section-tone";

const JOURNEY_CTA_BG_IMAGE = "/images/Gemini_Generated_Image_1on5j31on5j31on5.png";

type JourneyCtaSectionProps = {
  tone?: SectionTone;
};

export default function JourneyCtaSection({ tone = "dark" }: JourneyCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const background = section.querySelector("[data-journey-bg]");
    const title = section.querySelector("[data-journey-title]");
    const description = section.querySelector("[data-journey-description]");
    const buttons = section.querySelectorAll("[data-journey-button]");

    const targets = [background, title, description, ...buttons].filter(Boolean);
    let entranceTimeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const animateIn = () => {
      entranceTimeline?.kill();
      entranceTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (background) {
        entranceTimeline.fromTo(
          background,
          { opacity: 0, scale: 1.08, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1 },
        );
      }

      if (title) {
        entranceTimeline.fromTo(
          title,
          { opacity: 0, x: -56, y: 28 },
          { opacity: 1, x: 0, y: 0, duration: 0.9 },
          background ? "-=0.75" : 0,
        );
      }

      if (description) {
        entranceTimeline.fromTo(
          description,
          { opacity: 0, x: 56, y: 28 },
          { opacity: 1, x: 0, y: 0, duration: 0.9 },
          "-=0.7",
        );
      }

      if (buttons.length > 0) {
        entranceTimeline.fromTo(
          buttons,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
          "-=0.55",
        );
      }
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        onEnter: animateIn,
        onEnterBack: animateIn,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
      };
    });

    return () => {
      entranceTimeline?.kill();
      scrollTrigger?.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const isLight = tone === "light";

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-20 md:py-28 ${sectionShell[tone]}`}
    >
      <div
        data-journey-bg
        className="absolute inset-0 overflow-hidden will-change-transform"
        aria-hidden
      >
        <Image
          src={JOURNEY_CTA_BG_IMAGE}
          alt=""
          fill
          className={`object-cover object-center ${isLight ? "opacity-40" : ""}`}
          sizes="100vw"
          priority={false}
        />

        {isLight ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-surface/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/15 via-surface/5 to-surface/15" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-charcoal/55" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/70" />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div data-journey-cta className="mx-auto max-w-4xl p-8 text-center md:p-12">
          <h2
            data-journey-title
            className={`text-fluid-cta font-serif font-semibold ${
              isLight ? "text-charcoal" : "text-cream"
            }`}
          >
            Ready to Start Your Financial Journey?
          </h2>
          <p
            data-journey-description
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${
              isLight ? "text-charcoal/75" : "text-cream/75"
            }`}
          >
            Let&apos;s discuss your financial goals and create a personalized
            strategy for your success.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              data-journey-button
              href={scheduleConsultation.href}
              className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              {scheduleConsultation.label}
            </Link>
            <Link
              data-journey-button
              href="/financial-health"
              className={
                isLight
                  ? "inline-flex items-center justify-center rounded-full border border-charcoal/25 bg-charcoal/5 px-8 py-3.5 text-sm font-semibold text-charcoal backdrop-blur-sm transition-all hover:border-charcoal/40 hover:bg-charcoal/10"
                  : "inline-flex items-center justify-center rounded-full border border-cream/30 bg-cream/5 px-8 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-all hover:border-cream/50 hover:bg-cream/10"
              }
            >
              Financial Health Check
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
