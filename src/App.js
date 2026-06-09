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
        isHome ? "bg-main-gradient text-darkText" : "text-darkText"
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

      <Footer cookiesAccepted={cookiesAccepted} />
    </div>
  );
}

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);

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
