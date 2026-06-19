"use client";

import { useEffect, useState } from "react";
import SplashLoader from "@/components/splash-loader";
import { useSiteLoaderComplete } from "@/components/site-loader-provider";

const MIN_DISPLAY_MS = 2000;
const EXIT_DURATION_MS = 900;

export default function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const markReady = useSiteLoaderComplete();

  useEffect(() => {
    const startTime = Date.now();
    let pageLoaded = document.readyState === "complete";
    let exitTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleExit = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      exitTimer = setTimeout(() => setPhase("exiting"), remaining);
    };

    const onLoad = () => {
      pageLoaded = true;
      scheduleExit();
    };

    if (pageLoaded) {
      scheduleExit();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (phase !== "exiting") return;

    const fallbackTimer = setTimeout(() => {
      markReady();
      setPhase("done");
    }, EXIT_DURATION_MS + 100);

    return () => clearTimeout(fallbackTimer);
  }, [phase, markReady]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] transition-all ease-in-out ${
        phase === "exiting"
          ? "pointer-events-none -translate-y-10 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_DURATION_MS}ms` }}
      onTransitionEnd={(event) => {
        if (phase === "exiting" && event.propertyName === "opacity") {
          markReady();
          setPhase("done");
        }
      }}
    >
      <SplashLoader fullScreen={false} />
    </div>
  );
}
