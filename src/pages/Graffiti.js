import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import muralImages from "../assets/artImages/slices/category/murals.json";
import { makeImgResolver } from "../utils/artImageResolver";
import { muralsHeroConfig } from "./brazil/saopaulo/murals.hero.config";

const muralCatalog = muralImages;
const img = makeImgResolver(muralCatalog);

const locationData = {
  name: 'Street Murals',
  seo: {
    title: 'Street Murals — São Paulo | Nomad Scribbles',
    description: "São Paulo's walls as part of the city's movement and surface.",
  },
  coords: null,
  spatialContext: 'Vila Madalena, Beco do Batman, and the concrete between — where paint lives inside daily movement.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo\'s murals are not framed for visitors. They sit in crossings, stairways, and underpasses — encountered in passing until repetition turns colour into familiarity.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Start in Vila Madalena',
    text: 'Walls rarely stay blank here — paint fades and returns over itself. Walk without a fixed route; the neighbourhood rewards drift more than a checklist of famous corners.',
    location: 'Vila Madalena',
    image: img('blueLionMural', 'Blue Lion mural'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Look up before you look ahead',
    text: 'Some of the strongest work sits above eye level — fragments cut by buildings, visible only when you pause mid-crossing. Phones down for a block; the frame changes completely.',
    location: 'Side streets off Paulista',
    image: img('graffiti8', 'Jerry Batista mural above the street'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Read the layers',
    text: 'Stickers, tags, and full murals stack without a clear starting point. The same wall read from different angles reveals different histories — none of them complete.',
    location: 'Dense mural corridors',
    image: img('graffiti7', 'Sticker and slap collage on a wall'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Respect what is still being made',
    text: 'Fresh paint and public work share the same surfaces. Give space to artists when you see work in progress — the street is both gallery and workshop.',
    location: 'Active mural sites',
    image: img('monaLisaMosaic', 'Mona Lisa mosaic'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Surfaces in motion.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Beco do Batman',
    text: [
      'The alley compresses colour into a corridor — every surface claimed, nothing left neutral, yet the lane still feels like a neighbourhood shortcut rather than a theme park.',
      'We kept returning at different hours: morning quiet, afternoon foot traffic, evening when the walls held the last light.',
    ],
    image: img('graffiti2', "Beco do Batman alley"),
    location: 'Vila Madalena',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Ninety-four steps of colour',
    text: 'The Escadaria do Pátio turns a commute into a slow climb — each step another layer, the city rising with you rather than opening in one panoramic view.',
    image: img('vilaMadalenaStaircase', 'Vila Madalena painted staircase'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'History in tesserae',
    text: 'The Mona Lisa rendered in mosaic — art history borrowed and remade on a wall that still belongs to the street.',
    image: img('monaLisaMosaic', 'Mona Lisa mosaic'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our mural drift',
    subtitle: 'Alley → crossing → staircase',
    text: 'We walked without finishing: Beco do Batman first while the light was flat, then out through crossings where fragments appeared above eye level, ending wherever a painted staircase pulled us upward.',
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
      heroPageData={{ title: 'Street Murals', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'Paint appears, fades, and returns again. Colour spreads across walls, underpasses, stairways, and long stretches of concrete.',
          'Nothing marks where one begins or ends. They sit directly inside the movement of the city.',
        ],
      }}
      rhythmInserts={[
        'Most of it is encountered in passing — through windows, crossings, and gaps between buildings.',
        'Familiarity builds through repetition rather than attention.',
      ]}
      narratives={[
        {
          image: img('graffiti1', 'Street mural in Vila Madalena'),
          heading: 'Walls Across the City',
          paragraph: 'Walls across São Paulo rarely stay blank. Paint appears, fades, and returns again — sometimes over itself, sometimes alongside what was already there. It sits in the movement of the city rather than apart from it.',
        },
        {
          image: img('graffiti3', 'Meu Herói, Esperança mural above the street'),
          heading: 'Above Eye Level',
          paragraph: 'Some images sit above eye level. From the street, only fragments are visible. Buildings cut the frame. People pass underneath without stopping.',
        },
        {
          image: img('graffiti4', 'The Beagles mural on a layered wall'),
          heading: 'Layered Surfaces',
          paragraph: 'In some areas, walls are fully covered. Layers sit over one another without a clear starting point. The same surfaces are passed from different directions, each revealing something slightly different.',
        },
        {
          image: img('graffiti6', 'A Lenda do Brasil mural in public space'),
          heading: 'Made in Public',
          paragraph: 'Some of what is passed here is made with the same care as other forms of public work elsewhere. It remains on the surface where it was painted, without being separated from the street or given a different position within it.',
        },
        {
          image: img('graffiti9', 'Joker mural by Milenna Saraiva'),
          heading: 'Scale on the Wall',
          paragraph: 'Some murals insist on size — faces and colour large enough to change the temperature of a crossing. They are not background; they set the terms of the street.',
        },
        {
          image: img('mysticHummingbird', 'The Mystic Hummingbird of Boleta'),
          heading: 'Myth on the Wall',
          paragraph: 'Totemic birds and figures arrive at street scale — myth made visible in passing, then folded back into the neighbourhood when you move on.',
        },
        {
          image: img('sealifeArtwork', 'Sealife artwork mural'),
          heading: 'Ocean Imagery in the Open',
          paragraph: 'Marine life painted where the city expects concrete — humour and colour held on a wall that still belongs to daily movement.',
        },
      ]}
      bridgeQuote="Surfaces continue to change without drawing attention to themselves."
      reflectiveClose="New work appears where older images remain partially visible. Some sections fade, others are replaced — but the wall continues to hold everything at once."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Art & Galleries', path: '/brazil/saopaulo/art-galleries' }}
    />
  );
}

export default Graffiti;
