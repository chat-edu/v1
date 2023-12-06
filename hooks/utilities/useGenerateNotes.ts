import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {generateNote} from "@/services/topics";

import {NoteInput} from "@/types/Note";
import {addNote} from "@/services/notes";

const useGenerateNotes = (content: string, topics: string[], notebookId: number) => {

    const toast = useToast();

    const [generateNotesLoading, setGenerateNotesLoading] = useState<boolean>(false);
    const [generatedNotes, setGeneratedNotes] = useState<NoteInput[]>([]);
    const [confirmNotesLoading, setConfirmNotesLoading] = useState<boolean>(false);

    const generateNotes = async () => {
        setGenerateNotesLoading(true);
        const noteInputs = await Promise.all(topics.map(async topic =>
            generateNote(content, topic, notebookId)
        ));
        setGeneratedNotes(noteInputs);
        setGenerateNotesLoading(false);
    }

    const regenerateNote = async (index: number) => {
        const noteInput = await generateNote(content, topics[index], notebookId);
        setGeneratedNotes([
            ...generatedNotes.slice(0, index),
            noteInput,
            ...generatedNotes.slice(index + 1),
        ]);
        toast({
            title: ` ${topics[index]} Note Regenerated`,
            description: "Your note has been regenerated.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    }

    const removeNote = (index: number) => {
        setGeneratedNotes([
            ...generatedNotes.slice(0, index),
            ...generatedNotes.slice(index + 1),
        ]);
        toast({
            title: ` ${topics[index]} Note Removed`,
            description: "Your note has been removed.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
    }

    const confirmNote = async (index: number) => {
        const result = await addNote(generatedNotes[index]);
        if (result) {
            toast({
                title: "Note Added",
                description: "Your note has been added.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Note Not Added",
                description: "Your note has not been added.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        setGeneratedNotes([
            ...generatedNotes.slice(0, index),
            ...generatedNotes.slice(index + 1),
        ])
    }

    const confirmNotes = async () => {
        setConfirmNotesLoading(true);
        const results = await Promise.all(generatedNotes.map(async noteInput => {
            return await addNote(noteInput)
        }));
        setConfirmNotesLoading(false);
        if (results.every(result => result)) {
            toast({
                title: "Notes Added",
                description: "Your notes have been added.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            return true
        } else {
            toast({
                title: "Error",
                description: "There was an error adding your notes.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return false;
        }
    }

    const resetGeneratedNotes = () => {
        setGeneratedNotes([]);
    }

    return {
        generateNotesLoading,
        generatedNotes,
        confirmNotesLoading,
        generateNotes,
        resetGeneratedNotes,
        regenerateNote,
        removeNote,
        confirmNote,
        confirmNotes
    }
}

export default useGenerateNotes;