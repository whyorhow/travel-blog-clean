import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { NarrativeProvider } from "./context/NarrativeContext";

import {
  trackPageView,
  grantAnalyticsConsent,
  denyAnalyticsConsent,
  scheduleAnalyticsLoad,
  loadAnalyticsScript,
} from "./utils/analytics";
import { routes } from "./config/routes";

import Nav from "./components/Nav";
import VisualHeader from "./components/VisualHeader";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import RouteLoadingFallback from "./components/RouteLoadingFallback";
import PageTransition from "./components/navigation/PageTransition";
import { useRoutePrefetch } from "./hooks/useRoutePrefetch";
import { HOME_FOOTER_SPACER_CLASS } from "./config/homeHeroSlots";
import { loadDeferredFonts } from "./loadDeferredFonts";

function PageViewTracker({ cookiesAccepted }) {
  const location = useLocation();
  useEffect(() => {
    if (cookiesAccepted) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, cookiesAccepted]);
  return null;
}

function MainContent({ cookiesAccepted, handleConsentChange }) {
  useRoutePrefetch();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isDesktopHome =
    isHome &&
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;
  const [showFooter, setShowFooter] = useState(!isHome || isDesktopHome);

  useEffect(() => {
    if (!isHome) {
      setShowFooter(true);
      return undefined;
    }
    if (window.matchMedia("(min-width: 768px)").matches) {
      setShowFooter(true);
      return undefined;
    }
    const reveal = () => setShowFooter(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(reveal, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(reveal, 1500);
    return () => window.clearTimeout(timer);
  }, [isHome]);
  const isGallery = location.pathname === "/nomads-gallery";
  const isSearch = location.pathname === "/search";
  const paperStyle =
    !isHome && !isGallery && !isSearch
      ? {
          backgroundColor: "#f5f0e8",
          backgroundImage: `url(${require("./assets/Backgrounds/PaperTexture.jpg")})`,
          backgroundBlendMode: "multiply",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
        }
      : {};

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isHome ? "bg-homeEarth text-darkText" : "text-darkText"
      }`}
      style={paperStyle}
    >
      <PageViewTracker cookiesAccepted={cookiesAccepted} />
      <Nav />
      {!isHome && <VisualHeader />}

      <div
        className={`flex-grow ${!isHome ? "pt-12" : ""}`}
      >
        <Suspense fallback={<RouteLoadingFallback />}>
          <PageTransition>
            <Routes location={location}>
              {routes.map((route, index) => {
                if (route.isCookieRoute) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={React.cloneElement(route.element, {
                        cookiesAccepted,
                        onConsentChange: handleConsentChange,
                      })}
                    />
                  );
                }

                return <Route key={index} path={route.path} element={route.element} />;
              })}
            </Routes>
          </PageTransition>
        </Suspense>
      </div>

      {cookiesAccepted === null && location.pathname !== "/cookie-preferences" && (
        <CookieConsent
          onAccept={() => handleConsentChange(true)}
          onReject={() => handleConsentChange(false)}
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

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      return undefined;
    }
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
      <NarrativeProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <MainContent
            cookiesAccepted={cookiesAccepted}
            handleConsentChange={handleConsentChange}
          />
        </Router>
      </NarrativeProvider>
    </HelmetProvider>
  );
}

export default App;
