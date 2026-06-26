"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashLoader from "@/components/splash-loader";
import { useSiteLoaderComplete } from "@/components/site-loader-provider";
import { scheduleScrollFadeReveal } from "@/lib/gsap-scroll-fade";
import {
  delay,
  waitForCriticalImages,
  waitForNextPaint,
} from "@/lib/page-ready";

gsap.registerPlugin(ScrollTrigger);

/** Brief first-visit splash only — client navigations use the provider fast path. */
const MIN_DISPLAY_MS = 350;
const EXIT_DURATION_MS = 450;

export default function SiteLoader() {
  const markReady = useSiteLoaderComplete();
  const [phase, setPhase] = useState<"loading" | "exiting">("loading");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const finishLoading = async () => {
      const startTime = Date.now();

      await document.fonts.ready;
      if (cancelled) return;

      const root =
        document.getElementById("smooth-content") ?? document.body;
      await waitForCriticalImages(root, { timeoutMs: 500, maxImages: 6 });
      if (cancelled) return;

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      if (remaining > 0) {
        await delay(remaining);
      }
      if (cancelled) return;

      markReady();

      await waitForNextPaint();
      ScrollTrigger.refresh();
      scheduleScrollFadeReveal(root);
      if (cancelled) return;

      setPhase("exiting");
    };

    void finishLoading();

    return () => {
      cancelled = true;
    };
  }, [markReady]);

  useEffect(() => {
    if (phase !== "exiting") return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, EXIT_DURATION_MS + 40);

    return () => clearTimeout(timer);
  }, [phase]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] transition-all ease-in-out ${
        phase === "exiting"
          ? "pointer-events-none -translate-y-10 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_DURATION_MS}ms` }}
      aria-hidden={phase === "exiting"}
      aria-busy={phase === "loading"}
    >
      <SplashLoader fullScreen={false} />
    </div>
  );
}
