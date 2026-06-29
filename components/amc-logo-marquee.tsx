"use client";

import { Fragment } from "react";
import Image from "next/image";
import type { AmcPartner } from "@/lib/mutual-funds-data";

type AmcLogoMarqueeProps = {
  partners: AmcPartner[];
  label: string;
};

const STRIP_LOGO_CLASS = {
  default:
    "block h-7 w-auto max-w-[5.5rem] object-contain opacity-90 sm:h-8 sm:max-w-[6.5rem]",
  lg: "block h-8 w-auto max-w-[6.5rem] object-contain opacity-95 sm:h-9 sm:max-w-[7.5rem]",
  xl: "block h-8 w-auto max-w-[7rem] object-contain opacity-100 sm:h-9 sm:max-w-[8rem]",
} as const;

const STRIP_LOGO_FRAME_CLASS = {
  default: "flex h-8 shrink-0 items-center justify-center",
  lg: "flex h-9 shrink-0 items-center justify-center",
  xl: "flex h-9 shrink-0 items-center justify-center sm:h-10",
} as const;

function StripSeparator() {
  return (
    <span
      className="shrink-0 select-none px-4 text-sm text-charcoal/25 sm:px-6"
      aria-hidden
    >
      —
    </span>
  );
}

function StripLabel({ label }: { label: string }) {
  return (
    <span className="shrink-0 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-charcoal/65 sm:text-xs sm:tracking-[0.32em]">
      {label}
    </span>
  );
}

function StripLogoCell({ partner }: { partner: AmcPartner }) {
  const sizeKey = partner.logoSize ?? "default";

  return (
    <div
      className={STRIP_LOGO_FRAME_CLASS[sizeKey]}
      title={partner.name}
    >
      <Image
        src={partner.logo}
        alt=""
        width={260}
        height={64}
        className={STRIP_LOGO_CLASS[sizeKey]}
        aria-hidden
      />
      <span className="sr-only">{partner.name}</span>
    </div>
  );
}

function MarqueeSegment({
  partners,
  label,
}: {
  partners: AmcPartner[];
  label: string;
}) {
  return (
    <>
      <StripLabel label={label} />
      <StripSeparator />
      {partners.map((partner) => (
        <Fragment key={partner.id}>
          <StripLogoCell partner={partner} />
          <StripSeparator />
        </Fragment>
      ))}
    </>
  );
}

export default function AmcLogoMarquee({ partners, label }: AmcLogoMarqueeProps) {
  return (
    <div
      className="group/marquee relative overflow-hidden py-3 sm:py-3.5"
      aria-label="Asset management company partners"
    >
      <div className="hidden flex-wrap items-center justify-center gap-x-4 gap-y-3 px-6 motion-reduce:flex sm:gap-x-6">
        <StripLabel label={label} />
        <StripSeparator />
        {partners.map((partner) => (
          <Fragment key={partner.id}>
            <StripLogoCell partner={partner} />
            <StripSeparator />
          </Fragment>
        ))}
      </div>

      <div className="overflow-hidden motion-reduce:hidden">
        <div className="amc-logo-marquee-track amc-logo-marquee-track--strip flex w-max items-center">
          <MarqueeSegment partners={partners} label={label} />
          <MarqueeSegment partners={partners} label={label} />
        </div>
      </div>
    </div>
  );
}
