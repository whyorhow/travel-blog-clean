import React, { useState, useMemo, useCallback } from 'react';
import { useStaticHeroBelowFoldGate } from '../../utils/staticHeroScrollGate';
import { Link } from 'react-router-dom';
import { tw, tokens } from '../../styles';
import SEO from '../../components/SEO';
import {
  Hero,
  LocationHero,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../../components/layout';
import { NARRATIVE_PHOTO_JOURNAL } from '../../components/layout/NarrativeSplit';
import GalleryWall from '../../components/GalleryWall';
import SimpleLightbox from '../../components/SimpleLightbox';
import ContextMap from '../../components/ContextMap';
import {
  EditorialBlocks,
  getAtmosphere,
  resolveSurfaceContext,
  normalizeEditorialBlocks,
  getBlocksForPlacement,
  EDITORIAL_PLACEMENTS,
} from '../../components/editorial';
import { tornPaperLayerStyle } from '../../styles/paperTexture';
import { cloudinaryImageUrl } from '../../utils/cloudinary';
import { resolveLcpHeroPreloadUrl } from '../../system/resolvers/resolveHero';

/**
 * LIGHT EDITORIAL TEMPLATE
 * 
 * Core identity: atmosphere + pacing + immersion
 * 
 * Use for: Destinations that are felt more than navigated.
 * Linear storytelling, emotional pacing, visual breathing room.
 * 
 * VARIANTS — each defines a content contract:
 * 
 *   "urban"      → Compact city page. Single intro paragraph, clean palette.
 *                  Props: intro (single paragraph), bridgeQuote
 * 
 *   "immersive"  → Essayistic/reflective. Rio, Budapest, Athens-style.
 *                  Paper texture surface, multi-paragraph intro, narrative sequences.
 *                  Props: intro.paragraphs[], narratives[], rhythmInserts[], bridgeQuote
 * 
 *   "nature"     → Brazil/Pantanal/Iguazu-style. Feature image, minimal text.
 *                  Props: introText (single string), featureImage, bridgeQuote
 * 
 *   "coastal"    → Same content shape as nature, lightest overlay.
 *                  Props: introText (single string), featureImage, bridgeQuote
 * 
 * Shared across all variants: locationData, heroImage, sections (optional),
 * galleryImages, reflectiveClose
 *
 * Optional personal layer:
 *   editorialBlocks — config-driven blocks (memory, favourite-cafe, etc.)
 *   atmosphere — 'greece' | 'belgium' | 'brazil' | 'default' (tonal styling)
 *
 * Block placement: after-intro | between-narratives | after-narrative |
 *   before-bridge | before-gallery | after-gallery
 *
 * Structure: Hero → narratives → [We'd Do This Again] → [Favourite Places] → bridge → [Looking Back] → gallery
 */

// ── Variant config ────────────────────────────────────────────────────────────
// Controls tonal flavour: palette, hero overlay, gallery language, close style.
// Never changes which layout components exist — only how they look.

const VARIANT_CONFIG = {
  urban: {
    overlayOpacity: 25,
    surface: 'dark',        // dark backgrounds, light text
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'inline',   // no border — just quiet italic text
    paperTexture: false,
  },
  immersive: {
    overlayOpacity: 35,
    surface: 'tornPaper',   // paper texture with torn-paper SVG filter
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'vintage',  // gold-bordered box
    paperTexture: true,
  },
  nature: {
    overlayOpacity: 20,
    surface: 'default',     // neutral, clean
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'inline',
    paperTexture: false,
  },
  coastal: {
    overlayOpacity: 15,
    surface: 'default',
    galleryHeading: 'Further Fragments',
    bridgeHandwriting: true,
    closeStyle: 'inline',
    paperTexture: false,
  },
};

// ── Surface styles ────────────────────────────────────────────────────────────

const SURFACE_STYLES = {
  dark: {
    wrapper: `min-h-screen pb-16 ${tw.surface.dark.body}`,
    wrapperInline: {},
    title: `text-5xl md:text-6xl font-semibold ${tw.rio.gold} mb-8`,
    intro: `text-xl md:text-2xl leading-relaxed ${tw.surface.dark.lead} max-w-2xl mx-auto`,
  },
  paper: {
    wrapper: `min-h-screen pb-16 ${tw.surface.paper.body}`,
    wrapperInline: {
      backgroundColor: tokens.colors.background.paper,
    },
    title: `text-5xl md:text-6xl font-semibold ${tw.surface.paper.accent} mb-8 text-center`,
    intro: `${tw.surface.paper.body} mb-8`,
  },
  tornPaper: {
    wrapper: `min-h-screen pb-16 ${tw.surface.paper.body}`,
    wrapperInline: {},
    title: `text-5xl md:text-6xl font-semibold ${tw.surface.paper.accent} mb-8 text-center`,
    intro: `${tw.surface.paper.body} mb-8`,
  },
  default: {
    wrapper: 'min-h-screen pb-16',
    wrapperInline: {},
    title: 'text-5xl md:text-6xl font-semibold text-stone-900 mb-8',
    intro: `text-xl md:text-2xl leading-relaxed ${tw.textTertiary} max-w-2xl mx-auto`,
  },
};

// ── Reflective close variants ─────────────────────────────────────────────────

function CloseBlock({ text, style }) {
  const paragraphs = Array.isArray(text)
    ? text.filter(Boolean)
    : text?.trim()
      ? [text.trim()]
      : [];
  if (!paragraphs.length) return null;

  if (style === 'vintage') {
    return (
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div
          className={`p-8 border-2 ${tw.surface.paper.border} rounded-lg`}
          style={{
            background: `linear-gradient(to bottom, rgba(184,134,11,0.05), rgba(184,134,11,0.1))`,
            boxShadow: tokens.shadows.highlight,
          }}
        >
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`text-xl leading-relaxed ${tw.surface.paper.body} font-cormorant italic${i > 0 ? ' mt-4' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    );
  }
  // "inline" — quiet, no border
  return <ReflectiveClose text={paragraphs} />;
}

// ── Template ──────────────────────────────────────────────────────────────────

function LightTemplate({
  variant = 'nature',
  locationData,
  heroImage,        // { src, alt } — use this OR heroConfig, not both
  heroFallbackSrc,   // fallback URL if heroImage fails to load
  heroObjectFit,     // 'cover' (default) or 'contain' for portrait diary images
  heroConfig,        // from {location}.hero.config.js — uses semantic Hero resolver
  heroPageData,      // { title, subtitle } — passed to Hero if heroConfig used

  // urban variant
  intro,         // { paragraph: string } for urban; { paragraphs: string[] } for immersive

  // nature / coastal variant
  introText,     // single string
  featureImage,  // { src, alt, caption? }

  // immersive variant
  narratives,    // [{ image, heading, paragraph }]
  rhythmInserts, // string[]

  // shared
  bridgeQuote,
  sections,
  galleryImages,
  galleryBackground,
  reflectiveClose,
  returnLink,   // optional { label, path } — renders a back nav pill (always point to parent)
  nextLink,     // optional { label, path } — only pass when a sibling page exists; omit for last/only city in a country

  // Personal editorial layer (optional)
  editorialBlocks,
  atmosphere = 'default',

  // Hand-drawn journal map (optional) — replaces ContextMap when set
  journalMap = null,
  showContextMap = null,
  subsectionHeading = 'Inside the City',
  exploreSectionId,
  skipHero = false,
}) {
  const [narrativeLightboxImage, setNarrativeLightboxImage] = useState(null);
  const [deferBelowFold, setDeferBelowFold] = useState(
    () =>
      skipHero &&
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
  );

  useStaticHeroBelowFoldGate(deferBelowFold, setDeferBelowFold);

  const isDiaryHero =
    variant === 'immersive' &&
    !skipHero &&
    heroObjectFit === 'contain' &&
    Boolean(heroImage || heroConfig);

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.nature;
  const surface = SURFACE_STYLES[config.surface] ?? SURFACE_STYLES.default;
  const atmosphereConfig = getAtmosphere(atmosphere);
  const editorialSurface = resolveSurfaceContext(variant);
  const shouldShowContextMap = showContextMap ?? !journalMap;

  const normalizedEditorial = useMemo(
    () => normalizeEditorialBlocks(editorialBlocks),
    [editorialBlocks]
  );

  const lcpPreloadImage = useMemo(
    () => resolveLcpHeroPreloadUrl({ heroConfig, heroImage }),
    [heroConfig, heroImage]
  );

  const handleEditorialImageClick = useCallback((img) => {
    if (!img?.src) return;
    setNarrativeLightboxImage({
      image: cloudinaryImageUrl(img.lightboxSrc ?? img.src, { width: 1200, format: 'webp' }),
      title: img.lightboxAlt || img.alt || '',
      description: img.caption || '',
    });
  }, []);

  const renderEditorial = useCallback((placement, afterNarrativeIndex, className = '') => {
    const blocks = getBlocksForPlacement(normalizedEditorial, placement, afterNarrativeIndex);
    if (!blocks.length) return null;
    return (
      <EditorialBlocks
        blocks={blocks}
        atmosphere={atmosphereConfig}
        surface={editorialSurface}
        onImageClick={handleEditorialImageClick}
        className={className}
        placement={placement}
      />
    );
  }, [normalizedEditorial, atmosphereConfig, editorialSurface, handleEditorialImageClick]);

  const openNarrativeLightbox = useCallback((narrative) => {
    if (narrative.layout === 'cinematic') {
      setNarrativeLightboxImage({
        image: cloudinaryImageUrl(narrative.image?.lightboxSrc ?? narrative.image?.src, { width: 1600, format: 'webp' }),
        title: narrative.image?.alt || '',
        description: narrative.expandDescription ?? narrative.paragraph ?? '',
      });
    } else if (narrative.layout === 'split') {
      setNarrativeLightboxImage({
        image: cloudinaryImageUrl(narrative.image?.lightboxSrc ?? narrative.image?.src, { width: 1200, format: 'webp' }),
        title: narrative.image?.alt || '',
        description: narrative.expandDescription ?? '',
      });
    }
  }, []);

  const narrativePhotoClass = atmosphere === 'austria' ? NARRATIVE_PHOTO_JOURNAL : '';

  const renderNarrativeItem = (narrative, i) => {
    const narrativeBody =
      narrative.type === 'heading' ? (
        <h2 id={narrative.anchorId} className="scroll-mt-8 text-stone-900">
          {narrative.heading}
        </h2>
      ) : narrative.type === 'prose' ? (
        <p>{narrative.paragraph}</p>
      ) : (
        <NarrativeSplit
          image={narrative.image}
          imageB={narrative.imageB}
          images={narrative.images}
          heading={narrative.heading}
          paragraph={narrative.paragraph}
          layout={narrative.layout || 'split'}
          imageLeft={narrative.imageLeft ?? (i % 2 === 0)}
          photoClass={narrativePhotoClass}
          onExpand={
            narrative.layout === 'cinematic' || narrative.layout === 'split'
              ? () => openNarrativeLightbox(narrative)
              : undefined
          }
        />
      );

    return (
      <React.Fragment key={i}>
        {narrative.type === 'heading' || narrative.type === 'prose' ? (
          <div className="section-narrative">
            {narrative.type !== 'heading' && narrative.anchorId ? (
              <div id={narrative.anchorId} className="scroll-mt-8">
                {narrativeBody}
              </div>
            ) : (
              narrativeBody
            )}
          </div>
        ) : narrative.anchorId ? (
          <div id={narrative.anchorId} className="scroll-mt-8">
            {narrativeBody}
          </div>
        ) : (
          narrativeBody
        )}
        {renderEditorial(EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES, i)}
        {i < (narratives?.length ?? 0) - 1 && rhythmInserts?.[i + 1] && (
          <RhythmInsert text={rhythmInserts[i + 1]} align="center" variant={variant === 'immersive' ? 'paper' : 'light'} />
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {/* Narrative image lightbox — single-image, no index navigation */}
      {narrativeLightboxImage && (
        <SimpleLightbox
          images={[narrativeLightboxImage]}
          currentIndex={0}
          setCurrentIndex={(v) => { if (v === null) setNarrativeLightboxImage(null); }}
        />
      )}

      <div className={surface.wrapper} style={surface.wrapperInline}>
        <SEO
          {...locationData.seo}
          type="article"
          preloadImage={skipHero ? undefined : lcpPreloadImage}
        />

        {/* 1. HERO — skipped when static HTML hero is LCP (mobile shell) */}
        {!skipHero &&
          (heroConfig ? (
            <Hero heroConfig={heroConfig} pageData={heroPageData} />
          ) : heroImage ? (
            <LocationHero
              imageSrc={heroImage.src}
              alt={heroImage.alt}
              overlayOpacity={isDiaryHero ? 0 : config.overlayOpacity}
              fallbackSrc={heroFallbackSrc}
              objectFit={heroObjectFit}
              objectPosition={heroImage.objectPosition ?? 'center'}
              photoTreatment={heroImage.photoTreatment}
              flushTop={isDiaryHero}
            />
          ) : (
            <Hero heroConfig={{}} pageData={heroPageData} />
          ))}

        {/* Below-fold — scroll-gated when static HTML hero is LCP (mobile shell) */}
        {!deferBelowFold && (
          <>

        {/* 2. VARIANT CONTENT ─────────────────────────────────────────── */}

        {/* URBAN: compact single intro paragraph */}
        {variant === 'urban' && (
          <section className="max-w-3xl mx-auto px-6 py-16 text-center">
            {(heroConfig || heroImage) && <h1 className={surface.title}>{locationData.name}</h1>}
            <p className={surface.intro}>
              {intro?.paragraph}
            </p>
          </section>
        )}
        {variant === 'urban' && renderEditorial(EDITORIAL_PLACEMENTS.AFTER_INTRO)}
        {variant === 'urban' && journalMap}

        {/* IMMERSIVE: paper texture, multi-paragraph intro + narrative sequence + rhythm */}
        {variant === 'immersive' && (
          <>
            {/* Torn-paper texture wrapper — absorbed from Rio's bespoke treatment */}
            <div className="relative w-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                style={tornPaperLayerStyle()}
              />
              <div className={`max-w-5xl mx-auto relative z-10 ${journalMap ? 'pt-12 pb-2' : 'py-12'}`}>
                {(heroConfig || heroImage) && <h1 className={surface.title}>{locationData.name}</h1>}
                <div className="section-narrative">
                {intro?.lead && (
                  <p className="text-xl sm:text-2xl leading-relaxed font-cormorant font-normal">
                    {intro.lead}
                  </p>
                )}
                {intro?.paragraphs?.map((text, i) => (
                  <p key={i}>
                    {text}
                  </p>
                ))}
                </div>

                {renderEditorial(
                  EDITORIAL_PLACEMENTS.AFTER_INTRO,
                  undefined,
                  journalMap ? '!py-2 md:!py-3' : '',
                )}
              </div>

              {journalMap && React.isValidElement(journalMap)
                ? React.cloneElement(journalMap, { compactSpacing: true })
                : journalMap}

              {journalMap &&
                renderEditorial(
                  EDITORIAL_PLACEMENTS.AFTER_JOURNAL_MAP,
                  undefined,
                  'max-w-5xl mx-auto px-6 md:px-12 relative z-10 !py-6 md:!py-8',
                )}

              <div className="max-w-5xl mx-auto px-6 md:px-12 pb-12 relative z-10 text-stone-900 md:text-stone-800">
                {rhythmInserts?.[0] && (
                  <RhythmInsert text={rhythmInserts[0]} align="center" variant="paper" />
                )}

                {narratives?.map((narrative, i) => renderNarrativeItem(narrative, i))}
              </div>
            </div>

            {/* SVG filter for torn-paper edge effect */}
            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
              <defs>
                <filter id="torn-paper-filter" x="-50%" y="-50%" width="200%" height="200%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="5" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>
          </>
        )}

        {/* NATURE / COASTAL: minimal intro + feature image + optional narrative sequence */}
        {(variant === 'nature' || variant === 'coastal') && (
          <>
            <section className="max-w-3xl mx-auto px-6 py-16 text-center text-stone-800">
              {(heroConfig || heroImage) && <h1 className={surface.title}>{locationData.name}</h1>}
              {introText && <p className={surface.intro}>{introText}</p>}
              {intro?.paragraphs?.map((text, i) => (
                <p key={i} className={`${surface.intro} mb-6`}>{text}</p>
              ))}
            </section>

            {renderEditorial(
              EDITORIAL_PLACEMENTS.AFTER_INTRO,
              undefined,
              journalMap ? '!py-2 md:!py-3' : '',
            )}

            {journalMap && React.isValidElement(journalMap)
              ? React.cloneElement(journalMap, { compactSpacing: true })
              : journalMap}

            {journalMap &&
              renderEditorial(
                EDITORIAL_PLACEMENTS.AFTER_JOURNAL_MAP,
                undefined,
                'max-w-5xl mx-auto px-6 md:px-12 !py-6 md:!py-8',
              )}

            {featureImage && (
              <section className="w-full py-8">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <img
                      src={featureImage.src}
                      alt={featureImage.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {featureImage.caption && (
                    <p className={`text-sm mt-4 text-center italic ${surface.muted || 'text-stone-500'}`}>
                      {featureImage.caption}
                    </p>
                  )}
                </div>
              </section>
            )}

            {narratives?.length > 0 && (
              <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 text-stone-900 md:text-stone-800">
                {rhythmInserts?.[0] && <RhythmInsert text={rhythmInserts[0]} align="center" />}
                {narratives.map((narrative, i) => renderNarrativeItem(narrative, i))}
              </div>
            )}
          </>
        )}

        {renderEditorial(EDITORIAL_PLACEMENTS.AFTER_NARRATIVE)}
        {renderEditorial(EDITORIAL_PLACEMENTS.BEFORE_BRIDGE)}

        {/* 4. Subsections and/or context map */}
        {sections?.length > 0 && locationData.coords ? (
          <SubsectionNavigator
            locationCoords={locationData.coords}
            sections={sections}
            contextText={locationData.spatialContext}
            heading={subsectionHeading}
            showContextMap={shouldShowContextMap}
            sectionId={exploreSectionId}
          />
        ) : shouldShowContextMap && locationData.coords ? (
          <div className="w-full mt-4 mb-0 relative z-10">
            <p className="text-stone-500 text-xs uppercase tracking-widest text-center mb-10">
              Where these fragments exist
            </p>
            <ContextMap
              markers={[locationData.coords]}
              zoomToId={locationData.coords.id}
              geography={locationData.coords.geography}
              locationContext={locationData.spatialContext}
              showTitle={false}
              lightBackground={true}
            />
          </div>
        ) : null}

        {/* 3. BRIDGE — sits above the pre-gallery editorial card, not inside it */}
        {bridgeQuote && (
          <BridgeQuote
            quote={bridgeQuote}
            useHandwriting={config.bridgeHandwriting}
            variant={variant === 'immersive' ? 'paper' : 'light'}
          />
        )}

        {renderEditorial(EDITORIAL_PLACEMENTS.BEFORE_GALLERY, undefined, 'relative z-10 mb-8')}

        {/* 5. GALLERY */}
        {galleryImages?.length > 0 && (
          <section id="gallery" className="relative w-full mt-10 z-0">
            <GalleryWall
              images={galleryImages}
              backgroundImage={galleryBackground}
              heading={config.galleryHeading}
            />
          </section>
        )}

        {renderEditorial(EDITORIAL_PLACEMENTS.AFTER_GALLERY)}

        {/* 6. REFLECTIVE CLOSE */}
        <CloseBlock text={reflectiveClose} style={config.closeStyle} />

        {/* 7. OPTIONAL NAV PILLS — return + next */}
        {(returnLink || nextLink) && (
          <div className="w-full max-w-lg mx-auto flex flex-row items-stretch justify-center gap-3 sm:gap-4 mt-8 mb-16 px-4">
            {returnLink && (
              <Link
                to={returnLink.path}
                className={`flex-1 min-w-[140px] max-w-[220px] flex flex-row items-center justify-center ${tw.rio.gold} hover:text-gold transition-colors bg-stone-950/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-lg`}
              >
                <span className="text-lg mr-1.5 shrink-0">←</span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center leading-tight">
                  {returnLink.label}
                </span>
              </Link>
            )}
            {nextLink && (
              <Link
                to={nextLink.path}
                className={`flex-1 min-w-[140px] max-w-[220px] flex flex-row items-center justify-center ${tw.rio.gold} hover:text-gold transition-colors bg-stone-950/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-lg`}
              >
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center leading-tight">
                  {nextLink.label}
                </span>
                <span className="text-lg ml-1.5 shrink-0">→</span>
              </Link>
            )}
          </div>
        )}

          </>
        )}
      </div>
    </>
  );
}

export default LightTemplate;
