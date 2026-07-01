import Image from "next/image";
import Link from "next/link";
import FooterEngravedBrand from "@/components/footer-engraved-brand";
import FooterNewsletter from "@/components/newsletter-section";
import {
  contactInfo,
  credentials,
  footerServiceColumns,
  googleMapsUrl,
  quickLinks,
} from "@/lib/footer-data";

const linkClass =
  "text-sm text-charcoal/70 transition-colors hover:text-charcoal";

function FooterLinkList({ links }: { links: typeof quickLinks }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
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
    <h3 className="font-serif text-lg font-semibold leading-tight text-charcoal">
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
  return <div className={`min-w-0 text-left ${className}`}>{children}</div>;
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-surface">
      <div className="section-shell pt-16 pb-6 lg:pt-20 lg:pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
          <FooterColumn>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList links={quickLinks} />
          </FooterColumn>

          <FooterColumn className="sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-x-10 lg:gap-x-12 xl:gap-x-16">
              {footerServiceColumns.map((col, idx) => (
                <div key={col.title} className="flex flex-col sm:min-w-[110px]">
                  {/* Desktop Title & Spacers for Alignment */}
                  {idx === 1 ? (
                    <h3 className="hidden sm:block font-serif text-lg font-semibold leading-tight text-charcoal mb-4">
                      Our Services
                    </h3>
                  ) : (
                    <h3 className="hidden sm:block font-serif text-lg font-semibold leading-tight text-transparent select-none mb-4" aria-hidden>
                      Spacer
                    </h3>
                  )}

                  {/* Mobile Title */}
                  {idx === 0 && (
                    <h3 className="block sm:hidden font-serif text-lg font-semibold leading-tight text-charcoal mb-4">
                      Our Services
                    </h3>
                  )}

                  <Link
                    href={col.href}
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/80 transition-colors hover:text-charcoal"
                  >
                    {col.title}
                  </Link>
                  <ul className="mt-2.5 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Credentials</FooterHeading>
            <ul className="mt-4 space-y-3">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-charcoal/70"
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
              <p className="text-sm leading-relaxed text-charcoal/70">
                {contactInfo.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a href={contactInfo.phoneHref} className={`block ${linkClass}`}>
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.emailHref}
                className={`block break-all ${linkClass}`}
              >
                {contactInfo.email}
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${linkClass}`}
              >
                Open in Google Maps
              </a>
            </address>
          </FooterColumn>
        </div>

        <FooterEngravedBrand />

        <div className="relative z-10 mt-6 flex flex-col gap-6 border-t border-charcoal/10 pt-8 lg:mt-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo/haria-logo.png"
              alt="Haria Investments Logo"
              width={52}
              height={52}
              className="h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <p className="font-serif text-lg font-semibold text-charcoal">
                Haria Investments
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/55">
                since 1957
              </p>
            </div>
          </Link>

          <div className="space-y-1 text-sm text-charcoal/60 md:text-right">
            <p>© Haria Investments, 2026</p>
            <p>
              Made with{" "}
              <span className="text-charcoal/80" aria-hidden>
                ♥
              </span>{" "}
              by{" "}
              <a
                href="https://finzarc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/80 transition-colors hover:text-charcoal"
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
