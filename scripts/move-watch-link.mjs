#!/usr/bin/env node
/**
 * One-shot: relocate the .update-watch paragraph to sit immediately
 * after the "The ordinance is now law…" paragraph, and drop the
 * trailing period after the closing </a>. Idempotent.
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
try {
  const env = readFileSync(resolve(root, '.env'), 'utf-8');
  for (const line of env.split('\n')) {
    const t = line.trim(); if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('='); if (eq === -1) continue;
    if (!process.env[t.slice(0, eq).trim()]) process.env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
} catch {}

const client = createClient({
  projectId:  process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token:      process.env.SANITY_WRITE_TOKEN,
  useCdn:     false,
});

const ID = 'update-ordinance-2026-09-moratorium-passed';
const doc = await client.getDocument(ID);
if (!doc) { console.error('Document not found'); process.exit(1); }
let html = doc.bodyHtml || '';

// 1) Pull out the existing watch paragraph (anywhere in the body).
const watchRegex = /<p class="update-watch">[\s\S]*?<\/p>/;
const watchMatch = html.match(watchRegex);
if (!watchMatch) { console.error('No .update-watch paragraph found'); process.exit(1); }
let watchHtml = watchMatch[0];
html = html.replace(watchHtml, '');

// 2) Drop trailing period after </a>.
watchHtml = watchHtml
  .replace('</a>.</p>', '</a></p>')
  .replace('</a> .</p>', '</a></p>');

// 3) Insert after the "The ordinance is now law…" paragraph.
const ANCHOR_FRAGMENT = 'The ordinance is now law.';
const anchorIdx = html.indexOf(ANCHOR_FRAGMENT);
if (anchorIdx === -1) { console.error('Anchor paragraph not found'); process.exit(1); }
const closeIdx = html.indexOf('</p>', anchorIdx);
if (closeIdx === -1) { console.error('Anchor paragraph close not found'); process.exit(1); }
const insertAt = closeIdx + '</p>'.length;
const next = html.slice(0, insertAt) + watchHtml + html.slice(insertAt);

if (next === doc.bodyHtml) {
  console.log('[move] No change.');
  process.exit(0);
}

console.log(`[move] ${doc.bodyHtml.length} → ${next.length} chars.`);
await client.patch(ID).set({ bodyHtml: next }).commit({ visibility: 'sync' });
console.log('[move] Done.');
