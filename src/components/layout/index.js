// Layout Components — Narrative pacing devices for destination pages
// 
// These components create authored flow (not assembled):
// Use them flexibly — every page draws from this vocabulary, 
// but speaks with its own rhythm.
//
// HERO VARIANTS & FALLBACK:
// - Hero: Semantic router (auto-selects treatment based on data)
// - LocationHero: Standard 60vh hero (default, always available)
// - DiaryHero: Cinematic 90vh hero with animated title (narrative-heavy destinations)
// Fallback rule: If themed hero unavailable → use LocationHero
// See heroData.js for asset registry pattern

export { default as Hero } from './Hero';  // Semantic hero (auto-routes to Location/Diary)
export { default as LocationHero } from './LocationHero';  // Standard 60vh
export { default as DiaryHero } from './DiaryHero';  // Cinematic 90vh
export { default as IntroGrid } from './IntroGrid';
export { default as NarrativeSplit } from './NarrativeSplit';
export { default as RhythmInsert } from './RhythmInsert';
export { default as BridgeQuote } from './BridgeQuote';
export { default as SubsectionNavigator } from './SubsectionNavigator';
export { default as ReflectiveClose } from './ReflectiveClose';
export { default as HeroSpreadLightbox } from './HeroSpreadLightbox';

// System resolver exports (for dev debugging and programmatic access)
export { resolveHero, resolveHeroDebug } from '../../system/resolvers/resolveHero';
