#!/usr/bin/env node
/**
 * One-shot: remove the trailing " on the village livestream" phrase after
 * the watch-link in the moratorium post bodyHtml. Idempotent.
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
const before = doc.bodyHtml || '';
const after = before.replace('</a> on the village livestream.</p>', '</a>.</p>');
if (after === before) {
  console.log('[trim] No change (already trimmed or phrase not found).');
  process.exit(0);
}
console.log(`[trim] ${before.length} → ${after.length} chars.`);
await client.patch(ID).set({ bodyHtml: after }).commit({ visibility: 'sync' });
console.log('[trim] Done.');
