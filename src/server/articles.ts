import { db, isDatabaseConfigured } from "@/db";
import { articles, articleTags, categories, authors, media, tags } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { demoArticles, demoDocuments, demoTimeline } from "./demo-data";
import type {
  ArticleCardData,
  ArticleDetailData,
  DocumentCardData,
  MediaRef,
  TimelineEntryData,
} from "@/types/editorial";

/**
 * Capa de acceso a datos editorial.
 * Cuando la base de datos no está configurada, degrada a
 * contenido de demostración marcado como tal.
 */

function demoCover(slug: string, type: string, title: string): MediaRef {
  const mono = type === "HISTORICAL" || type === "TIMELINE" || type === "DOCUMENT";
  const query = mono ? "?grayscale" : "";
  return {
    src: `https://picsum.photos/seed/${encodeURIComponent(slug)}/1600/900${query}`,
    alt: `Fotografía de acompañamiento: ${title}`,
    caption: "Imagen de demostración para visualizar el tratamiento editorial.",
    credit: "Picsum",
  };
}

function toCard(row: {
  slug: string;
  type: string;
  title: string;
  lede: string | null;
  isDemo: boolean;
  publishedAt: Date | null;
  category: { slug: string; name: string } | null;
  author: { slug: string; name: string; role: string | null } | null;
  cover: { storageKey: string; alt: string; caption: string | null; credit: string | null } | null;
}): ArticleCardData {
  const cover = row.cover
    ? {
        src: `/media/${row.cover.storageKey}`,
        alt: row.cover.alt,
        caption: row.cover.caption ?? undefined,
        credit: row.cover.credit ?? undefined,
      }
    : row.isDemo
      ? demoCover(row.slug, row.type, row.title)
      : undefined;

  return {
    slug: row.slug,
    type: row.type as ArticleCardData["type"],
    title: row.title,
    lede: row.lede ?? undefined,
    category: row.category ?? { slug: "actualidad", name: "Actualidad" },
    author: row.author
      ? { slug: row.author.slug, name: row.author.name, role: row.author.role ?? undefined }
      : undefined,
    cover,
    publishedAt: (row.publishedAt ?? new Date()).toISOString(),
    isDemo: row.isDemo,
  };
}

export async function getPublishedArticles(limit = 20): Promise<ArticleCardData[]> {
  if (!isDatabaseConfigured || !db) return demoArticles;

  const rows = await db
    .select({
      slug: articles.slug,
      type: articles.type,
      title: articles.title,
      lede: articles.lede,
      isDemo: articles.isDemo,
      publishedAt: articles.publishedAt,
      category: { slug: categories.slug, name: categories.name },
      author: { slug: authors.slug, name: authors.name, role: authors.role },
      cover: {
        storageKey: media.storageKey,
        alt: media.alt,
        caption: media.caption,
        credit: media.credit,
      },
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(authors, eq(articles.authorId, authors.id))
    .leftJoin(media, eq(articles.coverMediaId, media.id))
    .where(eq(articles.status, "PUBLISHED"))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);

  return rows.map(toCard);
}

export async function getArticlesByCategory(
  categorySlug: string,
  limit = 12,
): Promise<ArticleCardData[]> {
  if (!isDatabaseConfigured || !db) {
    return demoArticles.filter((a) => a.category.slug === categorySlug);
  }

  const rows = await db
    .select({
      slug: articles.slug,
      type: articles.type,
      title: articles.title,
      lede: articles.lede,
      isDemo: articles.isDemo,
      publishedAt: articles.publishedAt,
      category: { slug: categories.slug, name: categories.name },
      author: { slug: authors.slug, name: authors.name, role: authors.role },
      cover: {
        storageKey: media.storageKey,
        alt: media.alt,
        caption: media.caption,
        credit: media.credit,
      },
    })
    .from(articles)
    .innerJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(authors, eq(articles.authorId, authors.id))
    .leftJoin(media, eq(articles.coverMediaId, media.id))
    .where(and(eq(articles.status, "PUBLISHED"), eq(categories.slug, categorySlug)))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);

  return rows.map(toCard);
}

export async function getArticlesByType(
  type: ArticleCardData["type"],
  limit = 6,
): Promise<ArticleCardData[]> {
  if (!isDatabaseConfigured || !db) {
    return demoArticles.filter((a) => a.type === type).slice(0, limit);
  }
  const all = await getPublishedArticles(50);
  return all.filter((a) => a.type === type).slice(0, limit);
}

const demoBodyHtml = `
<p><em>Contenido de demostración.</em> Este texto ilustra la composición tipográfica del cuerpo de un artículo: párrafos con medida de lectura cómoda, interletraje sobrio y ritmo vertical consistente.</p>
<p>Cuando la base de datos esté configurada, este cuerpo se generará desde el editor Tiptap del CMS, se sanitizará en servidor y se renderizará como HTML seguro. Los artículos podrán incluir citas, figuras con pie, listas de fuentes y cronologías.</p>
<blockquote><p>La precisión es una forma de respeto hacia el lector.</p></blockquote>
<p>Los datos estructurados (NewsArticle, BreadcrumbList) se emiten automáticamente en cada página de artículo para mejorar la indexación.</p>
`;

export async function getArticleBySlug(
  categorySlug: string,
  slug: string,
): Promise<ArticleDetailData | null> {
  if (!isDatabaseConfigured || !db) {
    const card = demoArticles.find(
      (a) => a.slug === slug && a.category.slug === categorySlug,
    );
    if (!card) return null;
    return { ...card, bodyHtml: demoBodyHtml };
  }

  const rows = await db
    .select({
      slug: articles.slug,
      type: articles.type,
      title: articles.title,
      id: articles.id,
      lede: articles.lede,
      bodyHtml: articles.bodyHtml,
      isDemo: articles.isDemo,
      publishedAt: articles.publishedAt,
      updatedAt: articles.updatedAt,
      category: { slug: categories.slug, name: categories.name },
      author: { slug: authors.slug, name: authors.name, role: authors.role },
      cover: {
        storageKey: media.storageKey,
        alt: media.alt,
        caption: media.caption,
        credit: media.credit,
      },
    })
    .from(articles)
    .innerJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(authors, eq(articles.authorId, authors.id))
    .leftJoin(media, eq(articles.coverMediaId, media.id))
    .where(
      and(
        eq(articles.status, "PUBLISHED"),
        eq(articles.slug, slug),
        eq(categories.slug, categorySlug),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const tagRows = await db
    .select({ slug: tags.slug, name: tags.name })
    .from(articleTags)
    .innerJoin(tags, eq(articleTags.tagId, tags.id))
    .where(eq(articleTags.articleId, row.id));

  return {
    ...toCard(row),
    bodyHtml: row.bodyHtml ?? "",
    updatedAt: row.updatedAt?.toISOString(),
    tags: tagRows,
  };
}

export async function getFeaturedDocuments(limit = 4): Promise<DocumentCardData[]> {
  // FASE 3: consulta real a `documents`
  return demoDocuments.slice(0, limit);
}

export async function getTimelinePreview(): Promise<TimelineEntryData[]> {
  // FASE 3: consulta real a `timeline_entries`
  return demoTimeline;
}
