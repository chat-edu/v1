import {useToast} from "@chakra-ui/react";

import {deleteNote as deleteNoteService} from "@/services/notes";

import {Note} from "@/types/Note";

const useDeleteNote = (note: Note) => {


    const toast = useToast();

    const deleteNote = async () => {
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
        deleteNote
    }
}

export default useDeleteNote;