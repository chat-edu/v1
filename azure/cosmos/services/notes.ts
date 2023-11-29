import { add, del, find, get, update } from "@/azure/cosmos/services/base";

import { NOTES_TABLE } from "@/azure/cosmos/constants/tables";

import { NoteRow, NoteRowInput } from "@/azure/cosmos/types/note";

// CREATE

export const addNote = async (note: NoteRowInput) => {
    return add<NoteRowInput, NoteRow>(NOTES_TABLE, note);
};

// READ

export const getNote = async (id: number): Promise<Note | null> => {
    const query = 'SELECT * FROM Notes WHERE id = $1;';
    return get(query, [id]);
};

// Find Notes by Notebook ID
export const findNotesByNotebookId = async (notebookId: number): Promise<Note[]> => {
    const queryText = 'SELECT * FROM Notes WHERE notebook_id = $1;';
    return find<NoteRow, Note>(queryText, [notebookId]);
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

