import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { ArticleHero } from "@/components/ArticleHero/ArticleHero";
import { ArticleList } from "@/components/ArticleList/ArticleList";
import { CitizenSubmissionCTA } from "@/components/CitizenSubmissionCTA/CitizenSubmissionCTA";
import { DocumentCard } from "@/components/DocumentCard/DocumentCard";
import { Newsletter } from "@/components/Newsletter/Newsletter";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Timeline } from "@/components/Timeline/Timeline";
import {
  getArticlesByCategory,
  getArticlesByType,
  getFeaturedDocuments,
  getPublishedArticles,
  getTimelinePreview,
} from "@/server/articles";
import styles from "./page.module.css";

/**
 * Portada editorial — composición de ancho completo.
 * Jerarquía: hero prominente → noticia + análisis → últimas/Ceuta →
 * investigación → historia/documentos → buzón → newsletter.
 */
export default async function HomePage() {
  const [all, ceuta, investigation, history, documents, timeline] =
    await Promise.all([
      getPublishedArticles(20),
      getArticlesByCategory("actualidad", 6),
      getArticlesByType("INVESTIGATION", 4),
      getArticlesByType("HISTORICAL", 4),
      getFeaturedDocuments(3),
      getTimelinePreview(),
    ]);

  const [hero, ...rest] = all;
  const latest = rest.slice(0, 6);
  const mainNews = all.find((a) => a.type === "NEWS") ?? rest[0];
  const mainAnalysis = all.find((a) => a.type === "ANALYSIS");
  const mainInvestigation = investigation[0];
  const investigationRest = investigation.slice(1, 4);

  return (
    <main className={styles.home}>
      {hero && hero.cover && (
        <section className={styles.heroSection} aria-label="Noticia principal">
          <figure className={styles.heroFigure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.cover.src}
              alt={hero.cover.alt}
              className={styles.heroImage}
              fetchPriority="high"
              decoding="async"
            />
            {(hero.cover.caption ?? hero.cover.credit) && (
              <figcaption className={styles.heroCaption}>
                {hero.cover.caption}
                {hero.cover.credit && (
                  <span className={styles.heroCredit}> · {hero.cover.credit}</span>
                )}
              </figcaption>
            )}
          </figure>
          <div className="container">
            <ArticleHero article={hero} />
          </div>
        </section>
      )}

      {/* NOTICIA | ANÁLISIS */}
      <section className={styles.section} aria-label="Noticia y análisis">
        <div className="container">
          <div className={styles.splitRow}>
            <article>
              {mainNews && (
                <>
                  <p className={styles.splitLabel}>Noticia</p>
                  <ArticleCard article={mainNews} variant="headline" showImage={false} />
                </>
              )}
            </article>
            <article>
              {mainAnalysis && (
                <>
                  <p className={styles.splitLabel}>Análisis</p>
                  <ArticleCard article={mainAnalysis} variant="headline" showImage={false} />
                </>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* MEMORANDUM | ACTUALIDAD */}
      <section className={styles.section} aria-labelledby="actualidad-heading">
        <div className="container">
          <div className={styles.actualidadGrid}>
            <aside className={styles.manifesto} aria-label="Sobre Memorandum">
              <h2 className={styles.manifestoTitle}>Memorandum</h2>
              <p className={styles.manifestoLede}>
                Documentar el presente para que pueda ser consultado en el futuro.
              </p>
              <div className={styles.manifestoBody}>
                <p>
                  Memorandum es una iniciativa informativa independiente dedicada a contar
                  lo que sucede en España: la actualidad política, nacional e internacional,
                  con una mirada particular en Ceuta, su condición de ciudad de frontera y
                  su lugar en el conjunto del país.
                </p>
                <p>
                  No somos un simple agregador de noticias. Construimos un archivo vivo de
                  acontecimientos: reportajes, investigaciones documentadas, análisis
                  rigurosos, testimonios ciudadanos y revisiones históricas que permanezcan
                  disponibles para quienes quieran consultarlos con el tiempo.
                </p>
                <p>
                  También somos una plataforma ciudadana. Cualquier persona puede enviarnos
                  información sobre sucesos, aportar fotografías, vídeos o documentos, e
                  incluso proponer reportajes libres sobre aquello que considere que debe ser
                  documentado. No exigimos identificación obligatoria: quien lo desee puede
                  colaborar de forma anónima, siempre dentro de los límites legales y
                  éticos que garantizan la veracidad y la responsabilidad de lo publicado.
                </p>
                <p>
                  Cada aporte se revisa, verifica y trata con las mismas reglas
                  periodísticas que el resto de nuestro contenido. La información ciudadana
                  no se publica automáticamente: pasa por un proceso de comprobación antes de
                  formar parte del registro.
                </p>
              </div>
            </aside>
            <div className={styles.actualidadFeed}>
              <SectionHeader title="Actualidad" href="/actualidad" />
              <ArticleList articles={latest} layout="stack" />
            </div>
          </div>
        </div>
      </section>

      {/* CEUTA AHORA */}
      <section className={styles.section} aria-label="Ceuta ahora">
        <div className="container">
          <SectionHeader title="Ceuta ahora" href="/actualidad" />
          <ArticleList articles={ceuta} layout="stack" />
        </div>
      </section>

      {/* INVESTIGACIÓN */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeader title="Investigación" href="/investigacion" />
          <div className={styles.investigationLayout}>
            <div>
              {mainInvestigation && (
                <ArticleCard article={mainInvestigation} variant="headline" />
              )}
            </div>
            <div>
              <ArticleList articles={investigationRest} layout="stack" />
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA / ARCHIVO + Documentos */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.archiveLayout}>
            <div>
              <SectionHeader title="Historia / Revisión" href="/historia" />
              <ArticleList articles={history} layout="stack" />
              <div className={styles.timelineBlock}>
                <h3 className={styles.subTitle}>Cronología destacada</h3>
                <Timeline entries={timeline} />
              </div>
            </div>
            <aside aria-label="Documentos">
              <SectionHeader title="Documentos" href="/documentos" />
              <div className={styles.docList}>
                {documents.map((d) => (
                  <DocumentCard key={d.slug} document={d} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Buzón ciudadano */}
      <section className={styles.ctaSection} aria-label="Buzón ciudadano">
        <div className="container">
          <CitizenSubmissionCTA />
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
