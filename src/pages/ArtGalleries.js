import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import galleryImagesData from "../assets/artImages/slices/bundles/art-galleries.json";
import { makeImgResolver } from "../utils/artImageResolver";
import { artGalleriesHeroConfig } from "./brazil/saopaulo/art-galleries.hero.config";
import { hasArtGalleriesStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = makeImgResolver(galleryImagesData);

const locationData = {
  name: 'Galleries',
  seo: {
    title: SEO_TITLES["/brazil/saopaulo/galleries"],
    description: "São Paulo's galleries as part of everyday movement through the city.",
  },
  coords: null,
  spatialContext: 'MASP above Paulista, Pinacoteca in brick and light — then art encountered in public space across the city.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across the journey',
    title: 'Antwerp',
    tagline: 'Indoor collections here; medieval streets and workshop life there — another city read through art and façades.',
    path: '/belgium/antwerp',
    image: 'Belgium/Antwerp/Full/Grote Markt',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    anchorId: 'masp',
    title: 'MASP',
    subtitle: 'Suspended above Avenida Paulista',
    align: 'center',
    location: 'MASP / Avenida Paulista',
    segments: [
      {
        type: 'wide-image',
        image: img('gallery1', 'MASP floating gallery above Avenida Paulista'),
      },
      {
        type: 'prose',
        text: [
          'MASP sits above the avenue, lifted away from traffic and protest while the city continues beneath it. Before going inside, crossing under the suspended building makes the frame clearer — movement below, stillness above.',
        ],
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: img('gallery2', 'Degas ballerina sculpture in MASP'),
        text: [
          'Inside, masterpieces float on transparent easels — visible from all sides, without a fixed route. Near the centre, Degas\' ballerina draws the gaze without demanding the room; people circle, pause, and return. Time loosens here more reliably than on the street outside.',
        ],
      },
      {
        type: 'float',
        side: 'left',
        size: 'lg',
        image: img('gallery3', 'Indigenous Brazilian exhibition in MASP lower levels'),
        text: [
          'Below the main levels the building becomes quieter. Light changes, materials feel older, and Indigenous Brazilian work holds the same attention as the collections above — not set apart as distant objects but placed within the same space of care.',
        ],
      },
      {
        type: 'pair',
        images: [
          img('photographicExhibition', 'Photographic exhibition'),
          img('paintingRepressao', 'Painting including Repressão by Claudio Tozzi'),
        ],
      },
      {
        type: 'prose',
        text: [
          'Photography rewards proximity — grain, texture, the decision of what stayed inside the frame. Nearby, political colour carries recent history without explaining it; figure and canvas do the work instead of speech.',
        ],
      },
      {
        type: 'float',
        side: 'right',
        size: 'sm',
        image: img('gallery6', 'Art gallery drawing — tracing São Paulo through art'),
        text: [
          'Sketches and studies echo the city outside — structure meeting imagination, concrete softened by line. The building holds both the finished work and the trace of how it was seen.',
        ],
      },
      {
        type: 'wide-image',
        image: img('amnesiaFlavioCerqueira', 'Amnésia by Flávio Cerqueira'),
      },
      {
        type: 'float',
        side: 'left',
        size: 'md',
        image: img('theSchoolboy', 'The Schoolboy sculpture'),
        text: [
          'Flávio Cerqueira\'s Amnésia stops the drift for a moment — figurative sculpture that asks for stillness amid everything else moving through the floor. Nearby, The Schoolboy holds the same register: a figure at eye level without a pedestal, encountered between rooms rather than on the street.',
        ],
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'local-tip',
    title: 'Go on a free-entry day',
    text: 'Entry is free for everyone all day on Tuesdays (10am–8pm, last admission 7pm) and on Friday evenings from 6pm (last admission 8pm). Online booking is still required on free days — reserve ahead on the museum site, especially for Tuesday slots.',
    location: 'MASP',
    link: {
      href: 'https://masp.com.br/pt-br/visite',
      label: 'MASP opening hours and tickets — official site',
      variant: 'inline',
    },
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    anchorId: 'pinacoteca',
    title: 'Pinacoteca',
    subtitle: 'Brick, iron, and afternoon light',
    align: 'center',
    location: 'Pinacoteca do Estado',
    segments: [
      {
        type: 'prose',
        text: [
          'Across the city, the Pinacoteca moves at a different pace from MASP\'s glass volume. We crossed when the afternoon turned soft — one quiet room at a time, without trying to finish.',
        ],
      },
      {
        type: 'wide-image',
        image: img('pinacotecaSaoPaulo', 'Pinacoteca de São Paulo'),
      },
      {
        type: 'float',
        side: 'left',
        size: 'md',
        image: img('gallery5', 'Pinacoteca architectural details and living gallery'),
        text: [
          'Exposed brick and iron beams stay visible throughout — architecture part of the exhibition, not a neutral container. The building watches back as much as anything hanging on the walls.',
        ],
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: img('gallery4', 'Pinacoteca building and photography exhibition'),
        text: [
          'Light enters through high windows and leaves half the room in shadow. Photography here feels held in place — moments paused while the brick absorbs sound around them.',
        ],
      },
      {
        type: 'wide-image',
        image: img('fountainFourNanas', 'The Fountain of the Four Nanas'),
      },
      {
        type: 'prose',
        text: [
          'Outside, Niki de Saint Phalle\'s figures sit where the city meets water — bold colour against grey concrete, public art that does not wait for a ticketed room.',
        ],
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    title: 'Art in public space',
    subtitle: 'Sculpture and colour without a ticketed room',
    align: 'center',
    location: 'Across São Paulo',
    segments: [
      {
        type: 'prose',
        text: [
          'Not everything waits behind a door. São Paulo treats the open city as another kind of gallery — encountered between errands, without ceremony or barrier.',
        ],
      },
      {
        type: 'wide-image',
        image: img('aretuzaSculpture', 'Aretuza Sculpture'),
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: img('popArtPainting', 'Pop art painting'),
        text: [
          'Figurative work in the open city sits without ceremony — encountered on the way to something else until repetition turns it into a landmark. Pop colour on an exterior wall reads like ordinary furniture rather than exception.',
        ],
      },
      {
        type: 'wide-image',
        image: img('figurativeGallery', 'Figurative gallery'),
      },
    ],
  },
  doThisAgainBlock(
    "We'd move between galleries on foot and leave before we'd finished. MASP from above, Pinacoteca in softer light, public work wherever the route crossed the street — we'd let the city stitch the collections together rather than treating each as a separate appointment.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'How we moved between them',
    text: 'We crossed under MASP, drifted the main floor without finishing, descended for the quieter collection, then crossed to Pinacoteca when the light turned soft — with public work surfacing wherever the route crossed the street.',
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
      skipHero={hasArtGalleriesStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Galleries', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'In São Paulo, galleries are entered on purpose — pauses between other parts of the day, not destinations that define the whole itinerary.',
        ],
      }}
      bridgeQuote="They remain part of the city's interior rhythm - present, but not always entered."
      reflectiveClose="São Paulo's galleries don't ask to be sought out. They simply remain available - part of the city's quieter interior."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Carnival', path: '/brazil/saopaulo/carnival' }}
    />
  );
}

export default ArtGalleries;
