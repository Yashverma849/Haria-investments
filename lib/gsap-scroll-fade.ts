import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let refreshTimeoutId: number | null = null;

export function batchedScrollTriggerRefresh() {
  if (refreshTimeoutId !== null) return;
  refreshTimeoutId = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    refreshTimeoutId = null;
  });
}

export const SCROLL_FADE_START = "top 92%";
export const SCROLL_FADE_DURATION = 0.55;

export const SCROLL_REVEAL_SELECTORS = [
  "[data-fade-item]",
  "[data-mf-partners-marquee]",
  "[data-mf-fund-card]",
  "[data-mf-nav-table]",
  "[data-mf-nav-notes]",
  "[data-plan-card]",
  "[data-bullion-card]",
  "[data-market-insight-card]",
  "[data-approach-step]",
  "[data-fi-benefit-card]",
  "[data-fi-ladder-card]",
  "[data-fi-calc-panel]",
  "[data-why-choose-card]",
  "[data-section-title]",
  "[data-section-description]",
].join(", ");

export function isInScrollFadeViewport(
  element: Element,
  threshold = 0.92,
): boolean {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * threshold && rect.bottom > 0;
}

type FadeInOnScrollOptions = {
  trigger?: Element | null;
  start?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  y?: number;
  x?: number;
  once?: boolean;
};

export function fadeInOnScroll(
  targets: gsap.TweenTarget,
  options: FadeInOnScrollOptions = {},
) {
  const {
    trigger,
    start = SCROLL_FADE_START,
    duration = SCROLL_FADE_DURATION,
    stagger = 0,
    ease = "power2.out",
    y = 24,
    x,
    once = true,
  } = options;

  const triggerEl = (trigger ??
    (Array.isArray(targets) ? targets[0] : targets)) as Element | undefined;
  if (!triggerEl) return;

  const fromVars: gsap.TweenVars = { opacity: 0, y };
  const toVars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
  };

  if (x !== undefined) {
    fromVars.x = x;
    toVars.x = 0;
  }

  return gsap.fromTo(targets, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger: triggerEl,
      start,
      once,
    },
  });
}

export function scheduleScrollFadeReveal(
  container: Element | null,
  threshold = 0.92,
): void {
  requestAnimationFrame(() => {
    batchedScrollTriggerRefresh();

    if (!container) return;

    container
      .querySelectorAll<HTMLElement>(SCROLL_REVEAL_SELECTORS)
      .forEach((el) => {
        if (
          isInScrollFadeViewport(el, threshold) &&
          Number.parseFloat(getComputedStyle(el).opacity) < 0.05
        ) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: SCROLL_FADE_DURATION,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
  });
}
