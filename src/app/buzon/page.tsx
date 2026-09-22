import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Buzón confidencial",
  description:
    "Envía información, fotografías, vídeos o documentos a la redacción. Sin registro, con minimización de datos.",
};

/**
 * Buzón ciudadano — página informativa + formulario.
 * FASE 4: implementación completa con uploads firmados a R2,
 * Turnstile, sanitización de metadatos y cola de revisión.
 */
export default function BuzonPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Buzón" }]} />
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 className={styles.title}>Buzón confidencial</h1>
          <p className={styles.lede}>
            Un canal para enviar información a la redacción sin crear una
            cuenta. Diseñado para minimizar la identificación del remitente.
          </p>
        </header>

        <div className={styles.columns}>
          <div className={styles.main}>
            {/* TODO(FASE 4): formulario funcional con uploads firmados */}
            <form className={styles.form} action="/api/submissions" method="post">
              <div className={styles.field}>
                <label htmlFor="buzon-titulo" className={styles.label}>
                  Título <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  id="buzon-titulo"
                  name="title"
                  type="text"
                  maxLength={200}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="buzon-descripcion" className={styles.label}>
                  Descripción de la información <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="buzon-descripcion"
                  name="description"
                  required
                  rows={7}
                  maxLength={10000}
                  className={styles.textarea}
                  aria-describedby="buzon-descripcion-ayuda"
                />
                <p id="buzon-descripcion-ayuda" className={styles.help}>
                  Qué ocurrió, qué documenta el material y por qué es relevante.
                </p>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="buzon-fecha" className={styles.label}>
                    Fecha aproximada <span className={styles.optional}>(opcional)</span>
                  </label>
                  <input
                    id="buzon-fecha"
                    name="approximateDate"
                    type="text"
                    placeholder="p. ej. «marzo de 2025»"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="buzon-lugar" className={styles.label}>
                    Lugar aproximado <span className={styles.optional}>(opcional)</span>
                  </label>
                  <input
                    id="buzon-lugar"
                    name="approximatePlace"
                    type="text"
                    placeholder="p. ej. «barrio del Príncipe»"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="buzon-categoria" className={styles.label}>
                  Categoría
                </label>
                <select id="buzon-categoria" name="category" className={styles.input}>
                  <option value="NEWS_TIP">Información / noticia</option>
                  <option value="DOCUMENT">Documento</option>
                  <option value="PHOTO">Fotografías</option>
                  <option value="VIDEO">Vídeo</option>
                  <option value="CORRECTION">Corrección</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="buzon-archivos" className={styles.label}>
                  Archivos <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  id="buzon-archivos"
                  name="files"
                  type="file"
                  multiple
                  className={styles.input}
                  aria-describedby="buzon-archivos-ayuda"
                  disabled
                />
                <p id="buzon-archivos-ayuda" className={styles.help}>
                  La subida de archivos se activará con el sistema de
                  almacenamiento seguro (FASE 4).
                </p>
              </div>

              <div className={styles.field}>
                <label htmlFor="buzon-contacto" className={styles.label}>
                  Método de contacto{" "}
                  <span className={styles.optional}>(voluntario)</span>
                </label>
                <input
                  id="buzon-contacto"
                  name="contactMethod"
                  type="text"
                  className={styles.input}
                  aria-describedby="buzon-contacto-ayuda"
                />
                <p id="buzon-contacto-ayuda" className={styles.help}>
                  Solo si quieres que la redacción pueda responderte.
                </p>
              </div>

              <button type="submit" className={styles.submit} disabled>
                Enviar información
              </button>
              <p className={styles.pending}>
                El envío se habilitará cuando el canal seguro esté operativo.
              </p>
            </form>
          </div>

          <aside className={styles.sidebar} aria-label="Qué debes saber">
            <div className={styles.note}>
              <h2 className={styles.noteTitle}>Qué recogemos y qué no</h2>
              <ul className={styles.noteList} role="list">
                <li>No pedimos nombre, correo, teléfono ni DNI.</li>
                <li>El contacto es siempre voluntario.</li>
                <li>Los archivos se guardan en almacenamiento privado, separado del contenido público.</li>
                <li>Los metadatos (GPS, dispositivo, fecha) se eliminan de las copias de trabajo.</li>
                <li>Nada se publica automáticamente: todo pasa por revisión humana.</li>
              </ul>
            </div>
            <div className={styles.note}>
              <h2 className={styles.noteTitle}>Sobre el anonimato</h2>
              <p className={styles.noteText}>
                Este sistema minimiza la identificación, pero no puede
                garantizar anonimato absoluto: ningún canal web puede
                prometerlo. Si necesitas un nivel de protección excepcional,
                indícalo en la descripción y la redacción valorará un canal
                reforzado.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
