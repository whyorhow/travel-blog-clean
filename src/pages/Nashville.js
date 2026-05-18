import React from "react";
import { LightTemplate } from "./templates";
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
    title: 'Nashville | Nomad Scribbles',
    description: 'Explore Nashville — skyline views, Broadway\'s neon, quiet songwriter corners, and the character that keeps Music City moving after dark.',
  },
};

function Nashville() {
  return (
    <LightTemplate
      variant="immersive"
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
        {
          layout: 'diptych',
          image: img('tin-roof-club', 'Tin Roof club on Broadway'),
          imageB: img('tootsies-bar', "Tootsie's Orchid Lounge"),
          paragraph: "The bars shift in character within a few steps. Tootsie's has been here since the 1960s. Inside, it looks like it.",
        },

        { type: 'heading', heading: 'Songwriters & Performers' },
        {
          layout: 'cinematic',
          image: img('bluebird-cafe', 'The Bluebird Cafe'),
          paragraph: "Behind the neon lights are the musicians themselves. Nashville is a city where aspiring songwriters share the same stages and stories as established stars.",
        },
        {
          layout: 'split',
          image: img('musical-bar', 'Musician performing at a Nashville bar'),
          paragraph: "In the round format, writers sit in a circle and take turns performing the songs they wrote — often for other artists. The audience hears the story behind the recording.",
        },
        {
          layout: 'insert',
          image: img('iconic-mural', 'Iconic Nashville mural'),
          caption: 'The murals are as much landmark as decoration.',
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
          layout: 'insert',
          image: img('old-artifacts', 'Old artefacts in a Nashville antique shop'),
          caption: 'Every object has a previous owner with a story.',
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
          imageB: img('lounge-club', 'Lounge club interior'),
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

