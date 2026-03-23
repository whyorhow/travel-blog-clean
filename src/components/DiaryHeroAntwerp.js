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

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-screen w-full overflow-hidden cursor-zoom-in -mt-8 md:mt-0">
        {/* Mobile-specific overlay for better diary text readability */}
        <div className="md:hidden absolute inset-0 bg-black/10 pointer-events-none"></div>
        
        {/* Title overlay */}
        <div
          className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 px-4 text-center pointer-events-none z-20"
        >
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-wide">
            Antwerp
          </h1>
        </div>

        <img
          src={diaryImg}
          alt="Antwerp diary"
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
          onClick={() => setIsOpen(true)}
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
            Places
          </button>
          <button 
            onClick={() => scrollToSection("tips")} 
            className="hover:text-blue-700 transition text-gray-900"
          >
            Tips
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={diaryImg}
              alt="Antwerp diary"
              className="max-w-[200%] max-h-[200%] rounded-lg shadow-2xl cursor-zoom-out"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when tapping image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
