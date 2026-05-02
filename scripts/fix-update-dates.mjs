#!/usr/bin/env node
/**
 * One-shot: patch publishDate on the three Sanity update documents so they
 * sort cleanly chronologically:
 *   - bill-scala-comments-march-2026         → 2026-04-30
 *   - ordinance-2024-07-procedural-review    → 2026-05-01
 *   - special-meeting-before-may-8           → 2026-05-02
 *
 * The procedural-review post was previously bumped to May 2 to share the
 * top of the list with another post. Now that special-meeting owns May 2,
 * push procedural-review back to May 1 (which is what the special-meeting
 * body refers to as "Yesterday"), and push bill-scala back one more day so
 * all three have distinct dates and a clean chronological order.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envFile = readFileSync(resolve(__dirname, '../.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim();
    if (!process.env[k]) process.env[k] = v;
  }
} catch {}

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

if (!process.env.PUBLIC_SANITY_PROJECT_ID) { console.error('Missing PUBLIC_SANITY_PROJECT_ID'); process.exit(1); }
if (!process.env.SANITY_WRITE_TOKEN)       { console.error('Missing SANITY_WRITE_TOKEN');       process.exit(1); }

const updates = [
  { id: 'update-bill-scala-comments-march-2026',      date: '2026-04-30T00:00:00-05:00' },
  { id: 'update-ordinance-2024-07-procedural-review', date: '2026-05-01T00:00:00-05:00' },
  { id: 'update-special-meeting-before-may-8',        date: '2026-05-02T00:00:00-05:00' },
];

async function run() {
  console.log('[fix-dates] Patching publishDate on 3 documents…');
  const tx = client.transaction();
  for (const u of updates) {
    tx.patch(u.id, (p) => p.set({ publishDate: u.date }));
    console.log(`  · ${u.id} → ${u.date.slice(0, 10)}`);
  }
  const result = await tx.commit({ visibility: 'sync' });
  console.log(`[fix-dates] Done. Mutations applied: ${result.results.length}`);
}

run().catch((err) => { console.error('[fix-dates] Failed:', err); process.exit(1); });
