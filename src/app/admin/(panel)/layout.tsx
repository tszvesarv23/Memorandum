import Link from "next/link";
import { requireUser } from "@/server/auth/rbac";
import { logoutAction } from "@/server/actions/auth";
import styles from "../admin.module.css";

/**
 * Shell del panel editorial — exige sesión para cualquier
 * ruta bajo /admin excepto /admin/login.
 */
export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.brand}>
          Memorandum
        </Link>
        <nav className={styles.nav} aria-label="Panel editorial">
          <Link href="/admin" className={styles.navLink}>
            Panel
          </Link>
          <Link href="/admin/articulos" className={styles.navLink}>
            Artículos
          </Link>
          <Link href="/admin/buzon" className={styles.navLink}>
            Buzón ciudadano
          </Link>
          <Link href="/" className={styles.navLink}>
            Ver sitio público ↗
          </Link>
        </nav>
        <div className={styles.userBox}>
          <span>
            {user.displayName}
            <br />
            {user.role}
          </span>
          <form action={logoutAction}>
            <button type="submit" className={styles.logoutBtn}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
