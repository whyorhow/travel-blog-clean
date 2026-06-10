/**
 * LCP-safe crossfade on the static /brazil hero (mobile).
 * Waits until LCP is recorded, then loads the backup frame after delayMs.
 * Backup is same size, fetchpriority low — must not become a new LCP candidate.
 */
function waitForLcp(callback) {
  if (typeof window === 'undefined') return;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    callback();
  };

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        if (list.getEntries().length > 0) {
          observer.disconnect();
          finish();
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      window.addEventListener('load', () => window.setTimeout(finish, 200), { once: true });
      return;
    } catch {
      // fall through
    }
  }

  if (document.readyState === 'complete') {
    window.setTimeout(finish, 200);
  } else {
    window.addEventListener('load', () => window.setTimeout(finish, 200), { once: true });
  }
}

export function initBrazilStaticHeroTransition(backupSrc, delayMs = 4000) {
  const container = document.getElementById('brazil-static-hero');
  const frame = container?.querySelector('.brazil-static-hero-frame');
  if (!frame || !backupSrc) return undefined;

  let delayTimer;
  let backupImg;

  const runTransition = () => {
    delayTimer = window.setTimeout(() => {
      backupImg = document.createElement('img');
      backupImg.src = backupSrc;
      backupImg.alt = '';
      backupImg.width = 600;
      backupImg.height = 450;
      backupImg.decoding = 'async';
      backupImg.fetchPriority = 'low';
      backupImg.loading = 'lazy';
      backupImg.className = 'brazil-static-hero-backup';
      backupImg.onload = () => {
        requestAnimationFrame(() => backupImg.classList.add('is-visible'));
      };
      frame.appendChild(backupImg);
    }, delayMs);
  };

  waitForLcp(runTransition);

  return () => {
    if (delayTimer) window.clearTimeout(delayTimer);
    backupImg?.remove();
  };
}
