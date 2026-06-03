import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import ilhaImages from "../assets/artImages/slices/category/ilha-grande.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Textured-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { ilhaGrandeHeroConfig } from './brazil/ilha-grande/ilha-grande.hero.config';

const img = (id, alt) => {
  const entry = ilhaImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const GALLERY_ORDER = [
  'ilha20','ilha17','ilha8','ilha11','ilha3',
  'ilha4','ilha7','ilha15','ilha5',
  'ilha9','ilha14','ilha18','ilha16',
  'ilha13','ilha21','ilha19',
];

const galleryImages = GALLERY_ORDER
  .map(id => ilhaImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'ilha',
    energy: 'low',
  }));

const locationData = {
  name: 'Ilha Grande',
  seo: {
    title: 'Ilha Grande Travel Guide: Roadless Island, Trails & Beaches',
    description: 'A roadless island where the Atlantic Forest meets the sea. Ilha Grande is a place of quiet trails, clear water, and unhurried rhythms.',
  },
  coords: destinations.find(d => d.id === 'ilha-grande'),
  spatialContext: 'Off the coast of Rio de Janeiro — reached only by water, and changed by that fact.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'You arrive by boat and leave the same way. Whatever urgency you carried from the city loosens before your feet touch the sand.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Rio de Janeiro',
    tagline: 'The mainland city across the bay — granite, carnival energy, and neighbourhoods between forest and sea.',
    path: '/brazil/rio',
    image: 'Brazil/Rio/small/Rio9.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Follow the forest paths downhill',
    text: 'Trails here rarely announce the beach at the start. Walk long enough through the green and the water appears without ceremony — usually when you have already stopped checking the time.',
    location: 'Island trails',
    image: img('ilha11', 'Fresh water moving over stone beneath the canopy'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Let the hand-painted signs decide',
    text: 'Stacked signs for pousadas and kitchens are not decoration — they are navigation. Pick a direction that sounds unhurried and trust you will end up somewhere worth sitting.',
    location: 'Vila do Abraão',
    image: img('ilha4', 'Hand-painted signs on the island'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Choose shade over spectacle',
    text: 'The best beaches here curve gently and stay close to the trees. If you can sit where the forest leans over the sand, you have already found the right spot.',
    location: 'Along the coast',
    image: img('ilha14', 'Trees leaning over pale sand and green water'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Slow paths, not a checklist.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Where the forest met the inlet',
    text: [
      'Thick branches framing quiet water — jungle and shoreline overlapping without a clear line between them.',
      'We returned to this kind of edge more than once: not the longest beach, just the place where the forest still felt present when you looked up from the sand.',
    ],
    image: img('ilha6', 'Forest branches framing a quiet inlet'),
    location: 'Coastal trails',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Stone reclaimed by leaves',
    text: 'An old arch deep in the forest, slowly taken back by roots and time. The island keeps its history quiet — you have to walk to it, and it never feels like the main event.',
    image: img('ilha12', 'Stone arch reclaimed by the forest'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our default day',
    subtitle: 'Trail → inlet → long beach → back before dark',
    text: 'No roads meant every day had the same gentle structure: walk out, find water, sit longer than planned, walk back while there was still light in the trees.',
    image: img('ilha18', 'A long curve of beach beneath tilting trees'),
  },
];

function IlhaGrande() {
  return (
    <LightTemplate
      variant="coastal"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={ilhaGrandeHeroConfig}
      heroPageData={{ title: 'Ilha Grande', subtitle: 'Reached by water. Changed by it.' }}
      intro={{
        paragraphs: [
          'Ilha Grande feels less like a destination and more like a release. For many people in Rio, the island isn\'t an upgrade or a highlight — it\'s a pause. A place to step out of the city\'s volume without travelling far, where movement slows almost immediately because it has to.',
          'You arrive by boat. There are no roads across the island. Whatever pace you brought with you begins to loosen before you reach the shore.',
        ],
      }}
      rhythmInserts={[
        'Forest doesn\'t sit behind the beach here — it leans over it, shades it, interrupts it.',
        'You don\'t come here to collect experiences. You come to let the city fall away.',
      ]}
      narratives={[
        {
          image: img('ilha8', 'Forest opening toward the beach'),
          heading: 'Forest First',
          paragraph: 'At first glance, Ilha Grande can feel familiar — a hint of southern Brazil in the colours of the water, something of Thailand in the way jungle presses right up to the sand. Paths disappear quickly. Clearings feel temporary. Fresh water slips quietly over rock beneath dense canopy. Small details begin to matter more than landmarks.',
        },
        {
          image: img('ilha7', 'A dog resting on an island path'),
          heading: 'Lived-in Quiet',
          paragraph: 'Most days settle into a simple rhythm. Short walks through dense green. Dogs resting in the shade. Hostels, kitchens, and places you don\'t need to rush toward. There are traces of history here, but they\'re quiet ones — stone structures reclaimed by vegetation, old routes softened by leaves and roots. The island isn\'t interested in telling its story loudly.',
        },
        {
          image: img('ilha9', 'A quiet beach beneath the trees'),
          heading: 'Beaches Without Performance',
          paragraph: 'Beaches stretch gently rather than dramatically. Some curve long and open, others hide behind trees and narrow paths. The water stays close to the forest edge, and the forest never fully retreats. Ilha Grande isn\'t about doing less for the sake of it — it\'s about removing friction. No traffic. No urgency. No need to choose between nature and comfort.',
        },
        {
          image: img('ilha13', 'Boats resting offshore'),
          heading: 'Departure',
          paragraph: 'When you leave, it happens the same way you arrived — by water. The island recedes slowly, green folding back into blue, and only then do you realise how much quieter everything has become.',
        },
      ]}
      bridgeQuote="The island isn't interested in telling its story loudly — it lets time do most of the work."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Ilha Grande gives back exactly what you're willing to slow down enough to receive — which turns out to be quite a lot."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Santos', path: '/brazil/santos' }}
    />
  );
}

export default IlhaGrande;
