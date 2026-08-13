import { lazy } from 'react';
const source = (slug) => `https://reactbits.dev/backgrounds/${slug}`;
const effect = (name, slug, description, engine, dependencies, componentImport) => ({
    id: slug, name, slug, category: 'Backgrounds', description, engine, dependencies, componentImport, originalSourceUrl: source(slug), status: 'integrated'
});
export const particleEffects = [
    effect('Molten Metal', 'molten-metal', 'Caustic plasma filaments with white-hot molten cores.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/MoltenMetal/MoltenMetal')),
    effect('Gradient Waves', 'gradient-waves', 'Raymarched sine waves rolling toward a hazy horizon.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/GradientWaves/GradientWaves')),
    effect('Web Threads', 'web-threads', 'Glowing sine threads converging through a luminous web.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/WebThreads/WebThreads')),
    effect('Topography', 'topography', 'Living contour lines with elevation-tinted illumination.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Topography/Topography')),
    effect('Light Tunnel', 'light-tunnel', 'Radial fibre-optic tunnel with light pulses racing in depth.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/LightTunnel/LightTunnel')),
    effect('Sliced Waves', 'sliced-waves', 'Soft glowing bars rippling like a slatted equalizer.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/SlicedWaves/SlicedWaves')),
    effect('Acid Squares', 'acid-squares', 'Crystalline corridor of stacked squares receding into depth.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/AcidSquares/AcidSquares')),
    effect('Scanner', 'scanner', 'Calm oscilloscope interference bands that sweep across the surface.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Scanner/Scanner')),
    effect('Ferrofluid', 'ferrofluid', 'Magnetic liquid traced by glowing contour lines and cursor attraction.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Ferrofluid/Ferrofluid')),
    effect('Lightfall', 'lightfall', 'Colorful falling streaks entering a glowing tunnel.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Lightfall/Lightfall')),
    effect('Liquid Ether', 'liquid-ether', 'Interactive fluid distortion with configurable colors.', 'Three.js', ['three'], () => import('./react-bits/LiquidEther/LiquidEther')),
    effect('Prism', 'prism', 'Rotating spectral prism with configurable color and intensity.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Prism/Prism')),
    effect('Dark Veil', 'dark-veil', 'Subtle dark animated veil with post-processed depth.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/DarkVeil/DarkVeil')),
    effect('Light Pillar', 'light-pillar', 'Vertical pillar of light with layered glow.', 'Three.js', ['three'], () => import('./react-bits/LightPillar/LightPillar')),
    effect('Silk', 'silk', 'Smooth illuminated wave surface.', 'React Three Fiber', ['three', '@react-three/fiber'], () => import('./react-bits/Silk/Silk')),
    effect('Floating Lines', 'floating-lines', 'Three-dimensional floating lines reacting to pointer movement.', 'Three.js', ['three'], () => import('./react-bits/FloatingLines/FloatingLines')),
    effect('Side Rays', 'side-rays', 'Animated rays entering from the side.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/SideRays/SideRays')),
    effect('Light Rays', 'light-rays', 'Volumetric configurable beams.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/LightRays/LightRays')),
    effect('Pixel Blast', 'pixel-blast', 'Exploding pixel particles with optional liquid post-processing.', 'Three.js', ['three'], () => import('./react-bits/PixelBlast/PixelBlast')),
    effect('Color Bends', 'color-bends', 'Vibrant bands flowing through smooth color bends.', 'Three.js', ['three'], () => import('./react-bits/ColorBends/ColorBends')),
    effect('Evil Eye', 'evil-eye', 'Procedural iris, slit pupil and fiery outer glow.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/EvilEye/EvilEye')),
    effect('Line Waves', 'line-waves', 'Colorful animated line distortion.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/LineWaves/LineWaves')),
    effect('Radar', 'radar', 'Concentric rings, spokes and rotating radar beam.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Radar/Radar')),
    effect('Soft Aurora', 'soft-aurora', 'Perlin-noise aurora with cosine gradient palettes.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/SoftAurora/SoftAurora')),
    effect('Aurora', 'aurora', 'Flowing aurora gradient background.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Aurora/Aurora')),
    effect('Plasma', 'plasma', 'Organic plasma gradients with smooth turbulence.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Plasma/Plasma')),
    effect('Plasma Wave', 'plasma-wave', 'Raymarched dual-wave interference.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/PlasmaWave/PlasmaWave')),
    effect('Particles', 'particles', 'Configurable particle system.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Particles/Particles')),
    effect('Gradient Blinds', 'gradient-blinds', 'Layered gradient blinds with spotlight and noise.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/GradientBlinds/GradientBlinds')),
    effect('Grainient', 'grainient', 'Grainy gradient swirls with soft wave distortion.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Grainient/Grainient')),
    effect('Grid Scan', 'grid-scan', 'Interactive three-dimensional scanning grid room.', 'Three.js', ['three', 'face-api.js'], () => import('./react-bits/GridScan/GridScan').then(module => ({ default: module.GridScan }))),
    effect('Beams', 'beams', 'Crossing animated ribbons.', 'React Three Fiber', ['three', '@react-three/fiber', '@react-three/drei'], () => import('./react-bits/Beams/Beams')),
    effect('Pixel Snow', 'pixel-snow', 'Falling pixelated snow with configurable density and speed.', 'Canvas2D', [], () => import('./react-bits/PixelSnow/PixelSnow')),
    effect('Lightning', 'lightning', 'Procedural branching lightning with glow flicker.', 'Canvas2D', [], () => import('./react-bits/Lightning/Lightning')),
    effect('Prismatic Burst', 'prismatic-burst', 'Controllable burst of refracted light rays.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/PrismaticBurst/PrismaticBurst')),
    effect('Galaxy', 'galaxy', 'Parallax starfield with pointer interaction.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Galaxy/Galaxy')),
    effect('Dither', 'dither', 'Retro dithered wave shader with Bayer pixel structure and pointer influence.', 'React Three Fiber', ['three', '@react-three/fiber', '@react-three/postprocessing', 'postprocessing'], () => import('./react-bits/Dither/Dither')),
    effect('Faulty Terminal', 'faulty-terminal', 'CRT terminal grid with flicker, noise and dither.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/FaultyTerminal/FaultyTerminal')),
    effect('Ripple Grid', 'ripple-grid', 'Continuously rippling grid.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/RippleGrid/RippleGrid')),
    effect('Dot Field', 'dot-field', 'Interactive dot field with bulge, glow, sparkle and waves.', 'Canvas2D', [], () => import('./react-bits/DotField/DotField')),
    effect('Dot Grid', 'dot-grid', 'Animated dot grid with cursor interactions.', 'DOM / CSS', ['gsap'], () => import('./react-bits/DotGrid/DotGrid')),
    effect('Threads', 'threads', 'Fabric-like animated line motion.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Threads/Threads')),
    effect('Hyperspeed', 'hyperspeed', 'Click-and-hold hyperspace travel lines.', 'Three.js', ['three'], () => import('./react-bits/Hyperspeed/Hyperspeed')),
    effect('Iridescence', 'iridescence', 'Shifting iridescent wave shader.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Iridescence/Iridescence')),
    effect('Waves', 'waves', 'Layered animated line waves.', 'Canvas2D', [], () => import('./react-bits/Waves/Waves')),
    effect('Grid Distortion', 'grid-distortion', 'Cursor-reactive warped grid mesh.', 'Three.js', ['three'], () => import('./react-bits/GridDistortion/GridDistortion')),
    effect('Ballpit', 'ballpit', 'Physics ball pit of bouncing colourful spheres.', 'Physics', ['three', 'gsap'], () => import('./react-bits/Ballpit/Ballpit')),
    effect('Orb', 'orb', 'Floating energy orb with hover response.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Orb/Orb')),
    effect('Letter Glitch', 'letter-glitch', 'Matrix-style letter animation.', 'Canvas2D', [], () => import('./react-bits/LetterGlitch/LetterGlitch')),
    effect('Grid Motion', 'grid-motion', 'Perspective grid moving with cursor position.', 'DOM / CSS', ['gsap'], () => import('./react-bits/GridMotion/GridMotion')),
    effect('Shape Grid', 'shape-grid', 'Animated shape grid with directional variants.', 'Canvas2D', [], () => import('./react-bits/ShapeGrid/ShapeGrid')),
    effect('Liquid Chrome', 'liquid-chrome', 'Flowing metallic reflective liquid.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/LiquidChrome/LiquidChrome')),
    effect('Balatro', 'balatro', 'Interactive fully-customizable Balatro shader.', 'WebGL / GLSL', ['ogl'], () => import('./react-bits/Balatro/Balatro'))
];
export const getParticleEffect = (slug) => particleEffects.find(effect => effect.slug === slug);
/** Lazily loads a single effect so galleries never create every WebGL context. */
export const lazyParticleEffect = (effect) => lazy(effect.componentImport);
//# sourceMappingURL=registry.js.map