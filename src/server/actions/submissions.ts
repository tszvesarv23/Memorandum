"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import {
  submissions,
  submissionNotes,
  submissionCategoryEnum,
  submissionStatusEnum,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/server/auth/rbac";
import { audit } from "@/server/audit";

/**
 * Buzón ciudadano — minimización de datos:
 * la IP se guarda solo como hash con sal y caduca a las 72 h.
 */

const IP_HASH_RETENTION_MS = 72 * 60 * 60 * 1000;

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "memorandum-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

const tipSchema = z.object({
  title: z.string().trim().max(200).optional(),
  description: z.string().trim().min(20).max(10000),
  approximateDate: z.string().trim().max(100).optional(),
  approximatePlace: z.string().trim().max(200).optional(),
  category: z.enum(submissionCategoryEnum.enumValues).default("NEWS_TIP"),
  contactMethod: z.string().trim().max(300).optional(),
});

export async function submitTipAction(formData: FormData): Promise<void> {
  const parsed = tipSchema.safeParse({
    title: formData.get("title") || undefined,
    description: formData.get("description"),
    approximateDate: formData.get("approximateDate") || undefined,
    approximatePlace: formData.get("approximatePlace") || undefined,
    category: formData.get("category") || "NEWS_TIP",
    contactMethod: formData.get("contactMethod") || undefined,
  });

  if (!parsed.success || !db) {
    redirect("/buzon?estado=error");
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "";

  await db.insert(submissions).values({
    title: parsed.data.title ?? null,
    description: parsed.data.description,
    category: parsed.data.category,
    approximateDate: parsed.data.approximateDate ?? null,
    approximatePlace: parsed.data.approximatePlace ?? null,
    contactMethod: parsed.data.contactMethod ?? null,
    ipHash: ip ? hashIp(ip) : null,
    ipHashExpiresAt: ip ? new Date(Date.now() + IP_HASH_RETENTION_MS) : null,
  });

  await audit({ action: "submission.create", entityType: "submission" });
  redirect("/buzon?estado=ok");
}

const statusSchema = z.object({
  submissionId: z.string().uuid(),
  status: z.enum(submissionStatusEnum.enumValues),
});

export async function setSubmissionStatusAction(formData: FormData): Promise<void> {
  const user = await requireRole("REVIEWER");
  if (!db) return;

  const parsed = statusSchema.safeParse({
    submissionId: formData.get("submissionId"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;

  await db
    .update(submissions)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(submissions.id, parsed.data.submissionId));

  await audit({
    actorId: user.id,
    action: "submission.status",
    entityType: "submission",
    entityId: parsed.data.submissionId,
    metadata: { status: parsed.data.status },
  });

  revalidatePath("/admin/buzon");
  revalidatePath(`/admin/buzon/${parsed.data.submissionId}`);
}

const noteSchema = z.object({
  submissionId: z.string().uuid(),
  body: z.string().trim().min(1).max(5000),
});

export async function addSubmissionNoteAction(formData: FormData): Promise<void> {
  const user = await requireRole("REVIEWER");
  if (!db) return;

  const parsed = noteSchema.safeParse({
    submissionId: formData.get("submissionId"),
    body: formData.get("body"),
  });
  if (!parsed.success) return;

  await db.insert(submissionNotes).values({
    submissionId: parsed.data.submissionId,
    authorId: user.id,
    body: parsed.data.body,
  });

  revalidatePath(`/admin/buzon/${parsed.data.submissionId}`);
}
