import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { DocumentCard } from "@/components/DocumentCard/DocumentCard";
import { getFeaturedDocuments } from "@/server/articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Documentos",
  description:
    "Repositorio de documentos, informes, resoluciones, fotografías históricas y mapas.",
};

export default async function DocumentosPage() {
  const documents = await getFeaturedDocuments(24);

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Documentos" }]} />
      <header className={styles.header}>
        <h1 className={styles.title}>Documentos</h1>
        <p className={styles.description}>
          Repositorio documental: informes, resoluciones oficiales, fotografías
          históricas, mapas y fuentes primarias.
        </p>
      </header>
      <div className={styles.grid}>
        {documents.map((d) => (
          <DocumentCard key={d.slug} document={d} />
        ))}
      </div>
    </div>
  );
}
