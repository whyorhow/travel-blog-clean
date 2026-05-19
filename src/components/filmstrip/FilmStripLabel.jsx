import React from "react";
import { motion } from "framer-motion";

/** Title and optional description for a thematic filmstrip. */
export default function FilmStripLabel({ id, title, description, index = 0, compact = false }) {
  return (
    <motion.header
      id={id}
      className={`max-w-2xl ${compact ? "film-strip-label--compact mb-0 px-4 text-center mx-auto" : "mb-4 md:mb-5 px-4 sm:px-8 md:px-12"}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.35em] font-cormorant mb-0.5 ${
          compact ? "text-[#5c5348]" : "text-warmMuted"
        }`}
      >
        strip {String(index + 1).padStart(2, "0")}
      </p>
      <h2
        className={`font-cormorant font-semibold leading-tight ${
          compact
            ? "text-lg sm:text-xl text-[#1f1c18]"
            : "text-2xl sm:text-3xl text-primaryText"
        }`}
      >
        {title}
      </h2>
      {description && !compact && (
        <p className="mt-2 text-sm sm:text-base text-text-muted font-cormorant italic leading-relaxed">
          {description}
        </p>
      )}
    </motion.header>
  );
}
