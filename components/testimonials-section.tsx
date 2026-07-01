"use client";

import { useState, useRef, useEffect } from "react";
import SectionHeader from "@/components/section-header";
import { testimonials, type Testimonial } from "@/lib/testimonials-data";

type TestimonialCardProps = {
  item: Testimonial;
};

function TestimonialCard({ item }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = item.quote.length > 180;

  return (
    <article
      className={`w-[280px] sm:w-[340px] md:w-[380px] shrink-0 rounded-2xl border border-white/10 bg-background/70 p-5 md:p-6 backdrop-blur-sm flex flex-col justify-between select-none transition-all duration-300 ${
        isExpanded ? "h-auto min-h-[280px]" : "h-[280px]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/25 text-xs font-semibold text-brand-light">
              {item.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{item.name}</p>
              <p className="text-xs text-white/50 truncate">{item.role}</p>
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
        <p
          className={`mt-4 text-sm leading-relaxed text-white/80 whitespace-pre-wrap transition-all duration-300 ${
            isExpanded ? "" : "line-clamp-4"
          }`}
        >
          {item.quote}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
          {item.date}
        </p>
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            suppressHydrationWarning
            className="text-xs font-semibold text-brand-light hover:text-white transition-colors cursor-pointer"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  // Triple the items to make sure it covers more than the viewport width for a smooth loop
  const tripled = [...testimonials, ...testimonials, ...testimonials];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize scroll position to the middle third
    const initScroll = () => {
      const oneThird = container.scrollWidth / 3;
      if (oneThird > 0) {
        container.scrollLeft = oneThird;
      }
    };

    // Use a small timeout to ensure scrollWidth is fully calculated after hydration
    const id = setTimeout(initScroll, 50);

    const handleResize = () => {
      const oneThird = container.scrollWidth / 3;
      if (oneThird > 0) {
        // Keep it within the middle copy bounds
        if (container.scrollLeft < oneThird || container.scrollLeft >= oneThird * 2) {
          container.scrollLeft = oneThird;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 40; // Pixels per second
    let accumulator = container.scrollLeft;

    const scroll = (time: number) => {
      if (!isHovered) {
        const delta = (time - lastTime) / 1000;
        accumulator += speed * delta;

        const oneThird = container.scrollWidth / 3;
        if (oneThird > 0) {
          if (accumulator >= oneThird * 2) {
            accumulator -= oneThird;
          } else if (accumulator <= oneThird) {
            accumulator += oneThird;
          }
          container.scrollLeft = accumulator;
        }
      } else {
        // Synchronize accumulator with manual scroll
        accumulator = container.scrollLeft;
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  // Wheel and Drag Event Handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Wheel Scroll intercept: map vertical wheel scroll to horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      // Prevent default page scroll
      e.preventDefault();
      
      const scrollSpeed = 1.0;
      container.scrollLeft += (e.deltaY + e.deltaX) * scrollSpeed;

      // Wrap scroll around dynamically
      const oneThird = container.scrollWidth / 3;
      if (oneThird > 0) {
        if (container.scrollLeft >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        } else if (container.scrollLeft <= oneThird) {
          container.scrollLeft += oneThird;
        }
      }
    };

    // 2. Click and Drag Scroll
    let isDown = false;
    let startX = 0;
    let scrollLeftRef = 0;
    let isDragging = false;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeftRef = container.scrollLeft;
      isDragging = false;
      container.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = "grab";
      // We clear the drag flag on a timeout to allow click prevention
      setTimeout(() => {
        isDragging = false;
      }, 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity multiplier

      if (Math.abs(walk) > 3) {
        isDragging = true;
      }

      e.preventDefault();
      container.scrollLeft = scrollLeftRef - walk;

      // Infinite wrapping during dragging
      const oneThird = container.scrollWidth / 3;
      if (oneThird > 0) {
        if (container.scrollLeft >= oneThird * 2) {
          const diff = oneThird;
          container.scrollLeft -= diff;
          scrollLeftRef -= diff; // Adjust starting scrollLeft reference so drag stays smooth!
          startX -= diff / 1.5;
        } else if (container.scrollLeft <= oneThird) {
          const diff = oneThird;
          container.scrollLeft += diff;
          scrollLeftRef += diff; // Adjust starting scrollLeft reference so drag stays smooth!
          startX += diff / 1.5;
        }
      }
    };

    // Click handler to prevent "Read More" trigger during a drag
    const handleClick = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Register listeners
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick, true); // Capture phase click interception

    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick, true);
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
        <div className="relative w-full overflow-hidden py-4">
          {/* Ambient Fade Overlays - pointer-events-none is crucial to pass mouse events through */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-24 md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-24 md:w-32" />

          {/* Scroll Container */}
          <div 
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full overflow-x-auto scrollbar-hide select-none py-1"
          >
            {/* Marquee Track */}
            <div className="flex gap-6 items-start w-max">
              {tripled.map((item, index) => (
                <TestimonialCard key={`${item.id}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
