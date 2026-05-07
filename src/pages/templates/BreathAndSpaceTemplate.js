import React, { useState } from 'react';
import SEO from '../../components/SEO';
import {
  LocationHero,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../../components/layout';
import GalleryWall from '../../components/GalleryWall';
import SimpleLightbox from '../../components/SimpleLightbox';

/**
 * BREATH & SPACE TEMPLATE (Ilha Grande style)
 * 
 * Use for: Natural destinations, beach/island locations, contemplative mood
 * Characteristics: Large imagery, minimal text, generous negative space, slower pacing
 * 
 * Pacing: Hero → Minimal Intro → Large Image → Bridge → 
 *         Wide Gallery → Reflective Close
 */

function BreathAndSpaceTemplate({ 
  locationData,
  heroImage,
  introText, // Single short paragraph
  largeFeatureImage, // Full-width statement image
  bridgeQuote,
  sections,
  galleryImages,
  galleryBackground,
  reflectiveClose,
  signatureStyle
}) {
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);

  return (
    <>
      <SimpleLightbox
        images={galleryImages}
        currentIndex={galleryLightboxIndex}
        setCurrentIndex={setGalleryLightboxIndex}
      />

      <div className="min-h-screen pb-16">
        <SEO {...locationData.seo} />

        {/* 1. HERO — Large, immersive */}
        <LocationHero 
          imageSrc={heroImage.src} 
          alt={heroImage.alt}
          overlayOpacity={20} // Lighter overlay for natural light
        />

        {/* 2. MINIMAL INTRO — Just one thought */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold text-gold mb-8">
            {locationData.name}
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-text-secondary max-w-2xl mx-auto">
            {introText}
          </p>
        </section>

        {/* 3. LARGE FEATURE IMAGE — Statement moment */}
        <section className="w-full py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-image shadow-image">
              <img
                src={largeFeatureImage.src}
                alt={largeFeatureImage.alt}
                className="w-full h-auto object-cover"
              />
            </div>
            {largeFeatureImage.caption && (
              <p className="text-sm text-text-muted mt-4 text-center italic">
                {largeFeatureImage.caption}
              </p>
            )}
          </div>
        </section>

        {/* 4. BRIDGE — Emotional transition */}
        <BridgeQuote quote={bridgeQuote} useHandwriting={true} />

        {/* 5. OPTIONAL: MAP + NAVIGATOR (if subsections exist) */}
        {sections && sections.length > 0 && (
          <SubsectionNavigator
            locationCoords={locationData.coords}
            sections={sections}
            heading="Explore"
          />
        )}

        {/* 6. WIDE GALLERY — Images breathe */}
        <section id="gallery" className="relative py-16 w-full">
          <div 
            className="w-full min-h-[80vh]"
            style={galleryBackground ? {
              backgroundImage: `url(${galleryBackground})`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed'
            } : {}}
          >
            <div className="p-8">
              <GalleryWall
                images={galleryImages}
                openLightbox={(index) => setGalleryLightboxIndex(index)}
                spacing="relaxed" // Wider gaps between images
              />
            </div>
          </div>
        </section>

        {/* 7. REFLECTIVE CLOSE — Quiet ending */}
        <ReflectiveClose text={reflectiveClose} />
      </div>
    </>
  );
}

export default BreathAndSpaceTemplate;
