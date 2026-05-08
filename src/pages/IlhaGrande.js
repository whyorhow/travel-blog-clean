import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import { ilhaGrandeHeroConfig } from './brazil/ilha-grande/ilha-grande.hero.config';

const ilhaImages = artImages.filter(img => img.category === "Ilha Grande");

const resolvePublicId = (id) => {
  const img = ilhaImages.find(i => i.id === id);
  if (!img) return null;
  return img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
};

const GALLERY_ORDER = [
  'ilha20','ilha17','ilha8','ilha11','ilha3',
  'ilha4','ilha7','ilha15','ilha5',
  'ilha9','ilha14','ilha18','ilha16',
  'ilha13','ilha21','ilha19',
];

const galleryImages = GALLERY_ORDER
  .map(id => ilhaImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img?.imagePublicId || getPublicIdFromLegacyPath(img?.image), { width: 800 }),
    image: img.image,
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'ilha',
    energy: 'low',
  }));

const locationData = {
  name: 'Ilha Grande',
  seo: {
    title: 'Ilha Grande | Nomad Scribbles',
    description: 'A roadless island where the Atlantic Forest meets the sea. Ilha Grande is a place of quiet trails, clear water, and unhurried rhythms.',
  },
  coords: destinations.find(d => d.id === 'ilha-grande'),
  spatialContext: 'Off the coast of Rio de Janeiro — reached only by water, and changed by that fact.',
};

function IlhaGrande() {
  return (
    <LightTemplate
      variant="coastal"
      locationData={locationData}
      heroConfig={ilhaGrandeHeroConfig}
      heroPageData={{ title: 'Ilha Grande', subtitle: 'Reached by water. Changed by it.' }}
      intro={{
        paragraphs: [
          'Ilha Grande feels less like a destination and more like a release. For many people in Rio, the island isn\'t an upgrade or a highlight — it\'s a pause. A place to step out of the city\'s volume without travelling far, where movement slows almost immediately because it has to.',
          'You arrive by boat. There are no roads across the island. Whatever pace you brought with you begins to loosen before you reach the shore.',
        ],
      }}
      rhythmInserts={[
        'Forest doesn\'t sit behind the beach here — it leans over it, shades it, interrupts it.',
        'You don\'t come here to collect experiences. You come to let the city fall away.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('ilha8'), alt: 'Forest pressing to the beach edge' },
          heading: 'Forest First',
          paragraph: 'At first glance, Ilha Grande can feel familiar — a hint of southern Brazil in the colours of the water, something of Thailand in the way jungle presses right up to the sand. Paths disappear quickly. Clearings feel temporary. Fresh water slips quietly over rock beneath dense canopy. Small details begin to matter more than landmarks.',
        },
        {
          image: { src: resolvePublicId('ilha4'), alt: 'Lived-in quiet on the island' },
          heading: 'Lived-in Quiet',
          paragraph: 'Most days settle into a simple rhythm. Short walks through dense green. Dogs resting in the shade. Signs pointing to hostels, kitchens, and places you don\'t need to rush toward. There are traces of history here, but they\'re quiet ones — stone structures reclaimed by vegetation, old routes softened by leaves and roots. The island isn\'t interested in telling its story loudly.',
        },
        {
          image: { src: resolvePublicId('ilha9'), alt: 'Beaches without performance' },
          heading: 'Beaches Without Performance',
          paragraph: 'Beaches stretch gently rather than dramatically. Some curve long and open, others hide behind trees and narrow paths. The water stays close to the forest edge, and the forest never fully retreats. Ilha Grande isn\'t about doing less for the sake of it — it\'s about removing friction. No traffic. No urgency. No need to choose between nature and comfort.',
        },
        {
          image: { src: resolvePublicId('ilha13'), alt: 'Departure from Ilha Grande' },
          heading: 'Departure',
          paragraph: 'When you leave, it happens the same way you arrived — by water. The island recedes slowly, green folding back into blue, and only then do you realise how much quieter everything has become.',
        },
      ]}
      bridgeQuote="The island isn't interested in telling its story loudly — it lets time do most of the work."
      galleryImages={galleryImages}
      galleryBackground={paperTexture}
      reflectiveClose="Ilha Grande gives back exactly what you're willing to slow down enough to receive — which turns out to be quite a lot."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Santos', path: '/brazil/santos' }}
    />
  );
}

export default IlhaGrande;
