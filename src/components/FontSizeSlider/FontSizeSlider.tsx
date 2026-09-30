"use client";

import { useEffect, useState } from "react";
import { type FontSize, FONT_SIZE_COOKIE } from "@/lib/fontSize";
import styles from "./FontSizeSlider.module.css";

const YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

const INDEX_BY_SIZE: Record<FontSize, number> = { p: 0, m: 1, g: 2 };
const SIZE_BY_INDEX: Record<number, FontSize> = { 0: "p", 1: "m", 2: "g" };
const LABEL_BY_SIZE: Record<FontSize, string> = {
  p: "Tamaño de letra pequeño",
  m: "Tamaño de letra mediano",
  g: "Tamaño de letra grande",
};

function setFontSizeCookie(size: FontSize) {
  const expires = new Date(Date.now() + YEAR_IN_SECONDS * 1000).toUTCString();
  document.cookie = `${FONT_SIZE_COOKIE}=${size};path=/;expires=${expires};SameSite=Lax`;
}

export function FontSizeSlider({ initialFontSize }: { initialFontSize: FontSize }) {
  const [fontSize, setFontSize] = useState<FontSize>(initialFontSize);

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
    setFontSizeCookie(fontSize);
  }, [fontSize]);

  const index = INDEX_BY_SIZE[fontSize];

  return (
    <div className={styles.wrapper} title={LABEL_BY_SIZE[fontSize]}>
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={index}
        onChange={(e) => {
          const next = SIZE_BY_INDEX[Number(e.target.value)];
          if (next) setFontSize(next);
        }}
        className={styles.slider}
        aria-label={LABEL_BY_SIZE[fontSize]}
      />
      <span className={styles.badge} aria-hidden="true">
        {fontSize.toUpperCase()}
      </span>
    </div>
  );
}
