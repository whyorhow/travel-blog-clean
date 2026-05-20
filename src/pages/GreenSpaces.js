import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import parkImages from "../assets/artImages/slices/category/parks.json";
import { greenSpacesHeroConfig } from "./brazil/saopaulo/green-spaces.hero.config";

const img = (id, alt) => {
  const entry = parkImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const locationData = {
  name: 'Green Spaces',
  seo: {
    title: 'Green Spaces — São Paulo | Nomad Scribbles',
    description: "São Paulo's parks as living rhythm, not decoration.",
  },
  coords: null,
  spatialContext: 'Threaded through the megacity — where Paulistanos exhale without leaving São Paulo.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'These parks are not escapes from São Paulo. They are the city continuing outdoors — shared pace, shared ground, less urgency without pretending the metropolis has vanished.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Arrive early at Ibirapuera',
    text: 'Families bring food and folding chairs before the heat peaks. Runners trace the same loops; musicians test melodies under trees. The park works best when you match its morning rhythm rather than dropping in at midday.',
    location: 'Parque Ibirapuera',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Read the roots, not just the canopy',
    text: 'Ibirapuera means "rotting tree" in Tupi — wetland memory beneath designed paths. The banyan and native growth remind you this was reclaimed land, not imported decoration.',
    location: 'Ibirapuera',
    image: img('park3', 'Banyan roots and memory in the park'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Wildlife is negotiated, not staged',
    text: 'Monkeys, birds, and ants cross the same blankets and paths as people. Lower your voice, step around without drama, and accept that you are visiting shared territory — not a zoo enclosure.',
    location: 'Canopy paths',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Look at what grows when you stop',
    text: 'Moss on stumps, fungi in rings, insects in shade — the park teaches persistence without urgency. Sit long enough and the small systems become the main event.',
    location: 'Shaded edges',
    image: img('graffitiWorkshop', 'Graffiti workshop in the park'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Colour at park scale',
    text: 'Murals spill into green space here — the same bold faces that dominate crossings, encountered between trees rather than traffic.',
    image: img('blowUpBrasil', 'Blow Up Brasil mural'),
    location: 'Ibirapuera',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Attention, not spectacle.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Burle Marx curves at walking pace',
    text: [
      'Paths sweep instead of cutting; water reflects instead of dividing. The design invites use — jogging, sketching, meeting — rather than admiration from a distance.',
      'We kept returning to trace our own loops through the bamboo tunnels and open lawns, letting the park turn design into daily habit.',
    ],
    image: img('park7', 'Bamboo canopy tunnel'),
    location: 'Ibirapuera',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'The city exhales here',
    text: 'Brazilwood shade, families still eating between conversations, runners at an even pace — the same scenes repeat on different days until the park feels like São Paulo\'s quieter room next door.',
    image: img('park6', 'Light shifting across decaying wood'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our park loop',
    subtitle: 'Open lawn → shade → canopy edge',
    text: 'We walked without a fixed route: grass first while the light was soft, then into shade where the pace dropped, then under the canopy where wildlife and people negotiated the same air.',
  },
];

function GreenSpaces() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={greenSpacesHeroConfig}
      heroPageData={{ title: 'Green Spaces', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          "São Paulo's parks are not escapes from the city. They are where everyday life continues outdoors.",
          "People sit, move, and rest in the same spaces at the same time. There's a quiet understanding in how it all runs. Everyone brings their own pace and activity, but no one fully dominates the space. Over time, that creates a feeling that the park belongs to everyone and no one in particular, just for as long as you're in it.",
        ],
      }}
      rhythmInserts={[
        "It's still São Paulo. Just with less urgency.",
        'The trees here were already established before much of the city was built around them — and they haven\'t been pushed aside.',
      ]}
      narratives={[
        {
          image: img('park2', 'A caterpillar crosses stone warmed by the sun'),
          heading: 'Shared Pace',
          paragraph: 'People sit on the grass with takeaway containers still half open, eating between conversations. Runners move through at a steady, even pace. People drift toward shade and stay there. Light moves across bags, arms, and the ground as leaves above move in the breeze.',
        },
        {
          image: img('park1', 'Brazilwood tree in Ibirapuera'),
          heading: 'Part of Everyday Life',
          paragraph: "São Paulo is a city built in concrete, but it doesn't stay that way for long. Green spaces aren't treated as something separate or occasional — they're used as part of everyday life. People bring what they need and stay for hours. The same scenes repeat across different parks, on different days. After a while, you start to expect it.",
        },
        {
          image: img('saguDeJardim', 'Sagu-de-Jardim in the canopy'),
          heading: 'Moving Around Each Other',
          paragraph: "Monkeys move between branches without hesitation. Birds build nests in light posts. Ants cross picnic blankets in steady lines. People step around ants without thinking. It's not organised, and no one is directing it. They move around each other, close enough to notice, but not close enough to interrupt.",
        },
        {
          image: img('treeMushrooms', 'Bracket fungi on a park tree'),
          heading: 'What Stays',
          paragraph: 'Tree stumps gather moss over time. Bracket fungi spread along trunks and fallen wood. Fine cracks widen slightly, holding bits of soil where something new starts to grow. The parks hold their shape — not because they\'re maintained into stillness, but because they\'re used constantly.',
        },
      ]}
      bridgeQuote="It never settles into one way of being used."
      reflectiveClose="São Paulo's green spaces don't ask you to slow down. They simply make it easier."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Street Murals', path: '/brazil/saopaulo/street-murals' }}
    />
  );
}

export default GreenSpaces;
