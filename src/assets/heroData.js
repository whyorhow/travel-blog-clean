/**
 * HERO DATA — Semantic Asset Registry
 * 
 * NOT page-centric: /brazil/saopaulo/hero.jpg
 * YES role-centric: /hero/location/saopaulo/main
 * 
 * Principle: Assets are role-defined, context-injected.
 * Pages compose. Components render. Data maps roles to assets.
 * 
 * Cloudinary structure mirrors this:
 *   /hero/location/{destination}/main
 *   /hero/diary/{destination}/main (when narrative weight needed)
 *   /gallery/{destination}/{category}/{id}
 *   /textures/paper/
 *   /signatures/{destination}/
 */

/**
 * HERO REGISTRY
 * Maps destination ID to hero asset configuration
 * 
 * Each entry defines:
 * - publicId: Cloudinary public ID
 * - alt: Accessibility description
 * - title: Display title (usually destination name)
 * - subtitle: Optional tagline
 * - treatment: 'location' | 'diary' — which hero variant to use
 * - theme: Destination-specific color theme reference
 */
export const HERO_REGISTRY = {
  // ============================================================================
  // GLOBAL FALLBACK — Used when destination has no hero config
  // ============================================================================
  default: {
    location: {
      publicId: 'hero/location/default/main',
      alt: 'Travel destination',
      title: 'Explore',
      subtitle: null,
      theme: 'default',
    }
  },
  
  // ============================================================================
  // BRAZIL
  // ============================================================================
  
  saopaulo: {
    // Tier 1: Diary Hero (cinematic, 90vh) — Upload to: staging/hero/diary/saopaulo/main.jpg
    diary: {
      publicId: 'hero/diary/saopaulo/main',
      alt: 'São Paulo urban landscape',
      title: 'São Paulo',
      subtitle: 'Fragments of a Megacity',
      theme: 'default',
    },
    // Tier 2: Location Hero (standard, 60vh) — Upload to: staging/hero/location/saopaulo/main.jpg
    location: {
      publicId: 'hero/location/saopaulo/main',
      alt: 'São Paulo skyline at dusk',
      title: 'São Paulo',
      subtitle: null,
      theme: 'default',
    },
    // Tier 3: Page Fallback (safety asset) — Upload to: staging/hero/fallback/saopaulo/main.jpg
    fallback: {
      publicId: 'hero/fallback/saopaulo/main',
      alt: 'São Paulo city view',
      title: 'São Paulo',
      subtitle: null,
      theme: 'default',
    }
  },
  
  rio: {
    // Tier 1: Diary Hero (cinematic, 90vh) — Upload to: staging/hero/diary/rio/main.jpg
    diary: {
      publicId: 'hero/diary/rio/main',
      alt: 'Rio de Janeiro dramatic landscape',
      title: 'Rio de Janeiro',
      subtitle: 'The Marvellous City',
      theme: 'rio',
    },
    // Tier 2: Location Hero (standard, 60vh) — Upload to: staging/hero/location/rio/main.jpg
    location: {
      publicId: 'hero/location/rio/main',
      alt: 'Rio de Janeiro landscape',
      title: 'Rio de Janeiro',
      subtitle: null,
      theme: 'rio',
    },
    // Tier 3: Page Fallback (safety asset) — Upload to: staging/hero/fallback/rio/main.jpg
    fallback: {
      publicId: 'hero/fallback/rio/main',
      alt: 'Rio de Janeiro city view',
      title: 'Rio de Janeiro',
      subtitle: null,
      theme: 'rio',
    }
  },
  
  salvador: {
    // Tier 2: Location Hero (standard)
    location: {
      publicId: 'hero/location/salvador/main',
      alt: 'Salvador colonial architecture',
      title: 'Salvador',
      subtitle: null,
      theme: 'default',
    },
    // Tier 3: Page Fallback (safety)
    fallback: {
      publicId: 'hero/fallback/salvador/main',
      alt: 'Salvador city view',
      title: 'Salvador',
      subtitle: null,
      theme: 'default',
    }
  },
  
  pantanal: {
    location: {
      publicId: 'hero/location/pantanal/main',
      alt: 'Pantanal wetlands at sunrise',
      title: 'Pantanal',
      subtitle: null,
      theme: 'default',
    },
    fallback: {
      publicId: 'hero/fallback/pantanal/main',
      alt: 'Pantanal landscape',
      title: 'Pantanal',
      subtitle: null,
      theme: 'default',
    }
  },
  
  // ============================================================================
  // Add more destinations following same 3-tier pattern:
  // Tier 1: diary (optional, cinematic)
  // Tier 2: location (required, standard)
  // Tier 3: fallback (required, safety)
  // ============================================================================
  // athens: { diary: {...}, location: {...}, fallback: {...} }
  // tennessee: { location: {...}, fallback: {...} }
};

/**
 * HERO THEME TOKENS
 * Color themes for hero treatment variants
 */
export const HERO_THEMES = {
  default: {
    gold: '#B8860B',
    textPrimary: '#e5e5e5',
    textSecondary: '#d4d4d4',
    overlayStart: 0.3,
    overlayEnd: 0.8,
  },
  rio: {
    gold: '#D4AF37',
    textPrimary: '#e5e5e5',
    textSecondary: '#d4d4d4',
    overlayStart: 0.4,
    overlayEnd: 0.8,
  },
  // Add more themes as needed...
};

/**
 * HERO RESOLUTION PRESETS
 * Cloudinary transformation chains
 */
export const HERO_SIZES = {
  location: { width: 1200 },      // 60vh heroes
  diary: { width: 2000 },           // 90vh cinematic
  thumbnail: { width: 400 },        // Previews
};

/**
 * Get hero configuration for destination
 * 
 * @param {string} destinationId - e.g., 'rio', 'saopaulo'
 * @param {string} [treatment='location'] - 'location' or 'diary'
 * @returns {Object|null} Hero config or null if not found
 */
export function getHeroConfig(destinationId, treatment = 'location') {
  const dest = HERO_REGISTRY[destinationId];
  if (!dest) return null;
  
  const config = dest[treatment] || dest.location;  // Fallback to location
  if (!config) return null;
  
  const theme = HERO_THEMES[config.theme] || HERO_THEMES.default;
  
  return {
    ...config,
    theme,
    size: HERO_SIZES[treatment] || HERO_SIZES.location,
  };
}

/**
 * Generate Cloudinary URL from hero config
 * 
 * @param {Object} heroConfig - From getHeroConfig()
 * @param {number} [width] - Override width
 * @returns {string} Cloudinary URL
 */
export function getHeroImageUrl(heroConfig, width) {
  // This will integrate with your cloudinaryImageUrl utility
  // For now, returning structure that matches your system
  return {
    publicId: heroConfig.publicId,
    width: width || heroConfig.size.width,
    alt: heroConfig.alt,
  };
}

export default HERO_REGISTRY;
