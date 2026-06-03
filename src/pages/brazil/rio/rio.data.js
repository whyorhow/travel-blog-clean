/**
 * RIO DATA — Pure content layer
 * 
 * NO assets. NO hero logic. NO image resolution.
 * Only: text, structure, gallery references, themes.
 */

export const rioData = {
  // Page identity
  locationId: 'rio',
  name: 'Rio de Janeiro',
  
  // Note: pageType is defined in RioSystemCompliant.js
  // This file = content only, page file = structure + pageType
  
  // SEO
  seo: {
    title: 'Rio de Janeiro Travel Guide: Neighborhoods, Culture & Carnival',
    description: 'Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography.'
  },
  
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
  
  // Sidebar image reference (not the hero - handled separately)
  sidebarImage: {
    imagePublicId: 'rio1',  // Reference to gallery image
    alt: 'Rio de Janeiro coast',
    caption: 'The coastline defines the city'
  },
  
  // Narrative sections for split layouts
  narratives: [
    {
      imagePublicId: 'rio2',
      alt: 'Carnival at the Sambadrome',
      width: 1200,
      heading: 'Spectacle and Scale',
      paragraph: 'From the stands, the Sambadrome collapses into a dense field of light, sound, and movement. Each section performs with precision, but the scale of the crowd makes it clear that Carnival only works because it is shared.'
    },
    {
      imagePublicId: 'rio8',
      alt: 'Rio geography from above',
      width: 1200,
      heading: 'Pressed to the Mountain',
      paragraph: 'Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio\'s geography leaves little room for sprawl; instead, it layers daily life vertically.'
    }
  ],
  
  // Rhythm inserts (atmospheric pauses)
  rhythms: [
    'The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn\'t a backdrop — it sets the limits and the mood.',
    'The beach marks a shift in pace. Conversations slow. Bodies stretch. The city exhales. In Rio, the shoreline isn\'t an escape; it\'s where daily life loosens.'
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
  reflectiveClose: 'Rio never fully reveals itself. It offers moments — carnival, sunset, the view from a peak — and leaves the rest for you to discover in the climb.',
  
  // Gallery order (references artImages.json IDs)
  galleryOrder: [
    'rio1', 'rio2', 'rio3', 'rio4', 'rio5', 'rio6', 'rio7', 'rio8',
    'rio9', 'rio10', 'rio11', 'rio12', 'rio13', 'rio14'
  ],
  
  // Theme signature
  theme: 'rio'
};

export default rioData;
