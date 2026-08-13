import { describe, expect, it } from 'vitest';
import { getParticleEffect, particleEffects } from './registry.js';

describe('React Bits particle registry', () => {
  it('contains the complete upstream Backgrounds inventory', () => {
    expect(particleEffects).toHaveLength(53);
    expect(new Set(particleEffects.map(effect => effect.slug)).size).toBe(particleEffects.length);
  });

  it('retains Dither as a separately lazy-loaded shader effect', () => {
    const dither = getParticleEffect('dither');
    expect(dither?.engine).toBe('React Three Fiber');
    expect(dither?.dependencies).toContain('@react-three/postprocessing');
    expect(dither?.componentImport).toBeTypeOf('function');
  });
});
