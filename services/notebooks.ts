import {Notebook, NotebookInput, NotebookRow} from "@/types/Notebook";

// CREATE

export const addNotebook = async (notebook: NotebookInput): Promise<NotebookRow | null> =>
    fetch(`/api/notebooks/create`, {
        method: "POST",
        body: JSON.stringify(notebook),
    })
        .then((res) => res.json())
        .catch(null);

// UPDATE

export const updateNotebook = async (notebookId: Notebook["id"], notebook: NotebookInput): Promise<NotebookRow | null> =>
    fetch(`/api/notebooks/${notebookId}/update`, {
        method: "PATCH",
        body: JSON.stringify(notebook),
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