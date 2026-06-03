import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import santosImages from "../assets/artImages/slices/category/santos.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { santosHeroConfig } from './brazil/santos/santos.hero.config';

const img = (id, alt) => {
  const entry = santosImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const GALLERY_ORDER = Array.from({ length: 11 }, (_, i) => `santos${i + 1}`);

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
    text: 'Santos is a place people return to rather than discover. The sea is always nearby, and the city never seems to need explaining itself.',
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
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Familiar rhythms, not highlights.',
    align: 'center',
  },
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
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={santosHeroConfig}
      heroPageData={{ title: 'Santos', subtitle: 'Port City of Legends' }}
      intro={{
        paragraphs: [
          'Santos is a place people return to rather than discover. Its presence lingers quietly — in softened buildings, familiar streets, and the steady pull of the sea nearby. For many who live close, Santos isn\'t a destination. It\'s a pause, a habit, a remembered rhythm that doesn\'t need explanation.',
          'Santos opens toward the sea. The skyline stays low, shaped by wind and salt rather than ambition. Clouds gather and break quickly, changing the light without ceremony.',
        ],
      }}
      rhythmInserts={[
        'Santos doesn\'t push outward. It settles.',
        'The past doesn\'t interrupt the present here — it moves alongside it.',
      ]}
      narratives={[
        {
          image: img('santos1', 'The Santos beachfront facing the Atlantic'),
          heading: 'Facing the Atlantic',
          paragraph: 'For many Paulistanos, this coastline isn\'t a destination — it\'s where the city\'s pressure loosens. You come here to breathe differently. Beyond the beachfront, roads climb gently into green hills. Houses turn toward breeze rather than view. Santos doesn\'t compete. It waits.',
        },
        {
          image: img('santos5', 'Where time softens things in Santos'),
          heading: 'Where Time Softens Things',
          paragraph: 'Older buildings sit half-reclaimed by trees and vines. Paint fades. Brick opens. Roots press patiently through stone. Nothing feels abandoned — only unhurried. Santos carries its age openly, allowing nature to return where pressure has eased. These corners aren\'t preserved; they\'re lived with.',
        },
        {
          image: img('santos2', 'Football as inheritance in Santos'),
          heading: 'Football as Inheritance',
          paragraph: 'Pelé\'s presence in Santos isn\'t monumental — it\'s assumed. His museum stands quietly, murals appear without announcement, and the stories are told casually, as if everyone already knows them. Football here isn\'t staged for visitors. It\'s folded into daily life, carried forward as memory rather than performance.',
        },
        {
          image: img('santos3', 'Vila Belmiro — still in use'),
          heading: 'Vila Belmiro, Still in Use',
          paragraph: 'Vila Belmiro doesn\'t preserve history behind glass. Matches continue. Seats fill and empty. Pelé\'s 1,000th goal lives in conversation rather than ceremony. The stadium remains active, and that continuity matters more than commemoration. In Santos, the past doesn\'t interrupt the present — it moves alongside it.',
        },
      ]}
      bridgeQuote="Santos doesn't compete for attention. It waits. For those who return — again and again — that familiarity is the point."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="You leave Santos with the quiet satisfaction of somewhere that didn't try to impress you — and did anyway."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Rio de Janeiro', path: '/brazil/rio' }}
    />
  );
}
