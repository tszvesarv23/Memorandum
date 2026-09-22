import Link from "next/link";
import { Badge } from "@/components/Badge/Badge";
import { DateDisplay } from "@/components/DateDisplay/DateDisplay";
import type { ArticleCardData } from "@/types/editorial";
import styles from "./ArticleHero.module.css";

interface ArticleHeroProps {
  article: ArticleCardData;
}

/**
 * Noticia principal de portada — tratamiento editorial premium:
 * titular de gran formato, entradilla, imagen dominante.
 */
export function ArticleHero({ article }: ArticleHeroProps) {
  const href = `/${article.category.slug}/${article.slug}`;

  return (
    <article className={styles.hero}>
      <div className={styles.text}>
        <div className={styles.meta}>
          <Badge type={article.type} />
          <span className={styles.category}>{article.category.name}</span>
        </div>
        <h1 className={styles.title}>
          <Link href={href} className={styles.stretched}>
            {article.title}
          </Link>
        </h1>
        {article.lede && <p className={styles.lede}>{article.lede}</p>}
        <div className={styles.footer}>
          {article.author && (
            <span className={styles.author}>
              Por <strong>{article.author.name}</strong>
            </span>
          )}
          <DateDisplay iso={article.publishedAt} />
          {article.isDemo && (
            <span className={styles.demo}>Contenido de demostración</span>
          )}
        </div>
      </div>
      {article.cover && (
        <div className={styles.figure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover.src}
            alt={article.cover.alt}
            className={styles.image}
            fetchPriority="high"
            decoding="async"
          />
          {(article.cover.caption ?? article.cover.credit) && (
            <figcaption className={styles.caption}>
              {article.cover.caption}
              {article.cover.credit && (
                <span className={styles.credit}> · {article.cover.credit}</span>
              )}
            </figcaption>
          )}
        </div>
      )}
    </article>
  );
}
