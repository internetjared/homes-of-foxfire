#!/usr/bin/env node
/**
 * One-shot migration: push the hardcoded posts in src/data/updates.ts up
 * into Sanity as `update` documents with publishStatus = "published".
 *
 * Idempotent: documents are upserted by deterministic _id derived from the
 * slug, so re-running won't create duplicates.
 *
 * Usage:
 *   1. Set up a Sanity write token (Sanity Manage → API → Tokens, scope: Editor).
 *      Add to .env as SANITY_WRITE_TOKEN.
 *   2. Run:  node scripts/migrate-updates-to-sanity.mjs
 *   3. Open Sanity Studio and confirm the posts appear with publishStatus
 *      "published". Once verified, you can delete the entries from
 *      src/data/updates.ts (the local fallback) — Sanity will own them.
 */

import { createClient } from '@sanity/client';
import { config as dotenv } from 'dotenv';
import { localUpdates } from '../src/data/updates.ts';

dotenv();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error('Missing PUBLIC_SANITY_PROJECT_ID in .env');
  process.exit(1);
}
if (!token) {
  console.error(
    'Missing SANITY_WRITE_TOKEN in .env. Create one at',
    'https://www.sanity.io/manage with Editor scope.',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Slug → deterministic document _id, so reruns upsert in place.
const idForSlug = (slug) => `update-${slug}`;

async function migrate() {
  console.log(`[migrate] Pushing ${localUpdates.length} post(s) to Sanity (${projectId}/${dataset})…`);

  const tx = client.transaction();

  for (const u of localUpdates) {
    const doc = {
      _id: idForSlug(u.id),
      _type: 'update',
      title: u.title,
      slug: { _type: 'slug', current: u.id },
      publishDate: `${u.publishDate}T00:00:00-05:00`,
      category: u.category,
      excerpt: u.excerpt,
      featured: u.featured ?? false,
      bodyHtml: u.bodyHtml,
      videoUrl: u.videoUrl,
      videoTitle: u.videoTitle,
      videoPoster: u.videoPoster,
      thumbnailUrl: u.thumbnailUrl,
      ogImageWidth: u.ogImageWidth,
      ogImageHeight: u.ogImageHeight,
      publishStatus: u.draft ? 'draft' : 'published',
    };

    // createOrReplace = upsert. We re-publish the migrated copy.
    tx.createOrReplace(doc);
    console.log(`  · queued ${u.id}`);
  }

  const result = await tx.commit({ visibility: 'sync' });
  console.log(`[migrate] Done. Mutations applied: ${result.results.length}`);
  console.log('[migrate] Verify in Sanity Studio, then re-run `npm run build`.');
}

migrate().catch((err) => {
  console.error('[migrate] Failed:', err);
  process.exit(1);
});
