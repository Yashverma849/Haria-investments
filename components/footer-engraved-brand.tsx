"use client";

import RotatingBrandText from "@/components/rotating-brand-text";

export default function FooterEngravedBrand() {
  return (
    <div className="relative overflow-hidden pt-4" aria-hidden>
      <div className="relative mx-auto flex h-[clamp(5.5rem,18vw,12rem)] max-w-full items-end justify-center overflow-hidden">
        <RotatingBrandText
          className="relative h-[clamp(6rem,26vw,17rem)] w-full max-w-5xl"
          wordClassName="engraved-brand-text flex items-end justify-center whitespace-nowrap font-sans text-[clamp(4.5rem,20vw,13rem)] font-bold leading-none tracking-[-0.04em] translate-y-[18%]"
        />
      </div>
    </div>
  );
}
