import { motion } from "framer-motion";
import { useState } from "react";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import SEO from "../components/SEO";
import DiaryHeroAntwerp from "../components/DiaryHeroAntwerp";
import GalleryWall from "../components/GalleryWall";
import SimpleLightbox from "../components/SimpleLightbox";
import darkGravelBg from "../assets/images/soil-background.webp";
import diaryImg from "../assets/images/Diary Antwerp.webp";

// Import images using Cloudinary helper (without 'z' prefix)
const cathedralImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Cathedral of Our Lady.webp");
const groteMarktImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Grote Markt.webp");
const braboStatueImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Brabo Statue.webp");
const hetSteenImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Het Steen Castle.webp");
const medievalTowerImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Medieval Tower.webp");
const chocolateShopImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Chocolate Shop.webp");
const flowerMarketImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Flower Market.webp");
const stationImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Centraal Railway Station.webp");
const streetMuralImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Street Mural.webp");
const portHouseImage = cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Zaha Hadid Port House.webp");

const places = [
  {
    id: "cathedral",
    name: "Cathedral of Our Lady",
    description: "Gothic masterpiece that has dominated Antwerp's skyline for centuries. The tower offers panoramic views of the city.",
    imageId: "zCathedral of Our Lady",
    image: cathedralImage,
    featured: true
  },
  {
    id: "grote-markt",
    name: "Grote Markt",
    description: "Historic main square surrounded by guild houses, Brabo Statue, and the magnificent City Hall - the heart of medieval Antwerp.",
    imageId: "zGrote Markt",
    image: groteMarktImage,
    featured: true
  },
  {
    id: "medieval-tower",
    name: "Medieval Tower",
    description: "Hidden gem in the old town, offering quiet moments away from the crowds and stunning architecture.",
    imageId: "zMedieval Tower",
    image: medievalTowerImage,
    featured: false
  },
  {
    id: "chocolate-shop",
    name: "Chocolate District",
    description: "Artisanal chocolate shops where traditional methods meet modern creativity. The pralines are unforgettable.",
    imageId: "zChocolate Shop",
    image: chocolateShopImage,
    featured: false
  }
];

const galleryImages = [
  // Group 1: Markets & Food
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zConfectionery Shop.webp"), 
    alt: "Confectionery Shop", 
    imageId: "zConfectionery Shop", 
    category: "markets-food",
    // Required fields for SimpleLightbox (Athens pattern)
    image: "/images/Belgium/Antwerp/Small/zConfectionery Shop.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Confectionery Shop.webp",
    title: "Confectionery Shop",
    description: "Antwerp confectionery shop"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zChocolate Shop.webp"), 
    alt: "Chocolate Shop", 
    imageId: "zChocolate Shop", 
    category: "markets-food",
    image: "/images/Belgium/Antwerp/Small/zChocolate Shop.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Chocolate Shop.webp",
    title: "Chocolate Shop",
    description: "Antwerp chocolate shop"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zOutdoor Market.webp"), 
    alt: "Outdoor Market", 
    imageId: "zOutdoor Market", 
    category: "markets-food",
    image: "/images/Belgium/Antwerp/Small/zOutdoor Market.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Outdoor Market.webp",
    title: "Outdoor Market",
    description: "Antwerp outdoor market"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zRustic Restaurant.webp"), 
    alt: "Rustic Restaurant", 
    imageId: "zRustic Restaurant", 
    category: "markets-food",
    image: "/images/Belgium/Antwerp/Small/zRustic Restaurant.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Rustic Restaurant.webp",
    title: "Rustic Restaurant",
    description: "Antwerp rustic restaurant"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zSeafood Restaurant.webp"), 
    alt: "Seafood Restaurant", 
    imageId: "zSeafood Restaurant", 
    category: "markets-food",
    image: "/images/Belgium/Antwerp/Small/zSeafood Restaurant.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Seafood Restaurant.webp",
    title: "Seafood Restaurant",
    description: "Antwerp seafood restaurant"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zFlower Market.webp"), 
    alt: "Flower Market", 
    imageId: "zFlower Market", 
    category: "markets-food",
    image: "/images/Belgium/Antwerp/Small/zFlower Market.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Flower Market.webp",
    title: "Flower Market",
    description: "Antwerp flower market"
  },
  
  // Group 2: Historic Architecture
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zGrote Markt.webp"), 
    alt: "Grote Markt", 
    imageId: "zGrote Markt", 
    category: "historic",
    image: "/images/Belgium/Antwerp/Small/zGrote Markt.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Grote Markt.webp",
    title: "Grote Markt",
    description: "Antwerp's historic main square"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zBrabo Statue.webp"), 
    alt: "Brabo Statue", 
    imageId: "zBrabo Statue", 
    category: "historic",
    image: "/images/Belgium/Antwerp/Small/zBrabo Statue.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Brabo Statue.webp",
    title: "Brabo Statue",
    description: "Historic statue in Grote Markt"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCathedral of Our Lady.webp"), 
    alt: "Cathedral of Our Lady", 
    imageId: "zCathedral of Our Lady", 
    category: "historic",
    image: "/images/Belgium/Antwerp/Small/zCathedral of Our Lady.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Cathedral of Our Lady.webp",
    title: "Cathedral of Our Lady",
    description: "Gothic cathedral dominating Antwerp's skyline"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Brick Buildings.webp"), 
    alt: "Historic Brick Buildings", 
    imageId: "zHistoric Brick Buildings", 
    category: "historic",
    image: "/images/Belgium/Antwerp/Small/zHistoric Brick Buildings.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Historic Brick Buildings.webp",
    title: "Historic Brick Buildings",
    description: "Traditional Antwerp architecture"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Stone Bridge.webp"), 
    alt: "Historic Stone Bridge", 
    imageId: "zHistoric Stone Bridge", 
    category: "historic",
    image: "/images/Belgium/Antwerp/Small/zHistoric Stone Bridge.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Historic Stone Bridge.webp",
    title: "Historic Stone Bridge",
    description: "Ancient stone bridge in Antwerp"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zMedieval Tower.webp"), 
    alt: "Medieval Tower", 
    imageId: "zMedieval Tower", 
    category: "historic",
    image: "/images/Belgium/Antwerp/Small/zMedieval Tower.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Medieval Tower.webp",
    title: "Medieval Tower",
    description: "Historic medieval tower in old town"
  },
  
  // Group 3: Modern & Waterfront
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCentraal Railway Station.webp"), 
    alt: "Central Station", 
    imageId: "zCentraal Railway Station", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zCentraal Railway Station.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Centraal Railway Station.webp",
    title: "Central Station",
    description: "Magnificent railway station building"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCobblestone Street.webp"), 
    alt: "Cobblestone Street", 
    imageId: "zCobblestone Street", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zCobblestone Street.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Cobblestone Street.webp",
    title: "Cobblestone Street",
    description: "Traditional cobblestone street"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zEvening Glow.webp"), 
    alt: "Evening Glow", 
    imageId: "zEvening Glow", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zEvening Glow.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Evening Glow.webp",
    title: "Evening Glow",
    description: "Antwerp in golden evening light"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHet Steen Castle.webp"), 
    alt: "Het Steen", 
    imageId: "zHet Steen Castle", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zHet Steen Castle.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Het Steen Castle.webp",
    title: "Het Steen Castle",
    description: "Historic castle on the waterfront"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zLange Wapper Statue.webp"), 
    alt: "Lange Wapper Statue", 
    imageId: "zLange Wapper Statue", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zLange Wapper Statue.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Lange Wapper Statue.webp",
    title: "Lange Wapper Statue",
    description: "Modern statue near Scheldt River"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zStreet Mural.webp"), 
    alt: "Street Mural", 
    imageId: "zStreet Mural", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zStreet Mural.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Street Mural.webp",
    title: "Street Mural",
    description: "Contemporary street art in Antwerp"
  },
  { 
    src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zZaha Hadid Port House.webp"), 
    alt: "Port House", 
    imageId: "zZaha Hadid Port House", 
    category: "modern-waterfront",
    image: "/images/Belgium/Antwerp/Small/zZaha Hadid Port House.webp",
    lightboxImage: "/images/Belgium/Antwerp/Full/Zaha Hadid Port House.webp",
    title: "Zaha Hadid Port House",
    description: "Modern architectural masterpiece by Zaha Hadid"
  }
];

export default function Antwerp({ openLightbox }) {
  // SimpleLightbox state for gallery and hero
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [heroLightboxIndex, setHeroLightboxIndex] = useState(-1);

  // Hero diary images
  const diaryImages = [
    {
      image: diaryImg
    }
  ];

  
  const handleGalleryClick = (imageId) => {
    if (openLightbox) {
      const index = imageOrder.indexOf(imageId);
      if (index !== -1) {
        const images = imageOrder.map(id => getImage(id));
        openLightbox(index, images);
      }
    }
  };

  // Handle GalleryWall image clicks
  const handleGalleryWallClick = (imageId) => {
    const index = galleryImages.findIndex(img => img.imageId === imageId);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  // Copy working pattern from original Antwerp.js
  const imageOrder = [
    "zGrote Markt", "zBrabo Statue", "zCathedral of Our Lady", "zHistoric Brick Buildings", "zCobblestone Street",
    "zHet Steen Castle", "zMedieval Tower", "zHistoric Stone Bridge", "zBustling Quay",
    "zChocolate Shop", "zConfectionery Shop", "zOutdoor Market", "zFlower Market",
    "zCentraal Railway Station", "zRustic Restaurant", "zSeafood Restaurant",
    "zLange Wapper Statue", "zStreet Mural", "zEvening Glow", "zZaha Hadid Port House"
  ];

  const handleImageClick = (imageId) => {
    if (openLightbox) {
      const index = imageOrder.indexOf(imageId);
      if (index !== -1) {
        openLightbox(index, imageOrder.map(id => getImage(id)));
      }
    }
  };

  const getImage = (id) => ({
    id: id,
    image: `/images/Belgium/Antwerp/Small/${id}.webp`,
    lightboxImage: `/images/Belgium/Antwerp/Full/${id.replace('z', '')}.webp`,
    expandedImage: `/images/Belgium/Antwerp/Small/${id.replace('z', '')}.webp`,
    title: id.replace('z', '').replace(/([A-Z])/g, ' $1').trim(),
    description: `Antwerp ${id.replace('z', '').replace(/([A-Z])/g, ' $1').trim()}` 
  });

  const handlePlacesImageClick = (imageId) => {
    if (openLightbox) {
      const index = imageOrder.indexOf(imageId);
      if (index !== -1) {
        openLightbox(index, imageOrder.map(id => getImage(id)));
      }
    }
  };

  return (
    <>
      {/* SimpleLightboxes outside all positioned containers */}
      <SimpleLightbox 
        images={galleryImages}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        debugId="GALLERY"
      />
      <SimpleLightbox 
        images={diaryImages}
        currentIndex={heroLightboxIndex >= 0 ? heroLightboxIndex : null}
        setCurrentIndex={setHeroLightboxIndex}
        debugId="HERO"
      />
      
      <div className="bg-black text-white relative min-h-screen" style={{ 
  backgroundImage: `url(${darkGravelBg})`, 
  backgroundSize: 'auto', 
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  backgroundAttachment: 'fixed',
  imageRendering: 'auto',
  WebkitImageRendering: 'auto',
  imageRendering: 'optimizeQuality',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  willChange: 'transform'
}}>
      {/* Background overlay to tone down gravel texture */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      
      <div className="relative z-10">
      <SEO
        title="Antwerp Diary | A Personal Journey Through Belgium's Hidden Gem"
        description="A personal diary of exploring Antwerp - from quiet medieval streets to modern architecture, discover the soul of Belgium's most underrated city."
        image={cloudinaryUrlFromLegacyPath(cathedralImage, { width: 1200 })}
        slug="belgium/antwerp"
      />

      {/* 1. Diary Hero with Integrated Navigation */}
      <DiaryHeroAntwerp heroOpenLightbox={(index) => setHeroLightboxIndex(index)} />

      {/* 3. Overview / The Experience */}
      <section id="overview" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 md:p-12 border-2 border-white/40"
          >
            <p className="text-xl md:text-2xl leading-relaxed md:leading-loose text-white/90 font-serif">
              We didn't have much planned when we arrived in Antwerp.
              <br />
              It was more of a stop than a destination.
              <br /><br />
              But it <span className="text-white/70 font-medium">settled into us</span> quickly.
              <br /><br />
              We spent most of our time just <span className="text-white/70 font-medium">wandering</span> - through quiet streets, past old stone buildings, stopping when something caught our attention.
              <br />
              There wasn't any pressure to see everything, which made it easier to actually enjoy what we did see.
              <br /><br />
              It's an <span className="text-white/70 font-medium">easy place to slow down</span> without trying.
            </p>
          </motion.div>
      </section>

      {/* 4. A Few Places Along the Way */}
      <section id="places" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-16 text-[#b99f0f] font-handwriting">
            A Few Places Along the Way
          </h2>

          <div className="space-y-12 px-4 sm:px-6">
            {/* Cathedral & Grote Markt */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Cathedral of Our Lady & Grote Markt
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - two rows, no gap */}
                <div className="relative">
                  {/* Top Row: 3/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-80">
                    {/* 1. Text box - full width mobile, 2/3 desktop */}
                    <div className="w-full md:w-2/3 h-auto md:h-full p-2 sm:p-3 md:p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 overflow-hidden">
                      <div className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight md:leading-relaxed text-white/80 tracking-wide">
                        We kept finding ourselves back near the Cathedral of Our Lady - its soaring towers always drew our gaze, no matter which street we wandered down. The Grote Markt nearby felt alive and timeless, with the Brabo Statue standing quietly in the middle, like a reminder that history lingers everywhere here.
                      </div>
                    </div>
                    
                    {/* 2. Cathedral tower - full width mobile, 1/3 desktop */}
                    <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Cathedral of Our Lady.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zCathedral of Our Lady")}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row: 2/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-48 mt-4 md:mt-0">
                    {/* 3. Brabo statue - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Brabo Statue.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zBrabo Statue")}
                      />
                    </div>
                    
                    {/* 4. Grote Markt - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Grote Markt.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zGrote Markt")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Historic Streets & Towers */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Historic Streets & Towers
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - two rows, no gap */}
                <div className="relative">
                  {/* Top Row: 1/2 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-80">
                    {/* 1. Historic Brick Buildings - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Historic Brick Buildings.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zHistoric Brick Buildings")}
                      />
                    </div>
                    
                    {/* 2. Text box - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        The old town hides quiet corners. Walking down cobblestone streets past medieval towers and stone bridges felt like slipping back in time. We lingered, imagining the stories held in the bricks.
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Row: 1/2 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-64 md:h-80 mt-4 md:mt-0">
                    {/* 3. Cobblestone Street - full width mobile, 3/8 desktop */}
                    <div className="w-full md:w-3/8 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Cobblestone Street.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zCobblestone Street")}
                      />
                    </div>
                    
                    {/* 4. Historic Stone Bridge - full width mobile, 1/4 desktop */}
                    <div className="w-full md:w-1/4 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Historic Stone Bridge.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zHistoric Stone Bridge")}
                      />
                    </div>
                    
                    {/* 5. Medieval Tower - full width mobile, 3/8 desktop */}
                    <div className="w-full md:w-3/8 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Medieval Tower.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zMedieval Tower")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Markets & Food */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Markets & Food
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - three rows, no gap */}
                <div className="relative">
                  {/* Row 1: 2/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-48 md:h-56">
                    {/* 1. Text box - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        We drifted through the markets and food streets, drawn by smells and colours more than anything else. The chocolate shops and flower market seemed to invite us to pause, taste, and just watch the city breathe.
                      </div>
                    </div>
                    
                    {/* 2. Flower Market - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Flower Market.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zFlower Market")}
                      />
                    </div>
                  </div>
                  
                  {/* Row 2: 1.5/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-36 md:h-44 mt-4 md:mt-0">
                    {/* 3. Confectionery Shop - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Confectionery Shop.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zConfectionery Shop")}
                      />
                    </div>
                    
                    {/* 4. Chocolate Shop - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Chocolate Shop.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zChocolate Shop")}
                      />
                    </div>
                  </div>
                  
                  {/* Row 3: 1.5/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-36 md:h-44 mt-4 md:mt-0">
                    {/* 5. Outdoor Market - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Outdoor Market.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zOutdoor Market")}
                      />
                    </div>
                    
                    {/* 6. Seafood Restaurant - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Seafood Restaurant.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zSeafood Restaurant")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Modern & Quirky Architecture */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Modern & Quirky Architecture
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - single row, no gap */}
                <div className="relative flex flex-col md:flex-row h-auto md:h-80 md:h-96">
                  {/* Left side: Images stacked - full width mobile, 3/5 desktop */}
                  <div className="w-full md:w-3/5 h-full md:h-full flex flex-col md:flex-col gap-2 md:gap-0">
                    {/* 1. Zaha Hadid Port House */}
                    <div className="flex-1 h-48 md:h-1/2 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Zaha Hadid Port House.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zZaha Hadid Port House")}
                      />
                    </div>
                    
                    {/* 3. Centraal Railway Station */}
                    <div className="flex-1 h-48 md:h-1/2 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-2 md:mt-0">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Centraal Railway Station.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zCentraal Railway Station")}
                      />
                    </div>
                  </div>
                  
                  {/* Right side: Text box - full width mobile, 2/5 desktop */}
                  <div className="w-full md:w-2/5 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                    <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                      The Port House by Zaha Hadid and the central station stunned us in very different ways - one futuristic, one monumental. Both made us stop, look up, and feel small in a good way.
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Evening & Light */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Evening & Light
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - two rows, no gap */}
                <div className="relative">
                  {/* Top Row: 3/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-80">
                    {/* 1. Text box - full width mobile, 2/3 desktop */}
                    <div className="w-full md:w-2/3 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        Evenings in Antwerp were quiet revelations. The city seemed to glow differently as the sun set, statues and castles caught in the amber light. Wandering felt endless but never tiring.
                      </div>
                    </div>
                    
                    {/* 2. Evening Glow - full width mobile, 1/3 desktop */}
                    <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Evening Glow.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zEvening Glow")}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row: 2/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-48 mt-4 md:mt-0">
                    {/* 3. Lange Wapper Statue - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Lange Wapper Statue.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zLange Wapper Statue")}
                      />
                    </div>
                    
                    {/* 4. Het Steen Castle - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Het Steen Castle.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zHet Steen Castle")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 8. Artistic Gallery */}
      <section id="gallery">
        <GalleryWall 
          images={galleryImages}
          title=""
          subtitle=""
          openLightbox={(index, images) => setLightboxIndex(index)}
        />
      </section>

      </div>
    </div>
    </>
  );
}