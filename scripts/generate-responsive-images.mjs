import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RESPONSIVE_WIDTHS = [640, 960, 1280];
const RESPONSIVE_QUALITY = 65;
const DERIVATIVE_PATTERN = /-(?:640|960|1280)\.webp$/;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const guideImageDirectory = path.join(repositoryRoot, 'public', 'static', 'guides');

const masterNames = (await readdir(guideImageDirectory))
  .filter((fileName) => fileName.endsWith('.webp') && !DERIVATIVE_PATTERN.test(fileName))
  .sort();

if (masterNames.length === 0) {
  throw new Error(`No guide WebP masters found in ${guideImageDirectory}`);
}

const startedAt = performance.now();
await Promise.all(
  masterNames.flatMap((masterName) => {
    const masterPath = path.join(guideImageDirectory, masterName);
    return RESPONSIVE_WIDTHS.map((width) => {
      const outputName = masterName.replace(/\.webp$/, `-${width}.webp`);
      return sharp(masterPath, { failOn: 'warning' })
        .resize({ width })
        .webp({
          quality: RESPONSIVE_QUALITY,
          effort: 6,
          smartSubsample: true,
        })
        .toFile(path.join(guideImageDirectory, outputName));
    });
  }),
);

const elapsedMilliseconds = Math.round(performance.now() - startedAt);
console.log(
  `Generated ${masterNames.length * RESPONSIVE_WIDTHS.length} responsive WebPs from ${masterNames.length} masters in ${elapsedMilliseconds} ms.`,
);
