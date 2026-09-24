import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Memorandum: una iniciativa para informar de lo que sucede en España, actualidad política, nacional, internacional y Ceuta, con participación ciudadana.",
};

/**
 * Página de inicio con diseño de agencia informativa:
 * hero de texto + imagen, bloque informativo complementario
 * y barra de suscripción al pie.
 */
export default function HomePage() {
  return (
    <main className={styles.landing}>
      {/* Hero: texto a la izquierda, imagen a la derecha */}
      <section className={styles.hero} aria-label="Bienvenida">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Documentar el presente para que pueda ser consultado en el futuro.
              </h1>
              <p className={styles.heroLead}>
                Memorandum es una iniciativa informativa independiente dedicada a contar
                lo que sucede en España: actualidad política, nacional e internacional,
                con una mirada constante hacia Ceuta.
              </p>
              <p className={styles.heroLead}>
                También somos una plataforma ciudadana donde cualquier persona puede
                enviar información o proponer reportajes sin identificación obligatoria.
              </p>
              <Link href="/sobre" className={styles.cta}>
                Sobre el proyecto
              </Link>
            </div>
            <figure className={styles.heroFigure}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/memorandum-hero/1200/800"
                alt="Fotografía editorial de portada"
                className={styles.heroImage}
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Bloque complementario: imagen a la izquierda, texto a la derecha */}
      <section className={styles.feature} aria-label="Qué hacemos">
        <div className="container">
          <div className={styles.featureGrid}>
            <figure className={styles.featureFigure}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/memorandum-ciudadano/900/600?grayscale"
                alt="Imagen sobre participación ciudadana"
                className={styles.featureImage}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className={styles.featureText}>
              <h2 className={styles.featureTitle}>
                Un archivo vivo de acontecimientos
              </h2>
              <p className={styles.featureLead}>
                Construimos un registro de noticias verificadas, investigaciones
                documentadas, análisis rigurosos, testimonios ciudadanos y revisiones
                históricas que permanezcan disponibles en el futuro.
              </p>
              <p className={styles.featureLead}>
                Cada aporte se revisa y verifica antes de publicarse. No inventamos
                fuentes ni publicamos contenido ciudadano automáticamente.
              </p>
              <Link href="/buzon" className={styles.cta}>
                Enviar información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de suscripción */}
      <section className={styles.subscribe} aria-label="Suscripción al boletín">
        <div className="container">
          <div className={styles.subscribeInner}>
            <span className={styles.subscribeLabel}>Suscríbete</span>
            <form
              className={styles.subscribeForm}
              action="/api/newsletter"
              method="post"
            >
              <label htmlFor="newsletter-email" className="visually-hidden">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="tu@correo.es"
                className={styles.subscribeInput}
                autoComplete="email"
              />
              <button type="submit" className={styles.subscribeButton}>
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
