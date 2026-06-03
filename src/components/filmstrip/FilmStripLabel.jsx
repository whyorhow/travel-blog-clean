import React from "react";
import { motion } from "framer-motion";
import { tw } from "../../styles";

/** Title and optional description for a thematic filmstrip. */
export default function FilmStripLabel({ id, title, description, index = 0, compact = false }) {
  return (
    <motion.header
      id={id}
      className={`w-full max-w-2xl ${compact ? "film-strip-label--compact mb-0 text-center mx-auto" : "mb-4 md:mb-5 px-4 sm:px-8 md:px-12"}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      <p
        className={`font-cormorant uppercase tracking-[0.28em] mb-1 ${
          compact
            ? `${tw.surface.paper.subtle} text-center`
            : `${tw.surface.default.subtle} tracking-[0.35em] text-[10px] text-warmMuted`
        }`}
      >
        strip {String(index + 1).padStart(2, "0")}
      </p>
      <h2
        className={`font-cormorant font-semibold leading-tight ${
          compact
            ? `${tw.surface.paper.heading} text-center`
            : `${tw.surface.default.heading} text-primaryText`
        }`}
      >
        {title}
      </h2>
      {description && !compact && (
        <p className={`mt-2 font-cormorant italic leading-relaxed ${tw.surface.default.body} text-sm sm:text-base`}>
          {description}
        </p>
      )}
    </motion.header>
  );
}
