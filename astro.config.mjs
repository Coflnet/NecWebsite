// @ts-check
import { defineConfig } from 'astro/config';

// build.format: 'file' emits `foo.astro` -> `dist/foo.html` and
// `guides/foo.astro` -> `dist/guides/foo.html`, matching the exact file layout
// the current nginx `try_files $uri.html $uri/index.html` config serves. This
// keeps every published URL identical after the migration.
export default defineConfig({
  site: 'https://notenoughcoins.net',
  build: {
    format: 'file',
    // Keep human-readable, diff-friendly HTML output (no whitespace minify) so
    // the migrated pages stay close to the hand-written originals.
    inlineStylesheets: 'never',
  },
  trailingSlash: 'never',
});
