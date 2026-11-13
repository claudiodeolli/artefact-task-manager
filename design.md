# Design — Artefact Studied

A locked design system for the task manager. Every page reads this file before it is changed. Consistency is the goal.

## Source

Studied DNA from the public site https://www.artefact.com/br/ (URL mode plus rendered captures, 2026-11-13). Only aesthetic traits are adopted: type family, palette, gradient bands, pill buttons, square cards, and the short rule under headings. No logo, imagery, copy, or page layout is reproduced.

## Structure (owned by this app, not the source)

- A sticky navy top bar: brand, ledger label, and the magenta New task pill. No side menu.
- One centred working column, max 1200px.
- List page: a heading block (mono eyebrow, gradient-text title, description, short gradient rule) beside a navy count panel; then one vertical column of identical square task cards.
- Form pages: a gradient intro panel joined to a white form sheet; they stack below 1100px.
- Not-found: a gradient panel. Empty list: a white bordered panel.
- Footer: a full-bleed gradient band with the quote and a short white rule.

## Theme

All colours are OKLCH in `src/app/tokens.css`.

- Navy `oklch(20.5% 0.06 268)` (source `#0d1634`) for ink, the top bar, and dark panels.
- Magenta `oklch(63.5% 0.255 8)` (source `#ff0066`) for rules, gradients, and error accents. Buttons use the darker magenta fill `oklch(58.5% 0.235 8)` so white text passes AA; magenta text uses `oklch(52% 0.21 8)`.
- Blue `oklch(56% 0.23 264)` (source `#1f65ff`) for focus and success. Violet `oklch(70% 0.17 303)` for the "shown" pill.
- Canvas `oklch(97.4% 0.005 265)`, cards and sheets pure white, hairline `oklch(89% 0.008 265)`.
- Gradient band: deep blue → purple → magenta at 100°. Gradient text (title only): magenta → purple → blue.

## Typography

- IBM Plex Sans 400 for headings (no tight tracking, line-height 1.05–1.2), 500/600 for labels and buttons, 400 body at 16/24.
- IBM Plex Mono 400 for dates, eyebrows, hints, and colophons; Plex Mono 100 for the large count numeral.
- Display `clamp(2.75rem, 4.2vw + 1rem, 4.375rem)`.

## Shape and motion

- Buttons are pills (50px radius). Cards, panels, inputs, and notices are square.
- No shadows. Cards rise 2px on hover and reveal a 4px magenta→blue bar on the left edge.
- Easing `cubic-bezier(0.21, 0.6, 0.35, 1)` from the source; 200ms colour, 400ms movement. Reduced motion removes movement.

## CTA voice

- Primary: magenta pill, white text, turns navy on hover (white on the navy bar).
- Secondary: navy outline pill, fills navy on hover.
- Destructive: magenta text pill, soft magenta fill on hover.

## Rules

- No invented metrics; the only numbers are real API counts.
- No imagery, no reproduced brand assets.
- Usable at 320, 375, 414, and 768 pixels with no horizontal scroll.
- Skip link, semantic headings, labelled fields, visible focus everywhere.
- Copy, labels, and behaviour are owned by the components; a visual redesign changes CSS and font loading only.

## Hallmark review

Pre-emit critique: Philosophy 4 · Hierarchy 5 · Execution 5 · Specificity 5 · Restraint 4 · Variety 4. No stamp comment in the CSS because the project forbids code comments; this file and `.hallmark/log.json` are the durable record.
