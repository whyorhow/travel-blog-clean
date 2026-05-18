export const greenSpacesHeroConfig = {
  diary: {
    publicId: 'hero/diary/saopaulo/green-spaces',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Green Spaces',
  },
  location: {
    publicId: 'hero/location/saopaulo/green-spaces',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - establishing shot for Green Spaces',
  },
  fallback: {
    publicId: 'SP-Parks/green-spaces-backup',
    status: 'active',
    intent: 'fallback',
    uncropped: false,
    notes: 'Green Spaces backup hero uploaded from cloudinary-staging',
  },
};

export default greenSpacesHeroConfig;
