import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { NOTEBOOKS_TABLE } from "@/cosmosPostgres/constants/tables";

import {Notebook, NotebookRow, NotebookRowInput} from "@/types/Notebook";

export const findAllNotebooks = async (): Promise<Notebook[]> => {
    const queryText = 'SELECT * FROM Notebooks;';
    return find(queryText, [], transformNotebook);
};

export const findNotebooksByUserId = async (userId: string): Promise<Notebook[]> => {
    const queryText = 'SELECT * FROM Notebooks WHERE user_id = $1;';
    return find(queryText, [userId], transformNotebook);
};

export const addNotebook = async (notebook: NotebookRowInput): Promise<boolean> => {
    return add(NOTEBOOKS_TABLE, notebook);
};

export const updateNotebook = async (id: number, updatedFields: Partial<NotebookRowInput>): Promise<boolean> => {
    return update(NOTEBOOKS_TABLE, id, updatedFields);
};

export const getNotebook = async (id: number): Promise<Notebook | null> => {
    return get(NOTEBOOKS_TABLE, id, transformNotebook);
};

export const deleteNotebook = async (id: number): Promise<boolean> => {
    return del(NOTEBOOKS_TABLE, id);
};

const transformNotebook = (row: NotebookRow): Notebook => ({
    id: row.id,
    name: row.name,
    userId: row.user_id,
})