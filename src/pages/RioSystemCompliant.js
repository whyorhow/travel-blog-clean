/**
 * RIO DE JANEIRO — System-Compliant Implementation
 * 
 * Structural alignment with São Paulo (canonical):
 * Same component sequence, same rhythm, same grammar.
 * Different content, different theme tokens.
 * 
 * This proves the system can express different personalities
 * while maintaining compositional consistency.
 */

import React, { useState } from 'react';
import {
  Hero,
  IntroGrid,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../components/layout';
import GalleryWall from '../components/GalleryWall';
import SimpleLightbox from '../components/SimpleLightbox';
import SEO from '../components/SEO';
import destinations from '../assets/destinations.json';
import artImages from '../assets/artImages.json';
import { tw, tokens } from '../styles';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from '../utils/cloudinary';
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { rioHeroConfig } from './brazil/rio/rio.hero.config';
import ContextMap from '../components/ContextMap';

// ============================================================================
// RIO-SPECIFIC CONFIGURATION
// ============================================================================

const RIO_COORDS = destinations.find(d => d.id === 'rio');

const RIO_DATA = {
  // Page density class: 'dense' = editorial hub | 'light' = destination page
  pageType: 'light',
  
  seo: {
    title: 'Rio de Janeiro | Nomad Scribbles',
    description: 'Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography.'
  },
  
  name: 'Rio de Janeiro',
  
  // For DiaryHero title treatment
  subtitle: 'The Marvellous City',
  
  // Spatial context for the map
  spatialContext: 'The city presses against the mountains, filling every flat space between forest and sea. Geography forces Rio upward rather than outward.',
  
  // Introduction content
  intro: {
    paragraphs: [
      'Rio is a city defined by its geography. Mountains rise directly from the sea, leaving narrow bands of flat land where dense neighbourhoods cling to the coastline.',
      'The city breathes differently than others. Morning mist settles in the valleys. Afternoon sun bakes the granite peaks. Evening brings cool air from the ocean, carrying sound and music upward through the streets.',
      'Carnival transforms the entire city into performance space. But even without it, Rio carries that energy daily — in beach culture, in street life, in the way the city moves to its own rhythm.',
      'Christ the Redeemer watches from above, arms open to a city that sprawls beneath him in layers of colour, noise, and heat.'
    ],
    snapshot: 'Rio is not a city you navigate easily. It unfolds in elevations, in sudden views, in the compression of daily life against dramatic stone.'
  },
  
  // Sidebar image
  sidebarImage: {
    imagePublicId: 'rio7',
    alt: 'Rio hillside neighbourhood at dusk',
    caption: 'From above, the city softens into shadow and colour across the hills and streets.'
  },
  
  // Narrative splits (content + image pairs)
  narratives: [
    {
      image: {
        imagePublicId: 'rio2',
        alt: 'Carnival at the Sambadrome',
        width: 1200
      },
      heading: 'Spectacle and Scale',
      paragraph: 'From the stands, the Sambadrome collapses into a dense field of light, sound, and movement. Each section performs with precision, but the scale of the crowd makes it clear that Carnival only works because it is shared. What looks overwhelming from a distance becomes cohesive only through collective effort.'
    },
    {
      image: {
        imagePublicId: 'rio8',
        alt: 'Rio geography from above',
        width: 1200
      },
      heading: 'Pressed to the Mountain',
      paragraph: 'Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio\'s geography leaves little room for sprawl; instead, it layers daily life vertically, compressing homes, streets, and routines against the hills.'
    }
  ],
  
  // Rhythm inserts (atmospheric pauses)
  rhythms: [
    'The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn\'t a backdrop — it sets the limits and the mood.',
    'The beach marks a shift in pace. Conversations slow. Bodies stretch. The city exhales. In Rio, the shoreline isn\'t an escape; it\'s where daily life loosens without ever fully stopping.'
  ],
  
  // Bridge transitions
  bridges: [
    'These fragments only sketch the surface. Beyond them, the city opens outward — toward Corcovado, toward the sea, toward the dense life that fills every valley.',
    'What remains is the feeling of elevation, of looking down at a city that never quite settles into stillness.'
  ],
  
  // Subsections for navigation
  subsections: [
    { title: 'Carnival & Culture', path: '/brazil/rio/carnival' },
    { title: 'Christ the Redeemer', path: '/brazil/rio/corcovado' },
    { title: 'Geography & Views', path: '/brazil/rio/geography' },
    { title: 'Beaches & Coast', path: '/brazil/rio/beaches' }
  ],
  
  // Reflective close
  reflectiveClose: 'Rio never fully reveals itself. It offers moments — carnival, sunset, the view from a peak — and leaves the rest for you to discover in the climb.'
};

// ============================================================================
// GALLERY DATA
// ============================================================================

const GALLERY_ORDER = [
  'rio1', 'rio2', 'rio3', 'rio4', 'rio5', 'rio6', 'rio7', 'rio8', 
  'rio9', 'rio10', 'rio11', 'rio12', 'rio13', 'rio14'
];

const rioImages = artImages.filter(img => img.category === 'Rio');

const galleryImages = GALLERY_ORDER
  .map(id => rioImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => {
    // Use same publicId for both gallery and lightbox - just different widths
    const publicId = img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
    return {
      src: cloudinaryImageUrl(publicId, { width: 800 }),
      fullSrc: cloudinaryImageUrl(publicId, { width: 2000 }), // Same image, larger width
      image: img.image, // Legacy path for SimpleLightbox compatibility
      alt: img.title,
      imageId: img.id,
      title: img.title,
      description: img.description,
      sizeClass: img.id === 'rio1' ? 'wide' : img.id === 'rio9' ? 'tall' : 'small',
      theme: 'rio',
      energy: img.id.includes('carnival') ? 'high' : 'medium'
    };
  });

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function RioSystemCompliant() {
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);
  const { seo, pageType, intro, sidebarImage, narratives, rhythms, bridges, subsections, reflectiveClose } = RIO_DATA;
  
  // Page density class determines layout strategy:
  // 'dense' = full editorial system (subsecctions, map, navigation)
  // 'light' = unified narrative flow (optional map, no forced structure)

  const sidebarImageData = {
    // Use blogImagePublicId for non-z images (gallery uses z, page content uses non-z)
    src: rioImages.find(img => img.id === sidebarImage.imagePublicId)?.blogImagePublicId || 
         rioImages.find(img => img.id === sidebarImage.imagePublicId)?.imagePublicId ||
         getPublicIdFromLegacyPath(rioImages.find(img => img.id === sidebarImage.imagePublicId)?.image),
    alt: sidebarImage.alt,
    caption: sidebarImage.caption
  };

  return (
    <div className={tw.rio.pageBg}>
      <SimpleLightbox
        images={galleryImages}
        currentIndex={galleryLightboxIndex}
        setCurrentIndex={setGalleryLightboxIndex}
      />

      <SEO {...seo} />

      {/* 1. HERO — System resolves: diary → location → fallback → placeholder */}
      <Hero 
        heroConfig={rioHeroConfig}
        pageData={{ title: RIO_DATA.name, subtitle: RIO_DATA.subtitle }}
      />

      {/* 
        UNIFIED NARRATIVE CONTAINER (Light Page Strategy)
        For 'light' pages: intro + narratives + rhythm + bridge flow as ONE continuous unit
        No visual fragmentation between content sections
      */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
          style={{
            backgroundImage: `url(${paperTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'url(#torn-paper-filter)',
            opacity: 0.95,
          }}
        />

        <div className="max-w-5xl mx-auto px-6 md:px-12 py-6 relative z-20">
          {/* 2. INTRO GRID — Same pattern as São Paulo */}
          <IntroGrid
            title={RIO_DATA.name}
            paragraphs={intro.paragraphs}
            sidebarImage={sidebarImageData}
            variant="paper"
          />

          {/* City snapshot — Paper surface typography */}
          <div className="mt-12 pt-8 border-t border-[#6B5A49]/20">
            <p className={tw.surface.paper.lead}>
              {intro.snapshot}
            </p>
          </div>

          {/* 3. NARRATIVE SPLITS — Unified inside container for light pages */}
          {narratives[0] && (
            <NarrativeSplit
              image={{
                // Use blogImagePublicId for non-z images (gallery uses z, page content uses non-z)
                src: rioImages.find(img => img.id === narratives[0].image.imagePublicId)?.blogImagePublicId || 
                     rioImages.find(img => img.id === narratives[0].image.imagePublicId)?.imagePublicId ||
                     getPublicIdFromLegacyPath(rioImages.find(img => img.id === narratives[0].image.imagePublicId)?.image),
                alt: narratives[0].image.alt,
                width: narratives[0].image.width
              }}
              heading={narratives[0].heading}
              paragraph={narratives[0].paragraph}
              flip={false}
              variant="paper"
              accentColor={tw.surface.paper.accent}
            />
          )}

          {/* 
            4. ORIENTATION MAP — Midpoint grounding device (light pages only)
            
            EDITORIAL ROLE: Geographic grounding, not navigation
            - Dense pages: Map = branching mechanism, "explore the network"
            - Light pages: Map = orientation artifact, "where this memory exists"
            
            POSITIONING: After first narrative split
            - Reader has emotionally entered the place
            - Map quietly contextualizes before narrative continues
            
            VISUAL TREATMENT: 
            - ~40-50% of São Paulo's footprint
            - Centered, softer borders
            - More "annotated journal insert" than "UI component"
            - No subsection cards, no branching pathways
          */}
          {RIO_COORDS && pageType === 'light' && (
            <div className="my-12 py-8 border-y border-stone-700/30">
              <div className="max-w-2xl mx-auto">
                <p className="text-stone-500 text-xs uppercase tracking-widest text-center mb-4">
                  Where these fragments exist
                </p>
                <ContextMap
                  markers={[{
                    id: 'rio',
                    name: 'Rio de Janeiro',
                    lat: RIO_COORDS.lat,
                    lng: RIO_COORDS.lng,
                    type: 'destination'
                  }]}
                  geography="brazil"
                  locationContext={RIO_DATA.spatialContext}
                  showTitle={false}
                  transparent={true}
                  lightBackground={true}
                />
                <p className="text-stone-600 text-sm italic text-center mt-3 font-handwriting">
                  {RIO_DATA.spatialContext}
                </p>
              </div>
            </div>
          )}

          {/* Second narrative split */}
          {narratives[1] && (
            <NarrativeSplit
              image={{
                // Use blogImagePublicId for non-z images (gallery uses z, page content uses non-z)
                src: rioImages.find(img => img.id === narratives[1].image.imagePublicId)?.blogImagePublicId || 
                     rioImages.find(img => img.id === narratives[1].image.imagePublicId)?.imagePublicId ||
                     getPublicIdFromLegacyPath(rioImages.find(img => img.id === narratives[1].image.imagePublicId)?.image),
                alt: narratives[1].image.alt,
                width: narratives[1].image.width
              }}
              heading={narratives[1].heading}
              paragraph={narratives[1].paragraph}
              flip={true}
              variant="paper"
              accentColor={tw.surface.paper.accent}
            />
          )}

          {/* 6. RHYTHM INSERT — Atmospheric pause (inside unified flow) */}
          <RhythmInsert text={rhythms[0]} variant="paper" />

          {/* 7. BRIDGE QUOTE — Transitional moment (inside unified flow) */}
          <BridgeQuote quote={bridges[0]} variant="paper" />

          {/* 8. REFLECTIVE CLOSE — Authored narrative conclusion (inside unified flow) */}
          {/* Part of the journal entry, before gallery's free exploration */}
          {reflectiveClose && (
            <ReflectiveClose 
              text={reflectiveClose} 
              variant="paper"
              // Uses default paper gold from SURFACE_MAP
            />
          )}
        </div>
      </div>

      {/* 
        DENSE PAGE ONLY: Subsection Navigator with Map
        For 'light' pages: skip this entirely (no forced structural scaffolding)
        For 'dense' pages: show full navigation system
      */}
      {pageType === 'dense' && subsections?.length > 0 && (
        <SubsectionNavigator
          locationCoords={RIO_COORDS}
          sections={subsections}
          contextText={RIO_DATA.spatialContext}
        />
      )}

      {/* 
        SECOND RHYTHM — Optional for light pages
        Only show if rhythms[1] exists AND page is dense OR we want extra pacing
      */}
      {rhythms[1] && (
        <RhythmInsert text={rhythms[1]} variant="dark" />
      )}

      {/* 
        7. GALLERY — Observational archive (outside unified container)
        
        STATE CHANGE:
        - Inside paper: authored narrative, controlled pacing, guided reading
        - Outside (gallery): free exploration, looser interaction
        
        EMOTIONAL FRAMING:
        "Further Fragments" = beyond the written account
        "Uncatalogued Moments" = outside formal narrative record
        Subtle cue that gallery exists beyond the journal entry
      */}
      <section id="gallery" className="relative pb-12 w-full">
        <div className="w-full bg-stone-800/10 p-6 text-center">
          <h2 className={`text-4xl md:text-6xl font-bold font-handwriting ${tw.rio.gold}`}>
            Further Fragments
          </h2>
          <p className="text-stone-500 text-sm mt-2 tracking-wider uppercase">
            Beyond the written account
          </p>
        </div>
        <GalleryWall
          images={galleryImages}
          openLightbox={(index) => setGalleryLightboxIndex(index)}
          backgroundImage={paperTexture}
        />
      </section>

      {/* SVG Filter for torn paper effect */}
      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <defs>
          <filter id="torn-paper-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default RioSystemCompliant;
