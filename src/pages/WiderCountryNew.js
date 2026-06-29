import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import widerCountryImages from "../assets/artImages/slices/story/austria-wider-country.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import { buildGalleryImages, makeAustriaImg } from "./austria/buildAustriaStoryPage";
import { hasWiderCountryStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = makeAustriaImg(widerCountryImages);
const galleryImages = buildGalleryImages(widerCountryImages);

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 11,
    type: "local-tip",
    title: "Follow the waterfall uphill",
    text: "Most visitors remain near the lower viewpoints, but the experience changes as the path climbs. The sound draws closer, spray becomes more present, and quieter sections of trail open up new perspectives.",
    location: "Hohe Tauern National Park",
    image: img("glacial-mist-austria-8", "Mist rising from Krimml cascades"),
  },
  doThisAgainBlock(
    "We'd follow the road between lakes and pause whenever water appeared, not to stop for long, but because it naturally changed the pace of travel. We'd climb towards the waterfalls and let conditions decide how long we stayed.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "The falls at Krimml",
    text: [
      "The waterfalls remained one of the strongest impressions from Austria.",
      "Photographs capture the scale, but not the sound or the way mist moved through the valley. Standing close to the cascades while spray drifted through the trees left a lasting imprint.",
    ],
    image: img("the-power-of-the-alps-austria-6", "Krimml Waterfalls"),
    location: "Krimml",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "breathing-space",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "Afternoons at Attersee",
    text: [
      "Attersee became one of those places where time stopped feeling structured.",
      "We arrived expecting a short stop and stayed far longer than planned. Clear water, quiet shoreline and distant mountain views made it difficult to leave.",
    ],
    image: img("crystal-clear-shallows-austria-39", "Ducks in clear Attersee water"),
    location: "Seewalchen am Attersee",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Final Thoughts",
    align: "center",
    text: [
      "Austria's countryside offered some of the most memorable moments of the trip.",
      "Waterfalls, forests, lakes and trails created a very different experience from the cities, yet together they completed a broader picture of the country.",
      "These are the places that remained with us after leaving.",
    ],
  },
];

function WiderCountryNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="austria"
      skipHero={hasWiderCountryStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Beyond the Cities",
        seo: {
          title: SEO_TITLES["/austria/wider-country"],
          description:
            "Beyond Vienna and Salzburg — Krimml's waterfalls, alpine forests, Lake Attersee, and woodland trails across the Austrian countryside.",
        },
        spatialContext:
          "Forests, rivers and mountain roads shape the landscape — places that often feel further apart than they appear on the map.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Austria/Wider-Country-backup", { width: 1600 }),
        alt: "Handwritten alpine Austria travel diary — Krimml waterfalls, Lake Attersee, and forest trails",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Austria/Wider-Country-backup", { width: 1600 })}
      heroPageData={{ title: "Beyond the Cities", subtitle: "Austria" }}
      intro={{
        paragraphs: [
          "Much of our time in Austria's countryside unfolded outdoors.",
          "Away from Vienna and Salzburg, the landscape quickly takes over. Forested hills rise in layers, rivers cut through valleys, and mountain roads connect places that feel more distant than they are.",
          "Our days tended to follow waterfalls, lakes, woodland paths and small villages, usually without much planning beyond seeing where the next turn might lead.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Krimml Waterfalls" },
        {
          layout: "cinematic",
          image: img("first-glimpse-of-krimml-austria-5", "Waterfall glimpsed through pine trees"),
          paragraph:
            "Krimml was one of the most striking places we visited in Austria. The waterfalls are the highest in Europe, and their presence is noticeable long before they come into view. The sound builds gradually through the valley until spray fills the air and softens everything around it.",
        },
        {
          layout: "diptych",
          image: img("the-power-of-the-alps-austria-6", "Cascades on mossy cliff face"),
          imageB: img("glacial-turquoise-austria-14", "Turquoise rapids below the falls"),
          paragraph:
            "The waterfall dominates the experience, but the surrounding forest carries its own atmosphere. Moss-covered trees, fast-moving streams and narrow paths keep the whole area in constant motion.",
        },

        { type: "heading", heading: "Alpine Wilderness" },
        {
          layout: "split",
          image: img("deep-in-the-alpine-woods-austria-3", "Moss-covered pine forest"),
          paragraph:
            "The forests around Krimml encouraged a more unhurried way of exploring. Mushrooms appeared beside the trails, insects moved through the undergrowth, and fallen logs were layered with moss and damp bark. Attention naturally drifted from the main viewpoints toward smaller details along the way.",
        },
        {
          layout: "diptych",
          image: img("forest-floor-treasures-austria-9", "Mushrooms on mossy log"),
          imageB: img("miniature-worlds-austria-10", "Mushrooms on tree trunk"),
          paragraph: null,
        },

        { type: "heading", heading: "Lake Attersee" },
        {
          layout: "split",
          image: img("lakeside-marina-life-austria-37", "Sailboats at Seewalchen marina"),
          paragraph:
            "Attersee offered a completely different feel. The water is exceptionally clear, shifting between blues and greens depending on depth and light. Boats drift across the surface while the mountains hold steady in the distance.",
        },
        {
          layout: "diptych",
          image: img("over-the-shoreline-austria-38", "Seewalchen shoreline from the water"),
          imageB: img("summer-days-by-attersee-austria-41", "Shaded park beside the lake"),
          paragraph: "After Krimml, the lake felt almost weightless in contrast.",
        },

        { type: "heading", heading: "Forests & Trails" },
        {
          layout: "split",
          image: img("the-klauskapelle-austria-46", "Wooden forest chapel in clearing"),
          paragraph:
            "Some of the most memorable moments came from places that were never marked as destinations. Woodland chapels, granite outcrops, forest tracks and unexpected clearings often appeared between more defined stops. The countryside rewards curiosity more than planning.",
        },
        {
          layout: "diptych",
          image: img("waldviertel-woodlands-austria-42", "Moss-covered boulder in pine forest"),
          imageB: img("sun-drenched-glades-austria-47", "Sunburst through forest canopy"),
          paragraph: null,
        },
      ]}
      bridgeQuote="Beyond the waterfalls and forest routes, the landscape continued offering smaller details over time."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Austria", path: "/austria" }}
    />
  );
}

export default WiderCountryNew;
