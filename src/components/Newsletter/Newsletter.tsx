import styles from "./Newsletter.module.css";

/**
 * Suscripción opcional al boletín.
 * TODO(fase posterior): conectar con proveedor de email
 * respetuoso con privacidad o sistema propio de listas.
 */
export function Newsletter() {
  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={styles.inner}>
        <h2 id="newsletter-title" className={styles.title}>
          El resumen de la semana, cada domingo
        </h2>
        <p className={styles.text}>
          Una selección editorial de lo publicado. Sin publicidad, sin
          cesión de datos. Puedes darte de baja cuando quieras.
        </p>
        <form className={styles.form} action="/api/newsletter" method="post">
          <label htmlFor="newsletter-email" className="visually-hidden">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="tu@correo.es"
            className={styles.input}
            autoComplete="email"
          />
          <button type="submit" className={styles.button}>
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
}
