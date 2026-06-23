"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { type TeamMember } from "@/lib/team-data";

type LegacyShowcaseProps = {
  members: TeamMember[];
  showReadMore?: boolean;
  scrollReplay?: boolean;
};

function LegacyPortrait({ member }: { member: TeamMember }) {
  return (
    <div className="group/image relative aspect-[3/4] w-[min(72vw,13.5rem)] overflow-hidden rounded-2xl border border-charcoal/10 bg-surface shadow-xl sm:w-56">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover/image:scale-105"
        sizes="224px"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-4 pt-12">
        {member.badge ? (
          <span className="mb-1.5 inline-block rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
            {member.badge}
          </span>
        ) : null}
        <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
          {member.name}
        </h3>
      </div>
    </div>
  );
}

function LegacyBio({ member }: { member: TeamMember }) {
  return (
    <div className="space-y-3">
      {member.bio.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function LegacyShowcase({
  members,
  showReadMore = false,
  scrollReplay = false,
}: LegacyShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const rows = container.querySelectorAll("[data-legacy-row]");
    const readMore = container.querySelector("[data-legacy-read-more]");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([...rows, readMore].filter(Boolean), { opacity: 1, x: 0, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      rows.forEach((row, index) => {
        const image = row.querySelector("[data-legacy-image]");
        const text = row.querySelector("[data-legacy-text]");
        const imageLeft = index % 2 === 0;

        if (scrollReplay) {
          const animateRowIn = () => {
            gsap.to(row, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              overwrite: true,
            });

            if (image) {
              gsap.to(image, {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: true,
              });
            }

            if (text) {
              gsap.to(text, {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: true,
              });
            }
          };

          const animateRowOut = () => {
            gsap.to(row, {
              opacity: 0,
              y: 32,
              duration: 0.55,
              ease: "power3.in",
              overwrite: true,
            });

            if (image) {
              gsap.to(image, {
                opacity: 0,
                x: imageLeft ? -48 : 48,
                duration: 0.55,
                ease: "power3.in",
                overwrite: true,
              });
            }

            if (text) {
              gsap.to(text, {
                opacity: 0,
                x: imageLeft ? 48 : -48,
                duration: 0.55,
                ease: "power3.in",
                overwrite: true,
              });
            }
          };

          gsap.set(row, { opacity: 0, y: 32 });
          if (image) gsap.set(image, { opacity: 0, x: imageLeft ? -48 : 48 });
          if (text) gsap.set(text, { opacity: 0, x: imageLeft ? 48 : -48 });

          ScrollTrigger.create({
            trigger: row,
            start: "top 88%",
            end: "bottom 12%",
            onEnter: animateRowIn,
            onLeave: animateRowOut,
            onEnterBack: animateRowIn,
            onLeaveBack: animateRowOut,
          });

          return;
        }

        gsap.fromTo(
          row,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              once: true,
            },
          },
        );

        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, x: imageLeft ? -48 : 48 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
              },
            },
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: imageLeft ? 48 : -48 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
              },
            },
          );
        }
      });

      if (readMore) {
        if (scrollReplay) {
          const animateReadMoreIn = () => {
            gsap.to(readMore, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              overwrite: true,
            });
          };

          const animateReadMoreOut = () => {
            gsap.to(readMore, {
              opacity: 0,
              y: 20,
              duration: 0.55,
              ease: "power3.in",
              overwrite: true,
            });
          };

          gsap.set(readMore, { opacity: 0, y: 20 });

          ScrollTrigger.create({
            trigger: readMore,
            start: "top 92%",
            end: "bottom 8%",
            onEnter: animateReadMoreIn,
            onLeave: animateReadMoreOut,
            onEnterBack: animateReadMoreIn,
            onLeaveBack: animateReadMoreOut,
          });
        } else {
          gsap.fromTo(
            readMore,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: readMore,
                start: "top 92%",
                once: true,
              },
            },
          );
        }
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && container.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, [members.length, showReadMore, scrollReplay]);

  return (
    <div ref={containerRef} className="space-y-16 md:space-y-24 lg:space-y-28">
      {members.map((member, index) => {
        const imageLeft = index % 2 === 0;

        return (
          <article
            key={member.name}
            data-legacy-row
            className={`flex flex-col gap-8 opacity-0 md:flex-row md:items-center md:gap-10 lg:gap-14 ${
              imageLeft ? "" : "md:flex-row-reverse"
            }`}
          >
            <div
              data-legacy-image
              className={`flex shrink-0 justify-center opacity-0 ${
                imageLeft ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <LegacyPortrait member={member} />
            </div>

            <div
              data-legacy-text
              className="min-w-0 flex-1 opacity-0"
            >
              <LegacyBio member={member} />
            </div>
          </article>
        );
      })}

      {showReadMore ? (
        <div data-legacy-read-more className="flex justify-center opacity-0 pt-4">
          <Link
            href="/about#legacy-leaders"
            scroll={false}
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/45 hover:bg-white/10"
          >
            Read more
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
