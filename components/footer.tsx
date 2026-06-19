"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import FooterEngravedBrand from "@/components/footer-engraved-brand";
import FooterNewsletter from "@/components/newsletter-section";
import {
  contactInfo,
  credentials,
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
      className="font-serif text-lg font-semibold leading-tight text-white opacity-0"
    >
      {children}
    </h3>
  );
}

function FooterColumn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-footer-col
      className={`min-w-0 text-left opacity-0 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const columns = footer.querySelectorAll("[data-footer-col]");
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
              ...bottomItems,
              ...footer.querySelectorAll("[data-footer-heading]"),
              ...footer.querySelectorAll("[data-footer-link]"),
              ...footer.querySelectorAll("[data-footer-text]"),
            ],
            { opacity: 1, x: 0, y: 0 },
          );
          return;
        }

        gsap.fromTo(
          columns,
          { opacity: 0, y: 40, x: isDesktop ? -24 : 0 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: footer.querySelector("[data-footer-content]"),
              start: "top 90%",
              once: true,
            },
          },
        );

        columns.forEach((column) => {
          const headings = column.querySelectorAll("[data-footer-heading]");
          const links = column.querySelectorAll("[data-footer-link]");
          const texts = column.querySelectorAll("[data-footer-text]");

          if (headings.length) {
            gsap.fromTo(
              headings,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.08,
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
              { opacity: 0, x: -10 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
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
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
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

        if (bottomBar) {
          gsap.fromTo(
            bottomItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
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
      className="overflow-hidden bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-6 md:px-8 lg:pt-20 lg:pb-8">
        <div
          data-footer-content
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12"
        >
          <FooterColumn>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList links={quickLinks} />
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Our Services</FooterHeading>
            <FooterLinkList links={serviceLinks} />
          </FooterColumn>

          <FooterColumn>
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
            <FooterNewsletter />
          </FooterColumn>

          <FooterColumn>
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
              <a
                href={googleMapsUrl}
                data-footer-text
                target="_blank"
                rel="noopener noreferrer"
                className={`block opacity-0 ${linkClass}`}
              >
                Open in Google Maps
              </a>
            </address>
          </FooterColumn>
        </div>

        <FooterEngravedBrand />

        <div
          data-footer-bottom
          className="relative z-10 mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 lg:mt-16 md:flex-row md:items-center md:justify-between"
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
            className="space-y-1 text-sm text-white/60 opacity-0 md:text-right"
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
