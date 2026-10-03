// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Change this to your real domain before deploying (used for the sitemap, RSS and social previews).
const SITE = process.env.SITE_URL || 'https://mudasserhussain.dev';

export default defineConfig({
  site: SITE,
  integrations: [react(), mdx(), sitemap()],
  prefetch: { prefetchAll: true },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
});
