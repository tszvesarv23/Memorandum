import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "../sobre/page.module.css";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad",
  description: "Aviso legal, política de privacidad y política de cookies.",
  robots: { index: false },
};

/**
 * TODO(legal): estos textos son placeholders estructurales.
 * Deben ser redactados/revisados por un abogado especializado en
 * protección de datos (RGPD/LOPDGDD) y derecho de medios antes
 * de cualquier despliegue en producción.
 */
export default function LegalPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Aviso legal" }]} />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>Aviso legal y privacidad</h1>
          <p className={styles.lede}>
            Documento en preparación. La versión definitiva será revisada por
            asesoría legal especializada antes del lanzamiento.
          </p>
        </header>

        <div className="prose">
          <h2>Titular</h2>
          <p>Pendiente de completar con los datos del titular del medio.</p>

          <h2>Privacidad</h2>
          <p>
            Principios aplicados: minimización de datos, privacy by design y
            least privilege. No utilizamos Google Analytics ni trackers
            publicitarios. Las direcciones IP de los remitentes del buzón se
            procesan con hash y retención mínima.
          </p>

          <h2>Cookies</h2>
          <p>
            Este sitio no utiliza cookies de terceros con fines publicitarios
            ni de seguimiento.
          </p>

          <h2>Términos de uso y moderación</h2>
          <p>
            El material enviado al buzón se trata conforme a la política de
            moderación descrita en Metodología. Las notas internas de la
            redacción no se publican.
          </p>
        </div>
      </article>
    </div>
  );
}
