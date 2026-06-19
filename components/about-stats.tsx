"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  useGrouping?: boolean;
};

const stats: Stat[] = [
  { value: 1957, label: "Legacy Since", useGrouping: false },
  { value: 1500, suffix: "+", label: "Clients Served" },
];

function CountUpValue({
  target,
  suffix = "",
  started,
  useGrouping = true,
}: {
  target: number;
  suffix?: string;
  started: boolean;
  useGrouping?: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started) return;

    const counter = { val: 0 };

    const tween = gsap.to(counter, {
      val: target,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(counter.val)),
    });

    return () => {
      tween.kill();
    };
  }, [started, target]);

  return (
    <>
      {display.toLocaleString(undefined, { useGrouping })}
      {suffix}
    </>
  );
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countStarted, setCountStarted] = useState(false);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-stat-card]");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      },
    );

    const counterTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => setCountStarted(true),
    });

    ScrollTrigger.refresh();
    if (ScrollTrigger.isInViewport(section, 0.15)) {
      setCountStarted(true);
    }

    return () => {
      counterTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <dl className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            data-stat-card
            className="rounded-2xl border border-white/10 bg-background/60 px-8 py-10 text-center opacity-0 backdrop-blur-sm"
          >
            <dt className="text-fluid-stat-large font-serif font-semibold tracking-tight text-white">
              <CountUpValue
                target={stat.value}
                suffix={stat.suffix}
                started={countStarted}
                useGrouping={stat.useGrouping}
              />
            </dt>
            <dd className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-light">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
