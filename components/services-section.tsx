"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { serviceOfferings } from "@/lib/services-data";

const titleStyles = {
  light:
    "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.95)] group-hover/band:text-cream group-hover/band:[-webkit-text-stroke:0]",
  dark: "text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.95)] group-hover/band:text-charcoal group-hover/band:[-webkit-text-stroke:0]",
} as const;

const descStyles = {
  light: "text-cream/80",
  dark: "text-charcoal/75",
} as const;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const bands = section.querySelectorAll("[data-service-band]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([...bands], {
        opacity: 1,
        x: 0,
        y: 0,
      });
      bands.forEach((band) => {
        const label = band.querySelector("[data-service-title]");
        const content = band.querySelector("[data-service-content]");
        if (label) gsap.set(label, { opacity: 1, x: 0, y: 0 });
        if (content) gsap.set(content, { opacity: 1, x: 0, y: 0 });
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      bands.forEach((band, index) => {
        const content = band.querySelector("[data-service-content]");
        const target = content ?? band;
        const fromX = index % 2 === 0 ? -80 : 80;

        gsap.fromTo(
          target,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: band,
              start: "top bottom",
              once: true,
            },
          },
        );
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
      id="services"
      ref={sectionRef}
      className="w-full max-w-full overflow-x-clip border-t border-charcoal/10 bg-surface text-charcoal"
    >
      <SectionHeader
        onSurface
        title="Our Services"
        description="Insurance, investments, and wealth solutions backed by decades of experience—designed to protect, grow, and diversify your financial future."
        className="py-16 md:py-24 lg:py-28"
      />

      <div data-services-bands className="relative w-full max-w-full overflow-x-clip border-t border-charcoal/10">
        <div className="relative">
          {serviceOfferings.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              data-service-band
              className="group/band relative block h-[5rem] overflow-hidden border-b border-white/10 bg-charcoal transition-[height] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:z-20 hover:h-[min(46vh,26rem)] sm:h-[5.5rem] sm:hover:h-[min(50vh,30rem)] lg:h-24 lg:hover:h-[min(54vh,34rem)]"
            >
              <div
                data-service-media
                className="absolute inset-0 will-change-transform"
              >
                <div
                  data-service-media-inner
                  className="absolute inset-[-20%] origin-center scale-[1.2] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/band:scale-[1.05]"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/20 to-charcoal/70 transition-opacity duration-700 group-hover/band:via-charcoal/15 group-hover/band:to-charcoal/55" />

              <div className="relative z-10 flex h-full items-center justify-end px-6 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/band:items-end group-hover/band:justify-end group-hover/band:px-8 group-hover/band:pb-8 sm:px-10 lg:px-16 lg:group-hover/band:pb-12">
                <div
                  data-service-content
                  className="max-w-3xl text-right opacity-0 transition-all duration-700"
                >
                  <h3
                    data-service-title
                    className={`text-fluid-service-title font-serif font-semibold tracking-tight break-words drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] ${titleStyles[service.textTone]}`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-0 max-h-0 overflow-hidden text-sm leading-relaxed opacity-0 transition-all duration-500 group-hover/band:mt-3 group-hover/band:max-h-24 group-hover/band:opacity-100 sm:text-base ${descStyles[service.textTone]}`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>

              <span
                className="pointer-events-none absolute bottom-6 right-6 z-10 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full border border-cream/40 bg-cream/15 text-lg text-cream opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/band:translate-y-0 group-hover/band:opacity-100 group-hover/band:hover:scale-110 sm:bottom-8 sm:right-10 sm:h-14 sm:w-14"
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
