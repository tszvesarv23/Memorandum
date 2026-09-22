import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Cliente de base de datos.
 *
 * - DATABASE_URL="postgres://…"  → Postgres real (postgres-js)
 * - DATABASE_URL="pglite:<dir>"  → Postgres embebido (PGlite), solo fuera
 *   de producción; en `next build`/`start` se ignora y se usa demo.
 * - Sin DATABASE_URL             → `db` es null y las consultas degradan
 *   a contenido de demostración.
 */

// Carga .env cuando el runner no lo hace (tsx, drizzle-kit). No pisa
// variables ya definidas en el entorno.
if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile?.(".env");
  } catch {
    // sin .env — nada que cargar
  }
}

const databaseUrl = process.env.DATABASE_URL;

const pgliteDir = databaseUrl?.startsWith("pglite:")
  ? databaseUrl.slice("pglite:".length)
  : null;

// PGlite es single-proceso: los workers paralelos de `next build`
// bloquearían el directorio de datos, así que solo se activa en dev.
const pgliteEnabled =
  pgliteDir !== null && process.env.NODE_ENV !== "production";

export const isDatabaseConfigured =
  Boolean(databaseUrl) && (pgliteDir === null || pgliteEnabled);

export type Db = PostgresJsDatabase<typeof schema>;

// Singleton en globalThis: evita re-instanciar PGlite (que bloquea el
// directorio de datos) tras cada recarga de módulos en `next dev`.
const globalForDb = globalThis as unknown as {
  __memorandumDb: Db | null | undefined;
};

function createDb(): Db | null {
  if (!isDatabaseConfigured || !databaseUrl) return null;
  if (pgliteDir && pgliteEnabled) {
    return drizzlePglite(new PGlite(pgliteDir), { schema }) as unknown as Db;
  }
  return drizzlePostgres(postgres(databaseUrl, { max: 10, prepare: false }), {
    schema,
  });
}

export const db: Db | null =
  globalForDb.__memorandumDb ?? (globalForDb.__memorandumDb = createDb());
