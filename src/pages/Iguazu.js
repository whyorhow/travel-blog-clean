import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import iguazuImages from "../assets/artImages/slices/category/iguazu.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Grunge-Texture-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { iguazuHeroConfig } from './brazil/iguazu/iguazu.hero.config';
import { hasFozStaticHero, isMobileViewport } from '../utils/staticPageHero';

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
    title: SEO_TITLES["/brazil/foz"],
    description: 'Iguazu is a landscape of falling water and dense subtropical forest, where the river ignores borders and life thrives in the spray.',
  },
  coords: destinations.find(d => d.id === 'foz'),
  spatialContext: 'On the border of Brazil and Argentina — a river that pays no attention to either.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Spray on your face before the gorge appears — cool, constant, indifferent to cameras.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Florianópolis',
    tagline: 'From falling water to island beaches — the southern coast slows into a different rhythm.',
    path: '/brazil/florianopolis',
    image: 'Brazil/Floripa/small/Floripa18.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Let the forest slow you down',
    text: 'Bright flowers and quiet trails along the approach — coatis on the railing, spray on your face before the gorge appears.',
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
  doThisAgainBlock(
    "We'd stand in the spray longer than we meant to and accept that dryness was temporary. We'd walk both sides of the border without treating either as the main event — the river's calm upstream made the falls harder to believe, and that contrast was part of the point.",
  ),
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
      skipHero={hasFozStaticHero() && isMobileViewport()}
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
          paragraph: 'Upstream the river looks almost calm — wide water broken by green islands, no hint from the surface of what happens metres ahead. On the Argentinian walkways the falls read wider than taller, framed by forest and open sky.',
        },
        {
          image: img('iguazu11', 'River at sunset away from the falls'),
          heading: 'The Lingering Memory',
          paragraph: 'We left with wet shoes, spray on our lenses, and the roar still audible in the car park — sound and vibration outlasting any single photograph from the main platform.',
        },
      ]}
      bridgeQuote="Wet shoes on the walkway, roar pressing into your chest, upstream calm that lies about what sits metres ahead."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Ground vibrating underfoot at the main platform, coatis at the quieter trail, rainbow broken by spray we could not wipe from our lenses."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Bonito', path: '/brazil/bonito' }}
    />
  );
}

export default Iguazu;
