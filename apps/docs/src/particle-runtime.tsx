import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { getParticleEffect } from '@gozion-ui/react/particles';

type MountedPreview = { root: Root; cancelled: boolean };
const mounted = new WeakMap<HTMLElement, MountedPreview>();
const defaults: Record<string, Record<string, unknown>> = {
  // These two effects do not have useful visual defaults upstream: Grid
  // Distortion requires an image and Ballpit defaults every sphere to black.
  // Keep the documentation preview self-contained and visible.
  'grid-distortion': { grid: 18, mouse: 0.16, strength: 0.22, relaxation: 0.9 },
  ballpit: { count: 72, colors: [0x8b5cf6, 0x22d3ee, 0xf472b6, 0xfbbf24], ambientColor: 0xffffff, ambientIntensity: 1.35, lightIntensity: 240, gravity: 0.35, followCursor: true, minSize: 0.35, maxSize: 0.8 },
  'dot-field': { dotRadius: 1.7, dotSpacing: 14, cursorRadius: 500, cursorForce: 0.1, gradientFrom: '#d8c7ff', gradientTo: '#72e2d8', glowColor: '#0b0d18' },
  waves: { lineColor: '#e8ddff', backgroundColor: '#0b0d18', waveSpeedX: 0.012, waveAmpX: 32 },
  orb: { hue: 0, hoverIntensity: 0.35, rotateOnHover: true, backgroundColor: '#090c14' },
  dither: { waveColor: [0.34, 0.33, 0.9], waveSpeed: 0.05, waveFrequency: 3, waveAmplitude: 0.3, colorNum: 4, pixelSize: 2, enableMouseInteraction: true },
  aurora: { colorStops: ['#3A29FF', '#FF94B4', '#FF3232'], amplitude: 1, blend: 0.5, speed: 0.7 },
  threads: { color: [0.32, 0.28, 0.95], amplitude: 1, distance: 0, enableMouseInteraction: true },
  galaxy: { mouseRepulsion: true, mouseInteraction: true, density: 1.2, glowIntensity: 0.35 },
  particles: { particleColors: ['#ffffff', '#c6c1ff'], particleCount: 180, particleSpread: 10, speed: 0.12 }
};
function ParticleError({ name }: { name: string }) { return <div className="particle-runtime-error">{name} is unavailable in this browser.</div>; }
function mount(node: HTMLElement, slug: string, effectProps: Record<string, unknown> = {}) {
  mounted.get(node)?.root.unmount();
  const effect = getParticleEffect(slug);
  if (!effect) return () => {};
  const record: MountedPreview = { root: createRoot(node), cancelled: false };
  mounted.set(node, record);
  const heroProps = node.dataset.heroParticle === 'orb'
    ? { backgroundColor: document.documentElement.dataset.uiTheme === 'dark' ? '#090c14' : '#f6f1e8', hue: 18, hoverIntensity: 0.18 }
    : node.dataset.heroParticle === 'aurora'
      ? { colorStops: document.documentElement.dataset.uiTheme === 'dark' ? ['#241b55','#5d3d91','#1a7581'] : ['#e9ddff','#f0c8c2','#bce8df'], amplitude: 0.75, blend: 0.35 }
      : {};
  effect.componentImport().then(({ default: Component }) => {
    if (!record.cancelled) record.root.render(React.createElement(Component, { ...(defaults[slug] ?? {}), ...heroProps, ...effectProps }));
  }).catch(() => { if (!record.cancelled) record.root.render(<ParticleError name={effect.name} />); });
  return () => { record.cancelled = true; record.root.unmount(); mounted.delete(node); };
}
window.GozionParticleRuntime = { mount };
window.dispatchEvent(new Event('gozion-particle-runtime-ready'));
declare global { interface Window { GozionParticleRuntime?: { mount(node: HTMLElement, slug: string, effectProps?: Record<string, unknown>): () => void }; } }
