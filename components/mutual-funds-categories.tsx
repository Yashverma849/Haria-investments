"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  fundCategories,
  type FundCategory,
  type RiskLevel,
} from "@/lib/mutual-funds-data";
import { scheduleConsultation } from "@/lib/nav-links";

const riskStyles: Record<RiskLevel, string> = {
  "High Risk":
    "border-white/25 bg-white/10 text-white",
  "Low Risk":
    "border-white/20 bg-white/8 text-white/90",
  "Moderate Risk":
    "border-white/22 bg-white/9 text-white/95",
};

function FundCard({ fund }: { fund: FundCategory }) {
  return (
    <article
      data-mf-fund-card
      className="group/fund overflow-hidden rounded-2xl border border-white/10 bg-brand/[0.03] opacity-0 backdrop-blur-xl transition-all duration-300 ease-out hover:border-white/20 hover:shadow-[0_24px_60px_-24px_rgba(255,255,255,0.12)]"
    >
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
          <Image
            src={fund.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover/fund:scale-105"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${riskStyles[fund.risk]}`}
            >
              {fund.risk}
            </span>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
              {fund.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <div className="hidden lg:block">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${riskStyles[fund.risk]}`}
            >
              {fund.risk}
            </span>
            <h3 className="mt-4 font-serif text-fluid-process-title font-semibold text-white">
              {fund.title}
            </h3>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
            {fund.description}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Tenure
              </dt>
              <dd className="mt-1 font-medium text-white">{fund.tenure}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Min Amount
              </dt>
              <dd className="mt-1 font-medium text-white">{fund.minAmount}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-5">
            {fund.classifications.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                  {group.title}
                </h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {group.note ? (
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    {group.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {fund.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70"
              >
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href={scheduleConsultation.href}
            className="btn-primary mt-8 inline-flex w-fit items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            Invest Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function MutualFundsCategories() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-mf-fund-card]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-mf-fund-grid]"),
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
    <section ref={sectionRef} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-mf-fund-grid
          className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10"
        >
          {fundCategories.map((fund) => (
            <FundCard key={fund.id} fund={fund} />
          ))}
        </div>
      </div>
    </section>
  );
}
