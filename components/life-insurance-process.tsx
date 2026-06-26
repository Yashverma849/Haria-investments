"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { lifeInsuranceProcessSteps } from "@/lib/life-insurance-data";
import { scheduleConsultation } from "@/lib/nav-links";

const PROCESS_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80";

const SLIDE_IN_DURATION_MS = 750;
const STEP_HOLD_MS = 4500;
const AUTO_ADVANCE_MS = SLIDE_IN_DURATION_MS + STEP_HOLD_MS;

export default function LifeInsuranceProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = lifeInsuranceProcessSteps[activeIndex];
  const stepNumber = String(activeIndex + 1).padStart(2, "0");

  const animateStepContent = useCallback(() => {
    const image = imageRef.current;
    const text = textRef.current;
    if (!image || !text) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.killTweensOf([image, text]);

    if (reduced) {
      gsap.set([image, text], { opacity: 1, x: 0 });
      return;
    }

    gsap.fromTo(
      image,
      { opacity: 0, x: -56 },
      { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
    );
    gsap.fromTo(
      text,
      { opacity: 0, x: 56 },
      { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
    );
  }, []);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const panel = section.querySelector("[data-li-process-panel]");
    if (!panel) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: panel,
      start: "top 88%",
      end: "bottom 15%",
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    });

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    animateStepContent();
  }, [activeIndex, isInView, animateStepContent]);

  useEffect(() => {
    if (!isInView) return;

    const timer = window.setTimeout(() => {
      setActiveIndex(
        (current) => (current + 1) % lifeInsuranceProcessSteps.length,
      );
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isInView]);

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index);
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
                  onClick={() => goToStep(index)}
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
            aria-live="polite"
            className="grid gap-0 lg:grid-cols-2"
          >
            <div
              ref={textRef}
              data-li-process-text
              className="flex flex-col justify-center p-6 md:p-10"
            >
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

            <div
              ref={imageRef}
              data-li-process-image
              className="relative min-h-[240px] lg:min-h-[320px]"
            >
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
