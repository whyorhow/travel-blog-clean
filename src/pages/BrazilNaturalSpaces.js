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
          "Brazil is often described through its extremes — rainforest, wetland, coast — but what becomes visible when you move through it is something more structural. Green is not a backdrop. It is an active condition that shapes how cities breathe, how rivers carry sediment, how wildlife negotiates proximity with people, and how daily life finds room beside canopy and water.",
          "The country holds six major biomes, yet the relationship between them repeats a pattern: nature does not sit at the edge of human activity. It overlaps it. Marmosets cross São Paulo park paths. Caimans drift beside Pantanal roads. Giant water lilies float an hour from Manaus markets. Understanding Brazil's natural spaces means understanding that overlap — not as escape, but as shared ground.",
        ],
      }}
      rhythmInserts={[
        "In São Paulo, the ipê-amarelo flowers for two weeks when the dry season arrives — gold crowns above traffic, petals on the grass by morning. Paulistas treat it as a calendar, not a spectacle.",
        "The Amazon does not announce scale. It reveals it through proportion — a lily pad wide enough to doubt, a leaf that blocks the path, a canopy that removes the horizon.",
        "Bonito's rivers are protected because clarity is fragile. What looks like perfection is the result of limestone filtration, strict visitor limits, and forest that has not been cleared from the banks.",
        "The Pantanal breathes with water. Flood season and dry season redraw the same landscape — channels become plains, plains become channels — and everything living adjusts without ceremony.",
        "Wildlife here rarely performs on cue. Encounters are partial, brief, and earned through stillness rather than pursuit.",
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
          paragraph: "Monkeys, coatis, and birds cross the same blankets and paths as people. Wildlife is negotiated, not staged — lower your voice, step around without drama, and accept that you are visiting shared territory.",
        },
        {
          layout: 'insert',
          image: img('flannelMothCaterpillar', 'Flannel moth caterpillar', 'Lonomia obliqua — vivid urticating hairs. Beautiful, and genuinely dangerous. Look, do not touch.'),
          imageLeft: false,
          paragraph: "The Atlantic Forest rewards close attention. Moss on stumps, bracket fungi on trunks, caterpillars whose beauty carries a warning — the park teaches persistence without urgency.",
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
          paragraph: "From above, the forest appears endless — layered greens beneath a wide sky. Manaus exists entirely within it, dependent on what surrounds it and quietly reshaping it at the same time. The Amazon is not a day trip from here; it is the room next door.",
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
          paragraph: "Socratea exorrhiza — the walking palm — slowly shifts position by growing new roots toward light. Coccoloba gigantifolia produces leaves large enough to block a path. The Amazon reveals scale through proportion rather than height.",
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
          paragraph: "Monkeys balance easily among layered leaves. Caimans float almost motionless in dark water, their outline broken by reflections of trees above. Life here announces itself softly — partial views, patience, acceptance that the forest sets the terms.",
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
          paragraph: "Bonito's reputation rests on clarity that is literal, not metaphorical. Limestone filtration and strict conservation limits keep rivers transparent enough to see fish, branches, and riverbed in sharp detail.",
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
          paragraph: "From below, the forest feels vertical and enclosing — less something you walk through than something you stand inside.",
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
          paragraph: "Ilha Grande holds what much of the southeastern coast once looked like — thick branches and hanging plants framing quiet inlets where jungle and shoreline overlap without a clear boundary. Motor vehicles are absent; movement happens on foot or by boat, at a pace the forest can absorb.",
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
          "We'd move at forest pace rather than itinerary pace. Green in Brazil does not mark the edge of civilisation — it runs through it, and we'd stop whenever a trail or riverbank invited us to stay a little longer than planned.",
        ),
      ]}
      bridgeQuote="Green in Brazil does not mark the edge of civilisation. It runs through it."
      reflectiveClose="Brazil resists reduction to a single landscape because it has never tried to become one. Atlantic Forest fragments beside Amazon canopy beside limestone rivers beside open wetland beside coastal jungle — each biome carrying its own logic, yet repeating the same relationship: nature overlapping human life rather than retreating from it. What remains consistent is not a species or a view, but a condition. Green stays connected to climate, river systems, geology, and the pace at which people learn to share ground with everything else that lives on it."
      returnLink={{ label: 'Back to Brazil', path: '/brazil' }}
    />
  );
}

export default BrazilNaturalSpaces;
