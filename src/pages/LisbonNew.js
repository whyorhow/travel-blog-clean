import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import {
  EDITORIAL_PLACEMENTS,
  doThisAgainBlock,
} from "../components/editorial";
import lisbonImages from "../assets/artImages/slices/story/portugal-lisbon.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from "../assets/Backgrounds/Dirty-Wall-Texture.webp";

const img = (id, alt, caption) => {
  const entry = lisbonImages.find((item) => item.id === id);
  if (!entry?.cloudinary?.blog) return null;

  return {
    src: entry.cloudinary.blog,
    lightboxSrc: entry.cloudinary.lightbox,
    alt: alt || entry.altText || entry.title,
    ...(caption ? { caption } : {}),
  };
};

const storyGalleryImages = lisbonImages.filter(
  (entry) => entry.id !== "riverfront-sunset-moments-lisbon-15",
);

const galleryImages = storyGalleryImages.map((entry) => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.altText || entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
  category: entry.category,
}));

const editorialBlocks = [
  doThisAgainBlock(
    "We wouldn't rush from one viewpoint to the next, and found our favourite moments in the gaps between them — following quiet cobbled streets that looked interesting, pausing for a sundowner at a pavement café, or watching the sunset from the riverbank rather than keeping to a tight itinerary.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "Sunset on the Tagus Shore",
    subtitle: "A place that stayed with us",
    text: [
      "Some spots attract a crowd long before the sun even starts to dip. The riverfront plaza gets lively, but watching the golden light hit the water as the tide gently licked the sand stayed with us long after dark.",
    ],
    image: img(
      "golden-hour-glow-lisbon-14",
      "Golden light over the Tagus in Lisbon",
    ),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "breathing-space",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: "favourite-place",
    title: "The Quiet Corners of Alfama",
    subtitle: "A place that stayed with us",
    text: [
      "Before the afternoon heat set in, the narrow backstreets felt almost secret. Sunlight filtered through vine-draped doorways while local cats dozed quietly on the cool stone steps.",
      "One visit was never going to be enough.",
    ],
    image: img(
      "cobbled-backstreet-wanders-lisbon-7",
      "Quiet backstreet in Alfama, Lisbon",
    ),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "custom-text",
    title: "Looking Back",
    align: "center",
    text: [
      "Lisbon never demanded attention. It simply carried on around us.",
      "The famous vistas were memorable, but so were the ordinary moments between them — crossing a wave-patterned square, spotting an antique brass knocker on a green door, or lingering over a cold beer longer than we'd intended.",
      "It's a city we'd happily wander again, not because we'd run out of things to see, but because it always felt as though another corner might reveal something unexpected.",
    ],
  },
];

function LisbonNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="greece"
      editorialBlocks={editorialBlocks}
      locationData={{
        name: "Lisbon",
        seo: {
          title: SEO_TITLES["/portugal/lisbon"],
          description:
            "Lisbon — steep cobbled streets, yellow trams, river light, hidden art studios, and the slower everyday moments between viewpoints.",
        },
        spatialContext:
          "Hillside neighbourhoods, tramlines, tiled facades and river light shaping the city at street level.",
      }}
      heroImage={{
        src: cloudinaryImageUrl("Portugal/Lisbon/Lisbon-Hero", { width: 1600 }),
        alt: "Handwritten Lisbon travel diary — riverfront sunsets, yellow trams, and steep cobbled streets",
        objectPosition: "center center",
        photoTreatment: "warm",
      }}
      heroFallbackSrc={cloudinaryImageUrl("Portugal/Lisbon/Lisbon-Hero", {
        width: 1600,
      })}
      heroPageData={{ title: "Lisbon", subtitle: "Portugal" }}
      intro={{
        lead: "Lisbon turned out to be something quite different from what we expected.",
        paragraphs: [
          "Before arriving, we imagined a city defined purely by its steep hills and postcard views. They were certainly there, but they never felt separated from ordinary life. Locals chatted outside corner cafés, laundry drifted gently from wrought-iron balconies, and vintage yellow trams rattled past buildings that felt like living pieces of history.",
          "Nothing felt staged. Grand plazas, bohemian backstreets and slow everyday routines all seemed to belong together.",
          "Most days developed naturally. We'd wander down sun-dappled cobbles, stumble into hidden art studios, stop for a cold beer in a quiet square, then continue without much of a plan. Looking back, that's the Lisbon we remember most clearly.",
        ],
      }}
      narratives={[
        { type: "heading", heading: "Cobbled Wanders & Street Gems" },
        {
          layout: "split",
          image: img(
            "sunlit-rooftop-views-lisbon-1",
            "Lisbon rooftops and stonework",
          ),
          paragraph:
            "The historic alleys are steep and winding, but what surprised us was how relaxed they felt. Potted ferns lined rustic doorways, local street art added pops of colour to crumbling plaster, and peacocks perched casually on high rooftop fences.",
        },
        {
          layout: "scroll-gallery",
          images: [
            img(
              "rustic-doorway-love-lisbon-6",
              "Green doorway with ferns in Lisbon",
            ),
            img(
              "cobbled-backstreet-wanders-lisbon-7",
              "Steep cobbled backstreet in Lisbon",
            ),
            img(
              "local-art-haven-lisbon-8",
              "Turquoise local art studio doorway in Lisbon",
            ),
          ],
          paragraph:
            "These are the quiet details many people pass by when rushing through the city. They're charming, but they never felt disconnected from the neighbourhood life around them.",
        },
        {
          layout: "diptych",
          image: img(
            "eclectic-street-character-lisbon-12",
            "Stickered Rua do Espírito Santo doorway",
          ),
          imageB: img(
            "intricate-brass-knocker-details-lisbon-19",
            "Antique brass knocker on a green door",
          ),
          paragraph: null,
        },

        { type: "heading", heading: "Golden Hours & City Vistas" },
        {
          layout: "cinematic",
          image: img(
            "lisbons-wavy-rhythm-lisbon-2",
            "Lisbon square with wave-patterned cobbles",
          ),
          paragraph:
            "Some of our favourite moments happened as the afternoon light began to soften. Sweeping vistas over sea-facing rooftops, grand stone arches, and open riverfront plazas revealed the true scale of Lisbon.",
        },
        {
          layout: "diptych",
          image: img(
            "alfama-horizon-dreams-lisbon-5",
            "Alfama rooftops and river view",
          ),
          imageB: img(
            "framed-city-vistas-lisbon-9",
            "View through a stone arch over Lisbon rooftops",
          ),
          paragraph:
            "Some views weren't planned at all. They simply appeared while wandering from one neighbourhood to the next, framing the city under endless golden skies.",
        },
        {
          layout: "scroll-gallery",
          images: [
            img("golden-hour-glow-lisbon-14", "Golden sunset over the Tagus"),
            img("golden-plaza-dusk-lisbon-16", "Lisbon plaza at dusk"),
          ],
          paragraph: null,
        },

        { type: "heading", heading: "Tram Life & Transit Magic" },
        {
          layout: "split",
          image: img(
            "riding-the-rails-lisbon-3",
            "Inside a historic Lisbon tram",
          ),
          paragraph:
            "Stepping onto an iconic yellow tram felt like stepping back in time. The low rumble, wooden seats, and view from the front carriage encouraged us to slow down almost immediately.",
        },
        {
          layout: "diptych",
          image: img(
            "vintage-tram-vibes-lisbon-4",
            "Yellow tram outside a red building in Lisbon",
          ),
          imageB: img(
            "nighttime-funicular-magic-lisbon-18",
            "Funicular on a Lisbon hill at night",
          ),
          paragraph:
            "Unlike modern transit, nobody seemed eager to hurry. Watching the city slide past through open windows was one of those simple pleasures where taking your time felt completely natural.",
        },

        { type: "heading", heading: "Local Flavours & Feathered Friends" },
        {
          layout: "split",
          image: img(
            "alfresco-sundowner-sipping-lisbon-13",
            "Beers on an outdoor café table in Lisbon",
          ),
          paragraph:
            "Outdoor dining became less of a meal stop and more of a daily rhythm. We'd settle at a checkered table, watch the sun drop behind the buildings, and realise another hour had quietly slipped by over cold beers and fresh grilled sardines.",
        },
        {
          layout: "diptych",
          image: img(
            "feathered-local-royalty-lisbon-10",
            "Peacocks in a Lisbon courtyard",
          ),
          imageB: img(
            "rooftop-feathers-sunshine-lisbon-11",
            "Peacocks perched above Lisbon streets",
          ),
          paragraph:
            "It wasn't difficult to understand why people linger. Before long, we found ourselves doing exactly the same.",
        },
        {
          layout: "cinematic",
          image: img(
            "fresh-local-feast-lisbon-17",
            "Grilled sardines and potatoes in Lisbon",
          ),
          paragraph: null,
        },
      ]}
      bridgeQuote="One visit was never going to be enough."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      returnLink={{ label: "Return to Portugal", path: "/portugal" }}
    />
  );
}

export default LisbonNew;
