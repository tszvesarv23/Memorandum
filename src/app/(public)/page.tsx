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

      {/* ÚLTIMAS INFORMACIONES + Ceuta ahora */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <div>
              <SectionHeader title="Últimas informaciones" href="/actualidad" />
              <ArticleList articles={latest} layout="stack" />
            </div>
            <aside aria-label="Ceuta ahora">
              <SectionHeader title="Ceuta ahora" href="/actualidad" />
              <ArticleList articles={ceuta} layout="stack" />
            </aside>
          </div>
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
