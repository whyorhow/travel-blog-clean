import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { NarrativeProvider } from "./context/NarrativeContext";

// --- Pages ---
import HomeNew from "./pages/HomeNew";
import Adventures from "./pages/Adventures";
import NomadsShop from "./pages/NomadsShop";
import NomadsShopBrazil from "./pages/NomadsShopBrazil";
import NomadsShopSaoPaulo from "./pages/NomadsShopSaoPaulo";
import NomadsShopCategory from "./pages/NomadsShopCategory";
import Brazil from "./pages/Brazil";
import SaoPaulo from "./pages/SaoPaulo";
import CarnivalSaoPaulo from "./pages/CarnivalSaoPaulo";
import Graffiti from "./pages/Graffiti";
import Santos from "./pages/Santos";
import GreenSpaces from "./pages/GreenSpaces";
import ArtGalleries from "./pages/ArtGalleries";
import Pantanal from "./pages/Pantanal";
import Rio from "./pages/Rio";
import Salvador from "./pages/Salvador";
import NomadsGallery from "./pages/NomadsGallery";
import ContactUs from "./pages/ContactUs";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import CookiePreferences from "./pages/CookiePreferences";
import Florianopolis from "./pages/Florianopolis";
import Iguazu from "./pages/Iguazu";
import Bonito from "./pages/Bonito";
import Manaus from "./pages/Manaus";
import IlhaGrande from "./pages/IlhaGrande";
import Tennessee from "./pages/Tennessee";
import Nashville from "./pages/Nashville";
import Memphis from "./pages/Memphis";
import UnitedStates from "./pages/UnitedStates";
import Mountains from "./pages/Mountains";
import Belgium from "./pages/Belgium";
import Antwerp from "./pages/Antwerp";
import Greece from "./pages/Greece";
import Athens from "./pages/Athens";
import Hungary from "./pages/Hungary";
import Budapest from "./pages/Budapest";

// --- Components ---
import Nav from "./components/Nav";
import VisualHeader from "./components/VisualHeader";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import CookieConsent from "./components/CookieConsent";

// --- Utilities ---
import { trackEvent, trackPageView } from "./utils/analytics";


// Page view tracker
function PageViewTracker({ cookiesAccepted }) {
  const location = useLocation();
  useEffect(() => {
    if (cookiesAccepted) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, cookiesAccepted]);
  return null;
}

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function MainContent({
  openLightbox,
  cookiesAccepted,
  handleConsentChange,
  lightboxImages,
  lightboxIndex,
  setLightboxIndex
}) {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isGallery = location.pathname === "/nomads-gallery";
  const paperStyle = !isHome && !isGallery ? {
    backgroundColor: '#f5f0e8',
    backgroundImage: `url(${require('./assets/Backgrounds/PaperTexture.jpg')})`,
    backgroundBlendMode: 'multiply',
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed',
  } : {};

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${isHome ? 'bg-main-gradient text-darkText' : 'text-darkText'}`}
      style={paperStyle}
    >
      <PageViewTracker cookiesAccepted={cookiesAccepted} />
      <Nav />
      {!isHome && <VisualHeader />}

      <div className={`flex-grow ${!isHome ? "pt-12" : ""}`}>
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/adventures" element={<Adventures openLightbox={openLightbox} />} />
          <Route path="/nomadsshop" element={<NomadsShop />} />
          <Route path="/nomads-shop" element={<NomadsShop />} />
          <Route path="/nomads-shop/brazil" element={<NomadsShopBrazil />} />
          <Route path="/nomads-shop/brazil/saopaulo" element={<NomadsShopSaoPaulo openLightbox={openLightbox} />} />
          <Route path="/nomads-shop/brazil/:city" element={<NomadsShopCategory openLightbox={openLightbox} />} />
          <Route path="/brazil" element={<Brazil openLightbox={openLightbox} />} />
          <Route path="/brazil/rio" element={<Rio openLightbox={openLightbox} />} />
          <Route path="/brazil/salvador" element={<Salvador openLightbox={openLightbox} />} />
          <Route path="/brazil/pantanal" element={<Pantanal openLightbox={openLightbox} />} />
          <Route path="/brazil/foz" element={<Iguazu openLightbox={openLightbox} />} />
          <Route path="/brazil/manaus" element={<Manaus openLightbox={openLightbox} />} />
          <Route path="/brazil/ilha-grande" element={<IlhaGrande openLightbox={openLightbox} />} />

          <Route path="/brazil/saopaulo" element={<SaoPaulo openLightbox={openLightbox} />} />
          <Route path="/brazil/saopaulo/green-spaces" element={<GreenSpaces openLightbox={openLightbox} />} />
          <Route path="/brazil/saopaulo/art-galleries" element={<ArtGalleries openLightbox={openLightbox} />} />
          <Route path="/brazil/saopaulo/carnival" element={<CarnivalSaoPaulo openLightbox={openLightbox} />} />
          <Route path="/brazil/saopaulo/murals" element={<Graffiti openLightbox={openLightbox} />} />
          <Route path="/brazil/saopaulo/street-murals" element={<Graffiti openLightbox={openLightbox} />} />
          <Route path="/brazil/santos" element={<Santos openLightbox={openLightbox} />} />
          <Route path="/brazil/florianopolis" element={<Florianopolis openLightbox={openLightbox} />} />
          <Route path="/brazil/bonito" element={<Bonito openLightbox={openLightbox} />} />
          <Route path="/belgium" element={<Belgium openLightbox={openLightbox} />} />
          <Route path="/belgium/antwerp" element={<Antwerp openLightbox={openLightbox} />} />
          <Route path="/greece" element={<Greece openLightbox={openLightbox} />} />
          <Route path="/greece/athens" element={<Athens openLightbox={openLightbox} />} />
          <Route path="/hungary" element={<Hungary openLightbox={openLightbox} />} />
          <Route path="/hungary/budapest" element={<Budapest openLightbox={openLightbox} />} />
          <Route path="/united-states" element={<UnitedStates openLightbox={openLightbox} />} />
          <Route path="/united-states/tennessee" element={<Tennessee openLightbox={openLightbox} />} />
          <Route path="/united-states/tennessee/mountains" element={<Mountains openLightbox={openLightbox} />} />
          <Route path="/united-states/tennessee/memphis" element={<Memphis openLightbox={openLightbox} />} />
          <Route path="/united-states/tennessee/nashville" element={<Nashville openLightbox={openLightbox} />} />
          <Route path="/nomads-gallery" element={<NomadsGallery openLightbox={openLightbox} />} />
          <Route path="/contact-us" element={<ContactUs openLightbox={openLightbox} />} />
          <Route path="/search" element={<SearchResults openLightbox={openLightbox} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/cookie-preferences"
            element={
              <CookiePreferences
                cookiesAccepted={cookiesAccepted}
                onConsentChange={handleConsentChange}
              />
            }
          />
        </Routes>
      </div>

      {/* Cookie Consent Popup */}
      {cookiesAccepted === null && location.pathname !== "/cookie-preferences" && (
        <CookieConsent
          onAccept={() => handleConsentChange(true)}
          onReject={() => handleConsentChange(false)}
        />
      )}

      <Footer cookiesAccepted={cookiesAccepted} />
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxAlts, setLightboxAlts] = useState([]);
  const [lightboxPurchaseLinks, setLightboxPurchaseLinks] = useState([]);
  const [cookiesAccepted, setCookiesAccepted] = useState(null);

  // Load stored consent
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

  const openLightbox = (index, images, alts = [], purchaseLinks = []) => {
    setLightboxImages(images);
    setLightboxAlts(alts);
    setLightboxPurchaseLinks(purchaseLinks);
    setLightboxIndex(index);

    if (cookiesAccepted) {
      trackEvent('open_lightbox', 'Engagement', images[index] || 'Unknown image');
    }
  };

  return (
    <HelmetProvider>
      <NarrativeProvider>
        <Router>
          <ScrollToTop />
          {/* GA script */}
          {cookiesAccepted && (
            <Helmet>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-87DFFWTXFM"></script>
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
            openLightbox={openLightbox}
            cookiesAccepted={cookiesAccepted}
            handleConsentChange={handleConsentChange}
            lightboxImages={lightboxImages}
            lightboxIndex={lightboxIndex}
            setLightboxIndex={setLightboxIndex}
          />
        </Router>
      </NarrativeProvider>
    </HelmetProvider>
  );
}

export default App;