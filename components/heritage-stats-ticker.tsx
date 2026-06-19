"use client";

const STATS = [
  { value: "Since 1957", label: "Years of Heritage" },
  { value: "₹150+ Cr", label: "AUM Managed" },
  { value: "1,500+", label: "Clients Served" },
  { value: "4", label: "Generations Served" },
] as const;

function StatCell({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      data-hero-animate
      className="flex flex-col items-center px-3 py-2 text-center opacity-0 sm:px-4"
    >
      <p className="font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
        {value}
      </p>
      <p className="mt-1 pr-[0.2em] text-xs font-semibold uppercase tracking-[0.2em] text-brand-light sm:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function HeritageStatsTicker() {
  return (
    <div
      className="grid w-full grid-cols-2 divide-x divide-white/10 sm:grid-cols-4"
      aria-label="Company highlights"
    >
      {STATS.map((stat) => (
        <StatCell key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}
