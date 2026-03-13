// src/utils/analytics.js

// Track a custom event in Google Analytics
export function trackEvent(action, category, label = '', value = '') {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log(`📊 GA event: ${action} (${category}) - ${label}`);
  }
}

// Track a page view manually (optional, mostly handled by App.js)
export function trackPageView(path) {
  if (window.gtag) {
    window.gtag('config', 'G-87DFFWTXFM', {
      page_path: path,
    });
    console.log(`📄 GA pageview: ${path}`);
  }
}
