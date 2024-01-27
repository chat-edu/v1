import {emitNotesChangedEvent} from "@/cosmosPostgres/eventEmitters/notesEventEmitter";

import {Note, NoteInput} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

import {NoteRowInput, NoteRow} from "@/cosmosPostgres/types";

// CREATE

export const addNote = async (note: NoteInput): Promise<NoteRow | null> =>
    fetch(`/api/notes/create`, {
        method: "POST",
        body: JSON.stringify(transformNoteInput(note)),
    })
        .then((res) => {
            emitNotesChangedEvent(note.notebookId);
            return res.json()
        })
        .catch(null)

// UPDATE

export const updateNote = async (noteId: number, notebookId: number, note: Partial<NoteInput>): Promise<NoteRow | null> =>
    fetch(`/api/notes/${noteId}/update`, {
        method: "PATCH",
        body: JSON.stringify(transformPartialNoteInput(note)),
    })
        .then(async (res) => {
            emitNotesChangedEvent(notebookId);
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

const transformNoteInput = (note: NoteInput): NoteRowInput => ({
    notebook_id: note.notebookId,
    name: note.name,
    content: note.content,
    topic_id: note.topicId,
    order_position: note.orderPosition,
});

const transformPartialNoteInput = (note: Partial<NoteInput>): Partial<NoteRowInput> => ({
    name: note.name,
    content: note.content,
    order_position: note.orderPosition,
    topic_id: note.topicId,
});
