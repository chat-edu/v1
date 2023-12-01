import {useState} from 'react';

import { addNote } from "@/services/notes";

import {useToast} from "@chakra-ui/react";

import {generateNote, getTopics} from "@/services/topics";

export enum AddNoteStep {
    CONTENT,
    TOPICS,
    GENERATE_NOTES,
}

const useAddNote = (notebookId: number) => {

    const toast = useToast();

    const [step, setStep] = useState<AddNoteStep>(AddNoteStep.CONTENT);

    const [content, setContent] = useState<string>('');
    const [contentTouched, setContentTouched] = useState<boolean>(false);

    const [generatedTopicsLoading, setGeneratedTopicsLoading] = useState<boolean>(false);
    const [generatedTopics, setGeneratedTopics] = useState<string[]>([]);

    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [generateNotesLoading, setGenerateNotesLoading] = useState<boolean>(false);

    const generateTopics = async () => {
        setGeneratedTopicsLoading(true);
        setGeneratedTopics(await getTopics(content));
        setGeneratedTopicsLoading(false);
        setStep(AddNoteStep.TOPICS);
    }

    const selectTopic = (topic: string) => {
        setSelectedTopics([...selectedTopics, topic]);
    }

    const unselectTopic = (topic: string) => {
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
    }

    const generateNotes = async () => {
        setGenerateNotesLoading(true);
        const noteInputs = await Promise.all(selectedTopics.map(async topic =>
            generateNote(content, topic, notebookId)
        ));
        const results = await Promise.all(noteInputs.map(async noteInput => {
            return await addNote(noteInput)
        }));
        if(results.every(result => result)) {
            toast({
                title: "Note Added",
                description: "Your note has been added.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            setGenerateNotesLoading(false);
            setContent('');
            setSelectedTopics([]);
            setGeneratedTopics([]);
            setStep(AddNoteStep.CONTENT);
            return true
        } else {
            toast({
                title: "Error",
                description: "There was an error adding your note.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return false;
        }
    }

    return {
        notebookId,
        step,
        content,
        setContent,
        contentTouched,
        setContentTouched,
        generateTopics,
        generatedTopicsLoading,
        generatedTopics,
        selectedTopics,
        selectTopic,
        unselectTopic,
        generateNotes,
        generateNotesLoading,
    }
}

export default useAddNote;