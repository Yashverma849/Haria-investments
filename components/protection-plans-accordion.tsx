"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useState } from "react";
import type { ProtectionPlan } from "@/lib/life-insurance-data";
import { scheduleConsultation } from "@/lib/nav-links";

type ProtectionPlansAccordionProps = {
  plans: ProtectionPlan[];
  ctaLabel?: string;
  showScheduleConsultation?: boolean;
};

export default function ProtectionPlansAccordion({
  plans,
  ctaLabel = "Invest Now",
  showScheduleConsultation = false,
}: ProtectionPlansAccordionProps) {
  const groupId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleActivate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  return (
    <div
      data-plans-grid
      className="protection-plans-accordion flex h-[min(32rem,72svh)] flex-row gap-3 overflow-x-auto overscroll-x-contain lg:overflow-x-visible"
      onMouseLeave={handleDeactivate}
    >
      {plans.map((plan) => {
        const isExpanded = activeId === plan.id;
        const panelId = `${groupId}-${plan.id}-panel`;

        return (
          <article
            key={plan.id}
            data-plan-card
            data-expanded={isExpanded ? "true" : "false"}
            className={`protection-plans-accordion-card group/plan relative overflow-hidden rounded-2xl border border-charcoal/12 bg-charcoal text-white shadow-[0_18px_48px_-24px_rgba(0,0,0,0.45)] ${
              isExpanded ? "is-expanded" : ""
            }`}
            onMouseEnter={() => handleActivate(plan.id)}
            onFocus={() => handleActivate(plan.id)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                handleDeactivate();
              }
            }}
            onClick={() => handleToggle(plan.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleToggle(plan.id);
              }
            }}
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={panelId}
          >
            <Image
              src={plan.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover/plan:scale-105 motion-reduce:transition-none"
              sizes="(max-width: 1024px) 100vw, 20vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15"
              aria-hidden
            />

            <div
              className={`protection-plans-accordion-collapsed absolute inset-y-0 right-0 flex items-center justify-end px-2 pr-2 transition-opacity duration-300 ${
                isExpanded ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              aria-hidden={isExpanded}
            >
              <span className="inline-flex min-h-[10rem] max-h-none items-center justify-center px-3 py-5 font-serif text-fluid-process-title font-semibold tracking-wide text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
                <span className="[writing-mode:vertical-rl] rotate-180">
                  {plan.title}
                </span>
              </span>
            </div>

            <div
              id={panelId}
              className={`protection-plans-accordion-expanded absolute inset-0 flex flex-col justify-end overflow-y-auto p-5 transition-opacity duration-300 sm:p-6 ${
                isExpanded
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!isExpanded}
            >
              {plan.monthlyPremium ? (
                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-charcoal">
                  {plan.monthlyPremium}
                </span>
              ) : null}

              <div className="mt-auto">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h3 className="font-serif text-fluid-process-title font-semibold text-white">
                    {plan.title}
                  </h3>
                </div>

                {plan.description ? (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                    {plan.description}
                  </p>
                ) : null}

                {plan.tenure || plan.minAmount ? (
                  <dl className="mt-4 grid gap-1.5 text-sm text-white/75 sm:grid-cols-2">
                    {plan.tenure ? (
                      <div className="flex gap-2">
                        <dt className="shrink-0 font-medium text-white/90">
                          Tenure:
                        </dt>
                        <dd>{plan.tenure}</dd>
                      </div>
                    ) : null}
                    {plan.minAmount ? (
                      <div className="flex gap-2">
                        <dt className="shrink-0 font-medium text-white/90">
                          Min Amount:
                        </dt>
                        <dd>{plan.minAmount}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}

                {plan.features.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                  <Link
                    href={scheduleConsultation.href}
                    className="btn-primary inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {ctaLabel}
                  </Link>
                  {showScheduleConsultation ? (
                    <Link
                      href={scheduleConsultation.href}
                      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 sm:px-5 sm:py-2.5 sm:text-sm"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {scheduleConsultation.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
