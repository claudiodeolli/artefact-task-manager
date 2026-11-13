# Design — Pastel Bento

A locked design system for the task manager. Every page reads this file before it is changed. Consistency is the goal; variety lives in tile colour and composition, not in a different theme per page.

## Concept

The interface is a bento workspace: a black working rail, a warm cream canvas, and rounded tiles that each carry one job. It is studied from three references — a bento dashboard (lilac, vermilion, and black tiles; big numerals), a mobile planner (huge light grotesk headings, pastel cards, pill controls), and a desktop planner (black sidebar, cream calendar, black primary button). The DNA is adopted; no pixels, imagery, or content are copied.

The three words that drive the system: **soft, confident, tactile**.

## Genre

Playful-leaning modern-minimal. Function carries the page; colour blocks give it warmth.

## Macrostructure family

- App shell: no side menu. A sticky top bar on the cream canvas (brand, ledger label pill, the vermilion New task action) above a single centred working column.
- List page: a page head with a huge light title beside a black count tile, then one vertical column of identical task cards. Every card has the same paper surface, butter date chip, and pill actions; the references lend aesthetics, not their layouts.
- Form pages: two tiles side by side. A butter intro tile holding the title, instruction, and a black note tile; a white sheet holding the form. They stack below 1100px.
- Empty and not-found states: a single full-width tile (lilac with a dot grid; black with a vermilion chip).

## Theme

All colours are OKLCH and declared once in `src/app/tokens.css`.

- Canvas `oklch(95.6% 0.011 78)` · Paper `oklch(98.6% 0.005 80)` · Paper 2/3 for fields and footer.
- Ink `oklch(18.5% 0.006 60)` · Ink 2 `oklch(36% …)` · Ink 3 `oklch(46% …)`.
- Rail `oklch(16% 0.004 60)` with rail ink `oklch(96% …)` and rail ink 2 `oklch(72% …)`.
- Accent vermilion `oklch(64% 0.2 36)` with ink text on it; accent strong `oklch(50% 0.19 33)` for destructive text and focus.
- Pastels: butter `oklch(93% 0.05 86)`, mint `oklch(92% 0.032 205)`, lilac `oklch(80% 0.055 292)` / lilac soft, sage `oklch(92% 0.042 150)`.

Accent is spent on the brand dot, the New task action, eyebrow dots, error states, and the not-found chip. Primary buttons are ink.

## Typography

- Display: Inter Tight, weight 300 (500 for the wordmark), roman only, tracking `-0.035em` to `-0.06em` at large sizes.
- Body: Geist, 400 and 500. Metadata uses Geist with tabular numerals; there is no mono face.
- Display size `clamp(2.75rem, 5.2vw + 1rem, 5.75rem)`; count numeral `clamp(4rem, 7vw + 1rem, 7.5rem)`.

## Shape and spacing

- Radius: tiles 28px, cards 24px, fields 14px, controls are pills.
- 4-point named scale `--space-3xs` … `--space-3xl`; gaps between tiles are `--space-md`.
- No shadows. Depth comes from colour blocks only.

## Motion

- One page entrance: opacity plus 8px rise, 260ms, `--ease-out`.
- Cards lift 2px and turn lilac soft on hover; buttons scale to 0.97–0.98 on press.
- Reduced motion removes spatial movement.

## Microinteractions

- Silent success; feedback is a rounded notice with an ink label chip.
- Direct deletion, no confirmation dialog.
- Focus is instant and visible: 2px ring, accent strong on light surfaces, a light vermilion on dark surfaces.

## CTA voice

- Primary: ink pill, paper text, 48px tall.
- Rail action: vermilion pill with an ink circle holding the plus mark.
- Secondary: outlined pill; inside task cards it gains a north-east arrow.
- Destructive: borderless pill in accent strong (card ink inside cards), vermilion fill on hover.

## Rules

- No invented metrics. The only numbers are real counts from the API.
- No hero imagery, no fake screenshots, no drawn device chrome.
- Fully usable at 320, 375, 414, and 768 pixels with no horizontal scroll.
- Skip link, semantic headings, labelled fields, visible focus on every page.
- Copy, labels, and behaviour are owned by the components; a visual redesign changes CSS only.

## Hallmark review

Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 4 · Specificity 4 · Restraint 4 · Variety 5. No stamp comment lives in the CSS because the project forbids code comments; this file and `.hallmark/log.json` are the durable record.
