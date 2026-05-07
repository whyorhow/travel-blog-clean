/**
 * Design Tokens — Single Source of Truth
 * 
 * WHY: Once tokens are universal, cohesion becomes automatic.
 * You stop "designing each page manually."
 * 
 * RULE: Every visual decision must come from this file.
 * BAD: text-[#B8860B], mt-[37px], shadow-[0_0_20px_rgba(...)]
 * GOOD: tokens.colors.gold, tokens.spacing.section, tokens.shadows.card
 */

export const tokens = {
  // ============================================================================
  // COLORS
  // ============================================================================
  
  colors: {
    // Brand
    gold: '#B8860B',
    
    // Text scale — LIGHT backgrounds (paper/editorial)
    text: {
      primary: '#222',      // Main body text
      secondary: '#333',    // Secondary paragraphs  
      tertiary: '#444',     // Lighter supporting text
      muted: '#555',        // Captions, metadata
      subtle: '#666',       // Fine print
      
      // DARK backgrounds (Rio, night scenes)
      primaryDark: '#e5e5e5',   // stone-100 — Main on dark
      secondaryDark: '#d4d4d4', // stone-300 — Secondary on dark
      tertiaryDark: '#a8a29e',  // stone-400 — Muted on dark
    },
    
    // Background contexts
    background: {
      paper: '#f5f0e8',     // Paper texture base
      dark: '#292D18',      // Gradient end
      gradientStart: '#575E38',
    },
    
    // Overlays (standardized opacity)
    overlay: {
      hero: 'rgba(0,0,0,0.3)',       // 30% — Hero images
      heroLight: 'rgba(0,0,0,0.2)',  // 20% — Lighter hero
      imageTone: 'rgba(0,0,0,0.05)', // 5% — Subtle image treatment
      section: 'rgba(0,0,0,0.1)',    // 10% — Dark sections
    },
    
    // DESTINATION-SPECIFIC PALETTES
    // Each major destination can have its own personality
    
    rio: {
      gold: '#D4AF37',        // Hero gold (different from São Paulo)
      carnival: '#4a044e',    // Deep fuchsia
      geography: '#3b0764',   // Deep violet  
      corcovado: '#2e1065',   // Black/violet
      sea: '#1e1b4b',         // Indigo/black
      dark: '#1c1917',        // Near-black
      pageBg: '#581c87',      // Deep purple
      cream: '#ede0d4',       // Caption text
    },
    
    // Future palettes:
    // athens: { marble: '#f5f5f5', shadow: '#262626', accent: '#...' }
    // tennessee: { amber: '#...', paper: '#...', ink: '#...' }
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  
  typography: {
    hero: {
      size: '4rem',         // 64px
      lineHeight: '1.1',
      weight: '600',
      tailwind: 'text-4xl md:text-5xl font-semibold',
    },
    section: {
      size: '2.5rem',       // 40px
      lineHeight: '1.2', 
      weight: '600',
      tailwind: 'text-4xl font-semibold',
    },
    subsection: {
      size: '1.5rem',       // 24px
      lineHeight: '1.3',
      weight: '600',
      tailwind: 'text-2xl font-semibold',
    },
    lead: {
      size: '1.5rem',       // 24px
      lineHeight: '1.6',
      weight: '400',
      tailwind: 'text-xl md:text-2xl leading-relaxed',
    },
    body: {
      size: '1.125rem',     // 18px
      lineHeight: '1.7',
      weight: '400',
      tailwind: 'text-lg md:text-xl leading-relaxed',
    },
    caption: {
      size: '0.875rem',     // 14px
      lineHeight: '1.5',
      tailwind: 'text-xs leading-snug',
    }
  },

  // ============================================================================
  // SPACING (Editorial rhythm)
  // ============================================================================
  
  spacing: {
    xs: '0.5rem',         // 8px
    sm: '1rem',           // 16px
    md: '1.5rem',         // 24px — Standard section padding
    lg: '2.5rem',         // 40px
    xl: '4rem',           // 64px
    '2xl': '6rem',        // 96px
    bridge: '3rem',       // 48px — Bridge section
    section: '1.5rem',    // 24px
    contentGap: '2.5rem', // 40px — Between content blocks
  },

  // ============================================================================
  // LAYOUT
  // ============================================================================
  
  layout: {
    maxContent: '42rem',    // 672px — Optimal reading
    maxWide: '56rem',       // 896px — Narrative splits
    maxFull: '80rem',       // 1280px — Full-width sections
    heroHeight: '60vh',     // Standard hero
    heroHeightTall: '90vh', // Cinematic hero (Rio)
  },

  // ============================================================================
  // BORDERS & SHADOWS
  // ============================================================================
  
  radius: {
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px — Images, cards
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',      // Images
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.15)',
    card: '0 4px 6px rgba(0,0,0,0.1)',
    cardHover: '0 10px 15px rgba(0,0,0,0.2)',
    hero: '0 25px 50px rgba(0,0,0,0.5)',  // Hero text glow
    floating: '0 25px 50px rgba(0,0,0,0.6)', // Floating metadata cards
    highlight: 'inset 0 0 30px rgba(0,0,0,0.05)',
  },

  borders: {
    gold: '4px solid #B8860B',     // Highlight blocks
    subtle: '1px solid #e5e5e5',   // Dividers
  },

  // ============================================================================
  // ANIMATION
  // ============================================================================
  
  animation: {
    duration: {
      fast: '150ms',      // Hover states
      normal: '300ms',    // Transitions
      slow: '500ms',      // Page transitions
    },
    easing: {
      default: 'ease-out',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },

  // ============================================================================
  // PACING DEVICES (Narrative rhythm)
  // ============================================================================
  
  pacing: {
    bridge: {
      paddingY: '3rem',
      align: 'center',
      fontStyle: 'italic',
      color: 'text-muted',
    },
    rhythmInsert: {
      paddingY: '1rem',
      fontSize: 'text-lg md:text-xl',
      color: 'text-tertiary',
    },
    reflectiveClose: {
      paddingY: '4rem',
      borderLeft: '4px solid #B8860B',
      background: 'rgba(184,134,11,0.1)',
    }
  }
};

// ============================================================================
// TAILWIND CLASS MAPPINGS (Convenience exports)
// ============================================================================

export const tw = {
  // Colors — São Paulo (default editorial)
  gold: 'text-[#B8860B]',
  textPrimary: 'text-[#222]',
  textSecondary: 'text-[#333]',
  textTertiary: 'text-[#444]',
  textMuted: 'text-[#555]',
  textSubtle: 'text-[#666]',
  
  // Colors — Dark backgrounds (Rio)
  textPrimaryDark: 'text-[#e5e5e5]',
  textSecondaryDark: 'text-[#d4d4d4]',
  textTertiaryDark: 'text-[#a8a29e]',
  
  // Typography
  hero: 'text-4xl md:text-5xl font-semibold text-[#B8860B]',
  section: 'text-4xl font-semibold text-[#B8860B]',
  subsection: 'text-2xl font-semibold text-[#B8860B]',
  lead: 'text-xl md:text-2xl leading-relaxed text-[#333]',
  body: 'text-lg md:text-xl leading-relaxed text-[#444]',
  caption: 'text-xs leading-snug text-[#666]',
  
  // Containers
  content: 'max-w-3xl mx-auto px-6',
  wide: 'max-w-4xl mx-auto px-6',
  full: 'max-w-5xl mx-auto px-6 md:px-12',
  
  // Images
  image: 'rounded-lg shadow-md',
  imageHover: 'opacity-90 transition-opacity duration-300 hover:opacity-100',
  
  // Spacing
  bridge: 'py-12',
  section: 'py-6',
  contentGap: 'gap-10',
  
  // RIO-SPECIFIC PALETTE
  rio: {
    gold: 'text-[#D4AF37]',
    goldBorder: 'border-[#D4AF37]',
    bgGold: 'bg-[#D4AF37]',
    
    carnival: 'bg-[#4a044e]',
    geography: 'bg-[#3b0764]',
    corcovado: 'bg-[#2e1065]',
    sea: 'bg-[#1e1b4b]',
    dark: 'bg-[#1c1917]',
    pageBg: 'bg-[#581c87]',
    cream: 'text-[#ede0d4]',
    creamBorder: 'border-[#ede0d4]',
    
    // Combined utility classes
    heroTitle: 'text-7xl md:text-9xl font-bold font-handwriting text-[#D4AF37] drop-shadow-2xl',
    sectionTitle: 'text-4xl md:text-6xl font-bold font-handwriting text-[#D4AF37]',
    cardBorder: 'border-2 border-[#D4AF37]',
    button: 'bg-[#2e1065]/20 border-2 border-[#D4AF37] text-[#D4AF37] backdrop-blur-md',
    buttonHover: 'hover:bg-[#2e1065]/30 hover:text-[#D4AF37]',
    metadataCard: 'bg-[#1c1917]/85 backdrop-blur-md border border-[#D4AF37]/30',
  },

  // ============================================================================
  // SURFACE-AWARE TYPOGRAPHY
  // ============================================================================
  // Text colors that respond to background material, not just semantic role.
  // Usage: <div className={tw.surface.paper.container}>...<p className={tw.surface.paper.body}>
  
  surface: {
    // PAPER SURFACE — Torn paper, journal, aged backgrounds
    // Warm, slightly desaturated, softer than pure charcoal
    paper: {
      // Container marker (use on parent, children inherit via composition)
      container: 'bg-[#f5f0e8]', // Paper texture base
      
      // Text hierarchy
      title: 'text-4xl md:text-5xl font-semibold text-[#2B2118]',    // Warm dark brown, not harsh black
      heading: 'text-2xl md:text-3xl font-semibold text-[#3A2D22]',   // Slightly lighter warm brown
      subheading: 'text-xl font-semibold text-[#4A3B2D]',            // Body-level heading
      body: 'text-lg md:text-xl leading-relaxed text-[#4A3B2D]',     // Warm readable brown
      lead: 'text-xl md:text-2xl leading-relaxed text-[#5B4A3D]',    // Prominent body (slightly lighter)
      muted: 'text-base text-[#6B5A49]',                             // Supporting text, captions
      subtle: 'text-sm text-[#7C6B59]',                              // Fine print, metadata
      
      // Accent (adjusted gold for paper warmth)
      accent: 'text-[#8C6A2A]',                                      // Deeper, muted gold
      accentHeading: 'text-2xl font-semibold text-[#8C6A2A]',
      
      // Borders and decorative
      border: 'border-[#8C6A2A]/30',
      divider: 'border-t border-[#6B5A49]/20',
    },
    
    // DEFAULT SURFACE — Clean backgrounds, neutral contexts
    default: {
      title: 'text-4xl md:text-5xl font-semibold text-[#222]',
      heading: 'text-2xl font-semibold text-[#333]',
      body: 'text-lg md:text-xl leading-relaxed text-[#444]',
      lead: 'text-xl md:text-2xl leading-relaxed text-[#333]',
      muted: 'text-base text-[#555]',
      subtle: 'text-sm text-[#666]',
      accent: 'text-[#B8860B]', // Brand gold
    },
    
    // DARK SURFACE — Overlays, night scenes, dark cards
    dark: {
      title: 'text-4xl md:text-5xl font-semibold text-[#f5f5f4]',    // stone-100
      heading: 'text-2xl font-semibold text-[#e7e5e4]',              // stone-200
      body: 'text-lg md:text-xl leading-relaxed text-[#d6d3d1]',   // stone-300
      lead: 'text-xl md:text-2xl leading-relaxed text-[#e7e5e4]',
      muted: 'text-base text-[#a8a29e]',                            // stone-400
      subtle: 'text-sm text-[#78716c]',                            // stone-500
      accent: 'text-[#D4AF37]', // Rio gold (use tokens.colors.rio.gold for consistency)
    },
    
    // ARCHIVE SURFACE — Gallery, metadata, observational mode
    // Slightly cooler, lighter, more detached
    archive: {
      caption: 'text-sm text-[#57534e]',                           // Warm grey
      metadata: 'text-xs text-[#78716c]',                         // Cooler grey
      title: 'text-lg font-medium text-[#44403c]',                // Neutral dark
      divider: 'border-t border-[#a8a29e]/30',
    }
  }
};

// ============================================================================
// STYLE OBJECTS (For inline styles when needed)
// ============================================================================

export const styles = {
  goldBorder: { borderLeft: '4px solid #B8860B' },
  goldBg: { backgroundColor: 'rgba(184,134,11,0.1)' },
  heroOverlay: { backgroundColor: 'rgba(0,0,0,0.3)' },
  imageTone: { backgroundColor: 'rgba(0,0,0,0.05)' },
  
  // Rio-specific inline styles
  rio: {
    pageBg: { backgroundColor: '#581c87' },
    heroGradient: { 
      background: 'linear-gradient(to bottom, rgba(28,25,23,0.4), transparent, #1c1917)' 
    },
    metadataCard: {
      backgroundColor: 'rgba(28,25,23,0.85)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(212,175,55,0.3)',
    },
    button: {
      backgroundColor: 'rgba(46,16,101,0.2)',
      border: '2px solid #D4AF37',
      color: '#D4AF37',
      backdropFilter: 'blur(12px)',
    }
  }
};

export default tokens;
