import { motion } from "framer-motion";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import SEO from "../components/SEO";
import DiaryHeroAthens from "../components/DiaryHeroAthens";
import GalleryWall from "../components/GalleryWall";
import artImages from "../assets/artImages.json";
import darkGravelBg from "../assets/images/Seashells on Sand.webp";

// Import images using Cloudinary helper (without 'z' prefix)
const acropolisHillImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Acropolis Hill.webp");
const acropolisViewImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Acropolis View.webp");
const aeginaBeachImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Aegina Beach.webp");
const archOfHadrianImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Arch of Hadrian.webp");
const athenianGraffitiImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Athenian Graffiti.webp");
const athenianSunsetImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Athenian Sunset.webp");
const bambooUmbrellaImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Bamboo Umbrella.webp");
const chapelAtHeraionImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Chapel at Heraion.webp");
const chapelInYpanemaImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Chapel in Ypanema at Heraion.webp");
const churchOfTransfigurationImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Church of the Transfiguration.webp");
const crustyGreekBreadImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Crusty Greek Bread.webp");
const hadriansLibraryImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Hadrian's Library.webp");
const kotiliCafeImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Kotili Café.webp");
const loutrakiBeachImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Loutraki Beach.webp");
const loutrakiViewImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Loutraki View.webp");
const orangeTreesImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Orange Trees.webp");
const romanColumnsImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Roman Columns.webp");
const templeOfAphaiaImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Temple of Aphaia.webp");
const templeOfApolloImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Temple of Apollo in Corinth.webp");
const templeOfHephaestusImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Temple of Hephaestus.webp");
const zappeionBuildingImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/The Zappeion Building.webp");
const tragopogonFlowerImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Tragopogon Flower.webp");
const turtlePondImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Turtle Pond.webp");
const woodenPierImage = cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Wooden Pier.webp");

const places = [
  {
    id: "acropolis-hill",
    name: "Acropolis Hill",
    description: "Ancient citadel towering over Athens, home to the iconic Parthenon and centuries of Greek history. The views span the entire city.",
    imageId: "zAcropolis Hill",
    image: acropolisHillImage,
    featured: true
  },
  {
    id: "acropolis-view",
    name: "Acropolis View",
    description: "Panoramic vistas of the sacred rock and its marble temples, especially magical during golden hour and sunset.",
    imageId: "zAcropolis View",
    image: acropolisViewImage,
    featured: true
  },
  {
    id: "temple-of-hephaestus",
    name: "Temple of Hephaestus",
    description: "Best-preserved ancient Greek temple, dedicated to the god of craftsmanship and metalworking.",
    imageId: "zTemple of Hephaestus",
    image: templeOfHephaestusImage,
    featured: false
  },
  {
    id: "hadrians-library",
    name: "Hadrian's Library",
    description: "Roman-era complex built by Emperor Hadrian, featuring ancient columns and peaceful courtyards.",
    imageId: "zHadrian's Library",
    image: hadriansLibraryImage,
    featured: false
  }
];

// Filter and transform Athens images from artImages.json to match GalleryWall structure
const galleryImages = artImages
  .filter(image => image.image && image.image.includes("/Greece/Athens/Small/"))
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

export default function Athens({ openLightbox }) {
  const handleGalleryClick = (imageId) => {
    if (openLightbox) {
      const index = galleryImages.findIndex(img => img.imageId === imageId);
      if (index !== -1) {
        openLightbox(index, galleryImages);
      }
    }
  };

  // Copy working pattern from Antwerp.js
  const imageOrder = [
    "zAcropolis Hill", "zAcropolis View", "zArch of Hadrian", "zHadrian's Library", "zRoman Columns",
    "zTemple of Aphaia", "zTemple of Apollo in Corinth", "zTemple of Hephaestus", "zThe Zappeion Building",
    "zAegina Beach", "zLoutraki Beach", "zLoutraki View", "zWooden Pier", "zTurtle Pond",
    "zTragopogon Flower", "zOrange Trees", "zAthenian Graffiti", "zAthenian Sunset",
    "zBamboo Umbrella", "zKotili Café", "zCrusty Greek Bread",
    "zChapel at Heraion", "zChapel in Ypanema at Heraion", "zChurch of the Transfiguration"
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
    image: `/images/Greece/Athens/Small/${id}.webp`,
    lightboxImage: `/images/Greece/Athens/Full/${id.replace('z', '')}.webp`,
    expandedImage: `/images/Greece/Athens/Small/${id.replace('z', '')}.webp`,
    title: id.replace('z', '').replace(/([A-Z])/g, ' $1').trim(),
    description: `Athens ${id.replace('z', '').replace(/([A-Z])/g, ' $1').trim()}` 
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
    <div className="text-stone-100 relative min-h-screen bg-gradient-to-br from-amber-900 to-stone-900">
      
      <div className="relative z-10">
      <SEO
        title="Athens Diary | Ancient Wonders & Modern Greek Life"
        description="A personal diary of exploring Athens - from the sacred Acropolis to hidden chapels, discover the soul of Greece's historic capital."
        image={cloudinaryUrlFromLegacyPath(acropolisHillImage, { width: 1200 })}
        slug="greece/athens"
      />

      {/* 1. Diary Hero with Integrated Navigation */}
      <DiaryHeroAthens />

      {/* 3. Overview / The Experience */}
      <section id="overview" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 md:p-12 border-2 border-white/40"
          >
            <p className="text-xl md:text-2xl leading-relaxed md:leading-loose text-white/90 font-serif">
              Athens didn't feel like a city of ruins.
              <br />
              It felt alive.
              <br /><br />
              Every stone seemed to hold stories, not just of gods and philosophers, but of <span className="text-white/70 font-medium">people still living</span> among the ancient echoes.
              <br /><br />
              We climbed the Acropolis at sunrise, wandered through markets where old men played backgammon, and found chapels tucked away in corners that felt like they'd been there forever.
              <br />
              It's a city where <span className="text-white/70 font-medium">past and present</span> don't just coexist - they dance around each other.
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
            {/* Acropolis Hill & Acropolis View */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Where It Starts to Make Sense
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
                        The Acropolis wasn't just a tourist site - it felt like the heart of Athens still beating. Watching the sunrise from the top, with the marble temples glowing gold, was one of those moments that remind you why you travel.
                      </div>
                    </div>
                    
                    {/* 2. Acropolis Hill - full width mobile, 1/3 desktop */}
                    <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Acropolis Hill.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zAcropolis Hill")}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row: 2/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-48 mt-4 md:mt-0">
                    {/* 3. Acropolis View - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Acropolis View.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zAcropolis View")}
                      />
                    </div>
                    
                    {/* 4. Temple of Hephaestus - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Temple of Hephaestus.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zTemple of Hephaestus")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Ancient Temples & Roman Heritage */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                What's Been Left Behind (and What Hasn't)
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - two rows, no gap */}
                <div className="relative">
                  {/* Top Row: 1/2 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-80">
                    {/* 1. Arch of Hadrian - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Arch of Hadrian.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zArch of Hadrian")}
                      />
                    </div>
                    
                    {/* 2. Text box - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        Walking through Hadrian's Library and past the Roman columns felt like stepping through different layers of time. Each civilization built upon the last, creating this incredible palimpsest of human history.
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Row: 1/2 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-80 mt-4 md:mt-0">
                    {/* 3. Hadrian's Library - full width mobile, 3/8 desktop */}
                    <div className="w-full md:w-3/8 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Hadrian's Library.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zHadrian's Library")}
                      />
                    </div>
                    
                    {/* 4. Roman Columns - full width mobile, 1/4 desktop */}
                    <div className="w-full md:w-1/4 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Roman Columns.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zRoman Columns")}
                      />
                    </div>
                    
                    {/* 5. The Zappeion Building - full width mobile, 3/8 desktop */}
                    <div className="w-full md:w-3/8 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/The Zappeion Building.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zThe Zappeion Building")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Coastal Escapes & Nature */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Where the City Lets Go
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - three rows, no gap */}
                <div className="relative">
                  {/* Row 1: 2/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-56">
                    {/* 1. Text box - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40">
                      <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                        The coast around Athens offered these perfect escapes - from quiet beaches to ancient islands. The sea breeze and salt air provided relief from the intensity of the city's ancient energy.
                      </div>
                    </div>
                    
                    {/* 2. Aegina Beach - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Aegina Beach.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zAegina Beach")}
                      />
                    </div>
                  </div>
                  
                  {/* Row 2: 1.5/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-44 mt-4 md:mt-0">
                    {/* 3. Loutraki Beach - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Loutraki Beach.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zLoutraki Beach")}
                      />
                    </div>
                    
                    {/* 4. Loutraki View - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Loutraki View.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zLoutraki View")}
                      />
                    </div>
                  </div>
                  
                  {/* Row 3: 1.5/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-44 mt-4 md:mt-0">
                    {/* 5. Wooden Pier - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Wooden Pier.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zWooden Pier")}
                      />
                    </div>
                    
                    {/* 6. Turtle Pond - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Turtle Pond.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zTurtle Pond")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Greek Life & Culture */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                The Rhythm You Fall Into
                <img src="/assets/plus.svg" alt="Expand" className="w-5 h-5 transition-transform group-open:rotate-45" />
              </summary>
              <div className="mt-6">
                {/* Main layout - single row, no gap */}
                <div className="relative flex flex-col md:flex-row h-auto md:h-96">
                  {/* Left side: Images stacked - full width mobile, 3/5 desktop */}
                  <div className="w-full md:w-3/5 h-full md:h-full flex flex-col md:flex-col gap-2 md:gap-0">
                    {/* 1. Athenian Sunset */}
                    <div className="flex-1 h-48 md:h-1/2 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Athenian Sunset.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zAthenian Sunset")}
                      />
                    </div>
                    
                    {/* 2. Kotili Café */}
                    <div className="flex-1 h-48 md:h-1/2 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-2 md:mt-0">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Kotili Café.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zKotili Café")}
                      />
                    </div>
                  </div>
                  
                  {/* Right side: Text box - full width mobile, 2/5 desktop */}
                  <div className="w-full md:w-2/5 h-full md:h-full p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                    <div className="text-sm md:text-xl lg:text-2xl leading-relaxed text-white/80 tracking-wide">
                      The real Athens revealed itself in small moments - crusty bread from neighborhood bakeries, sunsets that painted the marble temples gold, and cafés where time seemed to slow down just enough to notice the beauty around you.
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Sacred Spaces & Chapels */}
            <details className="group border-b border-gray-300 pb-4">
              <summary className="cursor-pointer text-xl md:text-2xl font-semibold mb-4 list-none text-white hover:text-[#b99f0f] transition-colors tracking-wide flex items-center justify-between">
                Quiet Corners That Stay With You
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
                        Hidden chapels and sacred spaces appeared unexpectedly - on islands, in neighborhoods, perched on hillsides. Each felt like a quiet refuge, a place where the spiritual and historical intertwined seamlessly.
                      </div>
                    </div>
                    
                    {/* 2. Chapel at Heraion - full width mobile, 1/3 desktop */}
                    <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Chapel at Heraion.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zChapel at Heraion")}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row: 2/5 height */}
                  <div className="flex flex-col md:flex-row h-auto md:h-48 mt-4 md:mt-0">
                    {/* 3. Chapel in Ypanema at Heraion - full width mobile, 2/5 desktop */}
                    <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Chapel in Ypanema at Heraion.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zChapel in Ypanema at Heraion")}
                      />
                    </div>
                    
                    {/* 4. Church of the Transfiguration - full width mobile, 3/5 desktop */}
                    <div className="w-full md:w-3/5 h-48 md:h-full overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 border-white/40 mt-4 md:mt-0 ml-0 md:ml-4">
                      <img 
                        src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Church of the Transfiguration.webp")} 
                        className="w-full h-full object-cover object-center"
                        onClick={() => handleGalleryClick("zChurch of the Transfiguration")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 6. What We Kept Coming Back To */}
      <section id="tips" className="relative py-16 px-6">

        {/* Hero */}
        <div className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center mb-16">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={acropolisViewImage}
              alt="Athens Cityscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </motion.div>

          <div className="relative z-10 text-center max-w-4xl px-4">
            <h2 className="text-5xl md:text-6xl font-bold text-[#d4af37] font-handwriting bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg">
              What We Kept Coming Back To
            </h2>
            <p className="text-sm italic text-white/70 mt-4">
              Not recommendations — just the places we found ourselves returning to.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-12 text-center">

          {/* Bread */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">
              We kept coming back for the bread
            </h3>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">

              <div>
                <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
                  The bread in Athens didn't feel like something on the side — it felt like the centre of it all. Crusty on the outside, soft and warm inside, the kind you tear apart without thinking and finish before you realise.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-white/80">
                  There was a small bakery near the Acropolis where we kept returning, not because we planned to, but because it became part of the rhythm. The owner would hand over loaves still warm from the oven, as if it was the most normal thing in the world.
                </p>
              </div>

              <div>
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Crusty Greek Bread.webp")}
                    alt="Fresh Greek bread"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </motion.div>

          {/* Cafe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20 text-left"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b99f0f]">
              Afternoons at Kotili Café
            </h3>

            <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-4">
              Kotili Café became somewhere we drifted back to without much thought. A small space, slightly tucked away, where the coffee was strong and time seemed to stretch just enough to notice it.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              The owner would sit with us when it was quiet, trading bits of English for bits of Greek, conversations moving slowly but comfortably. Some afternoons we stayed longer than we meant to, watching the street outside — not really doing anything, just being there.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 7. Gallery Wall */}
      <section id="gallery" className="relative py-16 w-full">
        <div className="w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-8 text-[#b99f0f] font-handwriting px-6">
            Athens Gallery
          </h2>
          <p className="text-center text-lg md:text-xl text-white/80 mb-4 italic px-6">
            Step inside
          </p>
          
          {/* Arrow pointing down to gallery */}
          <div className="flex justify-center mb-6 px-6">
            <div className="animate-bounce">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-white/60"
              >
                <path 
                  d="M12 5V19M12 19L5 12M12 19L19 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <GalleryWall 
            images={galleryImages}
            openLightbox={openLightbox}
            title=""
            subtitle=""
          />
        </div>
      </section>
      </div>
    </div>
  );
}
