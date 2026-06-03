// src/utils/analytics.js

const GA_ID = 'G-87DFFWTXFM';

export function grantAnalyticsConsent() {
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
