import React, { useCallback, useState } from "react";
import classNames from "classnames";
// => Tiptap packages
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import "../../css/editor.css"
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
// Custom
import * as Icons from "./Icons";
import { LinkModal } from "./LinkModal";

interface EditorProps {
  content: string;
  editable: boolean
  setContent: React.Dispatch<React.SetStateAction<string>> | null
}

export function TipTap({ content, setContent, editable }: EditorProps) {
  // const [editable, setEditable] = useState(false);
  const editor = useEditor({
    editable,
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code
    ],
    content,
    onUpdate({ editor }) {
      if (setContent)
        setContent(editor.getHTML());
    },
  }) as Editor;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const openModal = useCallback(() => {
    console.log(editor.chain().focus());
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      {editable && <div className="menu">
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("link")
          })}
          onClick={openModal}
        >
          <Icons.Link />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold")
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline")
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("intalic")
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike")
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code")
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
      </div>}

      <BubbleMenu
        className="bubble-menu-light"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          return from === to && editor.isActive("link");
        }}
      >
        <button className="button" onClick={openModal}>
          Edit
        </button>
        <button className="button-remove" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>

      <EditorContent editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Link Modal"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  );
}
