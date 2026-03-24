import { motion } from "framer-motion";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import SEO from "../components/SEO";
import DiaryHeroAntwerp from "../components/DiaryHeroAntwerp";
import GalleryWall from "../components/GalleryWall";
import darkGravelBg from "../assets/images/dark-gravel-background-template.webp";

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

const galleryImages = [
  // Group 1: Markets & Food
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zConfectionery Shop.webp"), alt: "Confectionery Shop", imageId: "zConfectionery Shop", category: "markets-food" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zChocolate Shop.webp"), alt: "Chocolate Shop", imageId: "zChocolate Shop", category: "markets-food" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zOutdoor Market.webp"), alt: "Outdoor Market", imageId: "zOutdoor Market", category: "markets-food" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zRustic Restaurant.webp"), alt: "Rustic Restaurant", imageId: "zRustic Restaurant", category: "markets-food" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zSeafood Restaurant.webp"), alt: "Seafood Restaurant", imageId: "zSeafood Restaurant", category: "markets-food" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zFlower Market.webp"), alt: "Flower Market", imageId: "zFlower Market", category: "markets-food" },
  
  // Group 2: Historic Architecture
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zGrote Markt.webp"), alt: "Grote Markt", imageId: "zGrote Markt", category: "historic" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zBrabo Statue.webp"), alt: "Brabo Statue", imageId: "zBrabo Statue", category: "historic" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCathedral of Our Lady.webp"), alt: "Cathedral of Our Lady", imageId: "zCathedral of Our Lady", category: "historic" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Brick Buildings.webp"), alt: "Historic Brick Buildings", imageId: "zHistoric Brick Buildings", category: "historic" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Stone Bridge.webp"), alt: "Historic Stone Bridge", imageId: "zHistoric Stone Bridge", category: "historic" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zMedieval Tower.webp"), alt: "Medieval Tower", imageId: "zMedieval Tower", category: "historic" },
  
  // Group 3: Modern & Waterfront
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCentraal Railway Station.webp"), alt: "Central Station", imageId: "zCentraal Railway Station", category: "modern-waterfront" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCobblestone Street.webp"), alt: "Cobblestone Street", imageId: "zCobblestone Street", category: "modern-waterfront" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zEvening Glow.webp"), alt: "Evening Glow", imageId: "zEvening Glow", category: "modern-waterfront" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHet Steen Castle.webp"), alt: "Het Steen", imageId: "zHet Steen Castle", category: "modern-waterfront" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zLange Wapper Statue.webp"), alt: "Lange Wapper Statue", imageId: "zLange Wapper Statue", category: "modern-waterfront" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zStreet Mural.webp"), alt: "Street Mural", imageId: "zStreet Mural", category: "modern-waterfront" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zZaha Hadid Port House.webp"), alt: "Port House", imageId: "zZaha Hadid Port House", category: "modern-waterfront" }
];

export default function Antwerp({ openLightbox }) {
  // Define image order for the lightbox
  const imageOrder = [
    "zGrote Markt", "zBrabo Statue", "zCathedral of Our Lady", "zHistoric Brick Buildings", "zCobblestone Street",
    "zHet Steen Castle", "zMedieval Tower", "zHistoric Stone Bridge", "zBustling Quay",
    "zChocolate Shop", "zConfectionery Shop", "zOutdoor Market", "zFlower Market",
    "zCentraal Railway Station", "zRustic Restaurant", "zSeafood Restaurant",
    "zLange Wapper Statue", "zStreet Mural", "zEvening Glow", "zZaha Hadid Port House"
  ];

  const getImage = (id) => ({
    id: id,
    image: `/images/Belgium/Antwerp/Small/${id}.webp`,
    lightboxImage: `/images/Belgium/Antwerp/Full/${id.replace('z', '')}.webp`,
    expandedImage: `/images/Belgium/Antwerp/Small/${id.replace('z', '')}.webp`,
    title: id.replace('z', '').replace(/([A-Z])/g, ' $1').trim(),
    description: `Antwerp ${id.replace('z', '').replace(/([A-Z])/g, ' $1').trim()}` 
  });

  const handleOpenLightbox = (imageId) => {
    if (openLightbox) {
      const index = imageOrder.indexOf(imageId);
      if (index !== -1) {
        openLightbox(index, imageOrder.map(id => getImage(id)));
      }
    }
  };

  const handleKeyDown = (e, imageId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenLightbox(imageId);
    }
  };

  return (
    <div className="bg-black text-white relative" style={{ backgroundImage: `url(${darkGravelBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Background overlay to tone down gravel texture */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      <div className="relative z-10">
      <SEO
        title="Antwerp Diary | A Personal Journey Through Belgium's Hidden Gem"
        description="A personal diary of exploring Antwerp - from quiet medieval streets to modern architecture, discover the soul of Belgium's most underrated city."
        image="/images/Belgium/Antwerp/Small/Cathedral of Our Lady.webp"
        slug="belgium/antwerp"
      />

      {/* 1. Diary Hero with Integrated Navigation */}
      <DiaryHeroAntwerp />

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
              We spent most of our time just <span className="text-white/70 font-medium">wandering</span> — through quiet streets, past old stone buildings, stopping when something caught our attention.
              <br />
              There wasn't any pressure to see everything, which made it easier to actually enjoy what we did see.
              <br /><br />
              It's an <span className="text-white/70 font-medium">easy place to slow down</span> without trying.
            </p>
          </motion.div>
      </section>

      {/* 4. A Few Places Along the Way */}
      <section id="places" className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-16 text-[#b99f0f] font-handwriting">
            A Few Places Along the Way
          </h2>

          <div className="max-w-4xl mx-auto space-y-12 px-4 sm:px-6">
            {/* Cathedral & Grote Markt */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Cathedral of Our Lady & Grote Markt
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                <div className="relative space-y-4">
                  {/* Top Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 1. Text box */}
                    <div className="w-full md:w-2/3 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center">
                      <div className="text-sm md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-white/80 tracking-wide">
                        We kept finding ourselves back near the Cathedral of Our Lady — its soaring towers always drew our gaze, no matter which street we wandered down. The Grote Markt nearby felt alive and timeless, with the Brabo Statue standing quietly in the middle, like a reminder that history lingers everywhere here.
                      </div>
                    </div>
                    
                    {/* 2. Cathedral tower */}
                    <div className="w-full md:w-1/3 aspect-[3/4] md:aspect-auto overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cathedralImage}
                        alt="Cathedral of Our Lady"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zCathedral of Our Lady")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zCathedral of Our Lady")}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 3. Brabo statue */}
                    <div className="w-full md:w-2/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={braboStatueImage}
                        alt="Brabo Statue"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zBrabo Statue")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zBrabo Statue")}
                      />
                    </div>
                    
                    {/* 4. Grote Markt */}
                    <div className="w-full md:w-3/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={groteMarktImage}
                        alt="Grote Markt"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zGrote Markt")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zGrote Markt")}
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
                <div className="relative space-y-4">
                  {/* Top Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 1. Historic Brick Buildings */}
                    <div className="w-full md:w-2/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Historic Brick Buildings.webp")} 
                        alt="Historic Brick Buildings"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zHistoric Brick Buildings")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zHistoric Brick Buildings")}
                      />
                    </div>
                    
                    {/* 2. Text box */}
                    <div className="w-full md:w-3/5 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        The old town hides quiet corners. Walking down cobblestone streets past medieval towers and stone bridges felt like slipping back in time. We lingered, imagining the stories held in the bricks.
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 3. Cobblestone Street */}
                    <div className="w-full md:w-1/3 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Cobblestone Street.webp")} 
                        alt="Cobblestone Street"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zCobblestone Street")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zCobblestone Street")}
                      />
                    </div>
                    
                    {/* 4. Historic Stone Bridge */}
                    <div className="w-full md:w-1/3 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Historic Stone Bridge.webp")} 
                        alt="Historic Stone Bridge"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zHistoric Stone Bridge")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zHistoric Stone Bridge")}
                      />
                    </div>
                    
                    {/* 5. Medieval Tower */}
                    <div className="w-full md:w-1/3 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={medievalTowerImage}
                        alt="Medieval Tower"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zMedieval Tower")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zMedieval Tower")}
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
                <div className="relative space-y-4">
                  {/* Row 1 */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 1. Text box */}
                    <div className="w-full md:w-3/5 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        We drifted through the markets and food streets, drawn by smells and colours more than anything else. The chocolate shops and flower market seemed to invite us to pause, taste, and just watch the city breathe.
                      </div>
                    </div>
                    
                    {/* 2. Flower Market */}
                    <div className="w-full md:w-2/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={flowerMarketImage}
                        alt="Flower Market"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zFlower Market")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zFlower Market")}
                      />
                    </div>
                  </div>
                  
                  {/* Row 2 */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 3. Confectionery Shop */}
                    <div className="w-full md:w-2/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Confectionery Shop.webp")} 
                        alt="Confectionery Shop"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zConfectionery Shop")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zConfectionery Shop")}
                      />
                    </div>
                    
                    {/* 4. Chocolate Shop */}
                    <div className="w-full md:w-3/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={chocolateShopImage}
                        alt="Chocolate Shop"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zChocolate Shop")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zChocolate Shop")}
                      />
                    </div>
                  </div>
                  
                  {/* Row 3 */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 5. Outdoor Market */}
                    <div className="w-full md:w-3/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Outdoor Market.webp")} 
                        alt="Outdoor Market"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zOutdoor Market")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zOutdoor Market")}
                      />
                    </div>
                    
                    {/* 6. Seafood Restaurant */}
                    <div className="w-full md:w-2/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Seafood Restaurant.webp")} 
                        alt="Seafood Restaurant"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zSeafood Restaurant")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zSeafood Restaurant")}
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
                <div className="relative flex flex-col md:flex-row gap-4">
                  {/* Left side: Images stacked */}
                  <div className="w-full md:w-3/5 flex flex-col gap-4">
                    {/* 1. Zaha Hadid Port House */}
                    <div className="w-full aspect-video md:aspect-[2/1] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={portHouseImage}
                        alt="Zaha Hadid Port House"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zZaha Hadid Port House")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zZaha Hadid Port House")}
                      />
                    </div>
                    
                    {/* 3. Centraal Railway Station */}
                    <div className="w-full aspect-video md:aspect-[2/1] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={stationImage}
                        alt="Centraal Railway Station"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zCentraal Railway Station")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zCentraal Railway Station")}
                      />
                    </div>
                  </div>
                  
                  {/* Right side: Text box */}
                  <div className="w-full md:w-2/5 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center">
                    <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                      The Port House by Zaha Hadid and the central station stunned us in very different ways — one futuristic, one monumental. Both made us stop, look up, and feel small in a good way.
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
                <div className="relative space-y-4">
                  {/* Top Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 1. Text box */}
                    <div className="w-full md:w-2/3 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 flex items-center">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        Evenings in Antwerp were quiet revelations. The city seemed to glow differently as the sun set, statues and castles caught in the amber light. Wandering felt endless but never tiring.
                      </div>
                    </div>
                    
                    {/* 2. Evening Glow */}
                    <div className="w-full md:w-1/3 aspect-video md:aspect-auto overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Evening Glow.webp")} 
                        alt="Evening Glow"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zEvening Glow")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zEvening Glow")}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 3. Lange Wapper Statue */}
                    <div className="w-full md:w-2/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Lange Wapper Statue.webp")} 
                        alt="Lange Wapper Statue"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zLange Wapper Statue")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zLange Wapper Statue")}
                      />
                    </div>
                    
                    {/* 4. Het Steen Castle */}
                    <div className="w-full md:w-3/5 aspect-video md:aspect-[3/2] overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={hetSteenImage}
                        alt="Het Steen Castle"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, "zHet Steen Castle")}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleOpenLightbox("zHet Steen Castle")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 6. Places We Kept Coming Back To */}
      <section id="tips" className="relative py-16 px-6">
        {/* Cinematic Hero Image */}
        <div className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center mb-16">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={groteMarktImage}
              alt="Antwerp Cityscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </motion.div>

          <div className="relative z-10 text-center max-w-4xl px-4 mt-0 md:mt-[-5vh]">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-[#d4af37] font-handwriting drop-shadow-2xl bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.95)' }}>
                Places We Kept Coming Back To
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-white/40"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Eat — Elfde Gebod</h3>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="order-2 md:order-1">
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
                    We ended up here without much planning and stayed longer than we meant to. Elfde Gebod is a bit different from anywhere else we'd eaten — filled with old statues, dim light, and just enough noise to feel alive without being overwhelming.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
                    It's the kind of place where you can take your time, order something simple, and let the setting do most of the work.
                  </p>
                  <div className="flex items-center justify-between gap-24 mt-6">
                    <a href="https://www.google.com/maps/search/?api=1&query=Elfde+Gebod+Antwerp" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40">See it on the map</a>
                    <div className="flex-grow"></div>
                    <a href="https://www.facebook.com/elfdegebodantwerpen/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                    <img src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Rustic Restaurant.webp")} alt="Interior of Elfde Gebod, Antwerp" className="absolute inset-0 w-full h-full object-cover object-center opacity-90 hover:opacity-100 transition duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-white/40"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Drink — Billie's</h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4 text-left">
                Evenings felt best when we kept things simple. Billie's Bier Kafetaria felt like the kind of place we would've settled into — small, slightly tucked away, and easy to lose track of time in. A long beer list, a relaxed atmosphere, and no real pressure to move on once you're in.
              </p>
              <div className="flex items-center justify-between gap-24">
                <a href="https://www.google.com/maps/search/?api=1&query=Billie's+Bier+Kafetaria+Antwerp" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40">See it on the map</a>
                <div className="flex-grow"></div>
                <a href="https://www.instagram.com/billiesbierkafetaria/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                </a>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-white/50">
                <a href="https://www.instagram.com/billies_craft/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/billiescraftbeer/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-white/40"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Wander — Towards the Water</h3>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="order-2 md:order-1">
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
                    Most of our time ended up being unplanned. We'd start somewhere central, around Grote Markt, and just keep walking without much of a route.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
                    The city shifts as you move through it. Busier streets give way to quieter ones, and then open out again as you get closer to Het Eilandje and the water.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
                    We didn't feel the need to see everything. Just following whatever caught our attention was enough.
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                    <img src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Street Mural.webp")} alt="Street mural in Antwerp" className="absolute inset-0 w-full h-full object-cover object-center opacity-90 hover:opacity-100 transition duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border-2 border-white/40"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Practical — Getting Around</h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4 text-left">
                If you're planning to dip in and out of museums or use public transport, the Antwerp City Card is worth a look. It covers most of the main spots and makes things easier if you're moving around a bit.
              </p>
              <a href="https://visit.antwerpen.be/antwerpcitypass" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors mt-3 inline-block underline decoration-white/20 hover:decoration-white/40">More info</a>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4 mt-4 text-left">
                We mostly stayed on foot — the centre's compact enough that you don't really need much else.
              </p>
            </motion.div>
          </div>
      </section>

      {/* 7. Local Insight */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#b99f0f]/10 backdrop-blur-md rounded-xl p-8 border border-[#b99f0f]/30"
          >
            <h3 className="text-3xl font-bold mb-4 text-[#b99f0f] font-handwriting">Did You Know?</h3>
            <p className="text-xl leading-relaxed text-white/90">
              Antwerp is the world's <span className="font-bold text-[#b99f0f]">diamond capital</span> – over 80% of the world's rough diamonds pass through the city's diamond district. 
              But locals will tell you the real gems are the <span className="font-bold text-[#b99f0f]">hidden courtyards</span> and along the Scheldt River at sunset.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. Artistic Gallery */}
      <section id="gallery">
        <GalleryWall 
          images={galleryImages}
          openLightbox={(index, imgs) => {
            openLightbox(index, imgs.map(img => getImage(img.imageId)));
          }}
          title="Gallery"
          subtitle="Visual highlights from Antwerp"
        />
      </section>

      {/* 9. Closing Reflection */}
      <section className="py-16 md:py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl md:max-w-5xl mx-auto"
        >
          <p className="text-3xl md:text-4xl leading-relaxed text-white/90 font-serif italic">
            Antwerp <span className="text-[#b99f0f] text-4xl md:text-5xl">stays with you</span>. Not in loud memories, but in <span className="text-[#b99f0f] text-4xl md:text-5xl">quiet moments</span> — 
            when you taste chocolate that reminds you of that little shop, 
            or see cathedral light that feels familiar.
          </p>
          <div className="mt-12 md:mt-16">
            <a 
              href="/belgium" 
              className="inline-block px-8 py-4 md:px-10 md:py-5 bg-[#b99f0f] text-black font-medium rounded-full hover:bg-[#b99f0f]/90 transition-colors duration-200 text-lg"
            >
              Back to Belgium
            </a>
          </div>
        </motion.div>
      </section>
      </div>
    </div>
  );
}
