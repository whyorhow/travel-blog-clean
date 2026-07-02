import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import ilhaImages from "../assets/artImages/slices/category/ilha-grande.json";
import { ilhaGrandeHeroConfig } from './brazil/ilha-grande/ilha-grande.hero.config';
import { hasIlhaGrandeStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id, alt) => {
  const entry = ilhaImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const locationData = {
  name: 'Ilha Grande',
  seo: {
    title: SEO_TITLES["/brazil/rio/ilha-grande"],
    description: 'A roadless island off the Rio coast — quiet trails, clear water, and unhurried rhythms reached by boat.',
  },
  coords: null,
  spatialContext: 'An island pause within reach of Rio — no roads, only forest paths and water.',
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
    eyebrow: 'Mainland',
    title: 'Rio de Janeiro',
    tagline: 'The city across the bay — granite, carnival energy, and neighbourhoods between forest and sea.',
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
  doThisAgainBlock(
    "We'd walk the forest paths downhill without checking the time. The beaches appeared without ceremony, usually just after we'd stopped expecting them. We'd arrive by boat and leave the mainland urgency on the dock.",
  ),
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
      skipHero={hasIlhaGrandeStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Ilha Grande', subtitle: 'Reached by water. Changed by it.' }}
      showContextMap={false}
      intro={{
        paragraphs: [
          'An hour from Rio by boat, Ilha Grande has no roads — only forest paths, hand-painted signs, and beaches that appear when you have already stopped checking the time.',
          'You arrive at the dock the same way you leave. Whatever urgency we carried from the mainland loosened before our feet touched the sand.',
        ],
      }}
      rhythmInserts={[
        'Forest leans over the sand — shade, roots, and tide sharing the same narrow strip.',
      ]}
      narratives={[
        {
          image: img('ilha8', 'Forest opening toward the beach'),
          heading: 'Forest First',
          paragraph: 'At first glance the water looked familiar — southern Brazil greens, jungle pressed to the sand. Paths disappeared into canopy. Fresh water slipped over rock beneath the trees before any beach announced itself.',
        },
        {
          image: img('ilha7', 'A dog resting on an island path'),
          heading: 'Lived-in Quiet',
          paragraph: 'Most days settle into a simple rhythm. Short walks through dense green. Dogs resting in the shade. Hostels, kitchens, and hand-painted signs pointing toward pousadas. Stone structures reclaimed by vegetation sit off the main paths — history you walk to rather than queue for.',
        },
        {
          image: img('ilha9', 'A quiet beach beneath the trees'),
          heading: 'Beaches Without Performance',
          paragraph: 'Lopes Mendes curves long and open; smaller coves hide behind trees and narrow paths. The forest edge stays close to the water — no traffic, no horns, only footpaths and boat timetables setting the day.',
        },
        {
          image: img('ilha13', 'Boats resting offshore'),
          heading: 'Departure',
          paragraph: 'When you leave, it happens the same way you arrived — by water. The island recedes slowly, green folding back into blue, trams and horns still absent on the mainland ahead.',
        },
      ]}
      bridgeQuote="Vila do Abraão at dusk, forest path downhill to water we had not expected, boat wake folding green back into blue on the return."
      reflectiveClose="Hand-painted signs stacked at the dock, stone arch half-hidden in leaves, flip-flops still wet on the ferry back to Rio."
      returnLink={{ label: 'Back to Rio', path: '/brazil/rio' }}
    />
  );
}

export default IlhaGrande;
