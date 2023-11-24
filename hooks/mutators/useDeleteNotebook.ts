import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import { deleteNotebook as deleteNotebookService } from '@/services/notebooks'

import {emitNotebooksChangedEvent} from "@/eventEmitters/notebooksEventEmitter";

import {Notebook} from "@/types/Notebook";

const useDeleteNotebook = (notebook: Notebook) => {

    const { user } = useAuth();

    const toast = useToast();

    const deleteNotebook = async () => {
        if(!user) return;
        const success = await deleteNotebookService(notebook.id);
        if(success) {
            toast({
                title: "Notebook Deleted",
                description: `Notebook ${notebook.name} was deleted.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            emitNotebooksChangedEvent(notebook.userId);
        } else {
            toast({
                title: "Notebook Deletion Failed",
                description: `Notebook ${notebook.name} could not be deleted.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

    }

    return {
        deleteNotebook
    }
}

export default useDeleteNotebook