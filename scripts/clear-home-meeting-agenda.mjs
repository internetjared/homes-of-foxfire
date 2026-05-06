#!/usr/bin/env node
/**
 * One-shot: clear stale meetingAgendaText and meetingBody fields on the
 * homePage Sanity singleton so the homepage meeting card falls back to
 * the new behavior (agenda flag = "TBD", body paragraph hidden).
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

const ID = 'homePage-singleton';
const before = await client.fetch(
  `*[_id == $id][0]{ meetingAgendaTag, meetingAgendaText, meetingBody }`,
  { id: ID }
);
console.log('Before:', before);

await client
  .patch(ID)
  .unset(['meetingAgendaText', 'meetingBody'])
  .commit({ visibility: 'sync' });

console.log('Cleared meetingAgendaText and meetingBody on', ID);
