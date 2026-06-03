import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { tw } from '../../styles';
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

/**
 * DENSE EDITORIAL TEMPLATE (São Paulo style)
 * 
 * Use for: Urban destinations, complex cultural narratives, layered content
 * Characteristics: Multiple text blocks, galleries, subsections, fast pacing
 * 
 * Pacing: Hero → Intro Grid → Rhythm Insert → Narrative Split → 
 *         Bridge → Map/Navigator → Gallery → Reflective Close
 */

function DenseEditorialTemplate({ 
  locationData,
  heroImage,
  intro,
  sidebarImage,
  rhythmText,
  narrative,
  bridgeQuote,
  sections,
  galleryImages,
  galleryBackground,
  reflectiveClose,
  signatureStyle // optional: apply signature object styling
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
        <SEO {...locationData.seo} type="article" />

        {/* 1. HERO */}
        <LocationHero 
          imageSrc={heroImage.src} 
          alt={heroImage.alt}
          overlayOpacity={30}
        />

        {/* 2. INTRO GRID */}
        <IntroGrid
          title={locationData.name}
          paragraphs={intro.paragraphs}
          sidebarImage={sidebarImage}
        />

        {/* 3. CITY SNAPSHOT */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 mt-8">
          <p className="text-lg md:text-xl leading-relaxed text-text-tertiary">
            {intro.snapshot}
          </p>
        </section>

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
        <BridgeQuote quote={bridgeQuote} />

        {/* 7. MAP + SUBSECTION NAVIGATOR */}
        <SubsectionNavigator
          locationCoords={locationData.coords}
          sections={sections}
          contextText={locationData.spatialContext}
        />

        {/* 8. GALLERY */}
        <section id="gallery" className="relative pb-12 w-full">
          <div className="w-full">
            <div className="w-full bg-stone-800/10 p-6 text-center">
              <h2 className={`text-4xl md:text-6xl font-bold font-handwriting ${tw.rio.cream}`}>
                {locationData.name} Gallery
              </h2>
            </div>
            <GalleryWall
              images={galleryImages}
              openLightbox={(index) => setGalleryLightboxIndex(index)}
              backgroundImage={galleryBackground}
            />
          </div>
        </section>

        {/* 9. REFLECTIVE CLOSE */}
        <ReflectiveClose text={reflectiveClose} />
      </div>
    </>
  );
}

export default DenseEditorialTemplate;
