/**
 * Berlin hero config.
 * Hero: Berlin 16 — "The Green Trabant" (Berlin Hero Image category).
 */
export const berlinHeroConfig = {
  diary: {
    publicId: 'hero/diary/berlin/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero — primary narrative identity for Berlin',
  },
  location: {
    publicId: 'hero/location/berlin/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero — safe establishing shot',
  },
  fallback: {
    publicId: 'Germany/Berlin/Berlin-Hero-Backup',
    status: 'active',
    intent: 'fallback',
    alt: 'Berlin — a lime-green Trabant driving past a preserved section of the Berlin Wall on a wet street',
    notes: 'Berlin backup hero — uploaded from cloudinary-staging',
    objectPosition: 'center 50%',
    photoTreatment: 'warm',
  },
};

export default berlinHeroConfig;