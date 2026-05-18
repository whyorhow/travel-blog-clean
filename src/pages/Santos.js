import React from "react";
import { LightTemplate } from "./templates";
import santosImages from "../assets/artImages/slices/category/santos.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { santosHeroConfig } from './brazil/santos/santos.hero.config';

const resolvePublicId = (id) => {
  const img = santosImages.find(i => i.id === id);
  if (!img) return null;
  return img.cloudinary.blog;
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
    title: 'Santos | Nomad Scribbles',
    description: 'Santos isn\'t a city people discover by accident. It offers air, space, and a slower rhythm — without ever trying to impress.',
  },
  coords: destinations.find(d => d.id === 'santos'),
  spatialContext: 'On the São Paulo coast — the port city where Brazil\'s coffee fortune shipped out, and where Pelé played.',
};

export default function Santos() {
  return (
    <LightTemplate
      variant="coastal"
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
          image: { src: resolvePublicId('santos1'), alt: 'The Santos beachfront facing the Atlantic' },
          heading: 'Facing the Atlantic',
          paragraph: 'For many Paulistanos, this coastline isn\'t a destination — it\'s where the city\'s pressure loosens. You come here to breathe differently. Beyond the beachfront, roads climb gently into green hills. Houses turn toward breeze rather than view. Santos doesn\'t compete. It waits.',
        },
        {
          image: { src: resolvePublicId('santos5'), alt: 'Where time softens things in Santos' },
          heading: 'Where Time Softens Things',
          paragraph: 'Older buildings sit half-reclaimed by trees and vines. Paint fades. Brick opens. Roots press patiently through stone. Nothing feels abandoned — only unhurried. Santos carries its age openly, allowing nature to return where pressure has eased. These corners aren\'t preserved; they\'re lived with.',
        },
        {
          image: { src: resolvePublicId('santos2'), alt: 'Football as inheritance in Santos' },
          heading: 'Football as Inheritance',
          paragraph: 'Pelé\'s presence in Santos isn\'t monumental — it\'s assumed. His museum stands quietly, murals appear without announcement, and the stories are told casually, as if everyone already knows them. Football here isn\'t staged for visitors. It\'s folded into daily life, carried forward as memory rather than performance.',
        },
        {
          image: { src: resolvePublicId('santos3'), alt: 'Vila Belmiro — still in use' },
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

