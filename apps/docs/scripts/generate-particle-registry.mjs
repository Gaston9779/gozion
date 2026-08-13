import { readFile, writeFile } from 'node:fs/promises';

const registry = await readFile(new URL('../../../packages/react/src/particles/registry.ts', import.meta.url), 'utf8');
const effects = [...registry.matchAll(/effect\('([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*\[([^\]]*)\]/g)].map(([, name, slug, description, engine, deps]) => ({
  name, slug, description, engine, dependencies: deps.match(/'([^']+)'/g)?.map(value => value.slice(1, -1)) ?? []
}));
if (effects.length !== 53) throw new Error(`Expected 53 upstream backgrounds, found ${effects.length}.`);
await writeFile(new URL('../particle-effects.js', import.meta.url), `// Generated from packages/react/src/particles/registry.ts. Do not edit manually.\nwindow.GOZION_PARTICLE_EFFECTS = ${JSON.stringify(effects, null, 2)};\n`);
