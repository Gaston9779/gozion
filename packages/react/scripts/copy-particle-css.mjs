import { cp, mkdir, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const source = new URL('../src/particles/react-bits/', import.meta.url).pathname;
const destination = new URL('../dist/particles/react-bits/', import.meta.url).pathname;

async function copyCss(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await copyCss(path);
    if (entry.isFile() && path.endsWith('.css')) {
      const target = join(destination, relative(source, path));
      await mkdir(target.slice(0, target.lastIndexOf('/')), { recursive: true });
      await cp(path, target);
    }
  }
}

await copyCss(source);
