"use client";

import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

type ScrollSmootherShellProps = {
  children: ReactNode;
};

const SMOOTHER_DISABLED_ROUTES = [
  "/about",
  "/investment/equity",
  "/investment/fixed-income",
];

export default function ScrollSmootherShell({ children }: ScrollSmootherShellProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const smootherDisabled = SMOOTHER_DISABLED_ROUTES.includes(pathname);

  useGsapAfterLoader(() => {
    if (smootherDisabled) {
      ScrollSmoother.get()?.kill();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mm = gsap.matchMedia();
    let smoother: ScrollSmoother | null = null;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      smoother?.kill();
      smoother = null;
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      smoother = ScrollSmoother.create({
        wrapper,
        content: "#smooth-content",
        smooth: 1.1,
        smoothTouch: 0.12,
        ignoreMobileResize: true,
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      smoother?.kill();
      mm.revert();
    };
  }, [smootherDisabled]);

  if (smootherDisabled) {
    return <div id="smooth-content">{children}</div>;
  }

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="scroll-smoother-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
