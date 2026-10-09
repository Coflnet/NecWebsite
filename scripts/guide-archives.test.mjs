import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('October archive registers the 0.27.2 post without counting as a guide', () => {
  const archive = read('src/pages/guides/october-2026.astro');
  assert.ok(archive.includes('/guides/hypixel-skyblock-0-27-2-update'));
  assert.ok(archive.includes('/guides/september-2026'));

  const index = read('src/pages/guides/index.astro');
  assert.match(index, /class="pill" href="\/guides\/october-2026"/);
  assert.match(index, /class="timeline-item"><strong><a href="\/guides\/october-2026"/);
  assert.ok(read('public/sitemap.xml').includes('<loc>https://notenoughcoins.net/guides/october-2026</loc>'));

  const library = read('src/lib/guides.ts');
  const archives = library.match(/const MONTH_ARCHIVES = new Set\(\[([\s\S]*?)\]\)/)?.[1];
  assert.ok(archives?.includes("'october-2026'"), 'October must be excluded from the guide count');
  assert.ok(library.includes('!MONTH_ARCHIVES.has(slug)'));
});
