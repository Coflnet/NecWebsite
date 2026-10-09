import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import {
  findGuideFeaturedImageProblems,
  formatFailureReport,
} from './verify-guide-featured-images.mjs';

const COMPLETE_IMAGE = { src: '/static/guides/complete.webp', alt: 'A miner', width: 32, height: 18 };

async function createFixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'guide-featured-images-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const fixture = {
    guideDirectory: path.join(root, 'guides'),
    imageDirectory: path.join(root, 'images'),
  };
  await mkdir(fixture.guideDirectory);
  await mkdir(fixture.imageDirectory);
  return fixture;
}

function featuredImageLines(featuredImage) {
  if (!featuredImage || Array.isArray(featuredImage)) {
    return featuredImage ?? [];
  }
  return ['featuredImage:', ...Object.entries(featuredImage).map(([key, value]) => `  ${key}: ${value}`)];
}

// `featuredImage` is an object written as a block mapping, or raw YAML lines.
async function writeGuide({ guideDirectory }, slug, featuredImage) {
  const imageLines = featuredImageLines(featuredImage);
  const source = ['---', `title: "${slug}"`, ...imageLines, 'tools: []', '---', '', 'Body.', ''].join('\n');
  await writeFile(path.join(guideDirectory, `${slug}.mdx`), source);
}

async function writeImage({ imageDirectory }, fileName, width, height) {
  await sharp({ create: { width, height, channels: 3, background: '#123456' } })
    .webp()
    .toFile(path.join(imageDirectory, fileName));
}

test('a guide without featuredImage that is not on the allowlist fails', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'new-guide');

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: [] });

  assert.deepEqual(failures, ['new-guide: featuredImage is missing']);
  const report = formatFailureReport(failures);
  assert.match(report, /- new-guide: featuredImage is missing/);
  assert.match(report, /`generate-post-images`, `ask-images`, and `npm run image:feature`[^\n]*$/);
});

test('a guide without featuredImage on the allowlist passes', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'old-guide');

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: ['old-guide'] });

  assert.deepEqual(failures, []);
});

test('a guide whose declared dimensions differ from the file fails', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'complete', COMPLETE_IMAGE);
  await writeImage(fixture, 'complete.webp', 40, 18);

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: [] });

  assert.deepEqual(failures, [
    'complete: declared dimensions 32x18 do not match public/static/guides/complete.webp, which is 40x18',
  ]);
});

test('a guide whose image file is missing fails', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'complete', COMPLETE_IMAGE);

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: [] });

  assert.deepEqual(failures, [
    'complete: image file public/static/guides/complete.webp is missing or unreadable',
  ]);
});

test('a guide with an incomplete featuredImage names every missing field', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'partial', { src: COMPLETE_IMAGE.src, width: 32 });

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: [] });

  assert.deepEqual(failures, [
    'partial: featuredImage.alt is missing',
    'partial: featuredImage.height is missing',
  ]);
});

test('a complete guide passes', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'complete', COMPLETE_IMAGE);
  await writeImage(fixture, 'complete.webp', 32, 18);

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: [] });

  assert.deepEqual(failures, []);
});

test('a complete guide passes in any YAML form of the mapping', async (t) => {
  const fixture = await createFixture(t);
  await writeImage(fixture, 'complete.webp', 32, 18);
  await writeGuide(fixture, 'inline', [
    'featuredImage: { src: "/static/guides/complete.webp", alt: \'A miner\', width: 32, height: 18 }',
  ]);
  await writeGuide(fixture, 'commented', [
    'featuredImage: # Approved master',
    '    src: /static/guides/complete.webp # promoted',
    '    alt: >-',
    '      A miner',
    '    width: 32',
    '    height: 18',
  ]);

  const failures = await findGuideFeaturedImageProblems({ ...fixture, legacySlugs: [] });

  assert.deepEqual(failures, []);
});

test('an allowlisted slug that is no longer a guide fails', async (t) => {
  const fixture = await createFixture(t);
  await writeGuide(fixture, 'old-guide');

  const failures = await findGuideFeaturedImageProblems({
    ...fixture,
    legacySlugs: ['old-guide', 'deleted-guide'],
  });

  assert.deepEqual(failures, [
    'deleted-guide: is on the legacy allowlist but is not a guide, so remove it from the list',
  ]);
});

test('the repository guides and legacy allowlist pass', async () => {
  const failures = await findGuideFeaturedImageProblems({
    guideDirectory: new URL('../src/content/guides', import.meta.url).pathname,
    imageDirectory: new URL('../public/static/guides', import.meta.url).pathname,
  });

  assert.deepEqual(failures, []);
});
