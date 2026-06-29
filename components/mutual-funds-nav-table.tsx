"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { useNavTableVisibleRows } from "@/hooks/use-nav-table-visible-rows";
import {
  fadeInOnScroll,
  scheduleScrollFadeReveal,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_START,
} from "@/lib/gsap-scroll-fade";
import SectionHeader from "@/components/section-header";
import {
  navApplicabilityRows,
  navImportantNotes,
} from "@/lib/mutual-funds-data";

function ReadMoreCapsule({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/[0.1] hover:text-white sm:px-3.5 sm:text-xs"
    >
      Read more
      <svg
        className={`h-3 w-3 shrink-0 opacity-70 transition-transform duration-300 group-hover:opacity-100 sm:h-3.5 sm:w-3.5 ${
          isExpanded ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}

function NavTableRows({
  rows,
  startIndex = 0,
}: {
  rows: typeof navApplicabilityRows;
  startIndex?: number;
}) {
  const cellPadding = "px-3 py-3.5 sm:px-4 sm:py-4 md:px-6";

  return (
    <>
      {rows.map((row, index) => (
        <tr
          key={`${row.transactionType}-${row.condition}-${startIndex + index}`}
          className="border-b border-white/20 transition-colors hover:bg-white/[0.03]"
        >
          <td className={`${cellPadding} align-top font-medium text-white`}>
            <span className="block min-w-0 leading-relaxed">
              {row.transactionType}
            </span>
          </td>
          <td className={`${cellPadding} align-top text-white/75`}>
            <span className="block min-w-0 leading-relaxed">{row.condition}</span>
          </td>
          <td className={`${cellPadding} align-top text-white/80`}>
            <span className="block min-w-0 leading-relaxed">
              {row.applicableNav}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

function NavReadMoreFooter({
  isExpanded,
  onToggle,
  ref,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      data-read-more-footer
      className="border-t border-white/20 px-3 py-3 text-right sm:px-4 md:px-6"
    >
      <ReadMoreCapsule isExpanded={isExpanded} onToggle={onToggle} />
    </div>
  );
}

function NavNotesList({
  className = "",
  ref,
  ...props
}: React.ComponentProps<"div"> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={className} {...props}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
        Good to know
      </p>
      <ul className="mt-3 space-y-2.5">
        {navImportantNotes.map((note) => (
          <li
            key={note}
            className="flex gap-2.5 text-xs leading-relaxed text-white/60 sm:text-sm"
          >
            <span
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/35"
              aria-hidden
            />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

const tableClassName =
  "w-full table-fixed border-collapse text-left text-sm min-w-[36rem] sm:min-w-[40rem] xl:min-w-0";

export default function MutualFundsNavTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const visibleTableRef = useRef<HTMLTableElement>(null);
  const extraRowsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const measureTableRef = useRef<HTMLTableElement>(null);
  const measureFooterRef = useRef<HTMLDivElement>(null);
  const expandTweenRef = useRef<gsap.core.Tween | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { visibleRowCount } = useNavTableVisibleRows({
    notesRef,
    measureTableRef,
    measureFooterRef,
    visibleTableRef,
    totalRows: navApplicabilityRows.length,
  });

  const hasMoreRows = navApplicabilityRows.length > visibleRowCount;
  const initialRows = navApplicabilityRows.slice(0, visibleRowCount);
  const extraRows = navApplicabilityRows.slice(visibleRowCount);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  useLayoutEffect(() => {
    const extra = extraRowsRef.current;
    if (!extra || !hasMoreRows) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    expandTweenRef.current?.kill();

    if (reducedMotion) {
      gsap.set(extra, { height: isExpanded ? "auto" : 0, opacity: 1 });
      return;
    }

    if (isExpanded) {
      gsap.set(extra, { height: "auto", opacity: 1 });
      const targetHeight = extra.offsetHeight;
      const rows = extra.querySelectorAll("tr");

      gsap.set(extra, { height: 0, opacity: 0 });
      gsap.set(rows, { opacity: 0, y: -10 });

      expandTweenRef.current = gsap.to(extra, {
        height: targetHeight,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(extra, { height: "auto" });
        },
      });

      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.08,
      });
    } else {
      const currentHeight = extra.offsetHeight;
      const rows = extra.querySelectorAll("tr");

      gsap.set(extra, { height: currentHeight });

      expandTweenRef.current = gsap.to(extra, {
        height: 0,
        opacity: 0,
        duration: 0.38,
        ease: "power3.inOut",
      });

      gsap.to(rows, {
        opacity: 0,
        y: -6,
        duration: 0.22,
        stagger: 0.03,
        ease: "power2.in",
      });
    }

    return () => {
      expandTweenRef.current?.kill();
    };
  }, [hasMoreRows, isExpanded, visibleRowCount]);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const table = section.querySelector("[data-mf-nav-table]");
    const notes = section.querySelector("[data-mf-nav-notes]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([table, notes], { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      fadeInOnScroll([table, notes], {
        trigger: table,
        start: SCROLL_FADE_START,
        duration: SCROLL_FADE_DURATION,
        stagger: 0.1,
        y: 20,
      });

      scheduleScrollFadeReveal(section);
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const tableColGroup = (
    <colgroup>
      <col className="w-[30%] sm:w-[28%]" />
      <col className="w-[46%] sm:w-[48%]" />
      <col className="w-[24%] sm:w-[24%]" />
    </colgroup>
  );

  const tableHead = (
    <thead>
      <tr className="border-b-2 border-white/30 bg-white/[0.04]">
        <th
          scope="col"
          className="px-3 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:px-4 sm:py-4 sm:text-xs sm:tracking-[0.16em] md:px-6"
        >
          Transaction Type
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:px-4 sm:py-4 sm:text-xs sm:tracking-[0.16em] md:px-6"
        >
          Condition
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:px-4 sm:py-4 sm:text-xs sm:tracking-[0.16em] md:px-6"
        >
          Applicable NAV
        </th>
      </tr>
    </thead>
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <SectionHeader
        title="Applicability of NAV"
        description="Understand how transaction timing affects the Net Asset Value applied to your mutual fund purchases, redemptions, and switches."
      />

      <div className="section-shell">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] xl:items-start xl:gap-10">
          <div className="min-w-0">
            <div
              aria-hidden
              className="pointer-events-none fixed top-0 -left-[9999px] opacity-0"
            >
              <table ref={measureTableRef} className={tableClassName}>
                {tableColGroup}
                {tableHead}
                <tbody>
                  <NavTableRows rows={navApplicabilityRows} />
                </tbody>
              </table>
              <NavReadMoreFooter
                ref={measureFooterRef}
                isExpanded={false}
                onToggle={() => undefined}
              />
            </div>

            <div
              data-mf-nav-table
              className="min-w-0 overflow-x-auto rounded-2xl border-2 border-white/30 opacity-0 xl:overflow-hidden"
            >
              <table ref={visibleTableRef} className={tableClassName}>
                {tableColGroup}
                {tableHead}
                <tbody>
                  <NavTableRows rows={initialRows} />
                </tbody>
              </table>

              {hasMoreRows ? (
                <div
                  ref={extraRowsRef}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                  aria-hidden={!isExpanded}
                >
                  <table className={tableClassName}>
                    {tableColGroup}
                    <tbody>
                      <NavTableRows
                        rows={extraRows}
                        startIndex={visibleRowCount}
                      />
                    </tbody>
                  </table>
                </div>
              ) : null}

              {hasMoreRows ? (
                <NavReadMoreFooter
                  isExpanded={isExpanded}
                  onToggle={toggleExpanded}
                />
              ) : null}

              <NavNotesList
                aria-hidden
                className="border-t-2 border-white/30 px-3 py-5 sm:px-4 md:px-6 xl:hidden"
              />
            </div>
          </div>

          <aside
            data-mf-nav-notes
            className="hidden min-w-0 opacity-0 xl:block xl:sticky xl:top-28"
          >
            <NavNotesList
              ref={notesRef}
              className="rounded-xl border-2 border-white/30 p-5"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
