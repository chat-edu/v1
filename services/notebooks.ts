import {Notebook, NotebookInput} from "@/types/Notebook";

export const addNotebook = async (notebook: NotebookInput) =>
    fetch(`/api/notebooks/create`, {
        method: "POST",
        body: JSON.stringify(notebook),
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);

export const updateNotebook = async (notebookId: Notebook["id"], notebook: NotebookInput) =>
    fetch(`/api/notebooks/${notebookId}/update`, {
        method: "POST",
        body: JSON.stringify(notebook),
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);

export const deleteNotebook = async (notebookId: Notebook["id"]) =>
    fetch(`/api/notebooks/${notebookId}/delete`, {
        method: "GET",
    })
        .then(async (res) => (await res.json()) as boolean)
        .then((res) => res);