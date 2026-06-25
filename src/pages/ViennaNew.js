import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import viennaImages from "../assets/artImages/slices/story/austria-vienna.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import { buildGalleryImages, makeAustriaImg } from "./austria/buildAustriaStoryPage";

const img = makeAustriaImg(viennaImages);
const galleryImages = buildGalleryImages(viennaImages);

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 8,
    type: "local-tip",
    title: "Let the library set the pace",
    text: "The State Hall is best enjoyed slowly. The details reveal themselves naturally — painted ceilings overhead, historic globes tucked between shelves, and small features that are easy to miss when rushing through.",
    location: "State Hall, Austrian National Library",
    image: img("the-emperor-s-hall-austria-62", "Emperor Charles VI beneath the library dome"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "custom-text",
    title: "What Stayed With Us",
    align: "center",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "Standing Before The Kiss",
    subtitle: "One afternoon at Belvedere",
    text: [
      "We went to see Klimt's The Kiss once — partly out of curiosity, partly because it felt unavoidable.",
      "Photographs never quite prepare you for the scale or the density of gold leaf up close. The room slowed down when we reached it, not because we had planned to linger, but because everyone else seemed to be doing the same.",
      "It was a single visit among many in Vienna, but it is one of the images that has stayed clearest.",
    ],
    image: img("standing-before-the-kiss-austria-55", "Gustav Klimt's The Kiss"),
    location: "Upper Belvedere",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "breathing-space",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "Morning in the Ferstel Passage",
    subtitle: "A quieter stop between sights",
    text: [
      "Not every memorable coffee moment in Vienna happens beneath a famous ceiling.",
      "We found the Ferstel Passage while walking between destinations — a vaulted nineteenth-century arcade with small café tables tucked beneath glass and stone.",
      "It felt unhurried in a different way from the grand coffee houses: less spectacle, more the sense of slipping into the city's everyday rhythm.",
    ],
    image: img("historic-shopping-arcades-austria-50", "Ferstel Passage arcade"),
    location: "Innere Stadt",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Looking Back",
    align: "center",
    containerClass: "pb-6 mb-8",
    text: [
      "There was far more to Vienna than we could fit into a single visit.",
      "What stayed with us was the rhythm of the city. Palace gardens, library halls, coffee houses, colourful architecture, and everyday life all seemed to belong to the same conversation.",
      "These are the fragmented frames, the quiet street corners, and the coffee-house hours that linger longest.",
    ],
  },
];

function ViennaNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="austria"
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Vienna",
        seo: {
          title: SEO_TITLES["/austria/vienna"],
          description:
            "Vienna surprised us — palaces and cafés woven into everyday life, from Belvedere and the State Hall to Hundertwasserhaus and Café Central.",
        },
        spatialContext:
          "Imperial grandeur, quiet libraries, and coffee-house rhythm — often on the same afternoon.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Austria/Vienna-backup", { width: 1600 }),
        alt: "Handwritten Vienna travel diary — imperial palaces, historic libraries, and café culture",
        objectPosition: "35% center",
        photoTreatment: "warm",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Austria/Vienna-backup", { width: 1600 })}
      heroPageData={{ title: "Vienna", subtitle: "Austria" }}
      intro={{
        lead: "Vienna surprised us.",
        paragraphs: [
          "Before arriving, we expected palaces, museums, and grand architecture. Those were certainly there, but what stayed with us was how naturally they fit into everyday life. People sat for hours in cafés beneath ornate ceilings, crossed historic squares on their way to work, and treated remarkable buildings as part of the background.",
          "The city feels comfortable with its history. Imperial palaces, formal gardens, colourful apartment blocks, and coffee houses sit alongside one another without competing for attention.",
          "We spent our time moving between grand rooms, quiet libraries, busy cafés, and streets that often felt very different from one another. This is the Vienna we experienced.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Where Imperial Scale Still Breathes" },
        {
          layout: "cinematic",
          image: img("imperial-grandeur-at-belvedere-austria-49", "Upper Belvedere Palace"),
          paragraph:
            "Vienna's landmarks make a strong first impression. Belvedere Palace stretches across formal gardens and wide gravel paths, while domes and church towers rise above the city beyond. Inside, richly decorated rooms and famous artworks continue the sense of scale.",
        },
        {
          layout: "scroll-gallery",
          images: [
            img("blooms-and-domes-austria-52", "Roses below the Kunsthistorisches dome"),
            img("baroque-masterpieces-austria-53", "Baroque ceiling at Belvedere"),
            img("grand-imperial-halls-austria-54", "Grand reception room at Belvedere"),
          ],
          paragraph:
            "For many visitors, this is the Vienna they picture before arriving. It is elegant, carefully maintained, and difficult to ignore.",
        },

        { type: "heading", heading: "Behind Ornate Green Doors" },
        {
          layout: "split",
          image: img("colourful-expressions-at-hundertwasserhaus-austria-65", "Hundertwasserhaus"),
          paragraph:
            "Away from the palace grounds, Vienna becomes more varied. Historic passages, ornate shopfronts, fountains, and churches appear throughout the centre. Then, without much warning, Hundertwasserhaus breaks every convention with uneven lines, bright colours, and trees growing from balconies.",
        },
        {
          layout: "diptych",
          image: img("gilded-portal-details-austria-51", "Ornate green door with gold filigree"),
          imageB: img("high-summer-fountains-austria-56", "Hochstrahlbrunnen fountain"),
          paragraph:
            "Some of our favourite discoveries happened while simply walking between destinations. The city often rewards curiosity more than planning.",
        },

        { type: "heading", heading: "Whispers Beneath Painted Ceilings" },
        {
          layout: "split",
          image: img("columns-and-canopies-austria-59", "Marble columns in the State Hall"),
          paragraph:
            "The Austrian National Library became one of the highlights of our visit. The State Hall is filled with marble columns, painted ceilings, historic globes, and towering bookshelves. It feels impressive without becoming overwhelming.",
        },
        {
          layout: "scroll-gallery",
          images: [
            img("literary-labyrinths-austria-57", "Towering bookshelves with rolling ladder"),
            img("mapping-history-austria-61", "Historic globe among the shelves"),
            img("whispers-of-the-past-austria-60", "Upper gallery beneath frescoed ceiling"),
          ],
          paragraph:
            "Unlike some major attractions, there is very little pressure to move quickly. Visitors drift through at their own pace, taking time to look rather than simply pass through.",
        },

        { type: "heading", heading: "Hours Lost in Coffee Houses" },
        {
          layout: "split",
          image: img("grand-coffee-house-mornings-austria-66"),
          paragraph:
            "Coffee culture feels woven into daily life here. Cafés are not simply places to stop between attractions. Many people settle in for long conversations, newspapers, pastries, or an afternoon of doing very little at all.",
        },
        {
          layout: "diptych",
          image: img("viennese-patisserie-perfection-austria-67"),
          imageB: img("the-sweetest-dilemma-austria-68"),
          paragraph: "We quickly found ourselves doing the same.",
        },
      ]}
      bridgeQuote="Beyond what one visit could hold, the city still had more to show."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Austria", path: "/austria" }}
      nextLink={{ label: "Next: Salzburg", path: "/austria/salzburg" }}
    />
  );
}

export default ViennaNew;
