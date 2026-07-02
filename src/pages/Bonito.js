import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import bonitoImages from "../assets/artImages/slices/category/bonito.json";
import bonitoStory from "../assets/artImages/slices/story/brazil-bonito.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import galleryBg from '../assets/Backgrounds/Textured-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { bonitoHeroConfig } from './brazil/bonito/bonito.hero.config';
import { hasBonitoStaticHero, isMobileViewport } from '../utils/staticPageHero';

const bonitoCatalog = mergeArtSlices(bonitoImages, bonitoStory);
const img = makeImgResolver(bonitoCatalog);

const GALLERY_ORDER = [
  'bonito1','bonito2','bonito3','bonito4','bonito5','bonito6',
  'bonito7','bonito8','bonito9','bonito10','bonito11','bonito12',
  'bonito13','bonito14','lagaoAzulMaranhao',
];

const galleryImages = GALLERY_ORDER
  .map(id => bonitoCatalog.find(image => image.id === id))
  .filter(Boolean)
  .map(image => ({
    src: cloudinaryImageUrl(image.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(image.cloudinary.lightbox, { width: 1600 }),
    alt: image.title,
    imageId: image.id,
    title: image.title,
    description: image.description,
    sizeClass: 'small',
    theme: 'bonito',
    energy: 'low',
  }));

const locationData = {
  name: 'Bonito',
  seo: {
    title: SEO_TITLES["/brazil/bonito"],
    description: 'Explore the crystal clear waters, breathtaking waterfalls, and surreal caves of Bonito, Brazil\'s premier ecotourism destination.',
  },
  coords: destinations.find(d => d.id === 'bonito'),
  spatialContext: 'Deep in Mato Grosso do Sul — where limestone filters every river into impossible clarity.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'In Bonito, transparency is not a metaphor — it is literal. The water seems to vanish until you look down and see the riverbed in sharp detail.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'The Pantanal',
    tagline: 'Wetland scale and seasonal rhythm — where wildlife follows the water, not the calendar.',
    path: '/brazil/pantanal',
    image: 'Brazil/Pantanal/small/Pantanal5.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Walk the forest between falls',
    text: 'The cascades are the headline, but the riparian trails matter — monkeys in the canopy, filtered light, the limestone slowly building living stone under your feet.',
    location: 'Estância Mimosa / Boca da Onça',
    image: img('bonito10', 'Suspension bridge through the canopy'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Float, do not rush',
    text: 'On Rio da Prata or Rio Sucuri the point is drift — minimal splashing, slow breathing, letting the fish come to you. The river rewards stillness more than effort.',
    location: 'Rio da Prata',
    image: img('bonito4', 'Stone steps into the river'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Cave light has its own schedule',
    text: 'Gruta do Lago Azul only makes sense when the sun hits the chamber right — ask locally, book the window, and accept that the blue is brief as much as beautiful.',
    location: 'Gruta do Lago Azul',
    image: img('bonito2', 'The Blue Lake Cave'),
  },
  doThisAgainBlock(
    "We'd float rather than swim. On the clear rivers, stillness brought the fish closer and the limestone world into focus. We'd walk the forest trails between the falls instead of rushing from cascade to cascade.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The green pool that invited lingering',
    text: [
      'Water gathered beneath mossy rock, glowing an opaque green that looked almost unreal — built for floating and listening rather than spectacle.',
      'We kept returning here when the organised tours felt too full, as if the river had saved a quieter room for late afternoon.',
    ],
    image: img('bonito9', 'Green pool beneath mossy rock'),
    location: 'Along the river circuit',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Blue beyond Bonito',
    text: 'Lençóis Maranhenses holds a different blue — lagoon water between white dunes, vivid enough to feel borrowed from another coast entirely.',
    image: img('lagaoAzulMaranhao', 'Lagoa Azul do Maranhão'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Stillness, reflected',
    text: 'A pavilion mirrored on the surface so perfectly the reflection felt sharper than the structure — a pause built around balance, not performance.',
    image: img('bonito13', 'Pavilion reflected on still water'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our river day',
    subtitle: 'Sign → float → swing → bend in the forest',
    text: 'We followed the same logic each day: arrive at a river entrance, drift until time ran out, then wander the bank where the water curves through the jungle on its own quiet terms.',
    image: img('bonito8', 'A bend in the river through the forest'),
  },
];

function Bonito() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      skipHero={hasBonitoStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={bonitoHeroConfig}
      heroPageData={{ title: 'Bonito', subtitle: 'The Source of Purity' }}
      intro={{
        paragraphs: [
          'In Mato Grosso do Sul, limestone filters the rivers until the bed looks close enough to touch — fish visible at arm\'s length, turquoise where the current slows, caves where blue light only arrives at the right hour.',
        ],
      }}
      rhythmInserts={[
        'The limestone floor filters the water — calcium carbonate building tufa terraces that shape each cascade into stepped pools.',
      ]}
      narratives={[
        {
          image: img('bonito11', 'Crystal cascades at Bonito'),
          heading: 'Crystal Cascades',
          paragraph: 'High concentrations of calcium carbonate create tufa deposits — living stone that terraces the cascades at Boca da Onça and Estância Mimosa. Trails cut through riparian forest where monkeys and birds watch from the canopy.',
        },
        {
          image: img('bonito3', 'Snorkelling the crystal rivers'),
          heading: 'Aquarium of the Earth',
          paragraph: 'Floating down the Rio da Prata or the Rio Sucuri, the current carries you over white sand and schools of Piraputanga with bright orange tails. Minimal splashing, slow breathing — the fish come closer when you stop kicking.',
        },
        {
          image: img('bonito2', 'The Blue Lake Cave'),
          heading: 'Abyssal Blue',
          paragraph: 'Descend into Gruta do Lago Azul when the sun hits the chamber — electric blue water below stalactites that date back hundreds of thousands of years. For the adventurous, Abismo Anhumas drops seventy-two metres by rappel into a cavern the size of a cathedral nave.',
        },
        {
          image: img('bonito4', 'Stone steps into the river'),
          heading: 'Light at the Mouth',
          paragraph: 'Some caves are defined by what you see when you look back toward the entrance — forest framed in stone, the outside world reduced to a bright opening while the chamber stays cool and still.',
        },
      ]}
      bridgeQuote="Drift on Rio da Prata until time runs out, then walk the bank where the water curves through the jungle on its own quiet terms."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Turquoise filtered through limestone, Piraputanga at arm's length, blue light brief inside Gruta do Lago Azul."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Manaus', path: '/brazil/manaus' }}
    />
  );
}

export default Bonito;
