"use client";

import { useState } from "react";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import styles from "./SiteHeader.module.css";

function MagnifyingGlassIcon({ className }: { className?: string | undefined }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SearchToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.searchToggle}>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="Buscar"
        aria-expanded={open}
        aria-controls="header-search-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <MagnifyingGlassIcon className={styles.iconButtonIcon} />
      </button>
      {open && (
        <div
          id="header-search-panel"
          className={styles.searchPanel}
          role="region"
          aria-label="Buscador"
        >
          <div className="container">
            <p className={styles.searchHint}>
              Escribe palabras clave y pulsa Enter para buscar artículos,
              documentos e historia.
            </p>
            <SearchBox wide inverse />
          </div>
        </div>
      )}
    </div>
  );
}
