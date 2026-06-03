import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

const primaryBtn =
  "inline-flex items-center justify-center rounded-full border border-warmGold/50 bg-warmGold px-8 py-3 text-sm font-semibold uppercase tracking-wider text-warmTaupe shadow-md transition-all duration-200 hover:bg-galleryGold hover:border-warmGold";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-full border border-warmTaupe/25 bg-white/70 px-6 py-2.5 text-sm font-cormorant font-semibold text-warmTaupe transition-colors duration-200 hover:border-goldAccent/50 hover:bg-white";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center px-4 sm:px-6 pt-10 sm:pt-14 pb-20 text-stone-800">
      <SEO
        title="Page not found | Nomad Scribbles"
        description="This page isn't on the map. Return home, search the archive, or pick a journey to continue exploring."
        image={cloudinaryUrlFromLegacyPath("/images/Adventures/AdventuresBD.webp", { width: 1200 })}
        noindex
      />

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-goldAccent font-semibold">
          Off the map
        </p>
        <h1 className="mt-3 font-cormorant text-6xl sm:text-7xl font-semibold text-warmTaupe leading-none">
          404
        </h1>
        <p className="mt-4 font-cormorant italic text-xl sm:text-2xl text-stone-700 leading-snug">
          This path isn&apos;t on the journey yet
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 w-full max-w-md rounded-2xl border border-warmTaupe/20 bg-white/80 backdrop-blur-sm shadow-card px-6 py-7 sm:px-8 sm:py-8 text-center"
      >
        <p className="font-cormorant text-base sm:text-lg leading-relaxed text-stone-800">
          The link may be old, mistyped, or from a page still being built. Nomad Scribbles grows as we
          travel — try one of these instead.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link to="/" className={primaryBtn}>
            Return home
          </Link>
          <Link to="/search" className={secondaryBtn}>
            Search the archive
          </Link>
          <Link to="/brazil" className={secondaryBtn}>
            Start in Brazil
          </Link>
        </div>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        aria-label="Explore the site"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold w-full text-center sm:w-auto sm:mr-1">
          Or try
        </span>
        <Link to="/#explore" className="font-cormorant text-base text-goldAccent underline-offset-2 hover:text-warmGold hover:underline transition-colors">
          Adventures map
        </Link>
        <Link to="/nomads-gallery" className="font-cormorant text-base text-goldAccent underline-offset-2 hover:text-warmGold hover:underline transition-colors">
          Nomads Gallery
        </Link>
        <Link to="/nomads-shop" className="font-cormorant text-base text-goldAccent underline-offset-2 hover:text-warmGold hover:underline transition-colors">
          Nomads Shop
        </Link>
      </motion.nav>
    </div>
  );
}
