import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import galleryImagesData from "../assets/artImages/slices/bundles/art-galleries.json";
import artCulture from "../assets/artImages/slices/category/art-culture.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import { artGalleriesHeroConfig } from "./brazil/saopaulo/art-galleries.hero.config";

const artCatalog = mergeArtSlices(galleryImagesData, artCulture);
const img = makeImgResolver(artCatalog);

const locationData = {
  name: 'Art & Galleries',
  seo: {
    title: 'Art & Galleries — São Paulo | Nomad Scribbles',
    description: "São Paulo's galleries as part of everyday movement through the city.",
  },
  coords: null,
  spatialContext: 'MASP above Paulista, Pinacoteca in brick and light — pauses inside the megacity\'s rhythm.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo\'s galleries are entered on purpose — not passed through like streets or parks. They fit between other parts of the day, offering pause without asking to become the whole itinerary.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Walk under MASP first',
    text: 'Before you go inside, cross Avenida Paulista beneath the suspended building. Traffic and protest continue below while the museum stays still above — the frame makes more sense once you have felt the city moving under it.',
    location: 'MASP / Avenida Paulista',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Circle and return',
    text: 'The glass easels invite drifting — no fixed route, no obligation to finish. Leave when something pulls you out, return to the same room later in the visit or on another day. Familiarity builds through repetition.',
    location: 'MASP main collection',
    image: img('monaLisaMosaic', 'Mona Lisa mosaic at MASP'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Descend for the quieter register',
    text: 'The lower levels change light and material — Indigenous Brazilian work held in the same attention as the floors above, not set apart as distant objects. Give this section time; it rewards slowness.',
    location: 'MASP lower galleries',
    image: img('theCongaAltar', 'The Congá — a sacred altar'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Let Pinacoteca set the pace',
    text: 'Brick, iron, and high windows absorb sound differently from MASP\'s glass volume. Move one room at a time; afternoon shadow is part of the exhibition.',
    location: 'Pinacoteca do Estado',
    image: img('pinacotecaSaoPaulo', 'Pinacoteca de São Paulo'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 4,
    type: 'local-tip',
    title: 'Street sculpture counts',
    text: 'Not all of São Paulo\'s art waits indoors. Public works sit in squares and crossings — encountered on the way to something else until repetition turns them into landmarks.',
    location: 'Centro / public space',
    image: img('amnesiaFlavioCerqueira', 'Amnésia by Flávio Cerqueira'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Pause, not pilgrimage.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'MASP held above the avenue',
    text: [
      'Masterpieces on transparent easels, visible from all sides — the building hovers while Paulista continues beneath it.',
      'We kept returning for an hour between other plans, treating the museum as a room the city offers rather than a destination that defines the day.',
    ],
    image: img('gallery6', 'Sketch tracing São Paulo through art'),
    location: 'MASP',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'The ballerina in still suspension',
    text: 'Degas\' figure draws the gaze without demanding the room — people circle, pause, and return. Time loosens in that circle more reliably than anywhere on the street outside.',
    image: img('handmadeCeramics', 'Handmade ceramics'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Colour at the threshold',
    text: 'Pop art on a wall that still feels like a corridor — São Paulo treats bold colour as ordinary furniture rather than exception.',
    image: img('popArtPainting', 'Pop art painting'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our gallery afternoon',
    subtitle: 'Paulista → MASP → Pinacoteca',
    text: 'We crossed under MASP, drifted the main floor without finishing, descended for the quieter collection, then crossed the city to Pinacoteca when the light turned soft through the high windows.',
    image: img('religiousShrine', 'Religious shrine'),
  },
];

function ArtGalleries() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={artGalleriesHeroConfig}
      heroPageData={{ title: 'Art & Galleries', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'In São Paulo, galleries sit within the city, but they are not passed through in the same way as streets or parks.',
          'People enter them deliberately, often between other parts of the day. They are not destinations, but rather pauses from the movement of the city.',
        ],
      }}
      rhythmInserts={[
        'There is no fixed route through the space.',
        'Works are encountered one at a time as the building moves from one enclosed space to the next.',
      ]}
      narratives={[
        {
          image: img('gallery1', 'MASP suspended above Avenida Paulista'),
          heading: 'MASP',
          paragraph: 'MASP sits above Avenida Paulista, lifted away from the movement of the street. Traffic, noise, and daily routines continue beneath it while the building stays still above them. Inside, artworks are placed on glass supports so they are visible from all sides. People move between works, stopping when something catches their attention, then continuing without needing to complete a path.',
        },
        {
          image: img('gallery2', 'Degas ballerina sculpture at MASP'),
          heading: 'Returning',
          paragraph: 'In certain rooms, people move in and out rather than staying for long periods. They pause, leave, and return again - sometimes within the same visit, sometimes on different days. What is noticed on one visit is not always the same on the next. Some works become familiar over time, not because they change, but because they are seen again.',
        },
        {
          image: img('gallery3', 'Indigenous Brazilian works at MASP'),
          heading: 'Below the Main Levels',
          paragraph: 'Below the main levels, the building becomes quieter. Light changes here, and the materials feel older and less polished. Indigenous Brazilian works are shown alongside other collections, not set apart as distant objects but placed within the same space of attention.',
        },
        {
          image: img('figurativeGallery', 'Figurative gallery'),
          heading: 'Figurative Rooms',
          paragraph: 'Bodies and faces accumulate across rooms — not as a single argument, but as a series of encounters. The gallery asks you to move slowly enough for each figure to register before the next one replaces it.',
        },
        {
          image: img('photographicExhibition', 'Photographic exhibition'),
          heading: 'Light on Paper',
          paragraph: 'Photography here feels immediate — moments held still while the city outside continues. The prints reward proximity: texture, grain, and the decision of what stayed inside the frame.',
        },
        {
          image: img('gallery5', 'Pinacoteca brick, iron, and light'),
          heading: 'Pinacoteca',
          paragraph: 'Inside the Pinacoteca, brick and iron remain visible throughout the building. Light enters through high windows, leaving parts of each room in shadow. For many people in São Paulo, galleries are visited when time opens up, fitting into days rather than defining them.',
        },
        {
          image: img('paintingRepressao', 'Painting including Repressão by Claudio Tozzi'),
          heading: 'Political Colour',
          paragraph: 'Some rooms carry the weight of recent history without explaining it. Colour and figure do the work — the city\'s arguments rendered visible on canvas rather than in speech.',
        },
        {
          image: img('grandHallZuLai', 'Grand Hall of the Zu Lai Temple'),
          heading: 'Zu Lai Temple',
          paragraph: 'Outside the museum circuit, the Zu Lai Temple offers a different scale of attention — carved wood, incense, and ceremony held with the same seriousness as any curated collection.',
        },
        {
          image: img('oGrandePatio', 'O Grande Pátio do Templo Zu Lai'),
          heading: 'The Courtyard',
          paragraph: 'The courtyard opens slowly. Paving, lanterns, and the rhythm of footsteps replace the white cube — art here is lived rather than framed.',
        },
        {
          image: img('redBridgeZuLai', 'The Red Bridge at Zu Lai Temple'),
          heading: 'The Red Bridge',
          paragraph: 'The bridge reads as punctuation between worlds — a short crossing that changes the pace of the visit entirely.',
        },
        {
          image: img('mysticHummingbird', 'The Mystic Hummingbird of Boleta'),
          heading: 'Myth in the Open',
          paragraph: 'Myth and craft sit beside the everyday — a hummingbird rendered large enough to stop you mid-step, then small enough to fold back into the street when you leave.',
        },
      ]}
      bridgeQuote="They remain part of the city's interior rhythm - present, but not always entered."
      reflectiveClose="São Paulo's galleries don't ask to be sought out. They simply remain available - part of the city's quieter interior."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Carnival', path: '/brazil/saopaulo/carnival' }}
    />
  );
}

export default ArtGalleries;
