"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { aboutCompanyParagraphs } from "@/lib/team-data";

const ABOUT_HERO_IMAGE = "/images/about/about-company-desk.jpg";
const ABOUT_DETAIL_IMAGE = "/images/about/about-philosophy.jpg";

const [introParagraph, , legacyParagraph] = aboutCompanyParagraphs;

type AboutCompanyIntroProps = {
  /** Keep content visible when pinned under a stack-scroll cover panel */
  keepVisibleOnScroll?: boolean;
};

export default function AboutCompanyIntro({
  keepVisibleOnScroll = false,
}: AboutCompanyIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector("[data-about-title]");
    const philosophyTitle = section.querySelector("[data-about-philosophy-title]");
    const paragraphs = section.querySelectorAll("[data-about-paragraph]");
    const images = section.querySelectorAll("[data-about-image]");

    const targets = [title, philosophyTitle, ...paragraphs, ...images].filter(
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

      if (philosophyTitle) {
        entranceTimeline.fromTo(
          philosophyTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.6",
        );
      }
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

      if (philosophyTitle) {
        gsap.to(philosophyTitle, {
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

        const { top, bottom } = section.getBoundingClientRect();
        const inView = top < window.innerHeight * 0.85 && bottom > 0;

        if (inView) {
          animateIn();
        }
      });
    });

    return () => {
      entranceTimeline?.kill();
      scrollTrigger?.kill();
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
      className="overflow-x-clip bg-background pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <div className="order-1 lg:col-span-3 lg:row-start-1">
            <h1
              data-about-title
              className="font-sans text-[clamp(3rem,12vw,7.5rem)] font-extrabold uppercase leading-[0.82] tracking-tight text-white opacity-0"
            >
              <span className="block">About</span>
              <span className="block">Us</span>
            </h1>
            <p
              data-about-paragraph
              className="mt-6 max-w-[16rem] text-sm leading-relaxed text-white/75 opacity-0 sm:text-base lg:mt-8"
            >
              {introParagraph}
            </p>
          </div>

          <div className="order-2 lg:col-span-5 lg:col-start-4 lg:row-start-1 lg:mt-[clamp(3.5rem,7vw,5.5rem)]">
            <div
              data-about-image
              className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-[1.75rem] opacity-0 sm:max-w-lg lg:mx-0 lg:max-w-[24rem] lg:rounded-[2rem] xl:max-w-[28rem]"
            >
              <Image
                src={ABOUT_HERO_IMAGE}
                alt="Financial planning desk with insurance and wealth strategy documents overlooking a city skyline"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 34vw"
                priority
              />
            </div>
          </div>

          <div className="order-3 flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-[clamp(2rem,4.5vw,3.25rem)] lg:gap-7">
            <div
              data-about-image
              className="relative mx-auto aspect-[16/10] w-full max-w-sm overflow-hidden rounded-[1.5rem] opacity-0 lg:mx-0 lg:max-w-none lg:rounded-[2rem]"
            >
              <Image
                src={ABOUT_DETAIL_IMAGE}
                alt="Financial planning review with insurance and investment documents"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 26vw"
              />
            </div>

            <div className="space-y-4">
              <h2
                data-about-philosophy-title
                className="text-fluid-process-title font-semibold tracking-tight text-white opacity-0"
              >
                Our Philosophy
              </h2>
              <p
                data-about-paragraph
                className="text-sm leading-relaxed text-white/75 opacity-0 sm:text-base"
              >
                {legacyParagraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
