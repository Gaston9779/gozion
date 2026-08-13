import * as React from 'react';
import { lazyParticleEffect, type ParticleEffect } from './registry.js';

export type ParticlePreviewProps = {
  effect: ParticleEffect;
  /** Props are passed straight through to the original React Bits component. */
  effectProps?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
  minHeight?: number | string;
  /** Unmount offscreen effects to release RAF loops and WebGL contexts. */
  unmountWhenHidden?: boolean;
  fallback?: React.ReactNode;
};

/**
 * Gozion gallery host for React Bits backgrounds. It intentionally imports and
 * mounts only a visible effect; leaving the viewport unmounts it by default.
 */
export function ParticlePreview({
  effect, effectProps = {}, className, style, minHeight = 260,
  unmountWhenHidden = true, fallback = null
}: ParticlePreviewProps) {
  const host = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const Component = React.useMemo(() => lazyParticleEffect(effect), [effect]);

  React.useEffect(() => {
    const element = host.current;
    if (!element || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '180px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const shouldMount = visible || !unmountWhenHidden;
  return <div ref={host} className={className} style={{ position: 'relative', overflow: 'hidden', minHeight, ...style }} data-particle-effect={effect.slug}>
    {shouldMount && <React.Suspense fallback={fallback}><Component {...effectProps} /></React.Suspense>}
  </div>;
}
