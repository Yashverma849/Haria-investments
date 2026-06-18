"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const valueCards = [
  {
    title: "Vision",
    description:
      "To be recognized as a leading wealth and protection partner that combines innovation, integrity, and personalized care—enabling every client to build sustainable wealth, safeguard their future, and achieve financial freedom across generations.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    title: "Mission",
    description:
      "To provide holistic financial solutions that help individuals and clients protect, grow, and diversify their wealth. Through trusted advice, research-driven strategies, and a wide spectrum of offerings, we empower clients to achieve financial security, prosperity, and peace of mind.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    title: "Our Commitment",
    description:
      "Our vision, values, and tireless dedication continue to inspire us as we serve our clients today. We are proud to be the second and third generation reaping the rewards of our grandfather's hard work, and more importantly, carrying forward a tradition of trust and service that spans decades.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  },
] as const;

export default function AboutValueCards() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-value-card]");

    gsap.fromTo(
      cards,
      { x: -64, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === grid) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={gridRef} className="grid gap-8 lg:grid-cols-3">
      {valueCards.map((card) => (
        <article
          key={card.title}
          data-value-card
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-8 opacity-0 backdrop-blur-sm transition-colors duration-500 hover:border-white/20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          >
            <Image
              src={card.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-background/88" />
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-2xl font-semibold text-white">
              {card.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              {card.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
