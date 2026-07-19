// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// build.format: 'file' emits `foo.astro` -> `dist/foo.html` and
// `guides/foo.astro` -> `dist/guides/foo.html`, matching the exact file layout
// the current nginx `try_files $uri.html $uri/index.html` config serves. This
// keeps every published URL identical after the migration.
//
// Individual guides now live as MDX in src/content/guides and are rendered by
// src/pages/guides/[slug].astro, so their bodies are readable/editable Markdown
// with rich-content components instead of one escaped HTML string per page.
export default defineConfig({
  site: 'https://notenoughcoins.net',
  integrations: [mdx()],
  build: {
    format: 'file',
    // Keep human-readable, diff-friendly HTML output (no whitespace minify) so
    // the migrated pages stay close to the hand-written originals.
    inlineStylesheets: 'never',
  },
  trailingSlash: 'never',
});
