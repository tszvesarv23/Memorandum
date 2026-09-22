import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions, users, type User, type UserRole } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Sesiones de staff: token aleatorio en cookie httpOnly,
 * solo el hash SHA-256 se persiste en base de datos.
 */

export const SESSION_COOKIE = "memorandum_session";

const DEFAULT_TTL_SECONDS = 60 * 60 * 8; // 8 h — jornada editorial

function sessionTtlSeconds(): number {
  const raw = Number(process.env.AUTH_SESSION_TTL_SECONDS);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_TTL_SECONDS;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

/** Crea sesión en BD y fija la cookie. Llamar solo desde server actions. */
export async function createSession(userId: string): Promise<void> {
  if (!db) throw new Error("DATABASE_URL no configurada");

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionTtlSeconds() * 1000);

  await db.insert(sessions).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

/** Elimina la sesión actual (cookie + fila en BD). */
export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  jar.delete(SESSION_COOKIE);
  if (!token || !db) return;
  await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
}

/** Usuario autenticado o null. Seguro en layouts/páginas server. */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (!db) return null;
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      displayName: users.displayName,
      role: users.role,
      disabledAt: users.disabledAt,
      expiresAt: sessions.expiresAt,
      sessionId: sessions.id,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.tokenHash, hashToken(token)))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (row.disabledAt || row.expiresAt.getTime() <= Date.now()) return null;

  return { id: row.id, email: row.email, displayName: row.displayName, role: row.role };
}

export type { User, UserRole };
