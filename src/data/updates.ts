// Updates blog data + helpers.
//
// Source of truth at runtime is the Sanity CMS (document type `update`,
// publishStatus = "published"). The hardcoded `localUpdates` array below
// is a permanent fallback so the site never goes blank if Sanity is empty
// or unreachable at build time. When Sanity has a post with the same slug
// as a local entry, Sanity wins.
//
// Editors create/publish posts in Sanity Studio (https://foxfire-coalition.sanity.studio).
// A Sanity → Vercel webhook rebuilds the site on publish.

import { sanity, QUERY_UPDATES_PUBLISHED, type SanityUpdate } from '../lib/sanity';
import { toHTML } from '@portabletext/to-html';

export interface LocalUpdate {
  id: string;                // url slug
  title: string;
  publishDate: string;       // ISO date for sort
  publishDateLabel: string;  // human-friendly for display
  category: string;
  excerpt: string;           // 1-2 sentence summary for the index card
  thumbnailUrl?: string;     // optional override; YouTube auto-derives if missing
  ogImageWidth?: number;     // px — used for og:image:width and JSON-LD ImageObject
  ogImageHeight?: number;    // px — used for og:image:height and JSON-LD ImageObject
  videoUrl?: string;         // local MP4 path or YouTube URL
  videoPoster?: string;      // optional poster image for the <video> element
  videoTitle?: string;
  bodyHtml: string;
  draft?: boolean;            // true = generates the slug page but hidden from public index
  featured?: boolean;         // true = pinned as featured post on the homepage
}

/**
 * Permanent local fallback. Sanity content takes precedence at build time.
 * Add entries here only if a post needs to ship before it can be authored
 * in Studio. All migrated posts live in Sanity — do not re-add them here.
 */
/**
 * Permanent local fallback. Sanity content takes precedence at build time.
 * Add entries here only if a post needs to ship before it can be authored
 * in Studio. All migrated posts live in Sanity — do not re-add them here.
 */
export const localUpdates: LocalUpdate[] = [
  {
    id: 'calling-it-an-emergency-doesnt-make-it-one',
    title: "Calling it an emergency doesn't make it one.",
    publishDate: '2026-05-06',
    publishDateLabel: 'May 6, 2026',
    category: 'Procedural analysis',
    excerpt:
      "Commercial Point's data-center rezoning was passed under an emergency clause that recites Ohio's statutory phrasing without explaining any actual threat to public peace, health, or safety. Ohio Supreme Court precedent has already struck down rezoning emergency clauses with similar wording.",
    draft: true,
    bodyHtml: `
<p class="update-lede">Commercial Point's data-center rezoning deserved real public process, not boilerplate urgency.</p>

<p>On May 20, 2024, Commercial Point Village Council passed Ordinance 2024-07, rezoning roughly 266.971 acres from Exceptional Use to Planned Industrial District and adopting development standards for a planned industrial project. The permitted use listed in the development text was simple and enormous: <strong>"Data Centers."</strong></p>

<p>That alone should have demanded careful public process.</p>

<p>Instead, the ordinance was pushed through as an "emergency."</p>

<p>The entire emergency justification appears in Section 4:</p>

<blockquote class="update-pull">
  <p>"To promote commercial opportunities and its job creation within the Village of Commercial Point, this ordinance is hereby declared to be an emergency measure necessary for the immediate preservation of the public peace, health, and safety of the Village of Commercial Point and shall therefore go into immediate effect upon passage."</p>
</blockquote>

<p>That is not an emergency explanation. That is economic-development boilerplate.</p>

<p>"Commercial opportunities" and "job creation" may be policy arguments. They may be talking points. They may be reasons some council members supported the rezoning. But they do not explain why a massive industrial rezoning had to take immediate effect as an emergency measure for the preservation of public peace, health, or safety.</p>

<p>And under Ohio law, a council cannot avoid ordinary public process just by saying the magic word "emergency."</p>

<h2>Ohio law requires more than a label</h2>

<p>Under R.C. 731.30, emergency ordinances are special. They can take immediate effect, but only when they are "necessary for the immediate preservation of the public peace, health, or safety," and the reasons for that necessity must be set forth in a separate section of the ordinance. The same statute requires a two-thirds vote of all members elected to council.</p>

<p>Ordinary legislation, by contrast, is supposed to move through a public process. Under R.C. 731.17(A)(2), ordinances and resolutions must be read on three different days unless council dispenses with that rule by a vote of at least three-fourths of its members.</p>

<p>These are two separate procedural requirements with two separate vote thresholds. They are not the same.</p>

<p>That distinction matters here for a specific reason. Commercial Point's council is composed of six members under R.C. 731.09 and Codified Ordinance 220.01. With one vacancy at the time of the May 20, 2024 vote, two-thirds of six is four votes, and three-fourths of six is five votes. Ordinance 2024-07 recorded a 4-1 vote both on suspension of readings and on passage. That arithmetic raises serious questions about whether the readings were properly suspended at all, and the validity of the emergency clause is part of the same procedural picture.</p>

<h2>"Job creation" is not the same thing as "public peace, health, or safety"</h2>

<p>The problem with Section 4 is not subtle. It gives one actual reason: <strong>"commercial opportunities and its job creation."</strong></p>

<p>Then it immediately recites the statutory phrase: <strong>"public peace, health, and safety."</strong></p>

<p>But it never connects the two.</p>

<p>What immediate threat to public peace, health, or safety existed on May 20, 2024? A public-health crisis? A public-safety threat? A failing utility? A court deadline? An EPA order? A police or fire emergency? A public-water emergency?</p>

<p>The ordinance does not say.</p>

<p>That silence is especially glaring because the ordinance and its development standards are detailed when describing the developer's requested approvals. The standards include data centers as the permitted use, height standards, coverage standards, parking standards, lighting standards, signage standards, landscaping rules, and multiple deviations from the zoning code.</p>

<p>So the Village had room to be specific. It simply was not specific about the alleged emergency.</p>

<h2>Ohio courts have already rejected this kind of language</h2>

<p>The Ohio Supreme Court has reviewed emergency-clause language under R.C. 731.30 multiple times, and the cases line up against Section 4 of Ordinance 2024-07.</p>

<h3>State ex rel. Waldick v. Williams, 74 Ohio St.3d 192 (1995)</h3>
<p>The Court held that a valid R.C. 731.30 emergency clause must set forth specific reasons supporting the declaration. An ordinance cannot, in the Court's later paraphrase, simply "state that it was an emergency because it was an emergency." Purely conclusory, tautological, or illusory emergency language fails the statute. Waldick itself upheld an emergency clause that cited concrete public reasons (engineering services to obtain drinkable water and to comply with federal water-system guidelines).</p>

<h3>State ex rel. Webb v. Bliss, 99 Ohio St.3d 166 (2003)</h3>
<p>The Court reviewed Geneva-on-the-Lake Ordinance No. 1165, which rezoned a 45-acre parcel and declared itself an emergency for "the proper regulation and use of lands within the Village" and because the parcel was "more properly classified and consistent with" its new classification. The Court held those were "only conclusory statements" insufficient under R.C. 731.30. The reasons given "could be broadly applied to any zoning change" and contained "no viable reason to exempt the rezoning from the electorate's constitutional right of referendum." Writ of mandamus granted. The referendum had to go to the voters.</p>

<h3>State ex rel. Hasselbach v. Sandusky Cty. Bd. of Elections, 157 Ohio St.3d 433 (2019)</h3>
<p>This is the closest analog. The Court reviewed a Fremont rezoning ordinance whose emergency clause "parrots R.C. 731.30" by reciting "public peace, health, safety and welfare" and adding only this: "Said emergency being the immediate undertaking of the project to avoid an increase in project cost." The Court held the clause was conclusory and showed no connection between a private developer's project costs and the municipality's public peace, health, or safety. Writ granted; the referendum was placed on the November 2019 ballot.</p>

<p>Read that one again. The defective Fremont language was "the immediate undertaking of the project to avoid an increase in project cost." The Commercial Point language is "to promote commercial opportunities and its job creation." The grammatical structure is different. The legal substance is the same: a private developer's economic interest dressed up in statutory boilerplate. The Ohio Supreme Court has already said that fails.</p>

<h3>State ex rel. Laughlin v. James, 115 Ohio St.3d 231 (2007)</h3>
<p>The contrast case. The Court upheld Centerburg's emergency annexation ordinance because its emergency clause cited specific, project-particular reasons: permitting the property owner to begin planning-commission applications, preventing further delay from correcting an earlier ordinance, avoiding uncertainty in the village's sanitary and storm-sewer infrastructure planning, and conformance with the village's Comprehensive Plan. Laughlin makes clear that courts will not second-guess truly stated public reasons, but they will strike "purely conclusory, tautological, or illusory" emergency declarations.</p>

<p>The takeaway across all four cases: real emergency clauses identify concrete public reasons. Boilerplate emergency clauses recite public peace, health, and safety without connecting that recital to anything specific. Ordinances in the second category get sent to the voters.</p>

<h2>Section 4 looks like the boilerplate cases, not the specific ones</h2>

<p>The defective emergency clauses in Webb and Hasselbach and the valid ones in Waldick and Laughlin sort along a clean line.</p>

<div class="update-cases-table-wrap">
  <table class="update-cases-table">
    <thead>
      <tr>
        <th scope="col">Case</th>
        <th scope="col">Emergency reason cited</th>
        <th scope="col">Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Waldick (1995)</td>
        <td>Engineering services to obtain drinkable water and meet federal water-system guidelines</td>
        <td>Upheld</td>
      </tr>
      <tr>
        <td>Webb (2003)</td>
        <td>"Proper regulation and use of lands"; parcel "more properly classified" under new zoning</td>
        <td>Struck down</td>
      </tr>
      <tr>
        <td>Laughlin (2007)</td>
        <td>Specific planning-commission applications, sewer-infrastructure planning, comprehensive-plan conformance</td>
        <td>Upheld</td>
      </tr>
      <tr>
        <td>Hasselbach (2019)</td>
        <td>"Immediate undertaking of the project to avoid an increase in project cost"</td>
        <td>Struck down</td>
      </tr>
      <tr>
        <td>Ord 2024-07 (2024)</td>
        <td>"To promote commercial opportunities and its job creation"</td>
        <td>?</td>
      </tr>
    </tbody>
  </table>
</div>

<p>If "commercial opportunities and job creation" are enough to create an emergency, then almost any rezoning for a developer could be declared an emergency. A warehouse could be an emergency. A subdivision could be an emergency. A shopping center could be an emergency. A factory could be an emergency. Every politically favored land-use change could be rushed through under the same generic phrase.</p>

<p>That would swallow the rule. Ohio courts have not let it.</p>

<h2>The bigger the project, the less acceptable the boilerplate</h2>

<p>This was not a minor housekeeping ordinance. Ordinance 2024-07 rezoned nearly 267 acres for planned industrial use, with development standards for data centers.</p>

<p>A data-center campus raises obvious public questions: electricity demand, water use, stormwater, noise, traffic, visual buffers, public-safety capacity, tax impacts, long-term land-use compatibility, and effects on nearby residents.</p>

<p>Those questions do not become less important because a developer wants certainty. They become more important.</p>

<p>If the Village believed there was a true public emergency, it should have said so clearly. It should have identified the immediate public harm that would occur if the ordinance followed the ordinary process. It should have explained why waiting for regular effectiveness, additional readings, or public review would endanger the public peace, health, or safety.</p>

<p>Instead, the ordinance says the emergency was to promote commercial opportunities and job creation. That is not an emergency. That is a development goal.</p>

<h2>This matters for public accountability</h2>

<p>Emergency legislation is powerful because it can compress the public's time to understand, organize, and respond. In zoning cases, that can be especially significant because residents may lose practical opportunities to seek referendum review or challenge procedural irregularities. Webb and Hasselbach both involved residents who had to file mandamus actions to force their referendum petitions onto the ballot after improper emergency declarations.</p>

<p>This is not a guaranteed lawsuit winner. Courts may consider timing, remedies, standing, delay, and whether the ordinance eventually took effect as regular legislation. But the central legal question is real: whether Section 4 of Ordinance 2024-07 satisfies R.C. 731.30 in light of Waldick, Webb, Laughlin, and Hasselbach.</p>

<p>Residents should not have to guess why their government treated a 267-acre private industrial rezoning as an emergency. The reason should be in the ordinance. That is the whole point of the statute.</p>

<h2>Questions Commercial Point officials should answer</h2>

<p>The public deserves direct answers:</p>

<ul>
  <li>What immediate threat to public peace, health, or safety existed on May 20, 2024?</li>
  <li>Why did "commercial opportunities and job creation" require emergency treatment?</li>
  <li>Did the Village Solicitor review Webb and Hasselbach before approving this emergency clause?</li>
  <li>Were any draft emergency clauses prepared that gave more specific reasons?</li>
  <li>Were council members told that four votes might satisfy the emergency-passage threshold but not the separate three-fourths reading-suspension threshold for a six-member council?</li>
  <li>Was the emergency label used because of an immediate public threat the village can articulate?</li>
</ul>

<p>Those are not anti-growth questions. They are basic rule-of-law questions.</p>

<h2>Bottom line</h2>

<p>Commercial Point did not merely approve a zoning change. It approved a 267-acre data-center rezoning and declared it an emergency using language so vague it could fit almost any development project. The Ohio Supreme Court has already struck down two rezoning emergency clauses with substantively similar wording.</p>

<p>Ohio law requires more than a label.</p>

<p>Before a village shortens the public process on a project of this scale, it should be able to answer one simple question:</p>

<p class="update-signoff">What, exactly, was the emergency?</p>

<div class="update-sources">
  <p class="update-sources-intro">This post is informational and reflects coalition research on the public record. It is not legal advice. Citations to Ohio Supreme Court decisions are provided to allow readers to consult the underlying authorities directly.</p>
</div>
`,
  },
];


// True if a videoUrl points to a self-hosted file (lives in /public).
export const isLocalVideo = (url?: string): boolean =>
  Boolean(url && (url.startsWith('/') || url.startsWith('./')) && !url.startsWith('//'));

// Extract a YouTube video ID from any standard URL form.
export const youtubeId = (url?: string): string | null => {
  if (!url) return null;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  const liveMatch = url.match(/youtube\.com\/live\/([^?&/]+)/);
  if (liveMatch) return liveMatch[1];
  const embedMatch = url.match(/\/embed\/([^?&/]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
};

// Convert any YouTube URL into an embed URL (preserving any ?t= start time).
export const toEmbedUrl = (url?: string): string | null => {
  const id = youtubeId(url);
  if (!id) return null;
  const timeMatch = url ? url.match(/[?&]t=(\d+)/) : null;
  const query = timeMatch ? `?start=${timeMatch[1]}` : '';
  return `https://www.youtube.com/embed/${id}${query}`;
};

// Derive a YouTube thumbnail URL. `hqdefault` (480x360) always exists and
// loads fast — perfect for in-page cards. `maxresdefault` (1280x720) gives
// proper social-preview sizing but only exists for videos uploaded above 720p;
// older/low-res uploads return 404.
export const youtubeThumbnail = (url?: string): string | null => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const youtubeOgThumbnail = (url?: string): string | null => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

// In-page card thumbnail: explicit override → fast YouTube hqdefault → null.
export const cardThumbnail = (u: LocalUpdate): string | null =>
  u.thumbnailUrl ?? youtubeThumbnail(u.videoUrl);

// Social-preview / OG image: explicit override → big YouTube maxresdefault → null.
// Use the larger thumbnail here so Twitter/Facebook previews are full-size,
// while the in-page card stays on the lighter hqdefault asset.
export const ogImageForUpdate = (u: LocalUpdate): string | null =>
  u.thumbnailUrl ?? youtubeOgThumbnail(u.videoUrl);

// ─────────────────────────────────────────────────────────────────────────────
// Sanity → LocalUpdate normalization
// ─────────────────────────────────────────────────────────────────────────────

// Format an ISO date as "May 2, 2026" without a runtime timezone surprise.
function formatPublishDateLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Strip an ISO datetime back to just the YYYY-MM-DD portion used for sorting.
function isoDateOnly(iso: string): string {
  return (iso || '').slice(0, 10);
}

/**
 * Convert a Sanity `update` document into the LocalUpdate shape used by
 * the rest of the site. Falls back to portable-text → HTML when no
 * `bodyHtml` was supplied. Throws on documents missing required fields.
 */
function sanityToLocalUpdate(doc: SanityUpdate): LocalUpdate {
  const bodyHtml =
    (doc.bodyHtml && doc.bodyHtml.trim().length > 0)
      ? doc.bodyHtml
      : (Array.isArray(doc.body) && doc.body.length > 0
          ? toHTML(doc.body as any)
          : '');

  return {
    id: doc.slug,
    title: doc.title,
    publishDate: isoDateOnly(doc.publishDate),
    publishDateLabel: formatPublishDateLabel(doc.publishDate),
    category: doc.category,
    excerpt: doc.excerpt,
    thumbnailUrl: doc.thumbnailUrl,
    ogImageWidth: doc.ogImageWidth,
    ogImageHeight: doc.ogImageHeight,
    videoUrl: doc.videoUrl,
    videoPoster: doc.videoPoster,
    videoTitle: doc.videoTitle,
    bodyHtml,
    featured: doc.featured ?? false,
    // Sanity has no `draft` flag; non-"published" status filters them out
    // upstream in the GROQ query, so anything that arrives here is live.
    draft: false,
  };
}

/**
 * Build-time fetch of all published updates, merged with the local fallback.
 * Sanity wins on slug collision. Result is sorted publishDate desc.
 *
 * Errors from Sanity are swallowed and logged; the build still ships the
 * local fallback rather than failing.
 */
export async function getAllUpdates(): Promise<LocalUpdate[]> {
  let fromSanity: LocalUpdate[] = [];
  try {
    const docs = await sanity.fetch<SanityUpdate[]>(QUERY_UPDATES_PUBLISHED);
    if (Array.isArray(docs)) {
      fromSanity = docs.map(sanityToLocalUpdate);
    }
  } catch (err) {
    console.warn('[updates] Sanity fetch failed; using local fallback only:', err);
  }

  const sanitySlugs = new Set(fromSanity.map((u) => u.id));
  const merged: LocalUpdate[] = [
    ...fromSanity,
    ...localUpdates.filter((u) => !sanitySlugs.has(u.id)),
  ];

  return merged.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

/**
 * Backwards-compatible export. Importers that previously did
 * `import { updates } from '...'` keep working by reading the local
 * fallback synchronously. New code should use `getAllUpdates()` so it
 * picks up Sanity content.
 */
export const updates = localUpdates;
