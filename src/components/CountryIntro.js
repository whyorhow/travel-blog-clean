import { motion } from "framer-motion";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function CountryIntro({
  title,
  titleImage,
  heroImage,
  heroAlt,
  intro,
  guideLine,
}) {
  return (
    <div className="relative h-[55vh] w-full overflow-hidden flex items-center justify-center">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={cloudinaryUrlFromLegacyPath(heroImage, { width: 2000 })}
          alt={heroAlt}
          className="w-full h-full object-cover object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[#1a1a1a]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="space-y-4"
        >
          {/* Title - Custom Image or Text */}
          {titleImage ? (
            <img
              src={titleImage}
              alt={title}
              className="w-full max-w-lg h-auto object-contain drop-shadow-2xl mx-auto scale-[0.6] filter contrast-150 saturate-120 brightness-90"
            />
          ) : (
            <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-white drop-shadow-xl">
              {title}
            </h1>
          )}

          {/* Intro */}
          <p className="text-base md:text-lg font-cormorant text-white/95 leading-relaxed max-w-2xl mx-auto">
            {intro}
          </p>

          {/* Guiding line */}
          {guideLine && (
            <p className="text-sm md:text-base italic text-[#FFD700] opacity-90">
              {guideLine}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CountryIntro;
