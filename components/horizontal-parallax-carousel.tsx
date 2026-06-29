"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import gsap from "gsap";

const PARALLAX_INTENSITY = 0.16;
const SCALE_MIN = 0.9;
const SCALE_MAX = 1.06;
const DRAG_THRESHOLD_PX = 6;

type CardMetrics = {
  centerOffset: number;
  width: number;
};

export type { CardMetrics };

type HorizontalParallaxCarouselProps = {
  children: ReactNode;
  className?: string;
  scrollDriven?: boolean;
  "aria-label"?: string;
};

export function getCarouselScrollDistance(
  container: HTMLElement | null,
  track: HTMLElement | null,
) {
  if (!container || !track) return 0;

  const cards = track.querySelectorAll<HTMLElement>("[data-parallax-card]");
  if (cards.length === 0) {
    return Math.max(0, track.scrollWidth - container.clientWidth);
  }

  const containerRect = container.getBoundingClientRect();
  const firstCardRect = cards[0].getBoundingClientRect();
  const lastCardRect = cards[cards.length - 1].getBoundingClientRect();

  const currentX = (gsap.getProperty(track, "x") as number) || 0;

  const firstCardLeftUnshifted = firstCardRect.left - containerRect.left - currentX;
  const lastCardRightUnshifted = lastCardRect.right - containerRect.left - currentX;

  const targetRight = containerRect.width - Math.max(0, firstCardLeftUnshifted);
  const distance = lastCardRightUnshifted - targetRight;

  return Math.max(0, Math.round(distance));
}

export function measureCarouselCards(
  container: HTMLElement,
): CardMetrics[] {
  const containerRect = container.getBoundingClientRect();
  const viewportCenter = containerRect.left + containerRect.width / 2;

  return Array.from(
    container.querySelectorAll<HTMLElement>("[data-parallax-card]"),
  ).map((card) => {
    const cardRect = card.getBoundingClientRect();
    return {
      centerOffset: cardRect.left + cardRect.width / 2 - viewportCenter,
      width: cardRect.width,
    };
  });
}

export function updateCarouselParallax(
  container: HTMLElement | null,
  options: {
    prefersReducedMotion?: boolean;
    scrollDriven?: boolean;
    trackX?: number;
    metrics?: CardMetrics[];
  } = {},
) {
  if (!container) return;

  const {
    prefersReducedMotion = false,
    scrollDriven = false,
    trackX = 0,
    metrics,
  } = options;

  const cards = container.querySelectorAll<HTMLElement>("[data-parallax-card]");
  const surfaces = container.querySelectorAll<HTMLElement>(
    "[data-parallax-card-surface]",
  );
  const images = container.querySelectorAll<HTMLElement>("[data-parallax-image]");

  if (prefersReducedMotion) {
    cards.forEach((card) => {
      card.style.transform = "";
    });
    surfaces.forEach((surface) => {
      surface.style.transform = "";
    });
    images.forEach((image) => {
      image.style.transform = "";
    });
    return;
  }

  const containerWidth = container.clientWidth;
  const halfViewport = containerWidth * 0.5;

  cards.forEach((card, index) => {
    const image = images[index];
    const surface = surfaces[index];
    const metric = metrics?.[index];

    let clampedOffset: number;

    if (scrollDriven && metric) {
      const centerOffset = metric.centerOffset + trackX;
      clampedOffset = Math.max(-1.25, Math.min(1.25, centerOffset / halfViewport));
    } else {
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.left + containerWidth / 2;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const normalizedOffset = (cardCenter - viewportCenter) / halfViewport;
      clampedOffset = Math.max(-1.25, Math.min(1.25, normalizedOffset));
    }

    const cardWidth = metric?.width ?? card.getBoundingClientRect().width;
    const maxShift = cardWidth * PARALLAX_INTENSITY;
    const translateX = -clampedOffset * maxShift;

    if (image) {
      image.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }

    if (!scrollDriven && surface) {
      const focus = 1 - Math.min(Math.abs(clampedOffset), 1);
      const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * focus;
      surface.style.transform = `scale(${scale})`;
    } else if (surface) {
      surface.style.transform = "";
    }
  });
}

export function HorizontalParallaxCarousel({
  children,
  className = "",
  scrollDriven = false,
  "aria-label": ariaLabel = "Carousel",
}: HorizontalParallaxCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const prefersReducedMotion = useRef(false);
  const rafId = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    updateCarouselParallax(containerRef.current, {
      prefersReducedMotion: prefersReducedMotion.current,
      scrollDriven: false,
    });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      updateParallax();
    });
  }, [updateParallax]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;

    const onMotionPreferenceChange = () => {
      prefersReducedMotion.current = mql.matches;
      updateParallax();
    };
    mql.addEventListener("change", onMotionPreferenceChange);

    const container = containerRef.current;
    if (!container) return;

    if (scrollDriven) {
      return () => {
        mql.removeEventListener("change", onMotionPreferenceChange);
      };
    }

    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      container.scrollLeft += event.deltaY;
      event.preventDefault();
      scheduleUpdate();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    updateParallax();

    return () => {
      mql.removeEventListener("change", onMotionPreferenceChange);
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [scheduleUpdate, scrollDriven, updateParallax]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (scrollDriven) return;

    const container = containerRef.current;
    if (!container || event.button !== 0) return;

    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = {
      x: event.clientX,
      scrollLeft: container.scrollLeft,
    };
    container.setPointerCapture(event.pointerId);
    container.style.cursor = "grabbing";
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (scrollDriven || !isDragging.current) return;

    const container = containerRef.current;
    if (!container) return;

    const delta = event.clientX - dragStart.current.x;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) {
      hasDragged.current = true;
    }

    container.scrollLeft = dragStart.current.scrollLeft - delta;
    scheduleUpdate();
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const container = containerRef.current;
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    if (container) container.style.cursor = "";
    scheduleUpdate();
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hasDragged.current) return;
    event.preventDefault();
    event.stopPropagation();
    hasDragged.current = false;
  };

  return (
    <div
      ref={containerRef}
      data-parallax-container
      className={`horizontal-parallax-carousel w-full ${
        scrollDriven
          ? "overflow-hidden"
          : "cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      } ${className}`}
      role="region"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
    >
      <div
        ref={trackRef}
        data-parallax-track
        className="flex w-max items-center gap-5 py-4 px-4 sm:gap-6 sm:px-6 lg:px-8 xl:px-12"
      >
        {children}
      </div>
    </div>
  );
}

type ParallaxCardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
};

export function ParallaxCard({
  children,
  className = "",
  ...rest
}: ParallaxCardProps) {
  return (
    <article
      data-parallax-card
      {...rest}
      className={`parallax-card group/parallax-card relative shrink-0 snap-center overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal shadow-[0_24px_64px_-28px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out hover:scale-[1.03] hover:border-white/30 hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div
        data-parallax-card-surface
        className="relative h-full w-full origin-center"
      >
        {children}
      </div>
    </article>
  );
}

type ParallaxCardImageProps = {
  children: ReactNode;
  className?: string;
};

export function ParallaxCardImage({
  children,
  className = "",
}: ParallaxCardImageProps) {
  return (
    <div
      data-parallax-image
      className={`absolute inset-y-0 left-[-10%] h-full w-[120%] transition-transform duration-700 ease-out group-hover/parallax-card:scale-110 ${className}`}
      aria-hidden
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
