import type { MediaRef } from "@/types/editorial";
import styles from "./ImageFigure.module.css";

interface ImageFigureProps {
  media: MediaRef;
  /** wide: ocupa el ancho del contenedor de portada; inline: columna de lectura */
  layout?: "inline" | "wide";
  priority?: boolean;
}

export function ImageFigure({ media, layout = "inline", priority = false }: ImageFigureProps) {
  return (
    <figure className={layout === "wide" ? styles.wide : styles.figure}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        className={styles.image}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      {(media.caption ?? media.credit) && (
        <figcaption className={styles.caption}>
          {media.caption}
          {media.credit && <span className={styles.credit}> · {media.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
