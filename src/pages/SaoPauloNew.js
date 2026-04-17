import React, { useState } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

import diaryHero from "../assets/images/SaoPaulo-Diary.webp";

function SaoPauloNew() {
  const saopauloCoords = destinations.find(d => d.id === "saopaulo");

  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Parks",
      content:
        "São Paulo's green heart beats inside its parks. Ibirapuera opens wide with modernist lines and slow afternoons, while Cantareira presses dense forest against the city's edge. These are not escapes, but pauses - places where the rhythm softens just enough to notice.",
    },
    {
      title: "Art & Galleries",
      content:
        "Art in São Paulo never settles into one voice. At MASP, paintings hover above the avenue on glass supports, while the Pinacoteca draws Brazilian modernism into quiet brick halls. The city's galleries feel like extensions of its streets - bold, layered, and constantly shifting.",
    },
    {
      title: "Carnival",
      content:
        "For Paulistanos, Carnival is preparation as much as celebration. Samba schools rehearse for months before stepping into the Sambódromo, while blocos move freely through neighbourhoods. It's structured chaos - joy shaped by discipline.",
    },
    {
      title: "Street Murals",
      content:
        "Walls across São Paulo speak openly. In Vila Madalena, murals layer politics, humour, and identity across entire streets. The city becomes a public canvas - constantly repainted, challenged, and reimagined.",
    },
    {
      title: "Santos",
      content:
        "An hour south, the city loosens. Santos trades height for horizon - long beaches, colonial streets, and the lingering scent of coffee near the old trading houses. It's where São Paulo exhales.",
    },
  ];

  return (
    <div className="bg-[#f7f5ef] text-[#1c1c1c] font-sans">

      <SEO
        title="São Paulo | Nomad Scribbles"
        description="Fragments of São Paulo - parks, art, carnival, and the spaces in between."
      />

      {/* 1. HERO */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={diaryHero}
          alt="São Paulo diary"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-center text-center px-6 pb-10">
          <h1 className="text-3xl md:text-5xl text-white font-semibold mb-4">
            São Paulo
          </h1>
          <p className="text-white/90 italic max-w-xl">
            The city moves before you understand it.
          </p>
        </div>
      </section>

      {/* 2. INTRO */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-lg leading-relaxed">
          São Paulo moves with a rhythm that's hard to pin down - part traffic,
          part conversation, part something quieter underneath. Rain settles
          briefly on concrete before disappearing again. Music drifts between
          windows. What stays are fragments - small moments that offer a way in.
        </p>
      </section>

      {/* 3. NARRATIVE (KEEP ONE STRONG BLOCK EXAMPLE) */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img
            src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/pizza.webp", { width: 1200 })}
            alt="Pizza São Paulo"
            className="w-full md:w-1/2 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#b89b3c]">
              A Quiet Religion
            </h3>
            <p className="leading-relaxed">
              Pizza in São Paulo is a quiet ritual. Thin bases, soft centres,
              eaten late. Every neighbourhood claims its version. Sitting down
              to share one feels like stepping briefly into the city's everyday
              rhythm.
            </p>
          </div>
        </div>
      </section>

      {/* 4. BRIDGE */}
      <section className="text-center py-12 px-6">
        <p className="italic text-xl text-[#555] max-w-2xl mx-auto">
          These moments only sketch the surface. Beyond them, the city opens outward.
        </p>
      </section>

      {/* 5. MAP */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <ContextMap
            markers={saopauloCoords ? [saopauloCoords] : []}
            zoomToId="saopaulo"
            title="Where is São Paulo?"
            geography={saopauloCoords?.geography}
          />
        </div>
      </section>

      {/* 6. EXPANDABLE SECTIONS */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Ways Into the City
        </h2>

        {sections.map((item, index) => (
          <div key={index} className="border-b border-[#ddd] py-4">
            <button
              onClick={() => toggleSection(index)}
              className="w-full text-left flex justify-between items-center"
            >
              <span className="text-xl">{item.title}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-4 text-[#444]"
                >
                  <p>{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* 7. GALLERY */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl text-center mb-10">The Rest of It</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "/images/SaoPauloLanding/small/Street1.webp",
            "/images/SaoPauloLanding/small/Street2.webp",
            "/images/SP-Parks/small/Park1.webp",
            "/images/SP-Parks/small/Park2.webp",
            "/images/SaoPauloLanding/small/Detail1.webp",
            "/images/SaoPauloLanding/small/Detail2.webp",
          ].map((img, i) => (
            <img
              key={i}
              src={cloudinaryUrlFromLegacyPath(img, { width: 800 })}
              className="w-full h-auto rounded-md"
              alt=""
            />
          ))}
        </div>
      </section>

      {/* 8. CLOSING */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="italic text-lg text-[#555]">
          São Paulo never fully reveals itself. It offers fragments - and leaves
          the rest for you to find.
        </p>
      </section>

    </div>
  );
}

export default SaoPauloNew;
