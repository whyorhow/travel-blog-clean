import { motion } from "framer-motion";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import SEO from "../components/SEO";
import DiaryHeroAntwerp from "../components/DiaryHeroAntwerp";

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
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCathedral of Our Lady.webp"), alt: "Cathedral", imageId: "zCathedral of Our Lady", caption: "Gothic masterpiece" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zFlower Market.webp"), alt: "Flower Market", imageId: "zFlower Market", caption: "Fresh blooms daily" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zZaha Hadid Port House.webp"), alt: "Port House", imageId: "zZaha Hadid Port House", caption: "Modern architecture" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zStreet Mural.webp"), alt: "Street Mural", imageId: "zStreet Mural", caption: "Urban art scene" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zChocolate Shop.webp"), alt: "Chocolate Shop", imageId: "zChocolate Shop", caption: "Belgian treats" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCentraal Railway Station.webp"), alt: "Central Station", imageId: "zCentraal Railway Station", caption: "Historic transport" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zOutdoor Market.webp"), alt: "Outdoor Market", imageId: "zOutdoor Market", caption: "Local commerce" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zRustic Restaurant.webp"), alt: "Rustic Restaurant", imageId: "zRustic Restaurant", caption: "Traditional dining" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zSeafood Restaurant.webp"), alt: "Seafood Restaurant", imageId: "zSeafood Restaurant", caption: "Maritime cuisine" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zConfectionery Shop.webp"), alt: "Confectionery Shop", imageId: "zConfectionery Shop", caption: "Sweet delights" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zEvening Glow.webp"), alt: "Evening Glow", imageId: "zEvening Glow", caption: "Golden hour" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Stone Bridge.webp"), alt: "Historic Stone Bridge", imageId: "zHistoric Stone Bridge", caption: "River crossing" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zBustling Quay.webp"), alt: "Bustling Quay", imageId: "zBustling Quay", caption: "Port activity" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Brick Buildings.webp"), alt: "Historic Brick Buildings", imageId: "zHistoric Brick Buildings", caption: "Heritage architecture" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCobblestone Street.webp"), alt: "Cobblestone Street", imageId: "zCobblestone Street", caption: "Medieval pathways" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zGrote Markt.webp"), alt: "Grote Markt", imageId: "zGrote Markt", caption: "Main square" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zBrabo Statue.webp"), alt: "Brabo Statue", imageId: "zBrabo Statue", caption: "Legendary figure" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHet Steen Castle.webp"), alt: "Het Steen", imageId: "zHet Steen Castle", caption: "Medieval castle" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zMedieval Tower.webp"), alt: "Medieval Tower", imageId: "zMedieval Tower", caption: "Historic landmark" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zLange Wapper Statue.webp"), alt: "Lange Wapper Statue", imageId: "zLange Wapper Statue", caption: "Local legend" }
];

export default function Antwerp({ openLightbox }) {
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
    image: cloudinaryUrlFromLegacyPath(`/images/Belgium/Antwerp/Small/${id}.webp`),
    lightboxImage: cloudinaryUrlFromLegacyPath(`/images/Belgium/Antwerp/Full/${id.replace('z', '')}.webp`),
    expandedImage: cloudinaryUrlFromLegacyPath(`/images/Belgium/Antwerp/Small/${id.replace('z', '')}.webp`),
    title: id.replace('z', '').replace(/([A-Z])/g, ' $1').trim(),
    description: `Antwerp ${id.replace('z', '').replace(/([A-Z])/g, ' $1').trim()}` 
  });

  return (
    <div className="bg-black text-white">
      <SEO
        title="Antwerp Diary | A Personal Journey Through Belgium's Hidden Gem"
        description="A personal diary of exploring Antwerp - from quiet medieval streets to modern architecture, discover the soul of Belgium's most underrated city."
        image="/images/Belgium/Antwerp/Small/Cathedral of Our Lady.webp"
        slug="belgium/antwerp"
      />

      {/* 1. Diary Hero with Integrated Navigation */}
      <DiaryHeroAntwerp openLightbox={openLightbox} />

      {/* 3. Overview / The Experience */}
      <section id="overview" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFD700]/10 backdrop-blur-md rounded-xl p-8 md:p-12 border border-[#FFD700]/30"
          >
            <p className="text-xl md:text-2xl leading-relaxed md:leading-normal text-white/90 font-serif">
              Discover Antwerp beyond the surface. From bold architecture to tucked-away gems, every turn holds something worth seeing. Explore recommendations, tips, and visual highlights in the sections below.
            </p>
          </motion.div>
      </section>

      {/* 4. Recommendations (Places to Explore) */}
      <section id="places" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-16 text-[#FFD700] font-handwriting">
            Places to Explore
          </h2>

          {/* Featured Place - Side by side (image left, text right) */}
          {places.filter(p => p.featured).map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-20"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs md:text-sm font-semibold rounded-full uppercase tracking-wider">
                      {place.category || 'Landmark'}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FFD700]">{place.name}</h3>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80">{place.description}</p>
                </div>
                <div className="order-1 md:order-1">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    loading="lazy"
                    onClick={() => handleImageClick(place.imageId)}
                    onKeyDown={(e) => e.key === 'Enter' && handleImageClick(place.imageId)}
                    tabIndex={0}
                    role="button"
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Alternating Places - Side by side with alternating sides */}
          {places.filter(p => !p.featured).map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-8 md:mb-16"
            >
              <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'order-2' : 'order-1'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs md:text-sm font-semibold rounded-full uppercase tracking-wider">
                      {place.category || 'Experience'}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#FFD700]">{place.name}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-white/80">{place.description}</p>
                </div>
                <div className={index % 2 === 1 ? 'order-1' : 'order-2'}>
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    loading="lazy"
                    onClick={() => handleImageClick(place.imageId)}
                    onKeyDown={(e) => e.key === 'Enter' && handleImageClick(place.imageId)}
                    tabIndex={0}
                    role="button"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Visual Break */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={groteMarktImage}
          alt="Antwerp Cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </section>

      {/* 6. Travel Tips */}
      <section id="tips" className="py-16 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-16 text-[#FFD700] font-handwriting">
            Travel Tips
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 hover:bg-white/15 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-white">Getting Around</h3>
              </div>
              <ul className="space-y-2 text-base md:text-lg text-white/80">
                <li>• Walk the historic center - compact and pedestrian-friendly</li>
                <li>• Tram network connects all major attractions</li>
                <li>• Bike rentals available for exploring like a local</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 hover:bg-white/15 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-white">Best Time</h3>
              </div>
              <ul className="space-y-2 text-base md:text-lg text-white/80">
                <li>• Spring (April-June): mild weather, blooming squares</li>
                <li>• Summer: vibrant outdoor cafés and festivals</li>
                <li>• September: perfect for combining with Brussels</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 hover:bg-white/15 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-white">Budget Tips</h3>
              </div>
              <ul className="space-y-2 text-base md:text-lg text-white/80">
                <li>• Antwerp City Card: free museums + public transport</li>
                <li>• Monday museum visits often free for residents</li>
                <li>• Market days: fresh, affordable local food</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 hover:bg-white/15 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-white">Local Favorites</h3>
              </div>
              <ul className="space-y-2 text-base md:text-lg text-white/80">
                <li>• 'Frituur' for authentic Belgian fries</li>
                <li>• 'De Koninck' brewery tours and tasting</li>
                <li>• 'Het Eilandje' for maritime atmosphere</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Local Insight */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFD700]/10 backdrop-blur-md rounded-xl p-8 border border-[#FFD700]/30"
          >
            <h3 className="text-3xl font-bold mb-4 text-[#FFD700] font-handwriting">Did You Know?</h3>
            <p className="text-xl leading-relaxed text-white/90">
              Antwerp is the world's <span className="font-bold text-[#FFD700]">diamond capital</span> – over 80% of the world's rough diamonds pass through the city's diamond district. 
              But locals will tell you the real gems are the <span className="font-bold text-[#FFD700]">hidden courtyards</span> and along the Scheldt River at sunset.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. Artistic Gallery */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-bold text-center mb-24 text-[#FFD700] font-handwriting"
          >
            Gallery
          </motion.h2>

          <div className="flex flex-col gap-24 md:gap-48 px-6 md:px-12 lg:px-16">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer items-center ${
                  index % 2 === 0 ? 'md:items-start md:translate-x-[-10%]' : 'md:items-end md:translate-x-[10%]'
                }`}
                onClick={() => handleImageClick(image.imageId)}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick(image.imageId)}
                tabIndex={0}
                role="button"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 max-w-2xl">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <img src={image.src} alt={image.alt} className="w-full h-64 md:h-auto object-contain md:object-contain shadow-2xl" loading="lazy" />
                  </div>
                  <div className="max-w-[170px] p-2 bg-white/40 backdrop-blur-md border-l border-[#FFD700]/60 md:hidden">
                    <h4 className="text-black text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1 font-cormorant leading-tight">
                      {image.alt}
                    </h4>
                    <div className="mt-1.5 w-4 h-[1px] bg-[#FFD700]/70" />
                    <p className="text-black text-[8px] sm:text-[10px] mt-2 italic font-serif leading-tight">
                      {image.caption}
                    </p>
                  </div>
                  <div className="hidden md:block max-w-[170px] p-2 bg-white/40 backdrop-blur-md border-l border-[#FFD700]/60">
                    <h4 className="text-black text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1 font-cormorant leading-tight">
                      {image.alt}
                    </h4>
                    <div className="mt-1.5 w-4 h-[1px] bg-[#FFD700]/70" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            Antwerp <span className="text-[#FFD700] text-4xl md:text-5xl">stays with you</span>. Not in loud memories, but in <span className="text-[#FFD700] text-4xl md:text-5xl">quiet moments</span> — 
            when you taste chocolate that reminds you of that little shop, 
            or see cathedral light that feels familiar.
          </p>
          <div className="mt-12 md:mt-16">
            <a 
              href="/belgium" 
              className="inline-block px-8 py-4 md:px-10 md:py-5 bg-[#FFD700] text-black font-medium rounded-full hover:bg-[#FFD700]/90 transition-colors duration-200 text-lg"
            >
              Back to Belgium
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
