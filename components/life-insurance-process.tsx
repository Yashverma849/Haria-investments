"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { lifeInsuranceProcessSteps } from "@/lib/life-insurance-data";
import { scheduleConsultation } from "@/lib/nav-links";

const PROCESS_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80";

export default function LifeInsuranceProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = lifeInsuranceProcessSteps[activeIndex];
  const stepNumber = String(activeIndex + 1).padStart(2, "0");

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const panel = section.querySelector("[data-li-process-panel]");
    if (!panel) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(panel, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => {
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
      id="how-it-works"
      className="scroll-mt-24 border-t border-white/10 bg-background pt-20 md:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light">
          How It Works
        </p>
      </div>

      <SectionHeader
        title="Simple 4-Step Process"
        description="Get your life insurance policy in just 4 easy steps"
        className="pt-4"
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
        <div
          data-li-process-panel
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-brand/[0.03]"
        >
          <div
            role="tablist"
            aria-label="Life insurance process steps"
            className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-4"
          >
            {lifeInsuranceProcessSteps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`li-process-tab-${step.id}`}
                  aria-selected={isActive}
                  aria-controls={`li-process-panel-${step.id}`}
                  onClick={() => setActiveIndex(index)}
                  className={`border-white/10 px-4 py-4 text-sm font-semibold transition-colors sm:py-5 sm:text-base ${
                    index > 0 ? "border-l" : ""
                  } ${
                    isActive
                      ? "bg-brand/15 text-cream"
                      : "text-cream/55 hover:bg-white/5 hover:text-cream/80"
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`li-process-panel-${activeStep.id}`}
            aria-labelledby={`li-process-tab-${activeStep.id}`}
            className="grid gap-0 lg:grid-cols-2"
          >
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                {stepNumber}
              </p>
              <h3 className="text-fluid-process-title mt-3 font-serif font-semibold text-cream">
                {activeStep.title}
              </h3>
              <p className="mt-4 text-fluid-process-body leading-relaxed text-cream/75">
                {activeStep.summary}
              </p>
              <Link
                href={scheduleConsultation.href}
                className="btn-primary mt-8 inline-flex w-fit items-center justify-center rounded-full px-8 py-3 text-sm font-semibold"
              >
                Schedule Now
              </Link>
            </div>

            <div className="relative min-h-[240px] lg:min-h-[320px]">
              <Image
                src={PROCESS_IMAGE}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent lg:from-background/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
