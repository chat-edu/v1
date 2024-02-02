import {useToast} from "@chakra-ui/react";
import {updateNote} from "@/services/notes";


const useUpdateNote = (noteId: number, notebookId: number) => {

    const toast = useToast();

    const updateNoteContent = async (markdown: string) => {
        const success = await updateNote(noteId, notebookId, {
            content: markdown
        })
        if(success) {
            toast({
                title: "Note content updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Note content update failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const updateNoteOrderPosition = async (orderPosition: number) => {
        const success = await updateNote(noteId, notebookId, {
            orderPosition
        })
        if(success) {
            toast({
                title: "Note order position updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Note order position update failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return {
        updateNoteContent,
        updateNoteOrderPosition
    }
}

export default useUpdateNote;