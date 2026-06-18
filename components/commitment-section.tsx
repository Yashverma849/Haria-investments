"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { communicationStandards } from "@/lib/commitment-data";

export default function CommitmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector("[data-commitment-header]");
    const cards = section.querySelectorAll("[data-commitment-card]");

    if (header) {
      gsap.fromTo(
        header.querySelectorAll("[data-fade-item]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 88%",
            once: true,
          },
        },
      );
    }

    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector("[data-commitment-grid]"),
          start: "top 88%",
          once: true,
        },
      },
    );

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
      id="commitment"
      ref={sectionRef}
      className="border-t border-white/10 bg-surface/30 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-commitment-header className="mx-auto max-w-3xl text-center">
          <p
            data-fade-item
            className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
          >
            Our Commitment
          </p>
          <h2
            data-fade-item
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white opacity-0 sm:text-4xl"
          >
            Communication Standards
          </h2>
          <p
            data-fade-item
            className="mt-4 text-base leading-relaxed text-white/70 opacity-0"
          >
            Clear expectations for responsive, professional service
          </p>
        </div>

        <div
          data-commitment-grid
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5"
        >
          {communicationStandards.map((item) => (
            <article
              key={item.id}
              data-commitment-card
              className="group/commitment rounded-2xl border border-white/10 bg-background/50 p-6 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:border-brand-light/35 hover:bg-brand/[0.08] hover:shadow-[0_16px_48px_-20px_rgba(47,128,237,0.4)]"
            >
              <h3 className="font-serif text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
