// Single source of truth for "how many guides do we have?".
//
// The count is derived at build time from the actual guide pages on disk, so it
// can never drift from reality again: add or remove a page under
// src/pages/guides/ and every "N guides" mention across the site updates on the
// next build. Month-archive listing pages and the guides index itself are not
// individual guides, so they are excluded.
const MONTH_ARCHIVES = new Set([
  'december-2025',
  'january-2026',
  'february-2026',
  'march-2026',
  'april-2026',
  'may-2026',
  'june-2026',
  'july-2026',
]);

// Individual guides are MDX in src/content/guides; a handful of listing/legacy
// pages may still live as .astro under src/pages/guides during the migration.
// Count both, de-duplicated by slug, excluding month archives + the index.
const guidePages = {
  ...import.meta.glob('/src/content/guides/*.mdx'),
  ...import.meta.glob('/src/pages/guides/*.astro'),
};

function slugOf(path: string): string {
  return path.split('/').pop()!.replace(/\.(astro|mdx)$/, '');
}

/** Number of individual money-making / update / trend guides (excludes month archives). */
export const guideCount = new Set(
  Object.keys(guidePages)
    .map(slugOf)
    .filter((slug) => slug !== 'index' && !slug.includes('[') && !MONTH_ARCHIVES.has(slug)),
).size;
