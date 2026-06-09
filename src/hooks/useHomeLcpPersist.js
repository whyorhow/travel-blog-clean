import { useState, useEffect } from "react";

/** Mobile-only: keep #home-lcp-persist visible until scroll so LCP stays on the HTML logo */
export function useHomeLcpPersist() {
  const [persistHidden, setPersistHidden] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return undefined;

    const hide = () => {
      document.getElementById("home-lcp-persist")?.classList.add("is-hidden");
      setPersistHidden(true);
    };

    const onScroll = () => {
      if (window.scrollY > 48) hide();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const fallback = window.setTimeout(hide, 30000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(fallback);
    };
  }, []);

  return persistHidden;
}
