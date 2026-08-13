// @ts-expect-error Vitest provides the Node runtime; the docs package stays browser-only.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../docs.js', import.meta.url), 'utf8');
const indexSource = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const previewStyles = readFileSync(new URL('../preview-fixes.css', import.meta.url), 'utf8');
const tokenStyles = readFileSync(new URL('../../../packages/styles/src/tokens.css', import.meta.url), 'utf8');
const ballpitSource = readFileSync(new URL('../../../packages/react/src/particles/react-bits/Ballpit/Ballpit.tsx', import.meta.url), 'utf8');
const groupsSource = source.match(/const groups = \{([\s\S]*?)\n  \};/)?.[1] ?? '';
const catalogueNames = [...groupsSource.matchAll(/'([A-Z][A-Za-z]+)'/g)].map(match => match[1]);
const previewCases = new Set([...source.matchAll(/case '([A-Z][A-Za-z]+)'/g)].map(match => match[1]));

describe('documentation catalogue', () => {
  it('has a dedicated preview renderer for every listed component', () => {
    expect(catalogueNames.length).toBeGreaterThan(70);
    expect(catalogueNames.filter(name => !previewCases.has(name))).toEqual([]);
  });

  it('does not list components more than once', () => {
    expect(new Set(catalogueNames).size).toBe(catalogueNames.length);
  });

  it('keeps catalogue cards out of invalid nested anchor markup', () => {
    expect(source).toContain('<article class="component-card"');
    expect(source).not.toContain('<a class="component-card"');
  });

  it('provides documented disabled, color, and border controls', () => {
    expect(source).toContain('data-option="disabled"');
    expect(source).toContain('data-option="color"');
    expect(source).toContain('data-option="borderColor"');
    expect(source).toContain('data-option="borderWidth"');
  });

  it('keeps text fields scoped to the active preview and synchronizes generated code', () => {
    expect(source).toContain("$$('input[placeholder],textarea[placeholder]', stage)");
    expect(source).toContain('syncFrameworkCode(item)');
    expect(source).toContain('liveCodeExample(item, previewProps(item))');
    expect(source).not.toContain('data-option="children"');
  });

  it('gives Kbd shortcut-specific controls instead of visual token controls', () => {
    expect(source).toContain("item.name === 'Kbd'");
    expect(source).toContain('data-option="modifier"');
    expect(source).toContain('data-option="key3"');
  });

  it('documents Grid Motion composition controls and a self-contained Grid Distortion preview', () => {
    expect(source).toContain("'grid-motion': [{prop:'items'");
    expect(source).toContain("{prop:'rows'");
    expect(source).toContain("{prop:'columns'");
    expect(source).toContain('GridMotion\\n  items={[');
    expect(source).toContain('imageSrc quando vuoi sostituire il visual predefinito');
  });

  it('includes practical installation, props, and framework examples', () => {
    expect(source).toContain('pnpm add @gozion-ui/react @gozion-ui/styles');
    expect(source).toContain('from "@gozion-ui/vue"');
    expect(source).toContain('from "@gozion-ui/angular"');
    expect(source).toContain('Ogni controllo nell’anteprima aggiorna il codice copiabile');
  });

  it('keeps the documentation particle-first in navigation, catalogue, and home', () => {
    expect(source).toContain('side-collection side-collection-primary');
    expect(source).toContain('const orderedGroups = Object.entries(groups).sort');
    expect(source).toContain("const featuredParticles = ['Aurora','Orb','DotField','Waves','GridDistortion','Ballpit','GridMotion','LiquidChrome']");
    expect(source).toContain('particle-grid-featured');
    expect(source).toContain('home-components');
  });

  it('keeps Ballpit on Three’s supported physical material shader path', () => {
    expect(ballpitSource).toContain('new MeshPhysicalMaterial');
    expect(ballpitSource).not.toContain('RE_Direct_Scattering');
    expect(ballpitSource).not.toContain('onBeforeCompile = shader');
  });

  it('uses an Outfit Gozion wordmark instead of an image in the docs header', () => {
    expect(indexSource).toContain('family=Outfit');
    expect(indexSource).not.toContain('class="brand" href="#/getting-started" aria-label="Gozion UI"><img');
    expect(indexSource).toContain('class="brand" href="#/getting-started" aria-label="Gozion home">Gozion</a>');
    expect(previewStyles).toMatch(/font-family:\s*["']Outfit["']/);
    expect(previewStyles).toMatch(/letter-spacing:\s*normal/);
    expect(previewStyles).toMatch(/color:\s*#fff/);
  });

  it('ships light, dark, and a distinct warm system palette', () => {
    expect(tokenStyles).toContain('[data-ui-theme="light"]');
    expect(tokenStyles).toContain('[data-ui-theme="dark"]');
    expect(tokenStyles).toContain('[data-ui-theme="system"]');
    expect(tokenStyles).toContain('--ui-background:#f5efe5');
  });
});
