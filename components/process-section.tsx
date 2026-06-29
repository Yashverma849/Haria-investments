"use client";

import { Inter, Space_Mono } from "next/font/google";
import Link from "next/link";
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
import { scheduleConsultation } from "@/lib/nav-links";

const FOCUS_RATIO = 0.42;
const SPINE_THUMB_SIZE = 10;

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
      className={`process-step-card process-step-card--${side} max-w-none w-full ${isActive ? "is-active is-expanded" : ""} ${isNear && !isActive ? "is-near" : ""}`}
      tabIndex={0}
    >
      <div className="process-step-card-shell rounded-xl border border-[#333333] bg-[rgba(10,10,10,0.85)] backdrop-blur-[10px] shadow-lg transition-all duration-300 hover:border-white/30">
        <div className="process-step-card-header flex items-stretch gap-0 border-b border-[#333333]">
          <div className="process-timeline-mono flex w-14 shrink-0 items-center justify-center border-r border-[#333333] text-sm font-medium text-white sm:w-16">
            {stepNumber}
          </div>
          <div className="relative flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 sm:px-5">
            <div className="min-w-0 flex-1">
              <p className="process-timeline-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#a0a0a0] sm:text-xs">
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

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch sm:gap-x-5">
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

                <div aria-hidden="true" className="process-step-card-column-divider" />

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
  const spineBranchLeftRef = useRef<SVGLineElement>(null);
  const spineBranchRightRef = useRef<SVGLineElement>(null);
  const spineBranchMobileRef = useRef<SVGPolylineElement>(null);
  
  const rowsDesktopRef = useRef<(HTMLDivElement | null)[]>([]);
  const rowsMobileRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesMobileRef = useRef<(HTMLSpanElement | null)[]>([]);

  const activeIndexRef = useRef(-1);
  const nearIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [nearIndex, setNearIndex] = useState(0);

  const stepPairs = [
    [processSteps[0], processSteps[1]],
    [processSteps[2], processSteps[3]],
  ];

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

      if (previous >= 0 && rows[previous]) animateRowStrokes(rows[previous], false);
      if (index >= 0 && rows[index]) animateRowStrokes(rows[index], true);
    },
    [animateRowStrokes],
  );

  const findNearestIndex = useCallback((rows: HTMLElement[]) => {
    const focusY = window.innerHeight * FOCUS_RATIO;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const anchorY = rect.top + 36;
      const distance = Math.abs(anchorY - focusY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  const resolveExpandedIndex = useCallback((
    rows: HTMLElement[],
    currentExpanded: number,
    cursorY: number,
    trackRect: DOMRect
  ) => {
    // 1. Stable Hysteresis
    if (currentExpanded >= 0 && currentExpanded < rows.length) {
      const row = rows[currentExpanded];
      const headerEl = row.querySelector<HTMLElement>(".process-step-card-header");
      const rowHeaderTop = headerEl
        ? headerEl.getBoundingClientRect().top - trackRect.top
        : row.getBoundingClientRect().top - trackRect.top;
      const rowBottom = row.getBoundingClientRect().bottom - trackRect.top;

      if (cursorY >= rowHeaderTop - 80 && cursorY <= rowBottom + 60) {
        return currentExpanded;
      }
    }

    // 2. Expand when pointer gets within 60px of row header
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      const headerEl = row.querySelector<HTMLElement>(".process-step-card-header");
      const rowHeaderTop = headerEl
        ? headerEl.getBoundingClientRect().top - trackRect.top
        : row.getBoundingClientRect().top - trackRect.top;
      const rowBottom = row.getBoundingClientRect().bottom - trackRect.top;

      if (cursorY >= rowHeaderTop - 60 && cursorY <= rowBottom + 20) {
        return index;
      }
    }

    return -1;
  }, []);

  const updateSpineGraphics = useCallback(
    (
      track: HTMLElement,
      trackLine: SVGLineElement,
      thumb: SVGRectElement,
      branchLeft: SVGLineElement,
      branchRight: SVGLineElement,
      branchMobile: SVGPolylineElement,
      rows: HTMLElement[],
      highlightIndex: number,
      cursorY: number,
    ) => {
      if (rows.length === 0) return 0;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const trackRect = track.getBoundingClientRect();
      const spineHeight = track.offsetHeight;
      const visible = trackRect.bottom > 0 && trackRect.top < window.innerHeight;
      const thumbOffset = SPINE_THUMB_SIZE / 2;

      if (isDesktop) {
        branchMobile.style.opacity = "0";
        branchMobile.setAttribute("points", "");

        let currentSpineX = trackRect.width / 2;

        if (highlightIndex >= 0 && highlightIndex < rows.length) {
          const activeRow = rows[highlightIndex];
          const cards = activeRow.querySelectorAll<HTMLElement>("[data-process-card]");

          if (cards.length >= 2) {
            const leftShell = cards[0].querySelector<HTMLElement>(".process-step-card-shell") ?? cards[0];
            const rightShell = cards[1].querySelector<HTMLElement>(".process-step-card-shell") ?? cards[1];

            const leftRect = leftShell.getBoundingClientRect();
            const rightRect = rightShell.getBoundingClientRect();

            currentSpineX = (leftRect.right + rightRect.left) / 2 - trackRect.left;

            const leftTargetX = leftRect.right - trackRect.left;
            const rightTargetX = rightRect.left - trackRect.left;

            branchLeft.setAttribute("x1", String(currentSpineX));
            branchLeft.setAttribute("y1", String(cursorY));
            branchLeft.setAttribute("x2", String(leftTargetX));
            branchLeft.setAttribute("y2", String(cursorY));

            branchRight.setAttribute("x1", String(currentSpineX));
            branchRight.setAttribute("y1", String(cursorY));
            branchRight.setAttribute("x2", String(rightTargetX));
            branchRight.setAttribute("y2", String(cursorY));

            branchLeft.style.opacity = visible ? "1" : "0";
            branchRight.style.opacity = visible ? "1" : "0";
          } else {
            branchLeft.style.opacity = "0";
            branchRight.style.opacity = "0";
          }
        } else {
          branchLeft.style.opacity = "0";
          branchRight.style.opacity = "0";
        }

        trackLine.setAttribute("x1", String(currentSpineX));
        trackLine.setAttribute("x2", String(currentSpineX));
        trackLine.setAttribute("y1", "0");
        trackLine.setAttribute("y2", String(spineHeight));
        trackLine.style.opacity = visible ? "1" : "0";

        thumb.setAttribute("x", String(currentSpineX - thumbOffset));
        thumb.setAttribute("y", String(cursorY - thumbOffset));
        thumb.setAttribute("width", String(SPINE_THUMB_SIZE));
        thumb.setAttribute("height", String(SPINE_THUMB_SIZE));
        thumb.style.opacity = visible ? "1" : "0";

        return cursorY;
      }

      // MOBILE VIEW IMPLEMENTATION
      branchLeft.style.opacity = "0";
      branchRight.style.opacity = "0";

      const nodes = nodesMobileRef.current.filter(Boolean) as HTMLElement[];
      const anchorNode = nodes[0];
      const spineX = anchorNode
        ? anchorNode.getBoundingClientRect().left + anchorNode.offsetWidth / 2 - trackRect.left
        : 16;

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

      if (highlightIndex >= 0 && highlightIndex < rows.length) {
        const activeRow = rows[highlightIndex];
        const headerEl = activeRow.querySelector<HTMLElement>(".process-step-card-header");
        const shell = activeRow.querySelector<HTMLElement>(".process-step-card-shell");

        if (headerEl && shell) {
          const headerRect = headerEl.getBoundingClientRect();
          const shellRect = shell.getBoundingClientRect();
          const joinX = shellRect.left - trackRect.left;
          const cornerY = headerRect.top - trackRect.top + headerRect.height / 2;

          branchMobile.setAttribute(
            "points",
            `${spineX},${cursorY} ${joinX},${cursorY} ${joinX},${cornerY}`,
          );
          branchMobile.style.opacity = visible ? "1" : "0";
        } else {
          branchMobile.style.opacity = "0";
          branchMobile.setAttribute("points", "");
        }
      } else {
        branchMobile.style.opacity = "0";
        branchMobile.setAttribute("points", "");
      }

      return cursorY;
    },
    [],
  );

  const updateRowHighlights = useCallback((rows: HTMLElement[], highlightIndex: number) => {
    const focusY = window.innerHeight * FOCUS_RATIO;

    rows.forEach((row, index) => {
      const cards = row.querySelectorAll<HTMLElement>("[data-process-card]");
      if (!cards.length) return;

      const rect = row.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - focusY);
      const maxDistance = window.innerHeight * 0.55;
      const proximity = gsap.utils.clamp(0, 1, 1 - distance / maxDistance);
      const isHighlight = index === highlightIndex;

      cards.forEach((card) => {
        gsap.set(card, {
          opacity: isHighlight ? 1 : 0.34 + proximity * 0.38,
          y: isHighlight ? 0 : (1 - proximity) * 14,
        });
      });
    });
  }, []);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const trackLine = spineTrackRef.current;
    const thumb = spineThumbRef.current;
    const branchLeft = spineBranchLeftRef.current;
    const branchRight = spineBranchRightRef.current;
    const branchMobile = spineBranchMobileRef.current;

    if (!section || !track || !trackLine || !thumb || !branchLeft || !branchRight || !branchMobile) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const rows = isDesktop
      ? (rowsDesktopRef.current.filter(Boolean) as HTMLElement[])
      : (rowsMobileRef.current.filter(Boolean) as HTMLElement[]);

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

    let activeScrollTrigger: ScrollTrigger | null = null;

    const syncFromScroll = (self?: ScrollTrigger) => {
      const st = self ?? activeScrollTrigger;
      const activeRows = isDesktop
        ? (rowsDesktopRef.current.filter(Boolean) as HTMLElement[])
        : (rowsMobileRef.current.filter(Boolean) as HTMLElement[]);

      if (activeRows.length === 0) return;

      const trackRect = track.getBoundingClientRect();
      const firstRowTop = activeRows[0].getBoundingClientRect().top + 36 - trackRect.top;
      const lastRow = activeRows[activeRows.length - 1];
      const lastRowCenter = lastRow.getBoundingClientRect().top + lastRow.offsetHeight / 2 - trackRect.top;
      
      const scrollProgress = st?.progress ?? 0;
      const progressClamped = gsap.utils.clamp(0, 1, scrollProgress);
      const cursorY = firstRowTop + progressClamped * (lastRowCenter - firstRowTop);

      const nearest = findNearestIndex(activeRows);
      const expanded = resolveExpandedIndex(activeRows, activeIndexRef.current, cursorY, trackRect);

      if (nearest !== nearIndexRef.current) {
        nearIndexRef.current = nearest;
        setNearIndex(nearest);
      }

      setExpandedStep(expanded, activeRows);

      const highlightIndex = expanded >= 0 ? expanded : nearest;
      updateSpineGraphics(track, trackLine, thumb, branchLeft, branchRight, branchMobile, activeRows, highlightIndex, cursorY);
      updateRowHighlights(activeRows, highlightIndex);
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      prepareAllStrokes();
      rows.forEach((row, index) => {
        row.querySelectorAll<SVGElement>("[data-process-stroke]").forEach((stroke) => {
          stroke.style.strokeDashoffset = index === 0 ? "0" : getStrokeLength(stroke).toString();
        });
        row.querySelectorAll<HTMLElement>("[data-process-card]").forEach((card) => {
          gsap.set(card, { opacity: index === 0 ? 1 : 0.55, y: 0 });
        });
      });
      activeIndexRef.current = 0;
      setActiveIndex(0);
      setNearIndex(0);
      updateSpineGraphics(track, trackLine, thumb, branchLeft, branchRight, branchMobile, rows, 0, 0);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      prepareAllStrokes();
      activeIndexRef.current = -1;
      nearIndexRef.current = 0;
      setActiveIndex(-1);
      setNearIndex(0);

      rows.forEach((row) => {
        row.querySelectorAll<HTMLElement>("[data-process-card]").forEach((card) => {
          gsap.set(card, { opacity: 0.55, y: 0 });
        });
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: track,
        start: "top 70%",
        end: "bottom 50%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => syncFromScroll(self),
      });

      activeScrollTrigger = scrollTrigger;
      triggers.push(scrollTrigger);

      const onRefresh = () => syncFromScroll(scrollTrigger);
      ScrollTrigger.addEventListener("refresh", onRefresh);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        syncFromScroll(scrollTrigger);
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        syncFromScroll(scrollTrigger);
      }, 150);

      return () => {
        clearTimeout(refreshTimer);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    });

    return () => {
      activeScrollTrigger = null;
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

      <div className="process-timeline-scroll section-shell pb-20 md:pb-28">
        <div ref={trackRef} className="process-timeline-track max-w-6xl mx-auto w-full">
          <div className="process-timeline-spine" aria-hidden="true">
            <svg className="process-timeline-spine-svg">
              <line ref={spineTrackRef} className="process-timeline-spine-track" />
              <line ref={spineBranchLeftRef} className="process-timeline-spine-branch hidden lg:block" />
              <line ref={spineBranchRightRef} className="process-timeline-spine-branch hidden lg:block" />
              <polyline ref={spineBranchMobileRef} className="process-timeline-spine-branch lg:hidden" />
              <rect ref={spineThumbRef} className="process-timeline-spine-thumb" />
            </svg>
          </div>

          {/* DESKTOP VIEW: Paired 2 Cards Per Row */}
          <div className="hidden lg:flex lg:flex-col lg:gap-16">
            {stepPairs.map((pair, rowIndex) => {
              const firstIndex = rowIndex * 2;
              const secondIndex = rowIndex * 2 + 1;
              const isRowActive = activeIndex === rowIndex;
              const isRowNear = nearIndex === rowIndex;

              return (
                <div
                  key={`desktop-row-${rowIndex}`}
                  ref={(element) => {
                    rowsDesktopRef.current[rowIndex] = element;
                  }}
                  data-process-row
                  className="process-step-row relative flex flex-row items-start gap-16 justify-between w-full"
                >
                  <div className="flex-1 min-w-0">
                    <ProcessStepCard
                      step={pair[0]}
                      index={firstIndex}
                      side="left"
                      isActive={isRowActive}
                      isNear={isRowNear}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <ProcessStepCard
                      step={pair[1]}
                      index={secondIndex}
                      side="right"
                      isActive={isRowActive}
                      isNear={isRowNear}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE VIEW: Single Card At A Time */}
          <div className="flex flex-col gap-8 lg:hidden">
            {processSteps.map((step, stepIndex) => {
              const isActive = activeIndex === stepIndex;
              const isNear = nearIndex === stepIndex;

              return (
                <div
                  key={`mobile-step-${stepIndex}`}
                  ref={(element) => {
                    rowsMobileRef.current[stepIndex] = element;
                  }}
                  data-process-row
                  className="process-step-row process-step-row--left relative flex flex-col gap-8 w-full"
                >
                  <div className="process-step-rail" aria-hidden="true">
                    <span
                      ref={(element) => {
                        nodesMobileRef.current[stepIndex] = element;
                      }}
                      data-process-node
                      className="process-step-node"
                    />
                  </div>

                  <div className="w-full">
                    <ProcessStepCard
                      step={step}
                      index={stepIndex}
                      side="left"
                      isActive={isActive}
                      isNear={isNear}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex justify-center md:mt-20">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            Book a Wealth Support
          </Link>
        </div>
      </div>
    </section>
  );
}
