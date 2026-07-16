/**
 * Germany hero config.
 * Map asset not yet ready — using placeholder backup only.
 */
export const germanyHeroConfig = {
  diary: {
    publicId: 'hero/diary/germany/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero — primary narrative identity for Germany',
  },
  location: {
    publicId: 'hero/location/germany/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero — safe establishing shot',
  },
  fallback: {
    publicId: '/images/Adventures/GermanyFlag.webp',
    status: 'active',
    intent: 'fallback',
    alt: 'Hand-drawn Germany flag',
    notes: 'Local Germany hero — hand-drawn flag from public/images/Adventures',
    objectPosition: 'center 50%',
    photoTreatment: 'warm',
  },
};

export default germanyHeroConfig;