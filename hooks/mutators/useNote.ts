import useAuth from "@/hooks/auth/useAuth";

import {deleteNote as deleteNoteService} from "@/services/notes";

import {Note} from "@/types/Note";
import {emitNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

const useNote = (note: Note) => {

    const { user } = useAuth();
    
    const deleteNote = async () => {
        if(!user) return;
        await deleteNoteService(note.id, note.notebookId)
        emitNotesChangedEvent(note.notebookId);
    }

    return {
        deleteNote
    }
}

export default useNote;