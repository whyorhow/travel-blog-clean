import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import CountryIntro from "../components/CountryIntro";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import greeceTitle from "../assets/images/Greece-Title.webp";
import greeceMap from "../assets/images/Greece-Map.svg";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
// import GreeceMap from "../components/GreeceMap"; // (create later or reuse style)

export default function Greece() {
  const navigate = useNavigate();

  const mapMarkers = [
    { id: "athens", name: "Athens", x: 520, y: 420, path: "/greece/athens" }
  ];

  const spreadBackgroundStyle = {
    backgroundImage: `url(${paperTexture})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "url(#torn-paper-filter)",
    opacity: 0.95,
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">

      <SEO
        title="Greece | Nomad Scribbles"
        description="Greece unfolds slowly — through history, movement, and everyday rituals. Begin in Athens, then follow the thread."
        image={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Acropolis Hill.webp", { width: 1200 })}
        slug="/greece"
      />

      {/* HERO */}
      <CountryIntro
        title="Greece"
        titleImage={greeceTitle}
        heroImage="/images/Greece/Athens/Small/Acropolis Hill.webp"
        heroAlt="Acropolis overlooking Athens"
        intro="History doesn't sit behind glass here — it moves with you. It appears between streets, above rooftops, and in places you're not expecting. Athens is where that presence becomes impossible to ignore."
        guideLine="Begin in Athens, then follow the city outward."
      />

      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <defs>
          <filter id="torn-paper-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </defs>
      </svg>

      {/* START HERE SECTION */}
      <section className="relative w-full py-24">
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
          style={spreadBackgroundStyle}
        />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-12">

          {/* ATHENS CARD */}
          <div
            onClick={() => navigate("/greece/athens")}
            className="relative w-full max-w-[320px] aspect-[3/4] cursor-pointer overflow-hidden rounded-xl shadow-xl group lg:-translate-x-16"
          >
            <img
              src={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Tragopogon Flower.webp", { width: 1000 })}
              alt="Athens"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
              <div>
                <h3 className="text-white text-2xl font-cormorant">Athens</h3>
                <p className="text-[#FFD700] text-xs italic mt-1">
                  Enter the city
                </p>
              </div>
            </div>
          </div>

          {/* MAP (simplified placeholder for now) */}
          <div className="w-full max-w-[390px] opacity-90">
            {/* Replace with your styled map component later */}
            <img
              src={greeceMap}
              alt="Map of Greece"
              className="w-full h-auto scale-[1.5]"
            />
          </div>
        </div>
      </section>

      {/* FUTURE EXPANSION (soft, not "coming soon") */}
      <div className="text-center pb-20 px-6 pt-32">
        <p className="text-sm italic text-white/60">
          More places will find their way here over time.
        </p>
      </div>

      {/* NAV */}
      <div className="flex justify-center pb-16">
        <Link
          to="/adventures"
          className="flex items-center justify-center text-[#FFD700] hover:text-white transition-colors border border-[#FFD700]/40 px-8 py-3 rounded-full"
        >
          <span className="mr-3">←</span>
          <span className="text-sm tracking-widest uppercase">All Adventures</span>
        </Link>
      </div>

    </div>
  );
}
