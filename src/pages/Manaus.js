import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import manausImages from "../assets/artImages/slices/category/manaus.json";
import manausStory from "../assets/artImages/slices/story/brazil-manaus.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import galleryBg from '../assets/Backgrounds/Dirty-Wall-Texture.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { manausHeroConfig } from './brazil/manaus/manaus.hero.config';

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
    title: 'Manaus | Nomad Scribbles',
    description: 'Deep in the heart of the Amazon, Manaus is a city shaped by its riverside urbanism and the vast forest that surrounds it.',
  },
  coords: destinations.find(d => d.id === 'manaus'),
  spatialContext: 'Thousands of kilometres from the coast, accessible mainly by river and air — and surrounded on all sides by the Amazon.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Manaus does not separate city from forest — it stacks them. The Amazon is not a day trip from here; it is the room next door, and every choice in the city tests that proximity.',
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
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Proximity, not spectacle.',
    align: 'center',
  },
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
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={manausHeroConfig}
      heroPageData={{ title: 'Manaus', subtitle: 'Gateway to the Amazon' }}
      intro={{
        paragraphs: [
          'Manaus is both an extraordinary place and a difficult one. It is a city of more than two million people, located thousands of kilometres from Brazil\'s coast and accessible mainly by river and air — one of the largest urban centres on Earth embedded so deeply within tropical rainforest.',
          'Here, the Amazon isn\'t a distant idea, but a daily presence. Rivers, trees, animals, and people intersect in ways that feel unusually close and unusually exposed. That closeness creates opportunity — wildlife remains visible even at the city\'s edges, and forest products shape everyday life from food and medicine to craft and trade.',
          'But access brings pressure too. Manaus is also an industrial hub, home to one of Brazil\'s largest free trade zones. Economic growth offers stability for many, but it also pulls constantly at the forest that sustains the city.',
        ],
      }}
      rhythmInserts={[
        'None of this happens at a distance. The forest is right there.',
        'The benefits and the risks exist side by side — often for the same people, often through the same systems.',
      ]}
      narratives={[
        {
          image: img('manaus3', 'Preparing fruit at the market'),
          heading: 'Access, Proximity, Opportunity',
          paragraph: 'Tourism brings income and connection, particularly for Indigenous communities who use the city as a base while maintaining strong ties to the forest. Manaus makes the Amazon accessible — not as a myth or a backdrop, but as something lived with and worked through.',
        },
        {
          image: img('manaus6', 'A rain-soaked street in Manaus'),
          heading: 'City, Scale, Pressure',
          paragraph: 'Manaus grows outward as well as upward. Streets stretch, neighbourhoods densify, and infrastructure follows the river\'s edge deeper into the forest. Every new road, warehouse, or housing block sits in direct conversation with what it replaces. The city\'s scale is felt not through skylines, but through the quiet accumulation of pressure on the land around it.',
        },
        {
          image: img('manaus12', 'Looking up from the forest floor'),
          heading: 'The Forest Itself',
          paragraph: 'Choices are rarely clean, and rarely made from a place of certainty. Land becomes something to sell. Trees become resources. Farming, logging, and development arrive not as abstract threats, but as practical responses to immediate needs. To leave Manaus is to leave with that complexity intact — not a warning, and not a celebration, but an understanding that the Amazon\'s future is being shaped here, by ordinary decisions made every day.',
        },
        {
          image: img('manaus19', 'Caiman beneath the surface'),
          heading: 'Quiet Consequences',
          paragraph: 'It is a place where the Amazon is still present and powerful, shaping daily life rather than sitting safely beyond reach. People work with the forest, learn from it, and rely on it in ways that are practical and immediate. At the same time, Manaus shows how fragile that balance is — growth brings real benefits, but also tension, and not every decision protects what surrounds the city.',
        },
        {
          image: img('manaus12', 'Looking up from the forest floor'),
          heading: 'Scale from Below',
          paragraph: 'Towering trunks and layered canopy rewrite distance from the ground — the Amazon teaches scale through biology before it teaches it through maps.',
        },
      ]}
      bridgeQuote="Manaus doesn't give you a neat ending. It is a story of people negotiating their future in real time."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="You leave Manaus carrying a question more than an answer — about what it means to live beside something vast, to depend on it, and to keep making choices that test its limits."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Salvador', path: '/brazil/salvador' }}
    />
  );
}

export default Manaus;
