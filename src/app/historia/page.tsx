import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage/SectionPage";

export const metadata: Metadata = {
  title: "Historia / Revisión",
  description:
    "Acontecimientos históricos estudiados con fuentes primarias, documentos e historiografía.",
};

export default function HistoriaPage() {
  return (
    <SectionPage
      slug="historia"
      title="Historia / Revisión"
      description="Acontecimientos históricos revisados con fuentes primarias, cronologías, documentos e interpretaciones historiográficas contrastadas."
    />
  );
}
