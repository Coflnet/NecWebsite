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

const guidePages = import.meta.glob('/src/pages/guides/*.astro');

function slugOf(path: string): string {
  return path.split('/').pop()!.replace(/\.astro$/, '');
}

/** Number of individual money-making / update / trend guides (excludes month archives). */
export const guideCount = Object.keys(guidePages).filter((path) => {
  const slug = slugOf(path);
  return slug !== 'index' && !MONTH_ARCHIVES.has(slug);
}).length;
