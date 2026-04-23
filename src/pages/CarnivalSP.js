import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";

const cloudSmallSrc = (img) =>
  cloudinaryImageUrl(img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image), { width: 1200 });

const cloudFullSrc = (img) =>
  cloudinaryImageUrl(
    img?.lightboxImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.lightboxImage || img?.image),
    { width: 2000 }
  );

function CarnivalSP({ openLightbox }) {
  const images = artImages.filter(img => img.category === "Carnival");

  const getImage = (id) => images.find(i => i.id === id);

  const imageOrder = [
    "carnival1",
    "carnival5",
    "carnival2",
    "carnival3",
    "carnival10",
    "carnival12",
    "carnival11",
    "carnival4",
    "carnival6",
    "carnival14",
    "carnival7"
  ];

  const sortedImages = imageOrder.map(id => images.find(img => img.id === id)).filter(Boolean);

  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      openLightbox(index, sortedImages);
    }
  };

  const sections = [
    {
      id: "intro",
      title: "",
      coverImage: null,
      caption: null,
      text:
        "Carnival operates in two distinct conditions within the same city.\n\nOne is contained within a fixed route where movement is directed and observed. The other spreads into open streets where movement follows sound and proximity rather than layout."
    },

    {
      id: "contained_heading",
      title: "",
      coverImage: null,
      caption: null,
      text: "Contained Movement"
    },

    {
      id: "stadium_intro",
      title: "",
      coverImage: "carnival2",
      caption: "Movement follows a fixed route.",
      text:
        "People are positioned along both sides of a fixed route. Movement happens in front of them in continuous sequence.\n\nThe crowd remains in place, watching groups pass through the centre."
    },

    {
      id: "stadium_groups",
      title: "",
      coverImage: "carnival4",
      caption: "Groups move in formation.",
      text:
        "Groups move along a defined path in consistent formation. Spacing and timing remain stable within each section. One group exits before the next begins."
    },

    {
      id: "stadium_variation",
      title: "",
      coverImage: "carnival6",
      caption: "Repetition across groups.",
      text:
        "Different groups follow the same route with small variations in sound and costume. The viewing position of the crowd remains fixed."
    },

    {
      id: "transition",
      title: "",
      coverImage: "carnival3",
      caption: "The fixed route ends.",
      text:
        "Beyond the main route, barriers disappear and movement is no longer directed in the same way.\n\nGroups begin forming in open streets where space is shared rather than assigned."
    },

    {
      id: "open_heading",
      title: "",
      coverImage: null,
      caption: null,
      text: "Open Movement"
    },

    {
      id: "bloco_entry",
      title: "",
      coverImage: "carnival5",
      caption: "A rhythm begins to set movement.",
      text:
        "In open streets, groups gather without fixed structure. A rhythm begins and movement adjusts to it, shifting between walking and continuous small-scale dancing.\n\nMovement is no longer directed by layout but by sound and proximity."
    },

    {
      id: "street_density",
      title: "",
      coverImage: "carnival10",
      caption: "Movement compresses in the street.",
      text:
        "Groups form tightly, leaving narrow gaps between them. Movement slows and restarts in short cycles as sound shifts position.\n\nPeople adjust pace depending on nearby rhythm."
    },

    {
      id: "sound_layer",
      title: "",
      coverImage: "carnival12",
      caption: "Sound moves through the street.",
      text:
        "Drummers pause briefly, but rhythm continues through other players nearby. Sound moves between groups without stopping.\n\nPeople remain still or move depending on where sound is strongest."
    },

    {
      id: "peak",
      title: "",
      coverImage: "carnival14",
      caption: "Streets fully occupied.",
      text:
        "Streets are filled with overlapping movement. Groups cluster tightly, leaving little open space. Movement becomes reactive, adjusting continuously to density and sound."
    },

    {
      id: "release",
      title: "",
      coverImage: "carnival7",
      caption: "Movement begins to loosen.",
      text:
        "Groups begin to separate as they move away from central areas. Space opens between clusters. Movement becomes less compressed."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-stone-50 relative"
    >
      <SEO
        title="Carnival - São Paulo | Nomad Scribbles"
        description="Carnival as movement through the city."
        image={cloudinaryImageUrl("carnival14", { width: 1200 })}
        slug="/brazil/saopaulo/carnival"
      />

      {/* HERO */}
      <motion.div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-handwriting text-[#2e5c31]">
          Carnival
        </h1>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 space-y-16 pb-24">

        {sections.map((s, index) => {
          const img = s.coverImage ? getImage(s.coverImage) : null;

          return (
            <div key={s.id}>
              {s.text && (
                <div className="text-center max-w-4xl mx-auto">
                  <div className="text-lg leading-relaxed text-stone-800">
                    {s.text.split("\n\n").map((p, i) => (
                      <p key={i} className={i > 0 ? "mt-6" : ""}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {s.coverImage && (
                <div className="flex justify-center mt-12">
                  <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                    <img
                      src={cloudSmallSrc(img)}
                      alt={s.caption}
                      onClick={() => handleImageClick(s.coverImage)}
                      className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                    />
                    {s.caption && (
                      <p className="text-sm italic text-stone-500 text-center mt-3">
                        {s.caption}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* NAV */}
      <div className="text-center pb-16">
        <Link to="/brazil/saopaulonew" className="text-[#2e5c31] underline">
          Back to São Paulo
        </Link>
      </div>
    </motion.div>
  );
}

export default CarnivalSP;
