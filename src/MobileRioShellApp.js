import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import VisualHeader from "./components/VisualHeader";
import RouteLoadingFallback from "./components/RouteLoadingFallback";
import { NarrativeProvider } from "./context/NarrativeContext";
import { loadDeferredFonts } from "./loadDeferredFonts";
import { hasRioStaticHero } from "./utils/staticPageHero";
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

/**
 * Mobile /brazil/rio only — static HTML hero (outside #root) is LCP;
 * LightTemplate skips React hero and scroll-gates below-fold content.
 */
export default function MobileRioShellApp({ root }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  const [RioPage, setRioPage] = useState(null);
  const staticHero = hasRioStaticHero();

  useEffect(() => {
    if (!staticHero) {
      import("./pages/Rio").then(({ default: Page }) => setRioPage(() => Page));
      return undefined;
    }
    let cancelled = false;
    const loadPage = () => {
      import("./pages/Rio").then(({ default: Page }) => {
        if (!cancelled) setRioPage(() => Page);
      });
    };
    const onScroll = () => {
      if (window.scrollY > 80) loadPage();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const fallback = window.setTimeout(loadPage, 30000);
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(fallback);
    };
  }, [staticHero]);

  const upgradeToFullApp = useCallback(
    (location) => {
      import("./App").then(({ default: App }) => {
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        if (location && location.pathname !== "/brazil/rio") {
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
    const accepted = localStorage.getItem("cookiesAccepted") === "true";
    const rejected = localStorage.getItem("cookiesRejected") === "true";
    if (accepted) {
      setCookiesAccepted(true);
      scheduleAnalyticsLoad().then(() => grantAnalyticsConsent());
    } else if (rejected) {
      setCookiesAccepted(false);
    }
  }, []);

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
        <div className="min-h-screen flex flex-col">
          <Nav />
          <VisualHeader />
          <main id="main-content" className="flex-grow">
            <NarrativeProvider>
              {RioPage ? <RioPage /> : null}
            </NarrativeProvider>
          </main>
          {cookiesAccepted === null && (
            <CookieConsent
              onAccept={() => handleConsentChange(true)}
              onReject={() => handleConsentChange(false)}
            />
          )}
          <Footer cookiesAccepted={cookiesAccepted} />
        </div>
        <Routes>
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
