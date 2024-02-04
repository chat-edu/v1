import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformNotebook} from "@/hooks/queries/notebook/transformers";

import {
    subscribeToNotebooksChangedEvent,
    unsubscribeFromNotebooksChangedEvent
} from "@/cosmosPostgres/eventEmitters/notebooksEventEmitter";

const useTeacherNotebooks = (teacherId: string) => {
    const [notebooks, loading, error, fetchNotebooks] = useContainerData(
        `/api/notebooks/teacher/${teacherId}`,
        transformNotebook
    );

    const handleNotebooksChanged = useCallback(async (changedUserId: string) => {
        if(changedUserId === teacherId) {
            await fetchNotebooks();
        }
    }, [fetchNotebooks, teacherId])

    useEffect(() => {
        subscribeToNotebooksChangedEvent(handleNotebooksChanged);
        return () => {
            unsubscribeFromNotebooksChangedEvent(handleNotebooksChanged)
        };
    }, [handleNotebooksChanged]);

    return {
        notebooks: notebooks || [],
        loading,
        error,
        fetchNotebooks
    }
}

export default useTeacherNotebooks;