import React, { useRef, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../utils/analytics"; // FIX: .. to go up
import { cloudinaryImageUrl, getPublicIdFromLegacyPath, cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

// FIX: .. to go up to assets
import LeftArrow from "../assets/images/lftarrow.svg";
import RightArrow from "../assets/images/rtarrow.svg";
import CloseIcon from "../assets/images/cross.svg";
import FullscreenIcon from "../assets/images/enlarge.svg";

/* --- Helper: dynamic text color based on background luminance --- */
function getTextColorForBg(hexColor) {
  if (hexColor.startsWith("#")) hexColor = hexColor.slice(1);
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128 ? "text-darkText" : "text-lightText";
}

export default function Lightbox({ images = [], currentIndex, setCurrentIndex, description: descriptionProp }) {
  const location = useLocation();
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (currentIndex === null || !images[currentIndex]) return null;

  const current = images[currentIndex];
  const isObject = typeof current === "object";

  const legacyPath = isObject ? (current.lightboxImage || current.image) : current;
  const legacyPublicId = getPublicIdFromLegacyPath(legacyPath);
  const publicId = isObject
    ? (current.lightboxImagePublicId || current.imagePublicId || legacyPublicId)
    : legacyPublicId;

  const imageSrc =
    cloudinaryImageUrl(publicId, { width: isExpanded ? 2400 : 1600 }) ||
    (typeof legacyPath === "string" ? cloudinaryUrlFromLegacyPath(legacyPath, { width: isExpanded ? 2400 : 1600 }) : "");

  const title = isObject ? current.title : "";
  const description = isObject ? current.shortDescription || descriptionProp || "" : "";
  const gumroadLink = isObject ? current.gumroadLink : null;
  const shopLink = isObject ? current.shopLink : null;
  const storyLink = isObject ? current.storyLink : null;

  // Logic to hide story link if we're already on that page
  const showStoryBtn = storyLink && location.pathname !== storyLink;

  const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";

  const toggleFullscreen = async (e) => {
    e.stopPropagation();
    if (!isExpanded) {
      // First click: expand to larger size
      setIsExpanded(true);
      if (cookiesAccepted) trackEvent("lightbox_expand", "Engagement", imageSrc);
    } else {
      // Second click: try browser fullscreen, fallback to CSS fullscreen
      try {
        if (!document.fullscreenElement) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
          if (cookiesAccepted) trackEvent("lightbox_fullscreen", "Engagement", imageSrc);
        } else {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      } catch (err) {
        console.error("Browser fullscreen failed, using CSS fallback:", err);
        // Fallback: just keep expanded state
        setIsFullscreen(!isFullscreen);
      }
    }
  };

  const showNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % images.length;
      if (cookiesAccepted) trackEvent("lightbox_next", "Engagement", images[nextIndex]);
      return nextIndex;
    });
  };

  const showPrev = () => {
    setCurrentIndex((prev) => {
      const prevIndex = (prev - 1 + images.length) % images.length;
      if (cookiesAccepted) trackEvent("lightbox_prev", "Engagement", images[prevIndex]);
      return prevIndex;
    });
  };

  const handlePurchaseClick = (link, eventName) => {
    if (cookiesAccepted) trackEvent(eventName, "Engagement", link);
  };

  /* --- Overlay background and dynamic text --- */
  const overlayBg = "#2f3e2f"; // semi-dark overlay
  const overlayTextClass = getTextColorForBg(overlayBg);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className={`fixed inset-0 backdrop-blur-sm bg-[${overlayBg}]/90 flex items-start justify-center z-50 ${overlayTextClass} ${isFullscreen ? "" : "p-4"}`}
        onClick={() => setCurrentIndex(null)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div
          className={`relative flex flex-col items-center max-w-full ${isFullscreen ? "" : "mt-8 mb-8"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative inline-block group mb-4">
            <motion.img
              src={imageSrc}
              alt={title}
              loading="lazy"
              className={`rounded-sm cursor-pointer object-contain block ${
                isFullscreen
                  ? "max-w-[100vw] max-h-[100vh]"
                  : isExpanded
                  ? "max-w-[95vw] max-h-[90vh]"
                  : "max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[80vh] sm:max-h-[75vh] md:max-h-[70vh] lg:max-h-[65vh]"
                }`}
              onClick={toggleFullscreen}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
            />

            {/* Left arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{
                left: isFullscreen ? "-3rem" : isMobile ? "0.5rem" : "-5rem",
                transform: "translateY(-50%)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
            >
              <img src={LeftArrow} alt="Previous" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Right arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{
                right: isFullscreen ? "-3rem" : isMobile ? "0.5rem" : "-5rem",
                transform: "translateY(-50%)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
            >
              <img src={RightArrow} alt="Next" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Close button */}
            <button
              className="absolute w-10 h-10 flex items-center justify-center z-50"
              style={{ top: "-0.5rem", right: isMobile ? "1rem" : "-3rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(null);
              }}
            >
              <img src={CloseIcon} alt="Close" className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Fullscreen / Enlarge button */}
            {!isFullscreen && (
              <button
                className="absolute w-10 h-10 flex items-center justify-center z-50"
                style={{ top: "-0.5rem", left: isMobile ? "1rem" : "-3rem" }}
                onClick={toggleFullscreen}
              >
                <img
                  src={FullscreenIcon}
                  alt={isExpanded ? "Fullscreen" : "Enlarge"}
                  className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150"
                />
              </button>
            )}
          </div>

          {!isFullscreen && !isExpanded && (
            <div className="w-full max-w-[95vw] mt-2 p-4 pt-4 pb-6 shadow-xl flex flex-col items-start backdrop-blur-md rounded-lg" style={{ backgroundColor: "#e1e5e1", border: "1px solid rgba(0,0,0,0.1)" }}>
              {title && <h2 className="font-bold text-xl mb-2 text-[#101E0E] font-cormorant">{title}</h2>}
              {description && <p className="text-base mb-4 text-[#101E0E]/80 font-cormorant leading-relaxed">{description}</p>}
              <div className="flex space-x-3">
                {gumroadLink && (
                  <a
                    href={gumroadLink}
                    onClick={() => handlePurchaseClick(gumroadLink, "lightbox_purchase")}
                    className={`px-4 py-2 font-medium rounded-sm shadow hover:opacity-90 transition-opacity ${overlayTextClass === "text-darkText" ? "bg-[#5F7536] text-white" : "bg-[#c5d89b] text-[#101E0E]"
                      }`}
                  >
                    Purchase
                  </a>
                )}
                {shopLink && (
                  <a
                    href={shopLink}
                    onClick={() => handlePurchaseClick(shopLink, "lightbox_shop")}
                    className={`px-4 py-2 font-medium rounded-sm shadow hover:opacity-90 transition-opacity ${overlayTextClass === "text-darkText" ? "bg-[#634E39] text-white" : "bg-[#d8c9b5] text-[#101E0E]"
                      }`}
                  >
                    Shop
                  </a>
                )}
                {showStoryBtn && (
                  <Link
                    to={storyLink}
                    onClick={() => {
                      if (cookiesAccepted) trackEvent("lightbox_story", "Engagement", storyLink);
                      setCurrentIndex(null); // Close lightbox when navigating
                    }}
                    className={`px-4 py-2 font-medium rounded-sm shadow hover:opacity-90 transition-opacity ${overlayTextClass === "text-darkText" ? "bg-[#B48B3D] text-white" : "bg-[#f1cd8f] text-[#101E0E]"
                      }`}
                  >
                    View Story
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}