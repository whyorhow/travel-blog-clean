import React from "react";
import { LightTemplate } from "./templates";
import athensImages from "../assets/artImages/slices/story/greece-athens.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';

const img = (id) => {
  const entry = athensImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, alt: entry.title };
};

const galleryImages = athensImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Athens',
  seo: {
    title: 'Athens | Nomad Scribbles',
    description: 'A personal diary of exploring Athens — from the sacred Acropolis to hidden chapels, ancient temples and quiet coastal escapes.',
  },
};

function AthensNew() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroImage={{ src: cloudinaryImageUrl('Assets/Diary Athens'), alt: 'Athens diary' }}
      heroFallbackSrc={cloudinaryImageUrl('Greece/Athens/Athens-backup', { width: 1600 })}
      heroObjectFit="contain"
      heroPageData={{ title: 'Athens', subtitle: 'Greece · Ancient & Alive' }}
      intro={{
        paragraphs: [
          "Athens didn't feel like a city of ruins. It felt alive.",
          "Every stone seemed to hold stories — not just of gods and philosophers, but of people still living among the ancient echoes.",
          "We climbed the Acropolis at sunrise, wandered through markets where old men played backgammon, and found chapels tucked away in corners that felt like they'd been there forever. It's a city where past and present don't just coexist — they dance around each other.",
        ],
      }}
      rhythmInserts={[
        "The Acropolis at sunrise is not the same thing as the Acropolis at noon. Go early.",
        "The bread in Athens didn't feel like something on the side — it felt like the centre of it all.",
      ]}
      narratives={[
        { type: 'heading', heading: 'Where It Starts to Make Sense' },
        {
          layout: 'cinematic',
          image: img('acropolis-hill'),
          paragraph: "The Acropolis wasn't just a tourist site — it felt like the heart of Athens still beating. Watching the sunrise from the top, with the marble temples glowing gold, was one of those moments that remind you why you travel.",
        },
        {
          layout: 'diptych',
          image: img('acropolis-view'),
          imageB: img('temple-of-hephaestus'),
          paragraph: null,
        },

        { type: 'heading', heading: "What's Been Left Behind (and What Hasn't)" },
        {
          layout: 'split',
          image: img('arch-of-hadrian'),
          paragraph: "Walking through Hadrian's Library and past the Roman columns felt like stepping through different layers of time. Each civilization built upon the last, creating this incredible palimpsest of human history.",
        },
        {
          layout: 'diptych',
          image: img('hadrians-library'),
          imageB: img('roman-columns'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('zappeion-building'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Where the City Lets Go' },
        {
          layout: 'split',
          image: img('aegina-beach'),
          paragraph: "The coast around Athens offered these perfect escapes — from quiet beaches to ancient islands. The sea breeze and salt air provided relief from the intensity of the city's ancient energy.",
        },
        {
          layout: 'diptych',
          image: img('loutraki-beach'),
          imageB: img('loutraki-view'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('wooden-pier'),
          imageB: img('turtle-pond'),
          paragraph: null,
        },

        { type: 'heading', heading: 'The Rhythm You Fall Into' },
        {
          layout: 'cinematic',
          image: img('athenian-sunset'),
          paragraph: "The real Athens revealed itself in small moments — crusty bread from neighbourhood bakeries, sunsets that painted the marble temples gold, and cafés where time seemed to slow down just enough to notice the beauty around you.",
        },
        {
          layout: 'diptych',
          image: img('kotili-cafe'),
          imageB: img('crusty-greek-bread'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Quiet Corners That Stay With You' },
        {
          layout: 'cinematic',
          image: img('chapel-at-heraion'),
          paragraph: "Hidden chapels and sacred spaces appeared unexpectedly — on islands, in neighbourhoods, perched on hillsides. Each felt like a quiet refuge, a place where the spiritual and historical intertwined seamlessly.",
        },
        {
          layout: 'diptych',
          image: img('chapel-ypanema-heraion'),
          imageB: img('church-transfiguration'),
          paragraph: null,
        },
      ]}
      bridgeQuote="Athens doesn't ask you to understand it. It asks you to keep showing up — and rewards that with something different every time."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Athens accumulates. You leave with marble dust on your shoes and the sense that you've only seen the top layer of something much older and more complicated than a single visit can hold."
      returnLink={{ label: 'Return to Greece', path: '/greece' }}
    />
  );
}

export default AthensNew;
