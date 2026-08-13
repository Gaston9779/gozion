import { build } from 'esbuild';

await build({
  entryPoints: ['src/particle-runtime.tsx'], outdir: '.',
  absWorkingDir: new URL('..', import.meta.url).pathname,
  bundle: true, format: 'esm', splitting: true, platform: 'browser', target: ['es2020'],
  entryNames: 'particles-runtime', chunkNames: 'particle-chunk-[hash]', logLevel: 'info'
});
