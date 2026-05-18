import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { NarrativeProvider } from "./context/NarrativeContext";

import { trackPageView } from "./utils/analytics";
import { routes } from "./config/routes";

import Nav from "./components/Nav";
import VisualHeader from "./components/VisualHeader";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

function PageViewTracker({ cookiesAccepted }) {
  const location = useLocation();
  useEffect(() => {
    if (cookiesAccepted) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, cookiesAccepted]);
  return null;
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function MainContent({ cookiesAccepted, handleConsentChange }) {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isGallery = location.pathname === "/nomads-gallery";
  const paperStyle =
    !isHome && !isGallery
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

      <div className={`flex-grow ${!isHome ? "pt-12" : ""}`}>
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-goldAccent border-t-transparent rounded-full animate-spin" />
              <p className="font-cormorant italic text-goldAccent text-xl animate-pulse tracking-widest">
                Loading...
              </p>
            </div>
          }
        >
          <Routes>
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
    if (accepted) setCookiesAccepted(true);
    else if (rejected) setCookiesAccepted(false);
  }, []);

  const handleConsentChange = (choice) => {
    setCookiesAccepted(choice);
    if (choice === true) {
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.removeItem("cookiesRejected");
    } else if (choice === false) {
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
    } else {
      localStorage.setItem("cookiesAccepted", "partial");
      localStorage.removeItem("cookiesRejected");
    }
  };

  return (
    <HelmetProvider>
      <NarrativeProvider>
        <Router>
          <ScrollToTop />
          {cookiesAccepted && (
            <Helmet>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-87DFFWTXFM" />
              <script>
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-87DFFWTXFM');
                `}
              </script>
            </Helmet>
          )}

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
