# Architecture

Folder layout, naming conventions, and how to add things without breaking the system.

## V1 site shape

The V1 site is a **multi-page Astro static build** with six public routes plus the brand reference. Top navigation is the same on every page.

```
/                Home
/timeline        Source-linked timeline
/learn           Data center education hub
/documents       Public documents library
/take-action     Sign up, attend, email, volunteer, share
/updates         Coalition updates and records-request status
/brand           Internal brand reference (not in main nav)
```

Optional later additions, queued for Phase 2 or Phase 3: `/questions`, `/meetings`, `/contact`, `/press`. Do not build these for V1 unless `docs/V1_PLAN.md` says they are in scope for the current phase.

## Folder map

```
homes-of-foxfire/
├── docs/                       Project documentation
│   ├── BRAND.md                Tokens, type, lockups, do/don't, rationale
│   ├── VOICE.md                Voice and microcopy rules (hybrid: body + hero)
│   ├── ARCHITECTURE.md         This file
│   ├── CONTENT.md              Editorial workflow and data schemas
│   ├── SOURCES.md              Sourcing standard
│   ├── DEPLOY.md               Hosting and deployment
│   └── V1_PLAN.md              Canonical V1 build brief
│
├── public/                     Static assets served at the root (favicon, robots.txt, etc.)
│
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro    <html>/<head>/<body> shell. Loads tokens.css and base.css.
    │   └── SiteLayout.astro    BaseLayout + SiteHeader + SiteFooter. Use on every public page.
    │
    ├── components/
    │   ├── brand/              Identity primitives.
    │   │   └── Wordmark.astro  Variants: stacked, inline, stamp, short.
    │   ├── site/               Public site chrome.
    │   │   ├── SiteHeader.astro
    │   │   ├── SiteHero.astro
    │   │   └── SiteFooter.astro
    │   ├── content/            Reusable content blocks across pages.
    │   │   ├── DocumentCard.astro
    │   │   ├── TimelineRow.astro
    │   │   ├── StatusBadge.astro
    │   │   ├── QuoteBlock.astro
    │   │   ├── Callout.astro
    │   │   ├── RecordsCTA.astro
    │   │   ├── ParcelMap.astro
    │   │   ├── FAQ.astro
    │   │   ├── KnownUnknown.astro
    │   │   ├── Glossary.astro
    │   │   ├── SourceLink.astro
    │   │   ├── ResourceCard.astro       (NEW: /learn page)
    │   │   ├── UpdatePost.astro         (NEW: /updates page)
    │   │   ├── TimelineFilter.astro     (NEW: /timeline tag filter)
    │   │   └── NewsletterSignup.astro   (richer V1 form: name, contact, volunteer-skills)
    │   └── guide/              Display blocks used only by /brand.
    │       ├── ColorPalette.astro
    │       ├── PairTable.astro
    │       ├── TypeScale.astro
    │       ├── SpacingScale.astro
    │       ├── LockupSet.astro
    │       └── DoDont.astro
    │
    ├── pages/
    │   ├── index.astro          Home
    │   ├── timeline.astro       Full source-linked timeline
    │   ├── learn.astro          Data center education hub
    │   ├── documents.astro      Public documents library
    │   ├── take-action.astro    Sign up, attend, email, volunteer, share
    │   ├── updates.astro        Coalition updates and records-request status
    │   └── brand.astro          /brand reference (internal)
    │
    ├── styles/
    │   ├── tokens.css           :root design tokens. Loaded everywhere.
    │   ├── base.css             html/body resets and type primitives. Loaded everywhere.
    │   ├── components.css       site/* and content/* styles. Loaded by SiteLayout.
    │   └── guide.css            /brand-only styles. Loaded by pages/brand.astro.
    │
    └── data/
        ├── timeline.json        Filings + hearings, oldest → newest.
        ├── documents.json       Ordinances, minutes, hearing packets, statutes.
        ├── faq.json             FAQ items.
        ├── glossary.json        Glossary terms.
        ├── meetings.json        Upcoming meeting calendar.
        ├── resources.json       (NEW: /learn external resources)
        └── updates.json         (NEW: /updates posts)
```

## Naming conventions

- **Routes**: kebab-case (`take-action.astro`, not `takeAction.astro`).
- **Components**: PascalCase, named after what they are, not where they appear. `Callout`, not `HearingCalloutOnHomepage`.
- **CSS classes**: kebab-case, scoped by parent. `.doc-card .doc-action`, not `.docCardAction`.
- **CSS custom properties**: kebab-case after `--`, named by role not value. `--ink`, not `--green`.
- **Data files**: lowercase plural nouns. `timeline.json`, `documents.json`, `resources.json`.

## How to add a page

1. Create `src/pages/<route>.astro` (kebab-case, .astro extension).
2. Import `SiteLayout` (or `BaseLayout` for full-bleed pages, rare).
3. Wrap content in the layout. Pages do not import `tokens.css` or `base.css` directly; the layout handles that.
4. Add the route to the nav inside `SiteHeader.astro` if it should appear in the top navigation.
5. If the page introduces a new content block that will be reused, lift it to `src/components/content/`.
6. If the page reads structured data, add the file under `src/data/` and document its schema in `docs/CONTENT.md`.

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

## Page templates, in shorthand

Each public page has a recognizable structure. The full content blueprint per page lives in `docs/V1_PLAN.md`.

- **Home**: Hero, three-card "where things stand," "why this matters" topic cards, signup, timeline preview, learn-page preview, take-action block, footer.
- **Timeline**: Page intro, tag-filter strip, ordered TimelineRow list pulled from `timeline.json`.
- **Learn**: Page intro, "what is a data center," topic blocks, ResourceCard grid pulled from `resources.json`.
- **Documents**: Page intro, category sections, DocumentCard grid pulled from `documents.json`. Filter by `kind` and `category`.
- **Take Action**: Hero, signup form (rich), three numbered action cards (attend, email, volunteer/share), email-template block.
- **Updates**: Page intro, UpdatePost list pulled from `updates.json`, sidebar links to the records-request tracker.

## What lives outside this repo

- The original Claude Design handoff bundle (HTML/CSS/JSX prototype, chat transcripts) was used to derive this structure. It is not committed here.
- Coalition strategy memos, internal email threads, draft public records requests, and meeting recaps live in the coalition Google Drive, not in this repo.
- PDF copies of ordinances and minutes link to the village's own PDF; they are not hosted here.
- Production hosting and CI lives in `docs/DEPLOY.md`.
