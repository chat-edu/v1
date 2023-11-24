import { add, del, find, get, update } from "@/cosmos/services/base";

import { NOTES_TABLE } from "@/cosmos/constants/tables";

import {Note, NoteRow, NoteRowInput} from "@/types/Note";

// Find Notes by Notebook ID
export const findNotesByNotebookId = async (notebookId: number): Promise<Note[]> => {
    const queryText = 'SELECT * FROM Notes WHERE notebook_id = $1;';
    return find<NoteRow, Note>(queryText, [notebookId], transformRowToNote);
};

// Add Note
export const addNote = async (note: NoteRowInput): Promise<boolean> => {
    return add(NOTES_TABLE, note);
};

// Update Note
export const updateNote = async (id: number, updatedFields: Partial<NoteRowInput>): Promise<boolean> => {
    // Assuming 'id' uniquely identifies a note
    return update(NOTES_TABLE, [id], updatedFields);
};

// Get Note by ID
export const getNote = async (id: number): Promise<Note | null> => {
    return get<NoteRow, Note>(NOTES_TABLE, [id], transformRowToNote);
};

// Delete Note
export const deleteNote = async (id: number): Promise<boolean> => {
    // Assuming 'id' uniquely identifies a note
    return del(NOTES_TABLE, [id]);
};

const transformRowToNote = (row: NoteRow): Note => ({
    id: row.id,
    notebookId: row.notebook_id,
    content: row.content,
    name: row.name,
});