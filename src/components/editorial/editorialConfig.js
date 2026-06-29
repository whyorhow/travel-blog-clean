/**
 * Editorial layer — atmosphere variants & personal styling.
 * Affects spacing, texture, captions — not template structure.
 */

export const EDITORIAL_PLACEMENTS = {
  AFTER_INTRO: 'after-intro',
  AFTER_JOURNAL_MAP: 'after-journal-map',
  BETWEEN_NARRATIVES: 'between-narratives',
  AFTER_NARRATIVE: 'after-narrative', // transitional layer — e.g. "We'd Do This Again" margin note
  BEFORE_BRIDGE: 'before-bridge', // memory layer — Favourite Places heading + structured cards
  BEFORE_GALLERY: 'before-gallery',
  AFTER_GALLERY: 'after-gallery',
};

export const ATMOSPHERE_VARIANTS = {
  default: {
    id: 'default',
    label: 'Default',
    sectionPy: 'py-10 md:py-14',
    blockGap: 'space-y-10 md:space-y-12',
    containerBg: 'bg-stone-100/40',
    containerBorder: 'border-stone-300/50',
    textureOpacity: 0.04,
    captionClass: 'text-stone-500',
    titleAccent: 'text-[#8C6A2A]',
    motionSoftness: 'transition-opacity duration-500',
    sectionDensity: 'normal',
  },
  greece: {
    id: 'greece',
    label: 'Greece',
    sectionPy: 'py-12 md:py-16',
    blockGap: 'space-y-12 md:space-y-14',
    containerBg: 'bg-amber-50/50',
    containerBorder: 'border-amber-200/40',
    textureOpacity: 0.06,
    captionClass: 'text-amber-800/60',
    titleAccent: 'text-[#9A7B3C]',
    motionSoftness: 'transition-all duration-700 ease-out',
    sectionDensity: 'relaxed',
  },
  belgium: {
    id: 'belgium',
    label: 'Belgium',
    sectionPy: 'py-10 md:py-12',
    blockGap: 'space-y-9 md:space-y-11',
    containerBg: 'bg-stone-200/30',
    containerBorder: 'border-stone-400/35',
    textureOpacity: 0.08,
    captionClass: 'text-stone-600/80',
    titleAccent: 'text-[#6B5A49]',
    motionSoftness: 'transition-opacity duration-400',
    sectionDensity: 'airy',
  },
  brazil: {
    id: 'brazil',
    label: 'Brazil',
    sectionPy: 'py-8 md:py-12',
    blockGap: 'space-y-8 md:space-y-10',
    containerBg: 'bg-emerald-50/30',
    containerBorder: 'border-emerald-200/30',
    textureOpacity: 0.04,
    captionClass: 'text-stone-600',
    titleAccent: 'text-[#6B7C3A]',
    motionSoftness: 'transition-transform duration-300',
    sectionDensity: 'dense',
  },
  hungary: {
    id: 'hungary',
    label: 'Hungary',
    sectionPy: 'py-11 md:py-14',
    blockGap: 'space-y-10 md:space-y-12',
    containerBg: 'bg-stone-100/50',
    containerBorder: 'border-stone-400/35',
    textureOpacity: 0.05,
    captionClass: 'text-stone-600/85',
    titleAccent: 'text-[#7A5C3E]',
    motionSoftness: 'transition-opacity duration-500',
    sectionDensity: 'relaxed',
  },
  austria: {
    id: 'austria',
    label: 'Austria',
    sectionPy: 'py-11 md:py-14',
    blockGap: 'space-y-10 md:space-y-12',
    containerBg: 'bg-slate-50/55',
    containerBorder: 'border-slate-400/30',
    textureOpacity: 0.05,
    captionClass: 'text-stone-600/85',
    titleAccent: 'text-[#6B5E4A]',
    motionSoftness: 'transition-opacity duration-500',
    sectionDensity: 'relaxed',
  },
  czech: {
    id: 'czech',
    label: 'Czech Republic',
    sectionPy: 'py-11 md:py-14',
    blockGap: 'space-y-10 md:space-y-12',
    containerBg: 'bg-stone-50/55',
    containerBorder: 'border-stone-400/30',
    textureOpacity: 0.05,
    captionClass: 'text-stone-600/85',
    titleAccent: 'text-[#5C4A3A]',
    motionSoftness: 'transition-opacity duration-500',
    sectionDensity: 'relaxed',
  },
  tennessee: {
    id: 'tennessee',
    label: 'Tennessee',
    sectionPy: 'py-11 md:py-14',
    blockGap: 'space-y-10 md:space-y-12',
    containerBg: 'bg-amber-50/45',
    containerBorder: 'border-amber-900/15',
    textureOpacity: 0.05,
    captionClass: 'text-stone-600/90',
    titleAccent: 'text-stone-800',
    motionSoftness: 'transition-opacity duration-500',
    sectionDensity: 'normal',
  },
};

/** Map surface context from template variant */
export function resolveSurfaceContext(templateVariant) {
  if (templateVariant === 'immersive') return 'paper';
  if (templateVariant === 'urban') return 'dark';
  if (templateVariant === 'megacity' || templateVariant === 'industrial') return 'light';
  return 'light';
}

export function getAtmosphere(atmosphereKey) {
  return ATMOSPHERE_VARIANTS[atmosphereKey] ?? ATMOSPHERE_VARIANTS.default;
}
