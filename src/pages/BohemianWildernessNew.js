import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
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
    text: "Before the city came forests — sandstone towers rising through canopy and paths dissolving into shade.",
  },
  doThisAgainBlock(
    "If we returned, we'd let things unfold without checking distance or direction so often. The viewpoints tend to arrive just after that moment of doubt, when attention shifts away from measuring and back into the landscape.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "Before the streets of Prague, there were these forests.",
      "Stone rising through trees, paths dissolving into woodland, and light breaking through canopy in quiet intervals. It remains one of the most vivid parts of the journey.",
    ],
  },
];

const narratives = buildNarrativesFromCatalog(
  wildernessImages,
  img,
  "Among the Sandstone Towers",
  {
    sectionProse:
      "The forest tightened and then opened again. Stone appeared where trees had been, rising in quiet verticals above the green.",
    titledCaptions: true,
  },
);

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
          "Sandstone towers, shaded forest paths, and the quieter landscapes that opened our time in the Czech Republic.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Czech/Wilderness-backup", { width: 1600 }),
        alt: "Handwritten Bohemian wilderness travel diary — sandstone trails and forest paths",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Czech/Wilderness-backup", { width: 1600 })}
      heroObjectFit="contain"
      heroPageData={{ title: "Bohemian Wilderness", subtitle: "Czech Republic" }}
      intro={{
        paragraphs: [
          "Our time in the Czech Republic began in the forests.",
          "Before Prague, there were sandstone formations in Prachov and Adršpach, where trails cut through dense woodland and the land rose suddenly into stone. Movement through the landscape felt unstructured, with views appearing between trees or across small clearings.",
          "These early days in Bohemia form the quieter beginning of the journey.",
        ],
      }}
      narratives={narratives}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Czech Republic", path: "/czech-republic" }}
      nextLink={{ label: "Prague", path: "/czech-republic/prague" }}
    />
  );
}

export default BohemianWildernessNew;
