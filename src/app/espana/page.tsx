import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage/SectionPage";

export const metadata: Metadata = {
  title: "España",
  description: "Política y actualidad nacional.",
};

export default function EspanaPage() {
  return (
    <SectionPage
      slug="espana"
      title="España"
      description="Política nacional, Gobierno, Cortes y administración pública."
    />
  );
}
