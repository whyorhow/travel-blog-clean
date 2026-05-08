import React from "react";
import { DenseTemplate } from "./templates";
import destinations from "../assets/destinations.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import artImages from "../assets/artImages.json";
import SaoPauloGallery from "../components/SaoPauloGallery";

import diaryHero from "../assets/images/SaoPaulo-Diary.webp";
import galleryBg from "../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp";

const SP_FOLDERS = ["/SaoPauloLanding/small/", "/SP-Parks/small/", "/ArtGallery/small/", "/Murals/small/", "/CarnivalSP/small/"];

const galleryImages = artImages
  .filter(img => img.image && SP_FOLDERS.some(folder => img.image.includes(folder)))
  .map(img => {
    let sizeClass = 'small';
    let isAnchor = false;
    let contextLine = null;

    if (img.image.includes('/ArtGallery/')) {
      sizeClass = 'large';
      isAnchor = img.title.toLowerCase().includes('cathedral') || img.title.toLowerCase().includes('museum');
      contextLine = "Works are often experienced in suspension, not on walls.";
    } else if (img.image.includes('/CarnivalSP/')) {
      sizeClass = img.image.includes('wide') ? 'wide' : 'tall';
      contextLine = "A year of preparation compressed into a single night.";
    } else if (img.image.includes('/Murals/')) {
      sizeClass = 'wide';
      contextLine = "Street art here doesn't stay within boundaries.";
    } else if (img.image.includes('/SP-Parks/')) {
      sizeClass = Math.random() > 0.7 ? 'large' : 'small';
      contextLine = "Green space is threaded through the city rather than set apart from it.";
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
      isAnchor,
      theme: img.category || 'general',
      energy: img.image.includes('/CarnivalSP/') ? 'high' :
              img.image.includes('/SP-Parks/') ? 'low' : 'medium',
      contextLine
    };
  });

const locationData = {
  name: 'São Paulo',
  seo: {
    title: 'São Paulo | Nomad Scribbles',
    description: 'Fragments of São Paulo - parks, art, carnival, and the spaces in between.'
  },
  coords: destinations.find(d => d.id === 'saopaulo'),
  spatialContext: 'The distances between places are rarely as short as they look. Neighbourhoods shift character long before they connect physically.',
};

function SaoPaulo() {
  return (
    <DenseTemplate
      variant="megacity"
      locationData={locationData}
      heroImage={{ src: diaryHero, alt: 'São Paulo skyline' }}
      intro={{
        paragraphs: [
          'São Paulo is vast. It feels like a city that contains almost everything at once - industry, culture, nature, food, and nightlife existing side by side.',
          'Different parts of the city feel almost like different worlds. Some areas feel familiar in rhythm and layout, almost European in tone, while others are unmistakably Brazilian - dense, energetic, and deeply social.',
          "There's also a strong Japanese influence, especially in neighbourhoods like Liberdade.",
          'Paulistas are proud of their city. Many build their lives within it - careers, families, routines - and never feel the need to leave.'
        ],
        snapshot: "São Paulo is the largest city in Brazil, but that doesn't explain it. It holds more than twelve million people, yet still feels internally divided. A city that doesn't reveal itself all at once."
      }}
      sidebarImage={{
        src: '/images/SaoPauloLanding/small/Street2.webp',
        alt: 'Liberdade street level view in São Paulo',
        caption: 'Liberdade is experienced at street level. It also holds the largest Japanese community outside Japan.'
      }}
      rhythmText="Dinner rarely marks the end of anything here. The city tends to stretch its evenings further than expected."
      narrative={{
        image: { src: cloudinaryUrlFromLegacyPath('/images/SaoPauloLanding/pizza.webp', { width: 1200 }), alt: 'Pizza São Paulo' },
        heading: 'A Quiet Religion',
        paragraph: "Pizza in São Paulo is a quiet ritual. Thin bases, soft centres, eaten late. Every neighbourhood claims its version. Sitting down to share one feels like stepping briefly into the city's everyday rhythm."
      }}
      bridgeQuote="These moments only sketch the surface. Beyond them, the city opens outward."
      sections={[
        { title: 'Green Spaces', path: '/brazil/saopaulo/green-spaces' },
        { title: 'Street Murals', path: '/brazil/saopaulo/street-murals' },
        { title: 'Art & Galleries', path: '/brazil/saopaulo/art-galleries' },
        { title: 'Carnival', path: '/brazil/saopaulo/carnival' }
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      GalleryComponent={SaoPauloGallery}
      reflectiveClose="São Paulo never fully reveals itself. It offers fragments - and leaves the rest for you to find."
    />
  );
}

export default SaoPaulo;
