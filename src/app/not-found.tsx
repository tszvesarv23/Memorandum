import Link from "next/link";

/**
 * 404 raíz — para rutas que no coinciden con ningún segmento.
 * Autocontenida: el root layout no incluye cabecera/pie.
 */
export default function RootNotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "var(--font-ui, system-ui, sans-serif)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6 }}>
        Error 404
      </p>
      <h1 style={{ fontFamily: "var(--font-display, Georgia, serif)", fontSize: "2rem", margin: 0 }}>
        Página no encontrada
      </h1>
      <p style={{ maxWidth: "40ch", opacity: 0.75 }}>
        La dirección que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "0.5rem",
          padding: "0.6rem 1.4rem",
          background: "var(--color-ink, #1a1a1a)",
          color: "var(--color-text-inverse, #fff)",
          textDecoration: "none",
        }}
      >
        Volver a la portada
      </Link>
    </main>
  );
}
