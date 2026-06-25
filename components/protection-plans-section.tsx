"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { protectionPlans } from "@/lib/life-insurance-data";
import { scheduleConsultation } from "@/lib/nav-links";

export default function ProtectionPlansSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-plan-card]");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-plans-grid]"),
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
      id="protection-plans"
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface pt-20 text-charcoal md:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          Our Protection Plans
        </p>
      </div>

      <SectionHeader
        onSurface
        title="Choose Your Protection Plan"
        description="Tailored solutions for every life stage and financial goal"
        className="pt-4"
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
        <div
          data-plans-grid
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {protectionPlans.map((plan) => (
            <article
              key={plan.id}
              data-plan-card
              className="surface-panel group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative h-40 overflow-hidden sm:h-44">
                <Image
                  src={plan.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-charcoal">
                  {plan.monthlyPremium}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-xl font-semibold text-charcoal">
                  {plan.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {plan.description}
                </p>

                <dl className="mt-4 space-y-1.5 text-sm text-charcoal/70">
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-medium text-charcoal/90">
                      Tenure:
                    </dt>
                    <dd>{plan.tenure}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-medium text-charcoal/90">
                      Min Amount:
                    </dt>
                    <dd>{plan.minAmount}</dd>
                  </div>
                </dl>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-charcoal/12 bg-white/60 px-2.5 py-1 text-xs text-charcoal/80"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={scheduleConsultation.href}
                  className="btn-primary mt-auto inline-flex items-center justify-center self-start rounded-full px-6 py-2.5 text-sm font-semibold transition-transform duration-300 group-hover:scale-[1.02] sm:mt-6"
                >
                  Invest Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
