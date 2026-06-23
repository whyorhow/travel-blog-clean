import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import salzburgImages from "../assets/artImages/slices/story/austria-salzburg.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import { buildGalleryImages, makeAustriaImg } from "./austria/buildAustriaStoryPage";

const img = makeAustriaImg(salzburgImages);
const galleryImages = buildGalleryImages(salzburgImages);

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 9,
    type: "local-tip",
    title: "Climb before the crowds",
    text: "The catacombs are at their best when they are quiet. Visiting early gives you more time to appreciate the rock-cut chapels, narrow stairways, and views back across the city.",
    location: "St. Peter's Abbey",
    image: img("views-from-the-rock-face-austria-29", "Salzburg Cathedral framed through stone window"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "custom-text",
    title: "What We Kept Coming Back To",
    align: "center",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "The cemetery beneath the mountain",
    text: [
      "St. Peter's Cemetery was the place we returned to most often.",
      "Partly because it was beautiful, partly because it sat directly on one of our regular walking routes. Every visit felt slightly different depending on the weather, the light, or how busy the city was around it.",
      "It became a familiar landmark during our time in Salzburg.",
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
    title: "The Sound of Music trail at Werfen",
    text: [
      "We did not expect this walk to become one of our highlights.",
      "The trail itself is simple, but the views towards Hohenwerfen Castle and the surrounding countryside make it memorable. Even without the film connection, it would still be worth the visit.",
    ],
    image: img("the-hills-are-alive-austria-16", "Sound of Music Trail, Werfen"),
    location: "Werfen",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "walking-route",
    title: "Our default loop",
    subtitle: "Residenzplatz → old town lanes → St. Peter's",
    text: [
      "We walked this route repeatedly.",
      "The cathedral, the squares, the narrow streets, and the climb towards the cemetery gradually became familiar. It was the easiest way to experience the city without worrying about plans or checklists.",
    ],
    image: img("old-town-lanes-austria-34", "Narrow shopping street in Salzburg old town"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "Salzburg combines historic architecture with a landscape that is never far away.",
      "The old town provides the landmarks, but the cliffs, hillsides, and views beyond them are what we remember most.",
      "These are simply the places and moments that stayed with us.",
    ],
  },
];

function SalzburgNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="austria"
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Salzburg",
        seo: {
          title: SEO_TITLES["/austria/salzburg"],
          description:
            "Salzburg felt different from Vienna — a compact old town beneath fortress walls, with catacombs, Sound of Music trails, and alpine views never far away.",
        },
        spatialContext:
          "Church domes, fortress walls, and rock faces share the same skyline — often within a few minutes' walk.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Austria/Salzburg-backup", { width: 1600 }),
        alt: "Handwritten Salzburg travel diary — baroque old town, cathedral domes, and alpine hillsides",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Austria/Salzburg-backup", { width: 1600 })}
      heroPageData={{ title: "Salzburg", subtitle: "Austria" }}
      intro={{
        paragraphs: [
          "Salzburg felt very different from Vienna.",
          "The city is smaller, easier to explore on foot, and rarely lets you forget the landscape around it. Church domes, fortress walls, and steep rock faces share the same skyline, often within a few minutes' walk of one another.",
          "We spent most of our time wandering the old town, climbing into the catacombs, and following paths that gradually led uphill. The city never felt large, but there was always something else waiting around the next corner.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Sound of Music Trail" },
        {
          layout: "cinematic",
          image: img("the-hills-are-alive-austria-16", "Sound of Music Trail sign, Werfen"),
          paragraph:
            "Many visitors come looking for locations from The Sound of Music. We were more interested in the scenery than the film itself, but the trail near Werfen quickly won us over. Open meadows, forest paths, and views towards Hohenwerfen Castle make it worth visiting regardless of how well you know the story.",
        },
        {
          layout: "diptych",
          image: img("fairytale-fortresses-austria-17", "Hohenwerfen Castle above the forest"),
          imageB: img("sixteen-going-on-seventeen-austria-18", "Glass gazebo at Hellbrunn Palace"),
          paragraph:
            "The famous gazebo at Hellbrunn is fun to see, but it was the wider landscape that stayed with us.",
        },

        { type: "heading", heading: "Old Town Architecture & Landmarks" },
        {
          layout: "split",
          image: img("salzburg-s-skyline-austria-24", "Salzburg skyline from above"),
          paragraph:
            "The historic centre is compact and easy to explore. Cathedral domes rise above the rooftops, squares open unexpectedly between narrow streets, and decorative details appear almost everywhere you look. Salzburg's old town is one of those places where simply walking around is often enough.",
        },
        {
          layout: "diptych",
          image: img("residenzplatz-grandeur-austria-22", "Residenzplatz fountain"),
          imageB: img("hidden-courtyard-details-austria-23", "Geometric star door in stone alley"),
          paragraph:
            "Many of our favourite photographs came from ordinary streets rather than major attractions.",
        },
        {
          layout: "cinematic",
          image: img("baroque-splendour-austria-31", "Interior of St Peter's Abbey"),
          paragraph: null,
        },

        { type: "heading", heading: "St. Peter's Cemetery & Catacombs" },
        {
          layout: "split",
          image: img("into-the-catacombs-austria-28", "Stone steps into the catacombs"),
          paragraph:
            "This became one of our favourite parts of Salzburg. The cemetery sits directly beneath the Mönchsberg, surrounded by flowers, stone walls, and ornate ironwork. Above it, steep steps lead into catacombs carved into the rock.",
        },
        {
          layout: "diptych",
          image: img("stories-in-stone-austria-27", "Wrought-iron crosses and flowers"),
          imageB: img("rock-hewn-chapels-austria-30", "Underground chapel interior"),
          paragraph:
            "The contrast between the busy old town and the quiet spaces above it makes the climb worthwhile.",
        },
      ]}
      bridgeQuote="Beyond the squares and cemetery paths, the city kept offering more to notice."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Austria", path: "/austria" }}
      nextLink={{ label: "Next: Beyond the Cities", path: "/austria/wider-country" }}
    />
  );
}

export default SalzburgNew;
