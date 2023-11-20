import {PartitionKeyDefinition, PartitionKeyKind} from '@azure/cosmos';

import { NOTES_CONTAINER } from "@/cosmos/constants";
import {add, del, find, get, getContainer, update} from "@/cosmos/services/base";

import { NoteInput } from "@/types/Note";
import {notesByNotebookQuery} from "@/cosmos/queries";

const partitionKeyDefinition: PartitionKeyDefinition = { kind: PartitionKeyKind.Hash, paths: ["/notebookId"] };

export const getNotesContainer = async () => getContainer(NOTES_CONTAINER, partitionKeyDefinition);

// Find Notes
export const findNotesByNotebookId = async (notebookId: string): Promise<NoteInput[]> =>
    find(await getNotesContainer(), notesByNotebookQuery(notebookId));

// Add Note
export const addNote = async (note: NoteInput) =>
    add(await getNotesContainer(), note);

// Update Note
export const updateNote = async (id: string, notebookId: string, updatedFields: Partial<NoteInput>) => {
    const note = await getNote(id, notebookId);
    const updatedNote = { ...note, ...updatedFields };
    return update(await getNotesContainer(), id, updatedNote);
};

// Get Note
export const getNote = async (id: string, notebookId: string): Promise<NoteInput> =>
    get<NoteInput>(await getNotesContainer(), id, notebookId);

// Delete Note
export const deleteNote = async (id: string, notebookId: string) =>
    del(await getNotesContainer(), id, notebookId);
