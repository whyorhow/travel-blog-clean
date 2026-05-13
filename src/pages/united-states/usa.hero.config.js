export const usaHeroConfig = {
  diary: {
    publicId: 'hero/diary/usa/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for USA',
  },
  location: {
    publicId: 'hero/location/usa/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'United States/Tennessee/Tennessee-backup',
    status: 'active',
    intent: 'fallback',
    notes: 'USA backup hero uploaded from cloudinary-staging',
  },
};

export default usaHeroConfig;
