import useAuth from "@/hooks/auth/useAuth"

import {useToast} from "@chakra-ui/react";

import {deleteNote as deleteNoteService} from "@/services/notes";

import {emitNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

import {Note} from "@/types/Note";

const useNote = (note: Note) => {

    const { user } = useAuth();

    const toast = useToast();
    
    const deleteNote = async () => {
        if(!user) return;
        const success = await deleteNoteService(note.id, note.notebookId);
        if(success) {
            toast({
                title: "Note Deleted",
                description: `Note ${note.title} was deleted.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            emitNotesChangedEvent(note.notebookId);
        } else {
            toast({
                title: "Note Deletion Failed",
                description: `Note ${note.title} could not be deleted.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return {
        deleteNote
    }
}

export default useNote;