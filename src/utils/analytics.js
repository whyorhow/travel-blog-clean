// src/utils/analytics.js

const GA_ID = 'G-87DFFWTXFM';

let analyticsLoadPromise = null;

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

/** Load gtag.js only when analytics is needed (consent granted). */
export function loadAnalyticsScript() {
  if (analyticsLoadPromise) return analyticsLoadPromise;

  analyticsLoadPromise = new Promise((resolve) => {
    ensureGtagStub();
    window.gtag('js', new Date());
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.onload = () => {
      window.gtag('config', GA_ID, { send_page_view: false });
      resolve();
    };
    document.head.appendChild(script);
  });

  return analyticsLoadPromise;
}

/** Defer analytics for returning visitors who already consented. */
export function scheduleAnalyticsLoad() {
  return new Promise((resolve) => {
    const run = () => loadAnalyticsScript().then(resolve);
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: 3000 });
    } else {
      window.setTimeout(run, 2000);
    }
  });
}

export async function grantAnalyticsConsent() {
  await loadAnalyticsScript();
  if (!window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function denyAnalyticsConsent() {
  if (!window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function trackEvent(action, category, label = '', value = '') {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackPageView(path) {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      send_to: GA_ID,
    });
  }
}
