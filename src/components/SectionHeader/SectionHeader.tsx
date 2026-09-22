import Link from "next/link";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

/**
 * Cabecera de sección de portada: filete grueso + título + enlace.
 */
export function SectionHeader({ title, href, linkLabel = "Ver todo" }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {href && (
        <Link href={href} className={styles.link}>
          {linkLabel}
          <span aria-hidden="true"> →</span>
        </Link>
      )}
    </div>
  );
}
