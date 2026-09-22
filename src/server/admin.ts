import { db } from "@/db";
import {
  articles,
  categories,
  authors,
  submissions,
  submissionNotes,
  users,
} from "@/db/schema";
import { desc, eq, count } from "drizzle-orm";

/**
 * Consultas del panel /admin — siempre detrás de requireUser/requireRole
 * en la página o acción correspondiente.
 */

export interface AdminArticleRow {
  id: string;
  slug: string;
  title: string;
  type: string;
  status: string;
  categoryName: string | null;
  categorySlug: string | null;
  authorName: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
}

export async function listAdminArticles(limit = 50): Promise<AdminArticleRow[]> {
  if (!db) return [];
  return db
    .select({
      id: articles.id,
      slug: articles.slug,
      title: articles.title,
      type: articles.type,
      status: articles.status,
      categoryName: categories.name,
      categorySlug: categories.slug,
      authorName: authors.name,
      publishedAt: articles.publishedAt,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(authors, eq(articles.authorId, authors.id))
    .orderBy(desc(articles.updatedAt))
    .limit(limit);
}

export async function getAdminArticle(id: string) {
  if (!db) return null;
  return db.query.articles.findFirst({
    where: eq(articles.id, id),
  });
}

export interface AdminSubmissionRow {
  id: string;
  title: string | null;
  category: string;
  status: string;
  createdAt: Date;
}

export async function listAdminSubmissions(limit = 50): Promise<AdminSubmissionRow[]> {
  if (!db) return [];
  return db
    .select({
      id: submissions.id,
      title: submissions.title,
      category: submissions.category,
      status: submissions.status,
      createdAt: submissions.createdAt,
    })
    .from(submissions)
    .orderBy(desc(submissions.createdAt))
    .limit(limit);
}

export async function getAdminSubmission(id: string) {
  if (!db) return null;
  const submission = await db.query.submissions.findFirst({
    where: eq(submissions.id, id),
  });
  if (!submission) return null;

  const notes = await db
    .select({
      id: submissionNotes.id,
      body: submissionNotes.body,
      createdAt: submissionNotes.createdAt,
      authorName: users.displayName,
    })
    .from(submissionNotes)
    .leftJoin(users, eq(submissionNotes.authorId, users.id))
    .where(eq(submissionNotes.submissionId, id))
    .orderBy(submissionNotes.createdAt);

  return { ...submission, notes };
}

export interface AdminStats {
  articles: number;
  published: number;
  pendingSubmissions: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  if (!db) return { articles: 0, published: 0, pendingSubmissions: 0 };

  const [total] = await db.select({ n: count() }).from(articles);
  const [pub] = await db
    .select({ n: count() })
    .from(articles)
    .where(eq(articles.status, "PUBLISHED"));
  const [pending] = await db
    .select({ n: count() })
    .from(submissions)
    .where(eq(submissions.status, "PENDING_REVIEW"));

  return {
    articles: total?.n ?? 0,
    published: pub?.n ?? 0,
    pendingSubmissions: pending?.n ?? 0,
  };
}
