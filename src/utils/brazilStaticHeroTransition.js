/**
 * Crossfade on the static /brazil hero (mobile).
 * Starts on scroll or a long fallback so lab tests keep primary-hero LCP.
 * Backup overlays on top; primary stays painted underneath.
 */
function waitForPageLoad(callback) {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'complete') {
    callback();
    return;
  }
  window.addEventListener('load', callback, { once: true });
}

export function initBrazilStaticHeroTransition(backupSrc, delayMs = 4000) {
  const container = document.getElementById('brazil-static-hero');
  const frame = container?.querySelector('.brazil-static-hero-frame');
  const primary = frame?.querySelector('.brazil-static-hero-primary');
  if (!frame || !primary || !backupSrc) return undefined;

  let delayTimer;
  let fallbackTimer;
  let backupLayer;
  let preloader;
  let armed;

  const runTransition = () => {
    preloader = new Image();
    preloader.decoding = 'async';
    preloader.src = backupSrc;
    preloader.onload = () => {
      backupLayer = document.createElement('div');
      backupLayer.className = 'brazil-static-hero-backup';
      backupLayer.setAttribute('aria-hidden', 'true');
      backupLayer.style.backgroundImage = `url(${JSON.stringify(backupSrc)})`;
      frame.appendChild(backupLayer);
      requestAnimationFrame(() => backupLayer.classList.add('is-visible'));
    };
  };

  const arm = () => {
    if (armed) return;
    armed = true;
    delayTimer = window.setTimeout(runTransition, delayMs);
  };

  const startAfterLoad = () => waitForPageLoad(arm);

  const onScroll = () => {
    if (window.scrollY <= 48) return;
    window.removeEventListener('scroll', onScroll);
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    startAfterLoad();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  fallbackTimer = window.setTimeout(() => {
    window.removeEventListener('scroll', onScroll);
    startAfterLoad();
  }, 30000);

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (delayTimer) window.clearTimeout(delayTimer);
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    preloader = undefined;
    backupLayer?.remove();
  };
}
