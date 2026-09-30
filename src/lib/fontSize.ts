export type FontSize = "p" | "m" | "g";

export const FONT_SIZE_COOKIE = "memorandum_font_size";
export const DEFAULT_FONT_SIZE: FontSize = "m";

export function isFontSize(value: string | undefined): value is FontSize {
  return value === "p" || value === "m" || value === "g";
}

export function parseFontSize(value: string | undefined): FontSize {
  return isFontSize(value) ? value : DEFAULT_FONT_SIZE;
}
