import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import galleryPool from "../assets/artImages/slices/bundles/gallery-pool.json";
import SEO from "../components/SEO";
import CloudinaryImage from "../components/CloudinaryImage";
import { trackEvent } from "../utils/analytics";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { FullscreenLightbox } from "../components/GalleryWall";

/**
 * Zone layout — 3 columns on desktop, single column on mobile.
 * Narrow desktop gets taller bands and less jitter to prevent overlap.
 */
const ROTATIONS = [-3, -2, -1, 1, 2, 3];

const LAYOUTS = {
  mobile: {
    columns: [50],
    zoneHeight: 82,
    jitterTop: 0,
    jitterLeft: 3,
    widthMin: 68,
    widthRange: 10,
  },
  narrow: {
    columns: [6, 38, 70],
    zoneHeight: 118,
    jitterTop: 10,
    jitterLeft: 4,
    widthMin: 14,
    widthRange: 5,
  },
  desktop: {
    columns: [5, 36, 67],
    zoneHeight: 96,
    jitterTop: 14,
    jitterLeft: 4,
    widthMin: 16,
    widthRange: 6,
  },
};

const GALLERY_IMAGE_COUNT = 8;

function getLayoutMode(width) {
  if (width < 768) return "mobile";
  if (width < 1200) return "narrow";
  return "desktop";
}

const estimateSlotHeightVh = (slot) => {
  const imageVh = slot.width * 0.72;
  const captionVh = 14;
  return imageVh + captionVh + 6;
};

const generateSlots = (count, layoutMode = "desktop") => {
  const layout = LAYOUTS[layoutMode] || LAYOUTS.desktop;
  const slots = [];
  const columnCount = layout.columns.length;

  if (layoutMode === "mobile") {
    for (let i = 0; i < count; i++) {
      const width = Math.floor(Math.random() * layout.widthRange) + layout.widthMin;
      const left = Math.floor((100 - width) / 2) + (Math.floor(Math.random() * 6) - 3);
      const top = 22 + i * layout.zoneHeight;
      slots.push({ top, left: Math.max(2, left), width, rotate: 0 });
    }
    return slots;
  }

  const columnTops = Array(columnCount).fill(24);

  for (let i = 0; i < count; i++) {
    const col = i % columnCount;
    const baseLeft = layout.columns[col];
    const jitterLeft =
      layout.jitterLeft > 0
        ? Math.floor(Math.random() * (layout.jitterLeft * 2 + 1)) - layout.jitterLeft
        : 0;
    const width = Math.floor(Math.random() * layout.widthRange) + layout.widthMin;
    const rotate = ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];

    const jitterTop =
      layout.jitterTop > 0
        ? Math.floor(Math.random() * (layout.jitterTop * 2 + 1)) - layout.jitterTop
        : 0;

    let top = columnTops[col] + jitterTop;
    if (i >= columnCount) {
      top = Math.max(top, columnTops[col] + layout.zoneHeight * 0.35);
    }

    slots.push({
      top: Math.max(28, top),
      left: Math.max(2, Math.min(78, baseLeft + jitterLeft)),
      width,
      rotate,
    });

    columnTops[col] = top + estimateSlotHeightVh(slots[slots.length - 1]) + layout.zoneHeight * 0.15;
  }

  return slots;
};

const grungeWallBg = `https://res.cloudinary.com/dqypj6rlw/image/upload/f_auto,q_auto/Assets/Grunge-Texture-Wall`;

export default function NomadsGallery() {
  const [images, setImages] = useState([]);
  const [layoutMode, setLayoutMode] = useState(() =>
    typeof window !== "undefined" ? getLayoutMode(window.innerWidth) : "desktop"
  );
  const [slots, setSlots] = useState(() =>
    generateSlots(GALLERY_IMAGE_COUNT, typeof window !== "undefined" ? getLayoutMode(window.innerWidth) : "desktop")
  );
  const [shuffleKey, setShuffleKey] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const ngTitleSrc = process.env.PUBLIC_URL + "/assets/NGTitle.svg";

  const getRandomSelection = () => {
    const shuffled = [...galleryPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, GALLERY_IMAGE_COUNT);
  };

  useEffect(() => {
    setImages(getRandomSelection());
  }, []);

  const isMobile = layoutMode === "mobile";

  useEffect(() => {
    const onResize = () => {
      const nextMode = getLayoutMode(window.innerWidth);
      setLayoutMode((prev) => {
        if (prev !== nextMode) {
          setSlots(generateSlots(GALLERY_IMAGE_COUNT, nextMode));
        }
        return nextMode;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleShuffle = () => {
    setImages(getRandomSelection());
    setSlots(generateSlots(GALLERY_IMAGE_COUNT, layoutMode));
    setShuffleKey(k => k + 1);
    trackEvent("click_shuffle", "Nomads Gallery", "Shuffle Button");
  };

  const lightboxImages = images.map(img => ({
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    title: img.title,
    description: img.description,
    gumroadLink: img.gumroadLink,
    shopLink: img.shopLink,
  }));

  const handleClick = (index) => {
    setLightboxIndex(index);
    trackEvent("click_gallery_image", "Nomads Gallery", images[index].title);
  };

  const visibleSlots = isMobile ? slots.slice(0, 4) : slots;
  const visibleImages = images.slice(0, visibleSlots.length);
  const pageHeightVh =
    Math.max(...visibleSlots.map((s) => s.top + estimateSlotHeightVh(s)), 100) + 18;

  return (
    <>
    <div
      className="relative w-screen min-h-screen overflow-x-hidden"
      style={{ backgroundImage: `url(${grungeWallBg})`, backgroundSize: "cover", backgroundPosition: "top center", backgroundRepeat: "no-repeat", backgroundAttachment: "scroll" }}
    >
      <div className="absolute inset-0 bg-black/40 md:bg-black/60 z-0 pointer-events-none" />
      {/* Vignette — gallery lighting feel */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)" }} />
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="Explore our curated gallery of photos and artwork from our travels around the world."
        image="/images/NomadsGallery/NGTitle.webp"
        slug="/nomads-gallery"
        canonical="https://nomadscribbles.com/nomads-gallery"
      />

      {/* CONTENT */}
      <div className="relative z-10" style={{ minHeight: `${pageHeightVh}vh` }}>

        {/* Title — reserved header zone, images start at 22vh below */}
        <div className="sticky top-0 left-0 w-full z-30 flex flex-col items-center pt-6 pb-4">
          <img
            src={ngTitleSrc}
            alt="Nomads Gallery"
            fetchPriority="high"
            loading="eager"
            className="w-[50vw] max-w-[14rem] sm:max-w-[20rem] h-auto block"
            style={{ marginBottom: '0.5rem' }}
          />
          <div className="text-center text-sm font-bold mt-2 text-galleryGold drop-shadow-md opacity-80 flex flex-wrap justify-center gap-2 items-baseline">
            <span>click a piece or</span>
            <button
              onClick={handleShuffle}
              className="text-brightGold hover:text-black transition-colors drop-shadow-md bg-black/50 backdrop-blur-md rounded-full px-4 py-1 border-2 border-brightGold shadow-lg hover:bg-brightGold text-xs font-bold"
            >
              rehang
            </button>
          </div>
        </div>

        {/* Images — fixed slots, only content fades on shuffle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={shuffleKey}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {visibleImages.map((img, index) => {
              const slot = visibleSlots[index];
              if (!slot) return null;
              return (
                <motion.div
                  key={img.id}
                  className="absolute flex flex-col group cursor-pointer"
                  style={{ top: `${slot.top}vh`, left: `${slot.left}vw`, width: `${slot.width}vw`, transform: `rotate(${slot.rotate}deg)`, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleClick(index)}
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === "Enter") handleClick(index); }}
                >
                  <div className="p-3">
                    <CloudinaryImage
                      publicId={img.cloudinary?.gallery}
                      alt={img.title}
                      className="w-full h-auto block"
                      style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
                      sizes="(max-width: 768px) 75vw, 22vw"
                      widths={[300, 500, 800]}
                    />
                  </div>
                  <div className="mt-2 inline-block max-w-[70%] px-3 py-1 bg-white/80 backdrop-blur-sm border border-borderGold" style={{ transform: isMobile ? 'translateX(3%)' : 'translateX(6%)', boxShadow: '0 2px 3px rgba(0,0,0,0.25)' }}>
                    <h4 className="text-rioViolet text-[10px] sm:text-[12px] font-bold uppercase tracking-widest mb-0.5 font-cormorant leading-tight">
                      {img.title}
                    </h4>
                    {img.category && (
                      <p className="text-stone-500 text-[9px] sm:text-[11px] italic font-serif leading-tight">{img.category}</p>
                    )}
                    <div className="mt-2 flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                      <span className="text-[8px] uppercase tracking-widest text-rioViolet font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
                      <div className="w-5 h-5 rounded-full border border-rioViolet/30 flex items-center justify-center group-hover:bg-rioViolet transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rioViolet group-hover:text-white transition-colors duration-300">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer Nav — pinned to bottom of content div */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center z-20">
          <Link
            to="/"
            className="flex flex-row items-center justify-center text-brightGold hover:text-black transition-colors drop-shadow-md bg-black/50 backdrop-blur-md rounded-full px-6 py-2 border-2 border-brightGold shadow-lg hover:bg-brightGold text-sm font-bold"
          >
            <span className="text-lg mr-2">←</span>
            <span className="text-xs font-bold tracking-widest uppercase">Return Home</span>
          </Link>
        </div>
      </div>
    </div>

      {lightboxIndex !== null && (
        <FullscreenLightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
