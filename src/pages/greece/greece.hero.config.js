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
    publicId: 'Greece/Athens/Small/Acropolis Hill',
    status: 'active',
    intent: 'fallback',
    objectPosition: 'center',
    notes: 'Country hub hero — distinct from Athens page sunset and Athens-backup hero',
  },
};

export default greeceHeroConfig;
