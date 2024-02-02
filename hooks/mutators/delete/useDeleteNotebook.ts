import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/useAuth";

import { deleteNotebook as deleteNotebookService } from '@/services/notebooks'

import {emitNotebooksChangedEvent} from "@/cosmosPostgres/eventEmitters/notebooksEventEmitter";

const useDeleteNotebook = (notebookId: number, notebookName: string) => {

    const { user } = useAuth();

    const toast = useToast();

    const deleteNotebook = async () => {
        if(!user) return;
        const success = await deleteNotebookService(notebookId);
        if(success) {
            toast({
                title: "Notebook Deleted",
                description: `Notebook ${notebookName} was deleted.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            emitNotebooksChangedEvent(user.id);
        } else {
            toast({
                title: "Notebook Deletion Failed",
                description: `Notebook ${notebookName} could not be deleted.`,
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