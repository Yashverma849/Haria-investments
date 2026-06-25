"use client";

import Image from "next/image";
import type { AmcPartner } from "@/lib/mutual-funds-data";

type AmcLogoMarqueeProps = {
  partners: AmcPartner[];
  onSurface?: boolean;
};

const LOGO_FRAME_CLASS = "flex h-10 shrink-0 items-center justify-center leading-none sm:h-11 md:h-12";

const LOGO_SIZE_CLASSES = {
  default:
    "block h-10 w-auto max-w-[11rem] object-contain opacity-95 sm:h-11 sm:max-w-[13rem] md:h-12 md:max-w-[15rem]",
  lg: "block h-10 w-auto max-w-[14rem] origin-center scale-[1.3] object-contain opacity-95 sm:h-11 sm:max-w-[16rem] sm:scale-[1.35] md:h-12 md:max-w-[18rem] md:scale-[1.4]",
} as const;

const NIPPON_LOGO_RED_FILTER =
  "[filter:brightness(0)_saturate(100%)_invert(14%)_sepia(95%)_saturate(7044%)_hue-rotate(358deg)_brightness(95%)_contrast(106%)]";

function LogoCell({ partner }: { partner: AmcPartner }) {
  const isLarge = partner.logoSize === "lg";
  const sizeKey = isLarge ? "lg" : "default";
  const isNippon = partner.id === "nippon";

  return (
    <div className={LOGO_FRAME_CLASS} title={partner.name}>
      <Image
        src={partner.logo}
        alt=""
        width={320}
        height={128}
        className={`${LOGO_SIZE_CLASSES[sizeKey]} ${isNippon ? NIPPON_LOGO_RED_FILTER : ""}`}
        aria-hidden
      />
      <span className="sr-only">{partner.name}</span>
    </div>
  );
}

export default function AmcLogoMarquee({
  partners,
  onSurface = false,
}: AmcLogoMarqueeProps) {
  const loop = [...partners, ...partners];
  const fadeFrom = onSurface ? "from-surface" : "from-background";
  const fadeVia = onSurface ? "via-surface/90" : "via-background/90";

  return (
    <div
      data-mf-partners-marquee
      className="group/marquee relative w-full overflow-hidden bg-transparent py-0 opacity-0"
      aria-label="Asset management company partners"
    >
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${fadeFrom} ${fadeVia} to-transparent sm:w-24 md:w-32 motion-reduce:hidden`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${fadeFrom} ${fadeVia} to-transparent sm:w-24 md:w-32 motion-reduce:hidden`}
        aria-hidden
      />

      <div className="hidden flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 motion-reduce:flex sm:gap-x-16 md:px-8">
        {partners.map((partner) => (
          <LogoCell key={partner.id} partner={partner} />
        ))}
      </div>

      <div className="overflow-hidden motion-reduce:hidden">
        <div className="amc-logo-marquee-track flex w-max items-center gap-12 leading-none sm:gap-16 md:gap-20">
          {loop.map((partner, index) => (
            <LogoCell key={`${partner.id}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}
