import { build } from 'esbuild';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(docsRoot, '..', '..');
const dist = join(docsRoot, 'dist');

function runNode(script, ...args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: docsRoot, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolveRun() : reject(new Error(`${basename(script)} failed with exit code ${code}`)));
  });
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  }));
  return nested.flat();
}

async function assertExists(file, label) {
  try {
    if (!(await stat(file)).isFile()) throw new Error('not a file');
  } catch {
    throw new Error(`Static build is missing ${label}: ${file}`);
  }
}

function localReferences(source) {
  return [...source.matchAll(/(?:src|href)=["'](\.\/[^"'#?]+)|(?:from\s*|import\s*)\(?["'](\.\/[^"')?]+)/g)]
    .map(match => match[1] ?? match[2])
    .filter(Boolean);
}

async function verifyArtifact() {
  const index = await readFile(join(dist, 'index.html'), 'utf8');
  const allFiles = await filesIn(dist);
  const textFiles = allFiles.filter(file => ['.html', '.js', '.css'].includes(extname(file)));

  for (const file of textFiles) {
    const content = file.endsWith('.html') ? index : await readFile(file, 'utf8');
    for (const reference of localReferences(content)) {
      if (!file.endsWith('.html') && !/\.(?:js|css)$/i.test(reference)) continue;
      await assertExists(resolve(dirname(file), reference), `${reference} referenced by ${file}`);
    }
  }

  const forbidden = allFiles.filter(file => /\.(?:map|d\.ts|ts|tsx|test\.js)$/i.test(file));
  if (forbidden.length) throw new Error(`Static artifact includes source-only files: ${forbidden.join(', ')}`);
}

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });

await runNode(join(docsRoot, 'scripts/generate-particle-registry.mjs'));
await runNode(join(docsRoot, 'scripts/build-particle-runtime.mjs'), dist);

await build({
  entryPoints: [join(repoRoot, 'packages/styles/src/index.css')],
  outfile: join(dist, 'styles.css'),
  bundle: true,
  minify: true,
  logLevel: 'silent'
});

const index = (await readFile(join(docsRoot, 'index.html'), 'utf8'))
  .replace('./src/assets/gozion-favicon.png', './assets/gozion-favicon.png')
  .replace('./src/assets/gozion-mark.png', './assets/gozion-mark.png')
  .replace('../../packages/styles/src/index.css', './styles.css');
const docsJs = (await readFile(join(docsRoot, 'docs.js'), 'utf8'))
  .replaceAll('./src/assets/gozion-mark.png', './assets/gozion-mark.png');

await Promise.all([
  writeFile(join(dist, 'index.html'), index),
  writeFile(join(dist, 'docs.js'), docsJs),
  cp(join(docsRoot, 'docs.css'), join(dist, 'docs.css')),
  cp(join(docsRoot, 'previews.css'), join(dist, 'previews.css')),
  cp(join(docsRoot, 'preview-fixes.css'), join(dist, 'preview-fixes.css')),
  cp(join(docsRoot, 'particle-effects.js'), join(dist, 'particle-effects.js')),
  cp(join(docsRoot, 'src/assets/gozion-mark.png'), join(dist, 'assets/gozion-mark.png')),
  cp(join(docsRoot, 'src/assets/gozion-favicon.png'), join(dist, 'assets/gozion-favicon.png')),
  writeFile(join(dist, '_redirects'), '/* /index.html 200\\n')
]);

await verifyArtifact();
console.log(`Static documentation built in ${dist}`);
