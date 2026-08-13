import { build } from 'esbuild';
import { spawn } from 'node:child_process';

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`)));
  });
}

const outdir = process.argv[2] ?? '.';

// The runtime bundles the public package entry points. Rebuild the package
// first so a direct docs build can never serve chunks compiled from stale dist.
await run('pnpm', ['--filter', '@gozion-ui/react', 'build']);

await build({
  entryPoints: ['src/particle-runtime.tsx'], outdir,
  absWorkingDir: new URL('..', import.meta.url).pathname,
  bundle: true, format: 'esm', splitting: true, platform: 'browser', target: ['es2020'],
  entryNames: 'particles-runtime', chunkNames: 'particle-chunk-[hash]', logLevel: 'info'
});
