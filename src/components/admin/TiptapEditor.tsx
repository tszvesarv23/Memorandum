"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "@/app/admin/admin.module.css";

/**
 * Editor de cuerpo de artículo (Tiptap + StarterKit).
 * Sincroniza el JSON del documento con un <input type="hidden">
 * para que el FormData lo recoja al enviar.
 */

interface TiptapEditorProps {
  name: string;
  initialDoc?: Record<string, unknown> | null | undefined;
}

const EMPTY_DOC = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

function ToolbarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.toolbarBtn} ${active ? styles.toolbarBtnActive : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export function TiptapEditor({ name, initialDoc }: TiptapEditorProps) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialDoc ?? EMPTY_DOC,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      if (hiddenRef.current) {
        hiddenRef.current.value = JSON.stringify(e.getJSON());
      }
    },
  });

  // Valor inicial del hidden input (sin ediciones no hay onUpdate)
  useEffect(() => {
    if (editor && hiddenRef.current) {
      hiddenRef.current.value = JSON.stringify(editor.getJSON());
    }
  }, [editor]);

  return (
    <div className={styles.editor}>
      <input ref={hiddenRef} type="hidden" name={name} />
      {editor ? (
        <div className={styles.toolbar} role="toolbar" aria-label="Formato">
          <ToolbarButton
            label="B"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            label="I"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            label="H2"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          />
          <ToolbarButton
            label="H3"
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          />
          <ToolbarButton
            label="❝"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <ToolbarButton
            label="• Lista"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            label="1. Lista"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolbarButton
            label="—"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
          <ToolbarButton
            label="↶"
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ToolbarButton
            label="↷"
            onClick={() => editor.chain().focus().redo().run()}
          />
        </div>
      ) : null}
      <div className={styles.editorBody}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
