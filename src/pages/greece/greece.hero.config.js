export const greeceHeroConfig = {
  diary: {
    publicId: 'hero/diary/greece/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Greece',
  },
  location: {
    publicId: 'hero/location/greece/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'Greece/Greece-backup',
    status: 'active',
    intent: 'fallback',
    notes: 'Greece backup hero uploaded from cloudinary-staging',
  },
};

export default greeceHeroConfig;
