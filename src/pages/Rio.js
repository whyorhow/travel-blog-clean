import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import { rioHeroConfig } from './brazil/rio/rio.hero.config';

// ── Image data ────────────────────────────────────────────────────────────────

const rioImages = artImages.filter(img => img.category === 'Rio');

const resolveRioImagePublicId = (id) => {
  const img = rioImages.find(i => i.id === id);
  if (!img) return null;
  return img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
};

const GALLERY_ORDER = ['rio1','rio2','rio3','rio4','rio5','rio6','rio7','rio8','rio9','rio10','rio11','rio12','rio13','rio14'];

const galleryImages = GALLERY_ORDER
  .map(id => rioImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => {
    const publicId = img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
    return {
      src: cloudinaryImageUrl(publicId, { width: 800 }),
      image: img.image,  // legacy path — used by SimpleLightbox for enlarged view
      alt: img.title,
      imageId: img.id,
      title: img.title,
      description: img.description,
      sizeClass: img.id === 'rio1' ? 'wide' : img.id === 'rio9' ? 'tall' : 'small',
      theme: 'rio',
      energy: 'medium',
    };
  });

// ── Location data ─────────────────────────────────────────────────────────────

const locationData = {
  name: 'Rio de Janeiro',
  seo: {
    title: 'Rio de Janeiro | Nomad Scribbles',
    description: 'Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography.',
  },
  coords: destinations.find(d => d.id === 'rio'),
  spatialContext: 'The city presses against the mountains, filling every flat space between forest and sea. Geography forces Rio upward rather than outward.',
};

// ── Component ─────────────────────────────────────────────────────────────────

function Rio() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroConfig={rioHeroConfig}
      heroPageData={{ title: 'Rio de Janeiro', subtitle: 'The Marvellous City' }}
      intro={{
        paragraphs: [
          'Rio is a city defined by its geography. Mountains rise directly from the sea, leaving narrow bands of flat land where dense neighbourhoods cling to the coastline.',
          'The city breathes differently than others. Morning mist settles in the valleys. Afternoon sun bakes the granite peaks. Evening brings cool air from the ocean, carrying sound and music upward through the streets.',
          'Carnival transforms the entire city into performance space. But even without it, Rio carries that energy daily — in beach culture, in street life, in the way the city moves to its own rhythm.',
          'Christ the Redeemer watches from above, arms open to a city that sprawls beneath him in layers of colour, noise, and heat.',
        ],
      }}
      rhythmInserts={[
        "The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn't a backdrop — it sets the limits and the mood.",
        'The beach marks a shift in pace. Conversations slow. Bodies stretch. The city exhales. In Rio, the shoreline isn\'t an escape; it\'s where daily life loosens without ever fully stopping.',
      ]}
      narratives={[
        {
          image: {
            src: resolveRioImagePublicId('rio2'),
            alt: 'Carnival at the Sambadrome',
          },
          heading: 'Spectacle and Scale',
          paragraph: 'From the stands, the Sambadrome collapses into a dense field of light, sound, and movement. Each section performs with precision, but the scale of the crowd makes it clear that Carnival only works because it is shared. What looks overwhelming from a distance becomes cohesive only through collective effort.',
        },
        {
          image: {
            src: resolveRioImagePublicId('rio8'),
            alt: 'Rio geography from above',
          },
          heading: 'Pressed to the Mountain',
          paragraph: "Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio's geography leaves little room for sprawl; instead, it layers daily life vertically, compressing homes, streets, and routines against the hills.",
        },
      ]}
      bridgeQuote="These fragments only sketch the surface. Beyond them, the city opens outward — toward Corcovado, toward the sea, toward the dense life that fills every valley."
      galleryImages={galleryImages}
      galleryBackground={paperTexture}
      reflectiveClose="Rio never fully reveals itself. It offers moments — carnival, sunset, the view from a peak — and leaves the rest for you to discover in the climb."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: The Pantanal', path: '/brazil/pantanal' }}
    />
  );
}

export default Rio;
