import Link from "next/link";
import styles from "./CitizenSubmissionCTA.module.css";

/**
 * Bloque de llamada al buzón ciudadano.
 * Transmite confianza sin prometer anonimato absoluto.
 */
export function CitizenSubmissionCTA() {
  return (
    <aside className={styles.cta} aria-labelledby="cta-buzon-title">
      <p className={styles.kicker}>Participación ciudadana</p>
      <h2 id="cta-buzon-title" className={styles.title}>
        ¿Has presenciado algo que debería documentarse?
      </h2>
      <p className={styles.text}>
        Puedes enviar información, fotografías, vídeos o documentos a la
        redacción sin crear una cuenta. Todo el material se revisa de forma
        manual antes de cualquier publicación.
      </p>
      <p className={styles.privacy}>
        No pedimos nombre, correo ni teléfono. Minimizamos los datos que
        recogemos y protegemos los archivos en almacenamiento restringido.
      </p>
      <Link href="/buzon" className={styles.button}>
        Ir al buzón confidencial
      </Link>
    </aside>
  );
}
