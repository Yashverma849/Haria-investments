"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeritageStatsTicker from "@/components/heritage-stats-ticker";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";

const VIDEO_SRC = "/The_Second_Complete_Wealth-ezremove.mp4";
const TEXT_REVEAL_TIME = 2;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const video = videoRef.current;

    if (!section || !videoWrap || !overlay || !content || !video) return;

    const animatedElements = section.querySelectorAll("[data-hero-animate]");

    gsap.set(animatedElements, { opacity: 0, x: -72 });

    const revealText = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      gsap.to(animatedElements, {
        opacity: 1,
        x: 0,
        duration: 1.15,
        stagger: 0.14,
        ease: "power3.out",
      });
    };

    const onTimeUpdate = () => {
      if (video.currentTime >= TEXT_REVEAL_TIME) {
        revealText();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    parallaxTl
      .to(videoWrap, { y: 140, scale: 1.08, ease: "none" }, 0)
      .to(overlay, { opacity: 0.65, ease: "none" }, 0)
      .to(content, { y: -60, ease: "none" }, 0);

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        revealText();
      });
    }

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[32rem] w-full max-w-full overflow-hidden scroll-mt-20"
    >
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={VIDEO_SRC}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/30 to-background/10"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgb(0_0_0/0.35)_100%)]" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-16 pt-28 lg:px-8"
      >
        <div className="max-w-2xl">
          <p
            data-hero-animate
            className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-light"
          >
            YOUR ONE STOP FINANCIAL SOLUTION
          </p>

          <h1
            data-hero-animate
            className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Your One Stop Solution for Comprehensive Financial Planning
          </h1>

          <p
            data-hero-animate
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Insurance, Investments, and Wealth Solutions, All in One Place.
            Build your financial future with comprehensive planning backed by
            decades of expertise.
          </p>

          <div data-hero-animate className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="-mx-6 mt-8 w-[calc(100%+3rem)] max-w-none border-t border-white/10 lg:-mx-8 lg:w-[calc(100%+4rem)]">
          <HeritageStatsTicker />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div
          data-hero-animate
          className="flex flex-col items-center gap-2 text-white/40 opacity-0"
        >
          <span className="pr-[0.25em] text-[10px] uppercase tracking-[0.25em]">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
