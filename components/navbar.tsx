"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/haria-logo.png"
            alt="Haria Investments"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <LogoAnimatedText />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
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

          <li>
            <Link
              href={scheduleConsultation.href}
              className="btn-primary ml-2 rounded-full px-5 py-2 text-sm font-semibold"
            >
              {scheduleConsultation.label}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={scheduleConsultation.href}
            className="btn-primary rounded-full px-4 py-2 text-xs font-semibold"
          >
            Schedule
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white"
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
          <Link
            href="/"
            className="block border-b border-white/10 py-4 text-base font-medium text-white"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block border-b border-white/10 py-4 text-base font-medium text-white"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>

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
