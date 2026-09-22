import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { articles, documents } from "./editorial";

/**
 * Historia / Revisión — acontecimientos históricos y cronologías.
 * "Revisión" en sentido historiográfico y crítico:
 * fuentes primarias, contexto e interpretaciones contrastadas.
 */

export const historicalEvents = pgTable(
  "historical_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    summary: text("summary"),
    /** Ámbito: ceuta | spain | international */
    scope: text("scope").notNull().default("spain"),
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),
    /** Fecha aproximada cuando no hay precisión documental */
    dateIsApproximate: text("date_is_approximate").notNull().default("false"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("historical_events_scope_idx").on(t.scope)],
);

/** Entradas de una cronología visual */
export const timelineEntries = pgTable(
  "timeline_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => historicalEvents.id, { onDelete: "cascade" }),
    date: timestamp("date", { withTimezone: true }),
    /** Texto libre cuando la fecha es imprecisa: "primavera de 1936" */
    dateLabel: text("date_label"),
    title: text("title").notNull(),
    description: text("description"),
    position: integer("position").notNull().default(0),
    documentId: uuid("document_id").references(() => documents.id, {
      onDelete: "set null",
    }),
  },
  (t) => [index("timeline_entries_event_idx").on(t.eventId, t.position)],
);

/** Vincula artículos de tipo HISTORICAL/TIMELINE con su acontecimiento */
export const articleEvents = pgTable(
  "article_events",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    eventId: uuid("event_id")
      .notNull()
      .references(() => historicalEvents.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("article_events_pk").on(t.articleId, t.eventId)],
);

export type HistoricalEvent = typeof historicalEvents.$inferSelect;
export type TimelineEntry = typeof timelineEntries.$inferSelect;
