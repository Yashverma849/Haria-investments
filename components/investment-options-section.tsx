"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  HorizontalParallaxCarousel,
  ParallaxCard,
  ParallaxCardImage,
} from "@/components/horizontal-parallax-carousel";
import { useScrollDrivenParallaxCarousel } from "@/hooks/use-scroll-driven-parallax-carousel";
import {
  investmentOptions,
  type InvestmentOption,
  type RiskLevel,
} from "@/lib/equity-investment-data";
import { scheduleConsultation } from "@/lib/nav-links";

const riskBadgeStyles: Record<RiskLevel, string> = {
  "Moderate Risk": "border-white/25 bg-white/10 text-white/95",
  "High Risk": "border-white/30 bg-white/12 text-white",
  "Very High Risk": "border-white/35 bg-white/15 text-white",
};

function InvestmentParallaxCard({ option }: { option: InvestmentOption }) {
  return (
    <ParallaxCard
      data-investment-card
      className="flex h-[min(78vh,520px)] w-[min(78vw,300px)] flex-col sm:h-[480px] sm:w-[320px] lg:h-[520px] lg:w-[340px]"
    >
      <ParallaxCardImage>
        <Image
          src={option.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover/parallax-card:scale-110"
          sizes="(max-width: 640px) 78vw, 340px"
          draggable={false}
        />
      </ParallaxCardImage>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/20"
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col p-5 text-white sm:p-6">
        <div className="flex flex-col items-start gap-2">
          <div className="min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] flex items-start">
            <h2 className="text-fluid-service-title font-serif font-semibold tracking-tight text-white leading-tight">
              {option.title}
            </h2>
          </div>
          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${riskBadgeStyles[option.risk]}`}
          >
            {option.risk}
          </span>
        </div>

        <div className="mt-4 min-h-[4.5rem] sm:min-h-[5rem] lg:min-h-[5.5rem] flex items-start">
          <p className="line-clamp-4 text-sm leading-relaxed text-white/80 sm:text-base">
            {option.description}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-white/12 py-4">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Tenure
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">
              {option.tenure}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Min Amount
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">
              {option.minAmount}
            </dd>
          </div>
        </dl>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          {option.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-2.5 py-1.5 text-center text-xs font-medium text-white/75 leading-tight"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 pt-5 sm:gap-3">
          <div className="min-w-0">
            <Link
              href={scheduleConsultation.href}
              className="btn-primary flex h-11 w-full items-center justify-center rounded-full px-3 text-center text-xs font-semibold sm:h-12 sm:px-4 sm:text-sm"
            >
              Invest Now
            </Link>
          </div>
          <div className="min-w-0">
            <Link
              href={scheduleConsultation.href}
              className="flex h-11 w-full items-center justify-center rounded-full border border-white/30 bg-white/15 px-3 text-center text-xs font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/20 sm:h-12 sm:px-4 sm:text-sm"
            >
              Schedule Consultant
            </Link>
          </div>
        </div>
      </div>
    </ParallaxCard>
  );
}

export default function InvestmentOptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollDrivenParallaxCarousel(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="horizontal-parallax-carousel-section border-t border-charcoal/10 bg-surface text-charcoal"
    >
      <div
        data-carousel-sticky
        className="sticky top-20 z-[1] flex h-[calc(100svh-5rem)] items-center bg-surface"
      >
        <div data-investment-carousel className="w-full">
          <HorizontalParallaxCarousel
            scrollDriven
            aria-label="Equity investment options"
          >
            {investmentOptions.map((option) => (
              <InvestmentParallaxCard key={option.id} option={option} />
            ))}
          </HorizontalParallaxCarousel>
        </div>
      </div>
    </section>
  );
}
