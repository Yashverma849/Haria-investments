"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceOfferings } from "@/lib/services-data";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector("[data-services-header]");
    const cards = section.querySelectorAll("[data-service-card]");

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
      { opacity: 0, y: 28, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector("[data-services-grid]"),
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
      id="services"
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-services-header
          className="mx-auto max-w-3xl text-center"
        >
          <p
            data-fade-item
            className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-light opacity-0"
          >
            Our Services &amp; Expertise
          </p>
          <h2
            data-fade-item
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white opacity-0 sm:text-4xl"
          >
            Comprehensive Financial Solutions
          </h2>
          <p
            data-fade-item
            className="mt-4 text-base leading-relaxed text-white/70 opacity-0"
          >
            Backed by decades of experience and trusted by 1500+ clients across
            India
          </p>
        </div>

        <div
          data-services-grid
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6"
        >
          {serviceOfferings.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              data-service-card
              className="group/service relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-brand/[0.03] opacity-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:border-brand-light/35 hover:bg-brand/[0.06] hover:shadow-[0_20px_50px_-20px_rgba(47,128,237,0.45)]"
            >
              <div className="absolute inset-[-10%] opacity-40 transition-opacity duration-300 group-hover/service:opacity-55">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-brand-light/8 to-background/15 transition-all duration-300 group-hover/service:from-brand/22 group-hover/service:via-brand-light/12" />
              <div className="absolute inset-0 bg-background/10" />

              <div className="relative z-10 flex min-h-[220px] flex-col justify-end p-6">
                <h3 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
