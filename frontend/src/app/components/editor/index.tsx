import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import React, { useEffect } from 'react';

import './markdown.css';

type Props = {
  editorState: string;
  setEditorState: (content: string) => void; // Updated type to pass content
};

const Editor = ({ editorState, setEditorState }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Write a description, a task brief, or collect ideas...',
      }),
    ],
    content: editorState || '', // Initialize with the existing editorState
    onUpdate: ({ editor }) => {
      const content = editor.getHTML(); // Get current content as HTML
      setEditorState(content); // Update parent component with new content
    },
  });

  // Adding the blur event handler
  useEffect(() => {
    if (editor) {
      editor.on('blur', () => {
        const content = editor.getHTML(); // Get current content when blur happens
        setEditorState(content); // Trigger the setEditorState on blur
      });
    }

    return () => {
      if (editor) {
        editor.off('blur'); // Clean up the blur event when the component unmounts
      }
    };
  }, [editor, setEditorState]);

  // Syncing external updates to the editor
  useEffect(() => {
    if (editor && editorState !== editor.getHTML()) {
      editor.commands.setContent(editorState);
    }
  }, [editorState, editor]);

  return <EditorContent editor={editor} />;
};

export default Editor;
