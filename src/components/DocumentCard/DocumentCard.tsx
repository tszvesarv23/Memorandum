import Link from "next/link";
import type { DocumentCardData } from "@/types/editorial";
import styles from "./DocumentCard.module.css";

const kindLabels: Record<string, string> = {
  OFFICIAL: "Documento oficial",
  REPORT: "Informe",
  RESOLUTION: "Resolución",
  PHOTOGRAPH: "Fotografía",
  MAP: "Mapa",
  LETTER: "Carta",
  OTHER: "Documento",
};

export function DocumentCard({ document }: { document: DocumentCardData }) {
  return (
    <article className={styles.card}>
      <div className={styles.kindRow}>
        <span className={styles.kind}>{kindLabels[document.kind] ?? "Documento"}</span>
        {document.officialSource && (
          <span className={styles.official}>Fuente oficial</span>
        )}
      </div>
      <h3 className={styles.title}>
        <Link href={`/documentos/${document.slug}`} className={styles.stretched}>
          {document.title}
        </Link>
      </h3>
      {document.description && (
        <p className={styles.description}>{document.description}</p>
      )}
      <div className={styles.meta}>
        {document.issuingBody && <span>{document.issuingBody}</span>}
        {document.isDemo && <span className={styles.demo}>Demostración</span>}
      </div>
    </article>
  );
}
