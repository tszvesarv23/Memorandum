"use client";

import { useEffect, useState } from "react";
import { type Theme, THEME_COOKIE } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

const YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

function setThemeCookie(theme: Theme) {
  const expires = new Date(Date.now() + YEAR_IN_SECONDS * 1000).toUTCString();
  document.cookie = `${THEME_COOKIE}=${theme};path=/;expires=${expires};SameSite=Lax`;
}

export function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Sincroniza el DOM y la cookie con el tema actual (también en la carga inicial)
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setThemeCookie(theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const label = theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro";

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.toggle}
      aria-label={label}
      title={label}
    >
      <span className={styles.iconSun} aria-hidden="true" data-active={theme === "light"}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 1.5v2M12 20.5v2M4.22 4.22l1.41 1.41M18.36 18.36l1.42 1.42M1.5 12h2M20.5 12h2M4.22 19.78l1.41-1.41M18.36 5.64l1.42-1.42" />
        </svg>
      </span>
      <span className={styles.iconMoon} aria-hidden="true" data-active={theme === "dark"}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
