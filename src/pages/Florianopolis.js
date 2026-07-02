import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import floripaImages from "../assets/artImages/slices/category/florianopolis.json";
import floripaStory from "../assets/artImages/slices/story/brazil-florianopolis.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import dirtyWallTexture from '../assets/Backgrounds/Dirty-Wall-Texture.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { florianopolisHeroConfig } from './brazil/florianopolis/florianopolis.hero.config';
import FlorianopolisJournalMap from '../components/FlorianopolisJournalMap';
import { hasFlorianopolisStaticHero, isMobileViewport } from '../utils/staticPageHero';

const floripaCatalog = mergeArtSlices(floripaImages, floripaStory);
const img = makeImgResolver(floripaCatalog);

const GALLERY_ORDER = [
  'floripa14','floripa18','floripa2','floripa5','floripa3',
  'floripa12','floripa4','floripa17','floripa10','floripa8',
  'floripa11','floripa7','floripa6','floripa15','floripa16',
  'floripa19','floripa22','floripa13','floripa21','floripa20',
  'floripa25','floripa24','floripaBea','floripa9','floripa1','floripa23',
];

const galleryImages = GALLERY_ORDER
  .map(id => floripaCatalog.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'floripa',
    energy: 'low',
  }));

const locationData = {
  name: 'Florianópolis',
  seo: {
    title: SEO_TITLES["/brazil/florianopolis"],
    description: 'Florianópolis: An island city where lush hills meet over 40 distinct beaches on Brazil\'s southern coast.',
  },
  coords: destinations.find(d => d.id === 'florianopolis'),
  spatialContext: 'An island city on Brazil\'s southern coast — forty beaches, a lagoon at the centre, families returning each summer.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Coolers on Campeche sand, nets cast at dusk on the bay side, the same beach chosen again because the light had settled into a rhythm we recognised.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_JOURNAL_MAP,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Santos',
    tagline: 'Down the coast — port air, promenade pace, and São Paulo\'s slower neighbour by the sea.',
    path: '/brazil/santos',
    image: 'Brazil/Santos/small/Santos3.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Match the beach pace',
    text: 'At Campeche, families arrive with coolers and settle in. The best days feel unplanned — arrive early, stay late, and don\'t try to optimise the spot.',
    location: 'Campeche',
    image: img('floripa24', 'Coati crossing the sand at Campeche Island'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'The bay side is for evenings',
    text: 'Santo Antônio de Lisboa comes alive as the light softens — restaurants fill slowly, boats settle, and the water stays calm enough to linger. Plan dinner here, not lunch.',
    location: 'Santo Antônio de Lisboa',
    image: img('floripa21', 'Casting a net at dusk on the bay'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Stay for the last light at Forte',
    text: 'Praia do Forte interrupts wide sand with rocks and uneven surf — and the golden hour here is worth waiting out. People slow down without anyone telling them to.',
    location: 'Praia do Forte',
    image: img('floripa23', 'Golden hour at Praia do Forte'),
  },
  doThisAgainBlock(
    "We'd return to the same beach until it felt like ours — not because it was the best on the island, but because the light and the surf had settled into a rhythm we recognised. We'd let the day choose the beach rather than the other way around.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: 'Bar do Arante',
    text: [
      'Handwritten notes cover the walls and ceiling — each one left like a small offering. What began as habit has become atmosphere.',
      'We kept ending up here after long beach days, adding our own note without quite knowing why it mattered.',
    ],
    image: img('floripa8', 'Handwritten notes at Bar do Arante'),
    location: 'Pântano do Sul',
    anchorId: 'pantano-do-sul',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Crossing the Hercílio Luz Bridge',
    text: 'The old suspension bridge is how the island announces itself — a long span over water before the beaches and hills open up. Even when traffic flows elsewhere, it still reads as the threshold between mainland routine and island pace.',
    image: img('hercilioLuzBridge', 'Hercílio Luz Bridge'),
    location: 'Hercílio Luz Bridge',
    anchorId: 'hercilio-luz-bridge',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Lagoa da Conceição',
    text: 'The lagoon sits at the island\'s busy centre — restaurants, bars, and evening light on still water. It is where Florianópolis feels most like a city that happens to be surrounded by beaches, rather than a beach that grew a city around it.',
    image: img('floripa20', 'Last light on the bay'),
    location: 'Lagoa da Conceição',
    anchorId: 'lagoa-da-conceicao',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Praia da Solidão',
    text: 'A quieter cove where the coastline narrows and the forest leans close — fewer people, slower steps, tree shade reaching the tideline.',
    image: img('floripa16', 'Above the cove at Praia da Solidão'),
    location: 'Praia da Solidão',
    anchorId: 'praia-da-solidao',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The capital at the fig tree',
    text: [
      'At the centre of Florianópolis, the Figueira Centenária spreads wide — daily life passing beneath branches that outlast every summer season.',
      'It is a useful anchor when the island feels scattered across dozens of beaches: the city still has a centre, and it still moves at its own pace.',
    ],
    image: img('floripa2', 'Figueira Centenária in the capital'),
    location: 'Florianópolis',
    anchorId: 'capital-city',
  },
];

function Florianopolis() {
  return (
    <LightTemplate
      variant="coastal"
      atmosphere="brazil"
      skipHero={hasFlorianopolisStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={florianopolisHeroConfig}
      heroPageData={{ title: 'Florianópolis', subtitle: 'The Magic Island' }}
      journalMap={<FlorianopolisJournalMap />}
      intro={{
        paragraphs: [
          'Florianópolis is bigger than it looks. Footsteps fade into the tide, coastlines widen and narrow again, and the island shifts gently between city, beach, and forest.',
          'This is partly because Florianópolis isn\'t shaped primarily for international visitors — it\'s a holiday island for Brazilians, and that context sets the tone. Families return year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, water, and green space.',
          'You don\'t need a highlight list. We returned to the same beaches until coolers, ferry times, and evening light on Lagoa da Conceição felt familiar.',
        ],
      }}
      rhythmInserts={[
        'Hercílio Luz bridge at dusk — mainland routine on one side, island beaches on the other.',
        'At Praia do Forte, rocks break the sand and people adjust their pace without thinking about it.',
      ]}
      narratives={[
        {
          image: img('floripa5', 'Campeche beach — wide and unhurried'),
          heading: 'Campeche',
          paragraph: 'The beach runs broad and uninterrupted, backed by hills rather than dense development. People arrive with coolers, towels, and time, and tend to stay put. A short boat ride offshore, Campeche Island offers smaller coves and the occasional coati crossing the sand — but the mainland beach is where the island\'s logic usually clicks into place first.',
          anchorId: 'campeche',
        },
        {
          image: img('floripa12', 'Santo Antônio de Lisboa by the water'),
          heading: 'Santo Antônio de Lisboa',
          paragraph: 'On the quieter, bay-facing side of the island, the rhythm turns inward. Santo Antônio sits where the water stays calm and the light softens toward evening. Boats rest near shore, restaurants fill gradually, workshops and homes sit side by side. Handmade objects and unhurried meals aren\'t arranged for visitors — they\'re simply part of how the place functions.',
          anchorId: 'santo-antonio',
        },
        {
          image: img('floripa22', 'Praia do Forte — rocks and surf'),
          heading: 'Praia do Forte',
          paragraph: 'Where Campeche opens wide, Praia do Forte interrupts — rocks break the sand, waves arrive unevenly, salt spray on the plants at the tree line. People slow without anyone announcing it.',
          anchorId: 'praia-do-forte',
        },
        {
          image: img('floripaBea', 'Floripa beach'),
          heading: 'Campeche and repetition',
          paragraph: 'We returned to the same beaches until coolers, ferry times, and evening light on Lagoa da Conceição felt familiar — Campeche for width, Praia do Forte for rocks and golden hour, Santo Antônio for calm water at dusk.',
        },
      ]}
      bridgeQuote="Pé na areia, água de coco, beira do mar. Feet in the sand, coconut water, by the sea."
      galleryImages={galleryImages}
      galleryBackground={dirtyWallTexture}
      reflectiveClose="Handwritten notes at Bar do Arante, golden hour at Praia do Forte, last light on Lagoa da Conceição from the same table twice."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Rio de Janeiro', path: '/brazil/rio' }}
    />
  );
}

export default Florianopolis;

