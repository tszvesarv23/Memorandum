import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { DateDisplay } from "@/components/DateDisplay/DateDisplay";
import { ImageFigure } from "@/components/ImageFigure/ImageFigure";
import { SourceList } from "@/components/SourceList/SourceList";
import { Tag } from "@/components/Tag/Tag";
import { siteConfig } from "@/config/site";
import { getArticleBySlug } from "@/server/articles";
import styles from "./page.module.css";

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticleBySlug(category, slug);
  if (!article) return { title: "No encontrado" };

  return {
    title: article.title,
    description: article.lede,
    openGraph: {
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author.name] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const article = await getArticleBySlug(category, slug);
  if (!article) notFound();

  const url = `${siteConfig.url}/${article.category.slug}/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.lede,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: url,
    ...(article.isDemo ? { isAccessibleForFree: true } : {}),
  };

  return (
    <article className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.layout}>
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: article.category.name, href: `/${article.category.slug}` },
            { label: article.title },
          ]}
        />

        <header className={styles.header}>
          <div className={styles.meta}>
            <Badge type={article.type} />
            <span className={styles.category}>{article.category.name}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          {article.lede && <p className={styles.lede}>{article.lede}</p>}
          <div className={styles.byline}>
            {article.author && (
              <span className={styles.author}>
                Por <strong>{article.author.name}</strong>
                {article.author.role && (
                  <span className={styles.authorRole}> · {article.author.role}</span>
                )}
              </span>
            )}
            <DateDisplay iso={article.publishedAt} />
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <span className={styles.updated}>
                Actualizado: <DateDisplay iso={article.updatedAt} />
              </span>
            )}
            {article.isDemo && (
              <span className={styles.demo}>Contenido de demostración</span>
            )}
          </div>
        </header>

        {article.cover && (
          <ImageFigure media={article.cover} layout="wide" priority />
        )}

        {/* bodyHtml procede del CMS (Tiptap) sanitizado en servidor */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags} aria-label="Etiquetas">
            {article.tags.map((t) => (
              <Tag key={t.slug} label={t.name} href={`/etiqueta/${t.slug}`} />
            ))}
          </div>
        )}

        {article.sources && <SourceList sources={article.sources} />}
      </div>
    </article>
  );
}
