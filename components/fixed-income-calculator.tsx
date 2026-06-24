"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

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

  const { maturity, interest } = useMemo(
    () => calculateMaturity(amount, rate, tenure),
    [amount, rate, tenure],
  );

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
      id="calculator"
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface py-20 text-charcoal md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          Calculate Returns
        </p>
      </div>
      <SectionHeader
        onSurface
        title="Fixed Income Calculator"
        description="Calculate your fixed income maturity amount"
        className="!pb-12 md:!pb-16"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-fi-calc-panel
          className="mx-auto max-w-5xl rounded-2xl border border-charcoal/10 bg-white/70 p-6 backdrop-blur-sm md:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Investment Details
              </h3>

              <div className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="fi-amount"
                    className="block text-sm font-medium text-charcoal/80"
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
                    className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-charcoal/35"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fi-tenure"
                    className="block text-sm font-medium text-charcoal/80"
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
                    className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-charcoal/35"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fi-rate"
                    className="block text-sm font-medium text-charcoal/80"
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
                    className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-charcoal/35"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-charcoal/10 bg-surface p-6 md:p-8">
              <p className="text-fluid-stat-large font-serif font-semibold text-charcoal">
                {currencyFormatter.format(maturity)}
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-charcoal/60">
                Maturity Amount
              </p>

              <dl className="mt-8 space-y-4 border-t border-charcoal/10 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-charcoal/70">Principal Amount</dt>
                  <dd className="text-fluid-stat font-semibold text-charcoal">
                    {currencyFormatter.format(amount)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-charcoal/70">Total Interest</dt>
                  <dd className="text-fluid-stat font-semibold text-charcoal">
                    {currencyFormatter.format(interest)}
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
