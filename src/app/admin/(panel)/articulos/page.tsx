import type { Metadata } from "next";
import Link from "next/link";
import { listAdminArticles } from "@/server/admin";
import { formatDateTime } from "@/lib/format";
import { articleTypeLabels } from "@/config/site";
import styles from "../../admin.module.css";

export const metadata: Metadata = {
  title: "Artículos — Panel editorial",
  robots: { index: false, follow: false },
};

const statusLabels: Record<string, string> = {
  DRAFT: "Borrador",
  REVIEW: "En revisión",
  SCHEDULED: "Programado",
  PUBLISHED: "Publicado",
  ARCHIVED: "Archivado",
};

const statusClass: Record<string, string | undefined> = {
  DRAFT: styles.statusDraft,
  REVIEW: styles.statusReview,
  SCHEDULED: styles.statusScheduled,
  PUBLISHED: styles.statusPublished,
  ARCHIVED: styles.statusArchived,
};

export default async function AdminArticlesPage() {
  const rows = await listAdminArticles();

  return (
    <>
      <h1 className={styles.pageTitle}>Artículos</h1>
      <p className={styles.pageDesc}>
        Todos los artículos, en cualquier estado editorial.
      </p>

      <div className={styles.actions} style={{ marginBottom: "var(--space-5)" }}>
        <Link href="/admin/articulos/nuevo" className={styles.btn}>
          Nuevo artículo
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className={styles.notice}>
          No hay artículos todavía — o la base de datos no está configurada.
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Tipo</th>
              <th scope="col">Sección</th>
              <th scope="col">Estado</th>
              <th scope="col">Actualizado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link href={`/admin/articulos/${row.id}`}>{row.title}</Link>
                  {row.status === "PUBLISHED" && row.categorySlug ? (
                    <>
                      {" "}
                      <Link href={`/${row.categorySlug}/${row.slug}`}>
                        (ver)
                      </Link>
                    </>
                  ) : null}
                </td>
                <td>{articleTypeLabels[row.type] ?? row.type}</td>
                <td>{row.categoryName ?? "—"}</td>
                <td>
                  <span className={`${styles.statusBadge} ${statusClass[row.status] ?? ""}`}>
                    {statusLabels[row.status] ?? row.status}
                  </span>
                </td>
                <td>{formatDateTime(row.updatedAt.toISOString())}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
