import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { articleRevisions, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getAdminArticle } from "@/server/admin";
import { getSessionUser } from "@/server/auth/session";
import { hasRole } from "@/server/auth/rbac";
import {
  updateArticleAction,
  transitionArticleAction,
} from "@/server/actions/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { formatDateTime } from "@/lib/format";
import styles from "../../../admin.module.css";

export const metadata: Metadata = {
  title: "Editar artículo — Panel editorial",
  robots: { index: false, follow: false },
};

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const [article, user, cats] = await Promise.all([
    getAdminArticle(id),
    getSessionUser(),
    db
      ? db
          .select({ id: categories.id, name: categories.name })
          .from(categories)
          .orderBy(categories.position)
      : Promise.resolve([]),
  ]);

  if (!article) notFound();

  const canPublish = user ? hasRole(user, "EDITOR") : false;
  const boundUpdate = updateArticleAction.bind(null, article.id);

  const revisions = db
    ? await db
        .select({
          id: articleRevisions.id,
          version: articleRevisions.version,
          title: articleRevisions.title,
          changeNote: articleRevisions.changeNote,
          createdAt: articleRevisions.createdAt,
        })
        .from(articleRevisions)
        .where(eq(articleRevisions.articleId, article.id))
        .orderBy(desc(articleRevisions.version))
        .limit(10)
    : [];

  return (
    <>
      <h1 className={styles.pageTitle}>Editar artículo</h1>
      <p className={styles.pageDesc}>
        Estado actual: <strong>{article.status}</strong>
        {article.publishedAt
          ? ` · publicado ${formatDateTime(article.publishedAt.toISOString())}`
          : ""}
      </p>

      <div className={styles.actions} style={{ marginBottom: "var(--space-6)" }}>
        {article.status === "DRAFT" || article.status === "ARCHIVED" ? (
          <form action={transitionArticleAction}>
            <input type="hidden" name="articleId" value={article.id} />
            <input type="hidden" name="action" value="submit_review" />
            <button type="submit" className={`${styles.btn} ${styles.btnSecondary}`}>
              Enviar a revisión
            </button>
          </form>
        ) : null}

        {canPublish && article.status !== "PUBLISHED" ? (
          <form action={transitionArticleAction}>
            <input type="hidden" name="articleId" value={article.id} />
            <input type="hidden" name="action" value="publish" />
            <button type="submit" className={styles.btn}>
              Publicar
            </button>
          </form>
        ) : null}

        {canPublish && article.status === "PUBLISHED" ? (
          <form action={transitionArticleAction}>
            <input type="hidden" name="articleId" value={article.id} />
            <input type="hidden" name="action" value="unpublish" />
            <button type="submit" className={`${styles.btn} ${styles.btnSecondary}`}>
              Despublicar
            </button>
          </form>
        ) : null}

        {canPublish && article.status !== "ARCHIVED" ? (
          <form action={transitionArticleAction}>
            <input type="hidden" name="articleId" value={article.id} />
            <input type="hidden" name="action" value="archive" />
            <button type="submit" className={`${styles.btn} ${styles.btnDanger}`}>
              Archivar
            </button>
          </form>
        ) : null}
      </div>

      <ArticleForm
        categories={cats}
        action={boundUpdate}
        submitLabel="Guardar cambios"
        showChangeNote
        initial={{
          title: article.title,
          slug: article.slug,
          type: article.type,
          lede: article.lede,
          categoryId: article.categoryId,
          seoTitle: article.seoTitle,
          seoDescription: article.seoDescription,
          body: article.body as Record<string, unknown>,
        }}
      />

      <h2 className={styles.sectionTitle}>Historial de versiones</h2>
      {revisions.length === 0 ? (
        <p className={styles.notice}>Sin revisiones registradas.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">v</th>
              <th scope="col">Titular</th>
              <th scope="col">Nota</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {revisions.map((rev) => (
              <tr key={rev.id}>
                <td>{rev.version}</td>
                <td>{rev.title}</td>
                <td>{rev.changeNote ?? "—"}</td>
                <td>{formatDateTime(rev.createdAt.toISOString())}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: "var(--space-5)" }}>
        <Link href="/admin/articulos">← Volver al listado</Link>
      </p>
    </>
  );
}
