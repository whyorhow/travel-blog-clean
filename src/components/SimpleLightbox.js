import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import CloseIcon from "../assets/images/cross.svg";
import { useLocation } from 'react-router-dom'; // added import

export default function SimpleLightbox({ 
  images = [], 
  currentIndex, 
  setCurrentIndex,
  debugId = 'UNKNOWN'
}) {
  const location = useLocation();
  
  const [imageWidth, setImageWidth] = useState(null);

  const handleImageLoad = (e) => {
    setImageWidth(e.target.offsetWidth);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (currentIndex === null || currentIndex === -1 || !images[currentIndex]) return null;
  const current = images[currentIndex];
  const isObject = typeof current === "object";

  const title = isObject ? current.title : "";
  const description = isObject ? current.description : "";
  const contextLine = isObject ? current.contextLine : null;
  
  // Handle imported image objects, local assets, and cloudinary images
  let imageSrc;
  if (isObject) {
    if (typeof current.image === 'string') {
      imageSrc = (current.image.startsWith('/assets/') || current.image.startsWith('http'))
        ? current.image
        : cloudinaryUrlFromLegacyPath(current.image, { width: 1200 });
    } else {
      // Imported image object - use directly
      imageSrc = current.image;
    }
  } else {
    // Direct string
    imageSrc = current.startsWith('/assets/') ? current : cloudinaryUrlFromLegacyPath(current, { width: 1200 });
  }

  const handleClose = () => {
    setCurrentIndex(null); // This will be handled by the parent condition
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div
          className="relative flex flex-col items-center max-w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button - top right of image */}
          <button
            className="absolute w-8 h-8 flex items-center justify-center z-50 bg-white/80 hover:bg-white rounded-full shadow-lg"
            style={{ top: "1rem", right: "1rem" }}
            onClick={handleClose}
          >
            <img src={CloseIcon} alt="Close" className="w-4 h-4" />
          </button>

          {/* Enlarged image with onLoad for width detection */}
          <div className="relative">
            <img
              onLoad={handleImageLoad}
              src={imageSrc}
              alt={title}
              className="max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[70vh] object-contain rounded-lg shadow-2xl cursor-pointer"
              onClick={handleClose}
            />
          </div>

          {/* Title and description card - only show if title or description exists */}
          {(title || description || contextLine) && (
            <div
              className="mt-4 p-3 shadow-xl flex flex-col items-start bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200"
              style={{ width: imageWidth || 'auto' }}
            >
              {title && <h2 className="font-bold text-lg mb-2 text-gray-800 font-cormorant">{title}</h2>}
              {description && <p className="text-sm text-gray-700 font-cormorant leading-relaxed">{description}</p>}
              {contextLine && (
                <p className="mt-3 text-sm text-stone-500 font-cormorant leading-relaxed italic">
                  {contextLine}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
