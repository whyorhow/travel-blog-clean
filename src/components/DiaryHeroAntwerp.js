import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import diaryImg from "../assets/images/Diary Antwerp.webp";
import titleImg from "../assets/images/Antwerp Title.webp";

export default function DiaryHeroAntwerp({ openLightbox }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-screen w-full overflow-hidden cursor-zoom-in -mt-8 md:mt-0">
        {/* Mobile-specific overlay for better diary text readability */}
        <div className="md:hidden absolute inset-0 bg-black/10 pointer-events-none"></div>
        
        {/* Title overlay */}
        <div
          className="absolute top-8 md:top-20 left-1/2 -translate-x-1/2 px-4 text-center pointer-events-none z-20"
        >
          <img
            src={titleImg}
            alt="Antwerp"
            className="w-auto h-10 sm:h-14 md:h-24 lg:h-32 xl:h-40 object-contain relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Plus Icon Overlay */}
        {!isOpen && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[70]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-white/20 hover:bg-white/30"
                 onClick={() => setIsOpen(true)}>
              <img 
                src="/assets/plus.svg" 
                alt="Zoom" 
                className="w-5 h-5 text-white"
              />
            </div>
          </div>
        )}

        <img
          src={diaryImg}
          alt="Antwerp diary"
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
          onClick={() => setIsOpen(!isOpen)}
        />
      </section>

      {/* Sticky Nav Menu */}
      <nav className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-center gap-6 text-base md:px-6 md:py-3 md:gap-12 md:text-lg md:text-2xl font-semibold">
          <button 
            onClick={() => scrollToSection("overview")} 
            className="hover:text-blue-700 transition text-gray-900"
          >
            Overview
          </button>
          <button 
            onClick={() => scrollToSection("places")} 
            className="hover:text-blue-700 transition text-gray-900"
          >
            Explore
          </button>
          <button 
            onClick={() => scrollToSection("tips")} 
            className="hover:text-blue-700 transition text-gray-900"
          >
            Favorites
          </button>
          <button 
            onClick={() => scrollToSection("gallery")} 
            className="hover:text-blue-700 transition text-gray-900"
          >
            Gallery
          </button>
        </div>
      </nav>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                src={diaryImg}
                alt="Antwerp diary"
                className="rounded-lg shadow-2xl cursor-zoom-out object-contain w-[180%] h-[180%] max-w-[162vw] max-h-[162vh]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()} // prevent closing when tapping image
              />
            </div>
            
            {/* Close button - prominent at bottom center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-60">
              <div className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg"
                   onClick={() => setIsOpen(false)}>
                <img 
                  src="/assets/plus.svg" 
                  alt="Close" 
                  className="w-6 h-6 text-gray-800 rotate-45"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
