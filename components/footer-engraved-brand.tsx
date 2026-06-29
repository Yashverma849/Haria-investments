"use client";

import RotatingBrandText from "@/components/rotating-brand-text";

export default function FooterEngravedBrand() {
  return (
    <div className="relative overflow-hidden -mt-4 sm:-mt-8 lg:-mt-12" aria-hidden>
      <div className="relative mx-auto flex h-[clamp(3.2rem,13.5vw,12rem)] max-w-full items-center justify-center overflow-hidden">
        <RotatingBrandText
          className="relative h-[clamp(3.8rem,16vw,17rem)] w-full"
          wordClassName="engraved-brand-text flex items-center justify-center whitespace-nowrap font-sans text-[clamp(2.3rem,12.5vw,13rem)] font-bold leading-none tracking-[-0.04em]"
        />
      </div>
    </div>
  );
}
