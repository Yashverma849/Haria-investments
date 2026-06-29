"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollSmoother from "gsap/ScrollSmoother";
import LogoAnimatedText from "@/components/logo-animated-text";
import ServicesMegaMenu from "@/components/services-mega-menu";
import CalculatorDropdown from "@/components/calculator-dropdown";
import {
  calculatorNavItems,
  mainNavLinks,
  scheduleConsultation,
  serviceCategories,
} from "@/lib/nav-links";

const navLinkClass =
  "rounded-lg px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white";

const NAV_OFFSET_PX = 80;

function getHomeSectionId(href: string) {
  const match = href.match(/^\/#(.+)$/);
  return match?.[1] ?? null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(section, true, `top ${NAV_OFFSET_PX}px`);
    } else {
      const top =
        section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }

    window.history.replaceState(null, "", `/#${sectionId}`);
  };

  const scrollToHero = () => scrollToSection("home");

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    setMobileOpen(false);
    scrollToHero();
  };

  const handleHomeHashLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (pathname !== "/") return;

    event.preventDefault();
    setMobileOpen(false);
    scrollToSection(sectionId);
  };

  const isHeaderSolid = scrolled || pathname !== "/" || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        isHeaderSolid
          ? "border-b border-white/10 bg-black/85 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="relative section-shell flex h-20 items-center justify-between">
        <Link
          href="/#home"
          scroll={false}
          onClick={handleLogoClick}
          className="group relative z-10 flex shrink-0 items-center gap-3"
        >
          <Image
            src="/logo/haria-logo.png"
            alt="Haria Investments"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <LogoAnimatedText />
        </Link>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
          {mainNavLinks.slice(0, 2).map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}

          <ServicesMegaMenu />

          {mainNavLinks.slice(2).map((link) => {
            const sectionId = getHomeSectionId(link.href);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  scroll={sectionId ? false : undefined}
                  className={navLinkClass}
                  onClick={
                    sectionId
                      ? (event) => handleHomeHashLinkClick(event, sectionId)
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative z-10 flex shrink-0 items-center gap-3">
          <CalculatorDropdown />

          <Link
            href={scheduleConsultation.href}
            className="btn-primary hidden rounded-full px-5 py-2 text-sm font-semibold lg:inline-flex"
          >
            {scheduleConsultation.label}
          </Link>

          <Link
            href={scheduleConsultation.href}
            className="btn-primary rounded-full px-4 py-2 text-xs font-semibold lg:hidden"
          >
            Schedule
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-20 z-[100] h-[calc(100dvh-5rem)] bg-black/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="section-shell flex h-full flex-col justify-between overflow-y-auto py-6 pb-12">
          <div className="space-y-1">
            {mainNavLinks.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-xl px-3 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="rounded-xl py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-base font-semibold text-white transition-colors hover:bg-white/10"
                onClick={() =>
                  setOpenGroup((prev) => (prev === "Services" ? null : "Services"))
                }
              >
                Services
                <svg
                  className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
                    openGroup === "Services" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openGroup === "Services" && (
                <div className="mt-2 space-y-4 pl-4 pt-1">
                  {serviceCategories.map((category) => (
                    <div key={category.label} className="space-y-1.5">
                      <Link
                        href={category.href}
                        className="block text-sm font-bold tracking-wide text-brand-light"
                        onClick={() => setMobileOpen(false)}
                      >
                        {category.label}
                      </Link>
                      {category.items && (
                        <ul className="space-y-1 pl-3 border-l border-white/10">
                          {category.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                className="block py-1.5 text-sm text-white/75 hover:text-white"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {mainNavLinks.slice(2).map((link) => {
              const sectionId = getHomeSectionId(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  scroll={sectionId ? false : undefined}
                  className="block rounded-xl px-3 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                  onClick={
                    sectionId
                      ? (event) => handleHomeHashLinkClick(event, sectionId)
                      : () => setMobileOpen(false)
                  }
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="rounded-xl py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-base font-semibold text-white transition-colors hover:bg-white/10"
                onClick={() =>
                  setOpenGroup((prev) =>
                    prev === "Calculator" ? null : "Calculator",
                  )
                }
              >
                Calculators
                <svg
                  className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
                    openGroup === "Calculator" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openGroup === "Calculator" && (
                <ul className="mt-2 space-y-1 pl-4 border-l border-white/10">
                  {calculatorNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-1.5 text-sm text-white/75 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <Link
              href={scheduleConsultation.href}
              className="btn-primary block w-full rounded-full py-3.5 text-center text-sm font-semibold shadow-lg"
              onClick={() => setMobileOpen(false)}
            >
              {scheduleConsultation.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
