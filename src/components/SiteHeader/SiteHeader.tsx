import Link from "next/link";
import { cookies } from "next/headers";
import { mainNav, socialLinks } from "@/config/site";
import { parseTheme } from "@/lib/theme";
import { parseFontSize } from "@/lib/fontSize";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { FontSizeSlider } from "@/components/FontSizeSlider/FontSizeSlider";
import { SearchToggle } from "./SearchToggle";
import styles from "./SiteHeader.module.css";

function XIcon({ className }: { className?: string | undefined }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string | undefined }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.228 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string | undefined }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string | undefined }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

const socialIconMap = {
  x: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

/**
 * Cabecera corporativa compacta:
 * - Fila superior: logo + eslogan y acciones.
 * - Franja azul: redes sociales, secciones en marquee, buscador e información.
 */
export async function SiteHeader() {
  const cookieJar = await cookies();
  const theme = parseTheme(cookieJar.get("memorandum_theme")?.value);
  const fontSize = parseFontSize(cookieJar.get("memorandum_font_size")?.value);

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
            <span className={styles.slogan}>
              España y el mundo, más allá de las fronteras
            </span>
          </Link>

          <div className={styles.topActions}>
            <FontSizeSlider initialFontSize={fontSize} />
            <ThemeToggle initialTheme={theme} />
          </div>
        </div>
      </div>

      <nav aria-label="Secciones y redes sociales" className={styles.blueStripe}>
        <div className="container">
          <div className={styles.barRow}>
            <ul className={styles.socialList} role="list" aria-label="Redes sociales">
              {socialLinks.map((item) => {
                const Icon = socialIconMap[item.icon];
                return (
                  <li key={item.slug}>
                    <a
                      href={item.href}
                      className={styles.socialLink}
                      aria-label={item.label}
                      title={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className={styles.socialIcon} />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className={styles.sections}>
              <div className={styles.sectionsTrack}>
                <ul className={styles.sectionsList} role="list">
                  {mainNav.map((item) => (
                    <li key={item.slug}>
                      <Link href={item.href} className={styles.sectionLink}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className={styles.sectionsList} role="list" aria-hidden="true">
                  {mainNav.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.href}
                        className={styles.sectionLink}
                        tabIndex={-1}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.barActions}>
              <SearchToggle />
              <Link
                href="/sobre"
                className={styles.iconButton}
                aria-label="Sobre el proyecto"
                title="Sobre el proyecto"
              >
                <InfoIcon className={styles.iconButtonIcon} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
