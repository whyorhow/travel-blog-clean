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
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [cardWidth, setCardWidth] = useState(null);
  const [availableHeight, setAvailableHeight] = useState(null);

  const location = useLocation();
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate responsive image dimensions based on viewport
  const getImageDimensions = () => {
    if (isFullscreen) return { width: '100vw', height: '85vh' };
    if (isExpanded) return { width: '95vw', height: '75vh' };
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Responsive calculations - ensure cards fit in viewport
    if (vw < 640) return { width: '95vw', height: '40vh' }; // Mobile
    if (vw < 768) return { width: '90vw', height: '35vh' }; // Small
    if (vw < 1024) return { width: '85vw', height: '30vh' }; // Medium
    return { width: '75vw', height: '25vh' }; // Large - much smaller for desktop
  };

  const imageDimensions = getImageDimensions();

  const handleImageLoad = (e) => {
    const imgWidth = e.target.offsetWidth;
    const imgHeight = e.target.offsetHeight;
    setImageWidth(imgWidth);
    setImageHeight(imgHeight);
    
    // Card follows image width
    setCardWidth(imgWidth);
    
  };

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
  const description = isObject ? current.shortDescription || current.description || descriptionProp || "" : "";
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
        className={`fixed inset-0 backdrop-blur-sm bg-[${overlayBg}]/90 flex items-start justify-center overflow-y-auto z-50 ${overlayTextClass} ${isFullscreen ? "" : "p-4"}`}
        onClick={() => setCurrentIndex(null)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div
          className={`relative flex flex-col items-center justify-start overflow-y-auto ${isFullscreen ? "" : "mt-12 mb-12"}`}
          style={{ maxWidth: '98vw', maxHeight: '100vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Outer container for image and icons - larger than image */}
          <div className={`relative mb-1 ${isFullscreen ? 'p-0' : 'p-12'}`}>
            {/* Inner image container - no padding */}
            <div className="relative inline-block">
              <motion.img
                onLoad={handleImageLoad}
                src={imageSrc}
                alt={title}
                className={`rounded-sm cursor-pointer object-contain block max-w-[90vw] ${isFullscreen ? 'max-h-[95vh]' : 'max-h-[45vh]'}`}
                onClick={toggleFullscreen}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
              />
            </div>

            {/* Navigation arrows in outer container */}
            {/* Left arrow */}
            <button
              className="absolute top-1/2 flex items-center justify-center z-50"
              style={{
                left: "1rem",
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
                right: "1rem",
                transform: "translateY(-50%)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
            >
              <img src={RightArrow} alt="Next" className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Close button in outer container */}
            <button
              className="absolute w-10 h-10 flex items-center justify-center z-50"
              style={{ top: "1rem", right: "1rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(null);
              }}
            >
              <img src={CloseIcon} alt="Close" className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150" />
            </button>

            {/* Fullscreen / Enlarge button in outer container */}
            {!isFullscreen && (
              <button
                className="absolute w-10 h-10 flex items-center justify-center z-50"
                style={{ top: "1rem", left: "1rem" }}
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

          {/* Description card - proportional to image size */}
          {!isFullscreen && (
            <div 
              className="mt-4 p-3 shadow-xl flex flex-col items-start bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200"
              style={{ 
                width: cardWidth || '400px',
                maxWidth: '90vw'
              }}
            >
              {title && <h2 className="font-bold text-lg mb-2 text-gray-800 font-cormorant">{title}</h2>}
              {description && <p className="text-sm text-gray-700 font-cormorant leading-relaxed">{description}</p>}
              <div className="flex space-x-3 mt-3">
                {gumroadLink && (
                  <a
                    href={gumroadLink}
                    onClick={() => handlePurchaseClick(gumroadLink, "lightbox_purchase")}
                    className="px-3 py-1 text-sm font-medium rounded-sm shadow hover:opacity-90 transition-opacity bg-[#5F7536] text-white"
                  >
                    Purchase
                  </a>
                )}
                {shopLink && (
                  <a
                    href={shopLink}
                    onClick={() => handlePurchaseClick(shopLink, "lightbox_shop")}
                    className="px-3 py-1 text-sm font-medium rounded-sm shadow hover:opacity-90 transition-opacity bg-[#634E39] text-white"
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
                    className="px-3 py-1 text-sm font-medium rounded-sm shadow hover:opacity-90 transition-opacity bg-[#B48B3D] text-white"
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