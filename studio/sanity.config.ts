import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Read project values from env. The PUBLIC_ prefix lets Astro inline these at build time
// when the Studio is deployed in the same repo.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'Missing Sanity project ID. Set SANITY_STUDIO_PROJECT_ID in studio/.env (Studio) or PUBLIC_SANITY_PROJECT_ID in repo root .env.',
  );
}

export default defineConfig({
  name: 'foxfire-coalition',
  title: 'Foxfire Coalition Website',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
