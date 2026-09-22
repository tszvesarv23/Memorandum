import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        paddingBlock: "var(--space-8)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          color: "var(--color-muted)",
          letterSpacing: "0.1em",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h1)",
          fontWeight: 700,
          marginTop: "var(--space-3)",
        }}
      >
        Página no encontrada
      </h1>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          color: "var(--color-text-secondary)",
          marginTop: "var(--space-4)",
        }}
      >
        El contenido que buscas no existe o ha sido movido.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "var(--space-6)",
          padding: "var(--space-3) var(--space-5)",
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          color: "var(--color-accent-contrast)",
          background: "var(--color-ink)",
        }}
      >
        Volver a la portada
      </Link>
    </div>
  );
}
