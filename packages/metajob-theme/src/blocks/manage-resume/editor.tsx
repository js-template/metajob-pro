"use client"

import { BoldItalicUnderlineToggles, MDXEditor, MDXEditorMethods, UndoRedo, toolbarPlugin } from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"

import { FC } from "react"

interface EditorProps {
   markdown: string
   editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
   return (
      <MDXEditor
         ref={editorRef}
         markdown={markdown}
         plugins={[
            toolbarPlugin({
               toolbarContents: () => (
                  <>
                     {" "}
                     <UndoRedo />
                     <BoldItalicUnderlineToggles />
                  </>
               )
            })
         ]}
      />
   )
}

export default Editor
