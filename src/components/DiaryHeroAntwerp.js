import diaryImg from "../assets/images/Diary Antwerp.webp";
import titleImg from "../assets/images/Antwerp-Title.webp";

export default function DiaryHeroAntwerp({ heroOpenLightbox }) {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHeroClick = () => {
    if (heroOpenLightbox) {
      heroOpenLightbox(0);
    }
  };

  return (
    <>
      <section className="relative w-full overflow-hidden mt-4 md:mt-0" style={{ aspectRatio: '3/4', maxHeight: '100vh' }}>
        
        <div className="md:hidden absolute inset-0 bg-black/10 pointer-events-none"></div>
        
        {/* Title */}
        <div className="absolute top-0 md:top-4 left-1/2 -translate-x-1/2 px-4 text-center pointer-events-none z-20">
          <img
            src={titleImg}
            alt="Antwerp"
            className="w-auto h-8 sm:h-12 md:h-20 lg:h-28 xl:h-32 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] scale-[0.9]"
          />
        </div>

        {/* Plus Icon */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[70]">
          <div
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center cursor-pointer border border-white/20"
            onClick={handleHeroClick}
          >
            <img src="/assets/plus.svg" alt="Zoom" className="w-5 h-5" />
          </div>
        </div>

        {/* Image */}
        <img
          src={diaryImg}
          alt="Antwerp diary"
          className="absolute inset-0 w-full h-full object-contain cursor-zoom-in z-10"
          onClick={handleHeroClick}
        />
      </section>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-center gap-6 text-base md:px-6 md:py-3 md:gap-12 md:text-lg md:text-2xl font-semibold">
          <button onClick={() => scrollToSection("overview")} className="hover:text-blue-700 text-gray-900">Overview</button>
          <button onClick={() => scrollToSection("places")} className="hover:text-blue-700 text-gray-900">Explore</button>
          <button onClick={() => scrollToSection("tips")} className="hover:text-blue-700 text-gray-900">Favorites</button>
          <button onClick={() => scrollToSection("gallery")} className="hover:text-blue-700 text-gray-900">Gallery</button>
        </div>
      </nav>
    </>
  );
}