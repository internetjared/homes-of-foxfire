#!/usr/bin/env node
/**
 * One-shot: insert a "Watch the public comments segment" link into the
 * lede area of update-ordinance-2026-09-moratorium-passed. Idempotent —
 * skips the patch if the link is already present.
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

const client = createClient({
  projectId:  process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token:      process.env.SANITY_WRITE_TOKEN,
  useCdn:     false,
});

if (!process.env.PUBLIC_SANITY_PROJECT_ID) { console.error('Missing PUBLIC_SANITY_PROJECT_ID'); process.exit(1); }
if (!process.env.SANITY_WRITE_TOKEN)       { console.error('Missing SANITY_WRITE_TOKEN');       process.exit(1); }

const ID = 'update-ordinance-2026-09-moratorium-passed';
const VIDEO_URL = 'https://www.youtube.com/live/aUY74cjHrUA?si=n5TDFeRQ6C_oaRTP&t=1990';

const NEW_PARAGRAPH =
  `<p class="update-watch"><a href="${VIDEO_URL}" target="_blank" rel="noopener">Watch the public comments segment from the May 5 meeting</a> on the village livestream.</p>`;

async function run() {
  const doc = await client.getDocument(ID);
  if (!doc) { console.error('Document not found'); process.exit(1); }

  const current = doc.bodyHtml || '';
  if (current.includes('youtube.com/live/aUY74cjHrUA')) {
    console.log('[patch] Video link already present — no change.');
    return;
  }

  // Insert the new paragraph after the lede paragraph (the first <p class="update-lede">…</p>).
  const ledeClose = '</p>';
  const ledeStart = current.indexOf('<p class="update-lede"');
  if (ledeStart === -1) { console.error('No lede paragraph found'); process.exit(1); }
  const ledeEnd = current.indexOf(ledeClose, ledeStart);
  if (ledeEnd === -1) { console.error('Lede close tag not found'); process.exit(1); }

  const insertAt = ledeEnd + ledeClose.length;
  const next = current.slice(0, insertAt) + NEW_PARAGRAPH + current.slice(insertAt);

  console.log(`[patch] Inserting video link after the lede (${current.length} → ${next.length} chars).`);
  await client.patch(ID).set({ bodyHtml: next }).commit({ visibility: 'sync' });
  console.log('[patch] Done.');
}

run().catch((err) => { console.error('[patch] Failed:', err); process.exit(1); });
