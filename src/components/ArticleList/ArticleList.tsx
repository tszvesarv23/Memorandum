import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import type { ArticleCardData } from "@/types/editorial";
import styles from "./ArticleList.module.css";

interface ArticleListProps {
  articles: ArticleCardData[];
  /** grid: tarjetas en columnas; stack: filas compactas */
  layout?: "grid" | "stack";
}

export function ArticleList({ articles, layout = "grid" }: ArticleListProps) {
  if (articles.length === 0) return null;

  if (layout === "stack") {
    return (
      <div className={styles.stack} role="list">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {articles.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  );
}
