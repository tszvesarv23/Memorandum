import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage/SectionPage";

export const metadata: Metadata = {
  title: "Mundo",
  description: "Principales acontecimientos internacionales.",
};

export default function MundoPage() {
  return (
    <SectionPage
      slug="mundo"
      title="Mundo"
      description="Acontecimientos internacionales con contexto y fuentes documentadas."
    />
  );
}
