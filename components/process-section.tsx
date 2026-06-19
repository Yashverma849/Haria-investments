"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import SectionHeader from "@/components/section-header";
import { processSteps, type ProcessStep } from "@/lib/process-data";

const PROCESS_BG_IMAGE = "/Gemini_Generated_Image_4dwmx4dwmx4dwmx4.png";

type ProcessTextStepProps = {
  step: ProcessStep;
  index: number;
  side: "left" | "right";
};

function ProcessTextStep({ step, index, side }: ProcessTextStepProps) {
  const isFirst = index === 0;

  return (
    <article
      data-process-step
      data-process-side={side}
      className={`absolute inset-0 flex items-center overflow-hidden ${isFirst ? "visible" : "invisible"}`}
    >
      <div
        data-process-content
        className={`w-full max-h-full min-h-0 ${isFirst ? "" : "opacity-0"}`}
      >
        <ProcessTextContent step={step} index={index} />
      </div>
    </article>
  );
}

function ProcessDetailColumn({
  title,
  titleClassName,
  children,
}: {
  title: string;
  titleClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <h4
        className={`text-fluid-process-body font-semibold uppercase tracking-[0.16em] ${titleClassName ?? "text-brand-light"}`}
      >
        {title}
      </h4>
      <div className="mt-2 sm:mt-3">{children}</div>
    </div>
  );
}

function ProcessTextContent({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) {
  return (
    <>
      <div className="mb-3 md:mb-4">
        <span className="text-fluid-process-body font-serif font-semibold text-brand-light">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="text-fluid-process-title mt-1 font-serif font-semibold text-cream">
          {step.title}
        </h3>

        <p className="text-fluid-process-body mt-2 max-w-4xl text-cream/75">
          {step.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
        <ProcessDetailColumn title="What to Expect">
          <ul className="space-y-1.5 sm:space-y-2">
            {step.whatToExpect.map((item) => (
              <li
                key={item}
                className="text-fluid-process-body flex gap-2.5 text-cream/80"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ProcessDetailColumn>

        <ProcessDetailColumn title="Your Preparation">
          <ul className="space-y-1.5 sm:space-y-2">
            {step.yourPreparation.map((item) => (
              <li
                key={item}
                className="text-fluid-process-body flex gap-2.5 text-cream/80"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ProcessDetailColumn>

        <ProcessDetailColumn title="Outcome" titleClassName="text-accent">
          <p className="text-base leading-relaxed text-cream/85 sm:text-lg lg:text-xl">
            {step.outcome}
          </p>
        </ProcessDetailColumn>
      </div>
    </>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const bgSyncRef = useRef<(() => void) | null>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const stage = stageRef.current;
    const parallax = parallaxRef.current;

    if (!section || !pinWrapper || !stage) return;

    const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", stage);
    const stepCount = steps.length;
    if (stepCount === 0) return;

    let pinTrigger: ScrollTrigger | null = null;
    const retryTimers: number[] = [];

    const getNavHeight = () =>
      document.querySelector("header")?.getBoundingClientRect().height ?? 80;

    const updateScene = (progress: number) => {
      const maxIndex = stepCount - 1;
      const scaled = progress * maxIndex;
      const currentIndex = Math.min(Math.floor(scaled), maxIndex);
      const local = scaled - currentIndex;
      const isLastStep = currentIndex >= maxIndex;

      const HOLD = 0.32;
      const CROSSFADE = 0.36;
      const fadeOutStart = HOLD;
      const crossfadeEnd = HOLD + CROSSFADE;

      steps.forEach((step, index) => {
        const content = step.querySelector("[data-process-content]");
        if (!content) return;

        const side = step.getAttribute("data-process-side");
        const drift = side === "left" ? -36 : 36;

        if (index === currentIndex) {
          let opacity = 1;
          let y = 0;
          let x = 0;

          if (local <= fadeOutStart) {
            opacity = 1;
          } else if (!isLastStep && local <= crossfadeEnd) {
            const t = (local - fadeOutStart) / CROSSFADE;
            opacity = 1 - t;
            y = -28 * t;
            x = drift * t;
          } else if (!isLastStep) {
            opacity = 0;
            y = -28;
            x = drift;
          }

          gsap.set(content, { opacity, x, y });
          gsap.set(step, {
            visibility: opacity > 0 ? "visible" : "hidden",
            pointerEvents: opacity > 0.05 ? "auto" : "none",
          });
        } else if (index === currentIndex + 1) {
          let opacity = 0;
          let y = 28;
          let x = drift;

          if (local < fadeOutStart) {
            opacity = 0;
          } else if (local <= crossfadeEnd) {
            const t = (local - fadeOutStart) / CROSSFADE;
            opacity = t;
            y = 28 * (1 - t);
            x = drift * (1 - t);
          } else {
            opacity = 1;
            y = 0;
            x = 0;
          }

          gsap.set(content, { opacity, x, y });
          gsap.set(step, {
            visibility: opacity > 0 ? "visible" : "hidden",
            pointerEvents: opacity > 0.05 ? "auto" : "none",
          });
        } else {
          gsap.set(content, { opacity: 0, x: 0, y: index < currentIndex ? -28 : 28 });
          gsap.set(step, { visibility: "hidden", pointerEvents: "none" });
        }
      });

      if (parallax) {
        gsap.set(parallax, { y: progress * -36, scale: 1.06 });
      }
    };

    const syncScene = () => {
      if (!pinTrigger) return;
      pinTrigger.refresh();
      updateScene(pinTrigger.progress);
    };

    const scheduleSync = () => {
      syncScene();
      requestAnimationFrame(syncScene);
      retryTimers.push(
        window.setTimeout(syncScene, 120),
        window.setTimeout(syncScene, 400),
        window.setTimeout(syncScene, 900),
      );
    };

    const setupPinnedStory = () => {
      pinTrigger?.kill();

      const scrollDistance = () =>
        (window.innerHeight - getNavHeight()) * (stepCount - 1) * 1.5;

      pinTrigger = ScrollTrigger.create({
        trigger: pinWrapper,
        start: () => `top ${getNavHeight()}px`,
        end: () => `+=${scrollDistance()}`,
        pin: stage,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateScene(self.progress),
        onRefresh: (self) => updateScene(self.progress),
      });

      updateScene(0);
      scheduleSync();
      bgSyncRef.current = scheduleSync;
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      steps.forEach((step, index) => {
        const content = step.querySelector("[data-process-content]");
        gsap.set(step, {
          visibility: index === 0 ? "visible" : "hidden",
          position: "relative",
          inset: "auto",
        });
        gsap.set(content, { opacity: index === 0 ? 1 : 0, x: 0, y: 0 });
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(steps, { visibility: "hidden" });
      gsap.set(steps[0], { visibility: "visible" });
      gsap.set(steps[0].querySelector("[data-process-content]"), {
        opacity: 1,
        x: 0,
        y: 0,
      });

      requestAnimationFrame(setupPinnedStory);

      const onResize = () => syncScene();
      const onLoad = () => scheduleSync();

      window.addEventListener("resize", onResize);
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onLoad);
      };
    });

    return () => {
      bgSyncRef.current = null;
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      pinTrigger?.kill();
      pinTrigger = null;
      mm.revert();
      steps.forEach((step) => {
        gsap.set(step, { clearProps: "visibility,pointerEvents" });
        const content = step.querySelector("[data-process-content]");
        if (content) gsap.set(content, { clearProps: "opacity,transform" });
      });
      if (parallax) gsap.set(parallax, { clearProps: "transform" });
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="border-t border-white/10 bg-surface"
    >
      <SectionHeader
        title="Our Process"
        description="A systematic, transparent approach designed to reduce anxiety and build confidence throughout your financial planning journey."
        className="py-16 md:py-20 lg:pb-10"
      />

      <div ref={pinWrapperRef} className="relative w-full">
        <div
          ref={stageRef}
          data-process-stage
          className="relative h-[calc(100svh-5rem)] min-h-[32rem] w-full overflow-hidden"
        >
          <div
            ref={parallaxRef}
            className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
            aria-hidden
          >
            <Image
              src={PROCESS_BG_IMAGE}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              onLoad={() => bgSyncRef.current?.()}
            />
            <div className="absolute inset-0 bg-charcoal/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/70" />
          </div>

          <div className="viewport-frame relative z-10 mx-auto h-full max-w-7xl px-6 lg:px-8">
            {processSteps.map((step, index) => (
              <ProcessTextStep
                key={step.id}
                step={step}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
