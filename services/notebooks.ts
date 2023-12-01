import {Notebook, NotebookInput} from "@/types/Notebook";
import {NotebookRowInput, NotebookRow} from "@/cosmosPostgres/types";

// CREATE

export const addNotebook = async (notebook: NotebookInput): Promise<NotebookRow | null> =>
    fetch(`/api/notebooks/create`, {
        method: "POST",
        body: JSON.stringify(transformNotebookInput(notebook)),
    })
        .then((res) => res.json())
        .catch(null);

// UPDATE

export const updateNotebook = async (notebookId: Notebook["id"], notebook: NotebookInput): Promise<NotebookRow | null> =>
    fetch(`/api/notebooks/${notebookId}/update`, {
        method: "PATCH",
        body: JSON.stringify(transformNotebookInput(notebook)),
    })
        .then(res => res.json())
        .catch(null);

// DELETE

export const deleteNotebook = async (notebookId: Notebook["id"]) =>
    fetch(`/api/notebooks/${notebookId}/delete`, {
        method: "DELETE",
    })
        .then(async (res) => (await res.json()) as boolean)
        .catch(() => false);

const transformNotebookInput = (notebook: NotebookInput): NotebookRowInput => ({
    name: notebook.name,
    user_id: notebook.userId,
})