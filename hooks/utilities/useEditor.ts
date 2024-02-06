import {Note} from "@/types/Note";
import {useEffect, useRef, useState} from "react";
import {MDXEditorMethods} from "@mdxeditor/editor";
import useProcessPdf from "@/hooks/utilities/useProcessPdf";
import {generateNoteContent} from "@/services/notes";

const useEditor = (note: Note) => {

    const [markdown, setMarkdown] = useState<string>(note.content);

    const ref = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        if(ref.current) {
            ref.current.setMarkdown(note.content);
        }
    }, [note.content])

    const { file, updateFile, extractedText, processFile, resetFile, isFileExtracting } = useProcessPdf();

    useEffect(() => {
        if(extractedText && ref.current) {
            ref.current.setMarkdown(ref.current.getMarkdown() + '\n\n' + extractedText);
        }
    }, [extractedText]);

    const [isGeneratingContent, setIsGeneratingContent] = useState<boolean>(false);

    const generateContent = async () => {
        setIsGeneratingContent(true);
        const content = await generateNoteContent(note.id);
        if(ref.current) {
            ref.current.setMarkdown(ref.current.getMarkdown() + '\n\n' + content);
        }
        setIsGeneratingContent(false);
    }


    return {
        markdown,
        setMarkdown,
        ref,
        file,
        updateFile,
        processFile,
        resetFile,
        isFileExtracting,
        generateContent,
        isGeneratingContent,
    }
}

export default useEditor;