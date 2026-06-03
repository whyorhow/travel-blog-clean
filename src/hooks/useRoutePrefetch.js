import { useEffect } from "react";
import { IDLE_PREFETCH_PATHS, prefetchRoute } from "../config/pageChunks";

/**
 * Prefetch route chunks on internal link hover; warm high-traffic routes when idle.
 */
export function useRoutePrefetch() {
  useEffect(() => {
    const onMouseOver = (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      prefetchRoute(href);
    };

    document.addEventListener("mouseover", onMouseOver, { passive: true });

    const warmIdleRoutes = () => {
      IDLE_PREFETCH_PATHS.forEach((path) => prefetchRoute(path));
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warmIdleRoutes, { timeout: 4000 });
      return () => {
        document.removeEventListener("mouseover", onMouseOver);
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(warmIdleRoutes, 2500);
    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      window.clearTimeout(timer);
    };
  }, []);
}
