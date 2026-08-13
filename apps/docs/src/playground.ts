import { themeVariables, themes, type ThemeName } from "@gozion-ui/tokens";
export const playgroundControls = ["primary","secondary","foreground","background","border-color","radius","shadow","backdrop-blur","opacity","font-family","space-4","transition-duration"] as const;
export function applyTheme(root: HTMLElement, theme: ThemeName, overrides: Record<string,string> = {}) { root.dataset.uiTheme = theme; for (const [key,value] of Object.entries(themeVariables(theme, overrides))) root.style.setProperty(key,value); }
export { themes };
