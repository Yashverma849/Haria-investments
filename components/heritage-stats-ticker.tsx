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
      <p className="text-fluid-stat font-serif font-semibold tracking-tight text-white">
        {value}
      </p>
      <p className="text-fluid-stat-label mt-1 pr-[0.2em] font-semibold uppercase tracking-[0.2em] text-brand-light">
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
