# CMS architecture

This site uses two content sources, on purpose. Each is the source of truth for one kind of content. Picking the right one matters because it determines who can edit and how content gets to the website.

## What lives where

**Sanity CMS** owns rich, prose-heavy content edited by coalition members in a web UI:

- `update` — Updates / news posts on `/updates`
- `resource` — Educational resources on `/learn`
- `faqItem` — FAQ entries
- `glossaryTerm` — Glossary entries

The Studio is at `/studio/` in this repo. Coalition members log in to `https://foxfire-coalition.sanity.studio` (or wherever the Studio is deployed) to write and publish.

**Airtable** owns the structured research database (people, entities, parcels, relationships, issues, public records requests, questions). A subset of two Airtable tables — `Timeline Events` and `Documents` — feeds the public website's timeline and documents library at build time, but only rows that the coalition has explicitly marked **`Public Website? = checked`** AND **`Confidence = Confirmed`**.

**`src/data/*.json`** is the build-time output of the Airtable sync, not a hand-edited source of truth. Do not edit `timeline.json` or `documents.json` by hand once the sync is live; changes will be overwritten on the next build. Edit in Airtable, mark public, rebuild.

## Coalition editorial flow

To add an Updates post:

1. Open the Sanity Studio.
2. Click **+ Update**.
3. Fill in title, publish date, category, summary, and body.
4. Set `publishStatus` to `published`.
5. Click **Publish** in the top-right.
6. The Vercel webhook fires; the site rebuilds within a couple of minutes; the new post appears on `/updates`.

To add a confirmed timeline entry:

1. Open the Foxfire Coalition Research Database in Airtable.
2. In the `Timeline Events` table, click **+** to create a new row.
3. Fill in the fields. Source the entry against a public record.
4. Set `Confidence = Confirmed` and tick `Public Website? = checked`.
5. Either wait for the nightly build or manually trigger a rebuild in Vercel (Deployments → Redeploy).
6. The entry appears on `/timeline`.

To add a Learn resource: same as an Update, but pick the `resource` document type.

To add an FAQ entry: same as an Update, but pick the `faqItem` document type, and place it in the right bucket (`zoning-and-process`, `site-plan`, `utilities-and-infrastructure`, `neighborhood-impact`, or `transparency`).

## Environment variables

Set these in `.env` for local development and in Vercel under Project Settings → Environment Variables for production. See `.env.example` for the canonical list.

| Variable | Required for | Where to get it |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Build, Studio | https://www.sanity.io/manage → your project → Project ID |
| `PUBLIC_SANITY_DATASET` | Build, Studio | Default `production` |
| `PUBLIC_SANITY_API_VERSION` | Build | Date-pinned, e.g. `2024-10-01` |
| `SANITY_READ_TOKEN` | Build (private datasets only) | Sanity Manage → API → Tokens (Viewer scope) |
| `SANITY_STUDIO_PROJECT_ID` | Studio dev/build (in `studio/.env`) | Same value as `PUBLIC_SANITY_PROJECT_ID` |
| `AIRTABLE_PAT` | Build (Airtable sync) | https://airtable.com/create/tokens (data.records:read on the Foxfire base) |
| `AIRTABLE_BASE_ID` | Build (Airtable sync) | Airtable URL after the `/` (`appXXXXXXXXX`) |
| `AIRTABLE_TIMELINE_TABLE` | Optional override | Default `Timeline Events` |
| `AIRTABLE_DOCUMENTS_TABLE` | Optional override | Default `Documents` |

## Build pipeline

`npm run build` runs:

1. `prebuild` hook → `node scripts/sync-airtable.mjs`
   - Pulls Timeline Events and Documents from Airtable.
   - Filters by `Public Website? = true` and `Confidence = Confirmed` (Timeline) or `Public Use? = true` (Documents).
   - Writes `src/data/timeline.json` and `src/data/documents.json`.
   - On any error, logs a warning and exits 0 — the existing JSON files are left intact, so the build still succeeds.
2. `astro build`
   - Reads structured data from `src/data/*.json`.
   - Reads rich content from Sanity at `*.astro` page level via the GROQ queries in `src/lib/sanity.ts`.
   - Writes the static site to `dist/`.

## Vercel deployment

The site auto-deploys from `main`. Webhook triggers also rebuild:

1. **Sanity publish webhook.** Live. Configured in https://www.sanity.io/manage → `Foxfire Coalition Website` → API → Webhooks → `Vercel rebuild on publish`. Fires on Create/Update/Delete of `update`, `resource`, `faqItem`, or `glossaryTerm` documents on the `production` dataset.
2. **Vercel deploy hook URL** (do not commit anywhere public; this URL anyone with it can trigger a build):
   ```
   https://api.vercel.com/v1/integrations/deploy/prj_T7NdoNwwQ0OiZe8nkmNurUhbwlXZ/AQXrErrpxs
   ```
   Hook ID `AQXrErrpxs`, branch `main`, named `Sanity publish`. Created via Vercel API.
3. **Nightly cron.** Not yet configured. Add `vercel.json` with a daily cron when needed to catch Airtable changes that didn't trigger a manual rebuild.

To trigger a build manually: open the Vercel project → Deployments → Redeploy.

## Studio deployment

The Studio is hosted by Sanity at `<projectname>.sanity.studio`. Deploy with:

```sh
npm run studio:deploy
```

The first run prompts for a hostname. Use `foxfire-coalition` (so the Studio lives at `foxfire-coalition.sanity.studio`).

To run the Studio locally for schema work:

```sh
cd studio
npm install
npm run dev
```

## Schema changes

Schemas live in `studio/schemas/*.ts`. Adding a field:

1. Edit the schema file.
2. Run `npm run studio:dev` and verify the field appears in the local Studio.
3. `npm run studio:deploy` to push the change to the hosted Studio.
4. Existing documents do not auto-fill the new field; backfill manually in the Studio.

## Hard rules

- Do not bypass Sanity's `publishStatus` field by hand-editing `src/data/*.json`. The sync overwrites them.
- Do not commit `.env` or any token to git. `.env` is gitignored.
- The website never displays Airtable rows where `Confidence != Confirmed`. The sync filters them out. Sensitive leads stay invisible to the public until verified.
- Sanity's `update` schema enforces a `publishStatus` value; only `published` posts go to the site.
- The Studio uses the same project ID as the website. Do not point at different Sanity projects from the Studio and the site.

## Troubleshooting

**Build fails with `Missing PUBLIC_SANITY_PROJECT_ID`** — env var is not set on Vercel. Set it under Project Settings → Environment Variables for the Production environment.

**Airtable sync logs `Skipping sync.`** — the env vars `AIRTABLE_PAT` and/or `AIRTABLE_BASE_ID` are missing. The build still succeeds with whatever is currently in `src/data/*.json`. Set the vars on Vercel and redeploy.

**Sanity changes are not appearing on the site** — the build is using the CDN cache. Either wait a few minutes, or in `astro.config.mjs` toggle `useCdn: false` temporarily and rebuild.

**Studio 403 on first visit** — the visiting Google account is not in the project's access list. Open Sanity Manage → Members → Add member.
