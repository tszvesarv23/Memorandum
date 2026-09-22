import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description:
    "Quién está detrás, propósito, principios editoriales y compromiso con la documentación.",
};

export default function SobrePage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Sobre el proyecto" }]} />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>Sobre el proyecto</h1>
          <p className={styles.lede}>
            Memorandum es una plataforma editorial independiente centrada en
            Ceuta, con cobertura de España y de los principales acontecimientos
            internacionales. Nace para documentar, no para amplificar.
          </p>
        </header>

        <div className="prose">
          <h2>Por qué existe esta página</h2>
          <p>
            Ceuta es una ciudad fronteriza, mediterránea y europea que aparece
            en la prensa nacional casi exclusivamente cuando ocurre una crisis.
            Este proyecto nace de una convicción sencilla: la actualidad de la
            ciudad —y la de España en su conjunto— merece un tratamiento
            continuado, documentado y sin prisa.
          </p>

          <h2>Qué pretendemos documentar</h2>
          <p>
            La actualidad local y nacional, los acontecimientos internacionales
            relevantes y, de forma especial, la historia: la de Ceuta, la de
            España y la de los conflictos y procesos que han configurado el
            presente. La sección de Historia / Revisión trabaja con fuentes
            primarias, cronologías y distintas interpretaciones
            historiográficas.
          </p>

          <h2>Información, análisis y opinión</h2>
          <p>
            Distinguimos de forma explícita cada tipo de contenido. Una noticia
            describe hechos verificados; un análisis los interpreta con datos;
            una opinión es una posición argumentada y siempre aparece
            etiquetada como tal. Nunca presentamos opinión como información
            objetiva.
          </p>

          <h2>Cómo tratamos las fuentes</h2>
          <p>
            Cada artículo puede incluir una sección de fuentes visible al
            final: documentos oficiales, resoluciones, informes, hemeroteca y
            medios de comunicación. Las fuentes oficiales se marcan como tales.
            No enlazamos lo que no hemos consultado.
          </p>

          <h2>El buzón ciudadano</h2>
          <p>
            Cualquier persona puede enviar información, fotografías, vídeos o
            documentos sin crear una cuenta. El material entra en un proceso de
            revisión humana y nunca se publica automáticamente. Minimizamos los
            datos que recogemos; no prometemos anonimato absoluto porque
            ningún sistema web puede garantizarlo.
          </p>

          <h2>Qué significa revisar la historia</h2>
          <p>
            Revisar no es reescribir a conveniencia ni negar. Es volver sobre
            los acontecimientos con nuevos documentos, nueva historiografía y
            honestidad intelectual: distinguir lo que sabemos de lo que no
            sabemos, y señalar las controversias cuando existen.
          </p>

          <h2>Limitaciones</h2>
          <p>
            Somos un proyecto pequeño. No podemos cubrirlo todo ni llegar
            siempre los primeros. Preferimos llegar bien. Cuando nos
            equivocamos, corregimos de forma visible según nuestra{" "}
            <Link href="/metodologia">política de correcciones</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
