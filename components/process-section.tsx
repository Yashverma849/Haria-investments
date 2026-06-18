"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/process-data";

function ProcessBlock({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "expect" | "prepare" | "outcome";
}) {
  const labelClass =
    variant === "outcome"
      ? "text-accent"
      : variant === "prepare"
        ? "text-brand-light"
        : "text-brand-light";

  return (
    <div className="group/block h-full rounded-xl border border-white/10 bg-background/40 p-5 backdrop-blur-sm transition-all duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:border-brand-light/35 hover:bg-brand/[0.08] hover:shadow-[0_12px_40px_-16px_rgba(47,128,237,0.45)]">
      <h4
        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${labelClass}`}
      >
        {title}
      </h4>
      {variant === "outcome" ? (
        <p className="mt-3 text-sm leading-relaxed text-white/80">{items[0]}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm leading-relaxed text-white/75"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-light/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector("[data-process-header]");
    const steps = section.querySelectorAll("[data-process-step]");

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

    steps.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 90%",
            once: true,
          },
        },
      );
    });

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
      id="process"
      ref={sectionRef}
      className="border-t border-white/10 bg-surface/30 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-process-header
          className="mx-auto max-w-3xl text-center"
        >
          <p
            data-fade-item
            className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
          >
            Our Process
          </p>
          <h2
            data-fade-item
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white opacity-0 sm:text-4xl"
          >
            Our Client-Focused Process
          </h2>
          <p
            data-fade-item
            className="mt-4 text-base leading-relaxed text-white/70 opacity-0"
          >
            A systematic, transparent approach designed to reduce anxiety and
            build confidence throughout your financial planning journey.
          </p>
        </div>

        <div className="relative mt-16 space-y-10 md:mt-20 md:space-y-12">
          <div
            className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-brand/40 via-brand-light/20 to-transparent md:left-6 md:block"
            aria-hidden
          />

          {processSteps.map((step, index) => (
            <article
              key={step.id}
              data-process-step
              className="group/step relative opacity-0 transition-transform duration-300 md:pl-16"
            >
              <div
                className="absolute left-2 top-8 hidden h-9 w-9 items-center justify-center rounded-full border border-brand/30 bg-background font-serif text-sm font-semibold text-brand-light transition-all duration-300 group-hover/step:scale-110 group-hover/step:border-brand-light/50 group-hover/step:bg-brand/20 group-hover/step:shadow-[0_0_20px_rgba(47,128,237,0.35)] md:left-3 md:flex"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="rounded-2xl border border-white/10 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:z-10 hover:scale-[1.015] hover:border-brand-light/30 hover:bg-background/70 hover:shadow-[0_24px_60px_-24px_rgba(47,128,237,0.4)] md:p-8">
                <div className="md:pr-4">
                  <span className="font-serif text-sm font-semibold text-brand-light md:hidden">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/70">
                    {step.summary}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-3 [&>*]:origin-center">
                  <ProcessBlock
                    title="What to Expect"
                    items={step.whatToExpect}
                    variant="expect"
                  />
                  <ProcessBlock
                    title="Your Preparation"
                    items={step.yourPreparation}
                    variant="prepare"
                  />
                  <ProcessBlock
                    title="Outcome"
                    items={[step.outcome]}
                    variant="outcome"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
