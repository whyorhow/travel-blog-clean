import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS, doThisAgainBlock } from "../components/editorial";
import naturalSpacesImages from "../assets/artImages/slices/category/natural-spaces.json";
import manausImages from "../assets/artImages/slices/category/manaus.json";
import parkImages from "../assets/artImages/slices/category/parks.json";
import bonitoImages from "../assets/artImages/slices/category/bonito.json";
import pantanalImages from "../assets/artImages/slices/category/pantanal.json";
import ilhaGrandeImages from "../assets/artImages/slices/category/ilha-grande.json";
import brazilNaturalSpacesHeroConfig from "./brazil/brazilNaturalSpaces.hero.config";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import { hasNaturalSpacesStaticHero, isMobileViewport } from "../utils/staticPageHero";

const catalog = mergeArtSlices(
  naturalSpacesImages,
  manausImages,
  parkImages,
  bonitoImages,
  pantanalImages,
  ilhaGrandeImages,
);
const img = makeImgResolver(catalog);

const locationData = {
  name: 'Brazil Through Green',
  seo: {
    title: 'Brazil Natural Wonders: Rainforest, Wetlands & Coast',
    description: "A visual exploration of Brazil's natural spaces — Atlantic Forest, Amazon canopy, clear-water rivers, wetlands, and the green that threads through cities.",
  },
  coords: null,
  spatialContext: null,
};

function BrazilNaturalSpaces() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroConfig={brazilNaturalSpacesHeroConfig}
      skipHero={hasNaturalSpacesStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Brazil Through Green', subtitle: 'Natural Spaces' }}
      intro={{
        paragraphs: [
          "Marmosets cross São Paulo park paths. Caimans drift beside Pantanal roads. Giant water lilies float an hour from Manaus markets. Green overlaps daily life rather than sitting at the edge of it.",
        ],
      }}
      rhythmInserts={[
        "Gold ipê above traffic on Paulista for two weeks in the dry season — petals on the pavement by morning, treated as a calendar rather than a spectacle.",
        "Flood season and dry season redraw the Pantanal — channels become plains, plains become channels, and herons move with the water line.",
        "Wildlife encounters stay partial — a macaw overhead, a caiman at the channel edge, binoculars raised more often than a clean photograph.",
      ]}
      narratives={[
        // ── ATLANTIC FOREST & URBAN GREEN ─────────────────────────────────
        { type: 'heading', heading: 'Atlantic Forest & Urban Green' },
        {
          layout: 'cinematic',
          image: img('mataAtlantica', 'Mata Atlântica — Atlantic Forest canopy'),
          paragraph: null,
          expandDescription: "The Mata Atlântica once stretched continuously along Brazil's southeastern coast. Less than twelve percent remains — fragmented into reserves, park edges, and the green corridors that still thread through cities like São Paulo.",
        },
        {
          layout: 'split',
          image: img('park1', 'Pau-brasil tree in Ibirapuera Park'),
          heading: null,
          paragraph: "São Paulo is built in concrete, but it does not stay that way for long. Pau-brasil — Paubrasilia echinata, the tree that gave Brazil its name — still stands in Ibirapuera alongside jequitibá and fig trees whose aerial roots braid the paths. Green space is not treated as something separate from the city; people bring what they need and stay for hours under canopies planted for shade, not display.",
        },
        {
          layout: 'diptych',
          image: img('park7', 'Bamboo grove at Ibirapuera'),
          imageB: img('park3', 'Fig tree roots in the park'),
          paragraph: "Roberto Burle Marx shaped Ibirapuera as a working landscape — bamboo forming tunnels, heliconias at eye level, paths that sweep instead of cut. Beneath the design, older rhythms remain: wetland memory in waterlogged roots, native understory plantings, and the name itself — Ibirapuera means \"rotting tree\" in Tupi.",
        },
        {
          layout: 'insert',
          image: img('marmosetMonkey', 'Marmoset in the canopy', 'Callithrix — common marmosets move between forest and city without hesitation.'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('nasuaNasua', 'South American coati'),
          imageB: img('saguDeJardim', 'Sagu-de-Jardim marmoset in garden shade'),
          paragraph: "Monkeys, coatis, and birds cross the same blankets and paths as people at Ibirapuera — lower your voice, step around without drama, accept that you are sharing the lawn.",
        },
        {
          layout: 'insert',
          image: img('flannelMothCaterpillar', 'Flannel moth caterpillar', 'Lonomia obliqua — vivid urticating hairs. Beautiful, and genuinely dangerous. Look, do not touch.'),
          imageLeft: false,
          paragraph: "The Atlantic Forest rewards close attention — moss on stumps, bracket fungi on trunks, caterpillars whose bright colours carry a warning.",
        },
        {
          layout: 'insert',
          image: img('treeMushrooms', 'Bracket fungi on a park tree'),
          paragraph: "Decomposers feed the cycle that keeps bromeliads and orchids rooted in bark. Tree stumps gather moss over time; fine cracks widen slightly, holding soil where seedlings push through.",
        },

        // ── THE AMAZON ────────────────────────────────────────────────────
        { type: 'heading', heading: 'The Amazon' },
        {
          layout: 'cinematic',
          image: img('manaus13', 'Amazon canopy from above'),
          paragraph: "From above, the forest reads as layered greens beneath a wide sky. Manaus sits inside it — market boats at the docks, lily pads on still water an hour from the centro.",
        },
        {
          layout: 'split',
          image: img('manaus12', 'Towering tree on the forest floor'),
          heading: null,
          paragraph: "Looking up from the forest floor, scale becomes hard to judge. A single tree rises wrapped in moss and climbing vines; the canopy stretches upward as much as it spreads outward. Light arrives in shifts — cloud, gap, shadow — and the forest changes minute by minute.",
        },
        {
          layout: 'diptych',
          image: img('palmeiraAndante', 'Palmeira-andante — walking palm'),
          imageB: img('cocolobaGigantifolia', 'Coccoloba gigantifolia — giant Amazon leaf'),
          paragraph: "Socratea exorrhiza — the walking palm — grows new roots toward light. Coccoloba gigantifolia produces leaves large enough to block a path. A lily pad wide enough to doubt from the boat.",
        },
        {
          layout: 'cinematic',
          image: img('manaus15', 'Giant water lilies on still water'),
          paragraph: "At Lago Janauari and forest reserves near Manaus, Victoria amazonica spreads broad pads across still water — surfaces wide enough to feel unreal. Go when light is low; the forest and the water change together.",
        },
        {
          layout: 'diptych',
          image: img('manaus18', 'Monkey in the Amazon canopy'),
          imageB: img('manaus19', 'Caiman beneath the surface'),
          paragraph: "Monkeys balance among layered leaves. Caimans float almost motionless in dark water, outline broken by reflections of trees above — partial views, long waits, binoculars raised more often than cameras.",
        },
        {
          layout: 'insert',
          image: img('camaraoAmarelo', 'Camarão-amarelo in forest shade', 'Native shrimp plant — vivid growth in the understory.'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('manaus20', 'Clear water beneath a rocky overhang'),
          imageLeft: false,
          paragraph: "Away from the city, tributaries run amber with minerals and fallen leaves — slower, shaped by erosion, shade, and time rather than traffic.",
        },

        // ── RIVERS, CAVES & CLEAR WATER ───────────────────────────────────
        { type: 'heading', heading: 'Rivers, Caves & Clear Water' },
        {
          layout: 'cinematic',
          image: img('grutaDaJudeia', 'Gruta da Judéia cave entrance'),
          paragraph: "Inland from the coast, limestone geology opens into caves and aquifers. Gruta da Judéia frames the forest through rock — light arriving from outside, humidity held inside, the boundary between surface and depth made visible.",
        },
        {
          layout: 'diptych',
          image: img('lookingOutGruta', 'View from inside Gruta da Judéia'),
          imageB: img('bonito3', 'Fish visible through clear river water'),
          paragraph: "Bonito's rivers stay transparent through limestone filtration and strict visitor limits — fish, branches, and riverbed visible at arm's length on Rio da Prata.",
        },
        {
          layout: 'split',
          image: img('bonito8', 'River bend through dense forest'),
          heading: null,
          paragraph: "The Rio da Prata curves through forest on its own quiet terms — colour shifting with light, banks pressed close, the water inviting immersion rather than spectacle. Canopy bridges let you move inside the forest rather than above it.",
        },
        {
          layout: 'diptych',
          image: img('bonito10', 'Suspension bridge through the canopy'),
          imageB: img('bonito9', 'Green pool beneath mossy rock'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('bonito14', 'Bamboo rising toward the light'),
          paragraph: "From below, trunks rise wrapped in moss and climbing vines — light arriving in shifts through cloud gaps, the canopy closing overhead.",
        },

        // ── WETLANDS & OPEN PLAIN ─────────────────────────────────────────
        { type: 'heading', heading: 'Wetlands & Open Plain' },
        {
          layout: 'cinematic',
          image: img('pantanal6', 'Sunset across the Pantanal wetlands'),
          paragraph: "The Pantanal is one of the largest tropical wetlands on Earth — governed almost entirely by water and seasonal rhythm. What you see depends entirely on when you arrive.",
        },
        {
          layout: 'split',
          image: img('pantanal4', 'Caiman drifting on the floodplain'),
          heading: null,
          paragraph: "Wildlife here is not hidden in dense forest. The open plain offers long sightlines — find the edge of a channel, stop moving, and let the landscape come to you. Caimans drift without urgency; much of what happens unfolds at that pace.",
        },
        {
          layout: 'diptych',
          image: img('pantanal2', 'Scarlet macaw in the canopy'),
          imageB: img('pantanal3', 'Toucan watching from the branches'),
          paragraph: "Macaws cut sharply through layers of green. Toucans rest quietly above open ground. Sightings feel incidental rather than orchestrated — part of everyday movement overhead.",
        },
        {
          layout: 'insert',
          image: img('pantanal7', 'Palms after rain on the open plain'),
          paragraph: "Between storms and sunset, the Pantanal briefly holds still — palms against a clearing sky, grass extending toward distant cloud.",
        },

        // ── WHERE FOREST MEETS COAST ──────────────────────────────────────
        { type: 'heading', heading: 'Where Forest Meets Coast' },
        {
          layout: 'split',
          image: img('ilha6', 'Forest reaching the water at Ilha Grande'),
          heading: null,
          paragraph: "Ilha Grande holds thick branches and quiet inlets where jungle and shoreline overlap — no motor vehicles, only footpaths and boat timetables between beaches.",
        },
        {
          layout: 'diptych',
          image: img('crinumLily', 'Crinum lily on the humid coast'),
          imageB: img('mimoDeVenus', 'Mimo-de-Vênus flower in Atlantic Forest shade'),
          paragraph: "Tropical blooms mark the humid warmth of the coast and forest edge — bold colour in shade, delicate structure in understory light.",
        },
        {
          layout: 'insert',
          image: img('park2', 'Caterpillar crossing warm stone in the park', 'Small attention resets — the park allows time to stretch just enough to notice again.'),
          paragraph: null,
        },
      ]}
      editorialBlocks={[
        {
          placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
          type: 'link-banner',
          eyebrow: 'Also in Brazil',
          title: 'The Pantanal',
          tagline: 'Wetland scale and seasonal flood — where wildlife follows water across open horizon.',
          path: '/brazil/pantanal',
          image: 'Brazil/Pantanal/small/Pantanal5.webp',
        },
        doThisAgainBlock(
          "We'd stop whenever a trail or riverbank invited us to stay longer than planned — marmosets above a Paulista park path, caimans beside a Pantanal road, lily pads wide enough to doubt from a boat near Manaus.",
        ),
      ]}
      bridgeQuote="Marmosets on a Paulista park path, mist through Krimml pines, lily pads wide enough to doubt near Manaus."
      reflectiveClose="Mata Atlântica fragment above the coast, Krimml mist through pines remembered from elsewhere, lily pads on still water an hour from Manaus market noise."
      returnLink={{ label: 'Back to Brazil', path: '/brazil' }}
    />
  );
}

export default BrazilNaturalSpaces;
