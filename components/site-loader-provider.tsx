"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SiteLoaderContextValue = {
  isReady: boolean;
  markReady: () => void;
};

const SiteLoaderContext = createContext<SiteLoaderContextValue | null>(null);

export function SiteLoaderProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const value = useMemo(
    () => ({
      isReady,
      markReady: () => setIsReady(true),
    }),
    [isReady],
  );

  return (
    <SiteLoaderContext.Provider value={value}>
      {children}
    </SiteLoaderContext.Provider>
  );
}

export function useSiteLoaderReady() {
  const context = useContext(SiteLoaderContext);
  if (!context) {
    throw new Error("useSiteLoaderReady must be used within SiteLoaderProvider");
  }
  return context.isReady;
}

export function useSiteLoaderComplete() {
  const context = useContext(SiteLoaderContext);
  if (!context) {
    throw new Error(
      "useSiteLoaderComplete must be used within SiteLoaderProvider",
    );
  }
  return context.markReady;
}
