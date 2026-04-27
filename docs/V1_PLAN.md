# V1 Plan

The canonical V1 build brief for the Homes of Foxfire Coalition Against Data Centers website. Covers mission, IA, page-by-page content blueprints, hero and CTA copy, data structures, build phases, launch checklist, and SEO. The voice spec lives in `docs/VOICE.md`. Visual tokens live in `docs/BRAND.md`. Folder layout lives in `docs/ARCHITECTURE.md`. Editorial rules and data schemas live in `docs/CONTENT.md`. This file is canonical for everything else.

## 1. Goal

The V1 site answers five questions in under a minute, on a phone, for a neighbor who has never heard of any of this:

1. What is happening?
2. Why should residents care?
3. What do public records show?
4. What questions are still unanswered?
5. What can residents do right now?

The site is a public information hub. It is not a legal accusation site. It is not a fundraising page. It is not a petition. It exists to publish public-record evidence, educate residents about data centers and impacts, capture signups, and drive turnout.

Success metrics, in priority order:

1. Email signups
2. Meeting turnout
3. Volunteers for records review
4. Residents sharing the timeline and the flyer
5. Public officials seeing that the neighborhood is organized, factual, and paying attention

Traffic is not a success metric.

## 2. IA

```
/                Home
/timeline        Source-linked timeline
/learn           Data center education hub
/documents       Public documents library
/take-action     Sign up, attend, email, volunteer, share
/updates         Coalition updates and records-request status
/brand           Internal brand reference (not in main nav)
```

Optional later: `/questions`, `/meetings`, `/contact`, `/press`. Do not build for V1.

## 3. Top navigation

Fixed across every public page. Sentence-case labels:

```
Home    Timeline    Learn    Documents    Take Action    Updates
```

Mobile: collapse to a hamburger that reveals the same six labels in the same order.

## 4. Home page blueprint

Goal: move a resident from confusion to action in under a minute.

### Block 1: Hero

Headline (allowed in the hero register):

```
Giant data centers.
Nearly 267 acres.
Your new neighbor.
```

Tagline (mono, Iron Oxide):

```
Public records. Public hearings. Public land.
```

Lede (body register):

```
Public records show a nearly 267-acre site near Foxfire has already been
rezoned for data-center use. This site helps residents understand what
happened, what is still unknown, and how we can organize together.
```

Primary CTA: `Sign up for updates.`
Secondary CTA: `View the timeline →`

### Block 2: Where things stand now

Three cards, equal weight.

**Card 1, "What is confirmed."**
- A nearly 267-acre site near Foxfire was rezoned to a Planned Industrial District.
- The approved development standards permit data centers as the only use on the property.
- A major site plan has surfaced showing a large industrial campus concept.

**Card 2, "What is still unclear."**
- Final project status.
- Utility demand.
- Water and sewer impact.
- Generator and substation details.
- Noise, traffic, lighting, and stormwater impacts.
- Whether procedural issues affected the approval process.

**Card 3, "What residents are doing."**
- Requesting public records.
- Building a verified timeline.
- Reviewing legal and zoning questions.
- Educating neighbors.
- Organizing for meetings and public comment.

### Block 3: Why this matters

Eight short topic cards, each one sentence in the body register.

- **Home values.** Residents are asking whether a large industrial campus near homes could affect property values and marketability.
- **Water supply.** Residents are asking for site-specific numbers on water demand, cooling design, fire flow, and sewer capacity.
- **Air quality.** Residents are asking about backup generators, construction dust, emissions, and any air permits or studies.
- **Noise.** Residents are asking for day-and-night noise modeling, including mechanical equipment, cooling, generators, and low-frequency hum.
- **Traffic.** Residents are asking about construction traffic, truck routes, road impacts, and long-term site access.
- **Health and safety.** Residents are asking for independent review of potential health, safety, emergency-service, and quality-of-life impacts.
- **Children's future.** Residents are asking what this could mean for a growing residential community.
- **Transparency.** Residents are asking for complete records, meeting videos, site plans, notices, and a clear explanation of what has already been approved.

### Block 4: Signup (rich form)

Full V1 signup. See section 9 for the field schema.

Heading: `Join the Foxfire updates list.`
Subhead: `A short note before every meeting on the data center issue, plus a recap after, plus alerts when a deadline is real.`

### Block 5: Timeline preview

Three to five most recent timeline entries, with a `View the full timeline →` link to `/timeline`.

### Block 6: Learn preview

Three featured resources from `/learn` with the `Visit the learn hub →` link. The featured cards are: WRI 7 Ways, Virginia JLARC, LBNL energy report.

### Block 7: Take action

Compressed version of `/take-action`. Three buttons:

- `Sign up for updates.`
- `Email the council.`
- `Attend the next meeting.`

### Block 8: Footer disclaimer

```
This site is maintained by residents. We aim to separate confirmed
public records from open questions and community concerns. Nothing on
this site is legal advice.
```

## 5. Timeline page blueprint

Page title: `Timeline: how we got here.`

Page intro (body register):

```
This timeline summarizes public records related to the K-Nova / Jahn
Farm / data-center issue near Foxfire. Each entry links to source
material where available.
```

Tag filter strip across the top. Tags from `docs/CONTENT.md`:

```
All    Zoning    Annexation    Public Meeting    Ordinance    Resolution
Site Plan    Utility / Infrastructure    Open Question    Records Requested
```

Below the filter, the full ordered list of `TimelineRow` components rendered from `src/data/timeline.json`. Each entry shows: date, optional ordinance ID, title, body, why-it-matters, status badge, verification badge, source link.

V1 must include the entries listed in the source brief (May 2021 through April 2026), already largely populated in `timeline.json`.

## 6. Learn page blueprint

Page title: `Learn about data centers.`

Sections, in order:

1. **What is a data center?** One-paragraph explainer. Body register.
2. **Why are residents concerned?** Topic blocks, each two to three sentences:
   - Electricity and grid demand
   - Water and cooling
   - Backup generators and air quality
   - Noise and vibration
   - Stormwater and construction runoff
   - Traffic and road impact
   - Land use near homes
   - Tax incentives and long-term public costs
   - Transparency and NDAs
3. **Featured resources.** ResourceCard grid pulled from `src/data/resources.json`. Grouped by `category` (Start Here, Energy, Water, Air Quality, Noise, Stormwater, Health, Tax & Incentives, Local Coverage).

V1 resources, all of which must ship in `resources.json`:

- World Resources Institute, "7 Ways Data Centers Affect U.S. Communities."
- Virginia JLARC, "Data Centers in Virginia."
- Lawrence Berkeley National Laboratory, "U.S. Data Center Energy Usage Report."
- Brookings, "Local Implications of Data Centers for Rural Communities."
- Uptime Institute, "Water Is Local."
- EPA, "Stormwater Discharges from Construction Activities."
- EPA, Stationary Engines / RICE NESHAP.
- EPA, "Particulate Matter Health Effects."
- Washington State Department of Ecology, "Data Centers and Air Pollution."
- WHO, "Environmental Noise Guidelines."
- Frontiers in Climate, "Health Implications of Data Centers in Virginia."
- Ohio Newsroom, "Ohio Towns Pushing Back Against Data Centers."

## 7. Documents page blueprint

Page title: `Public documents.`

Page intro (body register):

```
These are public records, ordinances, meeting minutes, site plans,
records requests, and research materials related to the Foxfire /
K-Nova / Jahn Farm data-center issue. We are organizing them so
residents can review the source material directly.
```

Categories, each a section heading on the page, rendered as `DocumentCard` grids from `src/data/documents.json`:

- Official Village Records
- K-Nova / Jahn Farm Documents
- Records Requests
- Education Resources

V1 must include at minimum: Ord 2024-07, Ord 2024-02 (died), Ord 2024-05, Ord 2023-09, Ord 2023-10, Ord 2023-11, Ord 2026-03, Res 17-2023, Res 38-2023, Res 35-2025, all hearing and council minutes already in `documents.json`, and the four ORC anchors (731.17, 731.30, 713.12, 713.121, 121.22).

Each document card shows: kind, number, title, date, body, why-it-matters, status badge, verification badge, source link.

## 8. Take Action page blueprint

Page title: `Take action.`

Hero strip (hero register):

```
This is not over.
Help protect Foxfire.
```

Action 1: Sign up for updates. Repeats the rich signup form from the home page.

Action 2: Attend the next meeting. Pulls from `meetings.json`. Shows: date, time, location, agenda link, suggested talking points block, what-to-bring checklist.

Action 3: Email the council. Provides the email template:

Subject:
```
Please provide full transparency on the Foxfire-adjacent data-center project
```

Suggested body (body register):
```
I am a resident concerned about the Foxfire-adjacent data-center
project. Please provide full transparency, complete records,
independent review, and clear public answers about zoning, utilities,
water, noise, traffic, environmental impacts, and next approvals.
```

Plus a list of council member email addresses pulled from village contacts.

Action 4: Help review documents. CTA: `Volunteer for records review.` Routes to a section of the signup form with the `Records research` checkbox preselected.

Action 5: Share with neighbors. Provides a flyer download (PDF), a QR code that resolves to the homepage, suggested social copy, and door-knocking talking points.

## 9. Signup form (V1)

Field schema:

| Field           | Type           | Required |
| --------------- | -------------- | -------- |
| First name      | text           | yes      |
| Last name       | text           | yes      |
| Email           | email          | yes      |
| Phone           | tel            | no       |
| Address         | text (street)  | no       |
| Help-with skills (multi-select) | checkbox group | no       |

Help-with skill options:

- Records research
- Meeting attendance
- Flyers and outreach
- Website / content
- Legal research
- General updates only

Submit button: `Join the Foxfire updates list.`

Fineprint:

```
Short note before every meeting on the data center issue, plus a recap
after. No spam, no other lists. Unsubscribe in one click.
```

Wiring: the form is intended to post to Buttondown (or equivalent) with a server-side webhook that adds the contact to a Drive sheet for the volunteer-skills capture. V1 ships with the form rendered correctly and a working email submission to `foxfirehomescoalition@gmail.com` as a fallback. The Buttondown / volunteer-sheet wiring is Phase 2.

## 10. Updates page blueprint

Page title: `Updates.`

Page intro (body register):

```
News and changes from the coalition: records-request status, meeting
reminders and recaps, newly found documents, timeline updates, and
volunteer needs.
```

Body: `UpdatePost` list pulled from `src/data/updates.json`, newest at the top. Each post shows: date, title, category badge, summary, what-happened, why-it-matters, what-to-do, related links.

Sidebar (or footer block on mobile): records-request status table. For V1, a static block tied to the existing PRR-01 entry. Phase 2 wires to a live Drive tracker.

## 11. Build phases

**Phase 1, the V1 launch.** All six pages live, the rich signup form rendering, the timeline rendered from `timeline.json`, the documents library rendered from `documents.json`, the learn hub rendered from `resources.json` (new file), the updates page rendered from `updates.json` (new file), the take-action page with email template and meeting block.

**Phase 2, trust and depth.** Buttondown wiring, public records request tracker (live), downloadable flyer, source-linked document cards (richer), meeting calendar tied to ICS, updates page automation.

**Phase 3, engagement.** Shareable social graphics, email templates as a library, meeting talking-point library, FAQ tagged and grouped, parcel/site map (richer than the current schematic SVG).

**Phase 4, research depth.** Searchable document library, video archive index, gap-report page, comparable-cases page (Festus, Maine, Bangor, Prince William County), Spanish-language version, press kit.

## 12. Launch checklist

V1 must have, before going live at `foxfirecoalition.org`:

- [ ] All six pages routed and live (Home, Timeline, Learn, Documents, Take Action, Updates).
- [ ] Top navigation present and identical on every page.
- [ ] Signup form working (richer schema, V1 fields), submitting at minimum to the coalition Gmail.
- [ ] Timeline page rendering all current entries from `timeline.json` with status and verification badges.
- [ ] Documents page rendering all current entries from `documents.json` grouped by category.
- [ ] Learn page rendering all V1 resources from `resources.json`.
- [ ] Updates page rendering at minimum the PRR-01 launch post.
- [ ] Take Action page rendering all five actions with the email template inline.
- [ ] Footer disclaimer present on every page.
- [ ] Mobile layout verified at 375px and 414px viewports.
- [ ] Lighthouse performance ≥ 95 on mobile, accessibility = 100, AA contrast verified per `docs/BRAND.md`.
- [ ] QR code generated for flyer use, resolving to `foxfirecoalition.org`.
- [ ] `foxfirecoalition.org` registered with the coalition Gmail as registrar contact, with `.com` redirect set up.
- [ ] Plausible or Cloudflare Web Analytics installed. No Google Analytics. No third-party trackers.

Nice to have at launch but not blocking:

- [ ] Searchable document library.
- [ ] Interactive parcel map.
- [ ] Live meeting calendar.
- [ ] Volunteer dashboard.
- [ ] Records-request status board synced to Drive.
- [ ] Downloadable flyer PDFs.

## 13. SEO and metadata

Per page:

**Home**
- Title: `Homes of Foxfire Coalition Against Data Centers | Commercial Point, Ohio`
- Meta: `A resident-led information hub about the K-Nova / Jahn Farm data-center issue near Foxfire in Commercial Point, Ohio. Learn the facts, review public records, and sign up for updates.`

**Timeline**
- Title: `Timeline: K-Nova / Jahn Farm data center issue near Foxfire`
- Meta: `A source-linked public-record timeline of the K-Nova / Jahn Farm data-center zoning and site-plan issue near Foxfire in Commercial Point, Ohio.`

**Learn**
- Title: `Data center education hub | Foxfire Coalition`
- Meta: `Learn about data centers, energy demand, water use, noise, air quality, stormwater, land use, and community impacts using credible public resources.`

**Documents**
- Title: `Public documents | Foxfire data center records`
- Meta: `Access public records, ordinances, meeting minutes, site plans, and records requests related to the Foxfire-adjacent K-Nova / Jahn Farm data-center issue.`

**Take Action**
- Title: `Take action | Help protect Foxfire`
- Meta: `Sign up for updates, attend meetings, contact officials, volunteer, and help organize residents around the Foxfire-adjacent data-center issue.`

**Updates**
- Title: `Updates | Foxfire Coalition`
- Meta: `Records-request status, meeting reminders and recaps, newly found documents, and volunteer needs from the Foxfire Coalition.`

## 14. Copy library

Mission statement (used on `/take-action`, footer, press kit):

```
Homes of Foxfire Coalition Against Data Centers is a resident-led
effort to educate neighbors, gather public records, ask clear
questions, and protect the future of our community.
```

Transparency statement (used on `/documents` and `/updates` headers):

```
We believe residents deserve complete, accessible, and timely
information about major development decisions affecting their homes,
health, water, roads, and quality of life.
```

Action statement (used on `/take-action` hero and any flyer):

```
This is not over. We are organizing now to demand answers, review the
process, and help protect Foxfire.
```

Site-wide disclaimer (used in every page footer):

```
This website is for public education and resident organizing. We aim
to cite official public records wherever possible. Community concerns
are identified separately from confirmed public records. Nothing on
this site should be treated as legal advice.
```

## 15. Visual direction

The visual system is committed in `docs/BRAND.md` and `src/styles/tokens.css`. Forest Ink primary, Iron Oxide accent, Cream / Bone / Moss neutrals, Hearing Red alert. IBM Plex Serif headlines, Public Sans body, IBM Plex Mono for ordinance numbers and request IDs.

The brief proposed a charcoal/navy direction. That was reviewed and rejected; the existing palette is canon. No further palette discussion at V1.

## 16. Final note

The site does not need to prove every legal theory. It needs to make the public record understandable, help residents get organized, and drive signups and meeting turnout. Every block on every page should answer one of the five questions in section 1, or it does not belong on the V1 site.
