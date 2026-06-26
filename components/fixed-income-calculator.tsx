"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCalculatorValue from "@/components/animated-calculator-value";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  fadeInOnScroll,
  scheduleScrollFadeReveal,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_START,
} from "@/lib/gsap-scroll-fade";
import SectionHeader from "@/components/section-header";

function calculateMaturity(
  principal: number,
  rate: number,
  years: number,
): { maturity: number; interest: number } {
  if (principal <= 0 || years <= 0 || rate < 0) {
    return { maturity: 0, interest: 0 };
  }

  const maturity = principal * (1 + rate / 100) ** years;
  return {
    maturity,
    interest: maturity - principal,
  };
}

export default function FixedIncomeCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [amount, setAmount] = useState(100_000);
  const [tenure, setTenure] = useState(5);
  const [rate, setRate] = useState(7.5);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [results, setResults] = useState({ maturity: 0, interest: 0 });

  const handleCalculate = useCallback(() => {
    setResults(calculateMaturity(amount, rate, tenure));
    setHasCalculated(true);
    setAnimationKey((key) => key + 1);
  }, [amount, rate, tenure]);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const panel = section.querySelector("[data-fi-calc-panel]");
    if (!panel) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(panel, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll(panel, {
        trigger: panel,
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        y: 24,
      });

      scheduleScrollFadeReveal(section);
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
      id="calculator"
      className="scroll-mt-24 border-t border-white/10 bg-background py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light">
          Calculate Returns
        </p>
      </div>
      <SectionHeader
        title="Fixed Income Calculator"
        description="Calculate your fixed income maturity amount"
        className="!pb-12 md:!pb-16"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-fi-calc-panel
          className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="font-serif text-xl font-semibold text-white">
                Investment Details
              </h3>

              <div className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="fi-amount"
                    className="block text-sm font-medium text-white/80"
                  >
                    Investment Amount (₹)
                  </label>
                  <input
                    id="fi-amount"
                    type="number"
                    min={0}
                    step={1000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/35"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fi-tenure"
                    className="block text-sm font-medium text-white/80"
                  >
                    Tenure (Years)
                  </label>
                  <input
                    id="fi-tenure"
                    type="number"
                    min={1}
                    max={30}
                    step={1}
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value) || 1)}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/35"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fi-rate"
                    className="block text-sm font-medium text-white/80"
                  >
                    Interest Rate (%)
                  </label>
                  <input
                    id="fi-rate"
                    type="number"
                    min={0}
                    max={20}
                    step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/35"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="btn-primary mt-8 inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-sm font-semibold"
              >
                Calculate
              </button>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-fluid-stat-large font-serif font-semibold text-white">
                <AnimatedCalculatorValue
                  value={results.maturity}
                  format="currency"
                  active={hasCalculated}
                  animationKey={animationKey}
                />
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-white/60">
                Maturity Amount
              </p>

              <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-white/70">Principal Amount</dt>
                  <dd className="text-fluid-stat font-semibold text-white">
                    <AnimatedCalculatorValue
                      value={hasCalculated ? amount : 0}
                      format="currency"
                      active={hasCalculated}
                      animationKey={animationKey}
                    />
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-white/70">Total Interest</dt>
                  <dd className="text-fluid-stat font-semibold text-white">
                    <AnimatedCalculatorValue
                      value={results.interest}
                      format="currency"
                      active={hasCalculated}
                      animationKey={animationKey}
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
