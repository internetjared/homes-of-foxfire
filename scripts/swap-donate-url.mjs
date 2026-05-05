#!/usr/bin/env node
/**
 * One-shot: replace any old GoFundMe URL with the new short link
 * across all Sanity documents that may store it (homePage, takeActionPage,
 * any update bodyHtml).
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

const OLD_RE = /https:\/\/(www\.)?gofundme\.com\/f\/support-community-action-against-data-center[^"' )]*/g;
const NEW = 'https://gofund.me/8a17e35cd';

// Targeted scalar fields on singletons
const targets = [
  { id: 'homePage-singleton',       field: 'donateUrl' },
  { id: 'takeActionPage-singleton', field: 'preFooterDonateUrl' },
  { id: 'takeActionPage-singleton', field: 'heroDonateUrl' },
  { id: 'homePage-singleton',       field: 'heroDonateUrl' },
];

for (const t of targets) {
  const doc = await client.getDocument(t.id).catch(() => null);
  if (!doc) continue;
  const v = doc[t.field];
  if (typeof v === 'string' && OLD_RE.test(v)) {
    OLD_RE.lastIndex = 0;
    const next = v.replace(OLD_RE, NEW);
    console.log(`[swap] ${t.id}.${t.field}: ${v} → ${next}`);
    await client.patch(t.id).set({ [t.field]: next }).commit({ visibility: 'sync' });
  } else {
    console.log(`[swap] ${t.id}.${t.field}: (no change — value is "${v}")`);
  }
  OLD_RE.lastIndex = 0;
}

// Sweep all update bodies for embedded references
const updates = await client.fetch(`*[_type == "update"]{ _id, bodyHtml }`);
for (const u of updates) {
  if (!u.bodyHtml) continue;
  if (!OLD_RE.test(u.bodyHtml)) { OLD_RE.lastIndex = 0; continue; }
  OLD_RE.lastIndex = 0;
  const next = u.bodyHtml.replace(OLD_RE, NEW);
  console.log(`[swap] ${u._id}.bodyHtml: replaced GoFundMe URL`);
  await client.patch(u._id).set({ bodyHtml: next }).commit({ visibility: 'sync' });
}

console.log('[swap] Done.');
