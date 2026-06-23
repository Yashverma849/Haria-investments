"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoAnimatedText from "@/components/logo-animated-text";
import ServicesMegaMenu from "@/components/services-mega-menu";
import {
  mainNavLinks,
  scheduleConsultation,
  serviceCategories,
} from "@/lib/nav-links";

const navLinkClass =
  "rounded-lg px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white";

const NAV_OFFSET_PX = 80;

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

  const scrollToHero = () => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const top =
      hero.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
    window.history.replaceState(null, "", "/#home");
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    setMobileOpen(false);
    scrollToHero();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8">
        <Link
          href="/#home"
          scroll={false}
          onClick={handleLogoClick}
          className="group flex items-center gap-3 justify-self-start"
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

        <ul className="hidden items-center gap-1 justify-self-center lg:flex">
          {mainNavLinks.slice(0, 2).map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}

          <ServicesMegaMenu />

          {mainNavLinks.slice(2).map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 justify-self-end">
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
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
        className={`fixed inset-0 top-20 z-40 bg-background/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="h-full overflow-y-auto px-6 py-6">
          {mainNavLinks.slice(0, 2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block border-b border-white/10 py-4 text-base font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-b border-white/10 py-4">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left text-base font-medium text-white"
              onClick={() =>
                setOpenGroup((prev) => (prev === "Services" ? null : "Services"))
              }
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform ${
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
              <div className="mt-3 space-y-4 pl-2">
                {serviceCategories.map((category) => (
                  <div key={category.label}>
                    <Link
                      href={category.href}
                      className="block text-sm font-medium text-brand-light"
                      onClick={() => setMobileOpen(false)}
                    >
                      {category.label}
                    </Link>
                    {category.items && (
                      <ul className="mt-2 space-y-1 pl-3">
                        {category.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="block py-1 text-sm text-white/70 hover:text-white"
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

          {mainNavLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block border-b border-white/10 py-4 text-base font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={scheduleConsultation.href}
            className="btn-primary mt-6 block rounded-full px-4 py-3 text-center text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            {scheduleConsultation.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
