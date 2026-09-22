import Link from "next/link";
import { mainNav, siteConfig, utilityNav } from "@/config/site";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import styles from "./SiteHeader.module.css";

/**
 * Cabecera editorial: marca, fecha, navegación de secciones
 * y acceso al buzón. Server Component — sin JS de cliente.
 */
export function SiteHeader() {
  const today = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className={styles.header}>
      {/* Franja superior: fecha + enlaces de utilidad */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <time className={styles.date} dateTime={new Date().toISOString()}>
            {today}
          </time>
          <nav aria-label="Enlaces de utilidad" className={styles.utility}>
            {utilityNav.map((item) => (
              <Link key={item.slug} href={item.href} className={styles.utilityLink}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Marca */}
      <div className={`container ${styles.brandRow}`}>
        <Link href="/" className={styles.brand}>
          {siteConfig.name}
        </Link>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <SearchBox />
      </div>

      {/* Navegación de secciones */}
      <nav aria-label="Secciones" className={styles.navWrapper}>
        <div className={`container ${styles.navInner}`}>
          <ul className={styles.navList} role="list">
            {mainNav.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/buzon" className={styles.buzonLink}>
            Buzón confidencial
          </Link>
        </div>
      </nav>
    </header>
  );
}
