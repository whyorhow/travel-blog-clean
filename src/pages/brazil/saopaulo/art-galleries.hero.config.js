export const artGalleriesHeroConfig = {
  diary: {
    publicId: 'hero/diary/saopaulo/art-galleries',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Art & Galleries',
  },
  location: {
    publicId: 'hero/location/saopaulo/art-galleries',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - establishing shot for Art & Galleries',
  },
  fallback: {
    publicId: 'Brazil/Sao Paulo/Galleries/Galleries-backup',
    status: 'active',
    intent: 'fallback',
    uncropped: false,
    notes: 'Art & Galleries backup hero uploaded from cloudinary-staging',
  },
};

export default artGalleriesHeroConfig;
