export const brazilHeroConfig = {
  diary: {
    publicId: 'hero/diary/brazil/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Brazil',
  },
  location: {
    publicId: 'hero/location/brazil/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'Brazil/Brazil-hero',
    status: 'active',
    intent: 'fallback',
    uncropped: true,
    notes: 'Brazil backup hero uploaded from cloudinary-staging',
  },
};

export default brazilHeroConfig;
