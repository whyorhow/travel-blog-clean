# Germany + Berlin Implementation Plan

## Template Decisions
- **Germany Hub**: CountryLandingTemplate with variant `continental` (matching other European country hubs)
- **Berlin**: **DenseTemplate** — exploration-heavy city with museums, landmarks, districts, neighbourhoods, food scenes, and layered history (42 images across 5 categories: City Scale, The Routine, Street Level, Slices of History, Berlin Hero Image)

## Asset Status
- Germany map: NOT ready — use placeholder SVG/div
- Berlin CSV: Ready at `public/assets/Berlin-Imagetable.csv`
- Berlin images: Staged at `C:\Users\benji\cloudinary-staging\images\Germany\Berlin\`
- Berlin hero candidate: Entry 16 "The Green Trabant" (Berlin Hero Image category)

## Implementation Order
1. Germany hub structure + placeholder map
2. Berlin asset import (CSV → artImages.json)
3. Cloudinary upload + slice generation
4. Berlin destination page (DenseTemplate)
5. System wiring (routes, SEO, navigation, etc.)
6. Validation and build test