# Token Migration Audit

**Goal:** Every visual decision comes from `src/styles/tokens.js`.

**Status:** Layout components ✓ | Existing pages need incremental migration

---

## Migration Priority

### Phase 1: Foundation (DONE ✓)
- [x] Create `tokens.js` with all design decisions
- [x] Export `tw` convenience classes
- [x] Update layout components to use tokens

### Phase 2: Incremental Page Migration (IN PROGRESS)

Migrate pages when you touch them. Don't batch-rebuild.

**Format for each page:**
```
Page: [name]
Status: [pending | in-progress | done]
Hardcoded Values Found:
  - text-[#B8860B] (line 45)
  - mt-[37px] (line 112)
  - etc.
Migration Notes: [any complications]
```

---

## Audit Results

### High Priority (Active Pages)

| Page | Status | Hardcoded Values |
|------|--------|------------------|
| `SaoPaulo.js` | ✅ REFERENCE (keep as-is) | `text-[#B8860B]`×3, `text-[#222]`, `text-[#333]`×2, `text-[#444]`×3, `text-[#555]`, `text-[#2a2a2a]`, `py-6`, `py-12`×2, `gap-10`×2, `mb-10`, `mb-12`×2 |
| `SaoPauloRefactored.js` | ✅ TOKENIZED | Uses `tw.hero`, `tw.lead`, `tw.body`, `tw.image`, `tokens.layout.heroHeight` |
| `Rio.js` | ⏳ PENDING | (audit pending) |
| `Athens.js` | ⏳ PENDING | (audit pending) |
| `Tennessee.js` | ⏳ PENDING | (audit pending) |

### Medium Priority (Subsection Pages)

| Page | Status |
|------|--------|
| `GreenSpaces.js` | pending |
| `ArtGalleries.js` | pending |
| `CarnivalSaoPaulo.js` | pending |
| `Graffiti.js` | pending |

---

## Hardcoded Value Patterns to Replace

### Colors (CRITICAL — Most Common)
```
❌ BAD:  text-[#B8860B]
✅ GOOD: text-gold (or import { tw } and use tw.hero)

❌ BAD:  text-[#222]
✅ GOOD: text-text-primary (or tw.textPrimary)

❌ BAD:  text-[#333]
✅ GOOD: text-text-secondary (or tw.textSecondary)

❌ BAD:  text-[#444]
✅ GOOD: text-text-tertiary (or tw.textTertiary)

❌ BAD:  text-[#555]
✅ GOOD: text-text-muted (or tw.textMuted)

❌ BAD:  text-[#666]
✅ GOOD: text-text-subtle (or tw.textSubtle)
```

### Spacing
```
❌ BAD:  mt-[37px], h-[60vh]
✅ GOOD: mt-section, h-hero (or use tokens.spacing.section)

❌ BAD:  py-12 (context-dependent)
✅ GOOD: py-bridge (if it's a bridge section)
```

### Shadows & Borders
```
❌ BAD:  shadow-[0_0_20px_rgba(...)]
✅ GOOD: shadow-card (or tokens.shadows.card)

❌ BAD:  rounded-sm (inconsistent)
✅ GOOD: rounded-lg (or tokens.radius.lg)
```

### Opacity / Overlays
```
❌ BAD:  bg-black/30
✅ GOOD: Use tokens.colors.overlay.hero

❌ BAD:  bg-black/5
✅ GOOD: Use tokens.colors.overlay.imageTone
```

---

## Migration Workflow (Per Page)

### Step 1: Audit
```bash
# Find hardcoded values in the page
node scripts/audit-page.js src/pages/Rio.js
```

### Step 2: Import Tokens
```javascript
import { tw, tokens } from '../styles';
```

### Step 3: Replace Systematically
Start from top of file, work down:
1. Replace `text-[#B8860B]` → `tw.hero` or `tw.section`
2. Replace `text-[#222]` → `tw.textPrimary`
3. Replace `text-[#333]` → `tw.lead`
4. Replace `text-[#444]` → `tw.body`
5. Replace `rounded-sm` / `shadow-sm` → `tw.image`
6. Replace `h-[60vh]` → `tokens.layout.heroHeight`

### Step 4: Test
- Visual comparison with original
- Mobile responsive check
- No console errors

### Step 5: Mark Complete
Update this audit file with completion note.

---

## Token Reference Quick Sheet

| Visual Element | Token Path | Tailwind Class |
|----------------|-----------|----------------|
| Gold accent | `tokens.colors.gold` | `text-gold` |
| Body text | `tokens.colors.text.primary` | `text-text-primary` |
| Hero heading | `tokens.typography.hero` | `tw.hero` |
| Section heading | `tokens.typography.section` | `tw.section` |
| Lead paragraph | `tokens.typography.lead` | `tw.lead` |
| Body paragraph | `tokens.typography.body` | `tw.body` |
| Caption | `tokens.typography.caption` | `tw.caption` |
| Image card | - | `tw.image` |
| Bridge padding | `tokens.spacing.bridge` | `py-bridge` |
| Hero height | `tokens.layout.heroHeight` | `h-hero` |

---

## Migration Command Cheatsheet

```javascript
// Replace in file: text-[#B8860B] → text-gold
// Replace in file: text-[#222] → text-text-primary
// Replace in file: text-[#333] → text-text-secondary
// Replace in file: text-[#444] → text-text-tertiary
// Replace in file: text-[#555] → text-text-muted
// Replace in file: text-[#666] → text-text-subtle
// Replace in file: rounded-sm shadow-sm → rounded-lg shadow-md
// Replace in file: h-[60vh] → h-hero (or use tokens)
```

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2024-05-07 | Keep original `SaoPaulo.js` as-is | Reference implementation for comparison |
| 2024-05-07 | Migrate `SaoPauloRefactored.js` first | Proves token system works |
| 2024-05-07 | Create `tw` convenience exports | Easier migration than full token paths |

---

## Next Actions

1. **Update Tailwind Config** — Add token classes to tailwind.config.js (text-gold, text-text-primary, etc.)
2. **Create Audit Script** — `scripts/audit-page.js` to detect hardcoded values
3. **Migrate First New Page** — Pick one (e.g., `Rio.js`) and fully tokenize it
4. **Add ESLint Rule** — Warn on hardcoded hex codes (future)

---

## Success Criteria

- [ ] Zero hardcoded hex codes in new pages
- [ ] All layout components use tokens
- [ ] Typography consistent across all migrated pages
- [ ] Spacing rhythm feels intentional
- [ ] New pages can be built without "designing manually"
