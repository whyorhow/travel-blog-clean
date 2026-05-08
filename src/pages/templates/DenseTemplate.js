import React, { useState } from 'react';
import SEO from '../../components/SEO';
import {
  LocationHero,
  IntroGrid,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../../components/layout';
import GalleryWall from '../../components/GalleryWall';
import SimpleLightbox from '../../components/SimpleLightbox';
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
 * Structure: Hero → IntroGrid → [snapshot?] → NarrativeSplit → RhythmInsert →
 *            Bridge → Navigator → Gallery → Close
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
}) {
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.megacity;
  const galleryHeading = config.galleryHeading ?? `${locationData.name} Gallery`;

  return (
    <>
      <SimpleLightbox
        images={galleryImages}
        currentIndex={galleryLightboxIndex}
        setCurrentIndex={setGalleryLightboxIndex}
      />

      <div className="min-h-screen pb-16">
        <SEO {...locationData.seo} />

        {/* 1. HERO */}
        <LocationHero
          imageSrc={heroImage.src}
          alt={heroImage.alt}
          overlayOpacity={config.overlayOpacity}
        />

        {/* 2. INTRO GRID */}
        <IntroGrid
          title={locationData.name}
          paragraphs={intro.paragraphs}
          sidebarImage={sidebarImage}
        />

        {/* 3. SNAPSHOT — megacity only */}
        {config.showSnapshot && intro.snapshot && (
          <section className="max-w-5xl mx-auto px-6 md:px-12 mt-8">
            <p className={tokens.typography.body.tailwind + ' ' + tw.textTertiary}>
              {intro.snapshot}
            </p>
          </section>
        )}

        {/* 4. NARRATIVE SPLIT */}
        <NarrativeSplit
          image={narrative.image}
          heading={narrative.heading}
          paragraph={narrative.paragraph}
          imageLeft={narrative.imageLeft ?? true}
        />

        {/* 5. RHYTHM INSERT */}
        <RhythmInsert text={rhythmText} />

        {/* 6. BRIDGE */}
        <BridgeQuote
          quote={bridgeQuote}
          useHandwriting={config.bridgeHandwriting}
        />

        {/* 7. MAP + SUBSECTION NAVIGATOR */}
        <SubsectionNavigator
          locationCoords={locationData.coords}
          sections={sections}
          contextText={locationData.spatialContext}
        />

        {/* 8. GALLERY */}
        {GalleryComponent ? (
          // Custom gallery owns its full section — no wrapper interference
          <div id="gallery">
            <GalleryComponent
              images={galleryImages}
              openLightbox={(index) => setGalleryLightboxIndex(index)}
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
                openLightbox={(index) => setGalleryLightboxIndex(index)}
                backgroundImage={galleryBackground}
              />
            </div>
          </section>
        )}

        {/* 9. REFLECTIVE CLOSE */}
        <ReflectiveClose text={reflectiveClose} />
      </div>
    </>
  );
}

export default DenseTemplate;
