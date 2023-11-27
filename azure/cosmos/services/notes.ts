import { add, del, find, get, update } from "@/azure/cosmos/services/base";

import { NOTES_TABLE } from "@/azure/cosmos/constants/tables";

import {Note, NoteRow, NoteRowInput} from "@/types/Note";

// CREATE

export const addNote = async (note: NoteRowInput) => {
    return add(NOTES_TABLE, note);
};

// READ

export const getNote = async (id: number): Promise<Note | null> => {
    const query = 'SELECT * FROM Notes WHERE id = $1;';
    return get(query, [id], transformRowToNote);
};

// Find Notes by Notebook ID
export const findNotesByNotebookId = async (notebookId: number): Promise<Note[]> => {
    const queryText = 'SELECT * FROM Notes WHERE notebook_id = $1;';
    return find<NoteRow, Note>(queryText, [notebookId], transformRowToNote);
};

// UPDATE

export const updateNote = async (id: number, updatedFields: Partial<NoteRowInput>): Promise<NoteRow | null> => {
    return update<Partial<NoteRowInput>, NoteRow>(NOTES_TABLE, [id], updatedFields);
};

// DELETE

export const deleteNote = async (id: number) => {
    return del(NOTES_TABLE, [id]);
};

// TRANSFORM

const transformRowToNote = (row: NoteRow): Note => ({
    id: row.id,
    notebookId: row.notebook_id,
    content: row.content,
    name: row.name,
});