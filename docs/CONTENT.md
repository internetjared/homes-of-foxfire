# Content

How content is added to this site. The visual system (`BRAND.md`), the voice (`VOICE.md`), the folder layout (`ARCHITECTURE.md`), and the V1 build brief (`V1_PLAN.md`) are upstream of this file. This file covers the editorial workflow and the data schemas only.

## Where content lives

There are three kinds of content in this repo, and each lives in a specific place.

**Data.** Structured records that components iterate over (timeline events, document index entries, resources, updates, FAQ, glossary, meetings) live in `src/data/*.json`. They are not edited inline in components.

**Page copy.** Long-form prose that lives on a single route (the homepage hero, the /learn intro, the /take-action template) lives inside `src/pages/<route>.astro`, set in plain HTML inside the page's component slot.

**Microcopy.** Button labels, empty states, hearing callouts, signup form fineprint, and other one-line bits live inside the component that renders them, with the source of truth in `docs/VOICE.md`.

If a piece of content might be reused across more than one page, lift it into `src/data/` as JSON and read it from a component.

## Two parallel taxonomies

Every timeline entry and every document carries two distinct labels.

**`status`** describes what the village did. Values: `proposed`, `filed`, `hearing-scheduled`, `adopted`, `denied`, `died`, `withdrawn`, `pending`. This is procedural. It does not change once the action is final.

**`verification`** describes what the coalition knows about the record. Values: `confirmed`, `needs-follow-up`, `records-requested`. This is research-state. It changes as records production happens.

Both fields ship in every timeline entry and every document. The site can show both as small badges, with `verification` taking visual priority on the timeline (because it tells the reader how settled our knowledge is) and `status` taking priority on the documents page (because it tells the reader what the document represents).

## Adding a timeline entry

Timeline entries describe filings, hearings, votes, ordinances adopted, and related public-record events. They appear newest at the bottom of the array, oldest at the top, so the file reads chronologically.

Each entry takes the following shape:

```json
{
  "date": "2024-05-20",
  "ordinance": "ORD 2024-07",
  "category": "Zoning",
  "title": "Council adopts Ordinance 2024-07 rezoning 266.971 acres to PID",
  "body": "Council voted 4-1 to rezone the K-Nova / Jahn Farm parcel from Exceptional Use to Planned Industrial District. Geiger, Nungester, Weaver, Ratliff yes. Crego no.",
  "why_it_matters": "This is the central approval that enabled data-center use on the Jahn / K-Nova site.",
  "status": "adopted",
  "verification": "confirmed",
  "source": {
    "label": "Ordinance 2024-07 (PDF)",
    "url": "https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-07.pdf"
  }
}
```

Field rules:

- `date` is ISO `YYYY-MM-DD`. The component formats it for display.
- `ordinance` is optional. If used, format as `ORD 2024-07`, `RES 35-2025`, or similar; the component renders it in IBM Plex Mono.
- `category` is one of: `Zoning`, `Annexation`, `Public Meeting`, `Ordinance`, `Resolution`, `Site Plan`, `Utility / Infrastructure`, `Open Question`, `Records Requested`. Used for the /timeline filter strip.
- `title` is one short declarative sentence in the body register. No exclamations, no em dashes, no loaded adjectives.
- `body` is one or two sentences of factual context. Vote totals and named voters are acceptable when they appear in public minutes. Adjectives like "controversial," "shocking," "massive" are not.
- `why_it_matters` is optional. One sentence, plain language. Tells the resident why this entry belongs on the timeline.
- `status` is one of the procedural values listed above.
- `verification` is one of: `confirmed`, `needs-follow-up`, `records-requested`.
- `source` is required. Every entry carries a working public link. If no public link exists yet, set `verification` to `records-requested` and the entry can ship with a "records requested" link instead of a source URL.

## Adding a document record

Document records describe ordinances, minutes, hearings, packets, statutes, and resources in the documents library. They appear in `src/data/documents.json`.

Each entry takes the following shape:

```json
{
  "id": "ord-2024-07",
  "kind": "ordinance",
  "category": "Official Village Records",
  "number": "2024-07",
  "title": "Rezoning 266.971 acres K-Nova / Jahn Farm to Planned Industrial District",
  "date": "2024-05-20",
  "body": "Adopted May 20, 2024. Vote 4-1. Permits data centers as the only use on the property and allows aboveground utilities where absolutely necessary.",
  "why_it_matters": "The single most important document in the K-Nova / Jahn Farm case. The procedural-defect SOL runs to about May 20, 2026.",
  "tags": ["rezoning", "k-nova", "jahn-farm", "data-center", "PID"],
  "status": "adopted",
  "verification": "confirmed",
  "source": {
    "label": "Ordinance 2024-07 (PDF)",
    "url": "https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-07.pdf"
  }
}
```

Field rules:

- `id` is kebab-case, stable, and unique. Once an `id` ships, do not change it. Other systems link to it.
- `kind` is one of: `ordinance`, `resolution`, `minutes`, `hearing`, `agenda`, `packet`, `agreement`, `study`, `correspondence`, `other`.
- `category` is one of: `Official Village Records`, `K-Nova / Jahn Farm Documents`, `Records Requests`, `Education Resources`. Used for grouping on /documents.
- `number` is the ordinance, resolution, or filing number if one exists.
- `title` is the document's plain-language title, not its filename.
- `body` is one or two sentences summarizing what the document does or says. No editorial opinion.
- `why_it_matters` is optional, one sentence in the body register.
- `tags` are kebab-case keywords for filtering. Reuse existing tags whenever possible.
- `status` and `verification` are scoped per the two-taxonomy rule above.
- `source` is required. Every record carries a working public link or a `records-requested` placeholder.

## Adding a resource (Learn page)

Educational resources are external articles, reports, and government pages used on `/learn`. They appear in `src/data/resources.json`.

```json
{
  "id": "wri-7-ways-data-centers",
  "title": "7 Ways Data Centers Affect U.S. Communities",
  "source_organization": "World Resources Institute",
  "category": "Start Here",
  "url": "https://www.wri.org/insights/us-data-center-growth-impacts",
  "summary": "Plain-English overview of how data centers can affect energy, water, air quality, land use, equity, and local governance.",
  "credibility_type": "Policy research",
  "key_takeaway": "Communities need transparency, enforceable standards, and site-specific impact review."
}
```

Field rules:

- `id` is kebab-case, stable.
- `category` is one of: `Start Here`, `Energy`, `Water`, `Air Quality`, `Noise`, `Stormwater`, `Health`, `Tax & Incentives`, `Local Coverage`. Used for grouping on /learn.
- `credibility_type` is one of: `Policy research`, `Government report`, `Academic / peer-reviewed`, `Trade press`, `News reporting`, `Statute or regulation`.
- `key_takeaway` is one sentence in the body register, written in plain language.

## Adding an update post (Updates page)

Updates posts describe coalition activity, records-request status changes, meeting reminders and recaps, newly found documents, and timeline updates. They appear in `src/data/updates.json`, newest at the top of the array.

```json
{
  "id": "2026-04-27-prr-01-sent",
  "date": "2026-04-27",
  "title": "First public records request sent",
  "category": "Records Request",
  "summary": "The coalition sent its first records request focused on Ordinance 2024-07, the May 20, 2024 Special Council Meeting, and the Jahn Property Industrial Major Site Plan.",
  "what_happened": "PRR-01 (FXF-PR-2026-001) was sent to the Village Fiscal Officer with cc to the Zoning Administrator and the Mayor.",
  "why_it_matters": "The records this request returns will determine whether the procedural-defect path is viable before the May 20, 2026 SOL.",
  "what_to_do": "Sign up for updates and help review documents when records are returned.",
  "related_links": [
    { "label": "Ordinance 2024-07 (PDF)", "url": "https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-07.pdf" }
  ]
}
```

Field rules:

- `id` is kebab-case, date-prefixed, stable.
- `category` is one of: `Records Request`, `Meeting Reminder`, `Meeting Recap`, `New Document`, `Timeline Update`, `Volunteer Need`, `Site Update`.
- All prose fields are body-register: factual, calm, specific.
- Posts are short. Two to four sentences per field. Long detail belongs on the relevant page.

## Adding an FAQ item

FAQ items live in `src/data/faq.json`. Existing schema:

```json
{
  "question": "Is this guaranteed to be built?",
  "answer": "...",
  "source": { "label": "...", "url": "..." }
}
```

Per `docs/V1_PLAN.md`, the FAQ is grouped into five buckets: Zoning and Process, Site Plan, Utilities and Infrastructure, Neighborhood Impact, Transparency. The `question` text should match how a resident would actually phrase the question, not how an attorney would.

## Adding a glossary term

Glossary terms live in `src/data/glossary.json`. Existing schema:

```json
{
  "term": "PID",
  "definition": "Planned Industrial District. A zoning category that allows industrial uses, including data centers under Ord 2024-07."
}
```

Two-line maximum per definition. Plain language.

## Adding a page

See `docs/ARCHITECTURE.md` for the page mechanics. The editorial rules are:

- Every page begins with a kicker (small, mono, uppercase) naming the body of government or the section, then a serif headline, then a one-paragraph lede.
- Page-level headlines may use the hero register (per `docs/VOICE.md`). Body prose stays in the body register.
- Headings (H1, H2, H3) are sentence case. Pages do not use H1 more than once.
- Body prose lives in the 680-pixel measure (`max-width: var(--measure)`). Wider grids and hero blocks may use `max-width: 1080px` (`--measure-wide`) per the components stylesheet.
- Every page that asserts facts about ordinances, dates, votes, gallons, or megawatts ends with a "Sources" block linking each cited document.
- Every page that touches legal or procedural matters carries the disclaimer specified in `docs/SOURCES.md`.

## Editing copy that already shipped

If a fact changes, fix the canonical entry in `src/data/*.json` first, then check whether any page repeats the fact in prose and update those copies in the same commit. Stale facts undermine the brand harder than missing pages do.

## What does not belong in this repo

- Coalition strategy memos, internal email threads, draft public records requests, and meeting recaps. These live in the coalition Google Drive.
- PDF copies of ordinances or minutes. Link to the village's own PDF; do not host them here. If the village ever takes a document down, archive it in Drive and add a `web.archive.org` link to the source field.
- Personal information about residents (addresses, phone numbers, parcel ownership of a private home). Resident testimony is allowed only with written consent, attributed by first name and street, and only when the resident asked for it to appear.

## When in doubt

Ship less. Every claim that goes up is one a coalition member can be asked to defend at a council meeting. Make sure they could.
