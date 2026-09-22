/**
 * Tipos de dominio para la capa de presentación.
 * Desacoplados del esquema Drizzle para que la UI pueda
 * consumir tanto datos reales como contenido de demostración.
 */

export type ArticleTypeLabel =
  | "NEWS"
  | "ANALYSIS"
  | "OPINION"
  | "INVESTIGATION"
  | "FEATURE"
  | "CHRONICLE"
  | "TIMELINE"
  | "DOCUMENT"
  | "HISTORICAL"
  | "CITIZEN";

export interface CategoryRef {
  slug: string;
  name: string;
}

export interface AuthorRef {
  slug: string;
  name: string;
  role?: string | undefined;
}

export interface MediaRef {
  src: string;
  alt: string;
  caption?: string | undefined;
  credit?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
}

export interface SourceRef {
  title: string;
  publisher?: string | undefined;
  url?: string | undefined;
  accessedAt?: string | undefined;
  publicationDate?: string | undefined;
  officialSource: boolean;
  notes?: string | undefined;
}

export interface ArticleCardData {
  slug: string;
  type: ArticleTypeLabel;
  title: string;
  lede?: string | undefined;
  category: CategoryRef;
  author?: AuthorRef | undefined;
  cover?: MediaRef | undefined;
  publishedAt: string; // ISO 8601
  isDemo: boolean;
}

export interface ArticleDetailData extends ArticleCardData {
  /** Cuerpo del artículo en HTML sanitizado (procedente de Tiptap) */
  bodyHtml: string;
  updatedAt?: string | undefined;
  tags?: { slug: string; name: string }[] | undefined;
  sources?: SourceRef[] | undefined;
}

export interface TimelineEntryData {
  dateLabel: string;
  title: string;
  description?: string | undefined;
}

export interface DocumentCardData {
  slug: string;
  title: string;
  description?: string | undefined;
  kind: string;
  issuingBody?: string | undefined;
  issuedAt?: string | undefined;
  officialSource: boolean;
  isDemo: boolean;
}
