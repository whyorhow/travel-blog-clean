import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import salzburgImages from "../assets/artImages/slices/story/austria-salzburg.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import { buildGalleryImages, makeAustriaImg } from "./austria/buildAustriaStoryPage";
import { hasSalzburgStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = makeAustriaImg(salzburgImages);
const galleryImages = buildGalleryImages(salzburgImages);

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 8,
    type: "local-tip",
    title: "Climb before the crowds",
    text: "The catacombs are at their most atmospheric in the early morning. Rock-cut chambers, narrow stairways and views back across the city are easier to appreciate when the space is uninterrupted.",
    location: "St. Peter's Abbey area",
    image: img("views-from-the-rock-face-austria-29", "Salzburg Cathedral framed through stone window"),
  },
  doThisAgainBlock(
    "We'd repeat the old town loop until the streets felt familiar without relying on a map. We'd head uphill early while the city was still quiet, and let go of any expectations tied to film locations once the views opened up above the river.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "The cemetery beneath the mountain",
    text: [
      "St. Peter's Cemetery became a constant reference point during our time in Salzburg.",
      "It wasn't just the setting, but how naturally it sat within our daily routes. Each return felt slightly different depending on light, weather, or how the city was moving around it.",
      "It became one of the most recognisable places during our stay.",
    ],
    image: img("st-peter-s-sanctuary-austria-26", "St. Peter's Cemetery"),
    location: "Altstadt",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "breathing-space",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "The Sound of Music route at Werfen",
    text: [
      "We didn't expect this route to become a highlight.",
      "The path itself is simple, but the surrounding landscape gives it weight. Views towards Hohenwerfen Castle and the surrounding valleys create a sense of scale that stays in memory long after leaving.",
      "Even without the film connection, it would still justify the journey.",
    ],
    image: img("the-hills-are-alive-austria-16", "Sound of Music Trail, Werfen"),
    location: "Werfen",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "walking-route",
    title: "Our usual circuit",
    subtitle: "Residenzplatz → old town lanes → St. Peter's → upper paths",
    text: [
      "We followed this circuit repeatedly without planning it.",
      "The cathedral, squares and narrow streets gradually became familiar rather than unfamiliar. It turned into the easiest way to experience Salzburg without needing to decide where to go next.",
    ],
    image: img("old-town-lanes-austria-34", "Narrow shopping street in Salzburg old town"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "Salzburg is closely shaped by its surroundings.",
      "The old town provides structure and history, but cliffs, river and hills remain constantly present. It is this proximity between urban space and landscape that defines the experience more than any individual landmark.",
      "These are the places and moments that remained in memory after leaving.",
    ],
  },
];

function SalzburgNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="austria"
      skipHero={hasSalzburgStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Salzburg",
        seo: {
          title: SEO_TITLES["/austria/salzburg"],
          description:
            "Salzburg felt different from Vienna — a compact old town beneath fortress walls, with catacombs, Sound of Music trails, and alpine views never far away.",
        },
        spatialContext:
          "Church domes, fortress walls and rock faces form a single skyline, often within a few minutes' walk.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Austria/Salzburg-backup", { width: 1600 }),
        alt: "Handwritten Salzburg travel diary — baroque old town, cathedral domes, and alpine hillsides",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Austria/Salzburg-backup", { width: 1600 })}
      heroPageData={{ title: "Salzburg", subtitle: "Austria" }}
      intro={{
        paragraphs: [
          "Salzburg came across as more compact and easier to take in than Vienna.",
          "The city never lets the surrounding landscape fade into the background. Domes rise above rooftops, fortress walls cut across the horizon, and steep rock faces appear every time the streets open out.",
          "We spent most of our time moving through the old town, climbing towards the catacombs, and following routes that gradually pulled uphill. The city never seemed large, but it always offered another turn worth taking.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Sound of Music Trail" },
        {
          layout: "cinematic",
          image: img("the-hills-are-alive-austria-16", "Sound of Music Trail sign, Werfen"),
          paragraph:
            "We didn't come to Salzburg with the film in mind, but the landscape near Werfen shifted that perspective. Open meadows, forest paths and long views towards Hohenwerfen Castle made the route memorable in its own right.",
        },
        {
          layout: "diptych",
          image: img("fairytale-fortresses-austria-17", "Hohenwerfen Castle above the forest"),
          imageB: img("sixteen-going-on-seventeen-austria-18", "Glass gazebo at Hellbrunn Palace"),
          paragraph:
            "The gazebo at Hellbrunn is widely recognised, but the wider landscape made a stronger impression.",
        },

        { type: "heading", heading: "Old Town Architecture & Landmarks" },
        {
          layout: "split",
          image: img("salzburg-s-skyline-austria-24", "Salzburg skyline from above"),
          paragraph:
            "The historic centre is compact enough to navigate easily, yet detailed enough that attention rarely settles in one place for long. Domes rise above rooftops, squares appear unexpectedly, and carved façades appear at nearly every turn.",
        },
        {
          layout: "diptych",
          image: img("residenzplatz-grandeur-austria-22", "Residenzplatz fountain"),
          imageB: img("hidden-courtyard-details-austria-23", "Geometric star door in stone alley"),
          paragraph:
            "Many of the photographs that stood out came from everyday streets rather than the main squares.",
        },

        { type: "heading", heading: "St. Peter's Cemetery & Catacombs" },
        {
          layout: "split",
          image: img("into-the-catacombs-austria-28", "Stone steps into the catacombs"),
          paragraph:
            "This area became one of the most distinctive parts of Salzburg for us. The cemetery rests beneath the Mönchsberg, framed by stone walls, flowers and quiet pathways. Above it, steep steps lead into catacombs carved directly into the rock.",
        },
        {
          layout: "diptych",
          image: img("stories-in-stone-austria-27", "Wrought-iron crosses and flowers"),
          imageB: img("rock-hewn-chapels-austria-30", "Underground chapel interior"),
          paragraph:
            "The contrast between the activity of the old town and the quiet upper paths gives the ascent its character.",
        },
      ]}
      bridgeQuote="Beyond the squares and hillside routes, the city continued revealing smaller details over time."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Austria", path: "/austria" }}
      nextLink={{ label: "Next: Beyond the Cities", path: "/austria/wider-country" }}
    />
  );
}

export default SalzburgNew;
