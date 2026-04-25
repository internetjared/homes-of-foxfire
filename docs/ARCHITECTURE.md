# Architecture

Folder layout, naming conventions, and how to add things without breaking the system.

## Folder map

```
homes-of-foxfire/
├── docs/                       Project documentation
│   ├── BRAND.md                Tokens, type, lockups, do/don't, rationale
│   ├── VOICE.md                Voice and microcopy rules
│   └── ARCHITECTURE.md         This file
│
├── public/                     Static assets served at the root (favicon, robots.txt, etc.)
│
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro    <html>/<head>/<body> shell. Loads tokens.css and base.css.
    │   └── SiteLayout.astro    BaseLayout + SiteHeader + SiteFooter. Use on real pages.
    │
    ├── components/
    │   ├── brand/              Identity primitives.
    │   │   └── Wordmark.astro  Four variants: stacked, inline, stamp, short.
    │   ├── site/               Public site chrome.
    │   │   ├── SiteHeader.astro
    │   │   ├── SiteHero.astro
    │   │   └── SiteFooter.astro
    │   ├── content/            Reusable content blocks.
    │   │   ├── DocumentCard.astro
    │   │   ├── TimelineRow.astro
    │   │   ├── StatusBadge.astro
    │   │   ├── QuoteBlock.astro
    │   │   ├── Callout.astro
    │   │   └── RecordsCTA.astro
    │   └── guide/              Display blocks used only by the /brand reference page.
    │       ├── ColorPalette.astro
    │       ├── PairTable.astro
    │       ├── TypeScale.astro
    │       ├── SpacingScale.astro
    │       ├── LockupSet.astro
    │       └── DoDont.astro
    │
    ├── pages/
    │   ├── index.astro         Homepage.
    │   └── brand.astro         /brand — the long scrolling brand reference.
    │
    ├── styles/
    │   ├── tokens.css          :root design tokens (colors, fonts, spacing). Loaded everywhere.
    │   ├── base.css            html/body resets, h1–h4, p, .mono, .kicker, .tab. Loaded everywhere.
    │   ├── components.css      site/* and content/* component styles. Loaded by SiteLayout.
    │   └── guide.css           /brand-only styles. Loaded by pages/brand.astro.
    │
    └── data/
        ├── timeline.json       Filings + hearings, oldest → newest.
        └── documents.json      Ordinances, minutes, hearing packets.
```

## Naming conventions

- **Files**: kebab-case for routes (`records-request.astro`), PascalCase for components (`DocumentCard.astro`).
- **Components**: PascalCase, named after what they are, not where they appear. `Callout`, not `HearingCalloutOnHomepage`.
- **CSS classes**: kebab-case, scoped by parent. `.doc-card .doc-action`, not `.docCardAction`.
- **CSS custom properties**: kebab-case after `--`, named by role not value. `--ink`, not `--green`.
- **Data files**: lowercase plural nouns. `timeline.json`, `documents.json`.

## How to add a page

1. Create `src/pages/<route>.astro`.
2. Import `SiteLayout` (or `BaseLayout` for full-bleed pages).
3. Wrap content in the layout. Pages do not import `tokens.css` or `base.css` directly — the layout handles that.
4. Add the route to the nav inside `SiteHeader.astro`.
5. If the page introduces a new content block that will be reused, lift it to `src/components/content/`.

## How to add a content block

1. Decide which folder: `site/` (only on the public site chrome), `content/` (reusable on any page), or `guide/` (only on `/brand`).
2. Create `<ComponentName>.astro` in that folder.
3. Add styles to `components.css` (for `site/` and `content/`) or `guide.css` (for `guide/`). Class names must be unique across that file.
4. If the component takes content from data, put the data in `src/data/` as JSON, not in the component.

## How styles load

| File             | Loaded by                  | Why                                     |
| ---------------- | -------------------------- | --------------------------------------- |
| `tokens.css`     | `BaseLayout.astro`         | Every page needs the design tokens.     |
| `base.css`       | `BaseLayout.astro`         | Every page needs the type primitives.   |
| `components.css` | `SiteLayout.astro`         | Real pages use site/content components. |
| `guide.css`      | `pages/brand.astro` only   | The `/brand` page is the only consumer. |

Do not import CSS inside individual `.astro` components. Centralize so the cascade is predictable.

## What lives outside this repo

- The original Claude Design handoff bundle (HTML/CSS/JSX prototype, chat transcripts) was used to derive this structure. It is not committed here. If you need it, the chat transcripts capture the user's intent and the rationale behind every brand decision.
- Production hosting and CI are TBD.
