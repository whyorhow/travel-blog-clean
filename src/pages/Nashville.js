import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import nashvilleImages from "../assets/artImages/slices/category/nashville.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import nashvilleHeroConfig from "./united-states/tennessee/nashville.hero.config";
import galleryBg from '../assets/Backgrounds/Gray-Wall-Rough.webp';
import { hasNashvilleStaticHero, isMobileViewport } from "../utils/staticPageHero";

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
    title: SEO_TITLES["/united-states/tennessee/nashville"],
    description:
      'Broadway after dark, songwriter venues, skyline views, and the smaller places that make Nashville worth exploring.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Broadway catches your attention first. The smaller venues stay in your memory longer.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Tennessee',
    title: 'Memphis',
    tagline: 'Blues clubs, Beale Street, and the Mississippi further west across the state.',
    path: '/united-states/tennessee/memphis',
    image: 'United States/Tennessee/Memphis/Small/Illuminated Beale Street',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 6,
    type: 'local-tip',
    title: 'Beyond Broadway',
    text: 'Broadway is worth seeing, but don\'t stop there. Some of our favourite evenings started a few streets away.',
    location: 'Lower Broadway',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 8,
    type: 'local-tip',
    title: 'The Bluebird Cafe',
    text: 'If you visit the Bluebird Cafe, book well in advance. The room is small for a reason.',
    location: 'The Bluebird Cafe',
    image: img('bluebird-cafe', 'The Bluebird Cafe'),
  },
  doThisAgainBlock(
    "We'd leave Broadway sooner. Some of our favourite evenings came from smaller venues where everyone faced the performer, the conversations stopped when the music began, and every song arrived with the story that inspired it.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-cafe',
    title: 'The Bluebird Cafe',
    text: [
      'Small enough that every seat feels close.',
      'The room faces inward, and the songwriter sits only a few metres away. It feels less like a concert than an evening shared with strangers.',
    ],
    image: img('bluebird-cafe', 'The Bluebird Cafe'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: "Tootsie's Orchid Lounge",
    text: 'Purple walls, low ceilings, live bands upstairs, downstairs, and somewhere in between.',
    image: img('tootsies-bar', "Tootsie's Orchid Lounge"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: 'Tin Roof',
    text: [
      'The place we walked past several times before finally going in.',
      'We stayed much longer than expected.',
    ],
    image: img('tin-roof-club', 'Tin Roof'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Legends Corner Mural',
    text: 'Country legends painted across brickwork overlooking one of Nashville\'s busiest streets.',
    image: img('iconic-mural', 'Legends Corner mural'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Broadway After Sunset',
    subtitle: 'Broadway → side street → whichever venue sounded worth stopping for',
    text: 'No timetable.',
    image: img('neon-signs', 'Neon signs on Broadway'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('nashville-hero', 'Nashville skyline'),
    caption: 'Broadway below. The skyline beyond.',
    compact: true,
  },
];

const rhythmInserts = [];
rhythmInserts[0] = 'Walk one block away from Broadway and the noise begins to soften.';
rhythmInserts[4] = 'Some of the smallest rooms hold the closest audiences.';

function Nashville() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="tennessee"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={nashvilleHeroConfig}
      skipHero={hasNashvilleStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Nashville', subtitle: 'Music City' }}
      intro={{
        paragraphs: [
          'Nashville balances glass towers with older brick buildings, busy Broadway bars with quieter streets only a few minutes away.',
          'Country music is everywhere, from museums and murals to small venues where the audience sits only a few metres from the performers. Away from Broadway, record shops, cafés, and neighbourhood bars slow everything down again.',
          'Most evenings began with a plan. Very few ended that way.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Music City Roots' },
        {
          layout: 'cinematic',
          image: img('hall-of-fame', 'Hall of Fame'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('golden-records', 'Golden records'),
          paragraph: null,
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
          image: img('broadway', 'Broadway after dark'),
          paragraph: 'Neon signs, open doors, and music from every floor.',
        },
        {
          layout: 'diptych',
          image: img('bustling-street', 'Broadway street'),
          imageB: img('neon-signs', 'Neon signs'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Songwriters & Performers' },
        {
          layout: 'cinematic',
          image: img('musical-bar', 'Live performance'),
          paragraph: 'A songwriter holding a room with little more than a guitar and a story.',
        },

        { type: 'heading', heading: 'Nashville Character' },
        {
          layout: 'cinematic',
          image: img('cowboy-boots', 'Cowboy boots'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('amusing-sign', 'Street humour'),
          imageB: img('americana-decoration', 'Americana'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('old-artifacts', 'Antique shop'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Nashville After Dark' },
        {
          layout: 'cinematic',
          image: img('dolly', 'Dolly Parton statue'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('rooftop-decoration', 'Rooftop lights'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('walk-of-fame', 'Walk of Fame'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Looking back, we remember the smaller rooms more clearly than the biggest stages. They were quieter, closer, and gave the songs enough space to speak for themselves."
      returnLink={{ label: 'Return to Tennessee', path: '/united-states/tennessee' }}
      nextLink={{ label: 'Next: Smoky Mountains', path: '/united-states/tennessee/mountains' }}
    />
  );
}

export default Nashville;
