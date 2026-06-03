import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import muralImages from "../assets/artImages/slices/category/murals.json";
import carnivalImages from "../assets/artImages/slices/category/carnival.json";
import { makeImgResolver } from "../utils/artImageResolver";
import { muralsHeroConfig } from "./brazil/saopaulo/murals.hero.config";

const img = makeImgResolver(muralImages);
const carnivalImg = makeImgResolver(carnivalImages);

const locationData = {
  name: 'Street Art',
  seo: {
    title: 'São Paulo Street Art Guide: Murals, Beco do Batman & Urban Culture',
    description: "São Paulo's walls as part of the city's movement and surface.",
  },
  coords: null,
  spatialContext: 'Beco do Batman and Vila Madalena — painted walls and live music in the same streets — then murals across the city without a single neighbourhood name.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo\'s murals are not framed for visitors. They sit in crossings, stairways, and underpasses — encountered in passing until repetition turns colour into familiarity.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across the journey',
    title: 'Nashville',
    tagline: 'Urban colour has cousins elsewhere — neon, songwriter corners, and night rhythm in Music City.',
    path: '/united-states/tennessee/nashville',
    image: 'United States/Tennessee/Nashville/Small/Broadway Neon',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    title: 'Beco do Batman',
    subtitle: 'Vila Madalena — an open-air gallery that never stops changing',
    align: 'center',
    location: 'Between Rua Gonçalo Afonso & Rua Medeiros de Albuquerque, Vila Madalena',
    link: {
      href: 'https://www.gazetasp.com.br/cotidiano/memoria-saiba-como-uma-rua-estreita-de-sp-se-tornou-o-beco-do-batman/1119635/',
      label: 'Find out more about the history of this alley — Gazeta de São Paulo',
    },
    caption:
      'The lane went pedestrian-only in the 2010s, with night lighting added as tourism grew — but the walls remain a working surface, repainted by artists and maintained by the neighbourhood rather than preserved as a museum.',
    segments: [
      {
        type: 'wide-image',
        height: 'tall',
        image: img('graffiti2', 'Beco do Batman alley'),
      },
      {
        type: 'prose',
        text: [
          'Long before the nickname stuck, the passage between Rua Gonçalo Afonso and Rua Medeiros de Albuquerque was an ordinary dark viela in bohemian Vila Madalena — a neighbourhood USP students began filling in the 1970s when university housing closed and cheap rentals opened west of the centre.',
          'In the early 1980s someone stencilled Batman on a wall. Nobody agrees on who painted it, and the original piece vanished years ago. The name stayed anyway — and artists kept arriving.',
        ],
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: img('graffiti1', 'Street mural in Vila Madalena'),
        text: [
          'Among the first to treat the walls seriously were Alex Vallauri — an Ethiopian-born artist who settled in São Paulo — and Zé Carratu with the Tupinãodá collective, often cited as Brazil\'s earliest urban-art group. Cubist and psychedelic work began layering over industrial surfaces in a district already shaped by student life and small workshops.',
        ],
      },
      {
        type: 'pair',
        images: [
          img('graffiti4', 'The Beagles mural'),
          img('graffiti9', 'Joker mural by Milenna Saraiva'),
        ],
      },
      {
        type: 'prose',
        text: [
          'By the 1990s the alley had become contested ground: every surface repainted, stickers slapped over murals, new work arriving before the last layer dried. What began as a local experiment turned into one of Brazil\'s best-known street-art references — not because any single piece stayed, but because the wall never emptied.',
          'When we walked it, the lane still felt like a shortcut first and a gallery second. A joker face and Jerry Batista\'s work sat beside sticker stacks and a Mona Lisa in tesserae — density without a clear starting point, the same surfaces read differently depending on which direction you entered.',
        ],
      },
      {
        type: 'cluster',
        spans: [5, 4, 3],
        images: [
          img('graffiti8', 'Jerry Batista mural'),
          img('graffiti7', 'Sticker and slap collage'),
          img('monaLisaMosaic', 'Mona Lisa mosaic'),
        ],
      },
      {
        type: 'float',
        side: 'left',
        size: 'lg',
        tall: true,
        image: img('graffiti5', 'Escadaria do Pátio staircase'),
        text: [
          'The same neighbourhood rhythm continues beyond the alley. The Escadaria do Pátio — ninety-four painted steps, often called the Escadaria do Beco — turns a daily commute into a slow climb. Colour rises with foot traffic rather than opening in one panoramic view.',
        ],
      },
      {
        type: 'wide-image',
        image: img('vilaMadalenaStaircase', 'Vila Madalena painted staircase'),
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    title: 'Entertainment among the walls',
    subtitle: 'Live music in the same painted streets',
    align: 'center',
    location: 'Vila Madalena',
    internalLink: {
      path: '/brazil/saopaulo/carnival',
      label: 'Our São Paulo Carnival page →',
      variant: 'inline',
    },
    segments: [
      {
        type: 'prose',
        text: [
          'Vila Madalena is not only a place to look at walls. The same alleys absorb percussion year-round — live music on weeknights, drums in side streets, crowds pulled in without a schedule or a ticket.',
          'Painted surfaces sit in the background while brass and rhythm move through them; the walls stay long after the sound has moved on.',
        ],
      },
      {
        type: 'wide-image',
        image: carnivalImg('carnival14', 'Street party in Beco do Batman'),
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: carnivalImg('liveMusicVilaMadalena', 'Live music in Vila Madalena'),
        text: [
          'Most evenings the neighbourhood finds its rhythm without announcement — sound drifting from a bar front, a plastic chair offered mid-song, the night extending on its own terms. The murals you came to photograph stay on the wall while the street fills for another reason entirely.',
        ],
      },
      {
        type: 'pair',
        images: [
          carnivalImg('carnival11', 'Street drummers in Vila Madalena'),
          carnivalImg('carnival13', 'Hands on the drum against a painted wall'),
        ],
      },
      {
        type: 'prose',
        text: [
          'Trombones cut through layered percussion shoulder-to-shoulder with the crowd; mallets strike worn skins with flaking paint behind them. The alley does not pause for the music — it moves through as if the murals were always part of the arrangement.',
          'Once a year, during Carnival, that same rhythm peaks — the streets louder, the crowds denser, the walls still there underneath.',
        ],
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'grouped-section',
    title: 'Across the city',
    subtitle: 'Murals found without a district name attached',
    align: 'center',
    entries: [
      {
        title: 'Walls in motion',
        imageFit: 'natural',
        text: [
          'Outside Vila Madalena, murals appear wherever the city leaves a flat surface — crossings, building faces, underpasses — without announcing themselves as a destination.',
          'Some sit above eye level, visible only in fragments where buildings cut the frame — Meu Herói, Esperança among them. A blue lion watches from another neighbourhood; marine life climbs a facade where you expect concrete. Nothing is separated from the street — you encounter it between errands, through windows, at the pace of foot traffic.',
        ],
        image: img('blueLionMural', 'Blue Lion mural'),
        images: [
          img('graffiti3', 'Meu Herói, Esperança mural'),
          img('sealifeArtwork', 'Sealife artwork mural'),
          img('graffiti6', 'A Lenda do Brasil mural'),
        ],
        location: 'Across São Paulo',
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'How we walked it',
    text: 'We started in Vila Madalena while the light was flat — Beco do Batman, then the painted staircases — and let the rest of the city surface wherever we crossed next. No route finished; the walls kept changing between visits.',
  },
];

function Graffiti() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={muralsHeroConfig}
      heroPageData={{ title: 'Street Art', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'Paint appears, fades, and returns again. Colour spreads across walls, underpasses, stairways, and long stretches of concrete.',
          'Nothing marks where one begins or ends. They sit directly inside the movement of the city.',
        ],
      }}
      bridgeQuote="Surfaces continue to change without drawing attention to themselves."
      reflectiveClose="New work appears where older images remain partially visible. Some sections fade, others are replaced — but the wall continues to hold everything at once."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Galleries', path: '/brazil/saopaulo/galleries' }}
    />
  );
}

export default Graffiti;
