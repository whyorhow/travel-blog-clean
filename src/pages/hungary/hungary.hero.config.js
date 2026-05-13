export const hungaryHeroConfig = {
  diary: {
    publicId: 'hero/diary/hungary/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Hungary',
  },
  location: {
    publicId: 'hero/location/hungary/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'Hungary/Hungary-backup',
    status: 'active',
    intent: 'fallback',
    notes: 'Hungary backup hero uploaded from cloudinary-staging',
  },
};

export default hungaryHeroConfig;
