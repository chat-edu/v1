import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformNotebookScore} from "@/hooks/queries/scores/notebooks/transformers";

import {
    subscribeToNotebooksChangedEvent,
    unsubscribeFromNotebooksChangedEvent
} from "@/cosmosPostgres/eventEmitters/notebooksEventEmitter";


const useUserNotebooks = (userId: string) => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData(
        `/api/scores/notebooks/creator/${userId}`,
        transformNotebookScore
    );

    const handleNotesChanged = useCallback(async (changedUserId: string) => {
        if(changedUserId === userId) {
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

export default useUserNotebooks;