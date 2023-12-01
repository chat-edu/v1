import {useEffect, useState} from 'react';

import useGenerateTopics from "@/hooks/utilities/useGenerateTopics";
import useGenerateNotes from "@/hooks/utilities/useGenerateNotes";
import useProcessPdf from "@/hooks/utilities/useProcessPdf";

export enum AddNoteStep {
    CONTENT,
    TOPICS,
    GENERATE_NOTES,
}

const useAddNote = (notebookId: number) => {

    const [step, setStep] = useState<AddNoteStep>(AddNoteStep.CONTENT);

    const [content, setContent] = useState<string>('');
    const [contentTouched, setContentTouched] = useState<boolean>(false);

    const {
        generatedTopics,
        generatedTopicsLoading,
        selectedTopics,
        generateTopics,
        resetGeneratedTopics ,
        selectTopic,
        unselectTopic,
    } = useGenerateTopics(content);

    const {
        generateNotesLoading,
        generatedNotes,
        confirmNotesLoading,
        generateNotes,
        resetGeneratedNotes,
        regenerateNote,
        removeNote,
        confirmNote,
        confirmNotes
    } = useGenerateNotes(content, selectedTopics, notebookId);

    const {
        file,
        isFileExtracting,
        extractedText,
        processFile,
        updateFile,
        resetFile
    } = useProcessPdf();

    useEffect(() => {
        setContent(extractedText);
    }, [extractedText]);

    const onGenerateTopics = async () => {
        await generateTopics();
        setStep(AddNoteStep.TOPICS);
    }

    const onGenerateNotes = async () => {
        await generateNotes();
        setStep(AddNoteStep.GENERATE_NOTES);
    }

    const reset = () => {
        resetGeneratedNotes();
        resetGeneratedTopics();
        setContent('');
        setContentTouched(false);
        setStep(AddNoteStep.CONTENT);
        resetFile();
    }

    return {
        notebookId,
        step,
        content,
        contentTouched,
        generatedTopicsLoading,
        generatedTopics,
        selectedTopics,
        generateNotesLoading,
        generatedNotes,
        confirmNotesLoading,
        file,
        isFileExtracting,
        processFile,
        updateFile,
        setContent,
        setContentTouched,
        onGenerateTopics,
        selectTopic,
        unselectTopic,
        onGenerateNotes,
        confirmNotes,
        regenerateNote,
        removeNote,
        confirmNote,
        reset,
        resetFile,
    }
}

export default useAddNote;