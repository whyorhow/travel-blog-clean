import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import iguazuImages from "../assets/artImages/slices/category/iguazu.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Grunge-Texture-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { iguazuHeroConfig } from './brazil/iguazu/iguazu.hero.config';

const img = (id, alt) => {
  const entry = iguazuImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const GALLERY_ORDER = [
  'iguazu1','iguazu2','iguazu3','iguazu4','iguazu5','iguazu6',
  'iguazu7','iguazu8','iguazu9','iguazu10','iguazu11','iguazu12',
  'iguazu13','iguazu14','iguazu15','iguazu16','iguazu17','iguazu18',
];

const galleryImages = GALLERY_ORDER
  .map(id => iguazuImages.find(image => image.id === id))
  .filter(Boolean)
  .map(image => ({
    src: cloudinaryImageUrl(image.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(image.cloudinary.lightbox, { width: 1600 }),
    alt: image.title,
    imageId: image.id,
    title: image.title,
    description: image.description,
    sizeClass: 'small',
    theme: 'iguazu',
    energy: 'high',
  }));

const locationData = {
  name: 'Iguazu Falls',
  seo: {
    title: 'Iguazu Falls Travel Guide: Brazil–Argentina Border & Rainforest',
    description: 'Iguazu is a landscape of falling water and dense subtropical forest, where the river ignores borders and life thrives in the spray.',
  },
  coords: destinations.find(d => d.id === 'foz'),
  spatialContext: 'On the border of Brazil and Argentina — a river that pays no attention to either.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Long before you see the water, you hear it — a low presence that does not rise and fall but accumulates with every step toward the gorge.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Let the forest slow you down',
    text: 'Bright flowers and quiet trails along the approach matter as much as the falls. The jungle does not step aside for the view — it insists on being part of it.',
    location: 'Forest paths',
    image: img('iguazu1', 'Tropical bloom near the trails'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Expect to get wet',
    text: 'At the main walkways the spray is rain — cool, constant, indifferent to cameras. Protect your gear and accept that dryness is temporary here.',
    location: 'Garganta do Diabo',
    image: img('iguazu7', 'Rainbow in the spray'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'The river lies about calm',
    text: 'Upstream looks almost peaceful — wide water broken by green islands. Standing there, it is hard to believe what happens metres ahead. That contrast is part of the point.',
    location: 'Argentinian walkways',
    image: img('iguazu10', 'Marco das Três Fronteiras'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Away from the main roar.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The waterfall off the main path',
    text: [
      'Tucked away from the busiest viewpoints, a smaller fall slips quietly into a shaded pool — a reminder that even here, the smaller details matter.',
      'We kept drifting to these quieter stretches when the main platforms felt like too much sound at once.',
    ],
    image: img('iguazu15', 'Hidden waterfall along the trail'),
    location: 'Side trails',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'A butterfly on the railing',
    text: 'A brief pause — patterned wings, the roar behind it unchanged. These small moments pull your focus inward even when the landscape insists on being overwhelming.',
    image: img('iguazu18', 'Butterfly by the water'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our path through the gorge',
    subtitle: 'Forest → spray → quieter river at dusk',
    text: 'We walked the same sequence more than once: build-up through the trees, impact at the edge, then the softer light where the river finally looks calm again.',
    image: img('iguazu14', 'The falls seen through the trees'),
  },
];

function Iguazu() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={iguazuHeroConfig}
      heroPageData={{ title: 'Iguazu', subtitle: 'The Great Waters' }}
      intro={{
        paragraphs: [
          'Iguazu is not a single fall, but a system of 275 cascades that spread across nearly three kilometres. It is a place of profound noise and overwhelming proximity, where the Atlantic Forest meets the river in a relentless display of power and life.',
        ],
      }}
      rhythmInserts={[
        'Long before you see the water, you hear it — a low, continuous presence that builds with every step.',
        'Away from the main viewpoints, attention shifts. Wildlife appears at the edges — birds, coatis, butterflies pausing wherever the noise briefly softens.',
      ]}
      narratives={[
        {
          image: img('iguazu16', 'Iguazu from above through the trees'),
          heading: 'The Build-Up',
          paragraph: 'The path moves through dense greenery, opening and closing again, offering brief glimpses of river far below. From above, Iguazu feels wide rather than tall, the water spreading out in multiple directions, broken by islands of rock and vegetation. The noise grows gradually — it doesn\'t rise and fall. It accumulates.',
        },
        {
          image: img('iguazu6', 'Up close at the falls'),
          heading: 'The Impact',
          paragraph: 'Up close, Iguazu is overwhelming. The sound becomes physical — a deep, relentless roar that presses into your chest and flattens conversation into gestures and half-smiles. Water crashes past at eye level, throwing spray so thick it feels like rain. The ground vibrates underfoot. Everything else recedes.',
        },
        {
          image: img('iguazu9', 'Calm river upstream before the falls'),
          heading: 'Distance and Life',
          paragraph: 'Crossing to the Argentinian side, the tone changes. The falls are still vast, still loud, but they feel more distant, framed by forest and open sky. From here, Iguazu reveals its full width and the way it spills across borders without regard for them. Upstream, the river looks almost calm — giving no hint of what lies just metres ahead.',
        },
        {
          image: img('iguazu11', 'River at sunset away from the falls'),
          heading: 'The Lingering Memory',
          paragraph: 'Iguazu doesn\'t end with a final image. It lingers instead as sound, pressure, and memory — the sense of having stood briefly inside something too large to fully absorb. Whether you arrive knowing only its reputation, or return already familiar with its force, the experience resists simplification.',
        },
      ]}
      bridgeQuote="This is a place people come to witness. What stays with you is how completely it surrounds you while you're there."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="The falls keep moving long after you leave. Whatever you thought you'd feel standing there is usually wrong — and usually less than the reality."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Bonito', path: '/brazil/bonito' }}
    />
  );
}

export default Iguazu;
