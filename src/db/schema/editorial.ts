import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

/**
 * Núcleo editorial: artículos, revisiones, categorías,
 * etiquetas, autores, fuentes, documentos y media.
 */

export const articleStatusEnum = pgEnum("article_status", [
  "DRAFT",
  "REVIEW",
  "SCHEDULED",
  "PUBLISHED",
  "ARCHIVED",
]);

/**
 * Tipo editorial — distingue noticia de opinión/análisis.
 * Nunca presentar opinión como información objetiva.
 */
export const articleTypeEnum = pgEnum("article_type", [
  "NEWS",
  "ANALYSIS",
  "OPINION",
  "INVESTIGATION",
  "FEATURE",
  "CHRONICLE",
  "TIMELINE",
  "DOCUMENT",
  "HISTORICAL",
  "CITIZEN",
]);

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  /** Orden en navegación */
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const authors = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role"),
  bio: text("bio"),
  avatarMediaId: uuid("avatar_media_id"),
  /** Vínculo opcional con cuenta de staff */
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  /** Clave en el bucket público de R2 */
  storageKey: text("storage_key").notNull().unique(),
  kind: text("kind").notNull(), // image | video | audio
  mimeType: text("mime_type").notNull(),
  width: integer("width"),
  height: integer("height"),
  sizeBytes: integer("size_bytes"),
  alt: text("alt").notNull().default(""),
  caption: text("caption"),
  credit: text("credit"),
  uploadedById: uuid("uploaded_by_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    type: articleTypeEnum("type").notNull().default("NEWS"),
    status: articleStatusEnum("status").notNull().default("DRAFT"),
    title: text("title").notNull(),
    lede: text("lede"),
    /** Contenido Tiptap serializado (JSON) */
    body: jsonb("body").notNull(),
    /** HTML renderizado en servidor para lectura pública */
    bodyHtml: text("body_html"),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
    authorId: uuid("author_id").references(() => authors.id, {
      onDelete: "set null",
    }),
    coverMediaId: uuid("cover_media_id").references(() => media.id, {
      onDelete: "set null",
    }),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    /** Contenido de demostración — nunca presentar como noticia real */
    isDemo: boolean("is_demo").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    createdById: uuid("created_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    updatedById: uuid("updated_by_id").references(() => users.id, {
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
    uniqueIndex("articles_category_slug_idx").on(t.categoryId, t.slug),
    index("articles_status_published_idx").on(t.status, t.publishedAt),
    index("articles_type_idx").on(t.type),
  ],
);

/** Control de versiones: quién modificó qué y cuándo */
export const articleRevisions = pgTable(
  "article_revisions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    version: integer("version").notNull(),
    title: text("title").notNull(),
    lede: text("lede"),
    body: jsonb("body").notNull(),
    changeNote: text("change_note"),
    editedById: uuid("edited_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("article_revisions_version_idx").on(t.articleId, t.version)],
);

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const articleTags = pgTable(
  "article_tags",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("article_tags_pk").on(t.articleId, t.tagId)],
);

export const sources = pgTable("sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  publisher: text("publisher"),
  url: text("url"),
  accessedAt: timestamp("accessed_at", { withTimezone: true }),
  publicationDate: timestamp("publication_date", { withTimezone: true }),
  /** BOE, Congreso, tribunales, organismos públicos… */
  officialSource: boolean("official_source").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const articleSources = pgTable(
  "article_sources",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "cascade" }),
    position: integer("position").notNull().default(0),
  },
  (t) => [uniqueIndex("article_sources_pk").on(t.articleId, t.sourceId)],
);

/** Repositorio documental: informes, BOE, mapas, fotografías históricas */
export const documentKindEnum = pgEnum("document_kind", [
  "OFFICIAL",
  "REPORT",
  "RESOLUTION",
  "PHOTOGRAPH",
  "MAP",
  "LETTER",
  "OTHER",
]);

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  kind: documentKindEnum("kind").notNull().default("OTHER"),
  /** Clave en R2 (public-media o archives) */
  storageKey: text("storage_key"),
  externalUrl: text("external_url"),
  issuingBody: text("issuing_body"),
  issuedAt: timestamp("issued_at", { withTimezone: true }),
  officialSource: boolean("official_source").notNull().default(false),
  isDemo: boolean("is_demo").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const articleDocuments = pgTable(
  "article_documents",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("article_documents_pk").on(t.articleId, t.documentId)],
);

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type ArticleStatus = (typeof articleStatusEnum.enumValues)[number];
export type ArticleType = (typeof articleTypeEnum.enumValues)[number];
export type Category = typeof categories.$inferSelect;
export type Author = typeof authors.$inferSelect;
export type Source = typeof sources.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type Media = typeof media.$inferSelect;
