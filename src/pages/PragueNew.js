import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import pragueStoryImages from "../assets/artImages/slices/story/czech-republic-prague.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import {
  buildGalleryImages,
  buildKutnaHoraSection,
  buildNarrativesFromCatalog,
  makeCzechImg,
} from "./czech/buildCzechStoryPage";

const cityImages = pragueStoryImages.filter((entry) => entry.category === "Prague");
const kutnaImages = pragueStoryImages.filter((entry) => entry.category === "Kutná Hora");
const img = makeCzechImg(pragueStoryImages);
const galleryImages = buildGalleryImages([...cityImages, ...kutnaImages]);

const narratives = [
  ...buildNarrativesFromCatalog(cityImages, img, "Through the Old Town"),
  ...buildKutnaHoraSection(kutnaImages, img),
];

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: "reflective-fragment",
    text: "Prague rewards those who look up — clocks, sculptures, towers, and details that quietly compete for attention above the crowds below.",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "We did not try to see every corner of Prague.",
      "These are simply the places and details that stayed with us — the towers, façades, courtyards, and unexpected moments that now come to mind whenever we think about the city.",
    ],
  },
];

function PragueNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="czech"
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Prague",
        seo: {
          title: SEO_TITLES["/czech-republic/prague"],
          description:
            "Old Town squares, Gothic towers, hidden details, and a short journey to Kutná Hora's remarkable bone church.",
        },
        spatialContext:
          "Historic squares, Gothic spires, and the final chapter of our journey through the Czech Republic.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Czech/Prague-backup", { width: 1600 }),
        alt: "Handwritten Prague travel diary — Old Town Square and historic streets",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Czech/Prague-backup", { width: 1600 })}
      heroPageData={{ title: "Prague", subtitle: "Czech Republic" }}
      intro={{
        paragraphs: [
          "Prague came last.",
          "After forests, sandstone towers, and quiet trails, the capital felt almost theatrical — church spires rising above crowded squares, statues appearing unexpectedly above the streets, and centuries of history layered onto everyday life.",
          "We spent our time wandering rather than searching for landmarks, following side streets between the old town's better-known corners. A short train journey to Kutná Hora added another perspective to the trip, pairing Prague's grandeur with one of the country's most unusual historic sites.",
        ],
      }}
      narratives={narratives}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Czech Republic", path: "/czech-republic" }}
      nextLink={{ label: "Bohemian Wilderness", path: "/czech-republic/bohemian-wilderness" }}
    />
  );
}

export default PragueNew;
