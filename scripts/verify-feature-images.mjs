import { open, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const guideImageDirectory = path.join(repositoryRoot, 'public', 'static', 'guides');

async function hasWebpSignature(filePath) {
  const file = await open(filePath, 'r');
  try {
    const signature = Buffer.alloc(12);
    const { bytesRead } = await file.read(signature, 0, signature.length, 0);
    return (
      bytesRead === signature.length &&
      signature.subarray(0, 4).toString('ascii') === 'RIFF' &&
      signature.subarray(8, 12).toString('ascii') === 'WEBP'
    );
  } finally {
    await file.close();
  }
}

const imageNames = (await readdir(guideImageDirectory))
  .filter((fileName) => fileName.endsWith('.webp'))
  .sort();

if (imageNames.length === 0) {
  throw new Error(`No guide WebP files found in ${guideImageDirectory}`);
}

const invalidImages = [];
for (const imageName of imageNames) {
  const imagePath = path.join(guideImageDirectory, imageName);
  if (!(await hasWebpSignature(imagePath))) {
    invalidImages.push(path.relative(repositoryRoot, imagePath));
  }
}

if (invalidImages.length > 0) {
  console.error(
    [
      'Feature-image verification failed. These files are not materialized WebP images:',
      ...invalidImages.map((fileName) => `- ${fileName}`),
      '',
      'Regenerate the master if necessary, then rerun `npm run build` to recreate responsive derivatives.',
    ].join('\n'),
  );
  process.exitCode = 1;
} else {
  console.log(`Verified ${imageNames.length} materialized guide WebP files.`);
}
