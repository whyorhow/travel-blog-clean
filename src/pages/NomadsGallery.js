import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json";
import SEO from "../components/SEO";
import { fadeScale, staggerContainer } from "../utils/animations";
import { trackEvent } from "../utils/analytics";

/**
 * UTILS FOR SCATTER GALLERY WALL
 */
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

const prepareGalleryRowsRefined = (baseImages) => {
  const shuffled = [...baseImages].sort(() => 0.5 - Math.random());
  const rows = [];
  let i = 0;
  const justifications = ["justify-start", "justify-center", "justify-end", "justify-between", "justify-around"];

  while (i < shuffled.length) {
    // Favoring singular images (80% singular) to avoid frequent side-by-side
    const rowSize = Math.random() > 0.8 ? 2 : 1;
    const rowSlice = shuffled.slice(i, i + rowSize);
    i += rowSize;

    rows.push({
      images: rowSlice.map((img) => ({
        ...img,
        width: rowSize === 2 ? getRandomInRange(28, 48) : getRandomInRange(55, 80),
        offsetY: rowSize === 2 ? getRandomInRange(-4, 4) : 0,
        lateralShift: getRandomInRange(-4, 4), // internal rem shift
      })),
      marginTop: getRandomInRange(1, 6), // Drastically tighter (rem)
      marginBottom: getRandomInRange(1, 6), // Drastically tighter (rem)
      rowJustify: justifications[Math.floor(Math.random() * justifications.length)],
      rowPaddingLeft: Math.random() > 0.5 ? getRandomInRange(2, 10) : 0,
      rowPaddingRight: Math.random() > 0.5 ? getRandomInRange(2, 10) : 0,
      isDouble: rowSize === 2,
    });
  }
  return rows;
};

export default function NomadsGallery({ openLightbox }) {
  const [galleryRows, setGalleryRows] = useState([]);

  useEffect(() => {
    setGalleryRows(prepareGalleryRowsRefined(artImages));
  }, []);

  const handleShuffle = () => {
    setGalleryRows(prepareGalleryRowsRefined(artImages));
    trackEvent("click_shuffle", "Nomads Gallery", "Shuffle Button");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (globalIndex, allImages) => {
    openLightbox(globalIndex, allImages);
    trackEvent("click_gallery_image", "Nomads Gallery", allImages[globalIndex].title);
  };

  // Flatten rows for lightbox navigation
  const allImagesFlat = galleryRows.flatMap(row => row.images);

  return (
    <div className="pt-4 pb-64 relative min-h-screen overflow-x-hidden">
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="Explore our curated gallery of photos and artwork from our travels around the world."
        image="/images/NomadsGallery/NGTitle.webp"
        slug="/nomads-gallery"
        canonical="https://nomadscribbles.com/nomads-gallery"
      />

      {/* Page Title */}
      <div className="flex flex-col items-center mb-8 relative z-10 mt-14 sm:mt-24">
        <img
          src={process.env.PUBLIC_URL + "/images/NomadsGallery/NGTitle.webp"}
          alt="Nomads Gallery"
          fetchPriority="high"
          loading="eager"
          className="w-[56%] max-w-[8.4rem] sm:max-w-[14rem] md:max-w-[19.6rem] lg:max-w-[22.4rem] h-auto"
        />

        <div className="text-center text-sm sm:text-lg font-bold mt-4 text-[#eeda8d] drop-shadow-md opacity-80 flex flex-wrap justify-center gap-2 items-baseline">
          <span>click a piece below or</span>
          <button
            onClick={handleShuffle}
            className="bg-transparent border-none p-0 font-bold text-white hover:text-[#ffeebb] transition-colors cursor-pointer"
          >
            shuffle
          </button>
        </div>
      </div>

      {/* Scatter Wall Layout */}
      <motion.main
        className="w-full max-w-screen-2xl mx-auto flex flex-col relative z-10"
        style={{
          paddingLeft: `4%`,
          paddingRight: `4%`
        }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {galleryRows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center ${row.rowJustify} w-full`}
            style={{
              marginTop: `${row.marginTop}rem`,
              marginBottom: `${row.marginBottom}rem`,
              paddingLeft: `${row.rowPaddingLeft}%`,
              paddingRight: `${row.rowPaddingRight}%`,
            }}
          >
            {row.images.map((img) => {
              const globalIndex = allImagesFlat.findIndex(f => f.id === img.id);

              return (
                <motion.div
                  key={`${img.id}-${rowIndex}`}
                  className={`relative flex flex-col group`}
                  style={{
                    width: `100%`,
                    maxWidth: `${img.width}%`,
                    transform: `translateY(${img.offsetY}rem) translateX(${img.lateralShift}rem)`,
                  }}
                  variants={fadeScale}
                  onClick={() => handleClick(globalIndex, allImagesFlat)}
                  onMouseEnter={() => trackEvent("hover_gallery_image", "Nomads Gallery", img.title)}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleClick(globalIndex, allImagesFlat);
                  }}
                >
                  {/* Static Image Frame - NO BORDERS OR SHADOWS */}
                  <div className="relative cursor-pointer overflow-hidden">
                    <img
                      src={process.env.PUBLIC_URL + img.image.replace(/\.(jpg|jpeg|png)$/, ".webp")}
                      alt={img.title}
                      className="w-full h-auto block shadow-2xl"
                      loading="lazy"
                    />
                  </div>

                  {/* Museum Label */}
                  <motion.div
                    className="mt-3 ml-auto max-w-[170px] p-2 bg-white/5 backdrop-blur-md border-l border-[#eeda8d]/20 transition-colors duration-500 group-hover:bg-white/10 shadow-lg"
                    initial={{ opacity: 0.4, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 className="text-white text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1 font-cormorant leading-tight">
                      {img.title}
                    </h4>
                    {img.category && (
                      <p className="text-[#eeda8d]/60 text-[7px] sm:text-[9px] italic font-serif leading-tight">
                        {img.category}
                      </p>
                    )}
                    <div className="mt-1.5 w-4 h-[1px] bg-[#eeda8d]/30" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.main>

      {/* Footer Nav */}
      <div className="flex justify-center mt-64 mb-20">
        <Link to="/" className="text-white hover:text-[#eeda8d] underline decoration-1 underline-offset-4 text-sm opacity-60">
          ← Return Home
        </Link>
      </div>
    </div>
  );
}
