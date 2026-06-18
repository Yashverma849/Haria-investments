"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
