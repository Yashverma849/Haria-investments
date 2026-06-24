"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import {
  navApplicabilityRows,
  navImportantNotes,
} from "@/lib/mutual-funds-data";

export default function MutualFundsNavTable() {
  const sectionRef = useRef<HTMLElement>(null);

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
      gsap.fromTo(
        [table, notes],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: table,
            start: "top 88%",
            once: true,
          },
        },
      );
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

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <SectionHeader
        title="Applicability of NAV"
        description="Understand how transaction timing affects the Net Asset Value applied to your mutual fund purchases, redemptions, and switches."
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div
            data-mf-nav-table
            className="overflow-x-auto rounded-2xl border border-white/10 opacity-0"
          >
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 md:px-6"
                  >
                    Transaction Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 md:px-6"
                  >
                    Condition
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 md:px-6"
                  >
                    Applicable NAV
                  </th>
                </tr>
              </thead>
              <tbody>
                {navApplicabilityRows.map((row, index) => (
                  <tr
                    key={`${row.transactionType}-${row.condition}-${index}`}
                    className="border-b border-white/8 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-4 align-top font-medium text-white md:px-6">
                      {row.transactionType}
                    </td>
                    <td className="px-4 py-4 align-top text-white/75 md:px-6">
                      {row.condition}
                    </td>
                    <td className="px-4 py-4 align-top text-white/80 md:px-6">
                      {row.applicableNav}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            data-mf-nav-notes
            className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 opacity-0 md:p-8"
          >
            <h3 className="font-serif text-lg font-semibold text-white">
              Important Notes
            </h3>
            <ul className="mt-4 space-y-3">
              {navImportantNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-sm leading-relaxed text-white/70"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40"
                    aria-hidden
                  />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
