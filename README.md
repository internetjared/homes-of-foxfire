# Homes of Foxfire Coalition

Public site for the Homes of Foxfire Coalition — a neighborhood coalition of residents in Commercial Point, Ohio, tracking the K-Nova Planned Industrial District rezone (Ordinance 2025-23).

The site is built in [Astro](https://astro.build) as a static document. It is intended to read like a printed brief, not an app.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the built dist/
```

## Layout

```
docs/                   Project documentation (read these before changing anything visible)
src/layouts/            Page shells
src/components/brand/   Identity primitives (Wordmark)
src/components/site/    Public site chrome (header, hero, footer)
src/components/content/ Content blocks (document card, timeline row, callout, etc.)
src/components/guide/   Display blocks used only by the /brand reference page
src/pages/              Routed pages
src/styles/             tokens, base, components, guide stylesheets
src/data/               Timeline + document index JSON
```

## Read first

- [`docs/BRAND.md`](docs/BRAND.md) — color tokens, type, lockups, do/don't, rationale.
- [`docs/VOICE.md`](docs/VOICE.md) — voice and microcopy rules. Read before writing any copy.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — folder layout, naming, how to add a page or component.
