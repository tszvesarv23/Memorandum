import type {
  ArticleCardData,
  DocumentCardData,
  TimelineEntryData,
} from "@/types/editorial";

/**
 * Contenido de demostración.
 * Se usa cuando DATABASE_URL no está configurada y como seed inicial.
 * Todo el contenido está marcado isDemo: true — nunca presentarlo
 * como noticia real.
 */

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3_600_000).toISOString();
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString();

const cat = (slug: string, name: string) => ({ slug, name });

export const demoArticles: ArticleCardData[] = [
  {
    slug: "el-puerto-de-ceuta-y-la-economia-sumergida-del-estrecho",
    type: "INVESTIGATION",
    title:
      "El puerto de Ceuta y la economía del Estrecho: lo que revelan los datos aduaneros",
    lede:
      "Un análisis de los registros portuarios y las cifras de tráfico de mercancías dibuja una realidad económica más compleja de lo que sugieren los titulares habituales.",
    category: cat("actualidad", "Actualidad"),
    author: { slug: "redaccion", name: "Redacción Memorandum", role: "Investigación" },
    publishedAt: hoursAgo(3),
    isDemo: true,
  },
  {
    slug: "la-ciudad-autonoma-aprueba-el-plan-de-movilidad",
    type: "NEWS",
    title: "La Ciudad Autónoma aprueba el plan de movilidad con votos a favor de la oposición",
    lede:
      "El documento, pendiente desde hace dos legislaturas, establece el marco de actuación para la próxima década.",
    category: cat("actualidad", "Actualidad"),
    author: { slug: "redaccion", name: "Redacción Memorandum" },
    publishedAt: hoursAgo(6),
    isDemo: true,
  },
  {
    slug: "congreso-debate-ley-de-administracion-local",
    type: "NEWS",
    title: "El Congreso debate la reforma de la ley de administración local",
    lede:
      "La ponencia ha incorporado una treintena de enmiendas relativas a financiación municipal y competencias autonómicas.",
    category: cat("espana", "España"),
    author: { slug: "redaccion", name: "Redacción Memorandum" },
    publishedAt: hoursAgo(9),
    isDemo: true,
  },
  {
    slug: "cumbre-mediterranea-seguridad-maritima",
    type: "NEWS",
    title: "La cumbre mediterránea acuerda un protocolo conjunto de seguridad marítima",
    lede:
      "Nueve países ribereños firman un mecanismo de coordinación para el tráfico del Estrecho y el Mediterráneo occidental.",
    category: cat("mundo", "Mundo"),
    publishedAt: hoursAgo(14),
    isDemo: true,
  },
  {
    slug: "analisis-la-financiacion-de-las-ciudades-autonomas",
    type: "ANALYSIS",
    title: "La financiación de las ciudades autónomas: un modelo pendiente de revisión",
    lede:
      "Ceuta y Melilla dependen de un sistema de transferencias que los expertos llevan años señalando como insuficiente. Esto es lo que dicen los informes.",
    category: cat("espana", "España"),
    author: { slug: "analisis", name: "Equipo de Análisis", role: "Análisis" },
    publishedAt: daysAgo(1),
    isDemo: true,
  },
  {
    slug: "opinion-la-frontera-como-espejo",
    type: "OPINION",
    title: "La frontera como espejo",
    lede:
      "Hablar de Ceuta es hablar de cómo Europa se mira a sí misma. Una reflexión sobre identidad, perímetro y relato.",
    category: cat("actualidad", "Actualidad"),
    author: { slug: "opinion", name: "Columna invitada", role: "Opinión" },
    publishedAt: daysAgo(1),
    isDemo: true,
  },
  {
    slug: "ceuta-1668-tratado-lisboa",
    type: "HISTORICAL",
    title: "1668: el Tratado de Lisboa y la consolidación de la Ceuta española",
    lede:
      "La revisión de la documentación diplomática del siglo XVII permite reconstruir cómo Ceuta pasó de plaza portuguesa a territorio de la Corona española.",
    category: cat("historia", "Historia"),
    author: { slug: "historia", name: "Sección de Historia", role: "Historia / Revisión" },
    publishedAt: daysAgo(2),
    isDemo: true,
  },
  {
    slug: "cronologia-la-transicion-en-ceuta",
    type: "TIMELINE",
    title: "Cronología: la Transición democrática en Ceuta (1975–1986)",
    lede:
      "De los últimos consejos franquistas a la integración en la CEE: una década decisiva reconstruida a partir de hemeroteca y archivo municipal.",
    category: cat("historia", "Historia"),
    publishedAt: daysAgo(3),
    isDemo: true,
  },
  {
    slug: "los-archivos-municipales-digitalizados",
    type: "FEATURE",
    title: "Los archivos municipales digitalizados que nadie consulta",
    lede:
      "Miles de documentos del siglo XIX y XX ya son accesibles en línea, pero el catálogo sigue siendo un desconocido para investigadores y ciudadanía.",
    category: cat("investigacion", "Investigación"),
    publishedAt: daysAgo(4),
    isDemo: true,
  },
  {
    slug: "gobierno-decreto-vivienda-seguimiento",
    type: "NEWS",
    title: "El Gobierno publica el decreto de vivienda: esto es lo que dice el texto",
    lede:
      "Repasamos el articulado completo y lo contrastamos con el borrador que circuló en octubre.",
    category: cat("espana", "España"),
    publishedAt: daysAgo(1),
    isDemo: true,
  },
  {
    slug: "elecciones-europeas-analisis-participacion",
    type: "ANALYSIS",
    title: "Qué dice la participación electoral sobre la desafección en el sur de Europa",
    lede:
      "Los datos de abstención de la última década muestran patrones comunes en las regiones fronterizas.",
    category: cat("mundo", "Mundo"),
    publishedAt: daysAgo(5),
    isDemo: true,
  },
  {
    slug: "barriada-hadú-rehabilitacion",
    type: "NEWS",
    title: "La rehabilitación de la barriada del Hadú entra en su segunda fase",
    lede:
      "Las obras afectarán a un centenar de viviendas durante los próximos ocho meses, según el calendario publicado.",
    category: cat("actualidad", "Actualidad"),
    publishedAt: hoursAgo(20),
    isDemo: true,
  },
];

export const demoDocuments: DocumentCardData[] = [
  {
    slug: "boe-estatuto-autonomia-ceuta",
    title: "Ley Orgánica 1/1995 — Estatuto de Autonomía de Ceuta",
    description:
      "Texto consolidado del Estatuto de Autonomía, con las reformas posteriores incorporadas.",
    kind: "OFFICIAL",
    issuingBody: "Boletín Oficial del Estado",
    issuedAt: "1995-03-13",
    officialSource: true,
    isDemo: true,
  },
  {
    slug: "informe-puerto-2024",
    title: "Informe anual de tráfico portuario (documento de demostración)",
    description:
      "Ejemplo de informe técnico archivado en el repositorio documental.",
    kind: "REPORT",
    issuingBody: "Autoridad Portuaria",
    officialSource: false,
    isDemo: true,
  },
  {
    slug: "mapa-ceuta-1860",
    title: "Plano de la plaza de Ceuta, c. 1860",
    description:
      "Reproducción digital de un plano histórico de la fortificación y el recinto urbano.",
    kind: "MAP",
    issuingBody: "Archivo histórico (demostración)",
    issuedAt: "1860-01-01",
    officialSource: false,
    isDemo: true,
  },
];

export const demoTimeline: TimelineEntryData[] = [
  {
    dateLabel: "13 de marzo de 1995",
    title: "Publicación del Estatuto de Autonomía",
    description: "La Ley Orgánica 1/1995 dota a Ceuta de su marco autonómico.",
  },
  {
    dateLabel: "1986",
    title: "Ingreso de España en la CEE",
    description: "Ceuta queda integrada con un régimen fiscal y aduanero específico.",
  },
  {
    dateLabel: "1978",
    title: "Constitución española",
    description: "El texto constitucional reconoce a Ceuta como parte del territorio nacional.",
  },
  {
    dateLabel: "1975",
    title: "Fin del franquismo",
    description: "Comienza el proceso de transición democrática en la ciudad.",
  },
];
