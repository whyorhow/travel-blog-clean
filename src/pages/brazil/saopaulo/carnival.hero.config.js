export const carnivalHeroConfig = {
  diary: {
    publicId: 'hero/diary/saopaulo/carnival',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Carnival',
  },
  location: {
    publicId: 'hero/location/saopaulo/carnival',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - establishing shot for Carnival',
  },
  fallback: {
    publicId: 'CarnivalSP/Carnival-backup',
    status: 'active',
    intent: 'fallback',
    uncropped: false,
    notes: 'Carnival backup hero uploaded from cloudinary-staging',
  },
};

export default carnivalHeroConfig;
