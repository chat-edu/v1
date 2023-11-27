import {emitNotesChangedEvent} from "@/azure/cosmos/eventEmitters/notesEventEmitter";

import {Note, NoteInput, NoteRow} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

// CREATE

export const addNote = async (note: NoteInput): Promise<NoteRow | null> =>
    fetch(`/api/notes/create`, {
        method: "POST",
        body: JSON.stringify(note),
    })
        .then((res) => {
            emitNotesChangedEvent(note.notebookId);
            return res.json()
        })
        .catch(null)

// UPDATE

export const updateNote = async (noteId: number, note: NoteInput): Promise<NoteRow | null> =>
    fetch(`/api/notes/${note.notebookId}/${noteId}/update`, {
        method: "PATCH",
        body: JSON.stringify(note),
    })
        .then(async (res) => {
            emitNotesChangedEvent(note.notebookId);
            return res.json()
        })
        .then(null);

// DELETE

export const deleteNote = async (noteId: Note["id"], notebookId: Notebook["id"]): Promise<boolean> =>
    fetch(`/api/notes/${noteId}/delete`, {
        method: "DELETE",
    })
        .then(async (res) => {
            emitNotesChangedEvent(notebookId);
            return res.json()
        })
        .catch(null);
