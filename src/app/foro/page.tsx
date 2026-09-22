import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Foro",
  description: "Espacio de debate y participación ciudadana.",
};

export default function ForoPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Foro" }]} />
      <header className={styles.header}>
        <h1 className={styles.title}>Foro</h1>
        <p className={styles.description}>
          Espacio de debate ciudadano. Actualmente en preparación: se abrirá con
          una política de moderación clara y reglas de participación públicas.
        </p>
      </header>
      <div className={styles.notice}>
        <p>
          {/* TODO(fase posterior): implementar foro con moderación editorial */}
          El foro se activará cuando exista un sistema de moderación capaz de
          garantizar un debate civil y veraz. Mientras tanto, puedes participar
          a través del <Link href="/buzon">buzón confidencial</Link>.
        </p>
      </div>
    </div>
  );
}
