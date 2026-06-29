import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import viennaImages from "../assets/artImages/slices/story/austria-vienna.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";
import { buildGalleryImages, makeAustriaImg } from "./austria/buildAustriaStoryPage";
import { hasViennaStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = makeAustriaImg(viennaImages);
const galleryImages = buildGalleryImages(viennaImages);

const editorialBlocks = [
  doThisAgainBlock(
    "We wouldn't rush from one landmark to the next, and found our favourite moments in the gaps between them — following streets that looked interesting, pausing for a pastry, or staying longer than we'd planned in the Austrian National Library rather than keeping to a tight itinerary.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "Standing Before The Kiss",
    text: [
      "Some paintings attract a crowd before you've even entered the room. Gustav Klimt's masterpiece deserves its reputation, but it was the quiet anticipation beforehand that stayed with us almost as much as the painting itself.",
    ],
    image: img("standing-before-the-kiss-austria-55", "Gustav Klimt's The Kiss"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "breathing-space",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "Morning in the Ferstel Passage",
    text: [
      "Before the city fully woke up, the arcade felt almost weightless. Light filtered through the glass roof while cafés slowly prepared for the day ahead.",
    ],
    image: img("historic-shopping-arcades-austria-50", "Ferstel Passage arcade"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Looking Back",
    align: "center",
    containerClass: "pb-6 mb-8",
    text: [
      "Vienna never demanded attention. It simply carried on around us.",
      "The famous landmarks were memorable, but so were the ordinary moments between them — crossing a quiet square, finding another courtyard, or lingering over a pastry longer than we'd intended.",
      "It's a city we'd happily wander again, not because we'd run out of things to see, but because it always felt as though another street might reveal something unexpected.",
    ],
  },
];

function ViennaNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="austria"
      skipHero={hasViennaStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Vienna",
        seo: {
          title: SEO_TITLES["/austria/vienna"],
          description:
            "Vienna surprised us — palaces and cafés woven into everyday life, from Belvedere and the State Hall to Hundertwasserhaus and Café Central.",
        },
        spatialContext:
          "Imperial palaces, hidden courtyards and cafés where nobody seemed in a rush to leave.",
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
        lead: "Vienna turned out to be something quite different from what we expected.",
        paragraphs: [
          "Before arriving, we imagined a city defined by palaces and museums. They were certainly there, but they never felt separated from ordinary life. Office workers crossed palace squares on their lunch break, cafés filled with people lingering over a drink, and trams rolled past buildings that would be landmarks almost anywhere else.",
          "Nothing felt staged. Grand architecture, neighbourhood streets and everyday routines all seemed to belong together.",
          "Most days developed naturally. We'd wander through elegant courtyards, disappear into libraries, stop for a pastry, then continue without much of a plan. Looking back, that's the Vienna we remember most clearly.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Where Imperial Scale Still Breathes" },
        {
          layout: "cinematic",
          image: img("imperial-grandeur-at-belvedere-austria-49", "Upper Belvedere Palace"),
          paragraph:
            "The palace façades are enormous, but what surprised us was how relaxed they felt. People read books in the gardens, children crossed the courtyards and locals moved through spaces visitors often spend hours photographing.",
        },
        {
          layout: "scroll-gallery",
          images: [
            img("blooms-and-domes-austria-52", "Roses below the Kunsthistorisches dome"),
            img("baroque-masterpieces-austria-53", "Baroque ceiling at Belvedere"),
            img("grand-imperial-halls-austria-54", "Grand reception room at Belvedere"),
          ],
          paragraph:
            "These are the places many people come to Vienna to see. They're impressive, but they never felt disconnected from the city around them.",
        },

        { type: "heading", heading: "Behind Ornate Green Doors" },
        {
          layout: "split",
          image: img("colourful-expressions-at-hundertwasserhaus-austria-65", "Hundertwasserhaus"),
          paragraph:
            "Some of our favourite walks happened after leaving the main sights behind. Residential streets, quiet passages and unexpected courtyards revealed another side of Vienna.",
        },
        {
          layout: "diptych",
          image: img("gilded-portal-details-austria-51", "Ornate green door with gold filigree"),
          imageB: img("high-summer-fountains-austria-56", "Hochstrahlbrunnen fountain"),
          paragraph:
            "Some places weren't destinations at all. They simply appeared while wandering from one neighbourhood to the next.",
        },

        { type: "heading", heading: "Between Painted Ceilings" },
        {
          layout: "split",
          image: img("columns-and-canopies-austria-59", "Marble columns in the State Hall"),
          paragraph:
            "Stepping into the Austrian National Library felt like walking into another century. The silence, towering shelves and painted ceiling encouraged us to slow down almost immediately.",
        },
        {
          layout: "scroll-gallery",
          images: [
            img("literary-labyrinths-austria-57", "Towering bookshelves with rolling ladder"),
            img("mapping-history-austria-61", "Historic globe among the shelves"),
            img("whispers-of-the-past-austria-60", "Upper gallery beneath frescoed ceiling"),
          ],
          paragraph:
            "Unlike many famous attractions, nobody seemed eager to rush visitors through. It was one of the few places where taking your time felt completely natural.",
        },

        { type: "heading", heading: "Hours Lost in Coffee Houses" },
        {
          layout: "split",
          image: img("grand-coffee-house-mornings-austria-66"),
          paragraph:
            "Coffee houses became less of a stop and more of a rhythm. We'd settle into a corner, watch the room change around us and realise another hour had quietly slipped by.",
        },
        {
          layout: "diptych",
          image: img("viennese-patisserie-perfection-austria-67"),
          imageB: img("the-sweetest-dilemma-austria-68"),
          paragraph: "It wasn't difficult to understand why people linger. Before long, we found ourselves doing exactly the same.",
        },
      ]}
      bridgeQuote="One visit was never going to be enough."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Austria", path: "/austria" }}
      nextLink={{ label: "Next: Salzburg", path: "/austria/salzburg" }}
    />
  );
}

export default ViennaNew;
