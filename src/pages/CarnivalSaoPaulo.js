import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import artImages from "../assets/artImages.json";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";

const cloudSmallSrc = (img) =>
  cloudinaryImageUrl(
    img?.blogImagePublicId ||
    img?.imagePublicId ||
    getPublicIdFromLegacyPath(img?.image),
    { width: 1200 }
  );

function CarnivalSaoPaulo({ openLightbox }) {
  const images = artImages.filter(img => img.category === "Carnival");

  const getImage = (id) => images.find(i => i.id === id);

  const imageOrder = [
    "carnival1",
    "carnival2",
    "carnival3",
    "carnival4",
    "carnival5",
    "carnival7",
    "carnival10",
    "carnival14",
    "carnival11",
    "carnival12",
    "carnival13",
    "carnival6"
  ];

  const sortedImages = imageOrder
    .map(id => images.find(img => img.id === id))
    .filter(Boolean);

  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) openLightbox(index, sortedImages);
  };

  const sections = [
    {
      id: "intro",
      coverImage: null,
      text:
        "It moves across the city over several days. People gather, follow, and drift in and out of it as it shifts between places, sometimes concentrating into a single point, sometimes spreading across many. It forms, dissolves, and forms again elsewhere, repeating as it moves through the city."
    },

    {
      id: "stadium_heading",
      coverImage: null,
      text: "In One Place"
    },

    {
      id: "s1",
      coverImage: "carnival1",
      caption: "Mokum Amsterdam: The Eagle's Flight to the Libertarian City.",
      text: "Crowds gather, filling the stands before anything begins. Then it begins."
    },

    {
      id: "s2",
      coverImage: "carnival2",
      caption: "Grupo Especial.",
      text: "The procession holds its line, unfolding step by step. The flow becomes continuous, passing directly in front of the crowd. Shapes hold as they move through it, carried by rhythm rather than direction. The rhythm shifts, and the crowd shifts with it."
    },

    {
      id: "s3",
      coverImage: "carnival3",
      caption: "The Parade.",
      text: ""
    },

    {
      id: "s4",
      coverImage: "carnival4",
      caption: "The Mocidade Alegre Samba School.",
      text: ""
    },

    {
      id: "s5",
      coverImage: "carnival5",
      caption: "The Águia de Ouro School.",
      text: ""
    },

    {
      id: "street_heading",
      coverImage: null,
      text: "In the Streets"
    },

    {
      id: "transition",
      coverImage: "carnival7",
      caption: "Alceu Valença Bloco.",
      text: "Outside the edges, the structure begins to loosen. Nothing stays held in place."
    },

    {
      id: "st1",
      coverImage: "carnival10",
      caption: "Batman Street Party.",
      text: "It spills into rhythm, no longer contained by form or direction. What begins as release becomes a shared current, carried through sound rather than structure. The sense of separation fades as everything starts to respond to the same pulse, gathering and tightening as it continues."
    },

    {
      id: "st2",
      coverImage: "carnival14",
      caption: "Grupo Especial.",
      text: "Sound begins to lead everything. Drums arrive first, then everything else follows into their space. Different groups overlap without fully merging, each holding variation while still moving inside the same pulse. The streets feel less like pathways and more like channels for sound, shaping presence without needing direction."
    },

    {
      id: "st3",
      coverImage: "carnival11",
      caption: "Street Drummers.",
      text: "A continuous beat carries across blocks and intersections, repeating and shifting as it travels. Nothing resolves. It only intensifies and releases in cycles that never fully break. What feels separate becomes layered, then indistinct, then shared."
    },

    {
      id: "st4",
      coverImage: "carnival12",
      caption: "Surdo (The Band Heartbeat).",
      text: "At peak density, sound and presence merge into one condition. The idea of groups dissolves into a single field of tempo and response, reactive and immediate, constantly adjusting but never pausing. Even when it shifts, it does not lose continuity. It simply changes pressure."
    },

    {
      id: "st5",
      coverImage: "carnival13",
      caption: "The Macaco Cansado Band.",
      text: "As night deepens, the intensity begins to loosen at the edges. The same pulse remains, but it spreads further apart, allowing space to return between moments. What stays is the echo of everything that has passed through, still moving but no longer held at full force."
    },

    {
      id: "st6",
      coverImage: "carnival6",
      caption: "Vibrant Street Samba.",
      text: ""
    },

    {
      id: "closing_tagline",
      coverImage: null,
      text: "The party continues through the night."
    }
  ];

  const getImg = (id) => getImage(id);

  const text = (content) => (
    <div className="text-center max-w-4xl mx-auto">
      <div className="text-lg leading-relaxed text-stone-800">
        {content.split("\n\n").map((p, i) => (
          <p key={i} className={i > 0 ? "mt-6" : ""}>{p}</p>
        ))}
      </div>
    </div>
  );

  const heading = (content) => (
    <div className="text-center max-w-4xl mx-auto">
      <p className="text-3xl md:text-4xl font-handwriting text-[#2e5c31]">{content}</p>
    </div>
  );

  const img = (id, caption, sizeClass, extraClass = "") => {
    const imgData = getImg(id);
    if (!imgData) return null;
    return (
      <div className={`flex justify-center ${extraClass}`}>
        <div className={sizeClass}>
          <img
            src={cloudSmallSrc(imgData)}
            alt={caption}
            onClick={() => handleImageClick(id)}
            className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
          />
          <p className="text-sm italic text-stone-500 text-center mt-3">{caption}</p>
        </div>
      </div>
    );
  };

  return (
    <motion.div className="bg-stone-50 relative">

      <SEO
        title="Carnival - São Paulo | Nomad Scribbles"
        description="Carnival as structured procession and open street movement."
      />

      {/* HERO */}
      <motion.div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-handwriting text-[#2e5c31]">
          Carnival
        </h1>
        <div className="mt-6 bg-[#2e5c31]/10 p-4 rounded-lg border-l-4 border-[#2e5c31]">
          <p className="text-xl md:text-2xl text-stone-800 italic font-medium">
            Carnival belongs to the city as much as the streets do.
          </p>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 pb-24">

        {/* ── INTRO (text only, tight rhythm) ── */}
        <div className="space-y-6">
          {text("It moves across the city over several days. People gather, follow, and drift in and out of it as it shifts between places, sometimes concentrating into a single point, sometimes spreading across many. It forms, dissolves, and forms again elsewhere, repeating as it moves through the city.")}
        </div>

        {/* ── IN ONE PLACE heading ── */}
        <div className="mt-20">
          {heading("In One Place")}
        </div>

        {/* Crowds gather — IMAGE 1: large, full width, controlled pause */}
        <div className="mt-12">
          {text("Crowds gather, filling the stands before anything begins. Then it begins.")}
        </div>
        <div className="mt-14">
          {img("carnival1", "Mokum Amsterdam: The Eagle's Flight to the Libertarian City.", "w-full max-w-3xl")}
        </div>

        {/* Procession — IMAGE 2 + 3: medium, close together */}
        <div className="mt-16">
          {text("The procession holds its line, unfolding step by step. The flow becomes continuous, passing directly in front of the crowd. Shapes hold as they move through it, carried by rhythm rather than direction. The rhythm shifts, and the crowd shifts with it.")}
        </div>
        <div className="mt-12 flex flex-col items-center gap-8">
          {img("carnival2", "Grupo Especial.", "w-64 sm:w-72 md:w-80", "")}
          {img("carnival3", "The Parade.", "w-64 sm:w-72 md:w-80", "")}
        </div>

        {/* Mocidade / Águia — IMAGE 4: medium-large, tighter close */}
        <div className="mt-14">
          {text("Their shape holds as they move forward through the flow.")}
        </div>
        <div className="mt-10">
          {img("carnival4", "The Mocidade Alegre Samba School.", "w-full max-w-2xl")}
        </div>
        <div className="mt-8">
          {img("carnival5", "The Águia de Ouro School.", "w-64 sm:w-72 md:w-80")}
        </div>

        {/* ── IN THE STREETS heading ── */}
        <div className="mt-24">
          {heading("In the Streets")}
        </div>

        {/* STAGE 1 — ENTRY: slightly more air, semi-controlled */}
        <div className="mt-14">
          {text("Outside the edges, the structure begins to loosen. Nothing stays held in place.")}
        </div>
        <div className="mt-16">
          {img("carnival7", "Alceu Valença Bloco.", "w-full max-w-3xl")}
        </div>

        <div className="mt-10">
          {text("It spills into rhythm, no longer contained by form or direction. What begins as release becomes a shared current, carried through sound rather than structure. The sense of separation fades as everything starts to respond to the same pulse, gathering and tightening as it continues.")}
        </div>
        <div className="mt-14">
          {img("carnival10", "Batman Street Party.", "w-full max-w-2xl")}
        </div>

        {/* STAGE 2 — DENSIFICATION: pattern breaking, slight asymmetry */}
        <div className="mt-10">
          {text("Sound begins to lead everything. Drums arrive first, then everything else follows into their space. Different groups overlap without fully merging, each holding variation while still moving inside the same pulse. The streets feel less like pathways and more like channels for sound, shaping presence without needing direction.")}
        </div>
        <div className="mt-8 flex justify-start pl-8 md:pl-16">
          {img("carnival14", "Grupo Especial.", "w-60 sm:w-72 md:w-80")}
        </div>

        <div className="mt-8">
          {text("A continuous beat carries across blocks and intersections, repeating and shifting as it travels. Nothing resolves. It only intensifies and releases in cycles that never fully break. What feels separate becomes layered, then indistinct, then shared.")}
        </div>
        <div className="mt-6">
          {img("carnival11", "Street Drummers.", "w-full max-w-3xl")}
        </div>

        {/* STAGE 3 — PEAK: dominant image, tight before, strong pause after */}
        <div className="mt-8">
          {text("At peak density, sound and presence merge into one condition. The idea of groups dissolves into a single field of tempo and response, reactive and immediate, constantly adjusting but never pausing. Even when it shifts, it does not lose continuity. It simply changes pressure.")}
        </div>
        <div className="mt-6">
          {img("carnival12", "Surdo (The Band Heartbeat).", "w-full max-w-4xl")}
        </div>

        {/* STAGE 4 — DISSOLVE: shrinking scale, irregular spacing */}
        <div className="mt-20">
          {text("As night deepens, the intensity begins to loosen at the edges. The same pulse remains, but it spreads further apart, allowing space to return between moments. What stays is the echo of everything that has passed through, still moving but no longer held at full force.")}
        </div>
        <div className="mt-10 flex justify-end pr-8 md:pr-16">
          {img("carnival13", "The Macaco Cansado Band.", "w-56 sm:w-64 md:w-72")}
        </div>
        <div className="mt-6 flex justify-center">
          {img("carnival6", "Vibrant Street Samba.", "w-48 sm:w-56 md:w-64")}
        </div>

        {/* FINAL LINE — isolated, large void below */}
        <div className="mt-20 mb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-[#2e5c31]/10 p-4 rounded-lg border-l-4 border-[#2e5c31]">
              <p className="text-xl md:text-2xl text-stone-800 italic font-medium">
                The party continues through the night.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* NAV */}
      <div className="text-center pb-16">
        <Link to="/brazil/saopaulo" className="text-[#2e5c31] underline">
          Back to São Paulo
        </Link>
      </div>

    </motion.div>
  );
}

export default CarnivalSaoPaulo;
