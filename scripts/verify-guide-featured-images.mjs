import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { load } from 'js-yaml';
import sharp from 'sharp';
import { LEGACY_GUIDES_WITHOUT_FEATURED_IMAGE } from './legacy-guides-without-featured-image.mjs';

const REQUIRED_FIELDS = ['src', 'alt', 'width', 'height'];
const IMAGE_URL_PREFIX = '/static/guides/';
const DERIVATIVE_PATTERN = /-(?:640|960|1280)\.webp$/;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');

// Reads `featuredImage` from a guide's YAML frontmatter with the parser Astro
// uses. Returns undefined when the key is absent or empty.
function parseFeaturedImage(source) {
  const frontmatter = load(source.match(FRONTMATTER_PATTERN)?.[1] ?? '');
  return frontmatter?.featuredImage ?? undefined;
}

async function listGuideSlugs(guideDirectory) {
  const entries = await readdir(guideDirectory, { recursive: true });
  return entries
    .filter((entry) => entry.endsWith('.mdx'))
    .map((entry) => entry.slice(0, -'.mdx'.length).split(path.sep).join('/'))
    .sort();
}

function describeFieldProblems(featuredImage) {
  const problems = [];
  for (const field of REQUIRED_FIELDS) {
    const value = featuredImage[field];
    const isDimension = field === 'width' || field === 'height';
    if (value === undefined || value === null || value === '') {
      problems.push(`featuredImage.${field} is missing`);
    } else if (isDimension && !(Number.isInteger(value) && value > 0)) {
      problems.push(`featuredImage.${field} must be a positive integer`);
    } else if (!isDimension && typeof value !== 'string') {
      problems.push(`featuredImage.${field} must be text`);
    }
  }
  return problems;
}

async function describeFileProblems(featuredImage, imageDirectory) {
  const { src } = featuredImage;
  const fileName = src.slice(IMAGE_URL_PREFIX.length);
  if (!src.startsWith(IMAGE_URL_PREFIX) || fileName.includes('/') || DERIVATIVE_PATTERN.test(fileName)) {
    return [`featuredImage.src ${src} is not a master file under public${IMAGE_URL_PREFIX}`];
  }

  let metadata;
  try {
    metadata = await sharp(path.join(imageDirectory, fileName)).metadata();
  } catch {
    return [`image file public${src} is missing or unreadable`];
  }

  const declared = `${featuredImage.width}x${featuredImage.height}`;
  const actual = `${metadata.width}x${metadata.height}`;
  return declared === actual
    ? []
    : [`declared dimensions ${declared} do not match public${src}, which is ${actual}`];
}

async function describeGuideProblems(source, isLegacy, imageDirectory) {
  const featuredImage = parseFeaturedImage(source);
  if (featuredImage === undefined) {
    return isLegacy ? [] : ['featuredImage is missing'];
  }

  const problems = isLegacy
    ? ['has a featuredImage, so remove it from the legacy allowlist']
    : [];
  const fieldProblems = describeFieldProblems(featuredImage);
  if (fieldProblems.length > 0) {
    return [...problems, ...fieldProblems];
  }
  return [...problems, ...(await describeFileProblems(featuredImage, imageDirectory))];
}

// Returns one `slug: problem` line per defect; an empty array means every guide passes.
export async function findGuideFeaturedImageProblems({
  guideDirectory,
  imageDirectory,
  legacySlugs = LEGACY_GUIDES_WITHOUT_FEATURED_IMAGE,
}) {
  const slugs = await listGuideSlugs(guideDirectory);
  const failures = legacySlugs
    .filter((slug) => !slugs.includes(slug))
    .map((slug) => `${slug}: is on the legacy allowlist but is not a guide, so remove it from the list`);

  for (const slug of slugs) {
    const source = await readFile(path.join(guideDirectory, `${slug}.mdx`), 'utf8');
    const problems = await describeGuideProblems(source, legacySlugs.includes(slug), imageDirectory);
    failures.push(...problems.map((problem) => `${slug}: ${problem}`));
  }
  return failures;
}

export function formatFailureReport(failures) {
  return [
    'Guide feature-image verification failed. Every guide must ship with a feature image:',
    ...failures.map((failure) => `- ${failure}`),
    '',
    'Run `generate-post-images`, `ask-images`, and `npm run image:feature` to create and promote the image, then add the `featuredImage` frontmatter.',
  ].join('\n');
}

async function main() {
  const failures = await findGuideFeaturedImageProblems({
    guideDirectory: path.join(repositoryRoot, 'src', 'content', 'guides'),
    imageDirectory: path.join(repositoryRoot, 'public', 'static', 'guides'),
  });

  if (failures.length > 0) {
    console.error(formatFailureReport(failures));
    process.exitCode = 1;
  } else {
    console.log('Verified the feature image of every guide outside the legacy allowlist.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
