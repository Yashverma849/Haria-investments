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
              <div className="flex items-center gap-6 pt-2">
                {/* Instagram Icon */}
                <a
                  href={contactInfo.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/70 transition-colors hover:text-charcoal"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-8 w-8 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                
                {/* WhatsApp Icon */}
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/70 transition-colors hover:text-charcoal"
                  aria-label="WhatsApp"
                >
                  <svg
                    className="h-8 w-8 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
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
