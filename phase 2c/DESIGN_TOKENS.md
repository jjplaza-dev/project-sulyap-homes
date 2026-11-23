# DESIGN_TOKENS.md — Sulyap Homes & Leasing

Source of truth: `src/styles/sulyap.css`. Light theme only (assumption A5).
Contrast ratios below were **computed by hand from the WCAG relative-luminance formula** on 2026-11-18. They have not been checked with a tool: **verify each with a contrast checker** (NOT RUN — USER ACTION REQUIRED).

## 1. Brand colors (maximum five)

| Token | Hex | Role |
|-|-|-|
| `--cloud-mist` | `#F4F3EC` | Page canvas, light surfaces (dominant, ~70%) |
| `--pine-evergreen` | `#28483B` | Primary brand: headings, nav, primary buttons |
| `--highland-moss` | `#899B78` | Secondary surfaces, illustration fills, icons |
| `--panagbenga-sunflower` | `#E4B64B` | Small highlights, active states, decorative accents |
| `--petal-berry` | `#C96580` | Selective floral accents, decorative details |

## 2. Derived tokens (tints and shades, not new brand colors)

| Token | Hex | Role |
|-|-|-|
| `--surface` | `#FAF9F4` | Cards, inputs: slightly lighter than Mist |
| `--moss-tint` | `#E3E8DC` | Secondary surface |
| `--moss-deep` | `#6F8261` | Input borders (needs ≥ 3:1) |
| `--sunflower-soft` | `#F6E7BD` | Highlight wash |
| `--berry-deep` | `#9E3F5B` | Small berry text and labels |
| `--pine-ink` | `#2E4C40` | Body text (slightly softened Pine) |
| `--pine-soft` | `#55685D` | Secondary / muted text |
| `--success` | `#2D6A4F` | Success text and borders |
| `--danger` | `#A4343A` | Error text and borders |

Warning uses Pine text on `--sunflower-soft` (no extra color).

## 3. Contrast (computed)

| Foreground on background | Ratio | Verdict |
|-|-|-|
| Pine on Mist / Mist on Pine | 9.07:1 | AAA. All text, buttons |
| Pine-ink on Mist | 8.49:1 | AAA. Body text |
| Pine on Moss tint | 8.09:1 | AAA |
| Pine on Sunflower soft | 8.21:1 | AAA |
| Pine on Sunflower | 5.33:1 | AA. Chips, active states, secondary button |
| Sunflower on Pine | 5.33:1 | AA. Small headings on Pine (footer) |
| Mist at 75% on Pine | ≈ 5.9:1 | AA. Footer secondary text |
| Pine-soft on Mist | 5.36:1 | AA. Muted text |
| Pine-soft on Moss tint | ≈ 4.8:1 | AA (narrow margin) |
| Berry-deep on Mist | 5.69:1 | AA. Small labels |
| Success on Mist | 5.74:1 | AA |
| Danger on Mist | 6.03:1 | AA |
| Moss-deep on Mist | 3.74:1 | ≥ 3:1. Input borders, UI boundaries only |
| Pine on Moss | 3.37:1 | Large text and UI only. Never small body text |
| Petal Berry on Mist | 3.34:1 | Large text, icons, decoration only |
| White on Petal Berry | 3.71:1 | Bold or large text only |
| Moss on Mist | 2.69:1 | Decoration only (below 3:1: never a required boundary) |
| Sunflower on Mist | 1.70:1 | Decoration only. **Never text** |

Rules: never place Sunflower and Berry together as large backgrounds. Use `--berry-deep`, not Petal Berry, for small text.

## 4. Typography

| Role | Face | Notes |
|-|-|-|
| Display, H1–H3 | Fraunces (`next/font/google`) | Weight 400–600 via variable font; tracking −0.015 to −0.02em at display sizes |
| Body, UI, prices | DM Sans (`next/font/google`) | 17 px / 1.65; reading width 64ch |

Fluid utilities: `text-display-xl` (44–88 px), `text-display-lg` (36–64 px), `text-display-md` (28–44 px), `text-eyebrow` (13 px, 0.1em tracking, uppercase, sparing). `numeric-tabular` for prices and measurements.

**UNVERIFIED — USER MUST CONFIRM:** that the served DM Sans subset renders tabular figures; that Fraunces optical-size/softness axes are supported by the installed `next/font` (not used).

## 5. Shape, depth, spacing

| Aspect | Value |
|-|-|
| Radius | sm 6 · md 10 · lg 14 (cards, image frames) · xl 20 (sheets, modals) · pills only for small chips |
| Elevation | `shadow-sm`, `shadow-md`, `shadow-lg`: low-alpha Pine; prefer 1 px borders and dividers |
| Sections | `py-16 sm:py-20 lg:py-28 xl:py-32` (64 → 128 px); container 1280 px |
| Touch targets | `min-h-11` (44 px) on every button, link and control |

## 6. Focus and motion

- Focus ring (unlayered in `sulyap.css`): 2 px Pine outline + 5 px Sunflower halo; on Pine surfaces (`.on-pine`) the outline turns Mist. Readable on Mist, Moss, Sunflower and Pine.
- Motion constants live in `src/lib/motion.ts`: micro 0.18 s, standard 0.42 s, reveal 0.8 s; ease `power3.out`; elastic only for drawers.
- Every GSAP effect is wrapped in `gsap.matchMedia()`. Reduced motion: no parallax, tilt or magnetic; reveals become fades; CSS transitions are shortened to ~0.
- Components: `Reveal`, `Magnetic`, `Tilt`, `Parallax` (`src/components/motion`). Interactive cursor zones come in batch 2D.

## 7. Texture

- Paper grain: `body::before` with an inline SVG `feTurbulence` data URI at 5% opacity, `mix-blend-mode: multiply`. Tune `opacity` if it reads too strong or weak.
- Architectural grid lines: `bg-grid-lines` and `bg-grid-lines-light` (96 px, 6–7% alpha), applied per section with `<Section grid>`.
- Window motif: `rounded-arch` utility and `WindowFrame` (arch top with an offset frame line). Use sparingly.

## 8. shadcn variable mapping

`html:root` in `sulyap.css` re-points `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring` and `--radius` at the tokens above. If a shadcn component keeps its old look, check that the `@import` line was added to the stylesheet named in `components.json`.
