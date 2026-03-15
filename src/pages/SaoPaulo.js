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

  // Key Experiences Data (Top 5)
  const top5 = [
    {
      title: "1. Explore São Paulo’s Parks",
      text: "São Paulo’s green heart beats inside its parks. From the open lawns and modernist forms of Ibirapuera to the dense forest edges of Cantareira, these spaces offer relief without escape — places to walk, sketch, rest, and watch the city breathe more slowly.",
      image: cloudinaryUrlFromLegacyPath("/images/SP-Parks/small/Park1z.webp", { width: 1200 }),
      link: "/brazil/saopaulo/parks",
      alt: "Ibirapuera Park lake in São Paulo",
    },
    {
      title: "2. Discover World-Class Art Galleries",
      text: "Art in São Paulo never settles into one voice. At MASP, paintings hover above the avenue on glass supports, while the Pinacoteca draws Brazilian modernism into brick halls and quiet light. The city’s galleries reflect its character — bold, experimental, and unapologetically urban.",
      image: cloudinaryUrlFromLegacyPath("/images/ArtGallery/small/ArtGallery1z.webp", { width: 1200 }),
      link: "/brazil/saopaulo/museums",
      alt: "MASP glass structure on Paulista Avenue",
    },
    {
      title: "3. Experience Carnival Up Close",
      text: "For Paulistanos, Carnival is preparation, pride, and release. Samba schools rehearse for months before stepping into the Sambódromo, while blocos spill through neighbourhood streets with no fixed route. It’s a celebration shaped as much by discipline as by joy — and felt most strongly by those who carry it every year.",
      image: cloudinaryUrlFromLegacyPath("/images/CarnivalSP/small/Carnival1z.webp", { width: 1200 }),
      link: "/brazil/saopaulo/carnival",
      alt: "Samba parade in São Paulo Carnival",
    },
    {
      title: "4. Wander Among Street Murals",
      text: "São Paulo’s walls speak openly. In places like Vila Madalena’s Beco do Batman, murals layer politics, humour, protest, and portraiture across entire streets. The city becomes a public canvas — constantly repainted, argued with, and reimagined.",
      image: cloudinaryUrlFromLegacyPath("/images/Murals/small/Graffiti1z.webp", { width: 1200 }),
      link: "/brazil/saopaulo/murals",
      alt: "Colourful graffiti art in Beco do Batman",
    },
    {
      title: "5. Take a Day Trip to Santos",
      text: "An hour south, the city loosens. Santos trades height for horizon, with long beaches, colonial streets, and the lingering scent of roasted coffee near the old Coffee Museum. It’s where Paulistanos go to swap density for sea air.",
      image: cloudinaryUrlFromLegacyPath("/images/Santos/small/Santos1z.webp", { width: 1200 }),
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
        <div className="w-full">
          <img
            src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/SaoPauloFeature.webp", { width: 2000 })}
            alt="The city spreads outward in layers"
            className="w-full h-auto object-cover max-h-[80vh]"
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
            <img
              src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/pizza.webp", { width: 1600 })}
              alt="Late-night pizza in São Paulo"
              className="w-full h-auto rounded-sm shadow-md"
              loading="lazy"
            />
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
            <img
              src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/small/Street2.webp", { width: 1600 })}
              alt="Liberdade holds its stories at street level"
              className="w-full h-auto rounded-sm shadow-md"
              loading="lazy"
            />
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
            <img
              src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/caparinha.webp", { width: 1200 })}
              alt="A pause, briefly held - Photo"
              className="w-[70%] mx-auto block h-auto rounded-sm shadow-md"
              loading="lazy"
            />
            <img
              src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/CaparinhaDrawn.webp", { width: 1200 })}
              alt="A pause, briefly held - Sketch"
              className="w-[70%] mx-auto block h-auto rounded-sm shadow-md opacity-90"
              loading="lazy"
            />
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
              <h3 className="font-bold text-2xl mb-3 text-black">{item.title}</h3>
              <p className="mb-4 text-black/80 leading-relaxed">{item.text}</p>
              <Link
                to={item.link}
                className="inline-block text-black font-bold uppercase tracking-wide border-b-2 border-black/20 hover:border-black transition-colors"
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
          className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]"
        >
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Brazil</span>
        </Link>
        <Link
          to="/brazil/florianopolis"
          className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-8 py-3 border border-[#ceb752]/50 shadow-md hover:bg-[#ceb752]/30 w-fit min-w-[240px]"
        >
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: Florianópolis</span>
          <span className="text-xl ml-3 pb-1">→</span>
        </Link>
      </div>
    </div>
  );
}

export default SaoPaulo;
