import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import manausImages from "../assets/artImages/slices/category/manaus.json";
import manausStory from "../assets/artImages/slices/story/brazil-manaus.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import galleryBg from '../assets/Backgrounds/Dirty-Wall-Texture.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { manausHeroConfig } from './brazil/manaus/manaus.hero.config';
import { hasManausStaticHero, isMobileViewport } from '../utils/staticPageHero';

const manausCatalog = mergeArtSlices(manausImages, manausStory);
const img = makeImgResolver(manausCatalog);

const GALLERY_ORDER = Array.from({ length: 22 }, (_, i) => `manaus${i + 1}`);

const galleryImages = GALLERY_ORDER
  .map(id => manausCatalog.find(image => image.id === id))
  .filter(Boolean)
  .map(image => ({
    src: cloudinaryImageUrl(image.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(image.cloudinary.lightbox, { width: 1600 }),
    alt: image.title,
    imageId: image.id,
    title: image.title,
    description: image.description,
    sizeClass: 'small',
    theme: 'manaus',
    energy: 'low',
  }));

const locationData = {
  name: 'Manaus',
  seo: {
    title: SEO_TITLES["/brazil/manaus"],
    description: 'Deep in the heart of the Amazon, Manaus is a city shaped by its riverside urbanism and the vast forest that surrounds it.',
  },
  coords: destinations.find(d => d.id === 'manaus'),
  spatialContext: 'Thousands of kilometres from the coast, accessible mainly by river and air — and surrounded on all sides by the Amazon.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Mercado Adolpho Lisboa at street level — boats at the back docks, forest produce beside dried fish and remedies.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Natural Spaces',
    tagline: 'Amazon canopy as one chapter in Brazil\'s wider green — rainforest, wetland, coast, and city parks.',
    path: '/brazil/natural-spaces',
    image: 'Brazil/Natural Spaces/small/Mata Atlântica',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Start at the market, not the brochure',
    text: 'Mercado Adolpho Lisboa is dense, loud, and practical — dried fish, nuts, remedies, conversations between stalls. It explains Manaus faster than any museum label.',
    location: 'Mercado Adolpho Lisboa',
    image: img('manaus10', 'A stallholder between shelves of oils and herbs'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Read the walls',
    text: 'Street murals carry Indigenous symbolism and local folklore at building scale. Walk a few blocks off the main arteries — the city tells parallel stories on its façades.',
    location: 'Centro',
    image: img('manaus5', 'Large-scale murals in Manaus'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Let scale do the teaching',
    text: 'Giant water lilies and canopy views do what lectures cannot — they make the Amazon\'s proportions felt in the body. Go when light is low; the forest changes minute by minute.',
    location: 'Lago Janauari / forest reserves',
    image: img('manaus15', 'Giant water lilies on still water'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Wildlife announces itself quietly',
    text: 'Caimans, monkeys, and colour on the forest floor rarely perform on cue. Stand still, watch the water\'s surface, and accept partial views — the Amazon rewards patience more than pursuit.',
    location: 'Forest edge and blackwater channels',
    image: img('cocolobaGigantifolia', 'Coccoloba Gigantifolia'),
  },
  doThisAgainBlock(
    "We'd take the river seriously — not as scenery but as the city's actual front door. We'd let the forest edge sit beside everyday errands until the proximity stopped feeling surprising.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The opera house in the rainforest',
    text: [
      'Teatro Amazonas rises in pink stone like a European dream planted in the tropics — surreal because it belongs, built from rubber wealth and stubborn ambition.',
      'We kept circling back to the square at dusk, when the heat eased and the building felt less like a monument and more like a question the city still lives inside.',
    ],
    image: img('manaus4', 'Teatro Amazonas façade'),
    location: 'Praça São Sebastião',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Colour in a quiet second',
    text: 'A butterfly on cut fruit — heat, wings, and sweetness compressed into a few seconds. Small encounters in the Amazon often carry more weight than the grand ones.',
    image: img('manaus1', 'Butterfly on fruit in the rainforest'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our city-to-forest day',
    subtitle: 'Market → centro → water\'s edge',
    text: 'We moved from the market\'s noise to older streets with peeling colour, then out toward still water where minerals stain the flow amber and the pace finally drops.',
    image: img('manaus20', 'Clear water beneath a rocky overhang'),
  },
];

function Manaus() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="brazil"
      skipHero={hasManausStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={manausHeroConfig}
      heroPageData={{ title: 'Manaus', subtitle: 'Gateway to the Amazon' }}
      intro={{
        paragraphs: [
          'Manaus is both an extraordinary place and a difficult one. It is a city of more than two million people, located thousands of kilometres from Brazil\'s coast and accessible mainly by river and air — one of the largest urban centres on Earth embedded so deeply within tropical rainforest.',
          'Here, the Amazon is not a distant idea. Boats at the market docks, forest produce beside dried fish, giant water lilies an hour from the centro — rivers, trees, and city traffic sharing the same afternoon.',
          'Manaus is also an industrial hub with a large free trade zone. Warehouses and roads press against the forest edge; growth and pressure sit beside the same river that supplies the market.',
        ],
      }}
      rhythmInserts={[
        'None of this happens at a distance — forest produce at the market, murals on centro walls, lily pads an hour from the opera house.',
      ]}
      narratives={[
        {
          image: img('manaus3', 'Preparing fruit at the market'),
          heading: 'Access, Proximity, Opportunity',
          paragraph: 'Mercado Adolpho Lisboa fills with dried fish, nuts, and remedies — vendors calling between stalls while boats unload forest produce at the back docks.',
        },
        {
          image: img('manaus6', 'A rain-soaked street in Manaus'),
          heading: 'City, Scale, Pressure',
          paragraph: 'Streets stretch along the river\'s edge — new warehouses, housing blocks, and roads visible from the forest margin. Scale here is felt in cleared land and traffic noise as much as in any skyline.',
        },
        {
          image: img('manaus12', 'Looking up from the forest floor'),
          heading: 'The Forest Itself',
          paragraph: 'On the forest floor, trunks rewrite distance from below — canopy removing the horizon before any map can explain the scale.',
        },
        {
          image: img('manaus19', 'Caiman beneath the surface'),
          heading: 'Quiet Consequences',
          paragraph: 'Caimans drift beneath dark water at the forest edge, their outline broken by reflections of canopy above. Monkeys cross between market-adjacent trees and reserve paths within the same afternoon.',
        },
        {
          image: img('manaus12', 'Looking up from the forest floor'),
          heading: 'Scale from Below',
          paragraph: 'Towering trunks and layered canopy rewrite distance from the ground — the Amazon teaches scale through biology before it teaches it through maps.',
        },
      ]}
      bridgeQuote="Teatro Amazonas at dusk, market noise at dawn, amber water where minerals stain the flow at the forest edge."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Pink stone on the opera square after heat broke, butterfly on cut fruit at a stall, lily pads wide enough to doubt from the boat."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Salvador', path: '/brazil/salvador' }}
    />
  );
}

export default Manaus;
