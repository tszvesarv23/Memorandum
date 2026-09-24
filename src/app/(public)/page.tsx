import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Memorandum: una iniciativa para informar de lo que sucede en España, actualidad política, nacional, internacional y Ceuta, con participación ciudadana.",
};

/**
 * Página de inicio — solo el manifiesto y la descripción del proyecto.
 * Las noticias y el resto de contenidos editoriales viven en sus
 * respectivas secciones (Actualidad, España, Mundo, Investigación...).
 */
export default function HomePage() {
  return (
    <main className={styles.landing}>
      <div className="container">
        <header className={styles.landingHeader}>
          <h1 className={styles.landingTitle}>Memorandum</h1>
          <p className={styles.landingLede}>
            Documentar el presente para que pueda ser consultado en el futuro.
          </p>
        </header>

        <section className={styles.landingBody} aria-label="Descripción del proyecto">
          <p>
            Memorandum es una iniciativa informativa independiente dedicada a contar
            lo que sucede en España. Cubrimos la actualidad política, nacional e
            internacional, con una mirada constante hacia Ceuta: su realidad como ciudad
            de frontera, autónoma y mediterránea, y su lugar dentro del conjunto del país.
          </p>
          <p>
            No somos un simple agregador de noticias. Construimos un archivo vivo de
            acontecimientos: reportajes, investigaciones documentadas, análisis rigurosos,
            testimonios ciudadanos y revisiones históricas que permanezcan disponibles
            para quienes quieran consultarlos en el futuro.
          </p>
          <p>
            También somos una plataforma ciudadana. Cualquier persona puede enviarnos
            información sobre sucesos, aportar fotografías, vídeos o documentos, e
            incluso proponer reportajes libres sobre aquello que considere que debe ser
            documentado. No exigimos identificación obligatoria: quien lo desee puede
            colaborar de forma anónima, siempre dentro de los límites legales y éticos
            que garantizan la veracidad y la responsabilidad de lo publicado.
          </p>
          <p>
            Cada aporte se revisa, verifica y trata con las mismas reglas periodísticas
            que el resto de nuestro contenido. La información ciudadana no se publica
            automáticamente: pasa por un proceso de comprobación antes de formar parte
            del registro.
          </p>
        </section>
      </div>
    </main>
  );
}
