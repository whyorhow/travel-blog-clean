// CookieConsent.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("cookiesAccepted");
      const rejected = localStorage.getItem("cookiesRejected");
      if (!accepted && !rejected) {
        const delay = window.innerWidth < 768 ? 500 : 0; // slight delay for mobile
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
      localStorage.removeItem("cookiesRejected");
    } catch {}
    fadeOut();
  };

  const handleReject = () => {
    try {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
    } catch {}
    fadeOut();
  };

  const fadeOut = () => {
    setFade(true);
    setTimeout(() => setVisible(false), 300);
  };

  // Hide popup and go to the preferences page (passing current path)
  const handleLearnMore = () => {
    fadeOut();
    setTimeout(() => {
      navigate("/cookie-preferences", { state: { from: location.pathname } });
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4 z-[2000] 
      transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100 animate-slideBounce"}`}
    >
      <p className="text-gray-900 text-center md:text-left flex-1 text-sm md:text-base leading-snug">
        We use cookies to improve your experience which may include links to recommended sites.
      </p>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={handleAccept}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 hover:shadow-lg transition-all duration-200 text-sm md:text-base"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 hover:shadow-lg transition-all duration-200 text-sm md:text-base"
        >
          Reject
        </button>
        <button
          onClick={handleLearnMore}
          className="underline text-blue-600 hover:text-blue-500 text-sm md:text-base"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
