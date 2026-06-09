import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import HomeNew from "./pages/HomeNew";
import RouteLoadingFallback from "./components/RouteLoadingFallback";
import { HOME_FOOTER_SPACER_CLASS } from "./config/homeHeroSlots";
import { loadDeferredFonts } from "./loadDeferredFonts";
import {
  grantAnalyticsConsent,
  denyAnalyticsConsent,
  scheduleAnalyticsLoad,
  loadAnalyticsScript,
} from "./utils/analytics";

function UpgradeOnLeave({ onUpgrade }) {
  const location = useLocation();
  useEffect(() => {
    onUpgrade(location);
  }, [location, onUpgrade]);
  return null;
}

function MobileHomeLayout({ cookiesAccepted, onConsentChange, showFooter }) {
  return (
    <div className="min-h-screen flex flex-col bg-homeEarth text-darkText">
      <Nav />
      <div className="flex-grow">
        <HomeNew />
      </div>
      {cookiesAccepted === null && (
        <CookieConsent
          onAccept={() => onConsentChange(true)}
          onReject={() => onConsentChange(false)}
        />
      )}
      {showFooter ? (
        <Footer cookiesAccepted={cookiesAccepted} />
      ) : (
        <div className={HOME_FOOTER_SPACER_CLASS} aria-hidden="true" />
      )}
    </div>
  );
}

/**
 * Lightweight mobile homepage entry — skips PageTransition, NarrativeProvider,
 * and the full routes table so main.js parses faster on Slow 4G.
 */
export default function MobileShellApp({ root }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  const [showFooter, setShowFooter] = useState(false);

  const upgradeToFullApp = useCallback(
    (location) => {
      import("./App").then(({ default: App }) => {
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        if (location && location.pathname !== "/" && location.pathname !== "/home") {
          window.history.replaceState(
            null,
            "",
            location.pathname + location.search + location.hash
          );
        }
      });
    },
    [root]
  );

  useEffect(() => {
    const loadFonts = () => loadDeferredFonts();
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(loadFonts, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(loadFonts, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reveal = () => setShowFooter(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(reveal, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(reveal, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted") === "true";
    const rejected = localStorage.getItem("cookiesRejected") === "true";
    if (accepted) {
      setCookiesAccepted(true);
      scheduleAnalyticsLoad().then(() => grantAnalyticsConsent());
    } else if (rejected) {
      setCookiesAccepted(false);
    }
  }, []);

  useEffect(() => {
    const idleUpgrade = () => upgradeToFullApp(null);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(idleUpgrade, { timeout: 6000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(idleUpgrade, 5000);
    return () => window.clearTimeout(timer);
  }, [upgradeToFullApp]);

  const handleConsentChange = (choice) => {
    setCookiesAccepted(choice);
    if (choice === true) {
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.removeItem("cookiesRejected");
      loadAnalyticsScript().then(() => grantAnalyticsConsent());
    } else if (choice === false) {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
      denyAnalyticsConsent();
    } else {
      localStorage.setItem("cookiesAccepted", "partial");
      localStorage.removeItem("cookiesRejected");
      denyAnalyticsConsent();
    }
  };

  return (
    <HelmetProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <MobileHomeLayout
                cookiesAccepted={cookiesAccepted}
                onConsentChange={handleConsentChange}
                showFooter={showFooter}
              />
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="*"
            element={
              <>
                <RouteLoadingFallback />
                <UpgradeOnLeave onUpgrade={upgradeToFullApp} />
              </>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
