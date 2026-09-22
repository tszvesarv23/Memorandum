import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación" className={styles.nav}>
      {currentPage > 1 && (
        <Link
          href={`${basePath}?pagina=${currentPage - 1}`}
          className={styles.arrow}
          rel="prev"
        >
          ← Anterior
        </Link>
      )}
      <ol className={styles.list} role="list">
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span className={styles.current} aria-current="page">
                {page}
              </span>
            ) : (
              <Link href={`${basePath}?pagina=${page}`} className={styles.page}>
                {page}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?pagina=${currentPage + 1}`}
          className={styles.arrow}
          rel="next"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}
