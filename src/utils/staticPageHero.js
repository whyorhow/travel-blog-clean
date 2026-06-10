/** True when build injected a static hero above #root (mobile LCP). */
export function hasBrazilStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('brazil-static-hero');
}

export function hasSaoPauloStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('saopaulo-static-hero');
}

export function hasFlorianopolisStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('florianopolis-static-hero');
}

export function hasRioStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('rio-static-hero');
}

export function isMobileViewport() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
  );
}
