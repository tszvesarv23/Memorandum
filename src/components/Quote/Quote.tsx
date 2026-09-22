import styles from "./Quote.module.css";

interface QuoteProps {
  children: React.ReactNode;
  attribution?: string;
  role?: string;
}

export function Quote({ children, attribution, role }: QuoteProps) {
  return (
    <figure className={styles.figure}>
      <blockquote className={styles.quote}>{children}</blockquote>
      {(attribution ?? role) && (
        <figcaption className={styles.attribution}>
          {attribution}
          {role && <span className={styles.role}> — {role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
