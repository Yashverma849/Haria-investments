"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollFadeReveal } from "@/lib/gsap-scroll-fade";
import { waitForNextPaint } from "@/lib/page-ready";

gsap.registerPlugin(ScrollTrigger);

type SiteLoaderContextValue = {
  isReady: boolean;
  markReady: () => void;
};

const SiteLoaderContext = createContext<SiteLoaderContextValue | null>(null);

export function SiteLoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const readyPathnameRef = useRef<string | null>(null);
  const isFirstRouteRef = useRef(true);
  const [, bump] = useState(0);

  // Fast path: client navigations skip the full-screen loader.
  useEffect(() => {
    if (isFirstRouteRef.current) {
      return;
    }

    let cancelled = false;

    const finishNav = async () => {
      await waitForNextPaint();
      if (cancelled) return;

      readyPathnameRef.current = pathname;
      bump((n) => n + 1);

      await waitForNextPaint();
      if (cancelled) return;

      ScrollTrigger.refresh();
      const root =
        document.getElementById("smooth-content") ?? document.body;
      scheduleScrollFadeReveal(root);
    };

    void finishNav();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const isReady = readyPathnameRef.current === pathname;

  const markReady = useCallback(() => {
    isFirstRouteRef.current = false;
    readyPathnameRef.current = pathnameRef.current;
    bump((n) => n + 1);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      markReady,
    }),
    [isReady, markReady],
  );

  return (
    <SiteLoaderContext.Provider value={value}>
      {children}
    </SiteLoaderContext.Provider>
  );
}

export function useSiteLoaderReady() {
  const context = useContext(SiteLoaderContext);
  if (!context) {
    throw new Error("useSiteLoaderReady must be used within SiteLoaderProvider");
  }
  return context.isReady;
}

export function useSiteLoaderComplete() {
  const context = useContext(SiteLoaderContext);
  if (!context) {
    throw new Error(
      "useSiteLoaderComplete must be used within SiteLoaderProvider",
    );
  }
  return context.markReady;
}
