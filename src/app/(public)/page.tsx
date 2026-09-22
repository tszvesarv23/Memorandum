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
 * Portada editorial.
 * Jerarquía: hero → secundarias → última hora + Ceuta ahora →
 * análisis/investigación → historia + documentos → buzón → newsletter.
 */
export default async function HomePage() {
  const [all, ceuta, analysis, investigation, history, documents, timeline] =
    await Promise.all([
      getPublishedArticles(20),
      getArticlesByCategory("actualidad", 5),
      getArticlesByType("ANALYSIS", 3),
      getArticlesByType("INVESTIGATION", 3),
      getArticlesByType("HISTORICAL", 3),
      getFeaturedDocuments(3),
      getTimelinePreview(),
    ]);

  const [hero, ...rest] = all;
  const secondary = rest.slice(0, 3);
  const latest = rest.slice(3, 9);
  const opinion = all.find((a) => a.type === "OPINION");

  return (
    <div className="container">
      {hero && (
        <section aria-label="Noticia principal" className={styles.heroSection}>
          <ArticleHero article={hero} />
        </section>
      )}

      {/* Secundarias */}
      <section aria-label="Noticias destacadas" className={styles.section}>
        <div className={styles.secondaryGrid}>
          {secondary.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="headline" />
          ))}
        </div>
      </section>

      {/* Última hora + Ceuta ahora */}
      <section className={`${styles.section} ${styles.twoCol}`}>
        <div>
          <SectionHeader title="Últimas noticias" href="/actualidad" />
          <ArticleList articles={latest} layout="stack" />
        </div>
        <aside aria-label="Ceuta ahora">
          <SectionHeader title="Ceuta ahora" href="/actualidad" />
          <ArticleList articles={ceuta} layout="stack" />
          {opinion && (
            <div className={styles.opinionBlock}>
              <p className={styles.opinionLabel}>Opinión</p>
              <ArticleCard article={opinion} variant="compact" />
            </div>
          )}
        </aside>
      </section>

      {/* Análisis e investigación */}
      <section className={styles.section}>
        <SectionHeader title="Análisis e investigación" href="/investigacion" />
        <div className={styles.analysisGrid}>
          {[...analysis, ...investigation].slice(0, 4).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Historia / Revisión + Documentos */}
      <section className={`${styles.section} ${styles.twoCol}`}>
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
      </section>

      {/* Buzón ciudadano */}
      <section className={styles.section} aria-label="Buzón ciudadano">
        <CitizenSubmissionCTA />
      </section>

      <Newsletter />
    </div>
  );
}
