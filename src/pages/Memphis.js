import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import memphisImages from "../assets/artImages/slices/category/memphis.json";
import nashvilleImages from "../assets/artImages/slices/category/nashville.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import memphisHeroConfig from "./united-states/tennessee/memphis.hero.config";
import galleryBg from '../assets/Backgrounds/Grunge-Texture-Wall.webp';
import { hasMemphisStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id, alt) => {
  const entry = memphisImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
};

const nashvilleCatalogImage = (id) => {
  const entry = nashvilleImages.find((item) => item.id === id);
  return entry?.cloudinary?.blog ?? null;
};

const galleryImages = memphisImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Memphis',
  seo: {
    title: SEO_TITLES["/united-states/tennessee/memphis"],
    description: 'Explore Memphis — Beale Street, the Mississippi, Sun Studio, Stax, and the live blues that still define the city.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Memphis does not whisper. It plays at full volume from the first open doorway you walk past.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Tennessee',
    title: 'Nashville',
    tagline: 'Upstream from the blues — Broadway neon, songwriter rooms, and Music City after dark.',
    path: '/united-states/tennessee/nashville',
    image: nashvilleCatalogImage('neon-signs'),
    imageAlt: 'Neon signs on Broadway — Nashville',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 7,
    type: 'local-tip',
    title: 'Sun Studio is smaller than you expect',
    text: 'Stand in the actual room and try to picture Elvis, Cash, and Lewis in a space the size of a large living room. The scale is half the story.',
    location: 'Union Avenue',
    image: img('vintage-equipment', 'Vintage studio equipment'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 20,
    type: 'local-tip',
    title: 'Stand close to the stage',
    text: 'Music in Memphis is not background — it spills out of open doorways. At B.B. King\'s and the smaller clubs, the best nights happen when you are close enough to hear the guitarist talk between songs.',
    location: 'Beale Street',
  },
  doThisAgainBlock(
    "We'd follow the music bleeding onto the pavement rather than the map. On Beale Street, the best doorway was usually the one we'd almost walked past — close enough to hear the guitarist talk between songs.",
  ),
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: 'Nights at B.B. King\'s Blues Club',
    text: [
      'The band plays three-hour sets. Between songs, the guitarist talks. The crowd responds. It felt closer to conversation than performance — the kind of night where you forget to check the time.',
      'We kept drifting back to Beale Street for this more than anything else on the strip. Loud, polished, tourist-facing in places — but here, genuinely alive.',
    ],
    image: img('bb-kings-blues-club-band', "Live band at B.B. King's Blues Club"),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The room at Sun Studio',
    text: [
      'A single room, low ceiling, pale tiles. History makes it sound enormous; standing inside, it feels almost ordinary — which is somehow more powerful.',
      'We went twice. The second time was to see if the first impression held. It did.',
    ],
    image: img('sun-studio', 'Sun Studio'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The corner booth at the Arcade',
    subtitle: 'Oldest diner in Memphis',
    text: [
      'The Arcade has been feeding musicians and travellers for generations. Elvis used to sit in the corner booth — whether that is strictly true or part of the mythology hardly matters once you are sitting there yourself.',
      'The gumball machines look original. The coffee is diner coffee. It became our late-morning stop when the nights ran long.',
    ],
    image: img('arcade-restaurant', 'The Arcade Restaurant'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-bar',
    title: 'The smallest room on the strip',
    subtitle: 'Intimate clubs off the main drag',
    text: [
      'Some of the best music happened in rooms just big enough to feel the guitars vibrate. No raised stage, no distance — just players and a crowd that knew why they had come.',
      'The smallest venues sounded the fullest. We learned to follow the sound down side doors rather than the brightest neon.',
    ],
    image: img('cozy-club', 'Small intimate blues club interior'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Beale after dark',
    subtitle: 'Arch → neon → whatever is playing loudest',
    text: 'We walked this stretch every night we were in town. The neon stays on long after sensible people have gone home. No plan — just following the music one doorway at a time.',
    image: img('neon-memphis', 'Neon Memphis sign'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('illuminated-beale-street', 'Illuminated Beale Street'),
    caption: 'After dark, the signs tell you exactly where you are.',
    compact: true,
  },
];

function Memphis() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="tennessee"
      skipHero={hasMemphisStaticHero() && isMobileViewport()}
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={memphisHeroConfig}
      heroPageData={{ title: 'Memphis', subtitle: 'Blues, Soul & the Mississippi' }}
      intro={{
        paragraphs: [
          'Memphis sits at the point where the Mississippi River meets its own mythology. The city gave the world blues, soul, and rock and roll — not as cultural products, but as by-products of people living close together with a lot to say.',
          'Beale Street still carries that energy, even after decades of commercial polish. Sun Studio is smaller than you expect. Stax is gone but its museum reconstructs what mattered. The river moves slowly past it all, indifferent and immense.',
          'This is a city that still sounds like itself after dark.',
        ],
      }}
      rhythmInserts={[
        "The Mississippi does not look friendly. It looks like something that has swallowed towns and remembered none of them.",
        "Music in Memphis is not background. It spills out of open doorways. You hear it before you see the stage.",
      ]}
      narratives={[
        { type: 'heading', heading: 'Crossing the Mississippi' },
        {
          layout: 'cinematic',
          image: img('entering-tennessee', 'Entering Tennessee across the Mississippi'),
          paragraph: "The Mississippi River has always been Memphis' front door, carrying travellers, traders, and musicians into the city. Even today, crossing the bridge feels like arriving somewhere with a story already playing.",
        },
        {
          layout: 'split',
          image: img('paddlewheel', 'Paddlewheel riverboat on the Mississippi'),
          paragraph: "Paddlewheelers still move along the river, slow and theatrical. The water is wide and brown. On the far bank, the Arkansas lowlands flatten toward the horizon.",
        },
        {
          layout: 'diptych',
          image: img('countess-riverboat', 'The Countess riverboat'),
          imageB: img('wc-handy-statue', 'W.C. Handy statue on Beale Street'),
          paragraph: "W.C. Handy named the blues here. His statue stands on Beale Street, trumpet raised, as if the street still needs conducting.",
        },
        {
          layout: 'split',
          image: img('history-mural', 'History mural depicting Memphis heritage'),
          paragraph: "Murals across the city compress its history into single images. Civil rights, music, the river — all layered into walls that most people walk past without stopping.",
        },
        {
          layout: 'diptych',
          image: img('flagg-grove-school', 'Flagg Grove School — historic schoolhouse'),
          imageB: img('inside-schoolhouse', 'Inside the historic Flagg Grove schoolhouse'),
          paragraph: "The Flagg Grove School stands near Stax as a reminder of how close the cotton fields were to everything else that happened here.",
        },

        { type: 'heading', heading: 'The Sound of Memphis' },
        {
          layout: 'cinematic',
          image: img('sun-studio', 'Sun Studio — birthplace of rock and roll'),
          paragraph: "Sun Studio is smaller than history makes it sound. A single room, low ceiling, pale tiles. Elvis, Cash, Perkins, and Lewis all recorded in a space that would comfortably fit a large living room.",
        },
        {
          layout: 'split',
          image: img('stax-museum', 'Stax Museum of American Soul Music'),
          paragraph: "Stax Records defined southern soul. The museum reconstructs the original studio, including the actual floor. Isaac Hayes' gold-plated Cadillac sits in the entrance, unapologetic.",
        },
        {
          layout: 'diptych',
          image: img('guitars-collection', 'Collection of guitars at a Memphis music museum'),
          imageB: img('hanging-guitars', 'Guitars hanging on a wall'),
          paragraph: "The equipment from the early recording sessions looks rough by modern standards. Guitars are everywhere — on walls, in cases, under glass. The city treats its instruments like relics.",
        },

        { type: 'heading', heading: 'Streets of Music' },
        {
          layout: 'cinematic',
          image: img('guitar-art-installation1', 'Guitar art installation on a Memphis street'),
          paragraph: "Music spills far beyond the stages here, turning walls, sculptures, and city corners into tributes to legendary artists. Memphis doesn't just remember its musicians — it celebrates them in the open.",
        },
        {
          layout: 'diptych',
          image: img('guitar-art-installation2', 'Second guitar art installation'),
          imageB: img('icon-tina-turner', 'Tina Turner tribute on a Memphis street'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('gold-plated-cadillac', "Isaac Hayes' gold-plated Cadillac"),
          imageB: img('pink-cadillac', 'Pink Cadillac — Memphis icon'),
          paragraph: "Cadillacs keep appearing. Pink ones, gold ones. Elvis bought his mother one. The car became a Memphis shorthand for arrival.",
        },

        { type: 'heading', heading: 'Beale Street' },
        {
          layout: 'cinematic',
          image: img('beale-street-arch', 'Beale Street arch at night'),
          paragraph: "Beale Street is where Memphis turns up the volume. Walk a few steps here and it feels like the whole street is part of the show. The neon stays on long after sensible people have gone home.",
        },
        {
          layout: 'diptych',
          image: img('beale-street-neon', 'Neon signs on Beale Street'),
          imageB: img('neon-memphis', 'Neon Memphis sign'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('jerry-lawler-bar', "Jerry Lawler's bar on Beale Street"),
          imageB: img('venetian-blinds', 'Bar interior with venetian blinds'),
          paragraph: "The bars vary. Some are tourist-facing, polished and loud. Others feel like they've been here longer than anyone can remember.",
        },

        { type: 'heading', heading: 'Live Blues' },
        {
          layout: 'cinematic',
          image: img('bb-kings-blues-club-sign', "B.B. King's Blues Club sign"),
          paragraph: "Inside the clubs and bars, guitars, harmonicas, and voices keep the blues alive night after night. It's the kind of music that feels best when you're standing only a few feet from the stage.",
        },
        {
          layout: 'diptych',
          image: img('blues-city-cafe', 'Blues City Cafe on Beale Street'),
          imageB: img('blues-hall', 'Blues Hall interior'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('musicians1', 'Blues musicians performing'),
          imageB: img('musicians2', 'Musician close-up on stage'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('musicians3', 'Third musician performing live'),
          imageB: img('rustic-stage', 'Rustic stage at a Memphis blues club'),
          paragraph: null,
        },
        { type: 'heading', heading: 'Memphis After Dark' },
        {
          layout: 'cinematic',
          image: img('nightlife', 'Memphis nightlife — neon-lit street'),
          paragraph: "When the sun sets, Memphis glows. The streets stay loud, the kitchens stay open, and the music doesn't stop. The city has always known how to stay awake.",
        },
        {
          layout: 'diptych',
          image: img('illuminated-bar', 'Illuminated bar interior at night'),
          imageB: img('fish-restaurant', 'Fish restaurant on Beale Street'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('gumball-machine', 'Vintage gumball machine in a Memphis diner'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Memphis doesn't need to explain itself. The music does it for you, every night, from every open door on Beale Street."
      returnLink={{ label: 'Return to Tennessee', path: '/united-states/tennessee' }}
      nextLink={{ label: 'Next: Nashville', path: '/united-states/tennessee/nashville' }}
    />
  );
}

export default Memphis;
