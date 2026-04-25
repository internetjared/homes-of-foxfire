# Brand system

A developer-readable mirror of the Foxfire Coalition Brand System (`v1.0`, document `FXF-BRAND-2026-001`). The full visual reference lives at `/brand` once the site is built.

## Positioning

A volunteer neighborhood coalition in Commercial Point, Ohio that uses public records, zoning law, and plain math to make sure a 266-acre data center campus next to our homes is approved on the merits or not at all.

The brand must read as legitimate to four audiences at once: residents, the village council and zoning administrator, regional press, and any land-use attorneys we may need to recruit. Credibility comes from documents, not from anger. The aesthetic should signal that the coalition has read the ordinance, and it should hold up over months of work without peaking emotionally on day one.

## Color tokens

Eight named tokens. One primary, one accent, three surfaces, two text inks, one alert. Every token has a job.

| Token       | Hex       | Role                                                                            |
| ----------- | --------- | ------------------------------------------------------------------------------- |
| Forest Ink  | `#1F3A22` | Primary. Headlines, wordmark, document rules.                                   |
| Iron Oxide  | `#7A3A2A` | The single accent. Hearing dates, upcoming-event dots, rule below quote blocks. |
| Cream       | `#F4EFE3` | Page background. Warm-undertone paper.                                          |
| Bone        | `#EAE2D0` | Surface for cards and document blocks. Manila tone.                             |
| Moss        | `#DEE3D6` | Tinted-green surface for section dividers and quoted document blocks.           |
| Hearing Red | `#9B2D1F` | Alert. Hearings and deadlines only. Never appears twice on a page.              |
| Body Ink    | `#1A2218` | Body copy on Cream.                                                             |
| Soft Ink    | `#4D5A50` | Secondary text and metadata.                                                    |

These map to CSS custom properties in `src/styles/tokens.css` as `--ink`, `--accent`, `--paper`, `--bone`, `--moss`, `--alert`, `--text`, `--text-soft`. Variants `--ink-2`, `--accent-2`, `--paper-2`, `--bone-2`, `--moss-2`, `--text-mute` exist for surface stacking.

### Contrast (WCAG verified)

All ratios checked at 16 px body, AA threshold 4.5:1.

| Pair                    | Ratio   | WCAG |
| ----------------------- | ------- | ---- |
| Body Ink on Cream       | 14.8:1  | AAA  |
| Forest Ink on Cream     | 10.4:1  | AAA  |
| Forest Ink on Bone      | 8.7:1   | AAA  |
| Forest Ink on Moss      | 8.3:1   | AAA  |
| Soft Ink on Cream       | 5.9:1   | AA   |
| Iron Oxide on Cream     | 6.3:1   | AA   |
| Cream on Forest Ink     | 10.4:1  | AAA  |
| Hearing Red on Cream    | 6.5:1   | AA   |

If you change the palette, re-verify these pairs before shipping.

## Typography

Three faces. All loaded from Google Fonts.

| Face            | Role                                       | Weights       |
| --------------- | ------------------------------------------ | ------------- |
| IBM Plex Serif  | Headlines, wordmark, document specimens    | 400, 500, 600 |
| Public Sans     | Body copy. Face of the U.S. Web Design System. | 400, 500, 600, 700 |
| IBM Plex Mono   | Ordinance numbers, parcel IDs, request slugs, kickers | 400, 500, 600 |

Numbers live in mono with `font-variant-numeric: tabular-nums`. Body type sits in a 680-pixel measure (`--measure`). Headlines use `letter-spacing: -0.005em` and `text-wrap: balance`. Italics are not used for emphasis. Em dashes are not used at all.

### Type scale

| Role     | Size  | Line height | Family   |
| -------- | ----- | ----------- | -------- |
| Display  | 48 px | 1.10        | Headline |
| H1       | 32 px | 1.20        | Headline |
| H2       | 24 px | 1.25        | Headline |
| H3 / Lede | 18 px | 1.40       | Headline / Body |
| Body     | 16 px | 1.55        | Body     |
| Small    | 14 px | 1.50        | Body     |
| Mono     | 12 px | 1.50        | Mono     |

Spacing is a 4-point grid: `xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64, 4xl 96`.

## Wordmark

The brand is set in type alone. There is no icon, no seal, no mascot. The Foxfire neighborhood already carries an existing fox medallion; the coalition is a clean, independent counterparty and its mark is the name of the coalition, in IBM Plex Serif, two lines: the place, then the purpose.

| Variant   | Use on                                                              |
| --------- | ------------------------------------------------------------------- |
| `stacked` | Masthead, letterhead, cover.                                        |
| `stamp`   | Cover pages and signoff blocks. Centered, with hairline rules.      |
| `inline`  | Site nav and footer attribution. Single line.                       |
| `short`   | Social handles and badges where the full name will not fit. Renders as "Foxfire Coalition". |

The Wordmark component lives at `src/components/brand/Wordmark.astro`.

## Do / Don't

**Do**

- Cite ordinance numbers, parcel IDs, and gallons in tabular figures.
- Lead with the date, the body of government, and the request ID.
- Use the alert color only for hearings, deadlines, and call-to-action moments.
- Keep prose in a 680-pixel measure so it reads like a public report.
- Ship empty states that name what is missing and what to do next.

**Don't**

- Do not use exclamation points, em dashes, or loaded adjectives in coalition copy.
- Do not depict server racks, glowing data center renders, or ominous skies.
- Do not stack the alert color on top of decorative red. One signal, one job.
- Do not introduce a fox illustration, mascot, or icon. The wordmark carries the brand.
- Do not borrow the visual language of a campaign, a yard sign, or a tech startup.

## Rationale

A coalition fighting a 266-acre rezone has a credibility problem before it has a design problem. Residents who oppose a development are easy to dismiss as alarmist, partisan, or simply not in possession of the facts. The brand exists to deny that framing on first glance.

The typography pairs IBM Plex Serif with Public Sans because Public Sans is the face of the U.S. Web Design System — the typographic vocabulary of American civic publishing. Plex Mono carries ordinance numbers, parcel IDs, and request slugs so numerical evidence is always typeset like evidence.

The palette is one primary, one accent, three warm neutrals, and one alert. Forest Ink rhymes with the existing Foxfire neighborhood medallion, signaling continuity without inheriting another organization's mark; tuned slightly cooler so it reads as council document, not team logo. Iron Oxide is a deeply desaturated barn-board red — paint, not decoration. Cream, Bone, and Moss step from page to card to quoted document without ever introducing a cool gray. Hearing Red sits in the same family as iron oxide so deadlines never fight the page.

The identity is set in type alone. There is no icon, no seal, and no mascot. The Foxfire neighborhood carries an existing fox medallion; a coalition leaning on that imagery would either appear to speak for the neighborhood association or risk a trademark conflict at exactly the moment the coalition needs to be a clean, independent counterparty. A typographic wordmark also avoids any "logo as opinion" problem at council: the brand on a public records request is the name of the coalition, and nothing else.

The UI system is small on purpose. The document card foregrounds the ordinance number and the source. The timeline row treats every event as a record with a status. The callout block uses the alert color the way a courthouse uses a posted notice. The records request CTA is built around the four canonical fields: who, what, when, how. The footer always carries a last-updated stamp and a request ID, because the coalition is on the record.
