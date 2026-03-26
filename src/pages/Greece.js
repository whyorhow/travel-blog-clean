import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import titleImg from "../assets/images/Greece-Title.webp";
import mapImg from "../assets/images/Greece-Map.svg";

export default function Greece() {
  return (
    <div className="min-h-screen bg-stony-paper text-darkText">
      {/* SEO Component */}
      <SEO
        title="Greece Adventures | Ancient Wonders & Island Escapes"
        description="Explore our Greek adventures - from ancient Athens to hidden islands, discover the magic of Greece's history, culture, and breathtaking landscapes."
        image={cloudinaryUrlFromLegacyPath("/images/Greece/Athens/Small/Acropolis Hill.webp", { width: 1200 })}
        slug="greece"
      />

      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Greece Adventures | Ancient Wonders & Island Escapes</h1>

      {/* Page Title */}
      <div className="flex justify-center mb-12 pt-8">
        <img
          src={titleImg}
          alt="Greece"
          className="w-[250px] sm:w-[350px] md:w-[450px] h-auto"
        />
      </div>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-cormorant italic leading-relaxed tracking-wide text-[#3a3a3a] mb-8">
            Greece isn't just a destination—it's a journey through time, where ancient myths meet modern life, and every sunset tells a story.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-[#4a4a4a] max-w-4xl mx-auto">
            From the sacred Acropolis to hidden island chapels, from bustling Athens cafes to quiet coastal villages, 
            discover the places that captured our hearts and reminded us why Greece has been inspiring travelers for millennia.
          </p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-[#d4af37]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#3a3a3a] font-handwriting">
              Our Greek Journey
            </h2>
            <div className="flex justify-center">
              <img
                src={mapImg}
                alt="Greece Map"
                className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Athens Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-[#d4af37]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#3a3a3a] font-handwriting">
              Athens
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-[#4a4a4a] mb-8 text-center max-w-3xl mx-auto">
              The ancient heart of Greece, where marble temples touch the sky and modern life pulses through streets that have witnessed thousands of years of history.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[#d4af37]">What We Discovered</h3>
                <ul className="space-y-2 text-[#4a4a4a]">
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    The Acropolis at sunrise, when marble glows like gold
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Hidden chapels and sacred spaces around every corner
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Cafés where time slows down and coffee becomes a ritual
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Coastal escapes to nearby islands and beaches
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[#d4af37]">Favorite Moments</h3>
                <ul className="space-y-2 text-[#4a4a4a]">
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Eating crusty Greek bread straight from the oven
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Watching Athenian sunsets paint the city in gold
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Finding ancient columns in unexpected places
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    Meeting locals who shared their stories with us
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/greece/athens"
                className="inline-flex items-center justify-center bg-[#d4af37] hover:bg-[#b8941f] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg mr-3">Explore Athens</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#d4af37]/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#3a3a3a] font-handwriting">
              More Greek Adventures Coming Soon
            </h2>
            <p className="text-lg text-[#4a4a4a] mb-6">
              We're still documenting our journeys through the Greek islands, ancient sites, and hidden gems. 
              Stay tuned for more stories from Santorini, Crete, and beyond!
            </p>
            <div className="flex justify-center space-x-8 text-[#d4af37]">
              <span className="text-sm uppercase tracking-widest">Santorini</span>
              <span className="text-sm uppercase tracking-widest">Crete</span>
              <span className="text-sm uppercase tracking-widest">Mykonos</span>
              <span className="text-sm uppercase tracking-widest">Rhodes</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 mb-12">
          <Link 
            to="/adventures" 
            className="flex items-center justify-center text-[#3a3a3a] hover:text-[#d4af37] transition-colors bg-white/80 backdrop-blur-sm rounded-full px-8 py-3 border border-[#d4af37]/20 shadow-md hover:bg-white/90 w-fit min-w-[200px]"
          >
            <span className="text-lg mr-3">←</span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center">All Adventures</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
