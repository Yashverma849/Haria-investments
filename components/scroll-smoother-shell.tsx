"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { batchedScrollTriggerRefresh } from "@/lib/gsap-scroll-fade";

type ScrollSmootherShellProps = {
  children: ReactNode;
};

const SMOOTHER_DISABLED_ROUTES = [
  "/about",
  "/investment/equity",
  "/investment/fixed-income",
  "/commodities/silver-gold",
  "/commodities/trading",
  "/commodities/derivation",
];

export default function ScrollSmootherShell({ children }: ScrollSmootherShellProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const smootherDisabled = SMOOTHER_DISABLED_ROUTES.includes(pathname);

  useEffect(() => {
    const resetScroll = () => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTop(0);
        ScrollTrigger.refresh();
      } else {
        window.scrollTo(0, 0);
      }
    };

    resetScroll();

    // Reset again after DOM update and next paints to avoid Next.js router scroll restoration override
    const frame = requestAnimationFrame(resetScroll);
    const timer = setTimeout(resetScroll, 80);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [pathname]);

  useGsapAfterLoader(() => {
    if (smootherDisabled) {
      ScrollSmoother.get()?.kill();
      batchedScrollTriggerRefresh();
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

      batchedScrollTriggerRefresh();
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
