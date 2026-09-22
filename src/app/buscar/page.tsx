import type { Metadata } from "next";
import { ArticleList } from "@/components/ArticleList/ArticleList";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { getPublishedArticles } from "@/server/articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false },
};

interface BuscarPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Búsqueda global. FASE posterior: PostgreSQL full-text search
 * sobre artículos, autores, etiquetas, documentos y eventos.
 */
export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // Implementación provisional: filtrado en memoria sobre datos disponibles.
  const all = await getPublishedArticles(100);
  const results = query
    ? all.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.lede?.toLowerCase().includes(query.toLowerCase()) ||
          a.author?.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Buscar" }]} />
      <header className={styles.header}>
        <h1 className={styles.title}>Buscar</h1>
        <form action="/buscar" method="get" role="search" className={styles.form}>
          <label htmlFor="buscar-q" className="visually-hidden">
            Término de búsqueda
          </label>
          <input
            id="buscar-q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Buscar artículos, autores, documentos…"
            className={styles.input}
            autoComplete="off"
          />
          <button type="submit" className={styles.button}>
            Buscar
          </button>
        </form>
      </header>

      {query && (
        <p className={styles.count} role="status">
          {results.length} resultado{results.length === 1 ? "" : "s"} para «{query}»
        </p>
      )}

      <ArticleList articles={results} />
    </div>
  );
}
