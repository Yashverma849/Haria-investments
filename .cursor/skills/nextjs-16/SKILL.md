---
name: nextjs-16
description: Develop features using Next.js 16 App Router APIs and conventions for this project. Use when adding routes, layouts, server actions, caching, metadata, images, fonts, or any Next.js-specific implementation.
---

# Next.js 16 Development

## Critical Rule

**Do not rely on training-data Next.js knowledge.** This project runs Next.js 16 with breaking changes. Before implementing:

1. Search `node_modules/next/dist/docs/01-app/` for the relevant topic
2. Read the matching `.md` guide
3. Heed deprecation notices in `AGENTS.md`

## Common Tasks

### New Page

```
app/about/page.tsx    → /about
app/blog/[slug]/page.tsx → /blog/:slug
```

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Haria Investments",
  description: "...",
};

export default function AboutPage() {
  return <main>...</main>;
}
```

### Client Component

Only when required:

```tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  // ...
}
```

### Dynamic Import (heavy client UI)

```tsx
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  loading: () => <div className="aspect-video animate-pulse bg-zinc-200" />,
});
```

### Images

```tsx
import Image from "next/image";

<Image
  src="/logo.png"
  alt="Haria Investments"
  width={200}
  height={60}
  priority // only above the fold
/>
```

### Fonts (existing pattern)

```tsx
import { Geist } from "next/font/google";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
```

## Caching & Data

- Prefer fetching in Server Components at the page/layout level
- For cache behavior, read the current `fetch` / `"use cache"` docs in `node_modules/next/dist/docs/` — APIs change between versions
- Never import `fs`, database clients, or secrets into `"use client"` files

## Config

- `next.config.ts` — type with `NextConfig`
- Run `npm run build` to validate after routing or config changes

## Docs Index

| Topic | Path under `node_modules/next/dist/docs/01-app/` |
|-------|---------------------------------------------------|
| Routing | `01-building-your-application/01-routing/` |
| Data fetching | `01-building-your-application/03-data-fetching/` |
| Metadata | `03-api-reference/04-functions/generate-metadata.md` |
| Upgrading to 16 | `02-guides/upgrading/version-16.md` |
