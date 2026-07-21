/**
 * Germany hero config.
 * Map asset not yet ready — using placeholder backup only.
 */
export const germanyHeroConfig = {
  diary: {
    publicId: "hero/diary/germany/main",
    status: "disabled",
    intent: "primary",
    alt: "Berlin Ampelmännchen crossing signal mounted against a pale city sky",
    notes:
      "Cinematic hero asset uploaded, but disabled so the page can use the uncropped location presentation.",
    objectPosition: "center 50%",
  },
  location: {
    publicId: "hero/diary/germany/main",
    status: "active",
    intent: "secondary",
    alt: "Berlin Ampelmännchen crossing signal mounted against a pale city sky",
    notes:
      "Uses the uploaded Germany hero asset in the uncropped country-landing presentation.",
    objectPosition: "center 50%",
    uncropped: true,
  },
  fallback: {
    publicId: "/images/Adventures/GermanyFlag.webp",
    status: "active",
    intent: "fallback",
    alt: "Hand-drawn Germany flag",
    notes: "Local Germany hero — hand-drawn flag from public/images/Adventures",
    objectPosition: "center 50%",
    photoTreatment: "warm",
  },
};

export default germanyHeroConfig;
