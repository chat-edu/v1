import { NOTEBOOKS_CONTAINER } from "@/cosmos/constants";
import {add, del, find, get, getContainer, update} from "@/cosmos/services/base";
import {allNotebooksQuery, notebooksByUserIdQuery} from "@/cosmos/queries";

import {NotebookInput} from "@/types/Notebook";

const partitionKey = undefined;

export const getNotebookContainer = async () => getContainer(NOTEBOOKS_CONTAINER, partitionKey);

// Find Notebooks
export const findAllNotebooks = async (): Promise<NotebookInput[]> =>
    find(await getNotebookContainer(), allNotebooksQuery);

export const findNotebooksByUserId = async (userId: string): Promise<NotebookInput[]> =>
    find(await getNotebookContainer(), notebooksByUserIdQuery(userId));

// Add Notebook
export const addNotebook = async (notebook: NotebookInput) =>
    add(await getNotebookContainer(), notebook);

// Update Notebook
export const updateNotebook = async (id: string, updatedFields: Partial<NotebookInput>) =>
    update(await getNotebookContainer(), id, updatedFields);

// Get Notebook
export const getNotebook = async (id: string): Promise<NotebookInput> =>
    get<NotebookInput>(await getNotebookContainer(), id);

// Delete Notebook
export const deleteNotebook = async (id: string) =>
    del(await getNotebookContainer(), id);