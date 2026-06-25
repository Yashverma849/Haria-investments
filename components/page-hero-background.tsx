import Image from "next/image";

type PageHeroBackgroundProps = {
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function PageHeroBackground({
  src,
  alt = "",
  priority = true,
}: PageHeroBackgroundProps) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/92 via-background/78 to-background/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--blue)_22%,transparent),transparent_55%)]"
        aria-hidden
      />
    </>
  );
}
