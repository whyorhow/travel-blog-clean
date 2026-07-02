import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import santosImages from "../assets/artImages/slices/category/santos.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { santosHeroConfig } from './brazil/santos/santos.hero.config';
import { hasSantosStaticHero, isMobileViewport } from '../utils/staticPageHero';

const img = (id, alt) => {
  const entry = santosImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const GALLERY_ORDER = ['santos1', 'santos2', 'santos3', 'santos4', 'santos5', 'santos6', 'santos7'];

const galleryImages = GALLERY_ORDER
  .map(id => santosImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'santos',
    energy: 'low',
  }));

const locationData = {
  name: 'Santos',
  seo: {
    title: SEO_TITLES["/brazil/santos"],
    description: 'Santos isn\'t a city people discover by accident. It offers air, space, and a slower rhythm — without ever trying to impress.',
  },
  coords: destinations.find(d => d.id === 'santos'),
  spatialContext: 'On the São Paulo coast — the port city where Brazil\'s coffee fortune shipped out, and where Pelé played.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'The orla stretches low against the Atlantic — promenade, port cranes, and hills climbing behind the waterfront.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'São Paulo',
    tagline: 'Inland from the coast — the megacity whose neighbourhoods shift character long before they connect.',
    path: '/brazil/saopaulo',
    image: 'Brazil/Sao Paulo/Landing/small/street',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Let the beachfront set the pace',
    text: 'For many Paulistanos this coastline is where the city\'s pressure loosens. You do not need a plan — walk until the air feels different, then stop.',
    location: 'Orla marítima',
    image: img('santos7', 'Santos skyline from above'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Follow the reclaimed corners',
    text: 'Older buildings half-taken by vines are not ruins here — they are lived with. Wander the streets behind the main drag where paint fades without apology.',
    location: 'Centro histórico',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Pelé is everywhere, announced nowhere',
    text: 'The museum is worth an hour, but the murals and casual references in conversation matter more. Football here is memory, not a ticketed experience.',
    location: 'Santos',
  },
  doThisAgainBlock(
    "We'd walk the beachfront until the air felt different from São Paulo's. No plan — just movement along the orla until the pace of the coast replaced whatever urgency we'd carried inland.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The hills above the beach',
    text: [
      'Beyond the waterfront, roads climb into green hills where houses turn toward breeze rather than view.',
      'These quieter edges feel like the city expanding carefully — less spectacle, more room to breathe.',
    ],
    image: img('santos4', 'Green hills overlooking Santos'),
    location: 'Monte Serrat area',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Layers of the city',
    text: 'Nature and architecture pressed together — not as contrast but as one continuous surface. Santos carries its age openly, and the drawn lines only make that feel more true.',
    image: img('santos6', 'Nature and architecture intertwined in Santos'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our default stroll',
    subtitle: 'Beachfront → centro → orla again',
    text: 'We walked the same stretch more than once without trying to see everything. Santos rewards repetition — the light changes, the pace stays slow.',
  },
];

export default function Santos() {
  return (
    <LightTemplate
      variant="coastal"
      atmosphere="brazil"
      skipHero={hasSantosStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={santosHeroConfig}
      heroPageData={{ title: 'Santos', subtitle: 'Port City of Legends' }}
      intro={{
        paragraphs: [
          'An hour from São Paulo, the air changes on the orla — salt, open horizon, and a skyline kept low by the port and the hills behind it.',
          'Paint fades on older façades. Vines press through brick where no one has rushed to repair. Clouds gather and break quickly, changing the light on the beachfront without ceremony.',
        ],
      }}
      rhythmInserts={[
        'Coffee on the promenade before the heat builds. Football murmurs from Vila Belmiro on match days.',
        'Pelé\'s murals appear without announcement — memory folded into ordinary streets.',
      ]}
      narratives={[
        {
          image: img('santos1', 'The Santos beachfront facing the Atlantic'),
          heading: 'Facing the Atlantic',
          paragraph: 'For many Paulistanos, this coastline isn\'t a destination — it\'s where the city\'s pressure loosens. You come here to breathe differently. Beyond the beachfront, roads climb gently into green hills. Houses turn toward breeze rather than view. The promenade stays wide and unhurried.',
        },
        {
          image: img('santos5', 'Where time softens things in Santos'),
          heading: 'Where Time Softens Things',
          paragraph: 'Older buildings sit half-reclaimed by trees and vines. Paint fades. Brick opens. Roots press through stone. Nothing feels abandoned — only unhurried.',
        },
        {
          image: img('santos2', 'Football as inheritance in Santos'),
          heading: 'Football as Inheritance',
          paragraph: 'Pelé\'s presence in Santos isn\'t monumental — assumed in murals, museum visits, and casual references in conversation. Football here is folded into daily life rather than staged for visitors.',
        },
        {
          image: img('santos3', 'Vila Belmiro — still in use'),
          heading: 'Vila Belmiro, Still in Use',
          paragraph: 'Vila Belmiro doesn\'t preserve history behind glass. Matches continue. Seats fill and empty. Pelé\'s 1,000th goal lives in conversation rather than ceremony — the stadium still active on match days.',
        },
      ]}
      bridgeQuote="Vila Belmiro still hosts matches. The orla we walked twice in the same week looked different each time — light, tide, and the same low skyline."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Wet sand on the promenade, Pelé on a wall we passed without stopping, coffee cooling while the port worked in the distance."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Rio de Janeiro', path: '/brazil/rio' }}
    />
  );
}
