import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foxfirecoalition.org',
  integrations: [
    sitemap({
      // /brand is an internal reference page — exclude from public sitemap
      filter: (page) => !page.includes('/brand'),
    }),
  ],
});
