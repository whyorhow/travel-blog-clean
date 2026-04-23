import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";

const cloudSmallSrc = (img) =>
  cloudinaryImageUrl(
    img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image),
    { width: 1200 }
  );

function StreetMurals({ openLightbox }) {
  const images = artImages.filter(img => img.category === "Murals");

  const getImage = (id) => images.find(i => i.id === id);

  const imageOrder = [
    "graffiti1", // entry condition
    "graffiti2", // passing moment
    "graffiti3", // fragmented view
    "graffiti4", // surface density
    "graffiti5", // recognition through repetition
    "graffiti6", // making in public space
    "graffiti7", // secondary in passing
    "graffiti8", // secondary in density / continuity
    "graffiti9"  // secondary in recognition
  ];

  const sortedImages = imageOrder
    .map(id => images.find(img => img.id === id))
    .filter(Boolean);

  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      openLightbox(index, sortedImages);
    }
  };

  const sections = [
    {
      id: "intro",
      text:
        "Paint appears, fades, and returns again. Colour spreads across walls, underpasses, stairways, and long stretches of concrete.\n\nNothing marks where one begins or ends. They sit directly inside the movement of the city.",
      coverImage: "graffiti1"
    },

    {
      id: "graffiti2",
      text:
        "Most of it is encountered in passing - through windows, crossings, and gaps between buildings.\n\nIt appears briefly, then disappears again as the city continues moving.",
      coverImage: "graffiti2",
      secondaryImage: "graffiti7"
    },

    {
      id: "graffiti3",
      text:
        "Some images sit above eye level. From the street, only fragments are visible. Buildings cut the frame.\n\nPeople pass underneath without stopping.",
      coverImage: "graffiti3"
    },

    {
      id: "graffiti4",
      text:
        "In some areas, walls are fully covered. Layers sit over one another without a clear starting point.\n\nThe same surfaces are passed from different directions, each revealing something slightly different.",
      coverImage: "graffiti4",
      secondaryImage: "graffiti8"
    },

    {
      id: "graffiti5",
      text:
        "People pass the same walls day after day.\n\nSome images are recognised without being looked at directly. Others are only noticed when something has changed - a colour fading, a face partially covered, a section repainted.\n\nFamiliarity builds through repetition rather than attention.",
      coverImage: "graffiti5",
      secondaryImage: "graffiti9"
    },

    {
      id: "graffiti6",
      text:
        "Some of what is passed here is made with the same care as other forms of public work elsewhere.\n\nIt remains on the surface where it was painted, without being separated from the street or given a different position within it.",
      coverImage: "graffiti6"
    },

    {
      id: "closing",
      text:
        "Surfaces continue to change without drawing attention to themselves. New work appears where older images remain partially visible.\n\nSome sections fade, others are replaced, but the wall continues to hold everything at once.\n\nThe streets continue to move through it."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-stone-50 relative"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center, rgba(245, 245, 240, 0.8) 0%, rgba(245, 243, 235, 1) 70%, rgba(240, 235, 225, 1) 100%),
          repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 69, 19, 0.01) 35px, rgba(139, 69, 19, 0.01) 70px),
          repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(160, 82, 45, 0.01) 35px, rgba(160, 82, 45, 0.01) 70px)
        `,
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
      <SEO
        title="Street Murals - São Paulo | Nomad Scribbles"
        description="São Paulo's walls as part of the city's movement and surface."
        image={cloudinaryImageUrl("SP-Murals/small/graffiti1", { width: 1200 })}
        slug="/brazil/saopaulo/street-murals"
      />

      {/* HEADER */}
      <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">
          Street Murals
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-10 text-center">
        <div className="mt-6 bg-[#2e1065]/10 p-4 rounded-lg border-l-4 border-[#2e1065]">
          <p className="text-xl md:text-2xl text-stone-800 italic font-medium">
            Walls across São Paulo rarely stay blank
          </p>
        </div>
      </div>

      {/* STORY FLOW */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-20">

        {sections.map((s) => {
          const img = s.coverImage ? getImage(s.coverImage) : null;
          
          return (
            <div key={s.id}>

              { s.id === "graffiti3" || s.id === "graffiti6" ? (
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* TEXT */}
                  {s.text && (
                    <div className="flex-1 text-lg leading-relaxed text-stone-800">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* IMAGE */}
                  {s.coverImage && img && (
                    <div className="flex-shrink-0 w-full md:w-96">
                      <img
                        src={cloudSmallSrc(img)}
                        alt={img.title || ""}
                        onClick={() => handleImageClick(s.coverImage)}
                        className={`w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ${img.title === "A Lenda do Brasil" ? "scale-75 sm:scale-60 md:scale-60 lg:scale-60" : ""}`}
                      />
                      {img.title && (
                        <p className="text-sm italic text-stone-500 text-center mt-3">
                          {img.title}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : s.id === "intro" || s.id === "graffiti4" || s.id === "closing" ? (
                <div className="flex flex-col items-center">
                  {/* FULL-WIDTH IMAGE */}
                  { s.coverImage && img && (
                    <div className={`w-full max-w-4xl ${s.id === "intro" ? "px-2 py-1" : ""}`}>
                      <img
                        src={cloudSmallSrc(img)}
                        alt={img.title || ""}
                        onClick={() => handleImageClick(s.coverImage)}
                        className={`w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ${(s.id === "intro" && img.title === "Vila Madalena neighborhood") || (s.id === "graffiti4" && img.title === "The Beagles") || (s.id === "closing" && img.title === "A Lenda do Brasil") ? "scale-75 sm:scale-60 md:scale-60 lg:scale-60" : ""}`}
                      />
                      {img.title && (
                        <p className={`text-sm italic text-stone-500 text-center ${s.id === "intro" ? "mt-1" : "mt-3"}`}>
                          {img.title}
                        </p>
                      )}
                      
                      {/* SECONDARY IMAGE - STACKED DENSITY */}
                      {s.secondaryImage && (() => {
                        const secondaryImg = getImage(s.secondaryImage);
                        return secondaryImg && (
                          <div className="mt-6">
                            <img
                              src={cloudSmallSrc(secondaryImg)}
                              alt={secondaryImg.title || ""}
                              onClick={() => handleImageClick(s.secondaryImage)}
                              className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 opacity-95"
                            />
                            {secondaryImg.title && (
                              <p className="text-sm italic text-stone-500 text-center mt-3">
                                {secondaryImg.title}
                              </p>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  
                  {/* TEXT */}
                  {s.text && (
                    <div className="mt-8 text-lg leading-relaxed text-stone-800 text-center max-w-3xl">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : s.id === "graffiti2" ? (
                <div className="flex flex-col items-center">
                  {/* TEXT */}
                  {s.text && (
                    <div className="text-lg leading-relaxed text-stone-800 mb-8 text-center max-w-3xl">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {/* PRIMARY IMAGE */}
                  {s.coverImage && img && (
                    <div className="w-64 sm:w-72 md:w-80">
                      <img
                        src={cloudSmallSrc(img)}
                        alt={img.title || ""}
                        onClick={() => handleImageClick(s.coverImage)}
                        className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      />
                      {img.title && (
                        <p className="text-sm italic text-stone-500 text-center mt-3">
                          {img.title}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* SECONDARY IMAGE - OFFSET */}
                  {s.secondaryImage && (() => {
                    const secondaryImg = getImage(s.secondaryImage);
                    return secondaryImg && (
                      <div className="mt-6 ml-8 w-48 sm:w-56 md:w-64">
                        <img
                          src={cloudSmallSrc(secondaryImg)}
                          alt={secondaryImg.title || ""}
                          onClick={() => handleImageClick(s.secondaryImage)}
                          className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 opacity-90"
                        />
                        {secondaryImg.title && (
                          <p className="text-xs italic text-stone-500 text-center mt-2">
                            {secondaryImg.title}
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : s.id === "graffiti5" ? (
                <div className="flex flex-col items-center">
                  {/* TEXT */}
                  {s.text && (
                    <div className="text-lg leading-relaxed text-stone-800 mb-8 text-center max-w-3xl">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {/* PRIMARY IMAGE */}
                  {s.coverImage && img && (
                    <div className="w-64 sm:w-72 md:w-80">
                      <img
                        src={cloudSmallSrc(img)}
                        alt={img.title || ""}
                        onClick={() => handleImageClick(s.coverImage)}
                        className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      />
                      {img.title && (
                        <p className="text-sm italic text-stone-500 text-center mt-3">
                          {img.title}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* SECONDARY IMAGE - OFFSET */}
                  {s.secondaryImage && (() => {
                    const secondaryImg = getImage(s.secondaryImage);
                    return secondaryImg && (
                      <div className="mt-6 ml-8 w-48 sm:w-56 md:w-64">
                        <img
                          src={cloudSmallSrc(secondaryImg)}
                          alt={secondaryImg.title || ""}
                          onClick={() => handleImageClick(s.secondaryImage)}
                          className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 opacity-90"
                        />
                        {secondaryImg.title && (
                          <p className="text-xs italic text-stone-500 text-center mt-2">
                            {secondaryImg.title}
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {/* TEXT */}
                  {s.text && (
                    <div className="text-lg leading-relaxed text-stone-800 mb-8 text-center max-w-3xl">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* NAVIGATION */}
      <div className="text-center pb-16">
        <Link to="/brazil/saopaulonew" className="text-[#2e1065] underline">
          Back to São Paulo
        </Link>
      </div>

      </div>
    </motion.div>
  );
}

export default StreetMurals;
