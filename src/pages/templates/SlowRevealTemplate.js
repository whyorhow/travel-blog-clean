import React, { useState } from 'react';
import SEO from '../../components/SEO';
import {
  LocationHero,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../../components/layout';
import SimpleLightbox from '../../components/SimpleLightbox';

/**
 * SLOW REVEAL TEMPLATE (Tennessee/Athens style)
 * 
 * Use for: Historical destinations, cultural depth, contemplative journeys
 * Characteristics: Multiple rhythm inserts, vintage textures, unhurried pacing
 * 
 * Pacing: Hero → Text Block → Rhythm Insert → Narrative Split → 
 *         Rhythm Insert → Bridge → Subsection Navigator → Reflective Close
 */

function SlowRevealTemplate({ 
  locationData,
  heroImage,
  intro,
  rhythmInserts, // Array of atmospheric moments
  narratives, // Array of narrative splits
  bridgeQuote,
  sections,
  galleryImages,
  reflectiveClose,
  paperTexture = true // Use aged paper background
}) {
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);

  const paperBg = paperTexture ? {
    backgroundColor: '#f5f0e8',
    backgroundImage: `url(${require('../../assets/Backgrounds/PaperTexture.jpg')})`,
    backgroundBlendMode: 'multiply',
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed',
  } : {};

  return (
    <>
      <SimpleLightbox
        images={galleryImages}
        currentIndex={galleryLightboxIndex}
        setCurrentIndex={setGalleryLightboxIndex}
      />

      <div 
        className="min-h-screen pb-16 text-text-primary"
        style={paperBg}
      >
        <SEO {...locationData.seo} />

        {/* 1. HERO */}
        <LocationHero 
          imageSrc={heroImage.src} 
          alt={heroImage.alt}
          overlayOpacity={35}
        />

        {/* 2. INTRO — Single column, centered, generous spacing */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-hero text-gold mb-12 text-center">
            {locationData.name}
          </h1>
          {intro.paragraphs.map((text, index) => (
            <p 
              key={index}
              className="text-body leading-relaxed mb-8 text-text-secondary"
            >
              {text}
            </p>
          ))}
        </section>

        {/* 3. RHYTHM INSERT — First atmospheric pause */}
        <RhythmInsert 
          text={rhythmInserts[0]} 
          align="center"
        />

        {/* 4. NARRATIVE SEQUENCE — Multiple splits with rhythm between */}
        {narratives.map((narrative, index) => (
          <React.Fragment key={index}>
            <NarrativeSplit
              image={narrative.image}
              heading={narrative.heading}
              paragraph={narrative.paragraph}
              imageLeft={index % 2 === 0} // Alternate sides
            />
            
            {/* Rhythm insert between narratives (except after last) */}
            {index < narratives.length - 1 && rhythmInserts[index + 1] && (
              <RhythmInsert 
                text={rhythmInserts[index + 1]}
                align="center"
              />
            )}
          </React.Fragment>
        ))}

        {/* 5. BRIDGE — Major transition */}
        <BridgeQuote 
          quote={bridgeQuote} 
          useHandwriting={true}
        />

        {/* 6. MAP + NAVIGATOR */}
        <SubsectionNavigator
          locationCoords={locationData.coords}
          sections={sections}
          contextText={locationData.spatialContext}
        />

        {/* 7. REFLECTIVE CLOSE — Aged, vintage styling */}
        <section className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div 
            className="p-8 border-2 border-gold/30 rounded-sm"
            style={{
              background: 'linear-gradient(to bottom, rgba(184,134,11,0.05), rgba(184,134,11,0.1))',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)'
            }}
          >
            <p className="text-xl leading-relaxed text-text-tertiary font-cormorant italic">
              {reflectiveClose}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default SlowRevealTemplate;
