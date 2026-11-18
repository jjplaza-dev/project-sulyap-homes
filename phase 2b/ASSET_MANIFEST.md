# ASSET_MANIFEST.md — Sulyap Homes & Leasing

> **Status: initial (Phase 2, batch 2B).** Nothing listed here has been photographed, downloaded, licensed or exported. Every image in the Phase 2 preview is an original SVG/CSS placeholder. This file tells you what real assets to obtain or produce.

## 1. Sourcing rules

1. **Commissioned or owned photography of the real listings is strongly preferred.** Authentic photographs are part of Sulyap's promise.
2. If royalty-free images are used for editorial areas (hero, neighborhoods), confirm the license permits commercial use, record the author and source in §7, and keep attribution where required. Never use stock images to depict a real listing.
3. Do not use images of identifiable people without written consent. Do not use copyrighted artwork, brand imagery, or screenshots from other sites.
4. Deliver at least 2× the largest displayed size, as sRGB JPEG (or WebP). Keep originals; export web copies.
5. Write alt text for every image describing what it shows. Replace "Illustrative placeholder" wording when real photos arrive.
6. Remove location metadata (EXIF GPS) from every listing photo before upload. Exact property coordinates must not leak.

## 2. Brand raster exports (USER ACTION REQUIRED)

The agent can author SVGs but cannot export raster files. Produce these from the SVG logo family once approved:

| Asset | Size | Intended path | Source |
|-|-|-|-|
| Favicon (multi-size) | 16, 32, 48 px | `src/app/favicon.ico` | Symbol (monochrome-safe) |
| Apple touch icon | 180 × 180 | `src/app/apple-icon.png` | Symbol on Cloud Mist |
| App icon 192 / 512 | 192², 512² | `public/icons/icon-192.png`, `icon-512.png` | Symbol |
| Open Graph / social share | 1200 × 630 | `src/app/opengraph-image.png` | Logo on Cloud Mist, ridge motif |
| Social profile (square) | 1080 × 1080 | `public/brand/social-square.png` | Compact square logo |
| Monochrome logo (print/dark use) | SVG + PNG | `public/brand/logo-mono.svg` | Monochrome variant |

## 3. Shot lists by property type

Aspect ratios match the placeholders so layouts will not shift. Landscape = 3:2; portrait = 4:5.

| Shot | Aspect | Notes |
|-|-|-|
| Exterior / front (primary) | 3:2 (1600×1067 min. 2400×1600 recommended) | Soft daylight, straight-on, no cars blocking the facade |
| Street frontage | 3:2 | Shows approach and neighbors; no readable house numbers |
| Living area | 3:2 | Natural light; tidy |
| Kitchen and dining | 3:2 | Show counters and storage |
| Bedroom | 4:5 | One per main bedroom as needed |
| Bathroom | 4:5 | Clean, well lit |
| Garden / terrace | 3:2 | Where present |
| View / ridge | 3:2 | Where it is a selling point |
| Lot: boundary, access, view | 3:2 | Walk the boundary; show road access and slope |
| Floor plan | 7:5 | Clean line drawing, labeled rooms, one image per level |

Targets per listing: 4–8 images (lots: 4–5).

## 4. Property images

Intended path pattern: `public/images/properties/{slug}/{NN}-{view}.jpg`, e.g. `public/images/properties/pine-shaded-family-house-aurora-hill/01-front.jpg`. Floor plans: `.../plan-{level}.png` or `.svg`.

| ID | Slug | Type | Images | Floor plans |
|-|-|-|-|-|
| prop-s01 | pine-shaded-family-house-aurora-hill | House | 8 | 2 |
| prop-s02 | garden-house-near-the-ridge-camp-7 | House | 7 | 1 |
| prop-s03 | one-bedroom-condominium-ridge-views-pacdal | Condominium | 6 | 1 |
| prop-s04 | two-bedroom-condominium-quezon-hill | Condominium | 6 | 1 |
| prop-s05 | corner-townhouse-in-a-quiet-row-loakan | Townhouse | 7 | 3 |
| prop-s06 | ground-floor-apartment-unit-la-trinidad | Apartment | 5 | 0 |
| prop-s07 | residential-lot-with-pine-frontage-camp-7 | Lot | 5 | 0 |
| prop-s08 | large-hillside-lot-loakan | Lot | 5 | 0 |
| prop-s09 | small-residential-lot-la-trinidad | Lot | 4 | 0 |
| prop-r01 | three-bedroom-house-for-rent-quezon-hill | House | 8 | 2 |
| prop-r02 | cozy-two-bedroom-cottage-camp-7 | House | 6 | 0 |
| prop-r03 | furnished-studio-condominium-pacdal | Condominium | 6 | 1 |
| prop-r04 | two-bedroom-condominium-with-parking-aurora-hill | Condominium | 6 | 1 |
| prop-r05 | bright-one-bedroom-apartment-loakan | Apartment | 5 | 0 |
| prop-r06 | budget-apartment-unit-la-trinidad | Apartment | 4 | 0 |
| prop-r07 | two-storey-townhouse-for-rent-pacdal | Townhouse | 7 | 2 |

These are fictional sample listings. Replace them with Sulyap's real listings in Sanity (Phase 3); this table then becomes a template.

## 5. Agents and neighborhoods

| Asset | Count | Aspect | Intended path | Notes |
|-|-|-|-|-|
| Agent portraits | 1 per active agent | 4:5 (800×1000 min.) | `public/images/agents/{slug}.jpg` | Consent and release from each agent; neutral, natural background |
| Neighborhood photos | 3 per neighborhood | 3:2 | `public/images/areas/{slug}/{NN}.jpg` | Streetscape, surroundings, residential garden or similar |

Neighborhoods: aurora-hill, camp-7, loakan, pacdal, quezon-hill, la-trinidad.

## 6. Editorial and homepage imagery

| Use | Aspect | Intended path | Notes |
|-|-|-|-|
| Homepage hero (layered, window-masked) | 4:5 main + 3:2 secondary | `public/images/editorial/hero-main.jpg`, `hero-secondary.jpg` | Warm daylight, a real home or Baguio ridge view; room for mask crops |
| Introduction / About image | 3:2 | `public/images/editorial/about.jpg` | Not a stock "handshake" image |
| Viewing call-to-action background | 16:9 | `public/images/editorial/viewing-cta.jpg` | Subtle; text sits on top |

## 7. Licensing record (fill in as assets arrive)

| File | Source / photographer | License | Attribution required? | Date added |
|-|-|-|-|-|
| _(none yet)_ | | | | |
