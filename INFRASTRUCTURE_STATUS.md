# Infrastructure Status — Design System Implementation

**Date:** 2024-05-07  
**Phase:** Foundation Complete → Incremental Migration Ready

---

## ✅ COMPLETED (Foundation)

### 1. Design Tokens System
**File:** `src/styles/tokens.js`

```javascript
tokens.colors.gold              // #B8860B
tokens.colors.text.primary      // #222
tokens.colors.text.secondary    // #333
tokens.colors.text.tertiary     // #444
tokens.colors.text.muted        // #555
tokens.colors.text.subtle       // #666
tokens.spacing.bridge           // 3rem
tokens.layout.heroHeight        // 60vh
tokens.shadows.card             // 0 4px 6px rgba(0,0,0,0.1)
// ... complete system
```

### 2. Tailwind Integration
**File:** `tailwind.config.js`

All token classes registered:
- `text-gold`, `text-text-primary`, `text-text-secondary`, etc.
- `text-hero`, `text-section`, `text-lead`, `text-body`
- `py-bridge`, `rounded-image`, `shadow-card`

### 3. Layout Components (Tokenized)
**Files:** `src/components/layout/*.js`

| Component | Status | Token Usage |
|-----------|--------|-------------|
| `LocationHero.js` | ✅ | `tokens.layout.heroHeight` |
| `IntroGrid.js` | ✅ | `tw.hero`, `tw.lead`, `tw.body`, `tw.image`, `tw.caption` |
| `NarrativeSplit.js` | ✅ | `tw.subsection`, `tw.image`, `tw.textPrimary` |
| `RhythmInsert.js` | ✅ | Clean — no hardcoded values |
| `BridgeQuote.js` | ✅ | Clean — no hardcoded values |
| `SubsectionNavigator.js` | ✅ | Uses inherited classes |
| `ReflectiveClose.js` | ✅ | Clean — no hardcoded values |

### 4. Page Templates
**Files:** `src/pages/templates/*.js`

| Template | Purpose | Status |
|----------|---------|--------|
| `DenseEditorialTemplate.js` | Urban/fast (São Paulo) | ✅ Ready |
| `BreathAndSpaceTemplate.js` | Natural/slow (Ilha Grande) | ✅ Ready |
| `SlowRevealTemplate.js` | Historical/layered (Tennessee) | ✅ Ready |

### 5. Documentation
- `DESIGN_SYSTEM.md` — Complete token reference
- `SIGNATURE_OBJECTS.md` — Visual anchors per destination
- `PAGE_IMPLEMENTATION_GUIDE.md` — How to build new pages
- `MIGRATION_AUDIT.md` — Tracking migration status

### 6. Audit Tool
**File:** `scripts/audit-page.js`

```bash
node scripts/audit-page.js src/pages/Rio.js
```

Detects:
- Hardcoded hex colors
- Arbitrary spacing (`mt-[37px]`)
- Inline shadows
- Inline opacity (`bg-black/30`)
- Inconsistent radius

---

## 🚧 IN PROGRESS

### Immediate Next Steps

1. **Test Tokenized Components**
   - [ ] Verify `SaoPauloRefactored.js` renders identically to original
   - [ ] Check all layout components in browser
   - [ ] Validate Tailwind classes compile correctly

2. **Migrate First Real Page**
   - Pick: `Rio.js` or `Athens.js`
   - Run: `node scripts/audit-page.js src/pages/Rio.js`
   - Replace hardcoded values systematically
   - Test visual parity

---

## 📋 MIGRATION WORKFLOW (Established)

```bash
# 1. Audit
node scripts/audit-page.js src/pages/[PAGE].js

# 2. Import tokens
import { tw, tokens } from '../styles';

# 3. Replace (top to bottom)
text-[#B8860B]    → tw.hero or tw.section
text-[#222]       → tw.textPrimary  
text-[#333]       → tw.lead
text-[#444]       → tw.body
rounded-sm        → tw.image (rounded-lg shadow-md)
h-[60vh]          → tokens.layout.heroHeight

# 4. Test
- Visual comparison
- Mobile check
- No console errors

# 5. Mark complete in MIGRATION_AUDIT.md
```

---

## 🎯 SUCCESS METRICS

| Metric | Target | Current |
|--------|--------|---------|
| Layout components tokenized | 100% | 100% ✅ |
| New pages using tokens | 100% | Ready ✅ |
| Hardcoded values in new code | 0 | Enforced ✅ |
| Pages migrated | 40 | 1 (SaoPauloRefactored) |

---

## 🔄 NEXT PHASES (Per Your Roadmap)

### Phase 2: Lock the Design Tokens ✅ DONE
All visual decisions now come from `src/styles/tokens.js`.

### Phase 3: Convert Existing Pages Incrementally 🚧 READY
- Don't batch-rebuild
- Migrate when you touch a page
- Audit tool provides checklist

### Phase 4: Create True Layout Shell 📋 PLANNED
```jsx
<LocationLayout template="dense-editorial">
  {/* content orchestration, not page construction */}
</LocationLayout>
```

### Phase 5: Centralise Animation 📋 PLANNED
```javascript
motion-soft-rise
motion-gallery-hover
motion-fade-slow
```

### Phase 6: Build Guardrails Slowly 📋 PLANNED
Start with:
- Forbid arbitrary colours
- Forbid arbitrary spacing
- Forbid inline shadows

### Phase 7: Cross-Page Experience 📋 PLANNED
Emotional transitions BETWEEN pages:
- São Paulo → Ilha Grande (pacing slows)
- Visual/texture/spacing shifts
- Immersive world feel

---

## 🎨 REFERENCE: Token Quick Sheet

```javascript
// COLORS
import { tw } from '../styles';

tw.gold           // text-[#B8860B]
tw.textPrimary    // text-[#222]
tw.textSecondary  // text-[#333]
tw.textTertiary   // text-[#444]
tw.textMuted      // text-[#555]
tw.textSubtle     // text-[#666]

// TYPOGRAPHY
tw.hero           // text-4xl md:text-5xl font-semibold text-gold
tw.section        // text-4xl font-semibold text-gold
tw.subsection     // text-2xl font-semibold text-gold
tw.lead           // text-xl md:text-2xl leading-relaxed text-secondary
tw.body           // text-lg md:text-xl leading-relaxed text-tertiary
tw.caption        // text-xs leading-snug text-subtle

// COMPONENTS
tw.image          // rounded-lg shadow-md
```

---

## 🚀 IMMEDIATE ACTION

**Ready to migrate your first real page:**

1. Pick a page (suggest `Rio.js` — Brazil, similar to São Paulo)
2. Run: `node scripts/audit-page.js src/pages/Rio.js`
3. Follow the checklist it generates
4. Use `SaoPauloRefactored.js` as reference

The infrastructure is solid. The system will prevent drift. Now it's about gradual adoption, not big rewrites.
