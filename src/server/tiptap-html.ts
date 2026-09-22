/**
 * Serializador Tiptap JSON → HTML para el cuerpo público de artículos.
 *
 * Seguridad por diseño: solo emite una whitelist de nodos/marcas del
 * StarterKit; todo texto se escapa y los atributos se descartan salvo
 * href saneado en enlaces (http/https/mailto). Actúa como sanitizador.
 */

interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

interface TiptapNode {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: TiptapMark[];
  content?: TiptapNode[];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHref(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const href = raw.trim();
  if (/^(https?:|mailto:)/i.test(href)) return escapeHtml(href);
  if (href.startsWith("/")) return escapeHtml(href);
  return null;
}

function renderMarks(text: string, marks: TiptapMark[] | undefined): string {
  if (!marks) return text;
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return `<strong>${acc}</strong>`;
      case "italic":
        return `<em>${acc}</em>`;
      case "strike":
        return `<s>${acc}</s>`;
      case "code":
        return `<code>${acc}</code>`;
      case "link": {
        const href = safeHref(mark.attrs?.href);
        return href ? `<a href="${href}" rel="noopener noreferrer">${acc}</a>` : acc;
      }
      default:
        return acc;
    }
  }, text);
}

function renderChildren(node: TiptapNode): string {
  return (node.content ?? []).map(renderNode).join("");
}

function renderNode(node: TiptapNode): string {
  switch (node.type) {
    case "text":
      return renderMarks(escapeHtml(node.text ?? ""), node.marks);
    case "paragraph":
      return `<p>${renderChildren(node)}</p>`;
    case "heading": {
      const level = Number(node.attrs?.level);
      const tag = level >= 2 && level <= 4 ? `h${level}` : "h2";
      return `<${tag}>${renderChildren(node)}</${tag}>`;
    }
    case "blockquote":
      return `<blockquote>${renderChildren(node)}</blockquote>`;
    case "bulletList":
      return `<ul>${renderChildren(node)}</ul>`;
    case "orderedList":
      return `<ol>${renderChildren(node)}</ol>`;
    case "listItem":
      return `<li>${renderChildren(node)}</li>`;
    case "codeBlock":
      return `<pre><code>${escapeHtml(
        (node.content ?? []).map((c) => c.text ?? "").join(""),
      )}</code></pre>`;
    case "horizontalRule":
      return "<hr>";
    case "hardBreak":
      return "<br>";
    case "image": {
      const src = safeHref(node.attrs?.src);
      if (!src) return "";
      const alt = escapeHtml(String(node.attrs?.alt ?? ""));
      return `<img src="${src}" alt="${alt}" loading="lazy">`;
    }
    default:
      // Nodo desconocido: renderiza solo sus hijos (fail-open a texto)
      return renderChildren(node);
  }
}

/** Punto de entrada: doc Tiptap → HTML seguro para `.prose`. */
export function tiptapToHtml(doc: unknown): string {
  if (
    !doc ||
    typeof doc !== "object" ||
    (doc as TiptapNode).type !== "doc" ||
    !Array.isArray((doc as TiptapNode).content)
  ) {
    return "";
  }
  return renderChildren(doc as TiptapNode);
}
