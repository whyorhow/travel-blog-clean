import { motion } from "framer-motion";
import { useState } from "react";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import SEO from "../components/SEO";
import DiaryHeroBudapest from "../components/DiaryHeroBudapest";
import GalleryWall from "../components/GalleryWall";
import SimpleLightbox from "../components/SimpleLightbox";
import darkGravelBg from "../assets/images/soil-background5.webp";
import diaryImg from "../assets/images/Diary Budapest.webp";
import artImages from "../assets/artImages.json";

/* =========================
   CLOUDINARY IMAGES (PRESERVED + STANDARDISED)
========================= */

const szechenyiHero = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Outside Széchenyi Baths.webp");
const heroesSquare = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Heroes' Square.webp");
const millenniumMonument = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Millennium Monument.webp");
const vajdahunyadCastle = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Vajdahunyad Castle.webp");
const vajdahunyadEntrance = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Entrance to Vajdahunyad Castle.webp");
const outsideBaths = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Outside Széchenyi Baths.webp");
const szechenyiBaths = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Széchenyi Thermal Baths.webp");
const jakChapel = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Ják Chapel.webp");
const mulberryGarden = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Mulberry Garden (Epreskert).webp");
const yellowDoor = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Yellow Weathered Door.webp");
const newYorkCafe = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/New York Café.webp");
const cafeBalcony = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Café Balcony.webp");
const karolyiStatue = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Count Sándor Károlyi Statue.webp");
const historicBuilding = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Outside Széchenyi Baths.webp");
const danubeRiver = cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zDanube River.webp");

/* =========================
   MASTER IMAGE ORDER (LIGHTBOX - PRESERVED LOGIC)
========================= */

const images = [
  szechenyiHero,
  heroesSquare,
  millenniumMonument,
  vajdahunyadCastle,
  vajdahunyadEntrance,
  outsideBaths,
  szechenyiBaths,
  jakChapel,
  mulberryGarden,
  yellowDoor,
  newYorkCafe,
  cafeBalcony,
  karolyiStatue,
  historicBuilding,
  danubeRiver,
];

/* =========================
   ORIGINAL STRUCTURED DATA (RESTORED)
========================= */

const explorePlaces = [
  { id: "heroes", name: "Heroes' Square", image: heroesSquare },
  { id: "millennium", name: "Millennium Monument", image: millenniumMonument },
  { id: "castle", name: "Vajdahunyad Castle", image: vajdahunyadCastle },
  { id: "entrance", name: "Castle Entrance", image: vajdahunyadEntrance },
  { id: "outside", name: "Outside Széchenyi Baths", image: outsideBaths },
  { id: "baths", name: "Széchenyi Baths", image: szechenyiBaths },
  { id: "chapel", name: "Ják Chapel", image: jakChapel },
];

const favouritesPlaces = [
  { id: "garden", name: "Mulberry Garden", image: mulberryGarden },
  { id: "door", name: "Yellow Door", image: yellowDoor },
  { id: "cafe", name: "New York Café", image: newYorkCafe },
  { id: "balcony", name: "Café Balcony", image: cafeBalcony },
  { id: "statue", name: "Károlyi Statue", image: karolyiStatue },
];

// Three rooms structure for gallery
const rooms = [
  {
    id: "first-impressions",
    title: "First Impressions",
    subtitle: "keep - it's solid and not overdone",
    images: [
      { id: "zHeroes' Square", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zHeroes' Square.webp") },
      { id: "zMillennium Monument", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zMillennium Monument.webp") },
      { id: "zVajdahunyad Castle", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zVajdahunyad Castle.webp") },
      { id: "zEntrance to Vajdahunyad Castle", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zEntrance to Vajdahunyad Castle.webp") },
    ]
  },
  {
    id: "closer-look",
    title: "Closer Look",
    subtitle: "works well - simple and observational",
    images: [
      { id: "zJák Chapel", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zJák Chapel.webp") },
      { id: "zHistoric Building", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zHistoric Building.webp") },
      { id: "zYellow Weathered Door", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zYellow Weathered Door.webp") },
      { id: "zCount Sándor Károlyi Statue", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zCount Sándor Károlyi Statue.webp") },
    ]
  },
  {
    id: "taking-it-slower",
    title: "Taking It Slower",
    subtitle: "this keeps your tone but removes the 'written' feel\nreads like something you'd naturally say rather than label",
    images: [
      { id: "zDanube River", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zDanube River.webp") },
      { id: "zOutside Széchenyi Baths", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zOutside Széchenyi Baths.webp") },
      { id: "zSzéchenyi Thermal Baths", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zSzéchenyi Thermal Baths.webp") },
      { id: "zNew York Café", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zNew York Café.webp") },
      { id: "zCafé Balcony", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zCafé Balcony.webp") },
      { id: "zMulberry Garden", image: cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/zMulberry Garden.webp") },
    ]
  }
];

const galleryPlaces = [
  { id: "building", name: "Historic Building", image: historicBuilding },
  { id: "danube", name: "Danube River", image: danubeRiver },
];

// Filter and transform Budapest images from artImages.json to match GalleryWall structure
const galleryImages = artImages
  .filter(image => image.image && image.image.includes("/Hungary/Budapest/Small/"))
  .map(image => ({
    src: cloudinaryUrlFromLegacyPath(image.image),
    alt: image.title,
    imageId: image.imageId,
    // Preserve original fields for lightbox
    image: image.image,
    lightboxImage: image.lightboxImage,
    title: image.title,
    description: image.description,
    category: image.category,
    gumroadLink: image.gumroadLink,
    shopLink: image.shopLink,
    storyLink: image.storyLink
  }));


/* =========================
   COMPONENT
========================= */

export default function Budapest({ openLightbox }) {
  const [heroLightboxIndex, setHeroLightboxIndex] = useState(-1);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(-1);

  const handleGalleryClick = (imageOrIndex) => {
    // If it's a number (index), use it directly
    if (typeof imageOrIndex === 'number') {
      setGalleryLightboxIndex(imageOrIndex);
      return;
    }
    
    // If it's an image object, find the index
    if (imageOrIndex && imageOrIndex.imageId) {
      const index = galleryImages.findIndex(img => img.imageId === imageOrIndex.imageId);
      if (index !== -1) {
        setGalleryLightboxIndex(index);
      }
    }
  };

  const handlePlacesImageClick = (imageId) => {
    if (openLightbox) {
      // Create array of places images using regular (non-z) paths for thumbnails and /Full for lightbox
      const placesImages = [
        { 
          image: "/images/Hungary/Budapest/Small/Heroes' Square.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Heroes' Square.webp",
          imageId: "heroes-square", 
          alt: "Heroes' Square",
          title: "Heroes' Square",
          description: "constructed in 1896 to commemorate the 1,000th anniversary of the arrival of the Magyars in the Carpathian Basin.",
          category: "First Impressions",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=First Impressions",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Millennium Monument.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Millennium Monument.webp",
          imageId: "millennium-monument", 
          alt: "Millennium Monument",
          title: "Millennium Monument",
          description: "The central column is 36 meters tall and topped by a statue of the Archangel Gabriel holding the Hungarian crown and a double cross.",
          category: "First Impressions",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=First Impressions",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Vajdahunyad Castle.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Vajdahunyad Castle.webp",
          imageId: "vajdahunyad-castle", 
          alt: "Vajdahunyad Castle",
          title: "Vajdahunyad Castle",
          description: "It is a popular venue for events and festivals.",
          category: "First Impressions",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=First Impressions",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Entrance to Vajdahunyad Castle.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Entrance to Vajdahunyad Castle.webp",
          imageId: "vajdahunyad-entrance", 
          alt: "Entrance to Vajdahunyad Castle",
          title: "Entrance to Vajdahunyad Castle",
          description: "The castle was built in 1896 for the Millennial Exhibition to celebrate 1,000 years of Hungary.",
          category: "First Impressions",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=First Impressions",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Ják Chapel.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Ják Chapel.webp",
          imageId: "jak-chapel", 
          alt: "Ják Chapel",
          title: "Ják Chapel",
          description: "It is a small Romanesque chapel featuring an intricate facade decorated with religious statues and a prominent bell tower.",
          category: "Closer Look",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Closer Look",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Historic Building.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Historic Building.webp",
          imageId: "historic-building", 
          alt: "Historic Building",
          title: "Historic Building",
          description: "historic residential building located at Szondi",
          category: "Closer Look",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Closer Look",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Yellow Weathered Door.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Yellow Weathered Door.webp",
          imageId: "yellow-door", 
          alt: "Yellow Weathered Door",
          title: "Yellow Weathered Door",
          description: "vintage door exhibiting peeling paint, ornate carvings, and historical hardware",
          category: "Closer Look",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Closer Look",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Count Sándor Károlyi Statue.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Count Sándor Károlyi Statue.webp",
          imageId: "karolyi-statue", 
          alt: "Count Sándor Károlyi Statue",
          title: "Count Sándor Károlyi Statue",
          description: "Count Sándor Károlyi (1831-1906) was a prominent Hungarian politician",
          category: "Closer Look",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Closer Look",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Danube River.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Danube River.webp",
          imageId: "danube-river", 
          alt: "Danube River",
          title: "Danube River",
          description: "Budapest University of Technology and Economics located along the Danube River in Budapest.",
          category: "Taking It Slower",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Taking It Slower",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Outside Széchenyi Baths.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Outside Széchenyi Baths.webp",
          imageId: "outside-baths", 
          alt: "Outside Széchenyi Baths",
          title: "Outside Széchenyi Baths",
          description: "Neo-Baroque architectural style",
          category: "Taking It Slower",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Taking It Slower",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Széchenyi Thermal Baths.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Széchenyi Thermal Baths.webp",
          imageId: "szechenyi-baths", 
          alt: "Széchenyi Thermal Baths",
          title: "Széchenyi Thermal Baths",
          description: "he spring waters were discovered in the 1880s, and the bath complex opened in 1913, making it one of the largest medicinal bath complexes in Europe",
          category: "Taking It Slower",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Taking It Slower",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/New York Café.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/New York Café.webp",
          imageId: "new-york-cafe", 
          alt: "New York Café",
          title: "New York Café",
          description: "often recognized as one of the most beautiful cafés in the world.",
          category: "Taking It Slower",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Taking It Slower",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Café Balcony.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Café Balcony.webp",
          imageId: "cafe-balcony", 
          alt: "Café Balcony",
          title: "Café Balcony",
          description: "historically a central hub for Hungarian artists, writers, and poets, serving as a creative meeting place for over a century.",
          category: "Taking It Slower",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Taking It Slower",
          storyLink: "/hungary/budapest"
        },
        { 
          image: "/images/Hungary/Budapest/Small/Mulberry Garden.webp", 
          lightboxImage: "/images/Hungary/Budapest/Full/Mulberry Garden (Epreskert).webp",
          imageId: "mulberry-garden", 
          alt: "Mulberry Garden",
          title: "Mulberry Garden",
          description: "Epreskert abandoned sculpture garden located behind the Budapest University of Fine Arts",
          category: "Taking It Slower",
          gumroadLink: "https://nomadscribbles.gumroad.com/",
          shopLink: "/nomads-shop/hungary/budapest?category=Taking It Slower",
          storyLink: "/hungary/budapest"
        }
      ];
      
      const index = placesImages.findIndex(img => img.imageId === imageId);
      if (index !== -1) {
        openLightbox(index, placesImages);
      }
    }
  };

  const diaryImages = [{ image: diaryImg }];

  return (
    <>
      {/* LIGHTBOX (ATHENS STYLE) */}
      <SimpleLightbox
        images={diaryImages}
        currentIndex={heroLightboxIndex}
        setCurrentIndex={setHeroLightboxIndex}
        debugId="HERO"
      />
      
      {/* GALLERY LIGHTBOX */}
      <SimpleLightbox
        images={galleryImages}
        currentIndex={galleryLightboxIndex}
        setCurrentIndex={setGalleryLightboxIndex}
        debugId="GALLERY"
      />

      <div
        className="bg-black text-white min-h-screen relative"
        style={{
          backgroundImage: `url(${darkGravelBg})`,
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "auto",
          imageRendering: "crisp-edges",
          imageRendering: "-webkit-optimize-contrast",
        }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
        <SEO
          title="Budapest Diary | Nomad Scribbles"
          description="A personal journey through Budapest."
          image={szechenyiHero}
          slug="hungary/budapest"
        />

        {/* =========================
            HERO (ATHENS SYSTEM)
        ========================= */}
        <DiaryHeroBudapest
          heroOpenLightbox={(index) => setHeroLightboxIndex(index)}
        />

        {/* =========================
            OVERVIEW (ATHENS STYLE BLOCK)
        ========================= */}
        <section id="overview" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
          <motion.div className="bg-white/5 backdrop-blur-md rounded-xl p-8 md:p-12 border border-white/30">
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              Budapest feels structured and expansive, where grand architecture defines
              the first impression and smaller details slowly emerge underneath.
            </p>
          </motion.div>
        </section>

        {/* =========================
            A FEW PLACES ALONG THE WAY (COLLAPSIBLE SECTIONS)
        ========================= */}
        <section id="places" className="py-16 md:py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl text-center mb-16 text-[#f4e4c1] font-handwriting drop-shadow-lg">
              A Few Places Along the Way
            </h2>

            <div className="space-y-12 px-4 sm:px-6">
              {/* First Impressions */}
              <details className="group border-b border-gray-300 pb-4">
                <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-yellow-200 hover:text-yellow-100 transition-colors tracking-wide flex items-center justify-between drop-shadow-md">
                  First Impressions
                  <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
                </summary>
                <div className="mt-6">
                  <div className="relative">
                    <div className="flex flex-col md:flex-row h-auto md:h-96">
                      {/* Text box */}
                      <div className="w-full md:w-2/3 h-auto md:h-full p-2 sm:p-3 md:p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 overflow-hidden">
                        <div className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight md:leading-relaxed text-white/80 tracking-wide">
                          Budapest announces itself with grand gestures - Heroes' Square stretching wide, the Millennium Monument reaching skyward, and Vajdahunyad Castle standing as a testament to Hungarian history. These first impressions set the tone: structured, impressive, and impossible to overlook.
                        </div>
                      </div>
                      
                      {/* Images */}
                      <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0">
                        <img 
                          src={heroesSquare}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("heroes-square")}
                        />
                      </div>
                    </div>
                    
                    {/* Second row */}
                    <div className="flex flex-col md:flex-row h-auto md:h-48 mt-4 md:mt-0">
                      <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                        <img 
                          src={millenniumMonument}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("millennium-monument")}
                        />
                      </div>
                      
                      <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                        <img 
                          src={vajdahunyadCastle}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("vajdahunyad-castle")}
                        />
                      </div>
                    </div>

                    {/* Third row */}
                    <div className="w-full h-48 md:h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4">
                      <img 
                        src={vajdahunyadEntrance}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handlePlacesImageClick("vajdahunyad-entrance")}
                      />
                    </div>
                  </div>
                </div>
              </details>

              {/* Closer Look */}
              <details className="group border-b border-gray-300 pb-4">
                <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-yellow-200 hover:text-yellow-100 transition-colors tracking-wide flex items-center justify-between drop-shadow-md">
                  Closer Look
                  <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
                </summary>
                <div className="mt-6">
                  <div className="relative">
                    <div className="flex flex-col md:flex-row h-auto md:h-80">
                      <div className="w-full md:w-2/3 h-auto md:h-full p-2 sm:p-3 md:p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 overflow-hidden">
                        <div className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight md:leading-relaxed text-white/80 tracking-wide">
                          Moving closer reveals the details - the intricate Romanesque facade of Ják Chapel, the weathered elegance of historic buildings, and the quiet dignity of statues that have watched over the city for generations. These are the moments that reward careful observation.
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0">
                        <img 
                          src={jakChapel}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("jak-chapel")}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row h-auto md:h-48 mt-4 md:mt-0">
                      <div className="w-full md:w-1/2 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                        <img 
                          src={historicBuilding}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("historic-building")}
                        />
                      </div>
                      
                      <div className="w-full md:w-1/2 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                        <img 
                          src={yellowDoor}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("yellow-door")}
                        />
                      </div>
                    </div>

                    <div className="w-full h-48 md:h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4">
                      <img 
                        src={karolyiStatue}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handlePlacesImageClick("karolyi-statue")}
                      />
                    </div>
                  </div>
                </div>
              </details>

              {/* Taking It Slower */}
              <details className="group border-b border-gray-300 pb-4">
                <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-yellow-200 hover:text-yellow-100 transition-colors tracking-wide flex items-center justify-between drop-shadow-md">
                  Taking It Slower
                  <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
                </summary>
                <div className="mt-6">
                  <div className="relative">
                    <div className="flex flex-col md:flex-row h-auto md:h-96">
                      <div className="w-full md:w-2/3 h-auto md:h-full p-2 sm:p-3 md:p-4 lg:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 overflow-hidden">
                        <div className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight md:leading-relaxed text-white/80 tracking-wide">
                          Sometimes the best moments come when you stop trying to see everything. The Danube flowing slowly, the warmth of Széchenyi Baths, the quiet corners of cafés where writers once gathered, and gardens that time forgot. These are the moments that feel like Budapest's true rhythm.
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0">
                        <img 
                          src={danubeRiver}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("danube-river")}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                        <img 
                          src={outsideBaths}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("outside-baths")}
                        />
                      </div>
                      
                      <div className="h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                        <img 
                          src={szechenyiBaths}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("szechenyi-baths")}
                        />
                      </div>
                      
                      <div className="h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                        <img 
                          src={newYorkCafe}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("new-york-cafe")}
                        />
                      </div>
                      
                      <div className="h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                        <img 
                          src={cafeBalcony}
                          className="w-full h-full object-cover object-center"
                          onClick={() => handlePlacesImageClick("cafe-balcony")}
                        />
                      </div>
                    </div>

                    <div className="w-full h-48 md:h-48 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4">
                      <img 
                        src={mulberryGarden}
                        className="w-full h-full object-cover object-center"
                        onClick={() => handlePlacesImageClick("mulberry-garden")}
                      />
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* =========================
            FAVOURITES (RESTORED DATA)
        ========================= */}
        <section id="favourites" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">

          <motion.div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/20">
            <h2 className="text-3xl md:text-4xl mb-6">Favourites</h2>
            <p className="text-white">
              Smaller spaces that reveal Budapest's quieter side.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {favouritesPlaces.map((p, i) => (
              <img
                key={p.id}
                src={p.image}
                onClick={() => handleGalleryClick(8 + i)}
                className="rounded-lg cursor-pointer h-64 w-full object-cover"
              />
            ))}
          </div>

        </section>

        {/* =========================
            GALLERY (ATHENS END STYLE)
        ========================= */}
        <section id="gallery" className="py-16 md:py-24 w-full">

          {/* Gallery Title */}
          <div className="text-center mb-24 px-6">
            <h2 className="text-6xl md:text-7xl font-bold text-[#f4e4c1] font-handwriting mb-4 drop-shadow-lg">
              Budapest Gallery
            </h2>
            <p className="text-[#f4e4c1] italic text-lg md:text-xl mb-4 drop-shadow">
              A collection of moments from our time in the Hungarian capital
            </p>
            <img src="/assets/lftarrow.svg" alt="Scroll down" className="w-8 h-8 md:w-10 md:h-10 mx-auto transform -rotate-90" />
          </div>

          <GalleryWall 
            images={galleryImages}
            openLightbox={handleGalleryClick}
            title=""
            subtitle=""
          />

        </section>

      </div>
    </>
  );
}
