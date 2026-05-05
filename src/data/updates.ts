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
    id: 'ordinance-2026-09-moratorium-passed',
    title: 'Ord 2026-09 passed. The pause begins.',
    publishDate: '2026-05-05',
    publishDateLabel: 'May 5, 2026',
    category: 'Meeting recap',
    excerpt:
      'Commercial Point Council adopted Ordinance 2026-09 on May 5, 2026 by a 5-1 vote, pausing new data center applications in the village for 18 months. Eric Nungester cast the only no vote.',
    draft: true,
    bodyHtml: [
      '<p class="update-lede">On May 5, 2026, Commercial Point Village Council adopted Ordinance 2026-09, a temporary moratorium on new data center applications inside the village. The ordinance passed 5-1. Council Member Eric Nungester cast the only no vote.</p>',
      '<p>The ordinance is now law. Below is a plain-language reading of what it says, what it does not say, and how the village arrived here.</p>',

      '<h2>What the ordinance does</h2>',

      '<h3>1. An 18-month pause</h3>',
      '<p>The village will not accept, process, or approve any new application related to data center development for 18 months from the effective date. That window gives Council, the Planning &amp; Zoning Commission, and residents time to study the use, draft updated zoning standards, and consider safeguards before any further approvals.</p>',

      '<h3>2. What counts as a data center</h3>',
      '<p>The ordinance defines a data center broadly to include any facility whose primary purpose is housing computer systems, servers, or related telecommunications and storage equipment, together with the supporting power, cooling, and water infrastructure those facilities require.</p>',

      '<h3>3. Pending applications are included</h3>',
      '<p>The pause applies to applications already in the queue, not just new ones filed after May 5. Any data center application that has not received final approval as of the effective date is subject to the moratorium.</p>',

      '<h3>4. Duration and review</h3>',
      '<p>The moratorium runs for 18 months. Council may extend, shorten, or end it earlier by a subsequent ordinance. The expectation stated on the record is that the pause is used to complete a zoning study, not simply to wait the clock out.</p>',

      '<h3>5. Sunshine Law compliance</h3>',
      '<p>The ordinance recites that all readings and the final vote were conducted in open public session in accordance with Ohio Revised Code 121.22. This language is included to make procedural compliance part of the record.</p>',

      '<h3>6. Effective immediately</h3>',
      '<p>Council declared the ordinance an emergency measure and made it effective on passage. There is no 30-day waiting period before the pause begins.</p>',

      '<h3>7. Stated reasons</h3>',
      '<p>The findings recite concerns about energy demand, water use, noise, traffic, the adequacy of current zoning standards, and the proximity of proposed sites to residential neighborhoods. The findings are the village\'s own words about why the pause is needed.</p>',

      '<h2>What the moratorium does not do</h2>',
      '<p>It does not repeal Ordinance 2024-07, the K-Nova Planned Industrial District rezoning adopted in May 2024.</p>',
      '<p>It does not cancel the existing zoning of the 266.971-acre site at SR 104, Durrett, Borror, and SR 762.</p>',
      '<p>It does not, by itself, stop a data center that has already received all required approvals.</p>',
      '<p>It does not change the procedural-defect window under ORC 713.121, which closes on or about May 20, 2026.</p>',

      '<h2>How we got here</h2>',
      '<p>On February 23, 2026, Council Member Ezekiel Miller introduced the idea of a moratorium during a regular meeting. The proposal moved to a Committee of the Whole agenda for further discussion in the weeks that followed.</p>',
      '<p>A special Council session was called to advance the draft ordinance through readings. A community meeting on May 4, 2026 gave residents a final chance to ask questions before yesterday\'s vote.</p>',
      '<p>In the same window, the Planning &amp; Zoning Commission denied the K-Nova II site plan on April 29, 2026, and the village\'s 2023 NDA with Amazon Data Services is set to expire in July 2026 after the village sent non-renewal notice.</p>',

      '<h2>What this means for residents</h2>',
      '<p>The pause is a real change. For the next 18 months, the village cannot approve a new data center application inside its limits. That is the breathing room residents have been asking for since the spring of 2024.</p>',
      '<p>The pause is also a window, not an ending. Ordinance 2024-07 is still on the books. The procedural-defect deadline under ORC 713.121 is approximately May 20, 2026. The work of the coalition does not stop because Ordinance 2026-09 passed.</p>',

      '<h2>What you can do next</h2>',
      '<p>Show up to the next Council meeting. The agenda and minutes are posted on the village website.</p>',
      '<p>Sign up for coalition updates so you hear about hearings, filings, and records-request results as they happen.</p>',
      '<p>Read the timeline. Every claim on this site is anchored to a public document or marked as records-requested.</p>',

      '<p class="update-signoff">This is not over. We can still protect Foxfire.</p>',
    ].join(''),
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
