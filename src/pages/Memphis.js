import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import memphisHeroConfig from "./united-states/tennessee/memphis.hero.config";
import galleryBg from '../assets/Backgrounds/Grunge-Texture-Wall.webp';

const memphisImages = artImages.filter(img => img.category === "Memphis");

const img = (id, alt) => {
  const entry = memphisImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, lightboxSrc: entry.cloudinary.lightbox, alt: alt || entry.title };
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
    title: 'Memphis | Nomad Scribbles',
    description: 'Explore Memphis — Beale Street, the Mississippi, Sun Studio, Stax, and the live blues that still define the city.',
  },
};

function Memphis() {
  return (
    <LightTemplate
      variant="immersive"
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
          image: img('recording-studio', 'Vintage recording studio equipment'),
          imageB: img('vintage-equipment', 'Vintage studio equipment close-up'),
          paragraph: "The equipment from the early recording sessions looks rough by modern standards. The rooms were not acoustically designed — they were just rooms that happened to sound right.",
        },
        {
          layout: 'diptych',
          image: img('guitars-collection', 'Collection of guitars at a Memphis music museum'),
          imageB: img('hanging-guitars', 'Guitars hanging on a wall'),
          paragraph: "Guitars are everywhere — on walls, in cases, under glass. The city treats its instruments like relics.",
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
          layout: 'split',
          image: img('bb-kings-blues-club-band', "Live band at B.B. King's Blues Club"),
          paragraph: "The band at B.B. King's plays in three-hour sets. Between songs, the guitarist talks. The crowd responds. It is closer to conversation than performance.",
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
        {
          layout: 'insert',
          image: img('cozy-club', 'Small intimate blues club interior'),
          caption: 'The smallest venues sound the fullest.',
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
          layout: 'diptych',
          image: img('arcade-restaurant', 'The Arcade Restaurant — oldest diner in Memphis'),
          imageB: img('gumball-machine', 'Vintage gumball machine in a Memphis diner'),
          paragraph: "The Arcade is the oldest diner in Memphis. Elvis used to sit in the corner booth. The gumball machines look original.",
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
