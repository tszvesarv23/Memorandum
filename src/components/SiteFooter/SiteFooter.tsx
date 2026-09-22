import Link from "next/link";
import { mainNav, siteConfig, utilityNav } from "@/config/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <p className={styles.brand}>{siteConfig.name}</p>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <p className={styles.note}>
            Plataforma editorial independiente. La opinión se publica
            siempre etiquetada como tal; la información se apoya en
            fuentes documentadas.
          </p>
        </div>

        <nav aria-label="Secciones" className={styles.col}>
          <h2 className={styles.colTitle}>Secciones</h2>
          <ul role="list" className={styles.list}>
            {mainNav.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="El proyecto" className={styles.col}>
          <h2 className={styles.colTitle}>El proyecto</h2>
          <ul role="list" className={styles.list}>
            {utilityNav.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/legal" className={styles.link}>
                Aviso legal y privacidad
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Participa</h2>
          <p className={styles.note}>
            ¿Tienes información, fotografías o documentos que la
            redacción debería conocer?
          </p>
          <Link href="/buzon" className={styles.buzonCta}>
            Enviar al buzón confidencial
          </Link>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} {siteConfig.name}. Contenido de demostración.</p>
        <p className={styles.bottomNote}>
          {/* TODO(legal): revisar textos legales con abogado especializado antes de producción */}
          Sin trackers publicitarios · Sin Google Analytics
        </p>
      </div>
    </footer>
  );
}
