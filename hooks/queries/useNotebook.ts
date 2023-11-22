import {useCallback, useEffect} from "react";

import useItemData from "@/hooks/queries/useItemData";

import {subscribeToNotesChangedEvent, unsubscribeFromNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

import {Notebook} from "@/types/Notebook";

const useNotebook = (notebookId: string) => {
    const [notebook, loading, error, fetchNotebook] = useItemData<Notebook>(`/api/notebooks/${notebookId}`);

    const handleNotesChanged = useCallback(async(updatedNotebookId: string) => {
        if(notebookId === updatedNotebookId) {
            await fetchNotebook();
        }
    }, [fetchNotebook, notebookId])

    useEffect(() => {
        subscribeToNotesChangedEvent(handleNotesChanged);
        return () => {
            unsubscribeFromNotesChangedEvent(handleNotesChanged);
        }
    }, [handleNotesChanged])

    return {
        notebook,
        loading,
        error
    }
}

export default useNotebook;