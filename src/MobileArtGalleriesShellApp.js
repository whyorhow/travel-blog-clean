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
import { hasArtGalleriesStaticHero } from "./utils/staticPageHero";
import {
  useStaticHeroPageChunkLoader,
  useStaticHeroDeferredFonts,
} from "./utils/staticHeroScrollGate";
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

/** Mobile /brazil/saopaulo/galleries — static HTML hero is LCP. */
export default function MobileArtGalleriesShellApp({ root }) {
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  const [PageComponent, setPageComponent] = useState(null);
  const staticHero = hasArtGalleriesStaticHero();
  const importPage = useCallback(() => import("./pages/ArtGalleries"), []);
  useStaticHeroPageChunkLoader(staticHero, importPage, setPageComponent, 10000);
  useStaticHeroDeferredFonts(staticHero);

  const upgradeToFullApp = useCallback(
    (location) => {
      import("./App").then(({ default: App }) => {
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        if (location && location.pathname !== "/brazil/saopaulo/galleries") {
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
              {PageComponent ? <PageComponent /> : null}
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
