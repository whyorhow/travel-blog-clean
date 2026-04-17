import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

// Swiper for locations carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
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
  const swiperRef = useRef(null);

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
      className="relative pb-20"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <SEO
        title="Travel Adventures in Brazil | Nomad Scribbles"
        description="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        image="/images/Brazil/BrazilBack.png"
        slug="/brazil"
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Adventures in Brazil</h1>

      {/* Hero Image with Overlay - Optimized */}
      <motion.div
        className="relative w-full max-w-3xl mx-auto mt-24 mb-4 px-4 cursor-pointer"
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

      {/* Side-by-Side Swiper and Map Section (Full-Width Spread) */}
      <div className="relative w-full mb-1 lg:mt-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full mb-4 text-darkText">
            {/* Swiper Carousel (Left) */}
            <motion.section
              className="w-full flex justify-center lg:justify-end"
              variants={fadeScale}
            >
              <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Swiper
                  modules={[Navigation, Autoplay, Pagination]}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: true }}
                  loop={true}
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
            </motion.section>

            {/* Text Section - Beside carousel on desktop */}
            <motion.div
              className="w-full max-w-2xl text-center flex flex-col items-center gap-2 mb-2"
              variants={fadeScale}
            >
              <h3 className="text-xl font-bold text-[#edd98d] mb-4">Across the Plateau & Coast</h3>
              <p className="text-lg leading-relaxed">
                From the thunderous falls in the south to the flooded savannas of the west, Brazil is defined by its scale. Urban peaks and coastal plains meet massive river basins, creating a landscape of granite mountains and tropical interiors.
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
        <h2 className="text-lg font-bold font-cormorant text-[#E5CF6B]/60 mb-6 text-center uppercase tracking-widest">Explore These Places</h2>
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
                className="block w-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md rounded-xl py-3 text-center hover:bg-white/10 hover:text-white transition duration-300 text-sm font-medium"
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
              to="/brazil/saopaulonew"
              className="block w-full bg-[#E5CF6B]/10 border border-[#E5CF6B]/30 text-[#E5CF6B] backdrop-blur-md rounded-xl py-3 text-center hover:bg-[#E5CF6B]/20 hover:text-[#E5CF6B] transition duration-300 text-sm font-medium"
            >
              São Paulo (New)
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
        <Link to="/adventures" className="flex flex-row items-center justify-center bg-[#E5CF6B]/10 border border-[#E5CF6B]/30 text-[#E5CF6B] backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-[#E5CF6B]/20 hover:text-[#E5CF6B] transition duration-300 text-sm font-medium">
          <span className="text-lg mr-2">←</span>
          <span className="text-sm font-medium uppercase tracking-wide">Return To Adventures</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default Brazil;
