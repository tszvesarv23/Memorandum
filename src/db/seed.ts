/**
 * Seed inicial: categorías, autores y artículos de demostración.
 * Uso: pnpm db:seed
 * Requiere DATABASE_URL configurada.
 */
import { db, isDatabaseConfigured } from "./index";
import { articles, authors, categories } from "./schema";
import { demoArticles } from "@/server/demo-data";

const seedCategories = [
  { slug: "actualidad", name: "Actualidad", description: "Actualidad y política local de Ceuta." },
  { slug: "espana", name: "España", description: "Política y actualidad nacional." },
  { slug: "mundo", name: "Mundo", description: "Acontecimientos internacionales." },
  { slug: "investigacion", name: "Investigación", description: "Investigaciones y análisis propios." },
  { slug: "historia", name: "Historia", description: "Historia / Revisión con fuentes primarias." },
  { slug: "archivo", name: "Archivo", description: "Archivo generacional y memoria documental." },
];

const seedAuthors = [
  { slug: "redaccion", name: "Redacción Memorandum", role: "Redacción" },
  { slug: "analisis", name: "Equipo de Análisis", role: "Análisis" },
  { slug: "opinion", name: "Columna invitada", role: "Opinión" },
  { slug: "historia", name: "Sección de Historia", role: "Historia / Revisión" },
];

async function main() {
  if (!isDatabaseConfigured || !db) {
    console.error("DATABASE_URL no configurada. Nada que sembrar.");
    process.exit(1);
  }

  console.log("Sembrando categorías…");
  const catRows = await db
    .insert(categories)
    .values(seedCategories)
    .onConflictDoNothing()
    .returning();
  console.log(`  ${catRows.length} categorías insertadas.`);

  console.log("Sembrando autores…");
  const authorRows = await db
    .insert(authors)
    .values(seedAuthors)
    .onConflictDoNothing()
    .returning();
  console.log(`  ${authorRows.length} autores insertados.`);

  const catBySlug = new Map(catRows.map((c) => [c.slug, c.id]));
  const authorBySlug = new Map(authorRows.map((a) => [a.slug, a.id]));

  console.log("Sembrando artículos de demostración…");
  let inserted = 0;
  for (const a of demoArticles) {
    const categoryId = catBySlug.get(a.category.slug);
    if (!categoryId) continue;
    await db
      .insert(articles)
      .values({
        slug: a.slug,
        type: a.type,
        title: a.title,
        lede: a.lede ?? null,
        body: { type: "doc", content: [] },
        bodyHtml: null,
        status: "PUBLISHED",
        isDemo: true,
        publishedAt: new Date(a.publishedAt),
        categoryId,
        authorId: a.author ? (authorBySlug.get(a.author.slug) ?? null) : null,
      })
      .onConflictDoNothing();
    inserted++;
  }
  console.log(`  ${inserted} artículos procesados.`);
  console.log("Seed completado.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
