export const belgiumHeroConfig = {
  diary: {
    publicId: 'hero/diary/belgium/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Belgium',
  },
  location: {
    publicId: 'hero/location/belgium/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'Belgium/Belgium-backup',
    status: 'active',
    intent: 'fallback',
    notes: 'Belgium backup hero uploaded from cloudinary-staging',
  },
};

export default belgiumHeroConfig;
