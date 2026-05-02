#!/usr/bin/env node
/**
 * One-shot publish: push the `special-meeting-before-may-8` post to Sanity
 * as featured: true, publishStatus: 'published', and unfeature the previously
 * featured `ordinance-2024-07-procedural-review` post in the same transaction.
 *
 * Reads the post body, title, excerpt, and image metadata directly from
 * src/data/updates.ts so we don't duplicate content.
 *
 * Usage:
 *   1. Ensure SANITY_WRITE_TOKEN is set in .env (Editor scope).
 *   2. Run: node scripts/publish-special-meeting-post.mjs
 *   3. Remove the entry from localUpdates in src/data/updates.ts.
 *   4. Blank SANITY_WRITE_TOKEN back out in .env.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ── Load .env manually ──────────────────────────────────────────────────────
try {
  const envFile = readFileSync(resolve(root, '.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const projectId  = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset    = process.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token      = process.env.SANITY_WRITE_TOKEN;

if (!projectId) { console.error('Missing PUBLIC_SANITY_PROJECT_ID');  process.exit(1); }
if (!token)     { console.error('Missing SANITY_WRITE_TOKEN');        process.exit(1); }

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

// ── Extract bodyHtml from src/data/updates.ts ──────────────────────────────
// The localUpdates array is a TypeScript file we can't import directly. Read
// it as text and pull out the bodyHtml template literal for the post.
const SLUG = 'special-meeting-before-may-8';
const updatesSrc = readFileSync(resolve(root, 'src/data/updates.ts'), 'utf-8');

// Find the object literal whose `id` is our slug. Match from `id: '<slug>'`
// through the next backtick-delimited bodyHtml field.
const objStart = updatesSrc.indexOf(`id: '${SLUG}'`);
if (objStart === -1) {
  console.error(`Could not find id: '${SLUG}' in src/data/updates.ts`);
  process.exit(1);
}

// Pull bodyHtml: `....` from that object. The body uses backticks and may
// span many lines; capture lazily up to the closing backtick.
const bodyMatch = updatesSrc
  .slice(objStart)
  .match(/bodyHtml:\s*`([\s\S]*?)`,?\n\s*\}/);

if (!bodyMatch) {
  console.error('Could not locate bodyHtml block for post');
  process.exit(1);
}

// The TypeScript file uses `\\n\\n` as an escaped newline string inside the
// inline JS that runs in the browser. That backslash needs to be preserved
// when shipping to Sanity exactly as-is, because Astro re-renders the file
// the same way at build time. Read out raw content from the file.
const bodyHtml = bodyMatch[1];

// ── Document ────────────────────────────────────────────────────────────────
const doc = {
  _id: `update-${SLUG}`,
  _type: 'update',
  title: "We're Asking Council to Hold a Special Meeting Before May 8",
  slug: { _type: 'slug', current: SLUG },
  publishDate: '2026-05-02T00:00:00-05:00',
  category: 'Public records',
  excerpt: "Residents are asking Commercial Point Council to publicly address procedural questions surrounding Ordinance 2024-07 before the procedural challenge deadline approaches.",
  featured: true,
  thumbnailUrl: '/special-meeting-before-may-8.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 675,
  bodyHtml,
  publishStatus: 'published',
};

// ── Run transaction ─────────────────────────────────────────────────────────
async function run() {
  console.log(`[publish] Pushing ${SLUG} to ${projectId}/${dataset} as featured…`);
  const tx = client.transaction();

  // Unfeature the previously featured post so the homepage cleanly switches.
  tx.patch('update-ordinance-2024-07-procedural-review', (p) =>
    p.set({ featured: false })
  );

  tx.createOrReplace(doc);

  const result = await tx.commit({ visibility: 'sync' });
  console.log(`[publish] Done. Mutations applied: ${result.results.length}`);
  console.log('[publish] Verify in Sanity Studio, then remove the entry from localUpdates in src/data/updates.ts.');
}

run().catch((err) => {
  console.error('[publish] Failed:', err);
  process.exit(1);
});
