import { formatDate } from "@/lib/format";
import type { SourceRef } from "@/types/editorial";
import styles from "./SourceList.module.css";

interface SourceListProps {
  sources: SourceRef[];
}

/**
 * Sección "Fuentes" al pie del artículo.
 * Visualmente diferenciada del contenido editorial.
 */
export function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="fuentes-title">
      <h2 id="fuentes-title" className={styles.title}>
        Fuentes
      </h2>
      <ul className={styles.list} role="list">
        {sources.map((source, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.main}>
              {source.url ? (
                <a
                  href={source.url}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                </a>
              ) : (
                <span className={styles.sourceTitle}>{source.title}</span>
              )}
              {source.officialSource && (
                <span className={styles.official}>Fuente oficial</span>
              )}
            </div>
            <div className={styles.meta}>
              {source.publisher && <span>{source.publisher}</span>}
              {source.publicationDate && (
                <span>Publicado: {formatDate(source.publicationDate)}</span>
              )}
              {source.accessedAt && (
                <span>Consultado: {formatDate(source.accessedAt)}</span>
              )}
            </div>
            {source.notes && <p className={styles.notes}>{source.notes}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
