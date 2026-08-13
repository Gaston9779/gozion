import { build } from 'esbuild';

const outdir = process.argv[2] ?? '.';

await build({
  entryPoints: ['src/particle-runtime.tsx'], outdir,
  absWorkingDir: new URL('..', import.meta.url).pathname,
  bundle: true, format: 'esm', splitting: true, platform: 'browser', target: ['es2020'],
  entryNames: 'particles-runtime', chunkNames: 'particle-chunk-[hash]', logLevel: 'info'
});
