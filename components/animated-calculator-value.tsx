"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

type AnimatedCalculatorValueProps = {
  value: number;
  format: "currency" | "percent";
  active: boolean;
  animationKey: number;
};

export default function AnimatedCalculatorValue({
  value,
  format,
  active,
  animationKey,
}: AnimatedCalculatorValueProps) {
  const [display, setDisplay] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplay(0);
      return;
    }

    tweenRef.current?.kill();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const counter = { val: 0 };

    tweenRef.current = gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        setDisplay(format === "percent" ? counter.val : Math.round(counter.val));
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [value, active, animationKey, format]);

  if (!active) {
    return <>—</>;
  }

  if (format === "percent") {
    return <>{percentFormatter.format(display)}%</>;
  }

  return <>{currencyFormatter.format(display)}</>;
}
