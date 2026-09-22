import { articleTypeLabels } from "@/config/site";
import type { ArticleTypeLabel } from "@/types/editorial";
import styles from "./Badge.module.css";

interface BadgeProps {
  type: ArticleTypeLabel;
}

/**
 * Distintivo de tipo editorial.
 * La opinión siempre se etiqueta visualmente como tal.
 */
export function Badge({ type }: BadgeProps) {
  const variant =
    type === "OPINION"
      ? styles.opinion
      : type === "ANALYSIS"
        ? styles.analysis
        : type === "INVESTIGATION"
          ? styles.investigation
          : type === "HISTORICAL" || type === "TIMELINE"
            ? styles.historical
            : type === "CITIZEN"
              ? styles.citizen
              : styles.news;

  return (
    <span className={`${styles.badge} ${variant}`}>
      {articleTypeLabels[type] ?? type}
    </span>
  );
}
