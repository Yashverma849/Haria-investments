---
name: senior-frontend
description: Build and review production-grade React/Next.js UI with accessibility, performance, and maintainability. Use when creating components, pages, layouts, styling, UX polish, frontend refactors, or when the user asks for senior-level frontend work.
---

# Senior Frontend Development

## When to Apply

- Building new pages, sections, or reusable UI
- Reviewing or refactoring frontend code
- Improving accessibility, responsiveness, or performance
- Implementing design systems or brand-aligned styling

## Workflow

### 1. Understand Context

- Read surrounding files before editing — match naming, structure, and patterns
- Identify server vs client boundary needs early
- Check `app/globals.css` for existing design tokens

### 2. Plan Component Boundaries

```
Server Component (default)
├── static markup, data fetch, SEO metadata
└── Client island ("use client")
    ├── forms, modals, carousels
    └── browser-only APIs
```

### 3. Implement

1. Start with semantic HTML structure
2. Apply Tailwind utilities using project tokens (`background`, `foreground`)
3. Add interactivity only in client components
4. Wire `next/image`, `next/link`, and metadata as appropriate

### 4. Quality Pass

Run through this checklist:

- [ ] Keyboard navigable; visible focus rings
- [ ] Responsive: mobile-first, no horizontal overflow
- [ ] Images sized; meaningful `alt` text
- [ ] No unnecessary `"use client"` or `useEffect`
- [ ] Minimal diff — no unrelated changes

## Component Template

```tsx
import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className="w-full px-4 py-16 md:px-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
```

## Anti-Patterns to Flag

| Issue | Fix |
|-------|-----|
| `div` with `onClick` | Use `<button>` or `<a>` |
| Client fetch for SSR data | Fetch in server component |
| Index keys on dynamic lists | Stable unique `id` |
| Magic color hex in JSX | CSS variable / `@theme` token |
| Giant monolithic page | Extract sections + shared UI |

## Additional Resources

- Project rules: `.cursor/rules/react-components.mdc`, `tailwind-styling.mdc`
- Next.js specifics: use the `nextjs-16` skill
- Detailed patterns: [reference.md](reference.md)
