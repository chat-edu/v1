import {useCallback, useEffect} from "react";

import useItemData from "@/hooks/queries/utilities/useItemData";
import {transformNote} from "@/hooks/queries/notes/transformers";

import {
    subscribeToNoteChangedEvent,
    unsubscribeFromNoteChangedEvent
} from "@/cosmosPostgres/eventEmitters/noteEventEmitter";

import {Note} from "@/types/Note";

const useNote = (noteId: Note["id"]) => {
    const [note, loading, error, fetchNote] = useItemData(`/api/notes/${noteId}`, transformNote);

    const handleNoteChanged = useCallback(async (changedNoteId: number) => {
        if(changedNoteId === noteId) {
            await fetchNote();
        }
    }, [fetchNote, noteId])

    useEffect(() => {
        subscribeToNoteChangedEvent(handleNoteChanged);
        return () => {
            unsubscribeFromNoteChangedEvent(handleNoteChanged)
        };
    }, [handleNoteChanged]);

    return {
        note,
        loading,
        error
    }
}

export default useNote;