"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/server/auth/password";
import { createSession, destroySession } from "@/server/auth/session";
import { audit } from "@/server/audit";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!db) {
    return { error: "El panel requiere base de datos configurada (DATABASE_URL)." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Credenciales no válidas." };

  const { email, password } = parsed.data;
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });

  // Misma respuesta para usuario inexistente o contraseña errónea
  const ok = user && !user.disabledAt && (await verifyPassword(password, user.passwordHash));
  if (!ok) {
    await audit({
      action: "auth.login_failed",
      entityType: "user",
      metadata: { email },
    });
    return { error: "Credenciales no válidas." };
  }

  await createSession(user.id);
  await db
    .update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, user.id));
  await audit({ actorId: user.id, action: "auth.login", entityType: "user", entityId: user.id });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
