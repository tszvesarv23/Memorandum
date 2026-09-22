import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "../sobre/page.module.css";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Quién publica, financiación, política publicitaria y políticas del medio.",
};

export default function TransparenciaPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Transparencia" }]} />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>Transparencia</h1>
          <p className={styles.lede}>
            Quién publica, cómo se financia y qué políticas rigen este medio.
          </p>
        </header>

        <div className="prose">
          <h2>Quién publica</h2>
          <p>
            {/* TODO(legal): completar con la identidad del titular antes de producción */}
            Memorandum es un proyecto editorial independiente. La identidad del
            responsable de la publicación se detallará en el aviso legal.
          </p>

          <h2>Financiación</h2>
          <p>
            El proyecto se financia de forma independiente. Si en el futuro se
            incorporan suscripciones, mecenazgo o publicidad, se detallará aquí
            su procedencia y condiciones.
          </p>

          <h2>Política publicitaria</h2>
          <p>
            No utilizamos trackers publicitarios ni redes de anuncios
            invasivas. Cualquier formato comercial futuro será claramente
            identificado y nunca condicionará el contenido editorial.
          </p>

          <h2>Políticas del medio</h2>
          <ul>
            <li>
              <Link href="/metodologia">Metodología y política de correcciones</Link>
            </li>
            <li>
              <Link href="/legal">Aviso legal, privacidad y cookies</Link>
            </li>
            <li>
              <Link href="/buzon">Funcionamiento del buzón confidencial</Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}
