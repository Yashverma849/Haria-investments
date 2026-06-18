"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleConsultation } from "@/lib/nav-links";

export default function JourneyCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector("[data-journey-cta]");

    if (content) {
      gsap.fromTo(
        content.querySelectorAll("[data-fade-item]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 90%",
            once: true,
          },
        },
      );
    }

    return () => {
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
      className="border-t border-white/10 bg-surface/30 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-journey-cta
          className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-background/60 p-8 text-center backdrop-blur-sm md:p-12"
        >
          <h2
            data-fade-item
            className="font-serif text-2xl font-semibold text-white opacity-0 sm:text-3xl"
          >
            Ready to Start Your Financial Journey?
          </h2>
          <p
            data-fade-item
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 opacity-0"
          >
            Let&apos;s discuss your financial goals and create a personalized
            strategy for your success.
          </p>
          <div
            data-fade-item
            className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-0"
          >
            <Link
              href={scheduleConsultation.href}
              className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              {scheduleConsultation.label}
            </Link>
            <Link
              href="/financial-health"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              Financial Health Check
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
