import { access, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MASTER_WIDTH = 1672;
const MASTER_HEIGHT = 941;
const MASTER_QUALITY = 75;
const MIN_SOURCE_WIDTH = 1280;
const MIN_SOURCE_HEIGHT = 720;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const defaultOutputDirectory = path.join(repositoryRoot, 'public', 'static', 'guides');

function printUsage() {
  console.error(
    [
      'Usage:',
      '  npm run image:feature -- <source-image> <article-slug> [--force]',
      '',
      'Example:',
      '  npm run image:feature -- /tmp/generated.png hypixel-skyblock-next-update',
      '',
      'The command writes the compressed 1672x941 WebP master.',
      'Responsive variants are generated automatically by the dev and production builds.',
      'Existing outputs are protected unless --force is supplied after visual approval.',
    ].join('\n'),
  );
}

function parseArguments(arguments_) {
  const positional = arguments_.filter((argument) => !argument.startsWith('--'));
  const force = arguments_.includes('--force');
  const unknownFlags = arguments_.filter(
    (argument) => argument.startsWith('--') && argument !== '--force',
  );

  if (unknownFlags.length > 0 || positional.length !== 2) {
    printUsage();
    process.exitCode = 1;
    return null;
  }

  const [sourceArgument, slug] = positional;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Invalid article slug "${slug}". Use lowercase letters, numbers, and single hyphens.`,
    );
  }

  return {
    force,
    slug,
    sourcePath: path.resolve(process.cwd(), sourceArgument),
  };
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimizeFeatureImage({ force, slug, sourcePath }) {
  if (!(await fileExists(sourcePath))) {
    throw new Error(`Source image does not exist: ${sourcePath}`);
  }

  const source = sharp(sourcePath, { failOn: 'warning' }).rotate();
  const metadata = await source.metadata();
  if (
    !metadata.width ||
    !metadata.height ||
    metadata.width < MIN_SOURCE_WIDTH ||
    metadata.height < MIN_SOURCE_HEIGHT
  ) {
    throw new Error(
      `Source must be at least ${MIN_SOURCE_WIDTH}x${MIN_SOURCE_HEIGHT}; received ${metadata.width ?? '?'}x${metadata.height ?? '?'}.`,
    );
  }

  await mkdir(defaultOutputDirectory, { recursive: true });
  const outputPath = path.join(defaultOutputDirectory, `${slug}.webp`);

  if ((await fileExists(outputPath)) && !force) {
    throw new Error(
      `Refusing to overwrite existing output:\n${outputPath}\nRerun with --force only after approving the replacement image.`,
    );
  }

  const normalized = source
    .clone()
    .resize(MASTER_WIDTH, MASTER_HEIGHT, {
      fit: 'cover',
      position: sharp.strategy.attention,
    })
    .flatten({ background: '#0a1023' });

  await normalized
    .webp({
      quality: MASTER_QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const sourceStats = await stat(sourcePath);
  const outputStats = await stat(outputPath);

  console.log(`Optimized ${path.basename(sourcePath)} (${sourceStats.size.toLocaleString()} bytes)`);
  console.table([
    {
      file: path.relative(repositoryRoot, outputPath),
      width: MASTER_WIDTH,
      bytes: outputStats.size,
    },
  ]);
}

const options = parseArguments(process.argv.slice(2));
if (options) {
  optimizeFeatureImage(options).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
