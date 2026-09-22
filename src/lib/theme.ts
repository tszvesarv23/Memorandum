export type Theme = "light" | "dark";

export const THEME_COOKIE = "memorandum_theme";
export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Script para inyectar en el <head> y resolver el tema antes del primer paint.
 * Lee la cookie; si no existe, consulta prefers-color-scheme y la guarda.
 */
export function themeInitScript(): string {
  return `
    (function(){
      try {
        const match = document.cookie.match(/(?:^|;)\\s*${THEME_COOKIE}\\s*=\\s*([^;]+)/);
        let theme = match ? match[1] : "";
        if (theme !== "light" && theme !== "dark") {
          theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
          document.cookie = "${THEME_COOKIE}=" + theme + ";path=/;expires=" + expires + ";SameSite=Lax";
        }
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })();
  `;
}

export function parseTheme(value: string | undefined): Theme {
  return isTheme(value) ? value : DEFAULT_THEME;
}
