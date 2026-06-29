import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
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
  ...buildNarrativesFromCatalog(cityImages, img, "Through the Old Town", {
    titledCaptions: true,
  }),
  ...buildKutnaHoraSection(kutnaImages, img, {
    paragraphs: [
      "An hour east of Prague, Sedlec Ossuary offers a different reading of history. Where the capital holds its past in façades and public squares, Kutná Hora turns inward — quieter, denser, and more restrained.",
      "We made the journey as a brief detour near the end of our time in the Czech Republic.",
    ],
    titledCaptions: true,
  }),
];

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: "reflective-fragment",
    text: "Prague rewards looking up — clocks, sculptures, towers, and details set above the movement of the streets.",
  },
  doThisAgainBlock(
    "We'd spend more time looking upward. The city keeps much of its detail above eye level — spires, clocks, figures, ornamentation that appear when attention shifts away from the street. We'd let the main squares pass more quickly and follow whatever sits between them.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "We didn't try to see everything in Prague.",
      "What remains are the places that stayed with us — towers, façades, courtyards, and small interruptions in the city's surface that continue to return long after leaving.",
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
            "Old Town squares, Gothic towers, hidden details, and a short journey to Kutná Hora's bone church.",
        },
        spatialContext:
          "Historic squares, Gothic spires, and the final chapter of the journey through the Czech Republic.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Czech/Prague-backup", { width: 1600 }),
        alt: "Handwritten Prague travel diary — Old Town Square and historic streets",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Czech/Prague-backup", { width: 1600 })}
      heroObjectFit="contain"
      heroPageData={{ title: "Prague", subtitle: "Czech Republic" }}
      intro={{
        paragraphs: [
          "Prague came last.",
          "After forests, sandstone towers, and quiet trails, the capital felt almost theatrical — spires rising above crowded squares, statues set high on façades, and centuries of detail built into the city's surface.",
          "We wandered between familiar landmarks and less expected corners, letting side streets lead the way. An hour east, Kutná Hora offered a different reading of the country, where history takes a more unusual form.",
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
