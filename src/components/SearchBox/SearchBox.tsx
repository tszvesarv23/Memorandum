import styles from "./SearchBox.module.css";

/**
 * Buscador global — formulario GET hacia /buscar.
 * Server-rendered; la página de resultados usa PostgreSQL FTS.
 */
export function SearchBox() {
  return (
    <form action="/buscar" method="get" role="search" className={styles.form}>
      <label htmlFor="site-search" className="visually-hidden">
        Buscar en Memorandum
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder="Buscar…"
        autoComplete="off"
        className={styles.input}
      />
      <button type="submit" className={styles.button} aria-label="Buscar">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
}
