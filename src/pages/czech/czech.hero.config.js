export const czechHeroConfig = {
  diary: {
    publicId: "hero/diary/czech-republic/main",
    status: "missing",
    intent: "primary",
    notes: "Cinematic hero — primary narrative identity for Czech Republic",
  },
  location: {
    publicId: "hero/location/czech-republic/main",
    status: "missing",
    intent: "secondary",
    notes: "Standard hero — safe establishing shot",
  },
  fallback: {
    publicId: "Czech/Czech-backup",
    status: "active",
    intent: "fallback",
    alt: "Handwritten Czech Republic travel diary — Prague and Bohemian wilderness",
    notes: "Czech backup hero on Cloudinary",
  },
};

export default czechHeroConfig;
