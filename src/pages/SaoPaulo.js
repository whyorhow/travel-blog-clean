import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import destinations from "../assets/destinations.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function SaoPaulo() {
  const saopauloCoords = destinations.find(d => d.id === "saopaulo");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Key Experiences Data (Top 5)
  const top5 = [
    {
      title: "1. Explore São Paulo’s Parks",
      text: "São Paulo’s green heart beats inside its parks. From the open lawns and modernist forms of Ibirapuera to the dense forest edges of Cantareira, these spaces offer relief without escape — places to walk, sketch, rest, and watch the city breathe more slowly.",
      image: cloudinaryUrlFromLegacyPath("/images/SP-Parks/small/Park1.webp", { width: 1200 }),
      link: "/brazil/saopaulo/parks",
      alt: "Ibirapuera Park lake in São Paulo",
    },
    {
      title: "2. Discover World-Class Art Galleries",
      text: "Art in São Paulo never settles into one voice. At MASP, paintings hover above the avenue on glass supports, while the Pinacoteca draws Brazilian modernism into brick halls and quiet light. The city’s galleries reflect its character — bold, experimental, and unapologetically urban.",
      image: cloudinaryUrlFromLegacyPath("/images/ArtGallery/small/ArtGallery1.webp", { width: 1200 }),
      link: "/brazil/saopaulo/museums",
      alt: "MASP glass structure on Paulista Avenue",
    },
    {
      title: "3. Experience Carnival Up Close",
      text: "For Paulistanos, Carnival is preparation, pride, and release. Samba schools rehearse for months before stepping into the Sambódromo, while blocos spill through neighbourhood streets with no fixed route. It’s a celebration shaped as much by discipline as by joy — and felt most strongly by those who carry it every year.",
      image: cloudinaryUrlFromLegacyPath("/images/CarnivalSP/small/Carnival1.webp", { width: 1200 }),
      link: "/brazil/saopaulo/carnival",
      alt: "Samba parade in São Paulo Carnival",
    },
    {
      title: "4. Wander Among Street Murals",
      text: "São Paulo’s walls speak openly. In places like Vila Madalena’s Beco do Batman, murals layer politics, humour, protest, and portraiture across entire streets. The city becomes a public canvas — constantly repainted, argued with, and reimagined.",
      image: cloudinaryUrlFromLegacyPath("/images/Murals/small/Graffiti1.webp", { width: 1200 }),
      link: "/brazil/saopaulo/murals",
      alt: "Colourful graffiti art in Beco do Batman",
    },
    {
      title: "5. Take a Day Trip to Santos",
      text: "An hour south, the city loosens. Santos trades height for horizon, with long beaches, colonial streets, and the lingering scent of roasted coffee near the old Coffee Museum. It's where Paulistanos go to swap density for sea air.",
      image: cloudinaryUrlFromLegacyPath("/images/Santos/small/Santos1.webp", { width: 1200 }),
      link: "/brazil/saopaulo/santos",
      alt: "Beachfront and historic Coffee Museum in Santos",
    },
  ];

  const top5BgColors = [
    "bg-[#F5E8C7]/50",
    "bg-[#C7E8F5]/50",
    "bg-[#E8C7F5]/50",
    "bg-[#F5C7C7]/50",
    "bg-[#C7F5D8]/50",
  ];

  // Narrative images for lightbox
  const narrativeImages = [
    {
      lightboxImage: "/images/SaoPauloLanding/full/pizza.webp",
      title: "Late-night pizza in São Paulo",
      alt: "Late-night pizza in São Paulo",
    },
    {
      lightboxImage: "/images/SaoPauloLanding/full/Street2.webp",
      title: "Liberdade holds its stories at street level",
      alt: "Liberdade holds its stories at street level",
    },
    {
      lightboxImage: "/images/SaoPauloLanding/full/caparinha.webp",
      title: "A pause, briefly held - Photo",
      alt: "A pause, briefly held - Photo",
    },
    {
      lightboxImage: "/images/SaoPauloLanding/full/CaparinhaDrawn.webp",
      title: "A pause, briefly held - Sketch",
      alt: "A pause, briefly held - Sketch",
    },
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxIndex(null);
  };

  const setCurrentIndex = (index) => {
    setLightboxIndex(index);
  };

  const spreadBackgroundStyle = {
    backgroundImage: `url(${paperTexture})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "url(#torn-paper-filter) drop-shadow(0 0 3px rgba(0,0,0,0.15))",
    opacity: 1,
  };

  return (
    <div className="relative flex flex-col font-sans text-[#e2e1dc]">
      <SEO
        title="São Paulo: City Life & Flavours | Nomad Scribbles"
        description="São Paulo moves with a rhythm that’s hard to pin down. Discover a city built from layers — parks, art, carnival, and street murals."
        keywords="São Paulo travel guide, things to do in São Paulo, Ibirapuera Park, MASP, Beco do Batman, Santos day trip"
        image="https://nomadscribbles.com/images/SaoPauloLanding/SaoPauloFeature.webp"
        url="https://nomadscribbles.com/brazil/saopaulo"
      />

      {/* 1. Feature Image (Role: Entry point) */}
      <section className="relative w-full mb-8">
        <div className="w-full max-w-screen-lg mx-auto">
          <img
            src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/SaoPauloFeature.webp", { width: 2000 })}
            alt="The city spreads outward in layers"
            className="w-full h-auto object-cover max-h-[40vh] rounded-lg"
          />
        </div>
        <div className="max-w-screen-lg mx-auto px-6 mt-4">
          <p className="text-sm italic text-gray-400 text-center animate-fade-in-up delay-200">
            The city spreads outward in layers — dense, vertical, and constantly in motion.
          </p>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="max-w-screen-md mx-auto px-6 mb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#edd98d]">
          City Life and Flavours
        </h1>
        <p className="text-lg leading-relaxed md:text-xl text-[#e2e1dc]/90">
          São Paulo moves with a rhythm that’s hard to pin down — part jazz, part traffic, part heartbeat. Rain on concrete smells faintly of roasted coffee, and music leaks from apartment windows. The city rarely pauses, but it constantly reveals itself in fragments: a shared table, a wet street, a glass lifted mid-conversation. What follows are small ways in.
        </p>
      </section>

      {/* 3. Narrative Image Blocks (Editorial, non-expandable) */}
      <section className="max-w-screen-lg mx-auto px-6 space-y-16 mb-20">

        {/* Block A - Pizza */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <div 
              onClick={() => openLightbox(0)}
              className="cursor-pointer"
            >
              <img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/pizza.webp", { width: 1600 })}
                alt="Late-night pizza in São Paulo"
                className="w-full h-auto rounded-sm shadow-md hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">Late-night pizza is less a meal than a habit.</p>
          </div>
          <div className="w-full md:w-1/2 text-lg leading-relaxed">
            <h3 className="text-xl font-bold text-[#edd98d] mb-4">A Quiet Religion</h3>
            <p>Pizza in São Paulo is a quiet religion. Born from Italian ovens, thin and soft, eaten late — sometimes after midnight. Every neighbourhood claims the best slice. The crust cracks softly, the cheese stretches, and the toppings shift with local taste rather than rules. Sitting down to share a pizza feels like stepping briefly into the city’s everyday rhythm.</p>
          </div>
        </div>

        {/* Block B - Street Layers (Liberdade) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <div 
              onClick={() => openLightbox(1)}
              className="cursor-pointer"
            >
              <img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/small/Street2.webp", { width: 1600 })}
                alt="Liberdade holds its stories at street level"
                className="w-full h-auto rounded-sm shadow-md hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">Liberdade holds its stories at street level.</p>
          </div>
          <div className="w-full md:w-1/2 text-lg leading-relaxed">
            <h3 className="text-xl font-bold text-[#edd98d] mb-4">Layers at Street Level</h3>
            <p>After the rain, São Paulo sharpens rather than softens. Crosswalk paint glows against damp asphalt, murals stack colour along low walls, and power lines sketch loose grids overhead. In neighbourhoods like Liberdade, daily movement, borrowed influence, and routine overlap without ceremony. Even when traffic pauses, the city still feels in motion.</p>
          </div>
        </div>

        {/* Block C - Caipirinha */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-4">
            <div 
              onClick={() => openLightbox(2)}
              className="cursor-pointer"
            >
              <img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/caparinha.webp", { width: 1200 })}
                alt="A pause, briefly held - Photo"
                className="w-[70%] mx-auto block h-auto rounded-sm shadow-md hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
            <div 
              onClick={() => openLightbox(3)}
              className="cursor-pointer"
            >
              <img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/CaparinhaDrawn.webp", { width: 1200 })}
                alt="A pause, briefly held - Sketch"
                className="w-[70%] mx-auto block h-auto rounded-sm shadow-md opacity-90 hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-400 italic">A pause, briefly held.</p>
          </div>
          <div className="w-full md:w-1/2 text-lg leading-relaxed">
            <h3 className="text-xl font-bold text-[#edd98d] mb-4">A Pause, Briefly Held</h3>
            <p>A caipirinha marks a small pause in a city of ten million. Lime, sugar, cachaça — simple balance. Ice clinks as conversations drift from football to art to the day’s small dramas. The sweetness fades slowly, leaving just enough space to notice the moment before the city pulls you back in.</p>
          </div>
        </div>
      </section>

      {/* 4. Bridge Text */}
      <section className="bg-[#1c1c1c] py-12 mb-16">
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl font-light italic text-gray-300">
            “These moments sketch only the surface of São Paulo. Beyond them, the city opens outward — into green spaces, rehearsal halls, galleries, and streets where its larger rhythms take shape.”
          </p>
        </div>
      </section>

      {/* Banner Spread with Map (Optional: Keeping context map as it adds value but placing it before key experiences) */}
      <div className="relative w-full mb-16 overflow-hidden hidden md:block">
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-10"
          style={{
            ...spreadBackgroundStyle,
            filter: "url(#torn-paper-filter) drop-shadow(0 0 12px rgba(0,0,0,0.4))",
            opacity: 1
          }}
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center mt-[-10px]">
          <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
            <ContextMap
              markers={saopauloCoords ? [saopauloCoords] : []}
              zoomToId="saopaulo"
              title="Where is São Paulo?"
              geography={saopauloCoords?.geography}
              transparent={true}
            />
          </div>
        </div>
      </div>

      {/* 5. Key Experiences (Navigational) */}
      <main className="max-w-screen-lg mx-auto px-6 pb-20 space-y-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#edd98d]">Key Experiences</h2>
          <p className="text-gray-400 mt-2">Deeper dives into the city</p>
        </div>

        {top5.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-6 ${top5BgColors[idx]} rounded-lg p-6 shadow-md ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image (Framed 'z' image) */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <Link to={item.link}>
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                />
              </Link>
            </div>

            {/* Text & Link */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#edd98d] mb-4">{item.title}</h3>
              <p className="mb-4 text-black/80 leading-relaxed">{item.text}</p>
              <Link
                to={item.link}
                className="inline-block bg-white/5 border border-white/10 text-white/80 backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-white/10 hover:text-white transition duration-300 text-sm font-medium"
              >
                Explore {item.title.split(".")[1] || "More"} →
              </Link>
            </div>
          </motion.div>
        ))}
      </main>

      <div className="w-full flex flex-col items-center gap-6 mt-12 mb-20 relative z-10">
        <Link
          to="/brazil"
          className="flex flex-row items-center justify-center bg-[#E5CF6B]/10 border border-[#E5CF6B]/30 text-[#E5CF6B] backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-[#E5CF6B]/20 hover:text-[#E5CF6B] transition duration-300 text-sm font-medium uppercase tracking-wide"
        >
          <span className="text-lg mr-2">←</span>
          <span className="text-sm font-medium">Return To Brazil</span>
        </Link>
        <Link
          to="/brazil/florianopolis"
          className="flex flex-row items-center justify-center bg-white/5 border border-white/10 text-white/80 backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-white/10 hover:text-white transition duration-300 text-sm font-medium"
        >
          <span className="text-sm font-medium">Next: Florianópolis</span>
          <span className="text-lg ml-2">→</span>
        </Link>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          images={narrativeImages}
          currentIndex={lightboxIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default SaoPaulo;
