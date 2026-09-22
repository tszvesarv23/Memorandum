import { redirect } from "next/navigation";
import { getSessionUser, type SessionUser } from "./session";
import type { UserRole } from "@/db/schema";

/**
 * RBAC — jerarquía de roles del staff editorial.
 * ADMIN > EDITOR > REVIEWER > AUTHOR
 *
 * - AUTHOR:   crea y edita sus artículos (borrador/revisión)
 * - REVIEWER: + revisa el buzón ciudadano
 * - EDITOR:   + publica, edita cualquier artículo
 * - ADMIN:    + gestión de usuarios y configuración
 */

const ROLE_RANK: Record<UserRole, number> = {
  AUTHOR: 1,
  REVIEWER: 2,
  EDITOR: 3,
  ADMIN: 4,
};

export function hasRole(user: SessionUser, minimum: UserRole): boolean {
  return ROLE_RANK[user.role] >= ROLE_RANK[minimum];
}

/** Exige sesión; redirige a /admin/login si no la hay. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Exige sesión + rol mínimo; 403 implícito vía redirect con aviso. */
export async function requireRole(minimum: UserRole): Promise<SessionUser> {
  const user = await requireUser();
  if (!hasRole(user, minimum)) redirect("/admin?denied=1");
  return user;
}
