"use client";

import Image from "next/image";
import AmcLogoMarquee from "@/components/amc-logo-marquee";
import { amcPartners, partnersSection } from "@/lib/mutual-funds-data";

const PARTNERS_STRIP_BG = "/images/heroes/hero-mutual-funds.jpg";

export default function MutualFundsPartners() {
  return (
    <section
      className="relative overflow-hidden border-y border-charcoal/10 bg-surface text-charcoal"
      aria-label="Trusted AMC partners"
    >
      <Image
        src={PARTNERS_STRIP_BG}
        alt=""
        fill
        className="object-cover object-[72%_center] opacity-[0.14] motion-reduce:opacity-[0.08]"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface from-35% via-surface/92 to-surface/72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,color-mix(in_srgb,var(--charcoal)_4%,transparent)_0%,transparent_42%,color-mix(in_srgb,var(--charcoal)_3%,transparent)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[min(48%,22rem)] opacity-[0.07] [mask-image:linear-gradient(to_left,black,transparent)] [-webkit-mask-image:linear-gradient(to_left,black,transparent)] motion-reduce:hidden"
        aria-hidden
      >
        <div className="flex h-full items-end justify-around gap-2 px-4 pb-1 pt-3">
          {[38, 62, 48, 74, 55, 68, 44, 58].map((height, index) => (
            <span
              key={index}
              className="w-2 rounded-t-sm bg-charcoal"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-[1]">
        <AmcLogoMarquee partners={amcPartners} label={partnersSection.label} />
      </div>
    </section>
  );
}
