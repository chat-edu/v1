import {useCallback, useEffect} from "react";

import useContainerData from "@/hooks/queries/useContainerData";

import {subscribeToNotesChangedEvent, unsubscribeFromNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

const useNotes = (notebookId: Notebook["id"]) => {

    const [notes, loading, error, fetchNotes] = useContainerData<Note>(notebookId == 0 ? "" : `/api/notes/${notebookId}`);

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