export const tennesseeHeroConfig = {
  diary: {
    publicId: 'hero/diary/tennessee/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Tennessee',
  },
  location: {
    publicId: 'hero/location/tennessee/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'United States/Tennessee/Tennessee-backup',
    status: 'active',
    intent: 'fallback',
    notes: 'Tennessee backup hero uploaded from cloudinary-staging',
  },
};

export default tennesseeHeroConfig;
