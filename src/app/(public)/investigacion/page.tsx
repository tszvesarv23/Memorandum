import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage/SectionPage";

export const metadata: Metadata = {
  title: "Investigación",
  description: "Reportajes, investigaciones y análisis propios.",
};

export default function InvestigacionPage() {
  return (
    <SectionPage
      slug="investigacion"
      title="Investigación y análisis"
      description="Trabajos propios de investigación, análisis de datos y reportajes en profundidad."
    />
  );
}
