import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import carnivalImages from "../assets/artImages/slices/category/carnival.json";
import { makeImgResolver } from "../utils/artImageResolver";
import { carnivalHeroConfig } from "./brazil/saopaulo/carnival.hero.config";

const img = makeImgResolver(carnivalImages);

const locationData = {
  name: 'Carnival',
  seo: {
    title: SEO_TITLES["/brazil/saopaulo/carnival"],
    description: 'Carnival as structured procession and open street movement.',
  },
  coords: null,
  spatialContext: 'Blocos in alleys and parks first — then the Sambódromo do Anhembi and Grupo Especial under the stands.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo Carnival forms, dissolves, and forms again elsewhere — procession in one register, percussion in another. Neither version is the whole story; the city holds both at once.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Rio de Janeiro',
    tagline: 'Carnival at a different scale — Sambadrome spectacle, beach rhythm, and the city between mountain and sea.',
    path: '/brazil/rio',
    image: 'Brazil/Rio/small/Rio9.webp',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    title: 'Street parties and blocos',
    subtitle: 'Sound finds you between intersections',
    align: 'center',
    location: 'Vila Madalena, parks, and open blocos across the city',
    internalLink: {
      path: '/brazil/saopaulo/street-art',
      label: 'Painted walls and year-round music in Vila Madalena →',
      variant: 'inline',
    },
    segments: [
      {
        type: 'split',
        imageSide: 'right',
        text: [
          'Street Carnival has no single centre. Blocos spill through alleyways and parks — drums arrive first, then everything else follows into their space. There is no stage and no clear edge between players and crowd.',
        ],
        image: img('carnival6', 'Blocos in alleyways and parks'),
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: img('carnival7', 'Alceu Valença bloco'),
        text: [
          'Alceu Valença and the marchinhas turn the street into shared current — edges loosen, form dissolves, and movement follows sound rather than any held line. The route rewrites itself as you drift toward percussion.',
        ],
      },
      {
        type: 'float',
        side: 'left',
        size: 'md',
        image: img('carnival12', 'Surdo — the band heartbeat'),
        text: [
          'Drummers pause and adjust straps while the rhythm carries on around them — the street stays charged even in the gaps, the sound shifting hands rather than stopping.',
        ],
      },
      {
        type: 'pair',
        images: [
          img('rodaDeSamba', 'Roda de samba'),
          img('carnival10', 'Crowds gathering as Carnival builds scale'),
        ],
      },
      {
        type: 'prose',
        text: [
          'A roda de samba tightens the pavement into shared rhythm — percussion, voice, and bodies in a circle anyone can enter without ceremony. At peak density, sound and presence merge into one field; even when it loosens at the edges, the pulse rarely stops completely.',
          'When the crowd thickens, hydration and exit routes matter — ride the peak, then step one block sideways. In Vila Madalena the same neighbourhoods hold painted walls and live music year-round — Carnival just turns the volume up.',
        ],
      },
      {
        type: 'calendar',
        title: 'Street Carnival calendar',
        intro:
          'Each year the Prefeitura publishes a live schedule in three windows — pré, the four-day holiday, and pós. Blocos parade mainly mornings and afternoons, usually finishing by 18h. Dates move with the calendar; use the official site for this year’s days, routes, and times.',
        entries: [
          {
            phase: 'Pré-Carnaval',
            timing: 'Weekend before the official holiday',
            detail: 'Often the densest days — many blocos parade only once.',
          },
          {
            phase: 'Carnaval',
            timing: 'Saturday–Tuesday of the official holiday',
            detail: 'Hundreds of registered blocos across 30+ neighbourhoods.',
          },
          {
            phase: 'Pós-Carnaval',
            timing: 'Weekend after Ash Wednesday',
            detail: 'A second wind for blocos that save one parade for latecomers.',
          },
        ],
        link: {
          href: 'https://www.carnavalsp.com/',
          label: 'Live street Carnival calendar — carnavalsp.com',
        },
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'woven-section',
    title: 'The Sambódromo extravaganza',
    subtitle: 'Grupo Especial at Anhembi',
    align: 'center',
    location: 'Sambódromo do Anhembi',
    segments: [
      {
        type: 'wide-image',
        image: img('carnival1', 'Carnival float in the procession'),
      },
      {
        type: 'prose',
        text: [
          'At the Sambódromo do Anhembi, Carnival holds its line. Crowds fill the stands before the first school; the procession unfolds step by step until the avenue becomes continuous flow — shape carried by rhythm rather than direction.',
        ],
      },
      {
        type: 'float',
        side: 'right',
        size: 'md',
        image: img('carnival2', 'Grupo Especial at the Sambódromo'),
        text: [
          'Grupo Especial rewards patience before the opening — spectators lean forward in unison when the rhythm shifts. From the stands, spectacle reads as labour and timing as much as colour; the crowd is part of the choreography, not a performance watched from a distance.',
        ],
      },
      {
        type: 'float',
        side: 'left',
        size: 'lg',
        image: img('carnival9', 'Samba in the Sambódromo'),
        text: [
          'Inside the parade avenue, percussion holds its line under the stands — samba echoing along the straight rather than off alley walls. The sound is enclosed but no less immediate; performers and crowd share the same rhythm within the stadium frame.',
        ],
      },
      {
        type: 'pair',
        images: [
          img('carnival3', 'Carnival performers at the Sambódromo'),
          img('carnival4', 'Spectators at the parade'),
        ],
      },
      {
        type: 'prose',
        text: [
          'Each samba school carries its community\'s history in costume and movement — feathers, framework, and hundreds moving as one. Behind the scenes the scale appears in pieces until the full transformation reaches the avenue.',
        ],
      },
      {
        type: 'wide-image',
        image: img('carnival5', 'Samba school formation at the Sambódromo'),
      },
      {
        type: 'prose',
        text: [
          'We kept returning for one school each evening rather than chasing every name on the bill — enough scale to understand the machine without exhausting it. Night deepens; the intensity loosens at the edges, but what stays is the echo of everything that passed through.',
        ],
      },
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'local-tip',
    title: 'Book the Sambódromo early',
    text: 'Grupo Especial tickets for the Anhembi Sambódromo sell through one official platform — often many months ahead, and the main parade nights can sell out. Plan early rather than assuming walk-up availability on the day.',
    location: 'Sambódromo do Anhembi',
    link: {
      href: 'https://www.clubedoingresso.com/',
      label: 'Book São Paulo Carnival tickets — Clube do Ingresso',
      variant: 'inline',
    },
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
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={carnivalHeroConfig}
      heroPageData={{ title: 'Carnival', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'It moves across the city over several days — gathering, following, drifting in and out as it shifts between the Sambódromo and the streets.',
        ],
      }}
      bridgeQuote="The Sambódromo holds one rhythm; the streets hold another — São Paulo keeps both in the same week."
      reflectiveClose="The party continues through the night."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Green Spaces', path: '/brazil/saopaulo/green-spaces' }}
    />
  );
}

export default CarnivalSaoPaulo;
