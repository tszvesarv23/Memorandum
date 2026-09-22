"use client";

import { useActionState } from "react";
import { articleTypeEnum } from "@/db/schema";
import { articleTypeLabels } from "@/config/site";
import type { ArticleFormState } from "@/server/actions/articles";
import { TiptapEditor } from "./TiptapEditor";
import styles from "@/app/admin/admin.module.css";

interface CategoryOption {
  id: string;
  name: string;
}

export interface ArticleFormInitial {
  title: string;
  slug: string;
  type: string;
  lede: string | null;
  categoryId: string;
  seoTitle: string | null;
  seoDescription: string | null;
  body: Record<string, unknown> | null;
}

interface ArticleFormProps {
  categories: CategoryOption[];
  action: (prev: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  initial?: ArticleFormInitial;
  submitLabel: string;
  showChangeNote?: boolean;
}

const initialState: ArticleFormState = {};

export function ArticleForm({
  categories,
  action,
  initial,
  submitLabel,
  showChangeNote,
}: ArticleFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={styles.form}>
      {state.error ? (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      ) : null}

      <div className={styles.field}>
        <label htmlFor="af-title" className={styles.label}>
          Titular *
        </label>
        <input
          id="af-title"
          name="title"
          type="text"
          required
          maxLength={300}
          defaultValue={initial?.title}
          className={styles.input}
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="af-slug" className={styles.label}>
            Slug
          </label>
          <input
            id="af-slug"
            name="slug"
            type="text"
            maxLength={140}
            defaultValue={initial?.slug}
            placeholder="se genera del titular si vacío"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="af-type" className={styles.label}>
            Tipo editorial *
          </label>
          <select
            id="af-type"
            name="type"
            required
            defaultValue={initial?.type ?? "NEWS"}
            className={styles.select}
          >
            {articleTypeEnum.enumValues.map((t) => (
              <option key={t} value={t}>
                {articleTypeLabels[t] ?? t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="af-category" className={styles.label}>
          Sección *
        </label>
        <select
          id="af-category"
          name="categoryId"
          required
          defaultValue={initial?.categoryId ?? ""}
          className={styles.select}
        >
          <option value="" disabled>
            Selecciona sección
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="af-lede" className={styles.label}>
          Entradilla
        </label>
        <textarea
          id="af-lede"
          name="lede"
          rows={3}
          maxLength={600}
          defaultValue={initial?.lede ?? ""}
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Cuerpo *</span>
        <TiptapEditor name="bodyJson" initialDoc={initial?.body} />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="af-seo-title" className={styles.label}>
            SEO — título
          </label>
          <input
            id="af-seo-title"
            name="seoTitle"
            type="text"
            maxLength={300}
            defaultValue={initial?.seoTitle ?? ""}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="af-seo-desc" className={styles.label}>
            SEO — descripción
          </label>
          <input
            id="af-seo-desc"
            name="seoDescription"
            type="text"
            maxLength={400}
            defaultValue={initial?.seoDescription ?? ""}
            className={styles.input}
          />
        </div>
      </div>

      {showChangeNote ? (
        <div className={styles.field}>
          <label htmlFor="af-note" className={styles.label}>
            Nota de cambio (para el historial)
          </label>
          <input
            id="af-note"
            name="changeNote"
            type="text"
            maxLength={300}
            className={styles.input}
          />
        </div>
      ) : null}

      <div className={styles.actions}>
        <button type="submit" className={styles.btn} disabled={pending}>
          {pending ? "Guardando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
