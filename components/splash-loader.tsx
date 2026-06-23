"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type SplashLoaderProps = {
  fullScreen?: boolean;
};

export default function SplashLoader({ fullScreen = true }: SplashLoaderProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      logo,
      { opacity: 0 },
      { opacity: 1, duration: 1.1, ease: "power2.inOut" },
    ).to(logo, { opacity: 0, duration: 1.1, ease: "power2.inOut" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center bg-background ${
        fullScreen ? "fixed inset-0 z-[100] min-h-screen w-full" : "h-screen w-full"
      }`}
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div ref={logoRef} className="opacity-0">
        <Image
          src="/logo/haria-logo.png"
          alt="Haria Investments"
          width={128}
          height={128}
          className="h-32 w-32 object-contain"
          priority
        />
      </div>
      <span className="sr-only">Loading Haria Investments</span>
    </div>
  );
}
