// @ts-expect-error Vitest provides the Node runtime; the docs package stays browser-only.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../docs.js', import.meta.url), 'utf8');
const tokenStyles = readFileSync(new URL('../../../packages/styles/src/tokens.css', import.meta.url), 'utf8');
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

  it('ships light, dark, and a distinct warm system palette', () => {
    expect(tokenStyles).toContain('[data-ui-theme="light"]');
    expect(tokenStyles).toContain('[data-ui-theme="dark"]');
    expect(tokenStyles).toContain('[data-ui-theme="system"]');
    expect(tokenStyles).toContain('--ui-background:#f5efe5');
  });
});
