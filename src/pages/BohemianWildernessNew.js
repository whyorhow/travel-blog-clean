import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import wildernessImages from "../assets/artImages/slices/story/czech-republic-bohemian-wilderness.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import {
  buildGalleryImages,
  buildNarrativesFromCatalog,
  makeCzechImg,
} from "./czech/buildCzechStoryPage";

const img = makeCzechImg(wildernessImages);
const galleryImages = buildGalleryImages(wildernessImages);

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: "reflective-fragment",
    text: "Before the city came forests — sandstone towers rising from the canopy and trails that disappeared into the shade.",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "These are the landscapes that introduced us to the Czech Republic.",
      "Long before the clocks, courtyards, and church spires of Prague, there were forest paths, narrow rock passages, and viewpoints looking out across endless green canopy. They remain some of our strongest memories from the journey.",
    ],
  },
];

function BohemianWildernessNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="czech"
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Bohemian Wilderness",
        seo: {
          title: SEO_TITLES["/czech-republic/bohemian-wilderness"],
          description:
            "Sandstone labyrinths, forest trails, and quiet corners of Bohemia beyond Prague.",
        },
        spatialContext:
          "Sandstone towers, shaded forest paths, and the quieter landscapes that introduced us to the Czech Republic.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Czech/Wilderness-backup", { width: 1600 }),
        alt: "Handwritten Bohemian wilderness travel diary — sandstone trails and forest paths",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Czech/Wilderness-backup", { width: 1600 })}
      heroPageData={{ title: "Bohemian Wilderness", subtitle: "Czech Republic" }}
      intro={{
        paragraphs: [
          "Our first impressions of the Czech Republic came from the forests.",
          "Before we reached Prague, we spent time among the sandstone formations of Prachov Rocks and Adršpach, following narrow trails through landscapes that felt older than the paths running through them. The crowds were smaller, the pace slower, and the views often arrived unexpectedly between the trees.",
          "This page gathers those early days in Bohemia.",
        ],
      }}
      narratives={buildNarrativesFromCatalog(
        wildernessImages,
        img,
        "Among the Sandstone Towers"
      )}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Czech Republic", path: "/czech-republic" }}
      nextLink={{ label: "Prague", path: "/czech-republic/prague" }}
    />
  );
}

export default BohemianWildernessNew;
