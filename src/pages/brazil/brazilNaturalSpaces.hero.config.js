export const brazilNaturalSpacesHeroConfig = {
  diary: {
    publicId: 'hero/diary/brazil/natural-spaces',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero — primary narrative identity for Brazil Natural Spaces',
  },
  location: {
    publicId: 'hero/location/brazil/natural-spaces',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero — establishing shot for natural spaces page',
  },
  fallback: {
    publicId: 'hero/fallback/pantanal/main',
    status: 'active',
    intent: 'fallback',
    uncropped: true,
    notes: 'Interim stand-in until Brazil/Natural Spaces assets are on Cloudinary',
  },
  /** Self-hosted mobile LCP — see optimize:natural-spaces-hero */
  lcpPreloadLocal: '/assets/natural-spaces-hero-400.webp',
};

export default brazilNaturalSpacesHeroConfig;
