"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  investmentOptions,
  type RiskLevel,
} from "@/lib/equity-investment-data";
import { scheduleConsultation } from "@/lib/nav-links";

const riskBadgeStyles: Record<RiskLevel, string> = {
  "Moderate Risk":
    "border-charcoal/15 bg-charcoal/5 text-charcoal/80",
  "High Risk":
    "border-charcoal/20 bg-charcoal/10 text-charcoal",
  "Very High Risk":
    "border-charcoal/25 bg-charcoal/15 text-charcoal",
};

export default function InvestmentOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const grid = section.querySelector("[data-investment-grid]");
    const cards = section.querySelectorAll("[data-investment-card]");
    if (!grid || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cards, { opacity: 0, y: 28 });

      const tween = gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          once: true,
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (ScrollTrigger.isInViewport(grid, 0.12)) {
          tween.progress(1);
        }
      });
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
      className="border-t border-charcoal/10 bg-surface py-20 text-charcoal md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-investment-grid
          className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {investmentOptions.map((option) => (
            <article
              key={option.id}
              data-investment-card
              className="surface-panel group flex flex-col overflow-hidden rounded-2xl opacity-0 transition-all duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:border-charcoal/20 hover:shadow-[0_16px_48px_-20px_color-mix(in_srgb,var(--charcoal)_14%,transparent)]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-fluid-service-title font-serif font-semibold tracking-tight text-charcoal">
                    {option.title}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${riskBadgeStyles[option.risk]}`}
                  >
                    {option.risk}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                  {option.description}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-charcoal/10 py-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                      Tenure
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-charcoal">
                      {option.tenure}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                      Min Amount
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-charcoal">
                      {option.minAmount}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-charcoal/10 bg-charcoal/5 px-3 py-1 text-xs font-medium text-charcoal/75"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href={scheduleConsultation.href}
                    className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold sm:w-auto"
                  >
                    Invest Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
