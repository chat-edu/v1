import useAuth from "@/hooks/useAuth"

import {useToast} from "@chakra-ui/react";

import {deleteNote as deleteNoteService} from "@/services/notes";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

const useDeleteNote = (note: Note, notebook: Notebook) => {

    const { user } = useAuth();

    const toast = useToast();

    const isAllowed = user && user.id === notebook.userId;
    
    const deleteNote = async () => {
        if(!isAllowed) return;
        const success = await deleteNoteService(note.id, note.notebookId);
        if(success) {
            toast({
                title: "Note Deleted",
                description: `Note ${note.name} was deleted.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Note Deletion Failed",
                description: `Note ${note.name} could not be deleted.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return {
        deleteNote,
        isAllowed
    }
}

export default useDeleteNote;