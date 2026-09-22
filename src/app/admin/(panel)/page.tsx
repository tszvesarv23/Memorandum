import type { Metadata } from "next";
import Link from "next/link";
import { getAdminStats } from "@/server/admin";
import { isDatabaseConfigured } from "@/db";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: "Panel editorial",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const { denied } = await searchParams;
  const stats = await getAdminStats();

  return (
    <>
      <h1 className={styles.pageTitle}>Panel editorial</h1>
      <p className={styles.pageDesc}>
        Estado de la redacción y accesos rápidos.
      </p>

      {denied ? (
        <p className={styles.error} role="alert">
          No tienes permisos suficientes para esa acción.
        </p>
      ) : null}

      {!isDatabaseConfigured ? (
        <p className={styles.notice}>
          <strong>Sin base de datos.</strong> Configura <code>DATABASE_URL</code>{" "}
          y ejecuta <code>pnpm db:push</code> + <code>pnpm db:seed</code> para
          activar el CMS.
        </p>
      ) : null}

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.articles}</div>
          <div className={styles.statLabel}>Artículos</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.published}</div>
          <div className={styles.statLabel}>Publicados</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.pendingSubmissions}</div>
          <div className={styles.statLabel}>Envíos pendientes</div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/admin/articulos/nuevo" className={styles.btn}>
          Nuevo artículo
        </Link>
        <Link href="/admin/buzon" className={`${styles.btn} ${styles.btnSecondary}`}>
          Revisar buzón
        </Link>
      </div>
    </>
  );
}
