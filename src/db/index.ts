import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Cliente de base de datos.
 * Si DATABASE_URL no está configurada, `db` es null y las
 * consultas deben degradar a contenido de demostración.
 */

const databaseUrl = process.env.DATABASE_URL;

export const isDatabaseConfigured = Boolean(databaseUrl);

const client = databaseUrl
  ? postgres(databaseUrl, { max: 10, prepare: false })
  : null;

export const db = client ? drizzle(client, { schema }) : null;

export type Db = NonNullable<typeof db>;
