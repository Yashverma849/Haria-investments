"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import {
  calculateCagr,
  calculateLumpSum,
  calculateSip,
  calculateSwp,
  calculatorConfigs,
  type CalculatorType,
} from "@/lib/calculator-data";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

type InvestmentCalculatorProps = {
  type: CalculatorType;
};

export default function InvestmentCalculator({ type }: InvestmentCalculatorProps) {
  const config = calculatorConfigs[type];
  const sectionRef = useRef<HTMLElement>(null);

  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.fields.map((field) => [field.id, field.defaultValue])),
  );

  const results = useMemo(() => {
    switch (type) {
      case "sip": {
        const { corpus, invested, returns } = calculateSip(
          values.monthly ?? 0,
          values.rate ?? 0,
          values.years ?? 0,
        );
        return {
          primary: currencyFormatter.format(corpus),
          secondary: currencyFormatter.format(invested),
          tertiary: currencyFormatter.format(returns),
        };
      }
      case "swp": {
        const { remaining, withdrawn, returnsEarned } = calculateSwp(
          values.corpus ?? 0,
          values.monthly ?? 0,
          values.rate ?? 0,
          values.years ?? 0,
        );
        return {
          primary: currencyFormatter.format(remaining),
          secondary: currencyFormatter.format(withdrawn),
          tertiary: currencyFormatter.format(returnsEarned),
        };
      }
      case "lump-sum": {
        const { value, returns } = calculateLumpSum(
          values.principal ?? 0,
          values.rate ?? 0,
          values.years ?? 0,
        );
        return {
          primary: currencyFormatter.format(value),
          secondary: currencyFormatter.format(values.principal ?? 0),
          tertiary: currencyFormatter.format(returns),
        };
      }
      case "cagr": {
        const cagr = calculateCagr(
          values.initial ?? 0,
          values.final ?? 0,
          values.years ?? 0,
        );
        return {
          primary: `${percentFormatter.format(cagr)}%`,
          secondary: currencyFormatter.format(values.initial ?? 0),
          tertiary: currencyFormatter.format(values.final ?? 0),
        };
      }
      default:
        return { primary: "—", secondary: "—", tertiary: "—" };
    }
  }, [type, values]);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const panel = section.querySelector("[data-calc-panel]");
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
  }, [type]);

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface py-20 text-charcoal md:py-28"
    >
      <SectionHeader
        onSurface
        title={config.title}
        description={config.description}
        className="!pb-12 md:!pb-16"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-calc-panel
          className="mx-auto max-w-5xl rounded-2xl border border-charcoal/10 bg-white/70 p-6 backdrop-blur-sm md:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Input Details
              </h3>

              <div className="mt-6 space-y-6">
                {config.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={`calc-${type}-${field.id}`}
                      className="block text-sm font-medium text-charcoal/80"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`calc-${type}-${field.id}`}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={values[field.id]}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.id]: Number(event.target.value) || 0,
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-charcoal/35"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-charcoal/10 bg-surface p-6 md:p-8">
              <p className="text-fluid-stat-large font-serif font-semibold text-charcoal">
                {results.primary}
              </p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-charcoal/60">
                {config.primaryLabel}
              </p>

              <dl className="mt-8 space-y-4 border-t border-charcoal/10 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-charcoal/70">{config.secondaryLabel}</dt>
                  <dd className="text-fluid-stat font-semibold text-charcoal">
                    {results.secondary}
                  </dd>
                </div>
                {config.tertiaryLabel ? (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-charcoal/70">{config.tertiaryLabel}</dt>
                    <dd className="text-fluid-stat font-semibold text-charcoal">
                      {results.tertiary}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
