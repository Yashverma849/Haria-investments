"use client";

import Image from "next/image";
import type { AmcPartner } from "@/lib/mutual-funds-data";

type AmcLogoMarqueeProps = {
  partners: AmcPartner[];
  onSurface?: boolean;
  direction?: "horizontal" | "vertical";
  backgroundImage?: string;
};

const LOGO_FRAME_CLASS = {
  default:
    "flex h-10 shrink-0 items-center justify-center leading-none sm:h-11 md:h-12",
  lg: "flex h-11 shrink-0 items-center justify-center leading-none sm:h-12 md:h-14",
  xl: "flex h-12 shrink-0 items-center justify-center leading-none sm:h-14 md:h-16",
} as const;

const LOGO_SIZE_CLASSES = {
  default:
    "block h-10 w-auto max-w-[11rem] object-contain opacity-95 sm:h-11 sm:max-w-[13rem] md:h-12 md:max-w-[15rem]",
  lg: "block h-10 w-auto max-w-[14rem] origin-center scale-[1.3] object-contain opacity-95 sm:h-11 sm:max-w-[16rem] sm:scale-[1.35] md:h-12 md:max-w-[18rem] md:scale-[1.4]",
  xl: "block h-11 w-auto max-w-[16rem] origin-center scale-[1.55] object-contain opacity-95 sm:h-12 sm:max-w-[18rem] sm:scale-[1.65] md:h-14 md:max-w-[20rem] md:scale-[1.75]",
} as const;

const NIPPON_LOGO_RED_FILTER =
  "[filter:brightness(0)_saturate(100%)_invert(14%)_sepia(95%)_saturate(7044%)_hue-rotate(358deg)_brightness(95%)_contrast(106%)]";

function LogoCell({ partner }: { partner: AmcPartner }) {
  const sizeKey = partner.logoSize ?? "default";
  const isNippon = partner.id === "nippon";
  const frameClass = LOGO_FRAME_CLASS[sizeKey];
  const imageClass = LOGO_SIZE_CLASSES[sizeKey];

  return (
    <div className={frameClass} title={partner.name}>
      <Image
        src={partner.logo}
        alt=""
        width={320}
        height={128}
        className={`${imageClass} ${isNippon ? NIPPON_LOGO_RED_FILTER : ""}`}
        aria-hidden
      />
      <span className="sr-only">{partner.name}</span>
    </div>
  );
}

export default function AmcLogoMarquee({
  partners,
  onSurface = false,
  direction = "horizontal",
  backgroundImage,
}: AmcLogoMarqueeProps) {
  const loop = [...partners, ...partners];
  const fadeFrom = onSurface ? "from-surface" : "from-background";
  const fadeVia = onSurface ? "via-surface/90" : "via-background/90";
  const isVertical = direction === "vertical";

  return (
    <div
      data-mf-partners-marquee
      className={`group/marquee relative overflow-hidden opacity-0 ${
        isVertical
          ? "h-[min(22rem,52svh)] w-full rounded-2xl border border-charcoal/10 bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:h-[min(24rem,56svh)] lg:h-[min(26rem,60svh)]"
          : "w-full bg-transparent py-0"
      }`}
      aria-label="Asset management company partners"
    >
      {isVertical && backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="(max-width: 1024px) 100vw, 40vw"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/8 via-surface/92 to-brand-light/10"
            aria-hidden
          />
        </>
      ) : isVertical ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/6 via-surface to-charcoal/[0.04]"
          aria-hidden
        />
      ) : null}
      {isVertical ? (
        <>
          <div className="relative z-[1] hidden h-full flex-col flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 motion-reduce:flex">
            {partners.map((partner) => (
              <LogoCell key={partner.id} partner={partner} />
            ))}
          </div>

          <div className="relative z-[1] h-full overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
            <div className="amc-logo-marquee-track amc-logo-marquee-track--vertical flex w-full flex-col items-center gap-10 py-2 sm:gap-12">
              {loop.map((partner, index) => (
                <LogoCell key={`${partner.id}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
