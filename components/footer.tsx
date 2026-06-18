"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  contactInfo,
  credentials,
  googleMapsEmbedUrl,
  googleMapsUrl,
  quickLinks,
  serviceLinks,
} from "@/lib/footer-data";

const linkClass =
  "text-sm text-white/70 transition-colors hover:text-brand-light";

function FooterLinkList({ links }: { links: typeof quickLinks }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.label} data-footer-link className="opacity-0">
          {link.external ? (
            <a
              href={link.href}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      data-footer-heading
      className="font-serif text-lg font-semibold text-white opacity-0"
    >
      {children}
    </h3>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const bg = footer.querySelector("[data-footer-bg]");
    const gradient = footer.querySelector("[data-footer-gradient]");
    const columns = footer.querySelectorAll("[data-footer-col]");
    const mapBlock = footer.querySelector("[data-footer-map]");
    const mapHeader = footer.querySelectorAll("[data-footer-map-header]");
    const bottomBar = footer.querySelector("[data-footer-bottom]");
    const bottomItems = footer.querySelectorAll("[data-footer-bottom-item]");

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions ?? {};

        if (reduceMotion) {
          gsap.set(
            [
              ...columns,
              ...mapHeader,
              mapBlock,
              ...bottomItems,
              ...footer.querySelectorAll("[data-footer-heading]"),
              ...footer.querySelectorAll("[data-footer-link]"),
              ...footer.querySelectorAll("[data-footer-text]"),
            ],
            { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
          );
          return;
        }

        if (bg) {
          gsap.fromTo(
            bg,
            { y: 80, scale: 1.12 },
            {
              y: -40,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: footer,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
        }

        if (gradient) {
          gsap.fromTo(
            gradient,
            { opacity: 0.72 },
            {
              opacity: 0.92,
              ease: "none",
              scrollTrigger: {
                trigger: footer,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            },
          );
        }

        gsap.fromTo(
          columns,
          { opacity: 0, y: 48, x: isDesktop ? -32 : 0 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: footer.querySelector("[data-footer-content]"),
              start: "top 90%",
              once: true,
            },
          },
        );

        columns.forEach((column) => {
          const heading = column.querySelector("[data-footer-heading]");
          const links = column.querySelectorAll("[data-footer-link]");
          const texts = column.querySelectorAll("[data-footer-text]");

          if (heading) {
            gsap.fromTo(
              heading,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: column,
                  start: "top 92%",
                  once: true,
                },
              },
            );
          }

          if (links.length) {
            gsap.fromTo(
              links,
              { opacity: 0, x: -12 },
              {
                opacity: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.04,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: column,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          }

          if (texts.length) {
            gsap.fromTo(
              texts,
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: column,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          }
        });

        gsap.fromTo(
          mapHeader,
          { opacity: 0, x: isDesktop ? 28 : 0, y: isDesktop ? 0 : 16 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapBlock,
              start: "top 92%",
              once: true,
            },
          },
        );

        if (mapBlock) {
          gsap.fromTo(
            mapBlock,
            {
              opacity: 0,
              x: isDesktop ? 56 : 0,
              y: isDesktop ? 0 : 32,
              scale: 0.94,
              clipPath: "inset(8% 12% 8% 12% round 1rem)",
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 1rem)",
              duration: 1.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: mapBlock,
                start: "top 90%",
                once: true,
              },
            },
          );

          if (isDesktop) {
            gsap.to(mapBlock, {
              y: -24,
              ease: "none",
              scrollTrigger: {
                trigger: footer,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6,
              },
            });
          }
        }

        if (bottomBar) {
          gsap.fromTo(
            bottomItems,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bottomBar,
                start: "top 95%",
                once: true,
              },
            },
          );
        }
      },
    );

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && footer.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10"
    >
      <div
        data-footer-bg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-0 will-change-transform bg-[url('/wmremove-transformed-removebg-preview.png')] bg-[length:100%_auto] bg-[position:center_bottom] bg-no-repeat"
      />
      <div
        data-footer-gradient
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/80"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div
          data-footer-content
          className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12"
        >
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div data-footer-col className="opacity-0">
              <FooterHeading>Quick Links</FooterHeading>
              <FooterLinkList links={quickLinks} />
            </div>

            <div data-footer-col className="opacity-0">
              <FooterHeading>Our Services</FooterHeading>
              <FooterLinkList links={serviceLinks} />
            </div>

            <div data-footer-col className="opacity-0">
              <FooterHeading>Credentials</FooterHeading>
              <ul className="mt-4 space-y-3">
                {credentials.map((item) => (
                  <li
                    key={item}
                    data-footer-text
                    className="text-sm leading-relaxed text-white/70 opacity-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div data-footer-col className="opacity-0">
              <FooterHeading>Contact Us</FooterHeading>
              <address className="mt-4 space-y-3 not-italic">
                <p
                  data-footer-text
                  className="text-sm leading-relaxed text-white/70 opacity-0"
                >
                  {contactInfo.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={contactInfo.phoneHref}
                  data-footer-text
                  className={`block opacity-0 ${linkClass}`}
                >
                  {contactInfo.phone}
                </a>
                <a
                  href={contactInfo.emailHref}
                  data-footer-text
                  className={`block break-all opacity-0 ${linkClass}`}
                >
                  {contactInfo.email}
                </a>
              </address>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3
                data-footer-map-header
                className="font-serif text-lg font-semibold text-white opacity-0"
              >
                Visit Our Office
              </h3>
              <a
                href={googleMapsUrl}
                data-footer-map-header
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-light opacity-0 transition-colors hover:text-white"
              >
                Open in Google Maps
              </a>
            </div>
            <div
              data-footer-map
              className="overflow-hidden rounded-2xl border border-white/10 opacity-0 shadow-[0_20px_60px_-30px_rgba(47,128,237,0.45)] will-change-transform"
            >
              <iframe
                title="Haria Investments office location"
                src={googleMapsEmbedUrl}
                className="h-64 w-full border-0 sm:h-80 lg:h-[min(100%,32rem)] lg:min-h-[28rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div
          data-footer-bottom
          className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10 text-center sm:flex-row sm:justify-between sm:text-left lg:mt-16"
        >
          <Link
            href="/"
            data-footer-bottom-item
            className="group flex items-center gap-3 opacity-0"
          >
            <Image
              src="/haria-logo.png"
              alt="Haria Investments Logo"
              width={52}
              height={52}
              className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <p className="font-serif text-lg font-semibold text-white">
                Haria Investments
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                since 1957
              </p>
            </div>
          </Link>

          <div
            data-footer-bottom-item
            className="space-y-1 text-sm text-white/60 opacity-0"
          >
            <p>© Haria Investments, 2026</p>
            <p>
              Made with{" "}
              <span className="text-accent" aria-hidden>
                ♥
              </span>{" "}
              by{" "}
              <a
                href="https://finzarc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 transition-colors hover:text-brand-light"
              >
                Finzarc
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
