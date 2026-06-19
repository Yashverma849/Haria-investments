"use client";

import { useEffect } from "react";
import { useSiteLoaderReady } from "@/components/site-loader-provider";

export function useGsapAfterLoader(
  setup: () => void | (() => void),
  deps: ReadonlyArray<unknown> = [],
) {
  const isSiteLoaderReady = useSiteLoaderReady();

  useEffect(() => {
    if (!isSiteLoaderReady) return;
    return setup() ?? undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup deps passed explicitly
  }, [isSiteLoaderReady, ...deps]);
}
