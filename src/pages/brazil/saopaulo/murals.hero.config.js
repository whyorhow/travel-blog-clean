export const muralsHeroConfig = {
  diary: {
    publicId: 'hero/diary/saopaulo/murals',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Street Murals',
  },
  location: {
    publicId: 'hero/location/saopaulo/murals',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - establishing shot for Street Murals',
  },
  fallback: {
    publicId: 'Brazil/Sao Paulo/Street Art/Murals-backup',
    status: 'active',
    intent: 'fallback',
    uncropped: false,
    notes: 'Murals backup hero uploaded from cloudinary-staging',
  },
};

export default muralsHeroConfig;
