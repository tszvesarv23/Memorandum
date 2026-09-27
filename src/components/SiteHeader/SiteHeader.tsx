import Link from "next/link";
import { cookies } from "next/headers";
import { mainNav } from "@/config/site";
import { parseTheme } from "@/lib/theme";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./SiteHeader.module.css";

/**
 * Cabecera corporativa de una sola línea:
 * logo a la izquierda, navegación horizontal central, acciones a la derecha.
 * El logo cambia según el tema (claro / oscuro).
 */
export async function SiteHeader() {
  const cookieJar = await cookies();
  const theme = parseTheme(cookieJar.get("memorandum_theme")?.value);

  const logoSrc =
    theme === "dark"
      ? "/logos/logo%20modo%20oscuro.png"
      : "/logos/logo%20modo%20claro.png";

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="Memorandum">
            <img
              src={logoSrc}
              alt="Memorandum"
              width={135}
              height={48}
              className={styles.logo}
              fetchPriority="high"
            />
          </Link>

          <nav aria-label="Secciones" className={styles.nav}>
            <div className={styles.navTrack}>
              <ul className={styles.navList} role="list">
                {mainNav.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className={styles.navList} role="list" aria-hidden="true">
                {mainNav.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.href} className={styles.navLink} tabIndex={-1}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className={styles.actions}>
            <SearchBox />
            <Link href="/buzon" className={styles.buzonLink}>
              Buzón
            </Link>
            <ThemeToggle initialTheme={theme} />
          </div>
        </div>
      </div>
      <div className={styles.blueStripe} aria-hidden="true" />
    </header>
  );
}
