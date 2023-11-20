import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/useContainerData";
import {
    subscribeToNotebooksChangedEvent,
    unsubscribeFromNotebooksChangedEvent
} from "@/eventEmitters/notebooksEventEmitter";

import {Notebook} from "@/types/Notebook";


const useNotebooks = (userId?: string) => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData<Notebook>(`/api/notebooks${userId ? `/user?userId=${userId}` : ''}`);

    const handleNotesChanged = useCallback(async (changedUserId: string) => {
        if(userId == undefined || changedUserId === userId) {
            await fetchNotebooks();
        }
    }, [fetchNotebooks, userId])

    useEffect(() => {
        subscribeToNotebooksChangedEvent(handleNotesChanged);
        return () => {
            unsubscribeFromNotebooksChangedEvent(handleNotesChanged)
        };
    }, [handleNotesChanged]);

    return {
        notebooks: notebooks || [],
        loading,
        error,
        fetchNotebooks
    }
}

export default useNotebooks;