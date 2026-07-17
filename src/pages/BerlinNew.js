import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { LightTemplate } from "./templates";
import {
  EDITORIAL_PLACEMENTS,
  doThisAgainBlock,
} from "../components/editorial";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import berlinArt from "../assets/artImages/slices/story/germany-berlin.json";
import galleryBg from "../assets/Backgrounds/Gray-Wall-Rough.webp";

const berlinCatalog = berlinArt;

const BERLIN_HERO_ID = "Germany/Berlin/Berlin-Hero-Backup";
const BERLIN_HERO_WIDTHS = [600, 900, 1200, 1600, 2400, 3200];
const BERLIN_HERO_LCP_WIDTH = 1200;
const BERLIN_HERO_SIZES =
  "(max-width: 767px) 100vw, (max-width: 1200px) 90vw, 1200px";

const berlinHeroUrl = (width) => cloudinaryImageUrl(BERLIN_HERO_ID, { width });

const sectionAnchor = (name) => ({
  type: "heading",
  heading: name,
  anchorId: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
});

const prose = (text) => ({ type: "prose", paragraph: text });

const narrativeImage = (id, opts = {}) => {
  const entry = berlinCatalog.find((item) => item.id === id);
  if (!entry) return null;

  return {
    src: cloudinaryImageUrl(entry.cloudinary.blog, { width: 1200 }),
    alt: entry.title,
    lightboxSrc: entry.cloudinary.lightbox,
    lightboxAlt: entry.title,
    caption: opts.caption || entry.description,
    ...opts,
  };
};

const editorialSplit = (id, opts = {}) => ({
  type: "photo",
  layout: "editorial-split",
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  imageLeft: opts.imageLeft ?? true,
});

const immersiveBreak = (id, opts = {}) => ({
  type: "photo",
  layout: "immersive-break",
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  afterParagraph: opts.afterParagraph,
});

const splitOffset = (id, opts = {}) => ({
  type: "photo",
  layout: "split-offset",
  image: narrativeImage(id, opts),
  heading: opts.heading,
  eyebrow: opts.eyebrow,
  paragraph: opts.paragraph,
  imageLeft: opts.imageLeft ?? true,
});

const featureImage = (id, opts = {}) => ({
  type: "photo",
  layout: "feature-image",
  image: narrativeImage(id, opts),
  anchorId: opts.anchorId,
});

const GALLERY_ORDER = [
  "glass-and-steel-berlin-2",
  "dome-by-river-berlin-4",
  "neon-and-puddles-berlin-1",
  "stone-and-scale-berlin-5",
  "dome-and-wire-berlin-6",
  "grief-in-light-berlin-7",
  "feet-on-history-berlin-8",
  "words-in-stone-berlin-9",
  "concrete-sea-berlin-12",
  "the-corridor-berlin-13",
  "graffiti-pink-call-berlin-3",
  "the-brain-house-berlin-19",
  "faces-of-berlin-berlin-20",
  "mobile-home-berlin-21",
  "kulturbrauerei-courtyard-berlin-26",
  "table-light-berlin-22",
  "tavern-1840-berlin-23",
  "fresh-rolls-berlin-28",
  "brunch-bowls-berlin-29",
  "sweet-side-berlin-30",
  "brandenburg-berlin-10",
  "world-clock-berlin-27",
  "misty-city-view-berlin-39",
  "socialist-realism-berlin-15",
  "the-soldier-berlin-17",
  "fraternal-berlin-34",
  "to-the-german-people-berlin-38",
  "the-dome-berlin-41",
  "river-walk-berlin-37",
  "reflections-on-the-spree-berlin-35",
];

const galleryImages = GALLERY_ORDER.map((id) =>
  berlinCatalog.find((entry) => entry.id === id),
)
  .filter(Boolean)
  .map((entry) => ({
    src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
    fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
    alt: entry.title,
    imageId: entry.id,
    title: entry.title,
    description: entry.description,
  }));

const locationData = {
  name: "Berlin",
  seo: {
    title: SEO_TITLES["/germany/berlin"],
    description:
      "Berlin through station glass, memorial stone, courtyards, and evenings beside the Spree.",
  },
  coords: undefined,
  spatialContext:
    "Berlin keeps its history above ground — in memorial stone, preserved wall sections, riverfront government buildings, and ordinary streets still marked by what stood there before.",
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: "reflective-fragment",
    text: "Red S-Bahn trains dropping through stacked platforms while rain collected in the seams of the pavement outside.",
  },
  doThisAgainBlock(
    "We'd start again at Hauptbahnhof, walk towards the Spree without deciding the route, stop in the courtyards when the light changed, and leave room for the memorials to slow the day down. Berlin made more sense each time we crossed the river and doubled back instead of chasing a checklist.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 22,
    type: "link-banner",
    eyebrow: "Across the journey",
    title: "Food & Drink",
    tagline:
      "From Berlin bakery counters, tavern tables, and long brunches to Brazilian markets, street snacks, and meals that refused to end quickly.",
    path: "/brazil/food-drink",
    image: "Brazil/Food-Drink/Small/Pastel",
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: "link-banner",
    eyebrow: "Across Europe",
    title: "Antwerp",
    tagline:
      "Another city read through surfaces — brick façades, workshop windows, market stone, and streets that made more sense by walking them twice.",
    path: "/belgium/antwerp",
    image: "Belgium/Antwerp/antwerp-backup",
  },
];

const narratives = [
  sectionAnchor("Arrival"),
  featureImage("glass-and-steel-berlin-2", {
    caption:
      "The Hauptbahnhof curves above the platforms, filtering grey light through its glass and steel roof.",
    anchorId: "arrival",
  }),
  prose(
    "We arrived by train beneath the Hauptbahnhof roof, with platforms stacked above each other and red S-Bahn carriages slipping in and out under the glass. Outside, the pavement was still wet. Taxi lights and station signs stayed in the ground longer than they did on the buildings.",
  ),
  immersiveBreak("dome-by-river-berlin-4", {
    paragraph:
      "We walked towards the Spree first. The Berlin Cathedral sat across the water under a flat sky, its reflection broken only where the bridge cut through the surface.",
  }),
  splitOffset("neon-and-puddles-berlin-1", {
    paragraph:
      "Near the station, puddles held the color of shop signs and traffic lights longer than the buildings did.",
    imageLeft: true,
  }),

  sectionAnchor("Memory In The Pavement"),
  editorialSplit("grief-in-light-berlin-7", {
    eyebrow: "Memorial",
    heading: "Memory In The Pavement",
    paragraph:
      "At the Neue Wache, the room was almost empty except for the sculpture under the open oculus. A short walk away, the glass square of the Empty Library sat in the cobblestones, and people only noticed it when they stopped at the edge and looked down.",
    imageLeft: true,
    anchorId: "memory-in-the-pavement",
  }),
  splitOffset("feet-on-history-berlin-8", {
    paragraph:
      "The cold from the glass edge came up through the soles of our shoes while people crossed the square without breaking stride.",
    imageLeft: false,
  }),
  splitOffset("words-in-stone-berlin-9", {
    paragraph:
      "Bronze names and lines in the pavement asked to be read at ground level, not from a museum label.",
    imageLeft: true,
  }),
  immersiveBreak("concrete-sea-berlin-12", {
    paragraph:
      "At the Holocaust Memorial, the concrete blocks dropped and rose in rows until the view narrowed to grey walls and gravel.",
    afterParagraph:
      "Inside the corridors, the traffic noise thinned out. The ground stayed uneven underfoot and the stone kept the cold.",
  }),
  splitOffset("the-corridor-berlin-13", {
    paragraph:
      "The paths between the slabs were just wide enough for two people to pass each other without speaking.",
    imageLeft: true,
  }),
  splitOffset("the-bunker-sign-berlin-14", {
    paragraph:
      "Elsewhere, history was marked more bluntly: a sign in rough grass, a patch of gravel, a stretch of ordinary pavement carrying more weight than it first appeared to.",
    imageLeft: false,
  }),

  sectionAnchor("Street Berlin"),
  editorialSplit("the-brain-house-berlin-19", {
    heading: "Street Berlin",
    paragraph:
      "Away from the memorials and government buildings, Berlin sat in pasted posters, marker on old paint, brickwork half-covered by new images, and courtyards that felt separate from the main roads a block away.",
    imageLeft: false,
    anchorId: "street-berlin",
  }),
  splitOffset("graffiti-pink-call-berlin-3", {
    paragraph:
      "Color had been added in layers rather than neatly applied. Doorways, shutters, and side walls all carried different hands.",
    imageLeft: true,
  }),
  splitOffset("faces-of-berlin-berlin-20", {
    paragraph:
      "Faces on paper peeled back from the brick until the plaster showed through underneath.",
    imageLeft: false,
  }),
  immersiveBreak("kulturbrauerei-courtyard-berlin-26", {
    heading: "Courtyard Light",
    paragraph:
      "The Kulturbrauerei courtyard changed the pace completely. Bottles were left on tables, the brick held the last of the light, and people stayed longer than they did out on the main road.",
    afterParagraph:
      "Inside the yard, the noise dropped from traffic to conversation, glass, and chairs moving over stone.",
    anchorId: "courtyard",
  }),
  splitOffset("mobile-home-berlin-21", {
    paragraph:
      "Odd details kept interrupting the bigger civic surfaces: a painted vehicle, a pasted sign, a wall that looked half-finished and fully lived in.",
    imageLeft: true,
  }),

  sectionAnchor("Everyday Pauses"),
  prose(
    "Berlin was easier to like once we stopped looking only at the large civic surfaces. A table by a window, bread from a bakery counter, a dark old tavern, coffee stretching the morning longer than planned — those parts of the day softened everything around the memorials and institutions.",
  ),
  splitOffset("table-light-berlin-22", {
    paragraph:
      "One afternoon narrowed to a window table and the strip of light moving across the wood as people went by outside.",
    imageLeft: true,
  }),
  splitOffset("tavern-1840-berlin-23", {
    paragraph:
      "The tavern felt worn in rather than styled that way: dark timber, old lettering, and a room that had seen enough evenings not to hurry anyone out.",
    imageLeft: false,
  }),
  splitOffset("fresh-rolls-berlin-28", {
    paragraph:
      "Fresh rolls bought from a counter disappeared before we had finished the next block.",
    imageLeft: true,
  }),
  splitOffset("brunch-bowls-berlin-29", {
    paragraph:
      "Brunch turned into midday the way it does in cities where nobody seems surprised to still be sitting there.",
    imageLeft: false,
  }),
  immersiveBreak("sweet-side-berlin-30", {
    paragraph:
      "Even the sweeter moments felt grounded in the same materials: tiled counters, steamed-up windows, and coats drying off beside the chair.",
  }),
  splitOffset("the-sushi-platter-berlin-36", {
    paragraph:
      "Dinner after museums and memorials never felt like a separate part of the city. The ordinary and the monumental stayed on the same route.",
    imageLeft: false,
  }),

  sectionAnchor("Division Above Ground"),
  immersiveBreak("fraternal-berlin-34", {
    heading: "Division Above Ground",
    paragraph:
      "At the East Side Gallery, the wall was no longer a blank concrete barrier, but it was still a wall: weathered paint, seams, stains, and tourists photographing what had once cut the city in two.",
    anchorId: "division-above-ground",
  }),
  splitOffset("charlie-berlin-18", {
    paragraph:
      "Checkpoint Charlie was stranger in person than in photographs: souvenir stands, traffic, people queuing for pictures, and the old border story still fixed above the street.",
    imageLeft: false,
  }),
  editorialSplit("socialist-realism-berlin-15", {
    paragraph:
      "Elsewhere the traces were less theatrical: old murals, state architecture, plaques, and long pieces of wall folded into later Berlin rather than set apart from it.",
    imageLeft: true,
  }),
  immersiveBreak("to-the-german-people-berlin-38", {
    heading: "Stone And Glass",
    paragraph:
      "At the Reichstag, the inscription over the facade stayed in shadow below the dome. Tour groups moved up the ramps above while people sat on the grass outside and office workers cut across the lawn.",
  }),
  splitOffset("the-dome-berlin-41", {
    paragraph:
      "From inside the dome, ramps and glass kept turning the view back on itself before opening out over the city again.",
    imageLeft: true,
  }),

  sectionAnchor("Sachsenhausen And Return"),
  prose(
    "Leaving central Berlin for Sachsenhausen changed the day completely. The train platforms, courtyards, and river traffic gave way to wider ground, thinner sound, and a pace that slowed without anyone saying much.",
  ),
  editorialSplit("the-obelisk-berlin-24", {
    heading: "Sachsenhausen",
    paragraph:
      "The memorial tower was visible long before we reached it, standing over the open space in a way that made the scale of the site clear before any sign had to explain it.",
    imageLeft: false,
  }),
  immersiveBreak("iron-gates-berlin-25", {
    paragraph:
      "The gate narrowed the day into one physical act: stepping through it and seeing how far the site continued beyond.",
    afterParagraph:
      "On the way back into Berlin there was very little to say. The same stations and streets were there, but the evening felt flatter and quieter than the one before.",
  }),
  immersiveBreak("reflections-on-the-spree-berlin-35", {
    heading: "Back At The Spree",
    paragraph:
      "By our last evening we ended up at the river again. Construction cranes stood against the dusk, and the lights from the opposite bank stretched across the water instead of holding still.",
  }),
];

function BerlinNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="default"
      heroImage={{
        src: berlinHeroUrl(BERLIN_HERO_LCP_WIDTH),
        preloadSrc: berlinHeroUrl(BERLIN_HERO_LCP_WIDTH),
        srcSet: BERLIN_HERO_WIDTHS.map((w) => `${berlinHeroUrl(w)} ${w}w`).join(
          ", ",
        ),
        sizes: BERLIN_HERO_SIZES,
        width: 1200,
        height: 900,
        alt: "Berlin — a lime-green Trabant driving past a preserved section of the Berlin Wall",
        objectPosition: "center 50%",
      }}
      narratives={narratives}
      rhythmInserts={[
        "Glass roof, wet pavement, memorial stone, brewery brick, river light: Berlin kept changing material before it offered any single explanation.",
      ]}
      intro={{
        lead: "The train into Berlin ended beneath a roof of glass and steel.",
        paragraphs: [
          "From the airport, the train ran into stacked platforms, red S-Bahn carriages, and the echo that sits inside a station that large even when people are talking over it.",
          "Stepping outside, the city widened immediately. Roads opened towards the Spree, cranes stood between blocks, and the first thing we noticed was not a landmark but the amount of unfinished edge still visible in the centre.",
          "Berlin made its first impression through surfaces rather than skyline: wet pavement, scaffolded stone, government glass, river water, memorial bronze underfoot.",
          "We stopped trying to sort those things too quickly. Walking between them made more sense than naming them in advance.",
        ],
      }}
      bridgeQuote="Station glass, names in bronze, wall paint lifting in weather, and the Spree carrying light downstream at the end of the day."
      reflectiveClose={[
        "Wet pavement outside Hauptbahnhof. The glass square of the Empty Library under our feet. Brick darkening in a courtyard while bottles stayed on the tables after dark.",
        "What we remember most is not one monument, but the way Berlin kept making us look down at the pavement, across the river, and back at the same streets after the day had shifted.",
      ]}
      returnLink={{ label: "Return to Germany", path: "/germany" }}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
    />
  );
}

export default BerlinNew;
