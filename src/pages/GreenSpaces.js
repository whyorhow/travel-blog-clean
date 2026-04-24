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

function GreenSpaces({ openLightbox }) {
  const images = artImages.filter(img => img.category === "Parks");

  const getImage = (id) => images.find(i => i.id === id);
  
  const imageOrder = [
    "park1", "park2", "park3", "park4", "park5", "park6", "park7"
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
      text: "São Paulo's parks are not escapes from the city. They are where everyday life continues outdoors.\n\nIn São Paulo's green spaces, people sit, move, and rest in the same spaces at the same time. There's a quiet understanding in how it all runs. Everyone brings their own pace and activity, but no one fully dominates the space. Over time, that creates a feeling that the park belongs to everyone and no one in particular, just for as long as you're in it."
    },
    {
      id: "park2",
      title: "",
      coverImage: "park2",
      caption: "A caterpillar crosses stone warmed by the sun.",
      text: "People sit on the grass with takeaway containers still half open, eating between conversations. A dog stands still for once, watching everything except its owner. Runners move through at a steady, even pace, not rushing, just continuing. People drift toward shade and stay there. A group sits under a tree, phones down for a few minutes. Light moves across bags, arms, and the ground as leaves above move in the breeze. Nearby, someone lies back on the grass with their eyes closed, not asleep, just resting. It's still São Paulo. Just with less urgency."
    },
    {
      id: "park1",
      title: "",
      coverImage: "park1",
      caption: "Brazilwood tree.",
      text: "São Paulo is a city built in concrete, but it doesn't stay that way for long. Green spaces aren't treated as something separate or occasional - they're used as part of everyday life. People bring what they need with them and stay for hours. Food, chairs, music, conversations that stretch out without much structure.\n\nThe same scenes repeat across different parks, on different days, in different parts of the city. After a while, you start to expect it. A patch of shade, a bit of grass, the edge of a path - it's enough. They're used too often, and too naturally, to feel separate from everyday life."
    },
    {
      id: "park3",
      title: "",
      coverImage: "park3",
      caption: "A Banyan tree, a species known for its massive size and unique root structure.",
      text: "The trees here were already established before much of the city was built around them, and they haven't been pushed aside. Roots break through the edges of paths and lift sections of concrete over time. After rain, water settles into the soil and stays there longer, held in place rather than drained away."
    },
    {
      id: "park5",
      title: "",
      coverImage: "park5",
      caption: "Tree stumps gather moss, fungi, insects.",
      text: "Tree stumps gather moss over time. Fungi spread in rings around fallen wood. Beetles work through what's already down, while termites move through what's still standing. Fine cracks widen slightly, holding bits of soil where something new starts to grow."
    },
    {
      id: "park4",
      title: "",
      coverImage: "park4",
      caption: "In the canopy, a monkey pauses above the paths.",
      text: "Monkeys move between branches without hesitation. Birds build nests in light posts. Ants cross picnic blankets in steady lines, cutting through whatever is in their way. People step around ants without thinking. Food is left open for a moment and something small appears.\n\nIt's not organised, and no one is directing it. People don't stop what they're doing, and the animals don't either. They move around each other, close enough to notice, but not close enough to interrupt."
    },
    {
      id: "park7",
      title: "",
      coverImage: "park7",
      caption: "Bamboo Canopy Tunnel.",
      text: ""
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
        title="Green Spaces - São Paulo | Nomad Scribbles"
        description="São Paulo's parks as living rhythm, not decoration."
        image={cloudinaryImageUrl("SP-Parks/small/Park1", { width: 1200 })}
        slug="/brazil/saopaulo/green-spaces"
      />

      {/* HERO */}
      <motion.div layoutId="green-spaces-card" className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-handwriting text-[#2e5c31]">
          Green Spaces
        </h1>

        <div className="mt-6 bg-[#2e5c31]/10 p-4 rounded-lg border-l-4 border-[#2e5c31]">
          <p className="text-xl md:text-2xl text-stone-800 italic font-medium">
            São Paulo's parks are not escapes from the city. They are where everyday life continues outdoors.
          </p>
        </div>
      </motion.div>

      {/* STORY CONTENT */}
      <div className="max-w-6xl mx-auto px-6 space-y-16 pb-24">

        {sections.map((s, index) => {
          const img = s.coverImage ? getImage(s.coverImage) : null;

          return (
            <div key={s.id}>
              {/* Text-only sections */}
              {s.text && (
                <div className="text-center max-w-4xl mx-auto">
                  <div className="text-lg leading-relaxed text-stone-800">
                    {s.text.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className={pIndex > 0 ? 'mt-6' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Image-only sections (as interruptions) */}
              {s.coverImage && (
                <div className="flex justify-center mt-12">
                  <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                    <motion.img
                      layoutId={index === 1 ? "green-spaces-hero-image" : undefined}
                      src={cloudSmallSrc(img)}
                      alt={s.caption}
                      onClick={() => handleImageClick(s.coverImage)}
                      className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
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

      {/* CLOSING STATEMENT */}
      <motion.div className="max-w-5xl mx-auto px-6 pt-8 pb-12 text-center">
        <div className="bg-[#2e5c31]/10 p-4 rounded-lg border-l-4 border-[#2e5c31]">
          <p className="text-xl md:text-2xl text-stone-800 italic font-medium">
            It never settles into one way of being used.
          </p>
        </div>
      </motion.div>

      {/* NAV */}
      <div className="text-center pb-16 flex justify-center gap-8">
        <Link
          to="/brazil/saopaulo/street-murals"
          className="text-[#2e5c31] underline"
        >
          Next: Street Murals →
        </Link>
        <Link
          to="/brazil/saopaulo"
          className="text-[#2e5c31] underline"
        >
          ← Back to São Paulo
        </Link>
      </div>
      </div>
    </motion.div>
  );
}

export default GreenSpaces;
