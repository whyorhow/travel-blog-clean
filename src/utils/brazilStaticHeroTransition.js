/**
 * Crossfade on the static /brazil hero (mobile).
 * Backup overlays on top (primary stays painted for LCP). Runs after window.load
 * + delayMs so Lighthouse can finalize on the primary <img> first.
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
  let backupLayer;
  let preloader;

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

  const schedule = () => {
    delayTimer = window.setTimeout(runTransition, delayMs);
  };

  waitForPageLoad(schedule);

  return () => {
    if (delayTimer) window.clearTimeout(delayTimer);
    preloader = undefined;
    backupLayer?.remove();
  };
}
