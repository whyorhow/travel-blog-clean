import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import bonitoImages from "../assets/artImages/slices/category/bonito.json";
import bonitoStory from "../assets/artImages/slices/story/brazil-bonito.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import galleryBg from '../assets/Backgrounds/Textured-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { bonitoHeroConfig } from './brazil/bonito/bonito.hero.config';

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
    title: 'Bonito | Nomad Scribbles',
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
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Clarity, not adrenaline.',
    align: 'center',
  },
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
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={bonitoHeroConfig}
      heroPageData={{ title: 'Bonito', subtitle: 'The Source of Purity' }}
      intro={{
        paragraphs: [
          'Located in the heart of Mato Grosso do Sul, Bonito is a testament to the preservation of nature. It\'s a place where the water is so clear that it seems to vanish, where fish swim in liquid crystal, and where the Earth\'s inner beauty is revealed in every cave and waterfall.',
        ],
      }}
      rhythmInserts={[
        'The limestone floor of the riverbeds acts as a giant natural filter — removing all impurities and leaving only pristine, mineral-rich turquoise.',
        'Bonito\'s waterfalls are not just features of the landscape. They are architected by nature over millennia.',
      ]}
      narratives={[
        {
          image: img('bonito11', 'Crystal cascades at Bonito'),
          heading: 'Crystal Cascades',
          paragraph: 'High concentrations of calcium carbonate in the water create tufa deposits — living stone that grows and shapes the cascades into terraced pools of impossible clarity. Whether it\'s the towering Boca da Onça or the intimate falls of Estância Mimosa, the trails lead through lush riparian forests where monkeys and tropical birds watch from the canopy.',
        },
        {
          image: img('bonito3', 'Snorkelling the crystal rivers'),
          heading: 'Aquarium of the Earth',
          paragraph: 'Floating down the Rio da Prata or the Rio Sucuri is a transcendent experience. The water is so clear it feels like flying through an underwater garden. Schools of Piraputanga, with their bright orange tails, glide alongside you in a silent, colourful parade.',
        },
        {
          image: img('bonito2', 'The Blue Lake Cave'),
          heading: 'Abyssal Blue',
          paragraph: 'Descend into the Gruta do Lago Azul, where a steep climb down reveals a subterranean lake of electric blue that defies belief. Periodic columns and stalactites frame the view, some dating back hundreds of thousands of years. For the adventurous, the Abismo Anhumas offers a 72-metre rappel into a massive cavern.',
        },
        {
          image: img('bonito4', 'Stone steps into the river'),
          heading: 'Light at the Mouth',
          paragraph: 'Some caves are defined by what you see when you look back toward the entrance — forest framed in stone, the outside world reduced to a bright opening while the chamber stays cool and still.',
        },
      ]}
      bridgeQuote="In Bonito, the water doesn't just flow — it creates. Everything here is shaped by what the river carries and what it leaves behind."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Bonito stays with you as a quality of light — the particular turquoise of filtered water, the way fish move through it as if gravity has softened. You don't forget that kind of clarity."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Manaus', path: '/brazil/manaus' }}
    />
  );
}

export default Bonito;
