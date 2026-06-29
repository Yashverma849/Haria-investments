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
  const formScrollRef = useRef<HTMLDivElement>(null);
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

  const goToStep = useCallback(
    (targetStep: number) => {
      if (
        isAnimatingRef.current ||
        targetStep === activeStep ||
        targetStep < 0 ||
        targetStep >= financialHealthSections.length
      ) {
        return;
      }

      const direction = targetStep > activeStep ? 1 : -1;
      directionRef.current = direction;
      setSubmitError("");

      if (prefersReducedMotionRef.current) {
        setActiveStep(targetStep);
        return;
      }

      const card = cardRef.current;
      const titleChars = titleRef.current?.querySelectorAll("[data-fh-title-char]");
      const subtitle = subtitleRef.current;

      if (!card) {
        setActiveStep(targetStep);
        return;
      }

      isAnimatingRef.current = true;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveStep(targetStep);
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

  const navigate = useCallback(
    (direction: 1 | -1) => {
      goToStep(activeStep + direction);
    },
    [activeStep, goToStep],
  );

  useEffect(() => {
    if (formScrollRef.current) {
      formScrollRef.current.scrollTop = 0;
    }

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
      <div className="section-shell">
        <div
          data-fh-panel
          className="surface-panel overflow-hidden rounded-2xl"
        >
          <form
            onSubmit={handleSubmit}
            className="flex h-[clamp(36rem,75vh,44rem)] flex-col lg:flex-row"
          >
            <aside
              aria-label="Assessment sections"
              className="flex h-full shrink-0 flex-col border-b border-charcoal/10 bg-charcoal/[0.03] lg:w-[min(100%,22rem)] lg:border-b-0 lg:border-r"
            >
              <div className="px-4 py-5 md:px-6 md:py-6 lg:px-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal/50">
                  {String(activeStep + 1).padStart(2, "0")} /{" "}
                  {String(financialHealthSections.length).padStart(2, "0")}
                </p>
                <h2
                  ref={titleRef}
                  className="text-fluid-service-title mt-2 font-serif font-semibold text-charcoal"
                  aria-live="polite"
                >
                  {splitTitleChars(activeSection.title)}
                </h2>
                <p
                  ref={subtitleRef}
                  className="mt-1.5 text-sm leading-relaxed text-charcoal/65"
                >
                  {activeSection.subtitle}
                </p>
              </div>

              <nav
                aria-label="Section progress"
                className="flex-1 overflow-y-auto px-4 pb-4 md:px-6 lg:px-7 lg:pb-6"
              >
                <ol className="space-y-1">
                  {financialHealthSections.map((section, index) => {
                    const isActive = index === activeStep;
                    const isComplete = Boolean(submittedSteps[index]);

                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => goToStep(index)}
                          aria-current={isActive ? "step" : undefined}
                          className={`w-full text-left rounded-xl border px-3 py-2.5 transition-all cursor-pointer ${
                            isActive
                              ? "border-charcoal/20 bg-white shadow-sm"
                              : "border-transparent bg-transparent hover:bg-white/60 hover:border-charcoal/10"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums ${
                                isActive
                                  ? "bg-charcoal text-white"
                                  : isComplete
                                    ? "bg-charcoal/10 text-charcoal/70"
                                    : "bg-charcoal/5 text-charcoal/45"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-sm leading-snug ${
                                  isActive
                                    ? "text-charcoal font-semibold"
                                    : "text-charcoal/70 font-medium"
                                }`}
                              >
                                {section.title}
                              </p>
                              {isActive ? (
                                <p className="mt-0.5 text-xs leading-relaxed text-charcoal/55">
                                  {section.subtitle}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </aside>

            <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
              <div
                ref={formScrollRef}
                data-fh-form-scroll
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 md:px-8 md:py-8"
              >
                <div className="overflow-hidden">
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
                </div>

                {submitError ? (
                  <p className="mt-6 text-sm text-red-700" role="alert">
                    {submitError}
                  </p>
                ) : null}

                {sectionSubmitted ? (
                  <p className="mt-6 text-sm text-charcoal/75" role="status">
                    This section was submitted. Your email client should open
                    with these details. Use the arrows on the left to complete
                    other sections.
                  </p>
                ) : null}
              </div>

              <div className="shrink-0 border-t border-charcoal/10 bg-surface px-4 py-4 md:px-8">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-sm font-semibold sm:w-auto"
                  >
                    Submit Assessment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
