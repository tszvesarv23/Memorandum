import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/server/auth/session";
import { LoginForm } from "@/components/admin/LoginForm";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: "Acceso — Panel editorial",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");

  return (
    <main className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Memorandum — Redacción</h1>
        <LoginForm />
      </div>
    </main>
  );
}
