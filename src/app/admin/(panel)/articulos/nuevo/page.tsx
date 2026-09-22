import type { Metadata } from "next";
import { listCategoriesForSelect, createArticleAction } from "@/server/actions/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";
import styles from "../../../admin.module.css";

export const metadata: Metadata = {
  title: "Nuevo artículo — Panel editorial",
  robots: { index: false, follow: false },
};

export default async function NewArticlePage() {
  const categories = await listCategoriesForSelect();

  return (
    <>
      <h1 className={styles.pageTitle}>Nuevo artículo</h1>
      <p className={styles.pageDesc}>
        Se crea como borrador. La publicación exige rol de editor.
      </p>

      {categories.length === 0 ? (
        <p className={styles.notice}>
          No hay secciones en la base de datos. Ejecuta{" "}
          <code>pnpm db:seed</code> primero.
        </p>
      ) : (
        <ArticleForm
          categories={categories}
          action={createArticleAction}
          submitLabel="Crear borrador"
        />
      )}
    </>
  );
}
