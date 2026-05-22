export const brazilHeroConfig = {
  diary: {
    publicId: 'hero/diary/brazil/main',
    status: 'missing',
    intent: 'primary',
    notes: 'Cinematic hero - primary narrative identity for Brazil',
  },
  location: {
    publicId: 'hero/location/brazil/main',
    status: 'missing',
    intent: 'secondary',
    notes: 'Standard hero - safe establishing shot',
  },
  fallback: {
    publicId: 'Brazil/Brazil-hero',
    status: 'active',
    intent: 'fallback',
    uncropped: true,
    version: 1779448919,
    notes: 'Full-res journal spread from Dropbox BrazilHero.jpg (3326×2497)',
  },
  transition: {
    publicId: 'Brazil/Brazil-backup',
    status: 'active',
    intent: 'transition',
    uncropped: true,
    version: 1779448250,
    delayMs: 4000,
    notes: 'Second hero frame — crossfade after delay; click hero for full screen',
  },
};

export default brazilHeroConfig;
