"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 8;

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function getRelativeLuminance(r: number, g: number, b: number) {
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  );
}

function isLightBackground(color: string) {
  if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") {
    return false;
  }

  const rgb = parseRgb(color);
  if (!rgb) return false;

  return getRelativeLuminance(rgb[0], rgb[1], rgb[2]) > 0.62;
}

function getEffectiveBackgroundColor(element: Element | null) {
  let current: Element | null = element;

  while (current && current !== document.documentElement) {
    const backgroundColor = getComputedStyle(current).backgroundColor;
    if (
      backgroundColor &&
      backgroundColor !== "transparent" &&
      backgroundColor !== "rgba(0, 0, 0, 0)"
    ) {
      return backgroundColor;
    }
    current = current.parentElement;
  }

  return getComputedStyle(document.body).backgroundColor;
}

function sampleSurfaceBehindNav() {
  const header = document.querySelector("header");
  if (!header) return false;

  const previousPointerEvents = header.style.pointerEvents;
  header.style.pointerEvents = "none";

  const sampleX = Math.round(window.innerWidth / 2);
  const sampleY = 12;
  const element = document.elementFromPoint(sampleX, sampleY);

  header.style.pointerEvents = previousPointerEvents;

  if (!element) return false;

  return isLightBackground(getEffectiveBackgroundColor(element));
}

function readDeclaredNavTheme() {
  const main = document.querySelector("main");
  return main?.getAttribute("data-nav-theme") === "light";
}

export function useNavSurface() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [onLightSurface, setOnLightSurface] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD_PX;
      setScrolled(isScrolled);

      if (isScrolled) {
        setOnLightSurface(false);
        return;
      }

      if (readDeclaredNavTheme()) {
        setOnLightSurface(true);
        return;
      }

      setOnLightSurface(sampleSurfaceBehindNav());
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const main = document.querySelector("main");
    const observer = new MutationObserver(scheduleUpdate);
    if (main) {
      observer.observe(main, {
        attributes: true,
        attributeFilter: ["data-nav-theme", "class"],
      });
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, [pathname]);

  return { scrolled, onLightSurface };
}
