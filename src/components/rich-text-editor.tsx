import React, { useCallback } from 'react'

import RichTextEditor from 'reactjs-tiptap-editor'

import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer
} from 'reactjs-tiptap-editor/bubble-extra';

import 'reactjs-tiptap-editor/style.css'
import 'prism-code-editor-lightweight/layout.css';
import "prism-code-editor-lightweight/themes/github-dark.css"
import 'katex/dist/katex.min.css'
import 'easydrawer/styles.css'
import extensions from '../lib/extensions';

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

interface EditorProps {
  content: string;
  setContent: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({content, setContent}) => {

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 300),
    [content],
  )

  return (
    <div
      className="flex flex-col w-full gap-[24px] mx-[auto] p-4"
    >
      <RichTextEditor
        output="html"
        dark={false}
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        bubbleMenu={{
          render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
            return <>
              {bubbleDefaultDom}

              {extensionsNames.includes('twitter') ? <BubbleMenuTwitter disabled={disabled}
                editor={editor}
                key="twitter"
              /> : null}
              {extensionsNames.includes('katex')  ? <BubbleMenuKatex disabled={disabled}
                editor={editor}
                key="katex"
              /> : null}
              {extensionsNames.includes('excalidraw')  ? <BubbleMenuExcalidraw disabled={disabled}
                editor={editor}
                key="excalidraw"
              /> : null}
              {extensionsNames.includes('mermaid')  ? <BubbleMenuMermaid disabled={disabled}
                editor={editor}
                key="mermaid"
              /> : null}
              {extensionsNames.includes('drawer')  ? <BubbleMenuDrawer disabled={disabled}
                editor={editor}
                key="drawer"
              /> : null}
            </>
          },
        }}
      />
    </div>
  )
}

export default Editor