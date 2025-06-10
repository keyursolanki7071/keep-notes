import { askAI } from '@/services/aiService'
import RichTextEditor, { BubbleMenu, useEditorState } from 'reactjs-tiptap-editor'
import type { Editor } from 'reactjs-tiptap-editor'
import 'reactjs-tiptap-editor/style.css'

interface CustomBubbleMenuProps {
  editor: Editor
}

function CustomBubbleMenu({ editor }: CustomBubbleMenuProps) {
  if (!editor)
    return null

  const handleAskAI = async () => {
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to)
    const updatedText = await askAI(text)
    editor.commands.insertContentAt({from, to}, updatedText);
  }

  return (
    <BubbleMenu
      editor={editor}
    >
      <button
        type="button"
        onClick={handleAskAI}
      >
        Ask AI
      </button>
    </BubbleMenu>
  )
}

export default CustomBubbleMenu;