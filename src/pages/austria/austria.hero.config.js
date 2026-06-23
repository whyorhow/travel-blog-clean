export const austriaHeroConfig = {
  diary: {
    publicId: 'hero/diary/austria/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero — primary narrative identity for Austria',
  },
  location: {
    publicId: 'hero/location/austria/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero — safe establishing shot',
  },
  fallback: {
    publicId: 'Austria/Austria-backup',
    status: 'active',
    intent: 'fallback',
    alt: 'Handwritten Austria travel diary — Vienna, Salzburg, and alpine landscapes across the country',
    notes: 'Austria backup hero uploaded from cloudinary-staging',
  },
};

export default austriaHeroConfig;
