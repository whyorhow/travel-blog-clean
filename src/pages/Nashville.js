import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import nashvilleImages from "../assets/artImages/slices/category/nashville.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import nashvilleHeroConfig from "./united-states/tennessee/nashville.hero.config";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';

const img = (id, alt) => {
  const entry = nashvilleImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const galleryImages = nashvilleImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Nashville',
  seo: {
    title: 'Nashville Travel Guide: Music City, Broadway & Songwriting Culture',
    description: 'Explore Nashville — skyline views, Broadway\'s neon, quiet songwriter corners, and the character that keeps Music City moving after dark.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Nashville sells you the neon first. The songs usually arrive later — in a smaller room, with fewer people, when you have stopped trying to see everything at once.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Tennessee',
    title: 'Memphis',
    tagline: 'Downriver from the neon — blues, Beale Street, and a different kind of night music.',
    path: '/united-states/tennessee/memphis',
    image: 'United States/Tennessee/Memphis/Small/Illuminated Beale Street',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 5,
    type: 'local-tip',
    title: 'Follow the music, not the map',
    text: 'On Broadway, the best doorway is often the one with the sound bleeding onto the pavement. Walk until something pulls you in — the neon is just the invitation.',
    location: 'Lower Broadway',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 8,
    type: 'local-tip',
    title: 'The song matters more than the stage',
    text: 'In the round, writers perform the versions you hear on the radio before the production was added. Sit close. Listen for the story behind the chorus.',
    location: 'The Bluebird Cafe',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Not the postcard version — the places that became habit.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-cafe',
    title: 'Nights at the Bluebird Cafe',
    text: [
      'The Bluebird is small on purpose. Aspiring songwriters share the stage with names you recognise from album credits. In the round, everyone faces inward — it feels less like a concert and more like being let in on something.',
      'We kept trying to get tickets whenever we were in town. When we did, the room felt worth the effort.',
    ],
    image: img('bluebird-cafe', 'The Bluebird Cafe'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: "Tootsie's Orchid Lounge",
    text: [
      "Tootsie's has been on Broadway since the 1960s. Inside, it looks like it — low ceilings, purple glow, the sense that half the room's stories never made it onto a record.",
      'We did not go for sophistication. We went because it still felt like the centre of something.',
    ],
    image: img('tootsies-bar', "Tootsie's Orchid Lounge"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: 'Tin Roof and the strip',
    text: [
      'The famous Tin Roof sign is hard to miss — one of those Broadway landmarks that works exactly as advertised. Loud, casual, music spilling out onto the street.',
      'We drifted between honky-tonks more than we committed to one, but this was the doorway we kept passing and eventually walking through.',
    ],
    image: img('tin-roof-club', 'Tin Roof club'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The mural outside Legends Corner',
    text: [
      'Country legends painted larger than life on a brick wall — part landmark, part decoration, entirely Nashville. We stopped here more than once on the way somewhere else.',
      'It is the kind of image that explains the city to outsiders without needing a caption.',
    ],
    image: img('iconic-mural', 'Iconic Nashville mural'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Broadway after the sun drops',
    subtitle: 'Neon row → side street → whatever is loudest',
    text: 'We walked this stretch every evening. The city refuses to lower the volume — neon, open doors, buskers, tourists, locals who have seen it all before and still step out anyway.',
    image: img('golden-records', 'Golden records at the Hall of Fame'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('nashville-hero', 'Nashville skyline'),
    caption: 'Glass towers and older brick — Music City from across the river.',
    compact: true,
  },
];

function Nashville() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="tennessee"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={nashvilleHeroConfig}
      heroPageData={{ title: 'Nashville', subtitle: 'Music City' }}
      intro={{
        paragraphs: [
          'Nashville blends polished skyscrapers with a deep musical past that still echoes through its streets. From the banks of the Cumberland River to the neon glow of Broadway, this is a city built on rhythm, stories, and a good dose of Southern personality.',
          'The history of country music is woven into the city itself — in museums, murals, and stages. But Nashville also has a quieter side: songwriter circles at small venues, independent record shops, and neighbourhoods that exist outside the tourist itinerary.',
          'Dinner is rarely just dinner here. It tends to become an evening.',
        ],
      }}
      rhythmInserts={[
        "Broadway is Nashville at full volume. The neon stays on, the music spills out, and the city refuses to lower it.",
        "Behind the stages are the writers. Nashville has always been as much about the song as the performance.",
      ]}
      narratives={[
        { type: 'heading', heading: 'Music City Roots' },
        {
          layout: 'cinematic',
          image: img('esteemed-musicians', 'Esteemed musicians — Nashville hall of fame'),
          paragraph: "Music isn't just entertainment in Nashville — it's part of the city's identity. Legends were shaped here, and the history of country music is preserved in museums, murals, and stages across town.",
        },
        {
          layout: 'diptych',
          image: img('hall-of-fame', 'Country Music Hall of Fame'),
          imageB: img('golden-records', 'Golden records on display'),
          paragraph: "The Hall of Fame is less a museum than a kind of temple. Gold records line the walls. The weight of the catalogue makes everything feel quieter than expected.",
        },
        {
          layout: 'diptych',
          image: img('hank-williams-guitar', "Hank Williams' guitar"),
          imageB: img('jukebox', 'Vintage jukebox'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Streets of Broadway' },
        {
          layout: 'cinematic',
          image: img('broadway', 'Broadway — Nashville at night'),
          paragraph: "Broadway is Nashville at full volume. Neon signs flash, music spills from open doors, and the street hums with energy from morning until long after sunset.",
        },
        {
          layout: 'diptych',
          image: img('bustling-street', 'Bustling Broadway street scene'),
          imageB: img('neon-signs', 'Neon signs along Broadway'),
          paragraph: null,
        },
        { type: 'heading', heading: 'Songwriters & Performers' },
        {
          layout: 'cinematic',
          image: img('musical-bar', 'Musician performing at a Nashville bar'),
          paragraph: "Behind the neon lights are the musicians themselves. Nashville is a city where aspiring songwriters share the same stages and stories as established stars — in the round, writers take turns performing the songs they wrote, often for other artists.",
        },

        { type: 'heading', heading: 'Nashville Character' },
        {
          layout: 'cinematic',
          image: img('cowboy-boots', 'Cowboy boots in a Nashville shop window'),
          paragraph: "Beyond the music, Nashville has a playful personality. Shops, decorations, and street details add a layer of humour and Americana charm to the city.",
        },
        {
          layout: 'diptych',
          image: img('amusing-sign', 'Amusing Nashville street sign'),
          imageB: img('americana-decoration', 'Americana decoration in a Nashville shop'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('old-artifacts', 'Old artefacts in a Nashville antique shop'),
          paragraph: 'Every object in the shop windows looked like it had a previous owner with a story — framed photos, handwritten notes, the accumulated evidence of nights that went long.',
        },

        { type: 'heading', heading: 'Nashville After Dark' },
        {
          layout: 'cinematic',
          image: img('dolly', 'Dolly Parton statue — Nashville icon'),
          paragraph: "When night falls, the city shifts into another gear. Rooftops sparkle, music drifts through the streets, and Nashville's famous nightlife comes alive.",
        },
        {
          layout: 'diptych',
          image: img('rooftop-decoration', 'Rooftop bar decoration at night'),
          imageB: img('venetian-blinds', 'Bar interior with venetian blinds'),
          paragraph: null,
        },
        {
          layout: 'split',
          image: img('walk-of-fame', 'Nashville Walk of Fame'),
          paragraph: "The Walk of Fame stars sit in the pavement outside the Hall of Fame. At night, people stop and photograph the names.",
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Nashville keeps its best performances for the smallest stages. The ones you find by accident, on a side street, when you weren't looking for anything in particular."
      returnLink={{ label: 'Return to Tennessee', path: '/united-states/tennessee' }}
      nextLink={{ label: 'Next: Smoky Mountains', path: '/united-states/tennessee/mountains' }}
    />
  );
}

export default Nashville;

