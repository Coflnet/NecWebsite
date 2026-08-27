import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);
const dockerfile = await readFile(
  new URL('../Dockerfile', import.meta.url),
  'utf8',
);

test('repository runtime declarations target Node.js 26', () => {
  assert.match(dockerfile, /^FROM node:26-alpine AS build$/m);
  assert.equal(packageJson.engines?.node, '>=26 <27');
  assert.equal(packageJson.packageManager, 'npm@11.5.2');
});
