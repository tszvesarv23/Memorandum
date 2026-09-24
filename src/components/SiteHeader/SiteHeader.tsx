import Link from "next/link";
import { cookies } from "next/headers";
import { mainNav, siteConfig } from "@/config/site";
import { parseTheme } from "@/lib/theme";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./SiteHeader.module.css";

/**
 * Cabecera corporativa de una sola línea:
 * marca a la izquierda, navegación central, acciones a la derecha.
 */
export async function SiteHeader() {
  const cookieJar = await cookies();
  const initialTheme = parseTheme(cookieJar.get("memorandum_theme")?.value);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          {siteConfig.name}
        </Link>

        <nav aria-label="Secciones" className={styles.nav}>
          <ul className={styles.navList} role="list">
            {mainNav.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SearchBox />
          <Link href="/buzon" className={styles.buzonLink}>
            Buzón
          </Link>
          <ThemeToggle initialTheme={initialTheme} />
        </div>
      </div>
    </header>
  );
}
