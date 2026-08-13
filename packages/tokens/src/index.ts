export type ThemeName = "default" | "light" | "dark" | "glass" | "high-contrast";

export const tokenNames = [
  "color-primary", "color-secondary", "color-danger", "foreground", "background", "surface",
  "border-color", "border-width", "radius", "font-family", "font-size", "line-height",
  "space", "opacity", "shadow", "blur", "backdrop-blur", "blend-mode", "z-index",
  "duration", "easing", "focus-ring", "breakpoint"
] as const;

export const themes: Record<ThemeName, Record<string, string>> = {
  default: { primary: "#6366f1", secondary: "#0f766e", danger: "#dc2626", foreground: "#172033", background: "#f6f7fb", surface: "#ffffff", "surface-muted": "#eef1f8", "border-color": "#dce1ec", "focus-ring": "#6366f1", shadow: "0 10px 30px rgb(23 32 51 / .10)" },
  light: { primary: "#2563eb", secondary: "#7c3aed", danger: "#dc2626", foreground: "#172033", background: "#ffffff", surface: "#ffffff", "surface-muted": "#f4f5f7", "border-color": "#d7dce5", "focus-ring": "#2563eb", shadow: "0 8px 24px rgb(15 23 42 / .08)" },
  dark: { primary: "#a5b4fc", secondary: "#5eead4", danger: "#fca5a5", foreground: "#f8fafc", background: "#10131c", surface: "#191e2b", "surface-muted": "#252c3b", "border-color": "#394254", "focus-ring": "#a5b4fc", shadow: "0 16px 40px rgb(0 0 0 / .35)" },
  glass: { primary: "#c4b5fd", secondary: "#67e8f9", danger: "#fda4af", foreground: "#f8fafc", background: "#111827", surface: "rgb(255 255 255 / .12)", "surface-muted": "rgb(255 255 255 / .08)", "border-color": "rgb(255 255 255 / .24)", "focus-ring": "#c4b5fd", shadow: "0 18px 48px rgb(0 0 0 / .3)" },
  "high-contrast": { primary: "#ffff00", secondary: "#00ffff", danger: "#ff5c5c", foreground: "#ffffff", background: "#000000", surface: "#000000", "surface-muted": "#161616", "border-color": "#ffffff", "focus-ring": "#ffff00", shadow: "none" }
};

export function themeVariables(theme: ThemeName = "default", overrides: Record<string, string> = {}) {
  const base = { ...themes[theme], ...overrides };
  return Object.fromEntries(Object.entries(base).map(([key, value]) => [`--ui-${key}`, value]));
}
