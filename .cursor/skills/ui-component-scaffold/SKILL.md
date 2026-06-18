---
name: ui-component-scaffold
description: Scaffold accessible, responsive React components and page sections for Haria Investments. Use when the user asks to create a new component, section, hero, footer, card, form, or UI block from scratch.
---

# UI Component Scaffold

## Steps

1. **Classify**: primitive (`Button`), section (`Hero`), or layout (`Header`)
2. **Choose boundary**: server by default; client only if interactive
3. **Scaffold file** in `app/components/` (create folder if missing)
4. **Implement** semantic HTML + Tailwind + types
5. **Integrate** into parent page/layout

## File Naming

| Type | Path example |
|------|--------------|
| Primitive | `app/components/ui/Button.tsx` |
| Section | `app/components/sections/Hero.tsx` |
| Layout | `app/components/layout/Header.tsx` |

## Scaffold Templates

### Section (server)

```tsx
type HeroProps = {
  headline: string;
  subheadline?: string;
};

export function Hero({ headline, subheadline }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {headline}
        </h1>
        {subheadline ? (
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            {subheadline}
          </p>
        ) : null}
      </div>
    </section>
  );
}
```

### Interactive (client)

```tsx
"use client";

type CtaButtonProps = {
  label: string;
  onClick: () => void;
};

export function CtaButton({ label, onClick }: CtaButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {label}
    </button>
  );
}
```

## Integration

```tsx
// app/page.tsx
import { Hero } from "./components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero headline="..." subheadline="..." />
    </>
  );
}
```

## Before Finishing

- [ ] Exported named export (easier to tree-shake and refactor than default-only)
- [ ] Props typed, no `any`
- [ ] Works in light and dark mode
- [ ] Parent page still builds: `npm run build`
