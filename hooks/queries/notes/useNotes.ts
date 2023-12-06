import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {subscribeToNotesChangedEvent, unsubscribeFromNotesChangedEvent} from "@/cosmosPostgres/eventEmitters/notesEventEmitter";

import {transformNote} from "@/hooks/queries/notes/transformers";

import {Notebook} from "@/types/Notebook";

const useNotes = (notebookId: Notebook["id"]) => {

    const [notes, loading, error, fetchNotes] = useContainerData(`/api/notes/notebook/${notebookId}`, transformNote);

    const handleNotesChanged = useCallback(async (changedNotebookId: number) => {
        if(changedNotebookId === notebookId) {
            await fetchNotes();
        }
    }, [fetchNotes, notebookId])

    useEffect(() => {
        subscribeToNotesChangedEvent(handleNotesChanged);
        return () => {
            unsubscribeFromNotesChangedEvent(handleNotesChanged)
        };
    }, [handleNotesChanged]);


    return {
        notes: notes || [],
        loading,
        error,
        fetchNotes
    }
}

export default useNotes;