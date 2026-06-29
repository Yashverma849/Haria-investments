"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { offerings } from "@/lib/offerings-data";

export default function WhatWeOfferSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector("[data-offer-header]");
    const cards = section.querySelectorAll("[data-offer-card]");

    if (header) {
      gsap.fromTo(
        header.querySelectorAll("[data-fade-item]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 88%",
            once: true,
          },
        },
      );
    }

    gsap.fromTo(
      cards,
      { opacity: 0, y: 32, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector("[data-offer-grid]"),
          start: "top 88%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="offerings"
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <div className="section-shell">
        <div data-offer-header className="mx-auto max-w-3xl text-center">
          <p
            data-fade-item
            className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
          >
            What We Offer
          </p>
          <h2
            data-fade-item
            className="text-fluid-page mt-4 text-balance font-serif font-semibold tracking-tight text-white opacity-0"
          >
            Our Comprehensive Financial Services
          </h2>
          <p
            data-fade-item
            className="mt-4 text-base leading-relaxed text-white/70 opacity-0"
          >
            Transparent, comprehensive financial planning with proven results
          </p>
        </div>

        <div
          data-offer-grid
          className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8"
        >
          {offerings.map((item) => (
            <article
              key={item.id}
              data-offer-card
              className="group/offer relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-brand/[0.03] opacity-0 backdrop-blur-xl transition-all duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:border-brand-light/35 hover:shadow-[0_24px_60px_-24px_rgba(255,255,255,0.12)]"
            >
              <div className="absolute inset-[-10%] opacity-35 transition-opacity duration-300 group-hover/offer:opacity-50">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-brand-light/8 to-background/20 transition-all duration-300 group-hover/offer:from-brand/22 group-hover/offer:via-brand-light/12" />
              <div className="absolute inset-0 bg-background/15" />

              <div className="relative z-10 flex min-h-[320px] flex-col justify-end p-6 md:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-light">
                  {item.subtitle}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="btn-primary mt-6 inline-flex w-fit items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold"
                >
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
