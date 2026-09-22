import { db } from "@/db";
import { auditLogs } from "@/db/schema";

/**
 * Registro de auditoría — acciones administrativas relevantes.
 * Mínimo por diseño: sin payloads de contenido ni datos personales.
 * Nunca debe romper la acción principal: errores solo a consola.
 */

export interface AuditEntry {
  actorId?: string | null;
  /** p.ej. "article.publish", "submission.status", "auth.login_failed" */
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}

export async function audit(entry: AuditEntry): Promise<void> {
  if (!db) return;
  try {
    await db.insert(auditLogs).values({
      actorId: entry.actorId ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      metadata: entry.metadata ?? null,
    });
  } catch (error) {
    console.error("[audit] fallo al registrar", entry.action, error);
  }
}
