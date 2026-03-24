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
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCathedral of Our Lady.webp"), alt: "Cathedral", imageId: "zCathedral of Our Lady" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zFlower Market.webp"), alt: "Flower Market", imageId: "zFlower Market" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zZaha Hadid Port House.webp"), alt: "Port House", imageId: "zZaha Hadid Port House" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zStreet Mural.webp"), alt: "Street Mural", imageId: "zStreet Mural" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zChocolate Shop.webp"), alt: "Chocolate Shop", imageId: "zChocolate Shop" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCentraal Railway Station.webp"), alt: "Central Station", imageId: "zCentraal Railway Station" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zOutdoor Market.webp"), alt: "Outdoor Market", imageId: "zOutdoor Market" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zRustic Restaurant.webp"), alt: "Rustic Restaurant", imageId: "zRustic Restaurant" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zSeafood Restaurant.webp"), alt: "Seafood Restaurant", imageId: "zSeafood Restaurant" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zConfectionery Shop.webp"), alt: "Confectionery Shop", imageId: "zConfectionery Shop" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zEvening Glow.webp"), alt: "Evening Glow", imageId: "zEvening Glow" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Stone Bridge.webp"), alt: "Historic Stone Bridge", imageId: "zHistoric Stone Bridge" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zBustling Quay.webp"), alt: "Bustling Quay", imageId: "zBustling Quay" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHistoric Brick Buildings.webp"), alt: "Historic Brick Buildings", imageId: "zHistoric Brick Buildings" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zCobblestone Street.webp"), alt: "Cobblestone Street", imageId: "zCobblestone Street" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zGrote Markt.webp"), alt: "Grote Markt", imageId: "zGrote Markt" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zBrabo Statue.webp"), alt: "Brabo Statue", imageId: "zBrabo Statue" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zHet Steen Castle.webp"), alt: "Het Steen", imageId: "zHet Steen Castle" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zMedieval Tower.webp"), alt: "Medieval Tower", imageId: "zMedieval Tower" },
  { src: cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/zLange Wapper Statue.webp"), alt: "Lange Wapper Statue", imageId: "zLange Wapper Statue" }
];

export default function Antwerp({ openLightbox }) {
  const handleGalleryClick = (imageId) => {
    if (openLightbox) {
      const index = imageOrder.indexOf(imageId);
      if (index !== -1) {
        openLightbox(index, imageOrder.map(id => getImage(id)));
      }
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
    <div className="bg-black text-white relative" style={{ backgroundImage: `url(${darkGravelBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Background overlay to tone down gravel texture */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      <div className="relative z-10">
      <SEO
        title="Antwerp Diary | A Personal Journey Through Belgium's Hidden Gem"
        description="A personal diary of exploring Antwerp - from quiet medieval streets to modern architecture, discover the soul of Belgium's most underrated city."
        image={cloudinaryUrlFromLegacyPath(cathedralImage, { width: 1200 })}
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
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 md:p-12 border border-white/20"
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

      {/* 4. Recommendations (Places to Explore) */}
      <section id="places" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-16 text-[#b99f0f] font-handwriting">
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
                    <span className="px-2 py-1 bg-[#b99f0f]/20 text-[#b99f0f] text-xs md:text-sm font-semibold rounded-full uppercase tracking-wider">
                      {place.category || 'Landmark'}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">{place.name}</h3>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80">{place.description}</p>
                </div>
                <div className="order-1 md:order-1">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    loading="lazy"
                    onClick={() => handlePlacesImageClick(place.imageId)}
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
                    onClick={() => handlePlacesImageClick(place.imageId)}
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

      {/* 6. Places We Kept Coming Back To */}
      <section id="tips" className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-16 text-[#b99f0f] font-handwriting">
            Places We Kept Coming Back To
          </h2>

          <p className="text-white/50 italic mb-12 text-center">
            These aren't everything — just the places that stayed with us.
          </p>

          <div className="max-w-3xl mx-auto space-y-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Eat — Elfde Gebod</h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4 text-left">
                We ended up here without much planning and stayed longer than we meant to. Elfde Gebod is a bit different from anywhere else we'd eaten — filled with old statues, dim light, and just enough noise to feel alive without being overwhelming. It's the kind of place where you can take your time, order something simple, and let the setting do most of the work.
              </p>
              <img src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Rustic Restaurant.webp")} alt="Interior of Elfde Gebod, Antwerp" className="w-full h-auto mt-6 rounded-lg opacity-90 hover:opacity-100 transition duration-300" />
              <div className="flex items-center justify-between gap-24 mt-6">
                <a href="https://www.google.com/maps/search/?api=1&query=Elfde+Gebod+Antwerp" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40">See it on the map</a>
                <div className="flex-grow"></div>
                <a href="https://www.facebook.com/elfdegebodantwerpen/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20"
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
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Wander</h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4 text-left">
                Most of our time was spent just walking. Around the Grote Markt, down towards Het Eilandje, and along the river where the city opens up a little. No real route — just following whatever looked interesting.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">Practical</h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4 text-left">
                The Antwerp City Card is worth it if you're planning to dip in and out of museums or use transport. Otherwise, the centre is easy enough to explore on foot.
              </p>
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
      <GalleryWall 
        images={galleryImages}
        openLightbox={(index, imgs) => {
          openLightbox(index, imgs.map(img => getImage(img.imageId)));
        }}
        title="Gallery"
        subtitle="Visual highlights from Antwerp"
      />

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
