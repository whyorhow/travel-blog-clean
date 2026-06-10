import { useEffect } from 'react';
import { loadDeferredFonts } from '../loadDeferredFonts';

/** Defer React page chunk until after static hero LCP window (not scroll-triggered). */
export const STATIC_HERO_PAGE_CHUNK_DELAY_MS = 6000;

/** Handwriting / extra weights — after PSI LCP window (web-font swap was LCP at ~7s). */
export const STATIC_HERO_FONT_DELAY_MS = 12000;

/** Below-fold reveal: scroll delta from mount position + minimum dwell. */
export const STATIC_HERO_BELOW_FOLD_SCROLL_DELTA = 160;
export const STATIC_HERO_BELOW_FOLD_MIN_DWELL_MS = 8000;
export const STATIC_HERO_BELOW_FOLD_FALLBACK_MS = 60000;

/**
 * Load page chunk on a timer when static HTML hero is LCP.
 * Scroll-triggered load caused PSI to mount React while already scrolled,
 * then journal map / gallery images replaced the hero as LCP (~24s).
 */
export function useStaticHeroPageChunkLoader(staticHeroActive, importPage, setPage) {
  useEffect(() => {
    if (!staticHeroActive) {
      importPage().then(({ default: Page }) => setPage(() => Page));
      return undefined;
    }
    let cancelled = false;
    let loaded = false;
    const load = () => {
      if (loaded || cancelled) return;
      loaded = true;
      importPage().then(({ default: Page }) => {
        if (!cancelled) setPage(() => Page);
      });
    };
    const timer = window.setTimeout(load, STATIC_HERO_PAGE_CHUNK_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [staticHeroActive, importPage, setPage]);
}

/** Keep static hero as LCP until deliberate scroll from mount position. */
export function useStaticHeroBelowFoldGate(deferBelowFold, setDeferBelowFold) {
  useEffect(() => {
    if (!deferBelowFold) return undefined;
    const mountAt = performance.now();
    const mountScrollY = window.scrollY;
    const reveal = () => setDeferBelowFold(false);
    const onScroll = () => {
      if (performance.now() - mountAt < STATIC_HERO_BELOW_FOLD_MIN_DWELL_MS) return;
      if (window.scrollY >= mountScrollY + STATIC_HERO_BELOW_FOLD_SCROLL_DELTA) {
        reveal();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = window.setTimeout(reveal, STATIC_HERO_BELOW_FOLD_FALLBACK_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(fallback);
    };
  }, [deferBelowFold, setDeferBelowFold]);
}

/** Defer handwriting fonts so late swap does not steal static-hero LCP. */
export function useStaticHeroDeferredFonts(staticHeroActive) {
  useEffect(() => {
    const loadFonts = () => loadDeferredFonts();
    if (!staticHeroActive) {
      if (typeof window.requestIdleCallback === 'function') {
        const id = window.requestIdleCallback(loadFonts, { timeout: 5000 });
        return () => window.cancelIdleCallback(id);
      }
      const timer = window.setTimeout(loadFonts, 2500);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(loadFonts, STATIC_HERO_FONT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [staticHeroActive]);
}
