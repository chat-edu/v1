import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { NOTES_TABLE } from "@/cosmosPostgres/constants/tables";

import { NoteRow, NoteRowInput } from "@/cosmosPostgres/types/note";

// CREATE

export const addNote = async (note: NoteRowInput) => {
    return add<NoteRowInput, NoteRow>(NOTES_TABLE, note);
};

// READ

export const getNote = async (id: number): Promise<NoteRow | null> => {
    const query = 'SELECT * FROM Notes WHERE id = $1;';
    return get(query, [id]);
};

// Find Notes by Notebook ID
export const findNotesByNotebookId = async (notebookId: number): Promise<NoteRow[]> => {
    const queryText = 'SELECT * FROM Notes WHERE notebook_id = $1;';
    return find<NoteRow>(queryText, [notebookId]);
};

// UPDATE

export const updateNote = async (id: number, updatedFields: Partial<NoteRowInput>): Promise<boolean> => {
    return update<Partial<NoteRowInput>, NoteRow>(NOTES_TABLE, [id], updatedFields);
};

// DELETE

export const deleteNote = async (id: number) => {
    return del(NOTES_TABLE, [id]);
};

// TRANSFORM

