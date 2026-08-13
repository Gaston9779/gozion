# Gozion UI

Gozion UI is a production-oriented, token-first component system for React, Vue 3, and Angular. One CSS-variable design system powers every adapter, so themes and component behavior stay aligned across frameworks.

## Installation

```sh
pnpm add @gozion-ui/react @gozion-ui/styles
# or: @gozion-ui/vue / @gozion-ui/angular
```

## Usage

```tsx
import "@gozion-ui/styles";
import { Button, ThemeProvider } from "@gozion-ui/react";

<ThemeProvider theme="dark"><Button variant="primary" size="lg">Save</Button></ThemeProvider>
```

```vue
<script setup>import { Button } from "@gozion-ui/vue"; import "@gozion-ui/styles";</script>
<template><Button variant="primary" size="lg">Save</Button></template>
```

```ts
import "@gozion-ui/styles";
// Standalone Angular: imports: [ButtonComponent]
// <ui-button variant="primary" size="lg">Save</ui-button>
```

## Theming

Use `default`, `light`, `dark`, `glass`, or `high-contrast` with `data-ui-theme` or `ThemeProvider`. Every component accepts ordinary classes and inline styles. Use CSS custom properties for deep customization:

```css
.brand-card { --ui-background: #18243a; --ui-border-color: #4e77b8; --ui-radius: 1.25rem; --ui-component-shadow: 0 20px 50px #0005; }
```

Global tokens include colors, foreground/surface values, border, radius, type, spacing, opacity, shadows, blur, backdrop blur, blend mode, z-index, motion, easing, breakpoints and focus styling. Components expose local `--ui-background`, `--ui-border-color`, `--ui-radius`, and related override points.

## Accessibility

The library uses native semantic elements first, visible focus rings, disabled semantics, keyboard-ready controls, `dialog` for modal focus behavior, and reduced-motion CSS. Custom composite widgets should retain their documented ARIA roles and keyboard bindings.

## Component catalog

The catalog is organized into foundations/layout, typography, buttons, forms, selection, controls, content, navigation, overlays, feedback, data display, media, actions, utilities, and visual primitives. `@gozion-ui/core` exports the complete canonical catalog and shared variant/types; the initial adapters provide the high-use building blocks (theme, layout, button, input, card, alert, hoverable) as fully implemented components and establish the extension conventions for remaining catalog entries.

## Development, build, and release

`pnpm install`, then run `pnpm validate`. The workspace builds ESM declarations with TypeScript and tests core interactions with Vitest. CI validates each pull request and `main`. Releases should update package versions/changelogs, run `pnpm validate`, publish in dependency order (tokens/core/styles then adapters), and tag the resulting commit.

## Contributing

Keep framework APIs conceptually equivalent, add tokens instead of hardcoding visual values, test keyboard behavior for interactivity, and update the docs playground/demo when changing public behavior. Licensed under [MIT](LICENSE).
