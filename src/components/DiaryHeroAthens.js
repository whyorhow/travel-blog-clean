import { useState } from "react";
import diaryImg from "../assets/images/Diary Athens.webp";
import titleImg from "../assets/images/Athens-Title.webp";

export default function DiaryHeroAthens() {
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
      <section className="relative w-full overflow-hidden mt-4 md:mt-0" style={{ aspectRatio: '3/4', maxHeight: '100vh' }}>
        {/* Mobile-specific overlay for better diary text readability */}
        <div className="md:hidden absolute inset-0 bg-black/10 pointer-events-none"></div>
        
        {/* Title overlay */}
        <div
          className="absolute top-0 md:top-4 left-1/2 -translate-x-1/2 px-4 text-center pointer-events-none z-20"
        >
          <img
            src={titleImg}
            alt="Athens"
            className="w-auto h-8 sm:h-12 md:h-20 lg:h-28 xl:h-32 object-contain relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] scale-[0.9]"
          />
        </div>

        {/* Plus Icon Overlay */}
        {!isOpen && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[70]">
            <div className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/20"
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
          alt="Athens diary"
          className="absolute inset-0 w-full h-full object-contain cursor-zoom-in z-10"
          onClick={() => setIsOpen(true)}
        />
      </section>

      {/* Simple Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90"
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Modal Content */}
          <div style={{ 
            position: 'absolute', 
            top: '50vh',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
            zIndex: 1001
          }}>
            <img
              src={diaryImg}
              alt="Expanded diary"
              style={{ 
                width: '100vw',
                height: 'auto',
                maxWidth: 'none',
                cursor: 'zoom-out'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Close button - higher position */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[9999]">
              <div className="w-12 h-12 rounded-full bg-black/80 hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-white/30"
                   onClick={() => setIsOpen(false)}>
                <img 
                  src="/assets/plus.svg" 
                  alt="Close" 
                  className="w-6 h-6 text-white rotate-45"
                />
              </div>
            </div>
        </div>
      )}

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
    </>
  );
}
