"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import {
  articles,
  articleRevisions,
  articleTypeEnum,
  categories,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { requireRole, requireUser } from "@/server/auth/rbac";
import { audit } from "@/server/audit";
import { slugify } from "@/lib/slug";
import { tiptapToHtml } from "@/server/tiptap-html";

const articleSchema = z.object({
  title: z.string().trim().min(4).max(300),
  slug: z.string().trim().max(140).optional(),
  type: z.enum(articleTypeEnum.enumValues),
  lede: z.string().trim().max(600).optional(),
  categoryId: z.string().uuid(),
  seoTitle: z.string().trim().max(300).optional(),
  seoDescription: z.string().trim().max(400).optional(),
  bodyJson: z.string().min(2),
});

export interface ArticleFormState {
  error?: string;
}

function parseBody(raw: string): Record<string, unknown> | null {
  try {
    const doc: unknown = JSON.parse(raw);
    if (doc && typeof doc === "object" && (doc as { type?: string }).type === "doc") {
      return doc as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

export async function createArticleAction(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireRole("AUTHOR");
  if (!db) return { error: "Base de datos no configurada." };

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    type: formData.get("type"),
    lede: formData.get("lede") || undefined,
    categoryId: formData.get("categoryId"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
    bodyJson: formData.get("bodyJson"),
  });
  if (!parsed.success) return { error: "Revisa los campos obligatorios." };

  const body = parseBody(parsed.data.bodyJson);
  if (!body) return { error: "El cuerpo del artículo no es válido." };

  const slug = slugify(parsed.data.slug || parsed.data.title);
  if (!slug) return { error: "No se pudo generar un slug válido." };

  const [created] = await db
    .insert(articles)
    .values({
      title: parsed.data.title,
      slug,
      type: parsed.data.type,
      lede: parsed.data.lede ?? null,
      body,
      bodyHtml: tiptapToHtml(body),
      categoryId: parsed.data.categoryId,
      seoTitle: parsed.data.seoTitle ?? null,
      seoDescription: parsed.data.seoDescription ?? null,
      status: "DRAFT",
      createdById: user.id,
      updatedById: user.id,
    })
    .returning({ id: articles.id });

  if (!created) return { error: "No se pudo crear el artículo." };

  await db.insert(articleRevisions).values({
    articleId: created.id,
    version: 1,
    title: parsed.data.title,
    lede: parsed.data.lede ?? null,
    body,
    changeNote: "Creación",
    editedById: user.id,
  });

  await audit({
    actorId: user.id,
    action: "article.create",
    entityType: "article",
    entityId: created.id,
  });

  redirect(`/admin/articulos/${created.id}`);
}

export async function updateArticleAction(
  articleId: string,
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireRole("AUTHOR");
  if (!db) return { error: "Base de datos no configurada." };

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    type: formData.get("type"),
    lede: formData.get("lede") || undefined,
    categoryId: formData.get("categoryId"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
    bodyJson: formData.get("bodyJson"),
  });
  if (!parsed.success) return { error: "Revisa los campos obligatorios." };

  const body = parseBody(parsed.data.bodyJson);
  if (!body) return { error: "El cuerpo del artículo no es válido." };

  const existing = await db.query.articles.findFirst({
    where: eq(articles.id, articleId),
  });
  if (!existing) return { error: "Artículo no encontrado." };

  const slug = slugify(parsed.data.slug || parsed.data.title) || existing.slug;

  await db
    .update(articles)
    .set({
      title: parsed.data.title,
      slug,
      type: parsed.data.type,
      lede: parsed.data.lede ?? null,
      body,
      bodyHtml: tiptapToHtml(body),
      categoryId: parsed.data.categoryId,
      seoTitle: parsed.data.seoTitle ?? null,
      seoDescription: parsed.data.seoDescription ?? null,
      updatedById: user.id,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, articleId));

  const [lastRevision] = await db
    .select({ version: articleRevisions.version })
    .from(articleRevisions)
    .where(eq(articleRevisions.articleId, articleId))
    .orderBy(desc(articleRevisions.version))
    .limit(1);

  await db.insert(articleRevisions).values({
    articleId,
    version: (lastRevision?.version ?? 0) + 1,
    title: parsed.data.title,
    lede: parsed.data.lede ?? null,
    body,
    changeNote: String(formData.get("changeNote") ?? "") || null,
    editedById: user.id,
  });

  await audit({
    actorId: user.id,
    action: "article.update",
    entityType: "article",
    entityId: articleId,
  });

  revalidatePath("/admin/articulos");
  return {};
}

const publishSchema = z.object({
  articleId: z.string().uuid(),
  action: z.enum(["submit_review", "publish", "unpublish", "archive"]),
});

/** Transiciones de estado del flujo editorial. */
export async function transitionArticleAction(formData: FormData): Promise<void> {
  const parsed = publishSchema.safeParse({
    articleId: formData.get("articleId"),
    action: formData.get("action"),
  });
  if (!parsed.success) return;
  const { articleId, action } = parsed.data;

  // Enviar a revisión lo puede hacer el autor; publicar exige EDITOR
  const user =
    action === "submit_review"
      ? await requireRole("AUTHOR")
      : await requireRole("EDITOR");
  if (!db) return;

  const patch =
    action === "submit_review"
      ? { status: "REVIEW" as const }
      : action === "publish"
        ? { status: "PUBLISHED" as const, publishedAt: new Date() }
        : action === "unpublish"
          ? { status: "DRAFT" as const, publishedAt: null }
          : { status: "ARCHIVED" as const };

  await db
    .update(articles)
    .set({ ...patch, updatedById: user.id, updatedAt: new Date() })
    .where(eq(articles.id, articleId));

  await audit({
    actorId: user.id,
    action: `article.${action}`,
    entityType: "article",
    entityId: articleId,
  });

  revalidatePath("/admin/articulos");
  revalidatePath(`/admin/articulos/${articleId}`);
}

export async function listCategoriesForSelect() {
  if (!db) return [];
  return db
    .select({ id: categories.id, name: categories.name, slug: categories.slug })
    .from(categories)
    .orderBy(categories.position);
}

export { requireUser };
