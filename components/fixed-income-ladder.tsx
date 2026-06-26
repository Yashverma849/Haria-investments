"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import {
  scheduleScrollFadeReveal,
  SCROLL_FADE_START,
} from "@/lib/gsap-scroll-fade";
import SectionHeader from "@/components/section-header";
import { ladderYears } from "@/lib/fixed-income-data";

type RelativeRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  cx: number;
  cy: number;
};

function toRelativeRect(rect: DOMRect, container: DOMRect): RelativeRect {
  return {
    left: rect.left - container.left,
    top: rect.top - container.top,
    right: rect.right - container.left,
    bottom: rect.bottom - container.top,
    cx: rect.left + rect.width / 2 - container.left,
    cy: rect.top + rect.height / 2 - container.top,
  };
}

function buildConnectorPath(
  from: RelativeRect,
  to: RelativeRect,
  fromHeight: number,
  toHeight: number,
): string {
  const rowThreshold = Math.min(fromHeight, toHeight) * 0.45;
  const sameRow = Math.abs(from.cy - to.cy) < rowThreshold;

  if (sameRow && to.cx > from.cx) {
    return `M ${from.right} ${from.cy} L ${to.left} ${to.cy}`;
  }

  if (to.cy > from.cy) {
    if (to.cx < from.cx - 4) {
      const sx = from.cx;
      const sy = from.bottom;
      const ex = to.cx;
      const ey = to.top;
      const midY = sy + (ey - sy) * 0.45;
      return `M ${sx} ${sy} L ${sx} ${midY} L ${ex} ${midY} L ${ex} ${ey}`;
    }

    return `M ${from.cx} ${from.bottom} L ${to.cx} ${to.top}`;
  }

  return `M ${from.right} ${from.cy} L ${to.left} ${to.cy}`;
}

const CONNECTOR_COUNT = ladderYears.length - 1;
const GLOW_STEP_DURATION = 1;

export default function FixedIncomeLadder() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const updateConnectorPaths = useCallback(() => {
    const grid = gridRef.current;
    const svg = svgRef.current;
    if (!grid || !svg) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-fi-ladder-card]");
    if (cards.length < 2) return;

    const containerRect = grid.getBoundingClientRect();
    const width = Math.max(containerRect.width, 1);
    const height = Math.max(containerRect.height, 1);

    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    for (let index = 0; index < CONNECTOR_COUNT; index += 1) {
      const path = pathRefs.current[index];
      const fromCard = cards[index];
      const toCard = cards[index + 1];
      if (!path || !fromCard || !toCard) continue;

      const fromRect = fromCard.getBoundingClientRect();
      const toRect = toCard.getBoundingClientRect();
      const from = toRelativeRect(fromRect, containerRect);
      const to = toRelativeRect(toRect, containerRect);
      const d = buildConnectorPath(from, to, fromRect.height, toRect.height);

      path.setAttribute("d", d);
    }
  }, []);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-fi-ladder-card]");
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];

    if (cards.length === 0 || paths.length === 0) return;

    const setGlowingCard = (activeIndex: number | null) => {
      cards.forEach((card, index) => {
        card.classList.toggle("fi-ladder-card--glow", activeIndex === index);
      });
    };

    updateConnectorPaths();

    const resizeObserver = new ResizeObserver(() => {
      updateConnectorPaths();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(grid);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      paths.forEach((path) => {
        gsap.set(path, {
          opacity: 1,
          strokeDasharray: "none",
          strokeDashoffset: 0,
        });
      });
      cards.forEach((card) => card.classList.remove("fi-ladder-card--glow"));
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cards, { opacity: 0, y: 20, scale: 1 });

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          opacity: 1,
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const glowLoop = gsap.timeline({
        repeat: -1,
        paused: true,
      });

      cards.forEach((_, index) => {
        glowLoop.call(() => setGlowingCard(index));
        glowLoop.to({}, { duration: GLOW_STEP_DURATION });
      });

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: SCROLL_FADE_START,
          once: true,
          onEnter: () => {
            updateConnectorPaths();
            paths.forEach((path) => {
              const length = path.getTotalLength();
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
              });
            });
          },
        },
      });

      const glowVisibilityTrigger = ScrollTrigger.create({
        trigger: grid,
        start: SCROLL_FADE_START,
        end: "bottom 8%",
        onEnter: () => {
          if (introTimeline.progress() >= 1) {
            glowLoop.play();
          }
        },
        onEnterBack: () => {
          if (introTimeline.progress() >= 1) {
            glowLoop.play();
          }
        },
        onLeave: () => {
          glowLoop.pause();
          setGlowingCard(null);
        },
        onLeaveBack: () => {
          glowLoop.pause();
          setGlowingCard(null);
        },
      });

      introTimeline.eventCallback("onComplete", () => {
        if (glowVisibilityTrigger.isActive) {
          glowLoop.play(0);
        }
      });

      introTimeline.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: "power2.out",
      });

      paths.forEach((path, index) => {
        introTimeline.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(path, {
                strokeDasharray: "none",
                strokeDashoffset: 0,
              });
            },
          },
          index === 0 ? "+=0.05" : "-=0.18",
        );
      });

      scheduleScrollFadeReveal(section);
    });

    return () => {
      resizeObserver.disconnect();
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
      setGlowingCard(null);
    };
  }, [updateConnectorPaths]);

  return (
    <section
      ref={sectionRef}
      id="laddering"
      className="scroll-mt-24 border-t border-charcoal/10 bg-surface py-20 text-charcoal md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/50">
          Investment Strategy
        </p>
      </div>
      <SectionHeader
        onSurface
        title="Laddering Strategy"
        description="Optimize your returns with systematic investment laddering"
        className="!pb-12 md:!pb-16"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={gridRef}
          data-fi-ladder-grid
          className="fi-ladder-flow relative mx-auto max-w-5xl"
        >
          <svg
            ref={svgRef}
            className="fi-ladder-connectors"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="fi-ladder-arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path
                  d="M0,0.5 L7,4 L0,7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            {Array.from({ length: CONNECTOR_COUNT }, (_, index) => (
              <path
                key={index}
                ref={(element) => {
                  pathRefs.current[index] = element;
                }}
                data-fi-ladder-path
                className="fi-ladder-path"
                markerEnd="url(#fi-ladder-arrowhead)"
              />
            ))}
          </svg>

          <div className="relative z-[2] grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {ladderYears.map((item, index) => (
              <article
                key={item.year}
                data-fi-ladder-card
                className="surface-panel relative rounded-2xl p-5 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/45">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                  Year {item.year}
                </p>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-charcoal/55">
                      Amount
                    </dt>
                    <dd className="mt-1 text-fluid-stat font-semibold text-charcoal">
                      {item.amount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-charcoal/55">
                      Rate
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-charcoal">
                      {item.rate}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-charcoal/55">
                      Maturity
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-charcoal">
                      {item.maturity}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
