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
    // Exclude internal/draft pages from the public sitemap. Drafts also carry
    // a `noindex,nofollow` robots meta, but keeping them out of the sitemap
    // is the cleaner signal to search engines.
    filter: (page) =>
      !page.includes('/brand') &&
      !page.includes('/updates/ordinance-2026-09-moratorium-passed'),
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
