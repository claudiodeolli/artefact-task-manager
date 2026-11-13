# Design — Work Ledger

A locked design system for the task manager. Every page reads this file before it is changed. Consistency is the goal; variety lives in typography, spacing, and tone, not in a different theme per page.

## Concept

The interface is a work ledger, not a SaaS dashboard. It borrows from printed indices, studio notebooks, and editorial page layouts: warm paper, ink, hairline rules, a single signal colour, and type that does the structural work. There are no floating cards, glass panels, gradients, or decorative icons.

The three words that drive the system: **editorial, tactile, composed**.

## Genre

Editorial, with an app-specific Workbench structure. The interface should feel designed by a person with a ruler, a serif, and a red pencil.

## Macrostructure family

- App pages: Workbench ledger. A sticky masthead at the top, a single wide working column, ruled entries, and an editorial page head. The masthead carries the wordmark, the ledger label, and the one accent-filled New task action; the page itself carries the content.
- Content pages: the same masthead and working column, with a narrower measure for reading.
- There are no marketing pages in this product.

## Theme

A custom light theme anchored on warm paper and vermilion. All colours are OKLCH and are declared once in `src/app/tokens.css`.

- Paper: `oklch(96.4% 0.011 84)`
- Paper 2: `oklch(93.2% 0.016 82)`
- Paper 3: `oklch(89.5% 0.02 80)`
- Ink: `oklch(21% 0.016 60)`
- Ink 2: `oklch(38% 0.018 62)`
- Ink 3: `oklch(47% 0.018 65)`
- Rule: `oklch(84% 0.018 80)`
- Rule strong: `oklch(72% 0.022 78)`
- Accent: `oklch(57% 0.19 32)` (vermilion)
- Accent strong: `oklch(45% 0.18 30)`
- Accent soft: `oklch(93% 0.04 40)`
- Accent ink: `oklch(98% 0.008 85)`
- Success: `oklch(43% 0.07 150)` (olive)
- Focus: the accent strong

Accent use is capped at roughly five percent of any viewport. It appears in the brand mark, the active marker, links, destructive actions, focus rings, and error states. Primary buttons are ink, not accent.

## Typography

- Display: Instrument Serif, weight 400, roman only. Used for the wordmark, page titles, task titles, and the entry count. No italic headings.
- Body: Geist, weight 400 and 500. Used for descriptions, instructions, and controls.
- Outlier: Geist Mono, weight 400 and 500. Used only for metadata, dates, counts, labels, and button microcopy.
- Display tracking: `-0.025em` at large sizes; `-0.015em` at task-title size.
- Body measure: 65 characters maximum.
- Type scale: major third (1.25), from a 16px body.
- Display size: `clamp(2.75rem, 5vw + 1rem, 5.25rem)`.
- Numerals: tabular in metadata and counts.

## Spacing

A 4-point named scale in `tokens.css`: `--space-3xs` through `--space-3xl`. Pages use named tokens, never raw values. The working column breathes: 64px page padding on desktop, 20px on mobile, with sections separated by at least `--space-xl`.

## Rules and surfaces

- Hairline rules do the work that cards used to do. List entries are separated by `--color-rule`; no entry has a shadow.
- Surfaces are flat. The only filled surfaces are the ink form button, the accent masthead action, and the paper-2 row hover.
- Radius is nearly absent: 2px on controls, 0 on inputs, 0 on rows. No pills.
- The page background carries a very quiet paper grain. It is texture, not decoration, and must never reduce contrast.

## Motion

- Easings: `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` and `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)`.
- One quiet page entrance: opacity plus 8px rise, 260ms. Nothing else enters on scroll.
- Row hover: background and a left accent marker that scales in. Buttons press down 1px.
- No bounce, no overshoot, no gradient sweeps.
- Reduced motion: all spatial motion becomes an opacity change of at most 150ms.

## Microinteractions

- Silent success. Feedback is a ruled notice, not a celebratory toast.
- Direct deletion with immediate feedback. No confirmation dialog.
- Focus is instant and always visible: 2px accent ring with a 3px offset.
- Disabled controls reduce opacity and stop the pointer; they do not change size.
- Every interactive control has default, hover, focus-visible, active, disabled, loading, error, and success states where the state applies.

## CTA voice

- Primary form action: ink fill, paper text, 2px radius, mono uppercase label, 8px by 16px padding. One per form.
- Masthead action: the one accent-filled button in the product, 12px by 32px, with a plus mark. It is present on the list and hidden on task form routes so it cannot clear a draft.
- Secondary: text link with a hairline underline that darkens on hover. No box.
- Destructive: accent-strong text, no fill, underline on hover.
- Labels are verbs: "New task", "Add task", "Save changes", "Delete", "Back to tasks".

## Page copy voice

Short, specific, quietly literary. Verbs over adjectives. No exclamation marks, no emoji, no invented metrics.

- List: “Tasks, in order.” / “Everything currently on the desk, newest first.”
- Create: “Write it down.” / “A clear title is enough. Add context if it helps the next person.”
- Edit: “Revise the entry.” / “Change what moved. The rest of the ledger stays as it was.”
- Empty: “The ledger is empty.” / “Every good week starts with a first line.”
- Not found: “This entry is gone.” / “It may have been deleted, or the link may be wrong.”

## What pages must share

- The masthead, the wordmark, and the accent-filled New task action.
- The closing colophon line and its quiet rule.
- The paper, ink, and accent palette.
- Instrument Serif, Geist, and Geist Mono.
- The hairline rule language and the ruled-entry rhythm.
- The focus ring and the quiet entrance.

## What pages may differ on

- The working column width: wider for the task list, narrower for the form.
- The page head composition: list uses a title plus a count block; form uses a title plus a short instruction.
- The presence of a secondary aside or guidance column on the form page.

## App page rules

- No hero imagery, no illustrations, no fake product screenshots.
- No decorative stats. The only numbers shown are real counts from the API.
- No card-in-card layouts. No drop shadows. No rounded pill buttons.
- The interface must remain fully usable at 320, 375, 414, and 768 pixels.
- Every page includes the skip link, semantic headings, labelled fields, and visible focus.

## Exports

The canonical tokens live in `src/app/tokens.css`. The page CSS imports them through `globals.css`.

- Colours: paper, paper 2, paper 3, ink, ink 2, ink 3, rule, rule strong, accent, accent strong, accent soft, accent ink, success, success soft, focus.
- Fonts: display, body, mono.
- Space: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl.
- Type: xs, sm, base, md, lg, xl, 2xl, 3xl, display, display-s.
- Motion: ease out, ease in out, short, medium.
- Shape: radius control, radius input, hairline.

## Hallmark review

Pre-emit critique: Philosophy 5 · Hierarchy 5 · Execution 5 · Specificity 5 · Restraint 5 · Variety 4.

The app-system rules in this file take precedence over the page-level catalog. Geist Mono is used as one metadata register across dates, counts, labels, and control microcopy; the title field is deliberately display-sized; and no stamp comment is placed in the CSS because the brief forbids comments in code. This file is the durable record instead. Contrast, focus, reduced motion, token discipline, responsive overflow, and clickable-label wrapping are verified in the rendered application.
