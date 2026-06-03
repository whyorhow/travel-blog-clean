import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import floripaImages from "../assets/artImages/slices/category/florianopolis.json";
import floripaStory from "../assets/artImages/slices/story/brazil-florianopolis.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import dirtyWallTexture from '../assets/Backgrounds/Dirty-Wall-Texture.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { florianopolisHeroConfig } from './brazil/florianopolis/florianopolis.hero.config';

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
    title: 'Florianópolis Travel Guide: Beaches, Island Life & Southern Brazil',
    description: 'Florianópolis: An island city where lush hills meet over 40 distinct beaches on Brazil\'s southern coast.',
  },
  coords: destinations.find(d => d.id === 'florianopolis'),
  spatialContext: 'An island city on Brazil\'s southern coast — shaped for Brazilians, open to everyone.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Florianópolis doesn\'t perform for visitors. It continues the way it does every summer — for people who already know which beach is theirs.',
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
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Rituals, not highlights.',
    align: 'center',
  },
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
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The workshop window in Santo Antônio',
    text: [
      'Small handmade figures in a village shop window — half playful, half uncanny. These workshops are stitched into daily life, not arranged for visitors.',
      'We passed this window more than once on the way to the water, and it never felt like a stop on a route — just part of how the place works.',
    ],
    image: img('handmadeCeramics', 'Handmade ceramics'),
    location: 'Santo Antônio de Lisboa',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our island rhythm',
    subtitle: 'Beach → bay → rocks → repeat',
    text: 'We stopped trying to see every beach in a week. Instead we returned to a handful — wide sand one day, rocky surf the next, the bay at dusk when the light softened.',
    image: img('floripaBea', 'Floripa beach'),
  },
];

function Florianopolis() {
  return (
    <LightTemplate
      variant="coastal"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={florianopolisHeroConfig}
      heroPageData={{ title: 'Florianópolis', subtitle: 'The Magic Island' }}
      intro={{
        paragraphs: [
          'Florianópolis reveals itself slowly. Footsteps fade into the tide, coastlines widen and narrow again, and the island shifts gently between city, beach, and forest.',
          'This is partly because Florianópolis isn\'t shaped primarily for international visitors — it\'s a holiday island for Brazilians, and that context sets the tone. Families return year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, water, and green space.',
          'You don\'t come here to collect highlights. You come to settle into something that already works.',
        ],
      }}
      rhythmInserts={[
        'Nothing competes for attention, and that absence becomes the appeal.',
        'The landscape sets the terms here. Life follows.',
      ]}
      narratives={[
        {
          image: img('floripa5', 'Campeche beach — wide and unhurried'),
          heading: 'Campeche',
          paragraph: 'The beach runs broad and uninterrupted, backed by hills rather than dense development. People arrive with coolers, towels, and time, and tend to stay put. For Brazilians, Campeche is about familiarity — long days, repeated visits, and a rhythm that doesn\'t need reinvention. For visitors, it\'s often where the island\'s logic clicks into place.',
        },
        {
          image: img('floripa12', 'Santo Antônio de Lisboa by the water'),
          heading: 'Santo Antônio de Lisboa',
          paragraph: 'On the quieter, bay-facing side of the island, the rhythm turns inward. Santo Antônio sits where the water stays calm and the light softens toward evening. Boats rest near shore, restaurants fill gradually, workshops and homes sit side by side. Handmade objects and unhurried meals aren\'t arranged for visitors — they\'re simply part of how the place functions.',
        },
        {
          image: img('floripa22', 'Praia do Forte — rocks and surf'),
          heading: 'Praia do Forte',
          paragraph: 'Where Campeche opens wide, Praia do Forte interrupts. Rocks break the sand, waves arrive unevenly, and the coastline resists being smoothed out. Plants lean into salt air, stones accept the water again and again, and people adjust their pace without thinking about it.',
        },
        {
          image: img('floripa25', 'Arriving at Campeche Island'),
          heading: 'Who Is This Trip For?',
          paragraph: 'This island suits travellers who enjoy beaches that feel lived-in rather than staged, and days that don\'t require much planning. It may frustrate those looking for a dense city experience or tightly structured itinerary. Florianópolis tends to reward patience and repetition more than novelty — it\'s better understood gradually, through small differences between beaches, towns, and days.',
        },
      ]}
      bridgeQuote="Pé na areia, água de coco, beira do mar. Feet in the sand, coconut water, by the sea."
      galleryImages={galleryImages}
      galleryBackground={dirtyWallTexture}
      reflectiveClose="The island doesn't ask for your attention. It simply continues — tides, beaches, and the quiet routine of people who already know this place well."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Ilha Grande', path: '/brazil/ilha-grande' }}
    />
  );
}

export default Florianopolis;

