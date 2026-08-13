import { type ComponentType, type LazyExoticComponent } from 'react';
/**
 * Canonical Gozion registry for the React Bits Backgrounds catalogue.
 *
 * Source inventory: DavidHDev/react-bits `src/constants/Categories.js`,
 * Backgrounds category at commit c7109dccb42e06592d1d9bc50bc87204697240e2.
 * Keep this file in React Bits catalogue order; the docs menu consumes this
 * registry rather than maintaining a second particle list.
 */
export type ParticleEngine = 'Canvas2D' | 'WebGL / GLSL' | 'Three.js' | 'React Three Fiber' | 'DOM / CSS' | 'Physics';
export type ParticleEffect = {
    id: string;
    name: string;
    slug: string;
    category: 'Backgrounds';
    description: string;
    engine: ParticleEngine;
    dependencies: string[];
    componentImport: () => Promise<{
        default: ComponentType<any>;
    }>;
    originalSourceUrl: string;
    status: 'integrated';
};
export declare const particleEffects: readonly ParticleEffect[];
export declare const getParticleEffect: (slug: string) => ParticleEffect | undefined;
/** Lazily loads a single effect so galleries never create every WebGL context. */
export declare const lazyParticleEffect: (effect: ParticleEffect) => LazyExoticComponent<ComponentType<any>>;
//# sourceMappingURL=registry.d.ts.map