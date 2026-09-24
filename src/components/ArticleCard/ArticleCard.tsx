import Link from "next/link";
import { Badge } from "@/components/Badge/Badge";
import { DateDisplay } from "@/components/DateDisplay/DateDisplay";
import type { ArticleCardData } from "@/types/editorial";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: ArticleCardData;
  /** headline: titular grande con entradilla; compact: fila de listado */
  variant?: "standard" | "headline" | "compact";
  showImage?: boolean;
}

function articleHref(article: ArticleCardData): string {
  return `/${article.category.slug}/${article.slug}`;
}

export function ArticleCard({
  article,
  variant = "standard",
  showImage = true,
}: ArticleCardProps) {
  const href = articleHref(article);

  if (variant === "compact") {
    const hasImage = showImage && article.cover;
    return (
      <article
        className={`${styles.compact} ${!hasImage ? styles.compactNoImage : ""}`}
      >
        {hasImage && (
          <figure className={styles.compactFigure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover!.src}
              alt={article.cover!.alt}
              className={styles.compactImage}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}
        <div>
          <div className={styles.compactMeta}>
            <Badge type={article.type} />
            <DateDisplay iso={article.publishedAt} relative />
          </div>
          <h3 className={styles.compactTitle}>
            <Link href={href} className={styles.stretched}>
              {article.title}
            </Link>
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article className={variant === "headline" ? styles.headline : styles.card}>
      {showImage && article.cover && (
        <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover.src}
            alt={article.cover.alt}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </Link>
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge type={article.type} />
          <span className={styles.category}>{article.category.name}</span>
        </div>
        <h3 className={variant === "headline" ? styles.headlineTitle : styles.title}>
          <Link href={href} className={styles.stretched}>
            {article.title}
          </Link>
        </h3>
        {variant === "headline" && article.lede && (
          <p className={styles.lede}>{article.lede}</p>
        )}
        <div className={styles.footer}>
          {article.author && <span className={styles.author}>{article.author.name}</span>}
          <DateDisplay iso={article.publishedAt} />
        </div>
      </div>
    </article>
  );
}
