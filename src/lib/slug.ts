/**
 * Slugs editoriales: ASCII, minúsculas, guiones.
 * "Crónica del Estrecho: 1713" → "cronica-del-estrecho-1713"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}
