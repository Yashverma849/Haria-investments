"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHeroBackground from "@/components/page-hero-background";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import type { ServiceIntroContent } from "@/lib/service-intro-data";

type ServiceStackIntroProps = {
  content: ServiceIntroContent;
  keepVisibleOnScroll?: boolean;
};

const titleDisplayClass =
  "font-sans text-[clamp(2.75rem,11vw,7.5rem)] font-extrabold uppercase leading-[0.82] tracking-tight";

function charCenterOnRect(charRect: DOMRect, targetRect: DOMRect) {
  const cx = (charRect.left + charRect.right) / 2;
  const cy = (charRect.top + charRect.bottom) / 2;

  return (
    cx >= targetRect.left &&
    cx <= targetRect.right &&
    cy >= targetRect.top &&
    cy <= targetRect.bottom
  );
}

function updateTitleCharStyles(
  titleEl: HTMLElement | null,
  cardEl: HTMLElement | null,
) {
  if (!titleEl || !cardEl) return;

  const chars = titleEl.querySelectorAll<HTMLElement>("[data-title-char]");
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  if (!isDesktop || chars.length === 0) {
    chars.forEach((char) => {
      char.classList.remove("text-display-stroke");
      char.classList.add("text-white");
    });
    return;
  }

  const cardRect = cardEl.getBoundingClientRect();

  chars.forEach((char) => {
    const charRect = char.getBoundingClientRect();
    const onCard = charCenterOnRect(charRect, cardRect);

    char.classList.toggle("text-display-stroke", onCard);
    char.classList.toggle("text-white", !onCard);
  });
}

function TitleLine({ text }: { text: string }) {
  return (
    <span className="block">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-title-char
          className="text-white"
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

export default function ServiceStackIntro({
  content,
  keepVisibleOnScroll = true,
}: ServiceStackIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const syncTitleOverlap = () => {
    updateTitleCharStyles(titleRef.current, cardRef.current);
  };

  useLayoutEffect(() => {
    const titleEl = titleRef.current;
    const cardEl = cardRef.current;
    if (!titleEl || !cardEl) return;

    const runSync = () => {
      requestAnimationFrame(syncTitleOverlap);
    };

    runSync();
    void document.fonts.ready.then(runSync);

    const resizeObserver = new ResizeObserver(runSync);
    resizeObserver.observe(titleEl);
    resizeObserver.observe(cardEl);

    window.addEventListener("resize", runSync);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", runSync);
    };
  }, [content.titleLine1, content.titleLine2]);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("[data-service-intro-title]");
    const sidebarTitle = section.querySelector(
      "[data-service-intro-sidebar-title]",
    );
    const paragraphs = section.querySelectorAll("[data-service-intro-paragraph]");
    const images = section.querySelectorAll("[data-service-intro-image]");

    const targets = [title, sidebarTitle, ...paragraphs, ...images].filter(
      Boolean,
    );

    let entranceTimeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const animateIn = () => {
      entranceTimeline?.kill();
      entranceTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (title) {
        entranceTimeline.fromTo(
          title,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85 },
        );
      }

      images.forEach((image, index) => {
        entranceTimeline!.fromTo(
          image,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9 },
          index === 0 ? "-=0.5" : "-=0.7",
        );
      });

      paragraphs.forEach((paragraph, index) => {
        entranceTimeline!.fromTo(
          paragraph,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          index === 0 ? "-=0.5" : "-=0.55",
        );
      });

      if (sidebarTitle) {
        entranceTimeline.fromTo(
          sidebarTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.6",
        );
      }

      requestAnimationFrame(syncTitleOverlap);
    };

    const animateOut = () => {
      entranceTimeline?.kill();

      if (title) {
        gsap.to(title, {
          opacity: 0,
          y: 32,
          duration: 0.55,
          ease: "power3.in",
          overwrite: true,
        });
      }

      images.forEach((image) => {
        gsap.to(image, {
          opacity: 0,
          scale: 0.96,
          duration: 0.55,
          ease: "power3.in",
          overwrite: true,
        });
      });

      paragraphs.forEach((paragraph) => {
        gsap.to(paragraph, {
          opacity: 0,
          y: 24,
          duration: 0.55,
          ease: "power3.in",
          overwrite: true,
        });
      });

      if (sidebarTitle) {
        gsap.to(sidebarTitle, {
          opacity: 0,
          y: 20,
          duration: 0.55,
          ease: "power3.in",
          overwrite: true,
        });
      }
    };

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1 });
      syncTitleOverlap();
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (keepVisibleOnScroll) {
        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          onEnter: animateIn,
          onEnterBack: animateIn,
          once: false,
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          syncTitleOverlap();

          const { top, bottom } = section.getBoundingClientRect();
          const inView = top < window.innerHeight * 0.85 && bottom > 0;

          if (inView) {
            animateIn();
          }
        });

        return;
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: animateIn,
        onLeave: animateOut,
        onEnterBack: animateIn,
        onLeaveBack: animateOut,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        syncTitleOverlap();

        const { top, bottom } = section.getBoundingClientRect();
        const inView = top < window.innerHeight * 0.85 && bottom > 0;

        if (inView) {
          animateIn();
        }
      });
    });

    ScrollTrigger.addEventListener("refresh", syncTitleOverlap);

    return () => {
      entranceTimeline?.kill();
      scrollTrigger?.kill();
      ScrollTrigger.removeEventListener("refresh", syncTitleOverlap);
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, [keepVisibleOnScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center overflow-x-clip pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <PageHeroBackground src={content.backgroundImage} />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <div className="order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:z-20">
            <h1 className="sr-only">
              {content.titleLine1} {content.titleLine2}
            </h1>
            <div
              ref={titleRef}
              data-service-intro-title
              aria-hidden
              className={`relative ${titleDisplayClass} opacity-0`}
            >
              <TitleLine text={content.titleLine1} />
              <TitleLine text={content.titleLine2} />
            </div>
            <p
              data-service-intro-paragraph
              className="relative z-10 mt-6 max-w-[16rem] text-sm leading-relaxed text-white/75 opacity-0 sm:text-base lg:mt-8"
            >
              {content.introParagraph}
            </p>
          </div>

          <div className="order-2 lg:col-span-5 lg:col-start-4 lg:row-start-1 lg:z-10 lg:mt-[clamp(3.5rem,7vw,5.5rem)]">
            <div
              ref={cardRef}
              data-service-intro-image
              data-service-intro-primary-card
              className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-[1.75rem] opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:max-w-lg lg:mx-0 lg:max-w-[24rem] lg:rounded-[2rem] xl:max-w-[28rem]"
            >
              <Image
                src={content.primaryImage}
                alt={content.primaryImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 34vw"
                priority
                onLoad={syncTitleOverlap}
              />
            </div>
          </div>

          <div className="order-3 flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-[clamp(2rem,4.5vw,3.25rem)] lg:gap-7">
            <div
              data-service-intro-image
              className="relative mx-auto aspect-[16/10] w-full max-w-sm overflow-hidden rounded-[1.5rem] opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.3)] lg:mx-0 lg:max-w-none lg:rounded-[2rem]"
            >
              <Image
                src={content.secondaryImage}
                alt={content.secondaryImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 26vw"
              />
            </div>

            <div className="space-y-4">
              <h2
                data-service-intro-sidebar-title
                className="text-fluid-process-title font-semibold tracking-tight text-white opacity-0"
              >
                {content.sidebarTitle}
              </h2>
              <p
                data-service-intro-paragraph
                className="text-sm leading-relaxed text-white/75 opacity-0 sm:text-base"
              >
                {content.sidebarParagraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
