"use client";

import type { ReactNode } from "react";
import Footer from "@/components/footer";
import HashScroll from "@/components/hash-scroll";
import Navbar from "@/components/navbar";
import ScrollSmootherShell from "@/components/scroll-smoother-shell";
import SiteLoader from "@/components/site-loader";
import { SiteLoaderProvider } from "@/components/site-loader-provider";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function SiteLoaderShell({ children }: { children: ReactNode }) {
  return (
    <SiteLoaderProvider>
      <HashScroll />
      <SiteLoader />
      <Navbar />
      <ScrollSmootherShell>
        {children}
        <Footer />
      </ScrollSmootherShell>
      <WhatsAppFloat />
    </SiteLoaderProvider>
  );
}
