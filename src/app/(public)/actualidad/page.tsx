import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage/SectionPage";

export const metadata: Metadata = {
  title: "Actualidad",
  description: "Actualidad y política local de Ceuta.",
};

export default function ActualidadPage() {
  return (
    <SectionPage
      slug="actualidad"
      title="Actualidad"
      description="Actualidad y política local de Ceuta: ciudad, instituciones y vida pública."
    />
  );
}
