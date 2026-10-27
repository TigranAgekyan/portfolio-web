---
name: Editorial Monograph
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#c1c7cf'
  on-secondary: '#2b3138'
  secondary-container: '#434a51'
  on-secondary-container: '#b3b9c1'
  tertiary: '#c8ccd8'
  on-tertiary: '#2c313a'
  tertiary-container: '#acb1bd'
  on-tertiary-container: '#3f444e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#dde3eb'
  secondary-fixed-dim: '#c1c7cf'
  on-secondary-fixed: '#161c22'
  on-secondary-fixed-variant: '#41474e'
  tertiary-fixed: '#dee2ef'
  tertiary-fixed-dim: '#c2c6d2'
  on-tertiary-fixed: '#171c24'
  on-tertiary-fixed-variant: '#424751'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.65'
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.6'
  tech-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
---

## Brand & Style

This design system embodies an editorial, human, calm, and deeply restrained aesthetic tailored for a senior developer portfolio. It rejects standard tech clichés—such as saturated neon gradients, rounded card stacks, floating glass layers, and simulated operating system chrome. Instead, it draws inspiration from high-end printed monographs, literary journals, and Swiss architectural catalogs.

The emotional signature is quiet mastery, intellectual clarity, and unhurried confidence. The visual tone treats technical work as craft, prioritizing legibility, meticulous type proportion, and deliberate whitespace over decorative ornamentation. 

Key attributes:
- **Calm Austerity:** Minimal elements, generous breathing room, intentional placement.
- **Editorial Structure:** Layouts driven by typographic scale, disciplined line rules, and asymmetrical tension.
- **Utilitarian Warmth:** Technical precision balanced with considered human-centered type choices.

## Colors

The palette operates under absolute chromatic discipline. Color is never decorative; it exists solely to structure reading order and signal interactive affordance.

- **Canvas Background (`#0F1115`):** A deep, matte charcoal absorbing glare and creating a rich, non-distracting reading plane. Avoid pure `#000000`.
- **Primary Text (`#F3F4F6`):** Off-white, soft contrast designed to maximize prolonged reading comfort while preserving crisp definition.
- **Muted Gray (`#9BA1A9`):** Subdued neutral for secondary copy, metadata, captions, and structural labels.
- **Borders & Dividers (`#222730`):** Low-contrast structural gray for hairline 1px dividers and subtle rule lines.
- **Accent Amber (`#F59E0B`):** Reserved exclusively for active text hyperlinks, focused interactive states, and primary call-to-action buttons. Never used for ambient backgrounds or glow effects.

## Typography

The typographical pairing sets up a dialogue between human editorial character and precise functional delivery:

- **Headings & Display (`Bricolage Grotesque`):** Delivers organic warmth, quirky charm, and editorial distinction. Tightly tracked at larger sizes for dense visual impact.
- **Body & Longform Copy (`IBM Plex Sans`):** Clean, neutral, high-legibility grotesque engineered for effortless scanning. Hebrew script seamlessly falls back to `IBM Plex Sans Hebrew` under identical sizing rules. Body copy must strictly honor `max-width: 65ch` to preserve optimal eye movement.
- **Technical Annotations (`JetBrains Mono` / Monospace):** Restricted purely to timestamps, numerical dates, commit hashes, and inline tech tags. Monospace is never applied to conversational text or navigational headers.

## Layout & Spacing

The layout embraces an asymmetric, magazine-style rhythm with broad open planes.

- **Grid Architecture:** 12-column asymmetrical fluid system capped at a maximum width of `1200px`. Editorial articles anchor left or balance across non-uniform spans (e.g., 4 columns for metadata/abstract, 7 columns for body narrative, 1 column empty).
- **Measure & Breathing Room:** Prose blocks enforce `max-width: 65ch` regardless of container expansion.
- **Structural Partitioning:** Sections and item rows are separated by crisp, 1px horizontal hairline rules using `#222730`. No soft box wrappers, nested panels, or artificial cards.
- **Breakpoints:**
  - **Mobile (< 768px):** Single-column sequence, margins collapse to `margin-mobile` (1.5rem), gap rhythm reduces to tight vertical steps.
  - **Desktop (>= 768px):** Asymmetric two- and three-column splits, generous `margin` (4rem), wide empty tracks.

## Elevation & Depth

This system operates entirely on a flat, two-dimensional plane. 

- **Zero Shadows:** Elevation through drop shadows, ambient blur radiuses, or diffuse colored penumbras is prohibited.
- **Surface Hierarchy:** Depth is created exclusively via planar containment and contrast. Backgrounds remain anchored at `#0F1115`.
- **Structural Dividers:** Hairline borders (`1px solid #222730`) delineate sections, table entries, and header thresholds.
- **Hover Transitions:** Interactive components manifest depth through instantaneous or subtle (150ms ease) foreground shifts—switching border tone from `#222730` to `#9BA1A9` or shifting text color to `#F59E0B`.

## Shapes

The design system enforces a sharp geometry (`roundedness: 0`). 

- Corners are strictly unrounded (`border-radius: 0px`).
- Buttons, tags, inputs, and borders feature crisp perpendicular angles.
- Pill badges, rounded buttons, bubble avatars, and organic border radiuses are explicitly avoided to reinforce the printed editorial aesthetic.

## Components

### Buttons
- **Primary Button:** Flat background `#F59E0B`, text `#0F1115`, font weight bold/medium. 0px border-radius. Padding: `0.75rem 1.5rem`. Hover state: `#D97706`. No shadows.
- **Secondary / Ghost Button:** Transparent background, `1px solid #222730`, text `#F3F4F6`. Hover state: border color `#9BA1A9`, text `#F59E0B`.

### Hyperlinks
- Rendered in `#F3F4F6` with a subtle underline in `#222730` offset by 3px.
- Hover state: text and underline transition to `#F59E0B`. External links may feature a minimal monospaced arrow (`↗`).

### Tech Tags & Chips
- Monospace font (`JetBrains Mono`, 0.8125rem).
- Transparent background with a `1px solid #222730` outline or plain bracketed presentation (`[ react ]`).
- Text color `#9BA1A9`. No pill shapes.

### Project & Writing Lists
- Instead of stacked card components, list items are arranged as linear horizontal ledger entries separated by `1px solid #222730` rules.
- Each row aligns metadata: date (monospace, `#9BA1A9`), project or article title (`Bricolage Grotesque`, `#F3F4F6`), and brief description (`IBM Plex Sans`, `#9BA1A9`).
- Row hover: whole row background subtly transitions to `#14181F` or title highlights in `#F59E0B`.

### Form Inputs
- Flat, rectangular fields with `#0F1115` fill and `1px solid #222730` perimeter.
- Text: `#F3F4F6`. Placeholder: `#9BA1A9`.
- Focus state: border turns `#F59E0B` with zero outer glow rings.

### Quotes & Footnotes
- Pull quotes use larger display cuts of `Bricolage Grotesque` set directly against the canvas, flanked by a 1px left rule in `#F59E0B`.
- Footnotes use `IBM Plex Sans` (0.8125rem) in `#9BA1A9` anchored at the base of sections with small monospace numbering.