import { defineConfig } from "drizzle-kit";

// drizzle-kit no carga .env por sí mismo en todos los contextos.
if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile?.(".env");
  } catch {
    // sin .env — se usan las variables del shell
  }
}

const url = process.env.DATABASE_URL ?? "";
const isPglite = url.startsWith("pglite:");

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  ...(isPglite ? { driver: "pglite" as const } : {}),
  dbCredentials: {
    // Con driver pglite, `url` es el directorio de datos (o memory://)
    url: isPglite ? url.slice("pglite:".length) : url,
  },
  strict: true,
  verbose: true,
});
