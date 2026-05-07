/**
 * SAO PAULO — Refactored using layout components
 * 
 * This demonstrates how the original SaoPaulo.js would look
 * using the new reusable layout components.
 * 
 * Original: 308 lines
 * Refactored: ~80 lines + data object
 */

import React, { useState } from 'react';
import {
  LocationHero,
  IntroGrid,
  NarrativeSplit,
  RhythmInsert,
  BridgeQuote,
  SubsectionNavigator,
  ReflectiveClose
} from '../components/layout';
import GalleryWall from '../components/GalleryWall';
import SaoPauloGallery from '../components/SaoPauloGallery';
import SimpleLightbox from '../components/SimpleLightbox';
import SEO from '../components/SEO';
import destinations from '../assets/destinations.json';
import artImages from '../assets/artImages.json';
import { cloudinaryUrlFromLegacyPath } from '../utils/cloudinary';

// Assets
import diaryHero from '../assets/images/SaoPaulo-Diary.webp';
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';

// Image configuration (same as original)
const SP_FOLDERS = ['/SaoPauloLanding/small/', '/SP-Parks/small/', '/ArtGallery/small/', '/Murals/small/', '/CarnivalSP/small/'];

const galleryImages = artImages
  .filter(img => img.image && SP_FOLDERS.some(folder => img.image.includes(folder)))
  .map(img => {
    let sizeClass = 'small';
    let contextLine = null;

    if (img.image.includes('/ArtGallery/')) {
      sizeClass = 'large';
      contextLine = 'Works are often experienced in suspension, not on walls.';
    } else if (img.image.includes('/CarnivalSP/')) {
      sizeClass = img.image.includes('wide') ? 'wide' : 'tall';
      contextLine = 'A year of preparation compressed into a single night.';
    } else if (img.image.includes('/Murals/')) {
      sizeClass = 'wide';
      contextLine = 'Street art here does not stay within boundaries.';
    } else if (img.image.includes('/SP-Parks/')) {
      sizeClass = Math.random() > 0.7 ? 'large' : 'small';
      contextLine = 'Green space is threaded through the city rather than set apart from it.';
    }

    return {
      src: cloudinaryUrlFromLegacyPath(img.image),
      alt: img.title,
      imageId: img.id,
      image: img.image,
      lightboxImage: img.lightboxImage,
      title: img.title,
      description: img.description,
      category: img.category,
      gumroadLink: img.gumroadLink,
      shopLink: img.shopLink,
      storyLink: img.storyLink,
      sizeClass,
      theme: img.category || 'general',
      energy: img.image.includes('/CarnivalSP/') ? 'high' : img.image.includes('/SP-Parks/') ? 'low' : 'medium',
      contextLine
    };
  });

// Page content data
const PAGE_DATA = {
  seo: {
    title: 'São Paulo | Nomad Scribbles',
    description: 'Fragments of São Paulo - parks, art, carnival, and the spaces in between.'
  },
  name: 'São Paulo',
  coords: destinations.find(d => d.id === 'saopaulo'),
  spatialContext: 'The distances between places are rarely as short as they look. Neighbourhoods shift character long before they connect physically.',
  
  intro: {
    paragraphs: [
      'São Paulo is vast. It feels like a city that contains almost everything at once - industry, culture, nature, food, and nightlife existing side by side.',
      'Different parts of the city feel almost like different worlds. Some areas feel familiar in rhythm and layout, almost European in tone, while others are unmistakably Brazilian - dense, energetic, and deeply social.',
      "There's also a strong Japanese influence, especially in neighbourhoods like Liberdade.",
      'Paulistas are proud of their city. Many build their lives within it - careers, families, routines - and never feel the need to leave.'
    ],
    snapshot: 'São Paulo is the largest city in Brazil, but that does not explain it. It holds more than twelve million people, yet still feels internally divided. A city that does not reveal itself all at once.'
  },
  
  sidebarImage: {
    src: '/images/SaoPauloLanding/small/Street2.webp',
    alt: 'Liberdade street level view in São Paulo',
    caption: 'Liberdade is experienced at street level. It also holds the largest Japanese community outside Japan.'
  },
  
  narrative: {
    image: {
      src: '/images/SaoPauloLanding/pizza.webp',
      alt: 'Pizza São Paulo',
      width: 1200
    },
    heading: 'A Quiet Religion',
    paragraph: 'Pizza in São Paulo is a quiet ritual. Thin bases, soft centres, eaten late. Every neighbourhood claims its version. Sitting down to share one feels like stepping briefly into the city\'s everyday rhythm.'
  },
  
  rhythmText: 'Dinner rarely marks the end of anything here. The city tends to stretch its evenings further than expected.',
  
  bridgeQuote: 'These moments only sketch the surface. Beyond them, the city opens outward.',
  
  sections: [
    { title: 'Green Spaces', path: '/brazil/saopaulo/green-spaces' },
    { title: 'Street Murals', path: '/brazil/saopaulo/street-murals' },
    { title: 'Art & Galleries', path: '/brazil/saopaulo/art-galleries' },
    { title: 'Carnival', path: '/brazil/saopaulo/carnival' }
  ],
  
  reflectiveClose: 'São Paulo never fully reveals itself. It offers fragments - and leaves the rest for you to find.'
};

function SaoPauloRefactored() {
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);
  const { seo, name, coords, spatialContext, intro, sidebarImage, narrative, rhythmText, bridgeQuote, sections, reflectiveClose } = PAGE_DATA;

  return (
    <>
      <SimpleLightbox
        images={galleryImages}
        currentIndex={galleryLightboxIndex}
        setCurrentIndex={setGalleryLightboxIndex}
        debugId="SP_GALLERY"
      />

      <div className="min-h-screen pb-16">
        <SEO {...seo} />

        {/* Hero */}
        <LocationHero imageSrc={diaryHero} alt="São Paulo skyline" overlayOpacity={30} />

        {/* Main content container */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-6">
          {/* Title + Intro Grid */}
          <IntroGrid
            title={name}
            paragraphs={intro.paragraphs}
            sidebarImage={sidebarImage}
          />

          {/* City Snapshot */}
          <div className="mt-8">
            <p className="text-lg md:text-xl leading-relaxed text-text-tertiary">
              {intro.snapshot}
            </p>
          </div>
        </section>

        {/* Narrative Split */}
        <NarrativeSplit
          image={narrative.image}
          heading={narrative.heading}
          paragraph={narrative.paragraph}
        />

        {/* Rhythm Insert */}
        <RhythmInsert text={rhythmText} />

        {/* Bridge */}
        <BridgeQuote quote={bridgeQuote} />

        {/* Map + Subsection Navigator */}
        <SubsectionNavigator
          locationCoords={coords}
          sections={sections}
          contextText={spatialContext}
        />

        {/* Gallery */}
        <section id="gallery" className="relative pb-12 w-full">
          <div className="w-full">
            <div className="w-full bg-stone-800/10 p-6 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-[#f5f0e8] font-handwriting">
                {name} Gallery
              </h2>
            </div>
            <SaoPauloGallery
              images={galleryImages}
              openLightbox={(index) => setGalleryLightboxIndex(index)}
              backgroundImage={galleryBg}
            />
          </div>
        </section>

        {/* Reflective Close */}
        <ReflectiveClose text={reflectiveClose} />
      </div>
    </>
  );
}

export default SaoPauloRefactored;
