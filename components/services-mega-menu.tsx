"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { serviceCategories, type ServiceCategory } from "@/lib/nav-links";

type ServiceCardsProps = {
  category: ServiceCategory;
};

function ServiceCards({ category }: ServiceCardsProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const cards =
    category.items && category.items.length > 0
      ? category.items
      : [
          {
            label: category.label,
            href: category.href,
            description: category.description,
            image: category.image,
          },
        ];

  useGsapAfterLoader(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cardElements = grid.querySelectorAll("[data-service-card]");

    gsap.fromTo(
      cardElements,
      { opacity: 0, y: 28, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.09,
        ease: "power3.out",
      },
    );
  }, [category]);

  const handleCardMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const imageWrap = event.currentTarget.querySelector<HTMLDivElement>(
      "[data-card-image]",
    );
    if (!imageWrap) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageWrap, {
      x: x * 24,
      y: y * 18,
      scale: 1.1,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const imageWrap = event.currentTarget.querySelector<HTMLDivElement>(
      "[data-card-image]",
    );
    if (!imageWrap) return;

    gsap.to(imageWrap, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={gridRef}
      className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {cards.map((card) => (
        <Link
          key={card.label}
          href={card.href}
          data-service-card
          className="group/card relative min-h-[140px] overflow-hidden rounded-xl border border-white/15 bg-brand/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:border-brand-light/30 hover:bg-brand/[0.06] hover:shadow-[0_12px_40px_-12px_rgba(255,255,255,0.1)]"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div
            data-card-image
            className="absolute inset-[-12%] bg-brand/20 opacity-55 will-change-transform transition-opacity duration-300 group-hover/card:opacity-70"
          >
            <Image
              src={card.image ?? category.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
              priority={false}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-brand-light/8 to-background/10 transition-all duration-300 group-hover/card:from-brand/22 group-hover/card:via-brand-light/12" />
          <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />

          <div className="relative z-10 flex min-h-[140px] flex-col justify-end p-4">
            <span className="text-sm font-semibold text-white drop-shadow-sm">
              {card.label}
            </span>
            {card.description && (
              <span className="mt-1 text-xs text-white/80 drop-shadow-sm">
                {card.description}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ServicesMegaMenu() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(
    serviceCategories[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLLIElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openTweenRef = useRef<gsap.core.Timeline | null>(null);
  const headerTweenRef = useRef<gsap.core.Tween | null>(null);

  const animateOpen = () => {
    const dropdown = dropdownRef.current;
    const panel = panelRef.current;
    const arrow = arrowRef.current;
    const listItems = listRef.current?.querySelectorAll("[data-nav-item]");
    const header = headerRef.current;
    const content = contentRef.current;

    if (!dropdown || !panel || !arrow || !listItems || !header || !content) return;

    openTweenRef.current?.kill();

    gsap.set(dropdown, { visibility: "visible", pointerEvents: "auto" });

    const tl = gsap.timeline();
    openTweenRef.current = tl;

    tl.fromTo(
      panel,
      { opacity: 0, y: -28, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      0,
    )
      .fromTo(
        arrow,
        { opacity: 0, y: -10, scale: 0.6 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)" },
        0.08,
      )
      .fromTo(
        listItems,
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" },
        0.12,
      )
      .fromTo(
        header,
        { opacity: 0, x: 36 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },
        0.18,
      )
      .fromTo(
        content,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
        0.22,
      );
  };

  const animateClose = () => {
    const dropdown = dropdownRef.current;
    const panel = panelRef.current;

    if (!dropdown || !panel) return;

    openTweenRef.current?.kill();

    gsap.to(panel, {
      opacity: 0,
      y: -16,
      scale: 0.97,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(dropdown, { visibility: "hidden", pointerEvents: "none" });
        gsap.set(panel, { opacity: 0, y: -28, scale: 0.95 });
      },
    });
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
    animateOpen();
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    animateClose();
  };

  const handleCategoryChange = (category: ServiceCategory) => {
    if (category.label === activeCategory.label) return;

    const header = headerRef.current;
    if (!header) {
      setActiveCategory(category);
      return;
    }

    headerTweenRef.current?.kill();

    headerTweenRef.current = gsap.to(header, {
      opacity: 0,
      x: -16,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(category);
        gsap.fromTo(
          header,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.38, ease: "power3.out" },
        );
      },
    });
  };

  const handlePanelMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel || !isOpen) return;

    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(panel, {
      rotateX: y * -4,
      rotateY: x * 4,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handlePanelMouseLeave = () => {
    const panel = panelRef.current;
    if (!panel) return;

    gsap.to(panel, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  useGsapAfterLoader(() => {
    const dropdown = dropdownRef.current;
    const panel = panelRef.current;

    if (!dropdown || !panel) return;

    gsap.set(dropdown, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(panel, { opacity: 0, y: -28, scale: 0.95 });

    return () => {
      openTweenRef.current?.kill();
      headerTweenRef.current?.kill();
    };
  }, []);

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isOpen
            ? "bg-white/5 text-white"
            : "text-white/85 hover:bg-white/5 hover:text-white"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Services
        <svg
          className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        ref={dropdownRef}
        className="absolute left-1/2 top-full z-50 w-[min(92vw,720px)] -translate-x-1/2 pt-4"
      >
        <div
          ref={panelRef}
          className="surface-dropdown bg-surface relative overflow-hidden rounded-2xl shadow-2xl shadow-black/15 backdrop-blur-xl will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
        >
          <div
            ref={arrowRef}
            className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-l border-t border-charcoal/10 bg-[var(--off-white-1)] opacity-0"
          />

          <div className="flex min-h-[320px]">
            <ul ref={listRef} className="w-[220px] shrink-0 border-r border-charcoal/10 p-3">
              {serviceCategories.map((category) => (
                <li key={category.label}>
                  <button
                    type="button"
                    data-nav-item
                    onMouseEnter={() => handleCategoryChange(category)}
                    onFocus={() => handleCategoryChange(category)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeCategory.label === category.label
                        ? "bg-charcoal/8 font-medium text-charcoal"
                        : "text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal"
                    }`}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-1 flex-col p-4">
              <div ref={headerRef} className="mb-3">
                <h3 className="text-sm font-semibold text-charcoal">
                  {activeCategory.label}
                </h3>
                <p className="mt-0.5 text-xs text-charcoal/60">
                  {activeCategory.description}
                </p>
              </div>
              <div ref={contentRef}>
                <ServiceCards category={activeCategory} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
