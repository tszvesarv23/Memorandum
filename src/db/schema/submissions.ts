import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

/**
 * Buzón ciudadano — canal potencialmente sensible.
 * Principios: minimización de datos, separación de almacenamiento,
 * revisión humana obligatoria antes de cualquier publicación.
 *
 * NUNCA afirmar anonimato absoluto.
 */

export const submissionStatusEnum = pgEnum("submission_status", [
  "PENDING_REVIEW",
  "UNDER_REVIEW",
  "VERIFIED",
  "REJECTED",
  "ARCHIVED",
  "PUBLISHED",
]);

export const submissionCategoryEnum = pgEnum("submission_category", [
  "NEWS_TIP",
  "DOCUMENT",
  "PHOTO",
  "VIDEO",
  "CORRECTION",
  "OTHER",
]);

export const submissions = pgTable(
  "submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title"),
    description: text("description").notNull(),
    category: submissionCategoryEnum("category")
      .notNull()
      .default("NEWS_TIP"),
    approximateDate: text("approximate_date"),
    approximatePlace: text("approximate_place"),
    /** Contacto voluntario — nunca obligatorio */
    contactMethod: text("contact_method"),
    status: submissionStatusEnum("status")
      .notNull()
      .default("PENDING_REVIEW"),
    /**
     * Hash de IP con sal, retenido solo el tiempo estrictamente
     * necesario para anti-abuso. Nunca la IP en claro.
     */
    ipHash: text("ip_hash"),
    ipHashExpiresAt: timestamp("ip_hash_expires_at", { withTimezone: true }),
    assignedToId: uuid("assigned_to_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("submissions_status_idx").on(t.status),
    index("submissions_created_idx").on(t.createdAt),
  ],
);

export const submissionFileStatusEnum = pgEnum("submission_file_status", [
  "PENDING_SCAN",
  "SCANNED_CLEAN",
  "SANITIZED",
  "QUARANTINED",
  "REJECTED",
]);

export const submissionFiles = pgTable("submission_files", {
  id: uuid("id").defaultRandom().primaryKey(),
  submissionId: uuid("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  /** Nombre aleatorio generado — nunca el nombre del usuario */
  storageKey: text("storage_key").notNull().unique(),
  /** Copia sanitizada (EXIF eliminado) para revisión/publicación */
  sanitizedStorageKey: text("sanitized_storage_key"),
  originalFilename: text("original_filename"),
  mimeType: text("mime_type").notNull(),
  /** MIME detectado por sniffing real, no por cabecera */
  detectedMimeType: text("detected_mime_type"),
  sizeBytes: integer("size_bytes").notNull(),
  sha256: text("sha256").notNull(),
  status: submissionFileStatusEnum("status")
    .notNull()
    .default("PENDING_SCAN"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Notas internas de redacción — NUNCA públicas */
export const submissionNotes = pgTable("submission_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  submissionId: uuid("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Submission = typeof submissions.$inferSelect;
export type SubmissionStatus = (typeof submissionStatusEnum.enumValues)[number];
export type SubmissionFile = typeof submissionFiles.$inferSelect;
export type SubmissionNote = typeof submissionNotes.$inferSelect;
