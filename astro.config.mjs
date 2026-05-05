import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

// Allow `astro dev` and `astro build` to run before the env is wired by skipping the
// integration when the project ID is missing. Production deploys MUST set it.
const integrations = [
  sitemap({
    // /brand is an internal reference page — exclude from public sitemap
    filter: (page) => !page.includes('/brand'),
  }),
];

if (projectId) {
  integrations.push(
    sanity({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    }),
  );
} else {
  console.warn('[astro.config] PUBLIC_SANITY_PROJECT_ID not set; Sanity integration disabled.');
}

export default defineConfig({
  site: 'https://foxfirecoalition.org',
  integrations,
});
