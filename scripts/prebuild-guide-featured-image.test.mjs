import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url));
const PREBUILD_INPUTS = ['package.json', 'scripts', 'src/content/guides', 'public/static/guides'];

// Copies what `prebuild` reads into a throwaway checkout so a guide can be added to it.
async function createCheckout(t) {
  const checkout = await mkdtemp(path.join(tmpdir(), 'prebuild-checkout-'));
  t.after(() => rm(checkout, { recursive: true, force: true }));
  for (const input of PREBUILD_INPUTS) {
    await cp(path.join(repositoryRoot, input), path.join(checkout, input), { recursive: true });
  }
  await symlink(path.join(repositoryRoot, 'node_modules'), path.join(checkout, 'node_modules'), 'dir');
  return checkout;
}

function runPrebuild(checkout) {
  return spawnSync('npm', ['run', 'prebuild'], { cwd: checkout, encoding: 'utf8' });
}

test('prebuild passes on the repository and rejects a new guide without a feature image', async (t) => {
  const checkout = await createCheckout(t);
  assert.equal(runPrebuild(checkout).status, 0);

  await writeFile(
    path.join(checkout, 'src', 'content', 'guides', 'guide-without-artwork.mdx'),
    ['---', 'title: "Guide without artwork"', '---', '', 'Body.', ''].join('\n'),
  );
  const prebuild = runPrebuild(checkout);

  assert.notEqual(prebuild.status, 0);
  assert.match(prebuild.stderr, /- guide-without-artwork: featuredImage is missing/);
  assert.match(prebuild.stderr, /`generate-post-images`, `ask-images`, and `npm run image:feature`/);
});
