# Homes of Foxfire Coalition

Public site for the Homes of Foxfire Coalition Against Data Centers, a volunteer neighborhood coalition in Commercial Point, Pickaway County, Ohio. The site publishes public-record evidence about the K-Nova Planned Industrial District rezoning (Ordinance 2024-07, adopted May 20, 2024) and related data center proposals near the Foxfire neighborhood.

The site is built in [Astro](https://astro.build) as a static, multi-page build. It is intended to read like a printed civic brief, with a direct hero and a procedural body.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the built dist/
```

## V1 site shape

```
/                Home
/timeline        Source-linked timeline
/learn           Data center education hub
/documents       Public documents library
/take-action     Sign up, attend, email, volunteer, share
/updates         Coalition updates and records-request status
/brand           Internal brand reference (not in main nav)
```

## Folder layout

```
docs/                   Project documentation. Read these before changing anything visible.
src/layouts/            Page shells.
src/components/brand/   Identity primitives (Wordmark).
src/components/site/    Public site chrome (header, hero, footer).
src/components/content/ Reusable content blocks (DocumentCard, TimelineRow, Callout, ResourceCard, UpdatePost, NewsletterSignup, etc.).
src/components/guide/   Display blocks used only on /brand.
src/pages/              Routed pages (one per V1 route).
src/styles/             tokens, base, components, guide stylesheets.
src/data/               timeline.json, documents.json, faq.json, glossary.json, meetings.json, resources.json, updates.json.
```

## Documentation

Read in order. The V1 plan and the voice spec are the most important.

- [`CLAUDE.md`](CLAUDE.md) is the entry point for any Claude Code agent working in this repo.
- [`docs/V1_PLAN.md`](docs/V1_PLAN.md) is the canonical V1 build brief: page-by-page content, hero copy, build phases, launch checklist, SEO.
- [`docs/BRAND.md`](docs/BRAND.md) is the visual system: tokens, type, lockups, do/don't, rationale.
- [`docs/VOICE.md`](docs/VOICE.md) is the voice and microcopy spec. Hybrid: body register and hero/CTA register.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) is the folder map and how to add pages or components.
- [`docs/CONTENT.md`](docs/CONTENT.md) is the editorial workflow and the data schemas. Includes the two-taxonomy rule (status + verification).
- [`docs/SOURCES.md`](docs/SOURCES.md) is the sourcing standard.
- [`docs/DEPLOY.md`](docs/DEPLOY.md) is hosting and deployment.

## Standards in one paragraph

Every factual claim on the site has a publicly verifiable source, or is marked records-requested. The voice is hybrid: factual and procedural in the body, direct and firm in the hero and CTAs. No em dashes, no exclamation points, no conspiratorial or partisan framing, no anti-technology framing, no legal accusations unsupported by counsel review. Numbers are typeset like evidence. The site does not host comments, donations, or petitions, and it is not a place to accuse named individuals of wrongdoing.

## License and use

The site code in this repository is the work of the coalition and may be reused for similar civic and neighborhood efforts. Public records linked or quoted on the site remain the property of the agencies that produced them. Resident testimony and photography belong to the residents who provided them and are used with their consent.

## Contact

Coalition email: `foxfirehomescoalition@gmail.com`
