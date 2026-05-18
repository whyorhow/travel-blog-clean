import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import carnivalImages from "../assets/artImages/slices/category/carnival.json";
import { carnivalHeroConfig } from "./brazil/saopaulo/carnival.hero.config";

const img = (id, alt) => {
  const entry = carnivalImages.find(i => i.id === id);
  if (!entry) return null;
  return {
    src: entry.cloudinary.blog,
    lightboxSrc: entry.cloudinary.lightbox,
    alt: alt || entry.title,
  };
};

const locationData = {
  name: 'Carnival',
  seo: {
    title: 'Carnival — São Paulo | Nomad Scribbles',
    description: 'Carnival as structured procession and open street movement.',
  },
  coords: null,
  spatialContext: 'Sambódromo do Anhembi and the blocos that spill through parks, alleys, and Paulista — structure and release in the same week.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo Carnival forms, dissolves, and forms again elsewhere — procession in one register, percussion in another. Neither version is the whole story; the city holds both at once.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'See the scale from the stands',
    text: 'Grupo Especial at Anhembi rewards patience before the first school — crowds settle, then the avenue fills with continuous flow. From the stands, spectacle reads as labour and timing as much as colour.',
    location: 'Sambódromo do Anhembi',
    image: img('carnival10', 'The Sambadrome opens'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Watch the crowd as well as the parade',
    text: 'Spectators lean forward in unison when rhythm shifts — the stands are part of the choreography. Carnival here is collective attention, not a performance watched from a distance.',
    location: 'Sambódromo',
    image: img('carnival4', 'Spectators at the parade'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Follow the blocos, not a map',
    text: 'Street Carnival has no single centre — sound finds you between intersections. Pick a neighbourhood, drift toward drums, and accept that the route will rewrite itself.',
    location: 'Vila Madalena / Centro',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 4,
    type: 'local-tip',
    title: 'Let the bloco pull you in',
    text: 'Alceu Valença and the marchinhas turn the street into shared current — edges loosen, form dissolves, and movement follows sound rather than any held line.',
    location: 'Open blocos',
    image: img('carnival6', 'Blocos in alleyways and parks'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 5,
    type: 'local-tip',
    title: 'Stand inside the percussion',
    text: 'In narrow streets the beat bounces off walls — no stage, no clear line between players and crowd. Stay close enough to feel the surdo in your chest.',
    location: 'Street blocos',
    image: img('carnival9', 'Vibrant street samba in a narrow lane'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 6,
    type: 'local-tip',
    title: 'Peak density has a physical cost',
    text: 'When sound and presence merge into one field, hydration and exit routes matter. Ride the peak, then step one block sideways — the pulse continues but your body gets air.',
    location: 'Dense street circuits',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Rhythm, not a single venue.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Anhembi after dark',
    text: [
      'Night parade at the Sambódromo — temporary architecture, packed stands, precision and noise that never feel distant.',
      'We kept returning for one school each evening rather than chasing every name on the bill — enough scale to understand the machine without exhausting it.',
    ],
    image: img('carnival8', 'Anhembi Sambadrome at night'),
    location: 'Sambódromo do Anhembi',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Murals and brass in the same breath',
    text: 'A bloco spilling past painted walls — percussion behind, brass stepping forward, crowds pulled in without schedule. Carnival here leaks outward until the street is the venue.',
    image: img('carnival14', 'Batman street party during Carnival'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our two-register day',
    subtitle: 'Stands → side street → night dissolve',
    text: 'We split the day: Sambódromo for structured spectacle, then out into blocos where drums led and the crowd became the choreography — ending where intensity loosened at the edges without the pulse fully stopping.',
  },
];

function CarnivalSaoPaulo() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={carnivalHeroConfig}
      heroPageData={{ title: 'Carnival', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'It moves across the city over several days. People gather, follow, and drift in and out of it as it shifts between places.',
          'It forms, dissolves, and forms again elsewhere, repeating as it moves through the city.',
        ],
      }}
      rhythmInserts={[]}
      narratives={[
        { type: 'heading', heading: 'In One Place' },
        {
          image: img('carnival1', 'Carnival float in the procession'),
          heading: 'Then It Begins',
          paragraph: 'Crowds gather, filling the stands before anything begins. The procession holds its line, unfolding step by step. The flow becomes continuous, passing directly in front of the crowd. Shapes hold as they move through it, carried by rhythm rather than direction.',
        },
        {
          image: img('carnival2', 'Grupo Especial at the Sambódromo'),
          heading: 'The Procession',
          paragraph: 'The rhythm shifts, and the crowd shifts with it. Their shape holds as they move forward through the flow. Structure becomes the medium — form as movement, movement as form.',
        },
        { type: 'heading', heading: 'In the Streets' },
        {
          image: img('carnival7', 'Alceu Valença bloco'),
          heading: 'Outside the Edges',
          paragraph: 'Outside the edges, the structure begins to loosen. Nothing stays held in place. It spills into rhythm, no longer contained by form or direction. What begins as release becomes a shared current, carried through sound rather than structure.',
        },
        {
          image: img('carnival11', 'Street drummers'),
          heading: 'Sound Leads',
          paragraph: 'Drums arrive first, then everything else follows into their space. A continuous beat carries across blocks and intersections, repeating and shifting as it travels. Nothing resolves. It only intensifies and releases in cycles that never fully break.',
        },
        {
          image: img('carnival12', 'Surdo — the band heartbeat'),
          heading: 'Peak Density',
          paragraph: 'At peak density, sound and presence merge into one condition. The idea of groups dissolves into a single field of tempo and response, reactive and immediate, constantly adjusting but never pausing. Even when it shifts, it does not lose continuity.',
        },
        {
          image: img('carnival13', 'The Macaco Cansado band'),
          heading: 'Dissolve',
          paragraph: 'As night deepens, the intensity begins to loosen at the edges. The same pulse remains, but it spreads further apart, allowing space to return between moments. What stays is the echo of everything that has passed through, still moving but no longer held at full force.',
        },
      ]}
      bridgeQuote="Carnival belongs to the city as much as the streets do."
      reflectiveClose="The party continues through the night."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Green Spaces', path: '/brazil/saopaulo/green-spaces' }}
    />
  );
}

export default CarnivalSaoPaulo;
