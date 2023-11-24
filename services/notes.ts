import {emitNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

import {Note, NoteInput} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

export const addNote = async (note: NoteInput) =>
    fetch(`/api/notes/create`, {
        method: "POST",
        body: JSON.stringify(note),
    })
        .then(async (res) => {
            emitNotesChangedEvent(note.notebookId);
            return (await res.json()) as boolean
        })
        .then((res) => res);

export const updateNote = async (noteId: number, note: NoteInput) =>
    fetch(`/api/notes/${note.notebookId}/${noteId}/update`, {
        method: "POST",
        body: JSON.stringify(note),
    })
        .then(async (res) => {
            emitNotesChangedEvent(note.notebookId);
            return await res.json() as boolean
        })
        .then((res) => res);

export const deleteNote = async (noteId: Note["id"], notebookId: Notebook["id"]) =>
    fetch(`/api/notes/${notebookId}/${noteId}/delete`, {
        method: "GET",
    })
        .then(async (res) => {
            emitNotesChangedEvent(notebookId);
            return await res.json() as boolean
        })
        .then((res) => res);
