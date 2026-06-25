"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { insuranceCategories } from "@/lib/general-insurance-data";
import { scheduleConsultation } from "@/lib/nav-links";

export default function InsurancePlansSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-insurance-plan-card]");
    if (cards.length === 0) return;

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
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          once: true,
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (ScrollTrigger.isInViewport(section, 0.12)) {
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
        <div className="mx-auto max-w-6xl space-y-16 md:space-y-20">
          {insuranceCategories.map((category) => (
            <div key={category.id}>
              <div className="mb-8 md:mb-10">
                <h2 className="text-fluid-process-title font-serif font-semibold tracking-tight text-charcoal">
                  {category.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-charcoal/70">
                  {category.description}
                </p>
              </div>

              <div
                className={`grid gap-6 ${
                  category.plans.length > 1
                    ? "sm:grid-cols-2 lg:gap-8"
                    : "max-w-xl"
                } ${category.plans.length === 3 ? "lg:grid-cols-3" : ""}`}
              >
                {category.plans.map((plan) => (
                  <article
                    key={plan.id}
                    data-insurance-plan-card
                    className="surface-panel group flex flex-col overflow-hidden rounded-2xl opacity-0 transition-all duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:border-charcoal/20 hover:shadow-[0_16px_48px_-20px_color-mix(in_srgb,var(--charcoal)_14%,transparent)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={plan.image}
                        alt={plan.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-fluid-service-title font-serif font-semibold tracking-tight text-charcoal">
                          {plan.title}
                        </h3>
                        <span className="shrink-0 rounded-full border border-charcoal/15 bg-charcoal/5 px-3 py-1 text-xs font-semibold text-charcoal/80">
                          {plan.startingPrice}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                        {plan.description}
                      </p>

                      <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-charcoal/10 py-4">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                            Tenure
                          </dt>
                          <dd className="mt-1 text-sm font-medium text-charcoal">
                            {plan.tenure}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                            Min Amount
                          </dt>
                          <dd className="mt-1 text-sm font-medium text-charcoal">
                            {plan.minAmount}
                          </dd>
                        </div>
                      </dl>

                      <ul className="mt-4 flex flex-wrap gap-2">
                        {plan.features.map((feature) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
