import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { DenseTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import destinations from "../assets/destinations.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import saoPauloArt from "../assets/artImages/slices/bundles/saopaulo.json";
import { makeImgResolver } from "../utils/artImageResolver";
import SaoPauloJournalMap from "../components/SaoPauloJournalMap";
import { hasSaoPauloStaticHero, isMobileViewport } from "../utils/staticPageHero";

import galleryBg from "../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp";

const saoPauloCatalog = saoPauloArt;

const SAO_PAULO_HERO_ID = "Brazil/Sao Paulo/Landing/SaoPaulo-Hero";
/** Bump when re-uploading hero to Cloudinary (pins delivery URL, avoids stale CDN cache). */
const SAO_PAULO_HERO_VERSION = 1779120039;
const SAO_PAULO_HERO_ADDITIONAL_ID = "Brazil/Sao Paulo/Landing/SaoPaulo-Hero-Additional";
const SAO_PAULO_HERO_ADDITIONAL_VERSION = 1779176021;
const SAO_PAULO_HERO_TEXT_FOCUS_ID = "Brazil/Sao Paulo/Landing/SaoPaulo-Hero-Additional2";
const SAO_PAULO_HERO_TEXT_FOCUS_VERSION = 1779290641;
const SAO_PAULO_HERO_WIDTHS = [400, 600, 900, 1200, 1600, 2400];
const SAO_PAULO_HERO_LCP_WIDTH = 600;
const SAO_PAULO_HERO_SIZES = "(max-width: 767px) 100vw, (max-width: 1200px) 90vw, 1200px";

const saoPauloHeroUrl = (width) =>
  cloudinaryImageUrl(SAO_PAULO_HERO_ID, {
    width,
    version: SAO_PAULO_HERO_VERSION,
  });

const SAO_PAULO_HERO_ALT = "São Paulo handwritten journal entry";
const SAO_PAULO_HERO_LIGHTBOX_ALT = "São Paulo handwritten journal entry, full spread";
const SAO_PAULO_HERO_TEXT_FOCUS_ALT = "São Paulo journal text, straight-on view";
/** Sampled from bright journal paper in SaoPaulo-Hero-Additional2 */
const SAO_PAULO_HERO_TEXT_FOCUS_BACKGROUND = '#EDF0F2';

const img = makeImgResolver(saoPauloCatalog);

const caipirinhaImage = img('caipirinha', 'Caipirinha — a pause in the city');
const caipirinhaSketchImage = img('caipirinhaSketch', 'Sketch of a caipirinha in the city');
const caipirinhaWithSketchLightbox = caipirinhaImage
  ? {
      ...caipirinhaImage,
      lightboxSrc: caipirinhaSketchImage?.lightboxSrc ?? caipirinhaSketchImage?.src,
      lightboxAlt: caipirinhaSketchImage?.alt,
    }
  : null;

const stableHash = (str) => [...String(str || '')].reduce((a, c) => a + c.charCodeAt(0), 0);

const galleryImages = saoPauloCatalog
  .map(img => {
    let sizeClass = 'small';
    let isAnchor = false;
    let contextLine = null;

    if (img.category === 'ArtGallery' || img.category === 'Art & Culture') {
      sizeClass = 'large';
      isAnchor = img.title.toLowerCase().includes('cathedral') || img.title.toLowerCase().includes('museum');
      contextLine = "Works are often experienced in suspension, not on walls.";
    } else if (img.category === 'City Life') {
      sizeClass = 'wide';
      contextLine = "The city keeps moving — these pauses sit inside it, not apart from it.";
    } else if (img.category === 'Carnival') {
      sizeClass = 'tall';
      contextLine = "A year of preparation compressed into a single night.";
    } else if (img.category === 'Murals') {
      sizeClass = 'wide';
      contextLine = "Street art here doesn't stay within boundaries.";
    } else if (img.category === 'Parks') {
      sizeClass = stableHash(img.id) % 3 === 0 ? 'large' : 'small';
      contextLine = "Green space is threaded through the city rather than set apart from it.";
    }

    return {
      src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
      image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
      fallbackSrc: cloudinaryImageUrl(img.cloudinary.blog, { width: 800 }),
      alt: img.title,
      imageId: img.cloudinary.gallery,
      cloudinary: img.cloudinary,
      title: img.title,
      description: img.description,
      category: img.category,
      gumroadLink: img.gumroadLink,
      shopLink: img.shopLink,
      storyLink: img.storyLink,
      sizeClass,
      isAnchor,
      theme: img.category || 'general',
      energy: img.category === 'Carnival' ? 'high' : img.category === 'Parks' ? 'low' : 'medium',
      contextLine
    };
  });

const locationData = {
  name: 'São Paulo',
  seo: {
    title: SEO_TITLES["/brazil/saopaulo"],
    description: 'Fragments of São Paulo - parks, art, carnival, and the spaces in between.'
  },
  coords: destinations.find(d => d.id === 'saopaulo'),
  spatialContext: 'The distances between places are rarely as short as they look. Neighbourhoods shift character long before they connect physically.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Liberdade at street level, Morumbi rising from the neighbourhood, graffiti corridors beside office towers — neighbourhoods that feel like different cities long before they connect on a map.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'link-banner',
    title: 'Food & Drink',
    tagline: 'Late-night pizza is only one chapter — markets, bars, and tables across the city.',
    path: '/brazil/food-drink',
    image: 'Brazil/Food-Drink/Small/Camarão à Paulista',
    eyebrow: 'Also in Brazil',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'link-banner',
    eyebrow: 'Across the journey',
    title: 'Antwerp',
    tagline: 'Another city read through façades, food, and side streets rather than landmarks.',
    path: '/belgium/antwerp',
    image: 'Belgium/Antwerp/Full/Grote Markt',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'local-tip',
    title: 'Let rain reset the pace',
    text: 'Sudden downpours reshape the street for a few minutes — umbrellas, steam, reflections. It is still the megacity, but urgency loosens just enough to notice again.',
    location: 'Centro / Paulista',
    image: img('rain', 'Rain on São Paulo streets'),
  },
  doThisAgainBlock(
    "We'd let the neighbourhood shift character before deciding we understood the city. A sudden rain would reset the pace for a few minutes — umbrellas, steam, reflections — and we'd notice something new in streets we thought we'd already read.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    anchorId: 'saopaulo-favourites',
    title: 'A pause in the noise',
    text: [
      'A caipirinha on a loud evening — ice, lime, and conversation competing with traffic. We kept returning to the same rhythm: eat late, pause, then let the evening continue.',
    ],
    image: caipirinhaWithSketchLightbox,
    location: 'Bars across the city',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    anchorId: 'estacao-da-luz',
    title: 'Estação da Luz at rush hour',
    text: [
      'The iron and glass station holds the century in its frame — commuters pass through without ceremony, but the building still reads as arrival.',
      'We kept crossing here between neighbourhoods, using the architecture as a fixed point in a city that rarely offers one.',
    ],
    image: img('estacaoDaLuz', 'Estação da Luz railway station'),
    internalLink: {
      path: '/brazil/saopaulo/galleries',
      label: 'Pinacoteca is across the road — Art & Galleries',
    },
    location: 'Centro',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'grouped-section',
    title: 'Faith & Religion',
    subtitle: 'Temple, congado altar, and roadside shrine — devotion wears different faces in the same city.',
    align: 'center',
    entries: [
      {
        title: 'Zu Lai at a different pace',
        text: [
          'The grand hall and courtyard slow the visit — carved wood, incense, and open paving replacing the white cube without losing seriousness.',
          'Lanterns and footsteps set the rhythm. The temple opens slowly, offering pause without asking to become the whole day.',
          'A lacquer-red bridge marks the passage between courtyard and hall — the pace slowing before you have decided to pause.',
        ],
        image: img('grandHallZuLai', 'Grand Hall of the Zu Lai Temple'),
        images: [
          img('oGrandePatio', 'O Grande Pátio do Templo Zu Lai'),
          img('redBridgeZuLai', 'The Red Bridge at Zu Lai Temple'),
        ],
        location: 'Zu Lai Temple',
      },
      {
        title: 'Congado — offerings at the church altar',
        tone: 'memory',
        text: 'The Congá altar holds offerings without spectacle — syncretism made visible in cloth, flame, and careful placement.',
        caption:
          'Congado is among Brazil\'s oldest Afro-Brazilian traditions: Catholic feast days for Our Lady of the Rosary and black saints, carried since the seventeenth century through drums, processions, and altars that still hold West Central African spiritual memory. Wax, cloth, seeds, and rosaries share the same surface — devotion that never fully separated from its roots.',
        link: {
          href: 'https://comunidadedorosariodapenha.com.br/',
          label: 'Comunidade do Rosário da Penha — congadas & irmandades',
        },
        image: img('theCongaAltar', 'The Congá — a sacred altar'),
        location: 'Congado tradition — São Paulo',
      },
      {
        title: 'Faith at the roadside',
        tone: 'memory',
        text: 'A shrine placed where traffic and footfall cross — devotion embedded in the city without needing a building to announce it.',
        image: img('religiousShrine', 'Religious shrine'),
        location: 'Along the route',
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Football as background',
    subtitle: 'In Brazil, football counts as another kind of religion.',
    text: 'Morumbi rises from the neighbourhood like a second skyline — on match days the whole district fills with the same foot traffic.',
    caption:
      'São Paulo\'s Paulista derby against Corinthians is one of the fiercest rivalries in Brazilian football — Palmeiras and Santos complete the state\'s "big four." For years, away supporters have been barred from many of these fixtures after violence involving organised fan groups, leaving some derbies played to a home crowd only.',
    link: {
      href: 'https://newsletters.brazilian.report/p/sao-paulo-football-fan-ban',
      label: 'São Paulo\'s home-fans-only derby policy — The Brazilian Report',
    },
    image: img('morumbiStadium', 'Morumbi Stadium'),
    location: 'Morumbi — São Paulo FC',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'walking-route',
    title: 'We did not try to finish São Paulo.',
    text: [
      'We moved through it instead — parks for breath, murals for colour, galleries for pause, carnival for release.',
      'Different registers of the same city, each worth a return visit.',
    ],
  },
];

function SaoPaulo() {
  return (
    <DenseTemplate
      variant="megacity"
      atmosphere="brazil"
      skipHero={hasSaoPauloStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      journalMap={<SaoPauloJournalMap />}
      introSectionId="saopaulo-intro"
      narrativeSectionId="saopaulo-pizza"
      exploreSectionId="saopaulo-explore"
      showContextMap={false}
      heroImage={{
        src: saoPauloHeroUrl(SAO_PAULO_HERO_LCP_WIDTH),
        preloadSrc: saoPauloHeroUrl(SAO_PAULO_HERO_LCP_WIDTH),
        srcSet: SAO_PAULO_HERO_WIDTHS.map((w) => `${saoPauloHeroUrl(w)} ${w}w`).join(", "),
        sizes: SAO_PAULO_HERO_SIZES,
        width: 1200,
        height: 900,
        lightboxSrc: cloudinaryImageUrl(SAO_PAULO_HERO_ADDITIONAL_ID, {
          width: 4261,
          version: SAO_PAULO_HERO_ADDITIONAL_VERSION,
        }),
        textFocusSrc: cloudinaryImageUrl(SAO_PAULO_HERO_TEXT_FOCUS_ID, {
          width: 1433,
          version: SAO_PAULO_HERO_TEXT_FOCUS_VERSION,
        }),
        textFocusHotspot: { left: 0.03, top: 0.08, width: 0.52, height: 0.84 },
        alt: SAO_PAULO_HERO_ALT,
        lightboxAlt: SAO_PAULO_HERO_LIGHTBOX_ALT,
        textFocusAlt: SAO_PAULO_HERO_TEXT_FOCUS_ALT,
        textFocusBackground: SAO_PAULO_HERO_TEXT_FOCUS_BACKGROUND,
        objectPosition: 'left center',
      }}
      intro={{
        paragraphs: [
          'São Paulo is vast — twelve million people spread across a plateau between river valleys and the Serra do Mar.',
          'Liberdade reads Japanese at street level; Centro still carries nineteenth-century façades; Paulista cuts through with glass towers above the tree line.',
          'Dinner rarely marks the end of anything. The city stretches evenings further than we expected — pizza after midnight, caipirinhas that arrive beside noise rather than instead of it.',
          'Many people we met had built careers, families, and routines here without treating the city as a stop on the way somewhere else.'
        ],
        snapshot: "São Paulo is the largest city in Brazil, but that doesn't explain it. Neighbourhoods shift character long before they connect physically on a map."
      }}
      sidebarImage={{
        src: 'Brazil/Sao Paulo/Landing/small/Street2',
        alt: 'Liberdade street level view in São Paulo',
        caption: 'Liberdade is experienced at street level. It also holds the largest Japanese community outside Japan.'
      }}
      rhythmText="Dinner rarely marks the end of anything here. The city tends to stretch its evenings further than expected."
      narrative={{
        eyebrow: 'Food & ritual',
        headingStyle: 'handwriting',
        image: { src: 'Brazil/Sao Paulo/Landing/small/pizza', alt: 'Pizza São Paulo' },
        heading: 'A Quiet Religion',
        paragraph: "Pizza in São Paulo is eaten late — thin bases, soft centres, one shared plate per table. Every neighbourhood claims its version; we sat down without treating it as a special occasion."
      }}
      bridgeQuote="Parks for breath, murals for colour, galleries for pause, carnival for release — each section leads somewhere deeper in the same city."
      sections={[
        {
          title: 'Green Spaces',
          path: '/brazil/saopaulo/green-spaces',
          image: 'Brazil/Sao Paulo/Green Spaces/small/Park1',
          imageAlt: 'Ibirapuera park, São Paulo',
        },
        {
          title: 'Street Art',
          path: '/brazil/saopaulo/street-art',
          image: 'Brazil/Sao Paulo/Street Art/small/Blue Lion Mural',
          imageAlt: 'Blue Lion mural, São Paulo',
        },
        {
          title: 'Galleries',
          path: '/brazil/saopaulo/galleries',
          image: 'Brazil/Sao Paulo/Galleries/small/ArtGallery1',
          imageAlt: 'MASP above Avenida Paulista',
        },
        {
          title: 'Carnival',
          path: '/brazil/saopaulo/carnival',
          image: 'Brazil/Sao Paulo/Carnival/small/Carnival2',
          imageAlt: 'Grupo Especial at the Sambódromo',
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Estação da Luz at rush hour, ipê gold above Ibirapuera, pizza shared after midnight — fragments we kept finding on return visits."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{
        eyebrow: 'Next stop',
        label: 'Florianópolis',
        path: '/brazil/florianopolis',
        tagline: 'Campeche wide, Hercílio Luz at dusk, beaches Brazilians return to each summer.',
        image: 'Brazil/Floripa/small/Floripa18.webp',
      }}
    />
  );
}

export default SaoPaulo;
