/**
 * HERO RESOLVER — Decision engine for hero selection
 * 
 * 🔒 SYSTEM CONTRACT:
 * - Cloudinary is storage. Config is authority.
 * - Resolver only checks status === 'active'
 * - Never queries Cloudinary for existence
 * - Never assumes upload = available
 * 
 * DECISION HIERARCHY (never changes):
 * 1. Diary Hero (status: 'active') — cinematic, 90vh
 * 2. Location Hero (status: 'active') — standard, 60vh
 * 3. Page Fallback (status: 'active') — safety, 60vh
 * 4. PlaceholderHero (UI-only) — graceful degradation
 * 
 * STATUS VALUES:
 * - 'active': Use this hero (asset confirmed, approved, ready)
 * - 'disabled': Intentionally off (design choice, don't use)
 * - 'missing': Not ready (asset not uploaded or incomplete)
 * 
 * @param {Object} config - Hero config from {location}.hero.config.js
 * @returns {Object} Resolved hero with type, src, and metadata
 */

import { cloudinaryImageUrl } from '../../utils/cloudinary';
import { HERO_THEMES } from '../../assets/heroData';

const BRAZIL_STATIC_HERO_URL = '/assets/brazil-hero-400.webp';

export function resolveHero(config = {}) {
  const { diary, location, fallback } = config;
  
  // Tier 1: Diary Hero (cinematic, narrative weight)
  // Only used if status === 'active' AND has valid publicId
  if (diary?.status === 'active' && diary?.publicId) {
    return {
      type: 'diary',
      src: cloudinaryImageUrl(diary.publicId, { width: 2000, format: 'webp' }),
      publicId: diary.publicId,
      theme: HERO_THEMES.rio || HERO_THEMES.default,
      size: { width: 2000 }, // 90vh cinematic
      alt: 'Hero image',
      uncropped: diary.uncropped || false,
    };
  }
  
  // Tier 2: Location Hero (standard system hero)
  if (location?.status === 'active' && location?.publicId) {
    return {
      type: 'location',
      src: cloudinaryImageUrl(location.publicId, { width: 1200, format: 'webp' }),
      publicId: location.publicId,
      theme: HERO_THEMES.rio || HERO_THEMES.default,
      size: { width: 1200 }, // 60vh standard
      alt: 'Hero image',
      uncropped: location.uncropped || false,
    };
  }
  
  // Tier 3: Page Fallback (explicit safety asset)
  if (fallback?.status === 'active' && fallback?.publicId) {
    return {
      type: 'fallback',
      src: cloudinaryImageUrl(fallback.publicId, { width: 1200, format: 'webp', version: fallback.version }),
      publicId: fallback.publicId,
      theme: HERO_THEMES.default,
      size: { width: 1200 }, // 60vh standard
      alt: 'Hero image',
      uncropped: fallback.uncropped || false,
      version: fallback.version,
    };
  }
  
  // Tier 4: Placeholder (UI-only, no image asset)
  return {
    type: 'placeholder',
    src: null,
    publicId: null,
    theme: HERO_THEMES.default,
  };
}

/**
 * Optional second hero frame — crossfades over the resolved primary hero.
 */
export function resolveHeroTransition(config = {}) {
  const { transition } = config;

  if (transition?.status === 'active' && transition?.publicId) {
    return {
      src: cloudinaryImageUrl(transition.publicId, {
        width: 1200,
        format: 'webp',
        version: transition.version,
      }),
      publicId: transition.publicId,
      alt: transition.alt || 'Hero alternate view',
      uncropped: transition.uncropped ?? true,
      delayMs: transition.delayMs,
      version: transition.version,
    };
  }

  return null;
}

/** URL for <link rel="preload" as="image"> — matches resolved hero LCP asset */
export function resolveLcpHeroPreloadUrl({ heroConfig, heroImage } = {}) {
  if (heroConfig) {
    const hero = resolveHero(heroConfig);
    if (!hero?.src) return null;
    if (hero.publicId === 'Brazil/Brazil-hero' && hero.uncropped) {
      return BRAZIL_STATIC_HERO_URL;
    }
    if (hero.publicId) {
      const width = hero.type === 'diary' ? 1600 : hero.uncropped ? 400 : 1200;
      return cloudinaryImageUrl(hero.publicId, {
        width,
        version: hero.version,
      });
    }
    return hero.src;
  }

  if (heroImage?.src) {
    const { src } = heroImage;
    if (typeof src === 'string' && src.startsWith('http')) return src;
    const optimized = cloudinaryImageUrl(src, { width: 1200 });
    return optimized || src;
  }

  return null;
}

/**
 * Debug helper: Returns resolution report without rendering
 * Useful for system health checks in dev mode
 * 
 * @param {Object} config - Hero config
 * @returns {Object} Report of which tiers were checked and why
 */
export function resolveHeroDebug(config = {}) {
  const { diary, location, fallback } = config;
  const report = {
    tiers: [],
    selected: null,
    reason: null,
  };
  
  // Check diary (Priority 1 - Primary narrative identity)
  report.tiers.push({
    name: 'diary',
    priorityIndex: 1,
    status: diary?.status || 'missing',
    intent: diary?.intent || 'primary',
    publicId: diary?.publicId || null,
    usable: diary?.status === 'active' && !!diary?.publicId,
  });
  
  if (diary?.status === 'active' && diary?.publicId) {
    report.selected = 'diary';
    report.selectedPriority = 1;
    report.reason = 'First active tier in priority order';
    return report;
  }
  
  // Check location (Priority 2 - Standard representation)
  report.tiers.push({
    name: 'location',
    priorityIndex: 2,
    status: location?.status || 'missing',
    intent: location?.intent || 'secondary',
    publicId: location?.publicId || null,
    usable: location?.status === 'active' && !!location?.publicId,
  });
  
  if (location?.status === 'active' && location?.publicId) {
    report.selected = 'location';
    report.selectedPriority = 2;
    report.reason = 'First active tier in priority order';
    return report;
  }
  
  // Check fallback (Priority 3 - Safety net)
  report.tiers.push({
    name: 'fallback',
    priorityIndex: 3,
    status: fallback?.status || 'missing',
    intent: fallback?.intent || 'fallback',
    publicId: fallback?.publicId || null,
    usable: fallback?.status === 'active' && !!fallback?.publicId,
  });
  
  if (fallback?.status === 'active' && fallback?.publicId) {
    report.selected = 'fallback';
    report.selectedPriority = 3;
    report.reason = 'First active tier in priority order';
    return report;
  }
  
  report.selected = 'placeholder';
  report.selectedPriority = null;
  report.reason = 'No active tiers found';
  return report;
}

export default resolveHero;
