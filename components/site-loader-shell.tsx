"use client";

import type { ReactNode } from "react";
import HashScroll from "@/components/hash-scroll";
import { SiteLoaderProvider } from "@/components/site-loader-provider";

export default function SiteLoaderShell({ children }: { children: ReactNode }) {
  return (
    <SiteLoaderProvider>
      <HashScroll />
      {children}
    </SiteLoaderProvider>
  );
}
