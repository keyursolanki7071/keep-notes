import React, { useCallback } from "react";

import RichTextEditor, { useEditorState } from "reactjs-tiptap-editor";

import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer,
} from "reactjs-tiptap-editor/bubble-extra";

import "reactjs-tiptap-editor/style.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";
import "katex/dist/katex.min.css";
import "easydrawer/styles.css";
import extensions from "../lib/extensions";
import CustomBubbleMenu from "./editor/bubble-menu";

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

interface EditorProps {
  content: string;
  setContent: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const { isReady, editor, editorRef } = useEditorState();
  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value);
    }, 300),
    [content]
  );

  return (
    <div className="flex flex-col w-full gap-[24px] mx-[auto] p-4">
      <RichTextEditor
        ref={editorRef}
        output="html"
        dark={false}
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
      />
    </div>
  );
};

export default Editor;
