import type { Metadata } from "next";
import Link from "next/link";
import { listAdminSubmissions } from "@/server/admin";
import { formatDateTime } from "@/lib/format";
import styles from "../../admin.module.css";

export const metadata: Metadata = {
  title: "Buzón ciudadano — Panel editorial",
  robots: { index: false, follow: false },
};

const statusLabels: Record<string, string> = {
  PENDING_REVIEW: "Pendiente",
  UNDER_REVIEW: "En revisión",
  VERIFIED: "Verificado",
  REJECTED: "Descartado",
  ARCHIVED: "Archivado",
  PUBLISHED: "Publicado",
};

const categoryLabels: Record<string, string> = {
  NEWS_TIP: "Información",
  DOCUMENT: "Documento",
  PHOTO: "Fotografías",
  VIDEO: "Vídeo",
  CORRECTION: "Corrección",
  OTHER: "Otro",
};

export default async function AdminBuzonPage() {
  const rows = await listAdminSubmissions();

  return (
    <>
      <h1 className={styles.pageTitle}>Buzón ciudadano</h1>
      <p className={styles.pageDesc}>
        Envíos recibidos. Todo pasa por revisión humana; nada se publica
        automáticamente.
      </p>

      {rows.length === 0 ? (
        <p className={styles.notice}>
          No hay envíos todavía — o la base de datos no está configurada.
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Envío</th>
              <th scope="col">Categoría</th>
              <th scope="col">Estado</th>
              <th scope="col">Recibido</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link href={`/admin/buzon/${row.id}`}>
                    {row.title || "(sin título)"}
                  </Link>
                </td>
                <td>{categoryLabels[row.category] ?? row.category}</td>
                <td>
                  <span className={styles.statusBadge}>
                    {statusLabels[row.status] ?? row.status}
                  </span>
                </td>
                <td>{formatDateTime(row.createdAt.toISOString())}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
