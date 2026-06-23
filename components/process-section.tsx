"use client";

import { Inter, Space_Mono } from "next/font/google";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import {
  PROCESS_HERO,
  processSteps,
  type ProcessStep,
} from "@/lib/process-data";

const FOCUS_RATIO = 0.42;
const EXPAND_ENTER_PROGRESS = 0.44;
const EXPAND_EXIT_PROGRESS = 0.26;
const SPINE_THUMB_SIZE = 8;

function getCursorYFromProgress(progress: number, nodeYs: number[]) {
  if (nodeYs.length === 0) return 0;
  if (nodeYs.length === 1) return nodeYs[0];

  const scaled = progress * (nodeYs.length - 1);
  const index = Math.min(Math.floor(scaled), nodeYs.length - 2);
  const fraction = scaled - index;

  return nodeYs[index] + fraction * (nodeYs[index + 1] - nodeYs[index]);
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-process-inter",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-process-mono",
  weight: ["400", "700"],
});

function ProcessStepGraphic({ index }: { index: number }) {
  const graphics = [
    <svg key="consultation" viewBox="0 0 72 72" className="h-full w-full" fill="none" aria-hidden>
      <path data-process-stroke d="M36 8 L58 22 V50 L36 64 L14 50 V22 Z" stroke="currentColor" strokeWidth="1.2" />
      <path data-process-stroke d="M36 8 V36 M36 36 L58 22 M36 36 L14 22 M36 36 V64" stroke="currentColor" strokeWidth="1.2" />
    </svg>,
    <svg key="analysis" viewBox="0 0 72 72" className="h-full w-full" fill="none" aria-hidden>
      <path data-process-stroke d="M12 54 L24 40 L36 46 L48 24 L60 30" stroke="currentColor" strokeWidth="1.2" />
      <path data-process-stroke d="M12 58 H60 M12 14 V58" stroke="currentColor" strokeWidth="1.2" />
    </svg>,
    <svg key="implementation" viewBox="0 0 72 72" className="h-full w-full" fill="none" aria-hidden>
      <rect data-process-stroke x="14" y="38" width="18" height="18" stroke="currentColor" strokeWidth="1.2" />
      <rect data-process-stroke x="27" y="24" width="18" height="18" stroke="currentColor" strokeWidth="1.2" />
      <rect data-process-stroke x="40" y="10" width="18" height="18" stroke="currentColor" strokeWidth="1.2" />
    </svg>,
    <svg key="ongoing" viewBox="0 0 72 72" className="h-full w-full" fill="none" aria-hidden>
      <path data-process-stroke d="M36 14 A22 22 0 1 1 20 46" stroke="currentColor" strokeWidth="1.2" />
      <path data-process-stroke d="M36 24 A12 12 0 1 1 28 42" stroke="currentColor" strokeWidth="1.2" />
      <path data-process-stroke d="M20 46 L14 52 M20 46 L26 52" stroke="currentColor" strokeWidth="1.2" />
    </svg>,
  ];

  return (
    <div data-process-graphic className="process-step-graphic text-white/70">
      {graphics[index]}
    </div>
  );
}

function ProcessStepCard({
  step,
  index,
  side,
  isActive,
  isNear,
}: {
  step: ProcessStep;
  index: number;
  side: "left" | "right";
  isActive: boolean;
  isNear: boolean;
}) {
  const stepNumber = String(index + 1).padStart(2, "0");
  const initial = step.title.charAt(0).toUpperCase();

  return (
    <article
      data-process-card
      data-active={isActive ? "true" : "false"}
      className={`process-step-card process-step-card--${side} ${isActive ? "is-active is-expanded" : ""} ${isNear && !isActive ? "is-near" : ""}`}
      tabIndex={0}
    >
      <div className="process-step-card-shell rounded-lg border border-[#333333] bg-[rgba(10,10,10,0.8)] backdrop-blur-[10px]">
        <div className="process-step-card-header flex items-stretch gap-0 border-b border-[#333333]">
          <div className="process-timeline-mono flex w-14 shrink-0 items-center justify-center border-r border-[#333333] text-sm font-medium text-white sm:w-16">
            {stepNumber}
          </div>
          <div className="relative flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 sm:px-5">
            <div className="min-w-0 flex-1">
              <p className="process-timeline-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#a0a0a0] sm:text-xs">
                {step.label}
              </p>
              <h3 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
                {step.title}
              </h3>
            </div>
            <ProcessStepGraphic index={index} />
          </div>
        </div>

        <div data-process-card-body className="process-step-card-body">
          <div className="process-step-card-body-inner">
            <div className="space-y-6 border-t border-[#333333] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-[#a0a0a0] sm:text-base">
                {step.summary}
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
                <div>
                  <h4 className="process-timeline-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#a0a0a0] sm:text-xs">
                    What to Expect
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {step.whatToExpect.map((item) => (
                      <li key={item} className="text-xs leading-relaxed text-[#a0a0a0] sm:text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="process-timeline-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#a0a0a0] sm:text-xs">
                    Your Preparation
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {step.yourPreparation.map((item) => (
                      <li key={item} className="text-xs leading-relaxed text-[#a0a0a0] sm:text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-stretch gap-0 border-t border-[#333333]">
              <div className="flex w-14 shrink-0 items-center justify-center border-r border-[#333333] sm:w-16">
                <span className="process-timeline-mono flex h-8 w-8 items-center justify-center border border-[#333333] text-xs font-medium text-white">
                  {initial}
                </span>
              </div>
              <div className="relative flex min-w-0 flex-1 items-center px-4 py-4 sm:px-5">
                <p className="text-sm leading-relaxed text-[#a0a0a0] sm:text-base">
                  <span className="process-timeline-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white sm:text-xs">
                    Outcome
                  </span>
                  <span className="mt-1 block">{step.outcome}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spineTrackRef = useRef<SVGLineElement>(null);
  const spineThumbRef = useRef<SVGRectElement>(null);
  const spineBranchRef = useRef<SVGPolylineElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const activeIndexRef = useRef(-1);
  const nearIndexRef = useRef(0);
  const syncFromScrollRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [nearIndex, setNearIndex] = useState(0);

  const getStrokeLength = useCallback((stroke: SVGElement) => {
    if (stroke instanceof SVGGeometryElement) {
      return stroke.getTotalLength();
    }

    if (stroke instanceof SVGGraphicsElement) {
      const box = stroke.getBBox();
      return (box.width + box.height) * 2;
    }

    return 0;
  }, []);

  const animateRowStrokes = useCallback(
    (row: HTMLElement | null, expanded: boolean) => {
      if (!row) return;

      row.querySelectorAll<SVGElement>("[data-process-stroke]").forEach((stroke) => {
        const length = getStrokeLength(stroke);
        stroke.style.strokeDasharray = `${length}`;
        gsap.to(stroke, {
          strokeDashoffset: expanded ? 0 : length,
          duration: 0.55,
          ease: "power2.out",
          overwrite: true,
        });
      });
    },
    [getStrokeLength],
  );

  const setExpandedStep = useCallback(
    (index: number, rows: HTMLElement[]) => {
      if (index === activeIndexRef.current) return;

      const previous = activeIndexRef.current;
      activeIndexRef.current = index;
      setActiveIndex(index);

      if (previous >= 0) animateRowStrokes(rows[previous], false);
      if (index >= 0) animateRowStrokes(rows[index], true);

      gsap.delayedCall(0.58, () => syncFromScrollRef.current?.());
    },
    [animateRowStrokes],
  );

  const findNearestIndex = useCallback((rows: HTMLElement[]) => {
    const focusY = window.innerHeight * FOCUS_RATIO;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    rows.forEach((row, index) => {
      const node = nodesRef.current[index];
      const anchor = node ?? row;
      const rect = anchor.getBoundingClientRect();
      const anchorY = rect.top + rect.height / 2;
      const distance = Math.abs(anchorY - focusY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  const resolveExpandedIndex = useCallback(
    (rows: HTMLElement[], currentExpanded: number) => {
      const focusY = window.innerHeight * FOCUS_RATIO;

      if (currentExpanded >= 0 && currentExpanded < rows.length) {
        const currentRow = rows[currentExpanded];
        const rect = currentRow.getBoundingClientRect();

        if (focusY >= rect.top && focusY <= rect.bottom) {
          const progress = (focusY - rect.top) / rect.height;
          if (progress >= EXPAND_EXIT_PROGRESS) return currentExpanded;
        }
      }

      for (let index = 0; index < rows.length; index += 1) {
        const rect = rows[index].getBoundingClientRect();

        if (focusY < rect.top || focusY > rect.bottom) continue;

        const progress = (focusY - rect.top) / rect.height;
        if (progress >= EXPAND_ENTER_PROGRESS) return index;
      }

      return -1;
    },
    [],
  );

  const updateSpineGraphics = useCallback(
    (
      track: HTMLElement,
      trackLine: SVGLineElement,
      thumb: SVGRectElement,
      branch: SVGPolylineElement,
      rows: HTMLElement[],
      highlightIndex: number,
      scrollProgress: number,
    ) => {
      const nodes = nodesRef.current.filter(Boolean) as HTMLElement[];
      if (nodes.length === 0) return 0;

      const trackRect = track.getBoundingClientRect();
      const spineHeight = track.offsetHeight;
      const anchorNode = nodes[0];
      const anchorRect = anchorNode.getBoundingClientRect();
      const spineX = anchorRect.left + anchorRect.width / 2 - trackRect.left;

      const nodeYs = nodes.map(
        (node) => node.getBoundingClientRect().top + node.offsetHeight / 2 - trackRect.top,
      );

      const cursorY = getCursorYFromProgress(scrollProgress, nodeYs);
      const visible = trackRect.bottom > 0 && trackRect.top < window.innerHeight;
      const thumbOffset = SPINE_THUMB_SIZE / 2;

      trackLine.setAttribute("x1", String(spineX));
      trackLine.setAttribute("x2", String(spineX));
      trackLine.setAttribute("y1", "0");
      trackLine.setAttribute("y2", String(spineHeight));
      trackLine.style.opacity = visible ? "1" : "0";

      thumb.setAttribute("x", String(spineX - thumbOffset));
      thumb.setAttribute("y", String(cursorY - thumbOffset));
      thumb.setAttribute("width", String(SPINE_THUMB_SIZE));
      thumb.setAttribute("height", String(SPINE_THUMB_SIZE));
      thumb.style.opacity = visible ? "1" : "0";

      if (highlightIndex < 0 || highlightIndex >= rows.length) {
        branch.style.opacity = "0";
        branch.setAttribute("points", "");
        return cursorY;
      }

      const row = rows[highlightIndex];
      const header = row.querySelector<HTMLElement>(".process-step-card-header");
      const shell = row.querySelector<HTMLElement>(".process-step-card-shell");
      if (!header || !shell) {
        branch.style.opacity = "0";
        branch.setAttribute("points", "");
        return cursorY;
      }

      const headerRect = header.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const isLeft = row.classList.contains("process-step-row--left");
      const joinX = isLeft
        ? shellRect.right - trackRect.left
        : shellRect.left - trackRect.left;
      const cornerY = headerRect.top - trackRect.top;

      branch.setAttribute(
        "points",
        `${spineX},${cursorY} ${joinX},${cursorY} ${joinX},${cornerY}`,
      );
      branch.style.opacity = visible ? "1" : "0";

      return cursorY;
    },
    [],
  );

  const updateRowHighlights = useCallback((rows: HTMLElement[], highlightIndex: number) => {
    const focusY = window.innerHeight * FOCUS_RATIO;

    rows.forEach((row, index) => {
      const card = row.querySelector<HTMLElement>("[data-process-card]");
      if (!card) return;

      const rect = row.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - focusY);
      const maxDistance = window.innerHeight * 0.55;
      const proximity = gsap.utils.clamp(0, 1, 1 - distance / maxDistance);
      const isHighlight = index === highlightIndex;

      gsap.set(card, {
        opacity: isHighlight ? 1 : 0.34 + proximity * 0.38,
        y: isHighlight ? 0 : (1 - proximity) * 14,
      });
    });
  }, []);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const trackLine = spineTrackRef.current;
    const thumb = spineThumbRef.current;
    const branch = spineBranchRef.current;

    if (!section || !track || !trackLine || !thumb || !branch) return;

    const rows = rowsRef.current.filter(Boolean) as HTMLElement[];
    const triggers: ScrollTrigger[] = [];

    const prepareAllStrokes = () => {
      rows.forEach((row) => {
        row.querySelectorAll<SVGElement>("[data-process-stroke]").forEach((stroke) => {
          const length = getStrokeLength(stroke);
          stroke.style.strokeDasharray = `${length}`;
          stroke.style.strokeDashoffset = `${length}`;
        });
      });
    };

    const syncFromScroll = (self?: ScrollTrigger) => {
      const nearest = findNearestIndex(rows);
      const scrollProgress = self?.progress ?? 0;

      if (nearest !== nearIndexRef.current) {
        nearIndexRef.current = nearest;
        setNearIndex(nearest);
      }

      const expanded = resolveExpandedIndex(rows, activeIndexRef.current);
      setExpandedStep(expanded, rows);

      const highlightIndex = expanded >= 0 ? expanded : nearest;
      updateSpineGraphics(track, trackLine, thumb, branch, rows, highlightIndex, scrollProgress);
      updateRowHighlights(rows, highlightIndex);
    };

    syncFromScrollRef.current = syncFromScroll;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      prepareAllStrokes();
      rows.forEach((row, index) => {
        row.querySelectorAll<SVGElement>("[data-process-stroke]").forEach((stroke) => {
          stroke.style.strokeDashoffset = index === 0 ? "0" : getStrokeLength(stroke).toString();
        });
        const card = row.querySelector<HTMLElement>("[data-process-card]");
        if (card) gsap.set(card, { opacity: index === 0 ? 1 : 0.55, y: 0 });
      });
      activeIndexRef.current = 0;
      setActiveIndex(0);
      setNearIndex(0);
      updateSpineGraphics(track, trackLine, thumb, branch, rows, 0, 0);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      prepareAllStrokes();
      trackLine.style.opacity = "0";
      thumb.style.opacity = "0";
      branch.style.opacity = "0";
      activeIndexRef.current = -1;
      nearIndexRef.current = 0;
      setActiveIndex(-1);
      setNearIndex(0);

      rows.forEach((row) => {
        const card = row.querySelector<HTMLElement>("[data-process-card]");
        if (card) gsap.set(card, { opacity: 0.55, y: 0 });
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: track,
        start: "top center",
        end: "bottom center",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: syncFromScroll,
      });

      triggers.push(scrollTrigger);

      const onRefresh = () => syncFromScroll(scrollTrigger);
      ScrollTrigger.addEventListener("refresh", onRefresh);

      syncFromScroll(scrollTrigger);

      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    });

    return () => {
      syncFromScrollRef.current = null;
      triggers.forEach((trigger) => trigger.kill());
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, [
    findNearestIndex,
    getStrokeLength,
    resolveExpandedIndex,
    setExpandedStep,
    updateSpineGraphics,
    updateRowHighlights,
  ]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`process-timeline ${inter.variable} ${spaceMono.variable} scroll-mt-24 border-t border-white/10`}
    >
      <SectionHeader
        title={PROCESS_HERO.title}
        description={PROCESS_HERO.subtitle}
        className="py-20 md:py-28 lg:pb-16"
      />

      <div className="process-timeline-scroll mx-auto w-full max-w-[1100px] px-6 pb-20 md:pb-28 lg:px-8">
        <div ref={trackRef} className="process-timeline-track">
          <div className="process-timeline-spine" aria-hidden="true">
            <svg className="process-timeline-spine-svg">
              <line ref={spineTrackRef} className="process-timeline-spine-track" />
              <polyline ref={spineBranchRef} className="process-timeline-spine-branch" />
              <rect ref={spineThumbRef} className="process-timeline-spine-thumb" />
            </svg>
          </div>

          {processSteps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";

            return (
              <div
                key={step.id}
                ref={(element) => {
                  rowsRef.current[index] = element;
                }}
                data-process-row
                className={`process-step-row process-step-row--${side}`}
              >
                <div className="process-step-rail" aria-hidden="true">
                  <span
                    ref={(element) => {
                      nodesRef.current[index] = element;
                    }}
                    data-process-node
                    className="process-step-node"
                  />
                </div>

                <ProcessStepCard
                  step={step}
                  index={index}
                  side={side}
                  isActive={activeIndex === index}
                  isNear={nearIndex === index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
