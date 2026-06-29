"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/section-header";
import {
  testimonialColumnA,
  testimonialColumnB,
  type Testimonial,
} from "@/lib/testimonials-data";

const PIXELS_PER_SECOND = 32;
const MANUAL_SCROLL_COOLDOWN_MS = 600;

type TestimonialCardProps = {
  item: Testimonial;
};

function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-background/70 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/25 text-xs font-semibold text-brand-light">
            {item.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-xs text-white/50">{item.role}</p>
          </div>
        </div>
        <svg
          className="h-4 w-4 shrink-0 text-white/25"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.45l.813 1.28C6.667 7.651 5.5 9.965 5.5 12.5c0 1.58.462 2.85 1.433 3.893L4.583 17.32zm12.834 0c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.45l.814 1.28c-2.676 1.81-3.843 4.124-3.843 6.659 0 1.58.463 2.85 1.434 3.893l-1.852 1.928z" />
        </svg>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/85">{item.quote}</p>
      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
        {item.date}
      </p>
    </article>
  );
}

type TestimonialMarqueeColumnProps = {
  items: Testimonial[];
  direction: "up" | "down";
};

function TestimonialMarqueeColumn({
  items,
  direction,
}: TestimonialMarqueeColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastFrameTime = useRef<number | null>(null);
  const isHovered = useRef(false);
  const isManualScroll = useRef(false);
  const manualScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef(0);
  const doubled = [...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const getHalfHeight = () => track.scrollHeight / 2;

    const normalizeOffset = (half: number) => {
      if (half <= 0) return;
      offsetRef.current = ((offsetRef.current % half) + half) % half;
    };

    const applyTransform = () => {
      track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
    };

    const markManualScroll = () => {
      isManualScroll.current = true;

      if (manualScrollTimer.current) {
        clearTimeout(manualScrollTimer.current);
      }

      manualScrollTimer.current = setTimeout(() => {
        isManualScroll.current = false;
      }, MANUAL_SCROLL_COOLDOWN_MS);
    };

    const half = getHalfHeight();
    offsetRef.current = direction === "down" ? half : 0;
    applyTransform();

    let frameId = 0;

    const canAutoScroll = () => !isHovered.current && !isManualScroll.current;

    const tick = (time: number) => {
      const previous = lastFrameTime.current ?? time;
      lastFrameTime.current = time;
      const deltaSeconds = Math.min((time - previous) / 1000, 0.05);

      if (canAutoScroll()) {
        const loopHeight = getHalfHeight();

        if (loopHeight > 0) {
          const delta =
            PIXELS_PER_SECOND * deltaSeconds * (direction === "up" ? 1 : -1);
          offsetRef.current += delta;
          normalizeOffset(loopHeight);
          applyTransform();
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    const onMouseEnter = () => {
      isHovered.current = true;
    };

    const onMouseLeave = () => {
      isHovered.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      markManualScroll();
      offsetRef.current += event.deltaY;
      normalizeOffset(getHalfHeight());
      applyTransform();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? 0;
      markManualScroll();
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const deltaY = touchStartY.current - currentY;
      touchStartY.current = currentY;

      if (deltaY !== 0) {
        markManualScroll();
        offsetRef.current += deltaY;
        normalizeOffset(getHalfHeight());
        applyTransform();
      }
    };

    const onResize = () => {
      normalizeOffset(getHalfHeight());
      applyTransform();
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
  }, [direction, items]);

  return (
    <div
      ref={containerRef}
      className="h-[520px] overflow-hidden overscroll-contain [touch-action:none] md:h-[580px]"
    >
      <div
        ref={trackRef}
        className="flex will-change-transform flex-col gap-4"
      >
        {doubled.map((item, index) => (
          <TestimonialCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const marqueeAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = marqueeAreaRef.current;
    if (!area) return;

    const blockPageScroll = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    area.addEventListener("wheel", blockPageScroll, { passive: false });

    return () => {
      area.removeEventListener("wheel", blockPageScroll);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-white/10 bg-background py-20 md:py-28"
    >
      <SectionHeader
        title="Client Stories"
        description="For over six decades, families and professionals have relied on us for insurance, investments, and honest guidance. Their stories reflect the trust we work to earn every day."
      />

      <div className="section-shell">
        <div ref={marqueeAreaRef} className="relative overscroll-contain">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-background to-transparent" />

          <div className="grid grid-cols-2 gap-4">
            <TestimonialMarqueeColumn
              items={testimonialColumnA}
              direction="up"
            />
            <TestimonialMarqueeColumn
              items={testimonialColumnB}
              direction="down"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
