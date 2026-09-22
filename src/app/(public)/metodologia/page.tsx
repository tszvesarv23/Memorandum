import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "../sobre/page.module.css";

export const metadata: Metadata = {
  title: "Metodología",
  description:
    "Verificación, fuentes, correcciones, tratamiento de rumores y uso de IA.",
};

export default function MetodologiaPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Metodología" }]} />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>Metodología</h1>
          <p className={styles.lede}>
            Cómo verificamos, cómo corregimos y qué criterios aplicamos al
            material que recibimos.
          </p>
        </header>

        <div className="prose">
          <h2>Verificación</h2>
          <p>
            Toda información factual se contrasta antes de publicarse. Cuando
            un hecho no puede verificarse de forma independiente, se indica
            expresamente y se atribuye a su fuente.
          </p>

          <h2>Fuentes</h2>
          <p>
            Priorizamos fuentes primarias y documentos oficiales (BOE,
            Congreso, Senado, tribunales, organismos públicos, archivos). Las
            fuentes se listan al pie del artículo y las oficiales se marcan
            como tales.
          </p>

          <h2>Correcciones y derecho de rectificación</h2>
          <p>
            Los errores se corrigen de forma visible: el texto corregido indica
            qué se modificó y cuándo. Las correcciones sustantivas nunca se
            hacen en silencio. Cualquier persona afectada puede solicitar
            rectificación a través del buzón o del correo de la redacción.
          </p>

          <h2>Rumores</h2>
          <p>
            No publicamos rumores como hechos. Si un rumor es noticia en sí
            mismo, se informa de su existencia, su origen y su estado de
            verificación, sin amplificarlo.
          </p>

          <h2>Contenido enviado por ciudadanos</h2>
          <p>
            El material recibido por el buzón se etiqueta como «envío
            ciudadano» y pasa por un proceso de revisión: comprobación de
            seguridad, sanitización de metadatos, verificación humana y
            decisión editorial. Distinguimos siempre entre «recibido»,
            «verificado» y «publicado».
          </p>

          <h2>Anonimización</h2>
          <p>
            Cuando publicamos material de terceros, eliminamos metadatos y
            datos que puedan identificar al remitente o a terceras personas no
            relevantes, salvo interés público justificado.
          </p>

          <h2>Conflictos de interés</h2>
          <p>
            Los autores declaran cualquier vínculo relevante con los temas que
            cubren. Cuando existe un conflicto, se indica en el propio texto.
          </p>

          <h2>Uso de inteligencia artificial</h2>
          <p>
            La IA puede usarse como herramienta auxiliar (transcripción, OCR,
            clasificación interna), nunca como autoridad ni como autor.
            Ningún contenido generado por IA se publica sin revisión humana.
          </p>
        </div>
      </article>
    </div>
  );
}
