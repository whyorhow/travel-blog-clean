import React, { useState, useMemo, useCallback } from 'react';
import { useStaticHeroBelowFoldGate } from '../../utils/staticHeroScrollGate';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import {
  LocationHero,
  IntroGrid,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose,
  HeroSpreadLightbox,
} from '../../components/layout';
import GalleryWall from '../../components/GalleryWall';
import SimpleLightbox from '../../components/SimpleLightbox';
import {
  EditorialBlocks,
  getAtmosphere,
  resolveSurfaceContext,
  normalizeEditorialBlocks,
  getBlocksForPlacement,
  EDITORIAL_PLACEMENTS,
} from '../../components/editorial';
import { cloudinaryImageUrl } from '../../utils/cloudinary';
import { tw, tokens } from '../../styles';

/**
 * DENSE EDITORIAL TEMPLATE
 *
 * Core identity: exploration + navigation + layered discovery
 *
 * Use for: Destinations that reward investigation. Complex cities, multi-thread
 * narratives, places you could return to many times.
 *
 * VARIANTS — each defines a tonal flavour within the same structure:
 *
 *   "megacity"   → São Paulo-style. Full pacing with snapshot, fast editorial energy.
 *                  Includes: IntroGrid, snapshot text, NarrativeSplit, RhythmInsert,
 *                            BridgeQuote, SubsectionNavigator, Gallery, ReflectiveClose
 *
 *   "industrial" → Leaner megacity. No snapshot block.
 *                  Removes the city-stat snapshot, keeps everything else.
 *
 * Shared required props: locationData, heroImage, intro, sidebarImage, narrative,
 * bridgeQuote, sections, galleryImages, reflectiveClose
 *
 * Optional personal layer:
 *   editorialBlocks — config-driven blocks (memory, favourite-place, etc.)
 *   atmosphere — tonal styling ('brazil', 'default', …)
 *
 * Structure: Hero → IntroGrid → [AFTER_INTRO] → [snapshot?] → NarrativeSplit →
 *            [AFTER_NARRATIVE] → RhythmInsert → [BEFORE_BRIDGE] → Bridge →
 *            Navigator → [BEFORE_GALLERY] → Gallery → Close
 */

// ── Variant config ────────────────────────────────────────────────────────────

const VARIANT_CONFIG = {
  megacity: {
    overlayOpacity: 30,
    showSnapshot: true,
    galleryHeading: null, // falls back to `{locationData.name} Gallery`
    bridgeHandwriting: false,
  },
  industrial: {
    overlayOpacity: 35,
    showSnapshot: false,
    galleryHeading: null,
    bridgeHandwriting: false,
  },
};

// ── Template ──────────────────────────────────────────────────────────────────

function DenseTemplate({
  variant = 'megacity',
  locationData,
  heroImage,
  intro,           // { paragraphs: string[], snapshot?: string }
  sidebarImage,
  rhythmText,
  narrative,       // { image, heading, paragraph, imageLeft? }
  bridgeQuote,
  sections,
  galleryImages,
  galleryBackground,
  reflectiveClose,
  GalleryComponent, // optional: override default GalleryWall with a custom gallery
  returnLink,
  nextLink,
  editorialBlocks,
  atmosphere = 'default',
  journalMap = null,
  introSectionId,
  narrativeSectionId,
  exploreSectionId,
  showContextMap = true,
  skipHero = false,
}) {
  const [editorialLightboxImage, setEditorialLightboxImage] = useState(null);
  const [heroLightboxOpen, setHeroLightboxOpen] = useState(false);
  const [deferBelowFold, setDeferBelowFold] = useState(
    () =>
      skipHero &&
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
  );

  useStaticHeroBelowFoldGate(deferBelowFold, setDeferBelowFold);

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.megacity;
  const galleryHeading = config.galleryHeading ?? `${locationData.name} Gallery`;
  const atmosphereConfig = getAtmosphere(atmosphere);
  const editorialSurface = resolveSurfaceContext(variant);

  const normalizedEditorial = useMemo(
    () => normalizeEditorialBlocks(editorialBlocks),
    [editorialBlocks]
  );

  const handleEditorialImageClick = useCallback((img) => {
    if (!img?.src) return;
    setEditorialLightboxImage({
      image: cloudinaryImageUrl(img.lightboxSrc ?? img.src, { width: 1200, format: 'webp' }),
      title: img.lightboxAlt || img.alt || '',
      description: img.caption || '',
    });
  }, []);

  const renderEditorial = useCallback((placement, afterNarrativeIndex) => {
    const blocks = getBlocksForPlacement(normalizedEditorial, placement, afterNarrativeIndex);
    if (!blocks.length) return null;
    return (
      <EditorialBlocks
        blocks={blocks}
        atmosphere={atmosphereConfig}
        surface={editorialSurface}
        onImageClick={handleEditorialImageClick}
      />
    );
  }, [normalizedEditorial, atmosphereConfig, editorialSurface, handleEditorialImageClick]);

  return (
    <>
      {editorialLightboxImage && (
        <SimpleLightbox
          images={[editorialLightboxImage]}
          currentIndex={0}
          setCurrentIndex={(v) => { if (v === null) setEditorialLightboxImage(null); }}
        />
      )}
      {heroLightboxOpen && heroImage?.lightboxSrc && (
        <HeroSpreadLightbox
          spreadSrc={heroImage.lightboxSrc}
          textFocusSrc={heroImage.textFocusSrc ?? heroImage.src}
          spreadAlt={heroImage.lightboxAlt || heroImage.alt}
          textFocusAlt={heroImage.textFocusAlt || heroImage.alt}
          textFocusBackground={heroImage.textFocusBackground}
          hotspot={heroImage.textFocusHotspot}
          onClose={() => setHeroLightboxOpen(false)}
        />
      )}

      <div className="min-h-screen pb-16">
        <SEO
          {...locationData.seo}
          type="article"
          preloadImage={skipHero ? undefined : heroImage.preloadSrc || heroImage.src}
        />

        {/* 1. HERO — skipped when static HTML hero is LCP (mobile shell) */}
        {!skipHero && (
          <LocationHero
            imageSrc={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes={heroImage.sizes}
            width={heroImage.width}
            height={heroImage.height}
            priority={heroImage.priority !== false}
            alt={heroImage.alt}
            overlayOpacity={config.overlayOpacity}
            objectPosition={heroImage.objectPosition}
            onImageClick={heroImage.lightboxSrc ? () => setHeroLightboxOpen(true) : undefined}
          />
        )}

        {/* Below-fold — scroll-gated when static HTML hero is LCP (mobile shell) */}
        {!deferBelowFold && (
          <>
            <IntroGrid
              title={locationData.name}
              paragraphs={intro.paragraphs}
              sidebarImage={sidebarImage}
              sectionId={introSectionId}
            />

            {renderEditorial(EDITORIAL_PLACEMENTS.AFTER_INTRO)}

            {journalMap}

            {config.showSnapshot && intro.snapshot && (
              <section className="max-w-5xl mx-auto px-6 md:px-12 mt-8">
                <p className={tokens.typography.body.tailwind + ' ' + tw.textTertiary}>
                  {intro.snapshot}
                </p>
              </section>
            )}

            <NarrativeSplit
              image={narrative.image}
              heading={narrative.heading}
              paragraph={narrative.paragraph}
              imageLeft={narrative.imageLeft ?? true}
              sectionId={narrativeSectionId}
            />

            {renderEditorial(EDITORIAL_PLACEMENTS.AFTER_NARRATIVE)}

            <RhythmInsert text={rhythmText} />

            {renderEditorial(EDITORIAL_PLACEMENTS.BEFORE_BRIDGE)}

            <BridgeQuote
              quote={bridgeQuote}
              useHandwriting={config.bridgeHandwriting}
            />

            <SubsectionNavigator
              locationCoords={locationData.coords}
              sections={sections}
              contextText={locationData.spatialContext}
              showContextMap={showContextMap}
              sectionId={exploreSectionId}
            />

            {renderEditorial(EDITORIAL_PLACEMENTS.BEFORE_GALLERY)}

            {GalleryComponent ? (
              <div id="gallery">
                <GalleryComponent
                  images={galleryImages}
                  backgroundImage={galleryBackground}
                />
              </div>
            ) : (
              <section id="gallery" className="relative pb-12 w-full">
                <div className="w-full">
                  <div className="w-full bg-stone-800/10 p-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-handwriting" style={{ color: tokens.colors.background.paper }}>
                      {galleryHeading}
                    </h2>
                  </div>
                  <GalleryWall
                    images={galleryImages}
                    backgroundImage={galleryBackground}
                  />
                </div>
              </section>
            )}

            <ReflectiveClose text={reflectiveClose} />

            {(returnLink || nextLink) && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-16 px-4">
                {returnLink && (
                  <Link
                    to={returnLink.path}
                    className={`flex flex-row items-center justify-center text-editorialGold hover:text-editorialCream transition-colors bg-stone-950/80 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg`}
                  >
                    <span className="text-lg mr-2">←</span>
                    <span className="text-xs md:text-sm font-bold tracking-widest uppercase">{returnLink.label}</span>
                  </Link>
                )}
                {nextLink && (
                  <Link
                    to={nextLink.path}
                    className={`flex flex-row items-center justify-center text-editorialGold hover:text-editorialCream transition-colors bg-stone-950/80 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 shadow-lg`}
                  >
                    <span className="text-xs md:text-sm font-bold tracking-widest uppercase">{nextLink.label}</span>
                    <span className="text-lg ml-2">→</span>
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

export default DenseTemplate;
