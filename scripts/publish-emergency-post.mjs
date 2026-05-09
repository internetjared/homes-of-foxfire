#!/usr/bin/env node
/**
 * One-shot publish: push the emergency-clause analysis post to Sanity as
 * featured: true, publishStatus: 'published', and unfeature the previously
 * featured moratorium post in the same transaction.
 *
 * Reads the post body from src/data/updates.ts (template literal under the
 * matching id) so we don't duplicate content.
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

const SLUG = 'calling-it-an-emergency-doesnt-make-it-one';
const updatesSrc = readFileSync(resolve(root, 'src/data/updates.ts'), 'utf-8');

const objStart = updatesSrc.indexOf(`id: '${SLUG}'`);
if (objStart === -1) {
  console.error(`Could not find id: '${SLUG}' in src/data/updates.ts`);
  process.exit(1);
}

// This post composes bodyHtml as a single backtick template literal.
const bodyMatch = updatesSrc
  .slice(objStart)
  .match(/bodyHtml:\s*`([\s\S]*?)`,?\n\s*\}/);

if (!bodyMatch) {
  console.error('Could not locate bodyHtml template literal');
  process.exit(1);
}

const bodyHtml = bodyMatch[1];

const doc = {
  _id: `update-${SLUG}`,
  _type: 'update',
  title: 'Why Commercial Point\'s data center "emergency" deserves scrutiny.',
  slug: { _type: 'slug', current: SLUG },
  publishDate: '2026-05-06T00:00:00-05:00',
  category: 'Procedural analysis',
  excerpt:
    "A closer look at the May 20, 2024 emergency vote. Commercial Point's data-center rezoning was passed under an emergency clause that recites Ohio's statutory phrasing without explaining any actual threat to public peace, health, or safety. Ohio Supreme Court precedent has already struck down rezoning emergency clauses with similar wording.",
  featured: true,
  thumbnailUrl: '/calling-it-an-emergency-doesnt-make-it-one.jpg',
  ogImageWidth: 1672,
  ogImageHeight: 941,
  bodyHtml,
  publishStatus: 'published',
};

async function run() {
  console.log(`[publish] Pushing ${SLUG} to ${projectId}/${dataset} as featured...`);
  console.log(`[publish] bodyHtml length: ${bodyHtml.length} chars`);
  const tx = client.transaction();

  // Unfeature the previously featured post so the homepage cleanly switches.
  tx.patch('update-ordinance-2026-09-moratorium-passed', (p) => p.set({ featured: false }));

  tx.createOrReplace(doc);

  const result = await tx.commit({ visibility: 'sync' });
  console.log(`[publish] Done. Mutations applied: ${result.results.length}`);
}

run().catch((err) => {
  console.error('[publish] Failed:', err);
  process.exit(1);
});
