import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import diaryImg from "../assets/images/Diary Antwerp.webp";

export default function DiaryHeroAntwerp({ openLightbox }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleOpen();
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
          className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 px-4 text-center pointer-events-none z-20"
        >
          <h1 className="text-white/90 text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-[0.0375em] font-serif relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Antwerp
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></span>
          </h1>
        </div>

        {/* Plus/Cross Icon Overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[70]">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isOpen ? 'bg-white/40' : 'bg-white/20'}`}
               onClick={handleToggleOpen}
               role="button"
               tabIndex={0}
               onKeyDown={handleKeyDown}
               aria-label={isOpen ? "Close zoom" : "Zoom in"}>
            <img 
              src="/assets/plus.svg" 
              alt=""
              className={`w-5 h-5 text-white transition-all duration-300 ${isOpen ? 'rotate-45 scale-125' : ''}`}
            />
          </div>
        </div>

        <img
          src={diaryImg}
          alt="Antwerp diary"
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
          onClick={handleToggleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
      </section>

      {/* Sticky Nav Menu */}
      <nav className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-center gap-4 sm:gap-6 text-base md:px-6 md:py-3 md:gap-12 md:text-lg lg:text-2xl font-semibold">
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
                className="rounded-lg shadow-2xl cursor-zoom-out object-contain md:object-cover lg:object-cover object-center w-[150%] h-[150%] md:w-[115%] md:h-[115%] lg:w-[130%] lg:h-[130%]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()} // prevent closing when tapping image
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
