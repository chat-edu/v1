import { NoteInput} from "@/types/Note";

export const addNote = async (note: NoteInput) =>
    fetch(`/api/notes/create`, {
        method: "POST",
        body: JSON.stringify(note),
    })

export const updateNote = async (noteId: string, note: NoteInput) =>
    fetch(`/api/notes/${note.notebookId}/${noteId}/update`, {
        method: "POST",
        body: JSON.stringify(note),
    });

export const deleteNote = async (noteId: string, notebookId: string) =>
    fetch(`/api/notes/${notebookId}/${noteId}/delete`, {
        method: "GET",
    });
