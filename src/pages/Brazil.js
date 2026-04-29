import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import LeftArrow from "../assets/images/lftarrow.svg";
import RightArrow from "../assets/images/rtarrow.svg";

// Swiper for locations carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Brazil() {
  // Destinations for the carousel/grid
  const gridCities = destinations.filter(d => d.country === 'Brazil');

  // Featured destinations for the carousel
  const featuredDestinations = [
    { id: "saopaulo", name: "São Paulo", img: "/images/SaoPauloLanding/small/street.jpg", path: "/brazil/saopaulo" },
    { id: "florianopolis", name: "Florianópolis", img: "/images/Floripa/small/Floripa18.webp", path: "/brazil/florianopolis" },
    { id: "rio", name: "Rio de Janeiro", img: "/images/Rio/small/Rio9.webp", path: "/brazil/rio" },
    { id: "bonito", name: "Bonito", img: "/images/Bonito/Small/Bonito3new.webp", path: "/brazil/bonito" },
    { id: "salvador", name: "Salvador", img: "/images/Salvador/small/Salvador5.webp", path: "/brazil/salvador" },
    { id: "pantanal", name: "The Pantanal", img: "/images/Pantanal/small/Pantanal5.webp", path: "/brazil/pantanal" },
    { id: "foz", name: "Foz do Iguaçu", img: "/images/Iguazu/small/Iguazu16.webp", path: "/brazil/foz" },
    { id: "manaus", name: "Manaus", img: "/images/Manaus/Small/Manaus13.webp", path: "/brazil/manaus" },
    { id: "ilha-grande", name: "Ilha Grande", img: "/images/Ilha Grande/small/Ilha20new.webp", path: "/brazil/ilha-grande" }
  ];

  // Map markers
  const mapMarkers = destinations.filter(d => d.country === 'Brazil');

  const [showOverlay, setShowOverlay] = useState(false);
  const [hoveredDestId, setHoveredDestId] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef(null);

  // Narrative lines for each destination - creates the "journey unfolded" story
  const narrativeLines = {
    saopaulo: "This is where it began.",
    rio: "Everything shifted towards the coast.",
    florianopolis: "The pace slowed.",
    bonito: "The landscape changed again.",
    salvador: "The rhythm found its roots.",
    pantanal: "It opened out completely.",
    foz: "The falls marked the edge.",
    manaus: "The river became the road.",
    "ilha-grande": "We ended where the forest meets the sea."
  };

  // Auto-switch overlay after 1 second on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const spreadBackgroundStyle = {
    backgroundImage: `url(${paperTexture})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "url(#torn-paper-filter)",
    opacity: 0.95,
  };

  // Brazil-specific light green paper background - natural tone
  const brazilBackgroundStyle = {
    backgroundColor: "#c8d8c0", // Warm natural sage
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(170, 195, 160, 0.5) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(150, 175, 140, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(185, 205, 175, 0.6) 0%, transparent 70%),
      radial-gradient(circle at 10% 80%, rgba(175, 200, 165, 0.35) 0%, transparent 40%)
    `,
    backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
    backgroundPosition: "0 0, 0 0, 0 0, 0 0",
    backgroundAttachment: "fixed",
    position: "relative",
  };

  // Programmatically slide swiper when map pin is hovered
  useEffect(() => {
    if (swiperRef.current && hoveredDestId) {
      const index = featuredDestinations.findIndex(d => d.id === hoveredDestId);
      if (index !== -1) {
        swiperRef.current.slideToLoop(index);
      }
    }
  }, [hoveredDestId, featuredDestinations]);

  return (
    <motion.div
      className="relative pb-20 min-h-screen"
      style={{
        ...brazilBackgroundStyle,
        marginTop: "-48px", // Pull up behind the fixed header (h-12 = 48px)
        paddingTop: "48px", // Add padding back to compensate
      }}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Full-height green background layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: brazilBackgroundStyle.backgroundColor,
          backgroundImage: brazilBackgroundStyle.backgroundImage,
          backgroundSize: brazilBackgroundStyle.backgroundSize,
          backgroundPosition: brazilBackgroundStyle.backgroundPosition,
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />
      {/* Paper texture overlay for Brazil page only */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          zIndex: -1,
        }}
      />
      <SEO
        title="Travel Adventures in Brazil | Nomad Scribbles"
        description="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        image="/images/Brazil/BrazilBack.png"
        slug="/brazil"
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Adventures in Brazil</h1>

      {/* Hero Image with Overlay - Optimized */}
      <motion.div
        className="relative w-full max-w-3xl mx-auto mt-8 mb-4 px-4 cursor-pointer"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onClick={() => setShowOverlay(!showOverlay)}
        variants={fadeScale}
      >
        <img
          src={cloudinaryUrlFromLegacyPath("/images/Brazil/BrazilHero.webp", { width: 2000 })}
          alt="Brazilian landscape with city and nature"
          fetchPriority="high" // OPTIMIZATION: Load first
          loading="eager"      // OPTIMIZATION: Load immediately
          className="w-full h-auto object-contain shadow-lg rounded-lg p-3 sm:p-4"
        />
        <img
          src={cloudinaryUrlFromLegacyPath("/images/Brazil/BrazilPhoto.webp", { width: 2000 })}
          alt="Overlay Brazil photo"
          loading="lazy" // OPTIMIZATION: This can load later
          className={`absolute inset-0 w-full h-full object-contain shadow-lg transition-opacity duration-500 scale-[0.9] sm:scale-100 ${showOverlay ? "opacity-100" : "opacity-0"}`}
        />
      </motion.div>

      {/* Intro Bridge - centered, quiet transition */}
      <div className="max-w-2xl mx-auto px-6 mt-6 mb-10 text-center">
        <p className="font-cormorant text-[1.35rem] sm:text-[1.5rem] leading-relaxed text-green-950/90">
          We didn't really understand Brazil at first.
          <span className="block mt-2 text-[1.15rem] sm:text-[1.25rem] text-green-900/80">
            It was only by moving through it that pace, landscape, and the journey itself began to make sense.
          </span>
        </p>
      </div>

      {/* Side-by-Side Swiper and Map Section (Full-Width Spread) */}
      <div className="relative w-full mb-1 lg:mt-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 flex flex-col items-center">
          {/* Static lead-in above carousel */}
          <p className="font-cormorant text-[1.35rem] sm:text-[1.5rem] text-green-950/90 mt-10">
            Brazil, as we moved through it
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full mb-4 text-darkText">
            {/* Swiper Carousel (Left) */}
            <motion.section
              className="w-full flex justify-center lg:justify-end"
              variants={fadeScale}
            >
              <div className="relative w-full max-w-[450px] flex items-center">
                {/* Left arrow - outside carousel */}
                <button
                  className="swiper-button-prev-custom flex-shrink-0 mr-3 w-12 h-12 rounded-full bg-stone-800/70 flex items-center justify-center hover:bg-stone-800/90 transition-colors duration-200"
                >
                  <img src={LeftArrow} alt="Previous" className="w-6 h-9 transition-transform duration-200 ease-in-out hover:scale-110" />
                </button>

                {/* Carousel container */}
                <div className="relative aspect-[4/5] flex-1 rounded-2xl overflow-hidden shadow-2xl">
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Connect custom buttons to swiper
                    swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
                    swiper.params.navigation.nextEl = ".swiper-button-next-custom";
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={{ prevEl: ".swiper-button-prev-custom", nextEl: ".swiper-button-next-custom" }}
                  pagination={{ clickable: true }}
                  loop={true}
                  initialSlide={0}
                  className="w-full h-full"
                >
                  {featuredDestinations.map((city, index) => (
                    <SwiperSlide key={city.id}>
                      <Link to={city.path} className="block w-full h-full group relative">
                        <img
                          src={cloudinaryUrlFromLegacyPath(city.img, { width: 1600 })}
                          alt={city.name}
                          loading={index === 0 ? "eager" : "lazy"} // OPTIMIZATION: First slide eager, others lazy
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 pt-20">
                          <h3 className="text-white text-3xl font-bold font-cormorant tracking-tight">{city.name}</h3>
                          <p className="text-[#E5CF6B] text-sm italic font-cormorant mt-1">View Full Story &rarr;</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Right arrow - outside carousel */}
              <button
                className="swiper-button-next-custom flex-shrink-0 ml-3 w-12 h-12 rounded-full bg-stone-800/70 flex items-center justify-center hover:bg-stone-800/90 transition-colors duration-200"
              >
                <img src={RightArrow} alt="Next" className="w-6 h-9 transition-transform duration-200 ease-in-out hover:scale-110" />
              </button>
            </div>
            </motion.section>

            {/* Dynamic narrative - changes with active slide */}
            <motion.div
              className="w-full max-w-[450px] mx-auto flex flex-col justify-center items-center text-center gap-2 py-6 lg:aspect-[4/5] lg:py-0"
              variants={fadeScale}
            >
              <p className="text-[1.15rem] sm:text-[1.25rem] leading-relaxed font-cormorant text-green-900/90 transition-all duration-500">
                {narrativeLines[featuredDestinations[activeSlideIndex]?.id] || "This is where it began."}
              </p>
            </motion.div>
          </div>

          {/* Map Section - Independent */}
          <motion.div variants={fadeScale} className="w-full flex justify-center relative">
            {/* Paper texture background only for map - tighter padding */}
            <div
              className="absolute inset-y-4 w-[110vw] -left-[5vw] pointer-events-none z-0"
              style={spreadBackgroundStyle}
            />
            <div className="relative z-10 w-full overflow-visible">
              <ContextMap
                markers={mapMarkers}
                variant="overview"
                showTitle={false}
                geography={true} // Enable high-contrast ink mode
                transparent={true} // Map floats on the main banner spread
                onHoverMarker={setHoveredDestId}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Other Cities Grid */}
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-20">
        <h2 className="text-lg font-bold font-cormorant text-green-800/80 mb-6 text-center uppercase tracking-widest">Explore These Places</h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
        >
          {gridCities.map((city) => (
            <motion.div
              key={city.id}
              variants={fadeScale}
            >
              <Link
                to={city.path}
                className="block w-full bg-green-800/10 border border-green-800/30 text-green-900 backdrop-blur-md rounded-xl py-3 text-center hover:bg-green-800/20 hover:text-green-950 transition duration-300 text-sm font-medium"
              >
                {city.name}
              </Link>
            </motion.div>
          ))}
          {/* Add the new São Paulo page */}
          <motion.div
            variants={fadeScale}
          >
            <Link
              to="/brazil/saopaulo"
              className="block w-full bg-[#2e5c31]/10 border border-[#2e5c31]/30 text-[#2e5c31] backdrop-blur-md rounded-xl py-3 text-center hover:bg-[#2e5c31]/20 hover:text-[#1f4a24] transition duration-300 text-sm font-medium"
            >
              São Paulo
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
        <Link to="/adventures" className="flex flex-row items-center justify-center bg-green-800/10 border border-green-800/30 text-green-900 backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-green-800/20 hover:text-green-950 transition duration-300 text-sm font-medium">
          <span className="text-lg mr-2 text-green-900">←</span>
          <span className="text-sm font-medium uppercase tracking-wide">Return To Adventures</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default Brazil;
