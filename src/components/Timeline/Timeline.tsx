import type { TimelineEntryData } from "@/types/editorial";
import styles from "./Timeline.module.css";

interface TimelineProps {
  entries: TimelineEntryData[];
}

/**
 * Cronología visual vertical — línea editorial con hitos.
 */
export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className={styles.timeline} role="list">
      {entries.map((entry, i) => (
        <li key={`${entry.dateLabel}-${i}`} className={styles.entry}>
          <div className={styles.marker} aria-hidden="true" />
          <div className={styles.content}>
            <span className={styles.date}>{entry.dateLabel}</span>
            <h3 className={styles.title}>{entry.title}</h3>
            {entry.description && (
              <p className={styles.description}>{entry.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
