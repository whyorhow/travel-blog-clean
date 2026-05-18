import React from "react";
import { DenseTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import destinations from "../assets/destinations.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import saoPauloArt from "../assets/artImages/slices/bundles/saopaulo.json";

import galleryBg from "../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp";

const SAO_PAULO_HERO_ID = "SaoPauloLanding/SaoPaulo-Hero";

const img = (id, alt) => {
  const entry = saoPauloArt.find(i => i.id === id);
  if (!entry) return null;
  return {
    src: entry.cloudinary.blog,
    lightboxSrc: entry.cloudinary.lightbox,
    alt: alt || entry.title,
  };
};

const stableHash = (str) => [...String(str || '')].reduce((a, c) => a + c.charCodeAt(0), 0);

const galleryImages = saoPauloArt
  .map(img => {
    let sizeClass = 'small';
    let isAnchor = false;
    let contextLine = null;

    if (img.category === 'ArtGallery') {
      sizeClass = 'large';
      isAnchor = img.title.toLowerCase().includes('cathedral') || img.title.toLowerCase().includes('museum');
      contextLine = "Works are often experienced in suspension, not on walls.";
    } else if (img.category === 'Carnival') {
      sizeClass = 'tall';
      contextLine = "A year of preparation compressed into a single night.";
    } else if (img.category === 'Murals') {
      sizeClass = 'wide';
      contextLine = "Street art here doesn't stay within boundaries.";
    } else if (img.category === 'Parks') {
      sizeClass = stableHash(img.id) % 3 === 0 ? 'large' : 'small';
      contextLine = "Green space is threaded through the city rather than set apart from it.";
    }

    return {
      src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
      image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
      fallbackSrc: cloudinaryImageUrl(img.cloudinary.blog, { width: 800 }),
      alt: img.title,
      imageId: img.cloudinary.gallery,
      cloudinary: img.cloudinary,
      title: img.title,
      description: img.description,
      category: img.category,
      gumroadLink: img.gumroadLink,
      shopLink: img.shopLink,
      storyLink: img.storyLink,
      sizeClass,
      isAnchor,
      theme: img.category || 'general',
      energy: img.category === 'Carnival' ? 'high' : img.category === 'Parks' ? 'low' : 'medium',
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

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo does not reveal itself in one visit. It holds industry, culture, parks, and nightlife side by side — neighbourhoods that feel like different cities long before they connect on a map.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'local-tip',
    title: 'Let rain reset the pace',
    text: 'Sudden downpours reshape the street for a few minutes — umbrellas, steam, reflections. It is still the megacity, but urgency loosens just enough to notice again.',
    location: 'Centro / Paulista',
    image: img('rain', 'Rain on São Paulo streets'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Fragments, not a single story.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'A pause in the noise',
    text: [
      'A caipirinha on a loud evening does not stop the city — it marks a breath inside it. Paulistas know how to stretch a night without treating it as escape.',
      'We kept returning to the same rhythm: eat late, pause, then let the evening continue on its own terms.',
    ],
    image: img('caipirinha', 'Caipirinha — a pause in the city'),
    location: 'Bars across the city',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Liberdade at street level',
    text: 'Layers rather than polish — signage, faces, steam from bowls, the largest Japanese community outside Japan experienced from the pavement, not a brochure.',
    image: img('caipirinhaSketch', 'Sketch of a caipirinha in the city'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'walking-route',
    title: 'We did not try to finish São Paulo.',
    text: [
      'We moved through it instead — parks for breath, murals for colour, galleries for pause, carnival for release.',
      'Different rhythms of the same city, each leading us somewhere deeper.',
    ],
  },
];

function SaoPaulo() {
  return (
    <DenseTemplate
      variant="megacity"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{
        src: cloudinaryImageUrl(SAO_PAULO_HERO_ID, { width: 2400 }),
        alt: 'São Paulo skyline',
      }}
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
        src: 'SaoPauloLanding/small/street',
        alt: 'Liberdade street level view in São Paulo',
        caption: 'Liberdade is experienced at street level. It also holds the largest Japanese community outside Japan.'
      }}
      rhythmText="Dinner rarely marks the end of anything here. The city tends to stretch its evenings further than expected."
      narrative={{
        image: { src: 'SaoPauloLanding/small/pizza', alt: 'Pizza São Paulo' },
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
      reflectiveClose="São Paulo never fully reveals itself. It offers fragments - and leaves the rest for you to find."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Florianópolis', path: '/brazil/florianopolis' }}
    />
  );
}

export default SaoPaulo;
