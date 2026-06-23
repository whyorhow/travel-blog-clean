import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import widerCountryImages from "../assets/artImages/slices/story/austria-wider-country.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import { buildGalleryImages, makeAustriaImg } from "./austria/buildAustriaStoryPage";

const img = makeAustriaImg(widerCountryImages);
const galleryImages = buildGalleryImages(widerCountryImages);

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 6,
    type: "local-tip",
    title: "Follow the waterfall uphill",
    text: "Many visitors stop at the lower viewpoints, but the walk becomes more rewarding as you climb. The changing views, increasing spray, and quieter sections of trail make the ascent worthwhile.",
    location: "Hohe Tauern National Park",
    image: img("glacial-mist-austria-8", "Mist rising from Krimml cascades"),
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
    title: "The falls at Krimml",
    text: [
      "The waterfalls stayed with us long after we left.",
      "Photographs capture the scale, but not the sound. Standing beside the cascades while spray drifted through the trees is still one of our strongest memories from Austria.",
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
      "Attersee became one of those places where it was easy to lose track of time.",
      "We arrived intending to walk along the shore and ended up staying much longer than planned. The combination of clear water, quiet surroundings, and mountain views made it difficult to leave.",
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
      "Austria's countryside offered some of our favourite moments from the trip.",
      "The waterfalls, forests, lakes, and trails felt very different from the cities, yet together they helped form a broader picture of the country.",
      "These are simply the places we remember most.",
    ],
  },
];

function WiderCountryNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="austria"
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Beyond the Cities",
        seo: {
          title: SEO_TITLES["/austria/wider-country"],
          description:
            "Beyond Vienna and Salzburg — Krimml's waterfalls, alpine forests, Lake Attersee, and woodland trails across the Austrian countryside.",
        },
        spatialContext:
          "Forests, rivers, and mountain roads — places that often feel much further apart than they look on a map.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Austria/Wider-Country-backup", { width: 1600 }),
        alt: "Handwritten alpine Austria travel diary — Krimml waterfalls, Lake Attersee, and forest trails",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Austria/Wider-Country-backup", { width: 1600 })}
      heroPageData={{ title: "Beyond the Cities", subtitle: "Austria" }}
      intro={{
        paragraphs: [
          "Most of our time in Austria's countryside was spent outdoors.",
          "Away from Vienna and Salzburg, the scenery quickly takes over. Forests cover the hillsides, rivers cut through the valleys, and mountain roads connect places that often feel much further apart than they are.",
          "We visited waterfalls, lakes, woodland trails, and small villages, often without much of a plan beyond seeing where a path would lead.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Krimml Waterfalls" },
        {
          layout: "cinematic",
          image: img("first-glimpse-of-krimml-austria-5", "Waterfall glimpsed through pine trees"),
          paragraph:
            "Krimml was one of the most impressive places we visited in Austria. The waterfalls are the highest in Europe and can be heard long before they come into view. The closer you get, the louder they become, until the spray hangs in the air and dampens everything around you.",
        },
        {
          layout: "diptych",
          image: img("the-power-of-the-alps-austria-6", "Cascades on mossy cliff face"),
          imageB: img("glacial-turquoise-austria-14", "Turquoise rapids below the falls"),
          paragraph:
            "The main attraction is the waterfall itself, but the surrounding forest is just as memorable. Moss-covered trees, rushing streams, and narrow paths make the whole area feel alive with movement.",
        },
        {
          layout: "cinematic",
          image: img("framed-by-nature-austria-11", "Falls framed by pine trees"),
          paragraph: null,
        },

        { type: "heading", heading: "Alpine Wilderness" },
        {
          layout: "split",
          image: img("deep-in-the-alpine-woods-austria-3", "Moss-covered pine forest"),
          paragraph:
            "The forests around Krimml encouraged us to slow down. Mushrooms appeared beside the trails, insects moved through the undergrowth, and every fallen log seemed covered in moss. While most visitors focus on the waterfalls, we often found ourselves paying just as much attention to the details along the path.",
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
            "Attersee offered a completely different experience. The lake is known for its remarkably clear water, and from the shoreline it is easy to see why. Boats drift across the surface, ducks move through the shallows, and the surrounding mountains provide a constant backdrop.",
        },
        {
          layout: "diptych",
          image: img("over-the-shoreline-austria-38", "Seewalchen shoreline from the water"),
          imageB: img("summer-days-by-attersee-austria-41", "Shaded park beside the lake"),
          paragraph: "After the energy of Krimml, Attersee felt calm and unhurried.",
        },

        { type: "heading", heading: "Forests & Trails" },
        {
          layout: "split",
          image: img("the-klauskapelle-austria-46", "Wooden forest chapel in clearing"),
          paragraph:
            "Some of our favourite discoveries came from places that were not marked as major attractions. Woodland chapels, granite boulders, forest tracks, and unexpected clearings often became memorable stops during a walk. Austria's countryside rewards curiosity just as much as planning.",
        },
        {
          layout: "diptych",
          image: img("waldviertel-woodlands-austria-42", "Moss-covered boulder in pine forest"),
          imageB: img("sun-drenched-glades-austria-47", "Sunburst through forest canopy"),
          paragraph: null,
        },
      ]}
      bridgeQuote="Beyond the falls and forest paths, the landscape kept offering more to notice."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Austria", path: "/austria" }}
    />
  );
}

export default WiderCountryNew;
