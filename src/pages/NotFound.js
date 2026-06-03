import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center px-4 pt-4 pb-10 bg-gradient-to-b from-[#5c6e53] via-[#485b3c] to-[#37462f] text-galleryGold">

      {/* SEO */}
      <SEO
        title="404 Not Found | Nomad Scribbles"
        description="Oops! The page you're looking for doesn't exist. Return home to continue exploring Nomad Scribbles."
        noindex
      />

      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">404 Not Found | Nomad Scribbles</h1>


      {/* Page Title */}
      <div className="relative z-10 mt-20 mb-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">404 — Page Not Found</h2>
      </div>

      {/* 404 Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-galleryGold max-w-md"
      >
        <p className="text-lg sm:text-xl md:text-2xl">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mt-2 text-base sm:text-lg">
          You can return to the home page to continue exploring Nomad Scribbles.
        </p>
      </motion.div>

      {/* Return Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          to="/"
          className="bg-gray-400 text-primaryText font-semibold py-2 px-6 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
