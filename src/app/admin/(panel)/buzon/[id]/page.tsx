import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { submissionStatusEnum } from "@/db/schema";
import { getAdminSubmission } from "@/server/admin";
import {
  setSubmissionStatusAction,
  addSubmissionNoteAction,
} from "@/server/actions/submissions";
import { formatDateTime } from "@/lib/format";
import styles from "../../../admin.module.css";

export const metadata: Metadata = {
  title: "Envío — Panel editorial",
  robots: { index: false, follow: false },
};

const statusLabels: Record<string, string> = {
  PENDING_REVIEW: "Pendiente de revisión",
  UNDER_REVIEW: "En revisión",
  VERIFIED: "Verificado",
  REJECTED: "Descartado",
  ARCHIVED: "Archivado",
  PUBLISHED: "Publicado",
};

const categoryLabels: Record<string, string> = {
  NEWS_TIP: "Información / noticia",
  DOCUMENT: "Documento",
  PHOTO: "Fotografías",
  VIDEO: "Vídeo",
  CORRECTION: "Corrección",
  OTHER: "Otro",
};

interface SubmissionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmissionDetailPage({
  params,
}: SubmissionDetailPageProps) {
  const { id } = await params;
  const submission = await getAdminSubmission(id);
  if (!submission) notFound();

  return (
    <>
      <h1 className={styles.pageTitle}>
        {submission.title || "Envío sin título"}
      </h1>

      <p className={styles.meta}>
        <span>{categoryLabels[submission.category] ?? submission.category}</span>
        <span>Recibido: {formatDateTime(submission.createdAt.toISOString())}</span>
        {submission.approximateDate ? (
          <span>Fecha aprox.: {submission.approximateDate}</span>
        ) : null}
        {submission.approximatePlace ? (
          <span>Lugar aprox.: {submission.approximatePlace}</span>
        ) : null}
        {submission.contactMethod ? (
          <span>Contacto: {submission.contactMethod}</span>
        ) : null}
      </p>

      <div className={styles.body}>{submission.description}</div>

      <h2 className={styles.sectionTitle}>Estado</h2>
      <form action={setSubmissionStatusAction} className={styles.actions}>
        <input type="hidden" name="submissionId" value={submission.id} />
        <select
          name="status"
          defaultValue={submission.status}
          className={styles.select}
          style={{ maxWidth: "260px" }}
        >
          {submissionStatusEnum.enumValues.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s] ?? s}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.btn}>
          Cambiar estado
        </button>
      </form>

      <h2 className={styles.sectionTitle}>Notas internas</h2>
      <p className={styles.pageDesc}>
        Solo visibles para la redacción. Nunca se publican.
      </p>

      {submission.notes.length === 0 ? (
        <p className={styles.notice}>Sin notas todavía.</p>
      ) : (
        submission.notes.map((note) => (
          <div key={note.id} className={styles.noteItem}>
            <p>{note.body}</p>
            <p className={styles.noteMeta}>
              {note.authorName ?? "—"} ·{" "}
              {formatDateTime(note.createdAt.toISOString())}
            </p>
          </div>
        ))
      )}

      <form action={addSubmissionNoteAction} className={styles.form}>
        <input type="hidden" name="submissionId" value={submission.id} />
        <div className={styles.field}>
          <label htmlFor="note-body" className={styles.label}>
            Añadir nota
          </label>
          <textarea
            id="note-body"
            name="body"
            rows={3}
            required
            maxLength={5000}
            className={styles.textarea}
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={`${styles.btn} ${styles.btnSecondary}`}>
            Guardar nota
          </button>
        </div>
      </form>

      <p style={{ marginTop: "var(--space-5)" }}>
        <Link href="/admin/buzon">← Volver a la cola</Link>
      </p>
    </>
  );
}
