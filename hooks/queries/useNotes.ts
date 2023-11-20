import useContainerData from "@/hooks/queries/useContainerData";

import {Note} from "@/types/Note";
import {subscribeToNotesChangedEvent, unsubscribeFromNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";
import {useCallback, useEffect} from "react";

const useNotes = (notebookId: string) => {

    const [notes, loading, error, fetchNotes] = useContainerData<Note>(`/api/notes/${notebookId}`);

    const handleNotesChanged = useCallback(async (changedNotebookId: string) => {
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