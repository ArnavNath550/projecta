import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import React, { useEffect } from 'react'

import './markdown.css';

type Props = {
  editorState: string,
  setEditorState: (content: string) => void // Updated type to pass content
}

const Editor = ({ editorState, setEditorState }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Write a description, a task brief, or collect ideas...'
      }),
    ],
    content: editorState || '', // Initialize with the existing editorState
    onUpdate: ({ editor }) => {
      const content = editor.getHTML(); // Get current content as HTML
      setEditorState(content); // Update parent component with new content
    },
  });

  useEffect(() => {
    // Make sure to set the content if editorState is updated externally
    if (editor && editorState !== editor.getHTML()) {
      editor.commands.setContent(editorState);
    }
  }, [editorState, editor]);

  return (
    <EditorContent editor={editor} />
  )
}

export default Editor;
