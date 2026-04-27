# CLAUDE.md

This file is loaded by Claude Code as the entry point for agents working in this repository. Read this in full before making any change. The project is small; the constraints are strict.

## What this is

`homes-of-foxfire` is the public website for the Homes of Foxfire Coalition Against Data Centers, a volunteer neighborhood coalition in Commercial Point, Pickaway County, Ohio. The site exists to publish public-record evidence about the K-Nova Planned Industrial District rezoning (Ordinance 2024-07) and any related data center proposals near the Foxfire neighborhood.

The site has two registers. The body register is factual, procedural, calm, and specific. The hero and CTA register is direct, plain, and firm. Both are bound by the hard rules in `docs/VOICE.md`. Credibility comes from documents, not from rhetoric.

## V1 site shape

The V1 site is a multi-page Astro static build with six public routes, plus an internal brand reference.

- `/` Home
- `/timeline` Source-linked timeline
- `/learn` Data center education hub
- `/documents` Public documents library
- `/take-action` Sign up, attend, email, volunteer, share
- `/updates` Coalition updates and records-request status
- `/brand` Internal brand reference (not in main nav)

The V1 build brief is `docs/V1_PLAN.md`. Treat it as canonical for page content, hero copy, launch checklist, and build phases.

## Stack

- Astro v5, static site, no client-side framework.
- TypeScript strict (`tsconfig.json` extends `astro/tsconfigs/strict`).
- Plain CSS using design tokens defined in `src/styles/tokens.css`. No Tailwind, no CSS-in-JS, no preprocessor.
- Three Google Fonts: IBM Plex Serif, Public Sans, IBM Plex Mono.
- Static data lives in `src/data/*.json`. No CMS, no database.

## Commands

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the built dist/
```

There is no test suite yet. Do not add a test framework without discussion.

## Read before changing visible output

These three files are the design and editorial system. Treat them as authoritative. Do not modify them without explicit approval.

- `docs/BRAND.md` is the visual system: tokens, type, spacing, lockups, do/don't, rationale. The palette is Forest Ink, Iron Oxide, Cream, Bone, Moss, Hearing Red. Do not introduce a new color without updating BRAND.md and re-verifying contrast.
- `docs/VOICE.md` is the voice and microcopy spec. The voice is hybrid: body register and hero/CTA register. Read both sections before writing any copy.
- `docs/ARCHITECTURE.md` is the folder map and naming conventions, including the multi-page route structure.

These describe how the project actually operates and may be updated as work expands.

- `docs/CONTENT.md` is the editorial workflow and the data schemas. Includes the two-taxonomy rule for `status` and `verification`.
- `docs/SOURCES.md` is the sourcing standard. Every public claim has a public source.
- `docs/DEPLOY.md` is hosting and deployment.
- `docs/V1_PLAN.md` is the canonical V1 build brief. Page content, hero copy, build phases, launch checklist live here.

## Project facts an agent must know

These are stable facts as of April 2026. If a fact you need is not on this list, treat it as unverified.

- The rezoning ordinance is **2024-07**, adopted by the Village of Commercial Point on May 20, 2024 by a 4-1 vote (Geiger, Nungester, Weaver, Ratliff yes; Crego no).
- The rezoning covers approximately **266.971 acres** bounded by SR 104 (east), Durrett Road (north), Borror Road (west), and SR 762 (south).
- Ownership in the legal description: Eric Young as Trustee of the James R. Jahn Trust (260.367 ac), Alice Jahn (5.223 ac), K-Nova LLC (2.004 ac).
- Ordinance 2023-09 (adopted August 7, 2023) added "data centers" as a permitted use in the Limited Manufacturing District.
- Ordinance 2024-05 (adopted May 6, 2024) amended Chapter 1143.04(e) of the Planning and Zoning Code, the local refiling/new-matter rule.
- Ordinance 2026-03 (adopted February 23, 2026) prohibits gas-fired electric generation facilities using turbines in all zoning districts.
- A data center moratorium was proposed by Council Member Ezekiel Miller on February 23, 2026 but, as of the last public review, has not been confirmed adopted.
- An NDA between the Village and Amazon Data Services (signed July 2023 by the previous mayor) was raised in public meetings on February 23, 2026. Mayor Geiger stated the village sent non-renewal notice. The NDA expires July 2026.
- ORC 713.121 imposes a two-year statute of limitations on procedural challenges to a municipal zoning ordinance. For Ord 2024-07, the planning deadline is approximately May 20, 2026.

If a piece of copy or data references "Ordinance 2025-23," that is a stale or incorrect reference. The current rezoning ordinance is 2024-07.

## House style, condensed

The full voice spec is in `docs/VOICE.md`. The compressed version:

**Body register, the default.** Factual, procedural, calm, specific. No loaded adjectives. Cite numbers. Separate confirmed facts from community concerns. Use phrases like "public records show," "residents are asking," "needs verification."

**Hero and CTA register, used sparingly on hero blocks and call-to-action buttons.** Direct, plain, firm. Allowed: "Giant data centers," "Your new neighbor," "We can still stop this," "Help protect Foxfire," "This is not over." Still no exclamation points, no em dashes, no legal accusations, no partisan language, no anti-tech framing.

**Hard rules that bind both registers:**

- No em dashes. Use a period, a comma, or a colon.
- No exclamation points anywhere.
- No conspiratorial language ("rigged," "secret deal," "they don't want you to know").
- No partisan or party-coded framing.
- No anti-technology framing ("Big Tech as villain," "the data center monster").
- No legal accusations unsupported by a public document or counsel review.
- No promises of specific legal or political outcomes.
- Numbers in IBM Plex Mono with tabular figures: `ORD 2024-07`, `FXF-PR-2026-001`, `266.971 ac`.
- Sentence case for headings and buttons. Buttons end with a period when they stand as a complete sentence.
- The right arrow is the literal Unicode `→`, never `>` or `>>`.

The lexicon table in `docs/VOICE.md` lists "avoid these phrases" against "use these phrases instead." Apply it to every copy edit.

## Sourcing rule

Every factual claim that ships on the site must have a publicly verifiable source, OR be marked with `verification: records-requested` so the reader can see we are still pulling the source. See `docs/SOURCES.md` for the full standard.

If a claim cannot be sourced or marked as records-requested, it does not ship. There is no exception for "everyone knows this."

## What this site is not

- Not a discussion forum, comment system, or chat app. Do not add user-generated content surfaces.
- Not a fundraising or donation page. Entity structure has not been decided.
- Not a petition. The coalition is not the sponsor of any petition unless a separate decision is made and recorded.
- Not legal advice. The site is a public-record archive plus civic explanation. Every page that touches legal or procedural matters must include the disclaimer specified in `docs/SOURCES.md`.
- Not a place to accuse named individuals or companies of wrongdoing. Statements about M/I Homes, K-Nova, Hart, Scannell, Amazon Data Services, or any individual must be evidence-anchored and counsel-reviewed before publication.

## File and naming conventions

- Routes: kebab-case (`take-action.astro`, not `takeAction.astro`).
- Components: PascalCase, named for what they are, not where they appear (`Callout`, not `HearingCalloutHomepage`).
- CSS classes: kebab-case, scoped by parent.
- CSS custom properties: kebab-case after `--`, named by role not value (`--ink`, not `--green`).
- Data files: lowercase plural nouns (`timeline.json`, `documents.json`, `resources.json`, `updates.json`).
- Markdown files in `docs/`: SCREAMING_SNAKE_CASE for project-level docs (`BRAND.md`, `VOICE.md`, `V1_PLAN.md`).

## How to add things

See `docs/ARCHITECTURE.md` for the page and component flow, and `docs/CONTENT.md` for the data and editorial flow. See `docs/V1_PLAN.md` for the canonical V1 build sequence.

## Working with the Cowork side

Content drafts, research files, ordinances, minutes archives, the procedural-defect brief, the Festus comparable case files, and coalition operating documents live in the coalition Google Drive (owner `foxfirehomescoalition@gmail.com`), not in this repo. The repo is the public site only. Do not commit ordinance PDFs, meeting minutes PDFs, internal coalition strategy memos, or personal information into this repo. Link to the village website for primary sources.

## When in doubt

The voice is **factual, procedural, calm, specific** in the body, and **direct, plain, firm** in the hero and CTAs. Credibility is the asset. Defend it. The coalition has time. The site is on the record.
