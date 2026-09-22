import { ArticleList } from "@/components/ArticleList/ArticleList";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { getArticlesByCategory } from "@/server/articles";
import styles from "./SectionPage.module.css";

interface SectionPageProps {
  slug: string;
  title: string;
  description: string;
}

/**
 * Portada de sección: cabecera editorial + listado de artículos.
 */
export async function SectionPage({ slug, title, description }: SectionPageProps) {
  const articles = await getArticlesByCategory(slug, 12);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: title }]} />
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>
      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p className={styles.empty}>
          Todavía no hay contenido publicado en esta sección.
        </p>
      )}
    </div>
  );
}
