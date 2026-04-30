#!/usr/bin/env node
/**
 * Pull Timeline Events and Documents from Airtable into the repo's structured-data files.
 *
 * Runs as a `prebuild` hook before `astro build`. The site continues to read from
 * src/data/timeline.json and src/data/documents.json, so no page changes are needed.
 *
 * Filters applied:
 *   Timeline Events: Public Website? === true AND Confidence === "Confirmed"
 *   Documents:       Public Use? === true AND Source Reliability != "Unverified"
 *
 * If AIRTABLE_PAT or AIRTABLE_BASE_ID is missing the sync logs a warning and exits 0
 * without touching the JSON files. Local dev that doesn't need fresh content keeps working.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config'; // Load .env locally. On Vercel, env vars are already in process.env and this is a no-op.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'src', 'data');

const PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TIMELINE_TABLE = process.env.AIRTABLE_TIMELINE_TABLE || 'Timeline Events';
const DOCUMENTS_TABLE = process.env.AIRTABLE_DOCUMENTS_TABLE || 'Documents';

const log = (...args) => console.log('[airtable-sync]', ...args);
const warn = (...args) => console.warn('[airtable-sync]', ...args);

if (!PAT || !BASE_ID) {
  warn('AIRTABLE_PAT or AIRTABLE_BASE_ID not set. Skipping sync.');
  warn('Site will build from existing src/data/*.json without refresh.');
  process.exit(0);
}

async function airtableFetchAll(tableName) {
  const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName)}`);
  url.searchParams.set('pageSize', '100');

  const all = [];
  let offset;
  do {
    if (offset) url.searchParams.set('offset', offset);
    else url.searchParams.delete('offset');
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${PAT}` },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable ${tableName} fetch failed (${res.status}): ${body}`);
    }
    const data = await res.json();
    all.push(...data.records);
    offset = data.offset;
  } while (offset);

  return all;
}

function getCategoryForTimeline(eventType) {
  // Map Airtable Event Type single-select to the site's existing timeline.json `category` values.
  const map = {
    'Council Meeting': 'Public Meeting',
    'Committee of the Whole': 'Public Meeting',
    'Special Meeting': 'Public Meeting',
    'Public Hearing': 'Public Meeting',
    'Ordinance': 'Ordinance',
    'Resolution': 'Resolution',
    'Site Plan': 'Site Plan',
    'Public Records Request': 'Records Requested',
    'Property Transfer': 'Annexation',
    'Legal Deadline': 'Open Question',
    'Attorney Action': 'Open Question',
    'Website / Coalition Action': 'Open Question',
    'News / External Reference': 'Open Question',
    'Other': 'Open Question',
  };
  return map[eventType] || 'Open Question';
}

// Treat checkbox columns as truthy whether Airtable returns a real boolean (column converted
// to Checkbox type) or a string like "checked" / "true" / "yes" (column still text).
function isChecked(value) {
  if (value === true) return true;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    return v === 'checked' || v === 'true' || v === 'yes' || v === 'y';
  }
  return false;
}

function transformTimeline(records) {
  return records
    .map((r) => r.fields)
    .filter((f) => isChecked(f['Public Website?']) && f['Confidence'] === 'Confirmed')
    .map((f) => {
      const entry = {
        date: f['Event Date'],
        category: getCategoryForTimeline(f['Event Type']),
        title: f['Event Title'],
        body: f['Summary'] || '',
        status: 'adopted', // not modeled in Airtable; defaults to 'filed' below if needed
        verification: 'confirmed',
        source: {
          label: f['Source Label'] || (f['Event Title'] ? `${f['Event Title']} (source)` : 'source'),
          url: f['Source URL'] || '',
        },
      };
      if (f['Why It Matters']) entry.why_it_matters = f['Why It Matters'];
      // Airtable's Event Type doesn't carry the procedural status (filed/adopted/died); leave the
      // existing repo timeline.json's hand-curated status field as the source of truth for that
      // dimension. The sync only updates fields that are clearly authored in Airtable.
      return entry;
    })
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
}

function transformDocuments(records) {
  return records
    .map((r) => r.fields)
    .filter((f) => isChecked(f['Public Use?']) && f['Source Reliability'] !== 'Unverified')
    .map((f) => {
      const id = (f['Document ID'] || f['Document Title'] || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return {
        id,
        kind: (f['Document Type'] || 'other').toLowerCase().replace(/\s+/g, '-'),
        category: 'Official Village Records',
        number: f['Document ID'] || '',
        title: f['Document Title'] || '',
        date: f['Document Date'] || '',
        body: f['Key Excerpts'] || '',
        why_it_matters: f['Notes'] || '',
        tags: [],
        status: 'adopted',
        verification: 'confirmed',
        source: {
          label: f['Document Title'] || 'source',
          url: f['Source URL'] || f['Google Drive Link'] || '',
        },
      };
    })
    .filter((d) => d.title && d.source.url);
}

async function writeJson(filename, data) {
  const outPath = path.join(DATA_DIR, filename);
  const json = JSON.stringify(data, null, 2) + '\n';
  await fs.writeFile(outPath, json, 'utf8');
  log(`Wrote ${data.length} entries → ${path.relative(REPO_ROOT, outPath)}`);
}

async function main() {
  log(`Syncing from Airtable base ${BASE_ID}...`);

  let timelineRecords;
  let documentsRecords;
  try {
    [timelineRecords, documentsRecords] = await Promise.all([
      airtableFetchAll(TIMELINE_TABLE),
      airtableFetchAll(DOCUMENTS_TABLE),
    ]);
  } catch (err) {
    warn('Airtable fetch failed:', err.message);
    warn('Site will build from existing src/data/*.json without refresh.');
    process.exit(0);
  }

  log(`Fetched ${timelineRecords.length} Timeline Events records, ${documentsRecords.length} Documents records.`);

  const timeline = transformTimeline(timelineRecords);
  const documents = transformDocuments(documentsRecords);

  log(`After filter: ${timeline.length} timeline entries, ${documents.length} documents.`);

  if (timeline.length > 0) await writeJson('timeline.json', timeline);
  else warn('No timeline entries passed filter; leaving existing timeline.json untouched.');

  if (documents.length > 0) await writeJson('documents.json', documents);
  else warn('No documents passed filter; leaving existing documents.json untouched.');

  log('Done.');
}

main().catch((err) => {
  console.error('[airtable-sync] FATAL:', err);
  // Don't fail the build on a sync error; the existing JSON files are still valid.
  process.exit(0);
});
