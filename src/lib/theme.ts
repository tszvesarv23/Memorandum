export type Theme = "light" | "dark";

export const THEME_COOKIE = "memorandum_theme";
export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function parseTheme(value: string | undefined): Theme {
  return isTheme(value) ? value : DEFAULT_THEME;
}
