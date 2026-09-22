import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage/SectionPage";

export const metadata: Metadata = {
  title: "Archivo",
  description: "Archivo generacional: memoria documental y fondos históricos.",
};

export default function ArchivoPage() {
  return (
    <SectionPage
      slug="archivo"
      title="Archivo"
      description="Archivo generacional y memoria documental: fondos, colecciones y materiales de archivo."
    />
  );
}
