#!/usr/bin/env node
/**
 * One-shot publish: push the `ordinance-2026-09-moratorium-passed` post to
 * Sanity as featured: true, publishStatus: 'published', and unfeature the
 * previously featured `special-meeting-before-may-8` post in the same
 * transaction.
 *
 * Usage:
 *   1. Ensure SANITY_WRITE_TOKEN is set in .env (Editor scope).
 *   2. Run: node scripts/publish-moratorium-post.mjs
 *   3. Remove the entry from localUpdates in src/data/updates.ts.
 *   4. Blank SANITY_WRITE_TOKEN back out in .env.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

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

if (!projectId) { console.error('Missing PUBLIC_SANITY_PROJECT_ID'); process.exit(1); }
if (!token)     { console.error('Missing SANITY_WRITE_TOKEN');       process.exit(1); }

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const SLUG = 'ordinance-2026-09-moratorium-passed';
const updatesSrc = readFileSync(resolve(root, 'src/data/updates.ts'), 'utf-8');

const objStart = updatesSrc.indexOf(`id: '${SLUG}'`);
if (objStart === -1) {
  console.error(`Could not find id: '${SLUG}' in src/data/updates.ts`);
  process.exit(1);
}

// This post composes bodyHtml as `[ ... ].join('')` rather than a single
// backtick template. Extract the array literal and join its string entries.
const arrMatch = updatesSrc
  .slice(objStart)
  .match(/bodyHtml:\s*\[([\s\S]*?)\]\.join\(''\)/);

if (!arrMatch) {
  console.error('Could not locate bodyHtml array for post');
  process.exit(1);
}

const arrSrc = arrMatch[1];
// Extract every single-quoted string literal in order. The bodies do not
// contain raw single quotes (only HTML escapes / no apostrophes inside ').
const stringRe = /'((?:\\'|[^'])*?)'/g;
const parts = [];
let m;
while ((m = stringRe.exec(arrSrc)) !== null) {
  parts.push(m[1].replace(/\\'/g, "'"));
}
const bodyHtml = parts.join('');

const doc = {
  _id: `update-${SLUG}`,
  _type: 'update',
  title: 'Ord 2026-09 passed. The pause begins.',
  slug: { _type: 'slug', current: SLUG },
  publishDate: '2026-05-05T00:00:00-05:00',
  category: 'Meeting recap',
  excerpt:
    'Commercial Point Council adopted Ordinance 2026-09 on May 5, 2026 by a 5-1 vote, pausing new data center applications in the village for 18 months. Eric Nungester cast the only no vote.',
  featured: true,
  thumbnailUrl: '/ordinance-2026-09-moratorium-passed.jpg',
  ogImageWidth: 1672,
  ogImageHeight: 941,
  bodyHtml,
  publishStatus: 'published',
};

async function run() {
  console.log(`[publish] Pushing ${SLUG} to ${projectId}/${dataset} as featured…`);
  console.log(`[publish] bodyHtml length: ${bodyHtml.length} chars`);
  const tx = client.transaction();

  // Unfeature the previously featured post so the homepage cleanly switches.
  tx.patch('update-special-meeting-before-may-8', (p) => p.set({ featured: false }));

  tx.createOrReplace(doc);

  const result = await tx.commit({ visibility: 'sync' });
  console.log(`[publish] Done. Mutations applied: ${result.results.length}`);
}

run().catch((err) => {
  console.error('[publish] Failed:', err);
  process.exit(1);
});
