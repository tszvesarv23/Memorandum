/**
 * Configuración global del sitio y navegación principal.
 */

export const siteConfig = {
  name: "Memorandum",
  tagline: "Periodismo documentado desde Ceuta",
  description:
    "Plataforma editorial independiente: actualidad de Ceuta, España y el mundo, investigación, historia y archivo documental.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es-ES",
} as const;

export interface NavSection {
  slug: string;
  label: string;
  href: string;
}

/** Navegación principal — orden editorial, no alfabético */
export const mainNav: readonly NavSection[] = [
  { slug: "actualidad", label: "Actualidad", href: "/actualidad" },
  { slug: "espana", label: "España", href: "/espana" },
  { slug: "mundo", label: "Mundo", href: "/mundo" },
  { slug: "investigacion", label: "Investigación", href: "/investigacion" },
  { slug: "historia", label: "Historia", href: "/historia" },
  { slug: "documentos", label: "Documentos", href: "/documentos" },
  { slug: "archivo", label: "Archivo", href: "/archivo" },
  { slug: "foro", label: "Foro", href: "/foro" },
] as const;

export const utilityNav: readonly NavSection[] = [
  { slug: "buzon", label: "Buzón", href: "/buzon" },
  { slug: "sobre", label: "Sobre el proyecto", href: "/sobre" },
  { slug: "metodologia", label: "Metodología", href: "/metodologia" },
  { slug: "transparencia", label: "Transparencia", href: "/transparencia" },
] as const;

/** Etiquetas legibles de tipo editorial — nunca ocultar opinión */
export const articleTypeLabels: Record<string, string> = {
  NEWS: "Noticia",
  ANALYSIS: "Análisis",
  OPINION: "Opinión",
  INVESTIGATION: "Investigación",
  FEATURE: "Reportaje",
  CHRONICLE: "Crónica",
  TIMELINE: "Cronología",
  DOCUMENT: "Documento",
  HISTORICAL: "Historia",
  CITIZEN: "Envío ciudadano",
};
