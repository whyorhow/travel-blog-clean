import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CookieConsent({ onAccept, onReject }) {
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("cookiesAccepted");
      const rejected = localStorage.getItem("cookiesRejected");
      if (!accepted && !rejected) {
        const delay = window.innerWidth < 768 ? 500 : 0;
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.setItem("cookiesNonEssential", "true");
      localStorage.removeItem("cookiesRejected");
    } catch {}
    onAccept?.();
    fadeOut();
  };

  const handleReject = () => {
    try {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.setItem("cookiesNonEssential", "false");
      localStorage.removeItem("cookiesAccepted");
    } catch {}
    onReject?.();
    fadeOut();
  };

  const fadeOut = () => {
    setFade(true);
    setTimeout(() => setVisible(false), 300);
  };

  const handleLearnMore = () => {
    fadeOut();
    setTimeout(() => {
      navigate("/cookie-preferences", { state: { from: location.pathname } });
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[2000] flex justify-center px-4 pb-4 sm:pb-6 pointer-events-none"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div
        className={`pointer-events-auto w-full max-w-2xl rounded-2xl border border-warmGold/30 bg-stone-950/92 backdrop-blur-md shadow-panel-deep px-5 py-5 sm:px-7 sm:py-6 transition-all duration-300 ease-out ${
          fade ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        <p
          id="cookie-consent-title"
          className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-warmGold font-semibold text-center sm:text-left"
        >
          Cookies &amp; privacy
        </p>
        <p
          id="cookie-consent-desc"
          className="mt-2 font-cormorant text-cream/90 text-base sm:text-lg leading-snug text-center sm:text-left"
        >
          We use cookies to understand how the site is used and to support recommended links. You can
          accept, reject, or choose in detail.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center sm:justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleReject}
            className="order-2 sm:order-1 rounded-full border border-cream/25 bg-transparent px-5 py-2.5 text-sm font-cormorant text-cream/90 transition-colors duration-200 hover:border-cream/40 hover:bg-white/5"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={handleLearnMore}
            className="order-3 sm:order-2 rounded-full px-4 py-2.5 text-sm font-cormorant italic text-warmGold underline-offset-2 transition-colors duration-200 hover:text-galleryGold"
          >
            Choose in detail
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="order-1 sm:order-3 rounded-full border border-warmGold/50 bg-warmGold px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-warmTaupe shadow-md transition-all duration-200 hover:bg-galleryGold hover:border-warmGold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
