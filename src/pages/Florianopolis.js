import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import destinations from "../assets/destinations.json";
import dirtyWallTexture from '../assets/Backgrounds/Dirty-Wall-Texture.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { florianopolisHeroConfig } from './brazil/florianopolis/florianopolis.hero.config';

const floripaImages = artImages.filter(img => img.category === "Florianopolis");

const resolvePublicId = (id) => {
  const img = floripaImages.find(i => i.id === id);
  if (!img) return null;
  return img.cloudinary.blog;
};

const GALLERY_ORDER = [
  'floripa14','floripa18','floripa2','floripa5','floripa3',
  'floripa12','floripa4','floripa17','floripa10','floripa8',
  'floripa11','floripa7','floripa6','floripa15','floripa16',
  'floripa19','floripa22','floripa13','floripa21','floripa20',
  'floripa25','floripa24','floripa9','floripa1','floripa23',
];

const galleryImages = GALLERY_ORDER
  .map(id => floripaImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'floripa',
    energy: 'low',
  }));

const locationData = {
  name: 'Florianópolis',
  seo: {
    title: 'Florianópolis | Nomad Scribbles',
    description: 'Florianópolis: An island city where lush hills meet over 40 distinct beaches on Brazil\'s southern coast.',
  },
  coords: destinations.find(d => d.id === 'florianopolis'),
  spatialContext: 'An island city on Brazil\'s southern coast — shaped for Brazilians, open to everyone.',
};

function Florianopolis() {
  return (
    <LightTemplate
      variant="coastal"
      locationData={locationData}
      heroConfig={florianopolisHeroConfig}
      heroPageData={{ title: 'Florianópolis', subtitle: 'The Magic Island' }}
      intro={{
        paragraphs: [
          'Florianópolis reveals itself slowly. Footsteps fade into the tide, coastlines widen and narrow again, and the island shifts gently between city, beach, and forest.',
          'This is partly because Florianópolis isn\'t shaped primarily for international visitors — it\'s a holiday island for Brazilians, and that context sets the tone. Families return year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, water, and green space.',
          'You don\'t come here to collect highlights. You come to settle into something that already works.',
        ],
      }}
      rhythmInserts={[
        'Nothing competes for attention, and that absence becomes the appeal.',
        'The landscape sets the terms here. Life follows.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('floripa5'), alt: 'Campeche beach — wide and unhurried' },
          heading: 'Campeche',
          paragraph: 'The beach runs broad and uninterrupted, backed by hills rather than dense development. People arrive with coolers, towels, and time, and tend to stay put. For Brazilians, Campeche is about familiarity — long days, repeated visits, and a rhythm that doesn\'t need reinvention. For visitors, it\'s often where the island\'s logic clicks into place.',
        },
        {
          image: { src: resolvePublicId('floripa12'), alt: 'Santo António de Lisboa by the water' },
          heading: 'Santo Antônio de Lisboa',
          paragraph: 'On the quieter, bay-facing side of the island, the rhythm turns inward. Santo Antônio sits where the water stays calm and the light softens toward evening. Boats rest near shore, restaurants fill gradually, workshops and homes sit side by side. Handwritten notes, handmade objects, and unhurried meals aren\'t arranged for visitors — they\'re simply part of how the place functions.',
        },
        {
          image: { src: resolvePublicId('floripa22'), alt: 'Praia do Forte — rocks and surf' },
          heading: 'Praia do Forte',
          paragraph: 'Where Campeche opens wide, Praia do Forte interrupts. Rocks break the sand, waves arrive unevenly, and the coastline resists being smoothed out. Plants lean into salt air, stones accept the water again and again, and people adjust their pace without thinking about it.',
        },
        {
          image: { src: resolvePublicId('floripa25'), alt: 'The island at its most relaxed' },
          heading: 'Who Is This Trip For?',
          paragraph: 'This island suits travellers who enjoy beaches that feel lived-in rather than staged, and days that don\'t require much planning. It may frustrate those looking for a dense city experience or tightly structured itinerary. Florianópolis tends to reward patience and repetition more than novelty — it\'s better understood gradually, through small differences between beaches, towns, and days.',
        },
      ]}
      bridgeQuote="Pé na areia, água de coco, beira do mar. Feet in the sand, coconut water, by the sea."
      galleryImages={galleryImages}
      galleryBackground={dirtyWallTexture}
      reflectiveClose="The island doesn't ask for your attention. It simply continues — tides, beaches, and the quiet routine of people who already know this place well."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Ilha Grande', path: '/brazil/ilha-grande' }}
    />
  );
}

export default Florianopolis;

