"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSiteLoaderReady } from "@/components/site-loader-provider";

const NAV_OFFSET_PX = 80;
const RETRY_MS = [0, 120, 400, 900];

export default function HashScroll() {
  const isSiteLoaderReady = useSiteLoaderReady();
  const pathname = usePathname();

  useEffect(() => {
    if (!isSiteLoaderReady) return;

    const scrollToHash = (behavior: ScrollBehavior = "smooth") => {
      const { hash } = window.location;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (!target) return;

      const top =
        target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;

      window.scrollTo({
        top: Math.max(0, top),
        behavior,
      });
    };

    const scheduleScroll = (behavior: ScrollBehavior = "smooth") => {
      RETRY_MS.forEach((delay) => {
        window.setTimeout(() => scrollToHash(behavior), delay);
      });
    };

    scheduleScroll(window.location.hash ? "smooth" : "auto");

    const onHashChange = () => scheduleScroll("smooth");
    const onLoad = () => scheduleScroll("auto");

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("load", onLoad);
    };
  }, [isSiteLoaderReady, pathname]);

  return null;
}
