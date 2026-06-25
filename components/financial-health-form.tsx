"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import FinancialHealthFormStep from "@/components/financial-health-form-step";
import { contactInfo } from "@/lib/footer-data";
import { financialHealthSections } from "@/lib/financial-health-data";
import {
  formatFinancialHealthSectionSubmission,
  initialFinancialHealthFormState,
  validateFinancialHealthSection,
  type FinancialHealthFormState,
} from "@/lib/financial-health-form-state";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

function splitTitleChars(text: string) {
  return text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      data-fh-title-char
      className="inline-block will-change-transform"
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ));
}

export default function FinancialHealthForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const isAnimatingRef = useRef(false);
  const directionRef = useRef<1 | -1>(1);
  const prefersReducedMotionRef = useRef(false);
  const hasMountedRef = useRef(false);

  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [form, setForm] = useState<FinancialHealthFormState>(
    initialFinancialHealthFormState,
  );
  const [submittedSteps, setSubmittedSteps] = useState<Record<number, boolean>>(
    {},
  );
  const [submitError, setSubmitError] = useState("");

  const activeSection = financialHealthSections[activeStep];
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === financialHealthSections.length - 1;
  const sectionSubmitted = Boolean(submittedSteps[activeStep]);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const panel = section.querySelector("[data-fh-panel]");
    if (!panel) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      prefersReducedMotionRef.current = true;
      gsap.set(panel, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      prefersReducedMotionRef.current = false;
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

  const animateStepIn = useCallback((direction: 1 | -1) => {
    const card = cardRef.current;
    const titleChars = titleRef.current?.querySelectorAll("[data-fh-title-char]");
    const subtitle = subtitleRef.current;

    if (!card) return;

    if (prefersReducedMotionRef.current) {
      gsap.set(card, { clearProps: "all", opacity: 1, x: 0 });
      if (titleChars?.length) gsap.set(titleChars, { clearProps: "all", opacity: 1, x: 0 });
      if (subtitle) gsap.set(subtitle, { clearProps: "all", opacity: 1, y: 0 });
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    gsap.set(card, { x: direction * 88, opacity: 0 });
    if (titleChars?.length) {
      gsap.set(titleChars, {
        x: -direction * 36,
        opacity: 0,
      });
    }
    if (subtitle) {
      gsap.set(subtitle, { y: 12, opacity: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      },
    });

    tl.to(card, {
      x: 0,
      opacity: 1,
      duration: 0.62,
      ease: "power3.out",
    });

    if (titleChars?.length) {
      tl.to(
        titleChars,
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power4.out",
          stagger: {
            each: 0.022,
            from: direction > 0 ? "start" : "end",
          },
        },
        "<0.1",
      );
    }

    if (subtitle) {
      tl.to(
        subtitle,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        },
        "<0.2",
      );
    }
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      const nextStep = activeStep + direction;
      if (
        isAnimatingRef.current ||
        nextStep < 0 ||
        nextStep >= financialHealthSections.length
      ) {
        return;
      }

      directionRef.current = direction;
      setSubmitError("");

      if (prefersReducedMotionRef.current) {
        setActiveStep(nextStep);
        return;
      }

      const card = cardRef.current;
      const titleChars = titleRef.current?.querySelectorAll("[data-fh-title-char]");
      const subtitle = subtitleRef.current;

      if (!card) {
        setActiveStep(nextStep);
        return;
      }

      isAnimatingRef.current = true;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveStep(nextStep);
        },
      });

      tl.to(card, {
        x: direction * -88,
        opacity: 0,
        duration: 0.38,
        ease: "power3.in",
      });

      if (titleChars?.length) {
        tl.to(
          titleChars,
          {
            x: direction * 36,
            opacity: 0,
            duration: 0.28,
            ease: "power3.in",
            stagger: {
              each: 0.016,
              from: direction > 0 ? "end" : "start",
            },
          },
          "<0.04",
        );
      }

      if (subtitle) {
        tl.to(
          subtitle,
          {
            y: -8,
            opacity: 0,
            duration: 0.24,
            ease: "power3.in",
          },
          "<",
        );
      }
    },
    [activeStep],
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      animateStepIn(1);
      return;
    }

    if (prefersReducedMotionRef.current) return;
    animateStepIn(directionRef.current);
  }, [activeStep, animateStepIn]);

  const updateField = <K extends keyof FinancialHealthFormState>(
    key: K,
    value: FinancialHealthFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitError("");
    setSubmittedSteps((current) => {
      if (!current[activeStep]) return current;
      const next = { ...current };
      delete next[activeStep];
      return next;
    });
  };

  const toggleArrayField = (
    key: "liabilities" | "goalMilestones" | "advisorExpectations",
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
    setSubmitError("");
    setSubmittedSteps((current) => {
      if (!current[activeStep]) return current;
      const next = { ...current };
      delete next[activeStep];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateFinancialHealthSection(activeStep, form);
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    const sectionTitle = financialHealthSections[activeStep].title;
    const subject = encodeURIComponent(
      `Financial Health Assessment — ${sectionTitle}`,
    );
    const body = encodeURIComponent(
      formatFinancialHealthSectionSubmission(activeStep, form, sectionTitle),
    );

    window.location.href = `${contactInfo.emailHref}?subject=${subject}&body=${body}`;
    setSubmittedSteps((current) => ({ ...current, [activeStep]: true }));
    setSubmitError("");
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-charcoal/35";
  const labelClass = "text-sm font-medium text-charcoal/85";
  const legendClass = "text-sm font-medium text-charcoal/85";

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface py-20 text-charcoal md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-fh-panel
          className="surface-panel mx-auto max-w-3xl overflow-hidden rounded-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="border-b border-charcoal/10 bg-charcoal/[0.03] px-4 py-5 md:px-8 md:py-6">
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={isFirstStep || isAnimating}
                  aria-label="Previous section"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/30 hover:bg-charcoal/5 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronIcon direction="left" />
                </button>

                <div className="min-w-0 flex-1 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal/50">
                    {String(activeStep + 1).padStart(2, "0")} /{" "}
                    {String(financialHealthSections.length).padStart(2, "0")}
                  </p>
                  <h2
                    ref={titleRef}
                    className="text-fluid-service-title mt-1 font-serif font-semibold text-charcoal"
                    aria-live="polite"
                  >
                    {splitTitleChars(activeSection.title)}
                  </h2>
                  <p
                    ref={subtitleRef}
                    className="mt-1 text-sm text-charcoal/65"
                  >
                    {activeSection.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(1)}
                  disabled={isLastStep || isAnimating}
                  aria-label="Next section"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal/30 hover:bg-charcoal/5 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden px-4 py-6 md:px-8 md:py-8">
              <div ref={cardRef} data-fh-step-card>
                <FinancialHealthFormStep
                  stepIndex={activeStep}
                  form={form}
                  onChange={updateField}
                  onToggleArray={toggleArrayField}
                  inputClass={inputClass}
                  labelClass={labelClass}
                  legendClass={legendClass}
                />
              </div>

              {submitError ? (
                <p className="mt-6 text-sm text-red-700" role="alert">
                  {submitError}
                </p>
              ) : null}

              {sectionSubmitted ? (
                <p className="mt-6 text-sm text-charcoal/75" role="status">
                  This section was submitted. Your email client should open with
                  these details. Use the arrows above to complete other sections.
                </p>
              ) : null}

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-sm font-semibold sm:w-auto"
                >
                  Submit Assessment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
