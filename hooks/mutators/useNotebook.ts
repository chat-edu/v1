import { deleteNotebook as deleteNotebookService } from '@/services/notebooks'

import useAuth from "@/hooks/auth/useAuth";

import {Notebook} from "@/types/Notebook";
import {emitNotebooksChangedEvent} from "@/eventEmitters/notebooksEventEmitter";

const useNotebook = (notebook: Notebook) => {

    const { user } = useAuth();

    const deleteNotebook = async () => {
        if(!user) return;
        await deleteNotebookService(notebook.id);
        emitNotebooksChangedEvent(notebook.userId)
    }

    return {
        deleteNotebook
    }
}

export default useNotebook