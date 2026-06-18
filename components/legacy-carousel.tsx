"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_ROTATE_MS = 4500;
const SWIPE_THRESHOLD = 10;

export type TeamMember = {
  name: string;
  image: string;
  bio: string[];
  badge?: string;
};

type LegacyCarouselProps = {
  members: TeamMember[];
};

type LegacyCardProps = {
  member: TeamMember;
  onExpandedChange: (expanded: boolean) => void;
};

function LegacyCard({ member, onExpandedChange }: LegacyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const setExpandedState = (value: boolean) => {
    setExpanded(value);
    onExpandedChange(value);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!pointerStart.current) return;

    const dx = Math.abs(event.clientX - pointerStart.current.x);
    const dy = Math.abs(event.clientY - pointerStart.current.y);

    if (dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD) {
      dragged.current = true;
    }
  };

  const handlePointerUp = () => {
    if (!dragged.current) {
      setExpandedState(!expanded);
    }
    pointerStart.current = null;
    dragged.current = false;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setExpandedState(!expanded);
    }
  };

  return (
    <article
      className="group/card w-[min(78vw,300px)] shrink-0 snap-center touch-pan-x sm:w-[300px] md:w-[320px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStart.current = null;
        dragged.current = false;
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${member.name} — hover or tap to read bio`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          draggable={false}
          className="pointer-events-none object-cover object-top transition-transform duration-500 group-hover/card:scale-105 select-none"
          sizes="320px"
        />

        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-16 transition-opacity duration-300 ${
            expanded ? "opacity-0" : "opacity-100 group-hover/card:opacity-0"
          }`}
        >
          {member.badge ? (
            <span className="mb-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              {member.badge}
            </span>
          ) : null}
          <h3 className="font-serif text-xl font-semibold tracking-tight text-white">
            {member.name}
          </h3>
        </div>

        <div
          className={`absolute inset-0 flex flex-col bg-background/94 backdrop-blur-md transition-all duration-300 ease-out ${
            expanded
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100"
          }`}
        >
          <div className="shrink-0 border-b border-white/10 p-5 pb-4">
            {member.badge ? (
              <span className="mb-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                {member.badge}
              </span>
            ) : null}
            <h3 className="font-serif text-xl font-semibold tracking-tight text-white">
              {member.name}
            </h3>
            <div className="mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-light to-brand" />
          </div>

          <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 pt-4 touch-pan-y">
            <div className="space-y-3">
              {member.bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-sm leading-relaxed text-white/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <p className="shrink-0 border-t border-white/5 px-5 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
            Scroll for more
          </p>
        </div>
      </div>
    </article>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const label = direction === "left" ? "Previous" : "Next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/80 text-white shadow-lg backdrop-blur-md transition-all hover:border-white/30 hover:bg-surface ${
        direction === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
      }`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

function getCardScrollLeft(container: HTMLElement, card: HTMLElement) {
  const maxScroll = container.scrollWidth - container.clientWidth;
  return Math.min(
    Math.max(0, card.offsetLeft - (container.clientWidth - card.clientWidth) / 2),
    maxScroll,
  );
}

export default function LegacyCarousel({ members }: LegacyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserScrolling = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoRotate = useCallback((temporary = true) => {
    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    if (temporary) {
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, AUTO_ROTATE_MS * 2);
    }
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      const card = cardRefs.current[index];
      if (!container || !card) return;

      container.scrollTo({
        left: getCardScrollLeft(container, card),
        behavior,
      });
      setActiveIndex(index);
    },
    [],
  );

  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % members.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, members.length, scrollToIndex]);

  const goToPrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + members.length) % members.length;
    scrollToIndex(prevIndex);
  }, [activeIndex, members.length, scrollToIndex]);

  const syncActiveIndexFromScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
      }

      isUserScrolling.current = true;
      pauseAutoRotate();

      scrollEndTimer.current = setTimeout(() => {
        isUserScrolling.current = false;
        syncActiveIndexFromScroll();
      }, 120);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", syncActiveIndexFromScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncActiveIndexFromScroll);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, [pauseAutoRotate, syncActiveIndexFromScroll]);

  useEffect(() => {
    if (isPaused || members.length <= 1) return;

    const intervalId = setInterval(() => {
      if (isUserScrolling.current) return;

      setActiveIndex((current) => {
        const nextIndex = (current + 1) % members.length;
        const container = scrollRef.current;
        const card = cardRefs.current[nextIndex];

        if (container && card) {
          container.scrollTo({
            left: getCardScrollLeft(container, card),
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, AUTO_ROTATE_MS);

    return () => clearInterval(intervalId);
  }, [isPaused, members.length]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  return (
    <div className="-mx-6 mt-16 md:mt-24 lg:-mx-8">
      <div
        className="relative px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => pauseAutoRotate()}
        onFocusCapture={() => pauseAutoRotate()}
      >
        <CarouselArrow direction="left" onClick={() => goToPrev()} />
        <CarouselArrow direction="right" onClick={() => goToNext()} />

        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-webkit-overflow-scrolling:touch] [touch-action:pan-x] lg:gap-6"
        >
          {members.map((member, index) => (
            <div
              key={member.name}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="shrink-0 snap-center"
            >
              <LegacyCard
                member={member}
                onExpandedChange={(expanded) => {
                  if (expanded) pauseAutoRotate(false);
                  else setIsPaused(false);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
