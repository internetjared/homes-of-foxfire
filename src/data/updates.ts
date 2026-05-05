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
export const localUpdates: LocalUpdate[] = [];


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
