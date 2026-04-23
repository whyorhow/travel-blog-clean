import React from "react";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

import diaryHero from "../assets/images/SaoPaulo-Diary.webp";
import crossIcon from "../assets/images/cross.svg";

function SaoPauloNew() {
  const saopauloCoords = destinations.find(d => d.id === "saopaulo");
  const navigate = useNavigate();

  const sections = [
  {
    title: "Green Spaces",
    path: "/brazil/saopaulo/green-spaces"
  },
  {
    title: "Street Murals",
    path: "/brazil/saopaulo/street-murals"
  },
  {
    title: "Art & Galleries",
    path: "/brazil/saopaulo/art-galleries"
  },
  {
    title: "Carnival",
    path: "/brazil/saopaulo/carnival"
  },
  {
    title: "Santos",
    path: "/brazil/saopaulo/santos"
  }
];

  return (
    <div className="bg-[#f7f5ef] text-[#1c1c1c] font-sans">

      <SEO
        title="São Paulo | Nomad Scribbles"
        description="Fragments of São Paulo - parks, art, carnival, and the spaces in between."
      />

      {/* HERO */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <img
          src={diaryHero}
          alt="São Paulo skyline"
          className="w-full h-full object-cover"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-6">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-semibold text-[#111] mb-10">
        São Paulo
      </h1>

      {/* MAIN GRID */}
      <div className="flex flex-col md:flex-row gap-10 items-start">

        {/* TEXT COLUMN */}
        <div className="md:w-2/3 space-y-6 text-[#222]">

          <p className="text-xl md:text-2xl leading-relaxed text-[#333]">
            São Paulo is vast. It feels like a city that contains almost everything at once - industry, culture, nature, food, and nightlife existing side by side.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-[#444]">
            Different parts of the city feel almost like different worlds. Some areas feel familiar in rhythm and layout, almost European in tone, while others are unmistakably Brazilian - dense, energetic, and deeply social.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-[#444]">
            There's also a strong Japanese influence, especially in neighbourhoods like Liberdade.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-[#444]">
            Paulistas are proud of their city. Many build their lives within it - careers, families, routines - and never feel the need to leave.
          </p>

        </div>

        {/* IMAGE COLUMN */}
        <div className="md:w-1/5 w-full">
          <div className="relative overflow-hidden rounded-sm shadow-sm">

            <img
              src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/small/Street2.webp", { width: 800 })}
              alt="Liberdade street level view in São Paulo"
              className="
                w-full
                h-auto
                object-cover
                opacity-90
                transition-all
                duration-300
                hover:opacity-100
              "
            />

            {/* optional subtle tone overlay for consistency */}
            <div className="absolute inset-0 bg-black/5"></div>

          </div>

          {/* subtle caption */}
          <p className="text-xs text-[#666] mt-2 leading-snug">
            Liberdade is experienced at street level.
          </p>

        </div>

      </div>

    </section>

      {/* 3. NARRATIVE (KEEP ONE STRONG BLOCK EXAMPLE) */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img
            src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/pizza.webp", { width: 1200 })}
            alt="Pizza São Paulo"
            className="w-full md:w-1/4 rounded-lg shadow-md"
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
      <div className="py-12 w-full">
        <ContextMap
          markers={saopauloCoords ? [saopauloCoords] : []}
          zoomToId="saopaulo"
          title="Where is São Paulo?"
          geography={saopauloCoords?.geography}
        />
      </div>

      {/* 6. INSIDE THE CITY */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold mb-12 text-center">
          Inside the City
        </h2>

        <div className="space-y-6">
          {sections.map((s) => (
            <div
              key={s.title}
              onClick={() => navigate(s.path)}
              className="cursor-pointer border-b border-stone-200 pb-6 hover:pl-2 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-handwriting text-stone-800 group-hover:text-stone-600 transition-colors duration-300">
                  {s.title}
                </h2>
                <div className="w-8 h-8 rounded-full border-2 border-stone-400 flex items-center justify-center group-hover:border-stone-600 group-hover:bg-stone-100 transition-all duration-300">
                  <img src="/assets/plus.svg" alt="Expand" className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. GALLERY */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl text-center mb-10">The Rest of It</h2>

        <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
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
