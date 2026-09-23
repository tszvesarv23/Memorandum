import Link from "next/link";
import { Badge } from "@/components/Badge/Badge";
import { DateDisplay } from "@/components/DateDisplay/DateDisplay";
import type { ArticleCardData } from "@/types/editorial";
import styles from "./ArticleHero.module.css";

interface ArticleHeroProps {
  article: ArticleCardData;
}

/**
 * Bloque de texto del artículo principal de portada.
 * La imagen dominante se renderiza fuera, a ancho completo.
 */
export function ArticleHero({ article }: ArticleHeroProps) {
  const href = `/${article.category.slug}/${article.slug}`;

  return (
    <article className={styles.hero}>
      <header className={styles.heroHeader}>
        <span className={styles.category}>{article.category.name}</span>
        <DateDisplay iso={article.publishedAt} />
      </header>

      <p className={styles.kicker}>
        <Badge type={article.type} />
      </p>

      <h1 className={styles.title}>
        <Link href={href} className={styles.stretched}>
          {article.title}
        </Link>
      </h1>

      {article.lede && <p className={styles.lede}>{article.lede}</p>}

      <footer className={styles.footer}>
        {article.author && (
          <span className={styles.author}>
            Por <strong>{article.author.name}</strong>
          </span>
        )}
      </footer>
    </article>
  );
}
