/**
 * Page Templates — Editorial pacing patterns
 * 
 * THREE structural templates, many tonal variants.
 * 
 * ─────────────────────────────────────────────────────────────────────
 * CountryLandingTemplate — regional journey orchestrator (navigation sequencer)
 *   variant="tropical"     → Brazil (humid organic greens)
 *   variant="mediterranean" → Greece (chalky sun-faded stone) [future]
 *   variant="industrial"   → Belgium (muted paper) [future]
 *   variant="continental"  → Hungary (warm grain) [future]
 *
 * DenseTemplate  — exploration + navigation + layered discovery
 *   variant="megacity"    → São Paulo, Antwerp
 *   variant="industrial"  → leaner megacity, no snapshot
 * 
 * LightTemplate  — atmosphere + pacing + immersion
 *   variant="urban"       → Rio (dark palette, compact)
 *   variant="historical"  → Budapest, Athens (paper, multi-narrative)
 *   variant="nature"      → Pantanal, Iguazu (feature image, minimal text)
 *   variant="coastal"     → Ilha Grande (lightest overlay, open water)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * OR: Mix and match individual layout components from 'components/layout'
 * for completely custom pages.
 * 
 * Legacy templates kept during page migration — do not use for new pages.
 */

export { default as DenseTemplate } from './DenseTemplate';
export { default as LightTemplate } from './LightTemplate';
export { default as CountryLandingTemplate } from './CountryLandingTemplate';

// Legacy — kept during migration, do not use for new pages
export { default as DenseEditorialTemplate } from './DenseEditorialTemplate';
export { default as BreathAndSpaceTemplate } from './BreathAndSpaceTemplate';
export { default as SlowRevealTemplate } from './SlowRevealTemplate';
